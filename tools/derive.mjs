// derive.mjs — rebuild the derived layers (readable/ + src/ + split-spec.json)
// from the bmx-mountain capture (PLAN §3/§5). BMX MOUNTAIN
// (https://wavedash.com/games/bmx-mountain) is capture-class: a custom Vite
// production build served by the Wavedash platform from a per-build CDN host
// (see tools/update.mjs for the platform mechanics). §0.4 fork-over-mirror was
// checked on 2026-10-13 — the page carries no public source-repo link (the
// platform's own SDK/library credits only), so the mirror stands. The capture
// is untouched; every source file is re-hashed against .upstream/manifest.json
// before it is rendered, so a drifted capture fails loudly instead of being
// silently re-derived.
//
// Layout: the capture preserves the served URL structure (repo root == CDN
// host root), so both derived layers MIRROR it — no __-flattening. A captured
// file at assets/index-gCVK5XnX.js becomes
//   readable/assets/index-gCVK5XnX.pretty.js   (prettified twin)
//   src/assets/index-gCVK5XnX-NN.js            (statement-aligned slice)
// The inline twins of the entry documents live at readable/<entry>-inline-N.*.
//
// Pipeline:
//   each capture *.js -> pinned prettier 3.9.6 (module API — the CLI respects
//                        .gitignore and can silently echo its input), formatted
//                        to a VERIFIED FIXED POINT (≤4 passes; every file
//                        stabilizes in one pass except the main game bundle,
//                        which needs two) -> readable/<served path>.pretty.js
//   the capture embed.css -> readable/embed.pretty.css, wholeFile section
//                        (stylesheet rule: stylesheets are never sliced).
//   vendor bundles     -> readable/ + wholeFile section (vendor rule): the
//                        Wavedash platform embed SDK (embed.js) and the embed
//                        service worker (sw-embed.js) are indexed whole, never
//                        sliced.
//   app chunks         -> statement-aligned slices src/<served path>-NN.js at
//                        top-level declaration boundaries, ~250-350 line
//                        windows (oversized single declarations stay whole),
//                        exact 2-line provenance header; every slice is
//                        parse-checked with `node --input-type=module --check
//                        -` and round-trips byte-exact to its readable line
//                        range — through the recorded semantic rename map when
//                        the chunk has one (tools/engine/rename-layer.mjs
//                        applyRecordedMap; index-validated, no parser needed).
//                        Two recorded wholeFile regions inside the entry chunk:
//                        the Vite modulepreload polyfill (statement 0) and the
//                        bundled three.js r186 region (core + node/TSL +
//                        WebGPURenderer/WebGLRenderer), content-anchored and
//                        guarded. One recorded exception: the app's first slice
//                        is the tail of a minifier-merged `var` declaration
//                        whose head closes the three.js region, so it starts
//                        mid-declaration (still byte-exact and standalone-
//                        parsing) — flagged `boundary` in the spec.
//   entry documents    -> inline <script>/<style> scan (byte ranges + sha256):
//                        index.html carries one inline <style> block, `embed`
//                        carries the rotating window.__WAVEDASH_GAME__ inline
//                        <script> boot block — twins + readable/index-inline-
//                        map.json.
//   binary payloads    -> tex/*.webp + sfx/*.wav are hashed notRendered
//                        (served byte-exact; never text-derived).
//   rename map         -> rename-map.json (recovered from the committed slices
//                        by tools/recover-scoped-map.mjs, curated by
//                        tools/apply-names.mjs + tools/names.json). The map is
//                        the input to this script: re-cut slices are the
//                        readable ranges with the recorded identifier spans
//                        substituted, so a re-derive is reproducible and the
//                        run fails loudly if the map addresses a token the
//                        readable no longer has. The chunk's fired binding map
//                        is recorded in split-spec sources[].renameBindings for
//                        the reconstruction gates.
//
// usage: node tools/derive.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { applyRecordedMap, markerText, markerWords, sliceHeader } from "./engine/rename-layer.mjs";
// ── --check: prove the committed derived layer is current, writing NOTHING ─
// This tool used to ignore its command line entirely, so `node tools/derive.mjs
// --check` was a full in-place re-derivation: it rewrote readable/ + src/ +
// split-spec.json and (on a mirror whose derive does not re-apply the recorded
// rename map) stripped the rename layer off src/ -- damage that looks
// legitimate, because the files still parse. --check now runs the mirror's
// documented rebuild chain in a throwaway scratch copy OUTSIDE the mirror and
// compares the result with the committed tree; it writes nothing here.
if (process.argv.includes("--check")) {
  const { runDeriveCheck } = await import("./derive-check.mjs");
  process.exit(await runDeriveCheck());
}

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const PINNED = "3.9.6";
const MIN_WINDOW = 250;
const MAX_WINDOW = 350;
const ROOT = ""; // capture lives at the repo root (repo root == CDN host root)

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const readLines = (abs) => {
  const t = fs.readFileSync(abs, "utf8");
  const l = t.split("\n");
  if (l.length && l[l.length - 1] === "") l.pop();
  return l;
};
const linesOf = (text) => text.replace(/\n$/, "").split("\n");
const lineOf = (text, offset) => text.slice(0, offset).split("\n").length;

// capture-relative name -> derived twin name (served path kept, extension swapped)
const tagOf = (capRel) => capRel.replace(/\.(js|css)$/i, "");
const prettyRelFor = (capRel) =>
  "readable/" + tagOf(capRel) + (/\.css$/i.test(capRel) ? ".pretty.css" : ".pretty.js");

// write a derived file, creating its (served-path) directory chain
function writeDerived(rel, text) {
  const abs = path.join(proj, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, text);
}

// ── pinned prettier (module API, exactly 3.9.6) ─────────────────────────
async function loadPrettier() {
  const candidates = [
    process.env.PRETTIER_MJS,
    path.join(proj, "tools", "vendor", "prettier", "index.mjs"),
    path.join(proj, "node_modules", "prettier", "index.mjs"),
  ].filter(Boolean);
  for (const c of candidates) {
    if (!fs.existsSync(c)) continue;
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(path.dirname(c), "package.json"), "utf8"));
      if (pkg.version !== PINNED) continue;
      const mod = (await import(pathToFileURL(c).href)).default;
      if (mod.version === PINNED) return { mod, at: c };
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `pinned prettier ${PINNED} not found.\n` +
      `  tried:\n` +
      candidates.map((c) => `    ${c}`).join("\n") +
      `\n  fix: restore the vendored copy (git checkout -- tools/vendor/prettier) ` +
      `or install it (npm install --no-save prettier@${PINNED}), ` +
      `or point PRETTIER_MJS at its index.mjs`,
  );
}

// prettier to a verified fixed point: pass 1 is the fleet-standard single
// pass; the game bundle needs a second pass before the output stabilizes
// (prettier's first pass can emit a member-chain break its own second pass
// reflows), so the recipe is "format until unchanged, ≤4 passes, stability
// verified" — audit re-renders with the identical loop
async function formatToFixedPoint(prettier, text, parser) {
  let cur = text;
  let passes = 0;
  for (let i = 0; i < 4; i++) {
    const next = await prettier.format(cur, { parser });
    passes++;
    if (next === cur) break;
    cur = next;
    if (i === 3) throw new Error(`prettier ${parser} does not reach a fixed point in 4 passes`);
  }
  return { text: cur, passes };
}
async function formatOnce(prettier, text, parser) {
  const { text: out, passes } = await formatToFixedPoint(prettier, text, parser);
  if (passes > 1) console.log(`  prettier ${parser}: needed ${passes} passes to stabilize`);
  return out;
}

// ── parse check: the exact standalone gate (ESM stdin) ──────────────────
function parses(text) {
  const r = spawnSync(process.execPath, ["--input-type=module", "--check", "-"], {
    input: text,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return { ok: r.status === 0, why: (r.stderr || "").trim().split("\n").slice(-3).join(" | ") };
}

// ── windowize: cut only at statement starts; ≤350 lines, a single ───────
// ── oversized declaration is a window of its own ────────────────────────
function windowize(stmts) {
  const out = [];
  let cur = null;
  for (const s of stmts) {
    if (!cur) {
      cur = { first: s, last: s, count: 1, startLine: s.startLine, endLine: s.endLine };
      continue;
    }
    const projected = s.endLine - cur.startLine + 1;
    if (projected > MAX_WINDOW) {
      out.push(cur);
      cur = { first: s, last: s, count: 1, startLine: s.startLine, endLine: s.endLine };
    } else {
      cur.last = s;
      cur.count++;
      cur.endLine = s.endLine;
    }
  }
  if (cur) out.push(cur);
  return out;
}

// ── inline block scan (byte-exact, over the raw entry buffer) ───────────
function scanBlocks(buf) {
  const blocks = [];
  for (const [open, close, kind] of [
    ["<script", "</script", "script"],
    ["<style", "</style", "style"],
  ]) {
    let p = 0;
    let n = 0;
    while (true) {
      const i = buf.indexOf(open, p);
      if (i < 0) break;
      const after = buf[i + open.length];
      const boundary =
        after === 0x3e || after === 0x2f || after === 0x20 || after === 0x09 || after === 0x0a || after === 0x0d;
      if (!boundary) {
        p = i + open.length;
        continue;
      }
      const tagEnd = buf.indexOf(">", i);
      if (tagEnd < 0) break;
      const j = buf.indexOf(close, tagEnd + 1);
      if (j < 0) throw new Error(`unterminated <${kind}> opened at byte ${i}`);
      const tag = buf.subarray(i, tagEnd + 1).toString("utf8");
      const external = /\bsrc\s*=\s*["']/i.test(tag);
      if (external) {
        blocks.push({ kind, external: true, tag, openStart: i, contentStart: tagEnd + 1, contentEnd: j });
      } else {
        n++;
        const content = buf.subarray(tagEnd + 1, j);
        blocks.push({
          kind: /\btype\s*=\s*["']importmap["']/i.test(tag) ? "importmap" : kind,
          external: false,
          block: n,
          tag,
          openStart: i,
          contentStart: tagEnd + 1,
          contentEnd: j,
          bytes: content.length,
          sha256: sha256(content),
          text: content.toString("utf8"),
        });
      }
      p = j + close.length;
    }
  }
  return blocks.sort((a, b) => a.openStart - b.openStart);
}

// ── curated content-anchored classification (guards fail loudly) ────────
const MAIN = "assets/index-gCVK5XnX";
const WHOLE_FILE = {
  embed: {
    title: "embed — Wavedash platform embed SDK (vendor runtime, whole-file, never sliced)",
    desc:
      "The Wavedash platform embed loader (embed.js) served at the build-host root next to /embed: it reads " +
      "window.__WAVEDASH_GAME__ (gcid/gbid/swPath/gameplayJwt), mints the session token at /auth/token, " +
      "installs /sw-embed.js, then document.write-boots the game's index.html into the #app element. Platform " +
      "glue — vendor rule: indexed whole-file in readable/, never sliced or rewritten.",
    guard: (t) => t.includes("__WAVEDASH_GAME__") && t.includes("/auth/token"),
    what: "Wavedash platform embed SDK",
  },
  "sw-embed": {
    title: "sw-embed — Wavedash embed service worker (vendor, whole-file, never sliced)",
    desc:
      "The platform's embed service worker: it authorizes every build-host fetch with `Authorization: Bearer " +
      "<jwt>` + `X-Wd-Sw: jwt`, caches embed.js/embed.css and refreshes the gameplay JWT at /auth/refresh. " +
      "Platform machinery — vendor rule: indexed whole-file in readable/, never sliced or rewritten.",
    guard: (t) => t.includes("auth/refresh") && /addEventListener\(\s*["'`]fetch["'`]/.test(t),
    what: "Wavedash embed service worker",
  },
};

// ── recorded semantic rename map (optional input; see engine header) ────
function loadRenameMap() {
  const p = path.join(proj, "rename-map.json");
  if (!fs.existsSync(p)) return { files: {}, scoped: {}, present: false };
  const rm = JSON.parse(fs.readFileSync(p, "utf8"));
  return { files: rm.files || {}, scoped: rm.scoped || {}, present: true };
}
const recordsFor = (rm, srcRel) => {
  const files = rm.files[srcRel];
  const scoped = rm.scoped[srcRel];
  if (!files && !scoped) return null;
  return { files, scoped };
};
// The authored binding map (tools/names.json) — keyed by the READABLE SOURCE
// (the chunk identity, the same key tools/apply-names.mjs reads). Its `app`
// rules are recorded into split-spec per source as `renameBindings` (only the
// rules that actually fired) so the reconstruction gates can rename the
// index-only export tables too — their local-side names reference the renamed
// bindings and are not part of any src slice.
function loadNames() {
  const p = path.join(here, "names.json");
  if (!fs.existsSync(p)) return {};
  const all = JSON.parse(fs.readFileSync(p, "utf8"));
  return all.app || {};
}

async function main() {
  const { mod: prettier, at } = await loadPrettier();
  console.log(`pinned prettier ${PINNED} (${at})`);

  const manifest = JSON.parse(fs.readFileSync(path.join(proj, ".upstream", "manifest.json"), "utf8"));
  const captured = Object.keys(manifest.files).map((r) => r.split(path.sep).join("/")).sort();
  const captureBytes = (rel) => {
    const abs = path.join(proj, rel);
    if (!fs.existsSync(abs)) throw new Error(`capture file missing: ${rel}`);
    const buf = fs.readFileSync(abs);
    if (!manifest.files[rel]?.dynamic && sha256(buf) !== manifest.files[rel].sha256)
      throw new Error(`${rel} on disk does not match .upstream/manifest.json — re-verify the capture first`);
    return buf;
  };

  const readableDir = path.join(proj, "readable");
  const srcDir = path.join(proj, "src");
  fs.mkdirSync(readableDir, { recursive: true });
  fs.mkdirSync(srcDir, { recursive: true });
  const written = { readable: new Set(), src: new Set() };
  const renameMap = loadRenameMap();
  const appNames = loadNames();
  let renamedFiles = 0;
  let renamedNames = 0;

  const sources = [];
  const sections = [];
  const notRendered = [];
  const inlineFiles = [];
  let slicedTotal = 0;
  let skippedTotal = 0;

  const jsRels = captured.filter((r) => /\.js$/i.test(r));
  const cssRels = captured.filter((r) => /\.css$/i.test(r));
  const htmlRels = captured.filter((r) => /\.html$/i.test(r) || r === "embed");

  // ── 0) binary payloads: hashed notRendered (never text-derived) ────────
  for (const rel of captured) {
    if (/\.(js|css|html)$/i.test(rel) || rel === "embed") continue;
    const rec = manifest.files[rel];
    notRendered.push({
      capture: rel,
      kind: rel.endsWith(".webp") ? "texture" : rel.endsWith(".wav") ? "audio" : "payload",
      bytes: rec.bytes,
      sha256: rec.sha256,
      rendered: false,
      reason: "binary payload — served byte-exact from the capture, sha256-recorded, never text-derived",
    });
  }

  // ── 1) JS: vendor -> wholeFile; app -> statement-aligned slices ─────────
  // entry chunk first (the game's entry point), then the module workers, then
  // the platform files — a reading order, not a build order
  const rank = (rel) => (rel === "assets/index-gCVK5XnX.js" ? 0 : /^assets\/.*\.worker-/.test(rel) ? 1 : 2);
  const jsSorted = jsRels.slice().sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  for (const rel of jsSorted) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    if (!Buffer.from(text, "utf8").equals(buf)) throw new Error(`${rel} does not round-trip through utf8`);
    const { text: pretty, passes: prettyPasses } = await formatToFixedPoint(prettier, text, "babel");
    if (prettyPasses > 1) console.log(`  prettier babel: needed ${prettyPasses} passes to stabilize`);
    if (pretty === text)
      throw new Error(`${rel}: prettier output is byte-identical to the capture — nothing to derive`);
    const sourceFile = prettyRelFor(rel);
    writeDerived(sourceFile, pretty);
    written.readable.add(sourceFile);
    const lines = linesOf(pretty);
    const tag = tagOf(rel);
    const cls = WHOLE_FILE[tag];

    if (cls) {
      if (cls.guard && !cls.guard(pretty))
        throw new Error(`${rel}: whole-file guard failed — readable changed shape`);
      sections.push({
        file: `${tag}-vendor.js`,
        wholeFile: true,
        title: cls.title,
        desc: `Lines 1-${lines.length} of ${sourceFile}: ${cls.desc}`,
        note: "whole-file (vendor rule): indexed in readable/, never sliced",
        startLine: 1,
        endLine: lines.length,
        sourceFile,
      });
      sources.push({
        sourceFile,
        capture: rel,
        captureKind: "file",
        captureSha256: manifest.files[rel].sha256,
        captureBytes: buf.length,
        prettyLines: lines.length,
        prettyBytes: Buffer.byteLength(pretty, "utf8"),
        prettyPasses,
        idempotent: true,
        tag,
        slices: 0,
        derived: "readable only (vendor bundle, wholeFile)",
        what: cls.what,
      });
      console.log(`derive: ${rel} -> ${sourceFile} (${lines.length} lines, wholeFile vendor)`);
      continue;
    }

    // ── app chunk: statement-aligned slicing ────────────────────────────
    const dbg = await prettier.__debug.parse(pretty, { parser: "babel" });
    const top = (dbg.ast.program || dbg.ast).body;
    const stmts = top.map((n) => ({
      node: n,
      startLine: lineOf(pretty, n.start),
      endLine: lineOf(pretty, n.end),
      startOffset: n.start,
      endOffset: n.end,
      text: pretty.slice(n.start, n.end),
    }));

    const specials = [];
    const covered = new Array(stmts.length).fill(false);
    const claim = (a, b, block) => {
      if (a < 0 || b < a || b >= stmts.length) throw new Error(`${rel}: bad ${block.file} range ${a}-${b}`);
      for (let i = a; i <= b; i++) {
        if (covered[i]) throw new Error(`${rel}: ${block.file} overlaps another block at statement ${i}`);
        covered[i] = true;
      }
      specials.push({ ...block, A: stmts[a].startLine, B: stmts[b].endLine });
    };

    let appFromStmt = 0; // first app-owned statement (index into stmts)
    let boundaryFragment = null; // { A, B } line range of a mid-declaration head

    if (tag === MAIN) {
      // polyfill: Vite's modulepreload polyfill IIFE opens the chunk
      if (!/modulepreload/.test(pretty.slice(stmts[0].startOffset, stmts[0].endOffset)))
        throw new Error(`${rel}: first statement is not the modulepreload polyfill — readable changed shape`);
      claim(0, 0, {
        kind: "whole",
        file: `${tag}-polyfill-machinery.js`,
        title: `${tag} — Vite modulepreload polyfill (build machinery, whole-file, never sliced)`,
        body: "the Vite-generated modulepreload polyfill IIFE (`link[rel=modulepreload]` relList.supports check + MutationObserver fetch warm-up) — build machinery, not app code; indexed whole-file in readable/, never sliced.",
      });
      // three.js r186 region: everything up to the minifier-merged declaration
      // whose tail carries the first app constants (the physics config object
      // with `wheelRadius`). Located by content, not by a hardcoded line.
      let mergeIdx = -1;
      for (let i = 0; i < stmts.length; i++) {
        const n = stmts[i].node;
        if (n.type !== "VariableDeclaration") continue;
        if (
          (n.declarations || []).some(
            (d) =>
              d.init &&
              d.init.type === "ObjectExpression" &&
              (d.init.properties || []).some(
                (p) => p.key && (p.key.name === "wheelRadius" || p.key.value === "wheelRadius"),
              ),
          )
        ) {
          mergeIdx = i;
          break;
        }
      }
      if (mergeIdx < 1) throw new Error(`${rel}: merged boundary declaration not found — readable changed shape`);
      const merged = stmts[mergeIdx];
      const decl = (merged.node.declarations || []).find(
        (d) =>
          d.init &&
          d.init.type === "ObjectExpression" &&
          (d.init.properties || []).some((p) => p.key && (p.key.name === "wheelRadius" || p.key.value === "wheelRadius")),
      );
      if (!decl) throw new Error(`${rel}: app physics-config declarator (wheelRadius) not found in the merged declaration`);
      const boundaryLine = lineOf(pretty, decl.start);
      // the three.js region covers whole statements 1..mergeIdx-1 and ends at
      // the last line of the last three-only declarator (the line before the
      // app's physics-config declarator inside the merged declaration)
      const vEndLine = boundaryLine - 1;
      const regionText = lines.slice(stmts[1].startLine - 1, vEndLine).join("\n");
      for (const [re, what] of [
        [/revision:\s*`186`|window\.__THREE__/, "three.js r186 revision registration"],
        [/isWebGPURenderer/, "WebGPURenderer"],
        [/WebGLRenderer/, "WebGLRenderer"],
        [/isRenderPipeline/, "RenderPipeline"],
      ])
        if (!re.test(regionText)) throw new Error(`${rel}: vendor region guard failed (${what}) — readable changed shape`);
      if (!/^\s*},?\s*$|^\s*\);\s*$|^\s*\}\s*$/m.test(lines[vEndLine - 1] ?? ""))
        throw new Error(`${rel}: vendor region does not end on a declaration close`);
      claim(1, mergeIdx - 1, {
        kind: "whole",
        file: `${tag}-three-vendor.js`,
        title: `${tag} — bundled three.js r186 (core + node/TSL system + WebGPURenderer/WebGLRenderer) (vendor region, whole-file, never sliced)`,
        body:
          "the bundled three.js r186 engine (math, color management, textures, geometries, materials, objects, " +
          "nodes/TSL, WebGPURenderer, WebGLRenderer, RenderPipeline, `window.__THREE__` r186 registration) — " +
          "vendor, not app code. The region ends where the last three-only declaration closes; the following app " +
          "constants share a minifier-merged `var` declaration whose head closes that three.js code (recorded as " +
          "the first app slice's `boundary` note). Vendor rule — indexed whole-file in readable/, never sliced or " +
          "rewritten.",
      });
      // first app content: the tail of the merged declaration, starting at the
      // app's physics config declarator (mid-declaration) — byte-exact slice
      boundaryFragment = { A: boundaryLine, B: merged.endLine };
      appFromStmt = mergeIdx + 1;
    }

    let exportSkip = null;
    const lastStmt = stmts[stmts.length - 1];
    if (
      lastStmt &&
      lastStmt.node.type === "ExportNamedDeclaration" &&
      !covered[stmts.length - 1] &&
      /^export\s*\{[\s\S]*\}\s*;?$/.test(lastStmt.text.trim()) &&
      !/\bfrom\b/.test(lastStmt.text)
    ) {
      claim(stmts.length - 1, stmts.length - 1, {
        kind: "skip",
        file: `${tag}-tail-export.js`,
        title: `${tag} — final export table (not sliced)`,
        desc: `Lines ${lastStmt.startLine}-${lastStmt.endLine}. The chunk's final export {…} table — the exported bindings live in the earlier slices; a standalone tail carries no new statements, so it is indexed only. Public (exported) names in this table are the capture's own public API names and are never renamed by the campaign.`,
      });
    }

    // runs of uncovered statements -> windows
    const runs = [];
    for (let i = appFromStmt; i < stmts.length; i++) {
      if (covered[i]) continue;
      const run = [stmts[i]];
      while (i + 1 < stmts.length && !covered[i + 1]) run.push(stmts[++i]);
      runs.push(run);
    }
    const slices = [];
    for (const run of runs) for (const w of windowize(run)) slices.push(w);

    // blocks in line order, then re-tile so every line of the pretty is owned
    const blocks = [
      ...specials,
      ...(boundaryFragment
        ? [{ kind: "slice", boundary: true, A: boundaryFragment.A, B: boundaryFragment.B, count: 0 }]
        : []),
      ...slices.map((w) => ({ kind: "slice", A: w.startLine, B: w.endLine, count: w.count })),
    ];
    blocks.sort((a, b) => a.A - b.A);
    for (let i = 0; i < blocks.length; i++) {
      if (i === 0) blocks[i].A = 1;
      if (i + 1 < blocks.length) blocks[i].B = blocks[i + 1].A - 1;
      else blocks[i].B = lines.length;
    }

    let nn = 0;
    let perFileSkipped = 0;
    let perFileVendor = 0;
    let perFileRenamed = 0;
    const targetsByOld = new Map(); // rename map: old name -> Set(targets) seen in this chunk's slices
    const noteTarget = (old, target) => {
      if (!targetsByOld.has(old)) targetsByOld.set(old, new Set());
      targetsByOld.get(old).add(target);
    };
    for (const b of blocks) {
      if (b.kind === "slice") {
        nn++;
        const num = String(nn).padStart(2, "0");
        const file = `${tag}-${num}.js`;
        const rawBody = lines.slice(b.A - 1, b.B).join("\n") + "\n";
        const record = recordsFor(renameMap, file);
        const body = record ? applyRecordedMap(rawBody, record) : rawBody;
        if (record) {
          perFileRenamed++;
          for (const [old, target] of Object.entries(record.files || {})) noteTarget(old, target);
          for (const [old, hits] of Object.entries(record.scoped || {}))
            for (const [, target] of hits) noteTarget(old, target);
        }
        const ms = markerWords(body);
        const topWord = ms.length ? ms[0][0] : /^\s*import\b/.test(body) ? "imports" : tag.toLowerCase();
        const oversized = b.count === 1 && b.B - b.A + 1 > MAX_WINDOW;
        const sliceText =
          sliceHeader({ tag, num, body, sourceFile, startLine: b.A, endLine: b.B }) + body;
        const chk = parses(sliceText);
        if (!chk.ok) throw new Error(`generated src/${file} does not parse standalone: ${chk.why}`);
        writeDerived(path.posix.join("src", file), sliceText);
        written.src.add(path.posix.join("src", file));
        sections.push({
          file,
          title: `${tag} ${num} — ${topWord}`,
          desc:
            (b.boundary
              ? "Boundary fragment: the tail of the minifier-merged `var` declaration whose head closes the three.js vendor region; starts mid-declaration by construction (parses standalone, round-trips byte-exact). "
              : "") +
            (oversized ? "Oversized single declaration (kept whole). " : "") +
            `Lines ${b.A}-${b.B}. Markers: ${markerText(ms)}.` +
            (record ? " Range re-cut through the recorded semantic rename map." : ""),
          startLine: b.A,
          endLine: b.B,
          sourceFile,
        });
      } else if (b.kind === "whole") {
        perFileVendor++;
        // already pushed above for the main-chunk vendor claims; other kinds:
        if (!sections.some((s) => s.file === b.file))
          sections.push({
            file: b.file,
            wholeFile: true,
            title: b.title,
            desc: `Lines ${b.A}-${b.B} of ${sourceFile}: ${b.body}`,
            note: "whole-file region (build machinery/vendor rule): indexed in readable/, never sliced",
            startLine: b.A,
            endLine: b.B,
            sourceFile,
          });
      } else {
        perFileSkipped++;
        sections.push({
          file: b.file,
          skipped: true,
          title: b.title,
          desc: b.desc,
          startLine: b.A,
          endLine: b.B,
          sourceFile,
          firstLine: lines[b.A - 1],
          lastLine: lines[b.B - 1],
        });
      }
    }
    if (perFileRenamed) renamedFiles++;
    // the authored rules that actually fired (evidence: their targets appear in
    // this chunk's recorded map) — the chunk-level binding map recorded in the spec
    const authored = appNames[sourceFile] || {};
    const renameBindings = {};
    for (const [old, target] of Object.entries(authored)) {
      if (targetsByOld.get(old)?.has(target)) {
        renameBindings[old] = target;
        renamedNames++;
      }
    }
    slicedTotal += nn;
    skippedTotal += perFileSkipped;
    sources.push({
      sourceFile,
      capture: rel,
      captureKind: "file",
      captureSha256: manifest.files[rel].sha256,
      captureBytes: buf.length,
      prettyLines: lines.length,
      prettyBytes: Buffer.byteLength(pretty, "utf8"),
      prettyRecipe: `prettier ${PINNED} → fixed point (≤4 passes; stability verified at derive time)`,
      prettyPasses,
      idempotent: true,
      tag,
      slices: nn,
      renameBindings,
      derived:
        `readable + ${nn} statement-aligned slice(s)` +
        (perFileRenamed ? ` (${perFileRenamed} through the recorded rename map)` : "") +
        (perFileVendor ? ` + ${perFileVendor} wholeFile region(s)` : "") +
        (perFileSkipped ? ` + ${perFileSkipped} skipped section(s)` : ""),
    });
    console.log(
      `derive: ${rel} -> ${sourceFile} (${lines.length} lines, ${nn} slices${perFileRenamed ? `, ${perFileRenamed} renamed` : ""}, ${perFileVendor} wholeFile, ${perFileSkipped} skipped)`,
    );
  }

  // ── 2) CSS: readable pretty, wholeFile section (stylesheet rule) ────────
  for (const rel of cssRels) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    const { text: pretty, passes: prettyPasses } = await formatToFixedPoint(prettier, text, "css");
    if (pretty === text) throw new Error(`${rel}: prettier output is byte-identical to the capture`);
    const sourceFile = prettyRelFor(rel);
    writeDerived(sourceFile, pretty);
    written.readable.add(sourceFile);
    const lines = linesOf(pretty);
    const tag = tagOf(rel);
    sections.push({
      file: `${tag}.css`,
      wholeFile: true,
      title: `${tag} — stylesheet (whole-file, never sliced)`,
      desc: `Lines 1-${lines.length} of ${sourceFile}. Whole-file (stylesheet rule): the capture stylesheet is indexed whole in readable/, never sliced.`,
      note: "whole-file (stylesheet, not sliced): CSS is indexed whole in readable/",
      startLine: 1,
      endLine: lines.length,
      sourceFile,
    });
    sources.push({
      sourceFile,
      capture: rel,
      captureKind: "file",
      captureSha256: manifest.files[rel].sha256,
      captureBytes: buf.length,
      prettyLines: lines.length,
      prettyBytes: Buffer.byteLength(pretty, "utf8"),
      prettyRecipe: `prettier ${PINNED} → fixed point (≤4 passes; stability verified at derive time)`,
      prettyPasses,
      idempotent: true,
      tag,
      slices: 0,
      derived: "readable only (stylesheet, wholeFile)",
    });
    console.log(`derive: ${rel} -> ${sourceFile} (${lines.length} lines, wholeFile stylesheet)`);
  }

  // ── 3) HTML entry documents: inline <script>/<style> scan + twins ───────
  const inlineMapBlocks = [];
  for (const rel of htmlRels) {
    const buf = captureBytes(rel);
    const blocks = scanBlocks(buf);
    const inline = blocks.filter((b) => !b.external);
    const external = blocks.filter((b) => b.external);
    inlineFiles.push(rel);
    for (const b of external)
      console.log(`derive: ${rel}: external ${b.kind} (not derived): ${b.tag.slice(0, 90)}`);
    if (!inline.length) {
      console.log(`derive: ${rel}: no inline <script>/<style> content blocks — no inline twins`);
      continue;
    }
    const entryTag = rel.replace(/\.html$/i, "");
    for (const b of inline) {
      const isImportmap = b.kind === "importmap";
      const parser = isImportmap ? "json" : b.kind === "style" ? "css" : "babel";
      const tag = `${entryTag}-inline-${b.block}`;
      const prettyFile = `${tag}.pretty.${isImportmap ? "json" : b.kind === "style" ? "css" : "js"}`;
      const { text: pretty, passes: prettyPasses } = await formatToFixedPoint(prettier, b.text, parser);
      if (pretty === b.text)
        throw new Error(`readable/${prettyFile} would be byte-identical to its capture source`);
      writeDerived(path.posix.join("readable", prettyFile), pretty);
      written.readable.add(path.posix.join("readable", prettyFile));
      const lines = linesOf(pretty);
      const prettyBuf = Buffer.from(pretty, "utf8");
      sections.push({
        file: `${tag}.${isImportmap ? "json" : b.kind === "style" ? "css" : "js"}`,
        wholeFile: true,
        title: `${tag} — inline ${b.kind} block (whole-file, never sliced)`,
        desc: `Lines 1-${lines.length} of readable/${prettyFile}. Whole-file: the entry document's inline ${b.kind} block (${b.bytes} B at bytes ${b.contentStart}-${b.contentEnd} of ${rel}) is indexed whole and never sliced.`,
        note: `whole-file (entry inline ${b.kind} block, not sliced)`,
        startLine: 1,
        endLine: lines.length,
        sourceFile: `readable/${prettyFile}`,
      });
      sources.push({
        sourceFile: `readable/${prettyFile}`,
        capture: rel,
        captureKind: `inline-${b.kind}`,
        captureByteStart: b.contentStart,
        captureByteEnd: b.contentEnd,
        captureSha256: b.sha256,
        captureBytes: b.bytes,
        prettyLines: lines.length,
        prettyBytes: prettyBuf.length,
        prettySha256: sha256(prettyBuf),
        prettyPasses,
        tag,
        slices: 0,
        derived: "readable only (inline block, wholeFile)",
      });
      inlineMapBlocks.push({
        file: `readable/${prettyFile}`,
        source: rel,
        kind: b.kind,
        block: b.block,
        byteStart: b.contentStart,
        byteEnd: b.contentEnd,
        captureBytes: b.bytes,
        captureSha256: b.sha256,
        prettyBytes: prettyBuf.length,
        prettySha256: sha256(prettyBuf),
      });
    }
  }
  writeDerived(
    "readable/index-inline-map.json",
    JSON.stringify(
      {
        note: "inline <script>/<style> byte ranges + sha256 inside the captured documents",
        blocks: inlineMapBlocks,
      },
      null,
      2,
    ) + "\n",
  );
  written.readable.add("readable/index-inline-map.json");

  // ── 4) prune orphan derived files (capture untouched) ──────────────────
  let pruned = 0;
  const walkFiles = (dir, base = dir, out = []) => {
    if (!fs.existsSync(dir)) return out;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walkFiles(p, base, out);
      else out.push(path.relative(base, p).split(path.sep).join("/"));
    }
    return out;
  };
  const removeEmptyDirs = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const p = path.join(dir, e.name);
      removeEmptyDirs(p);
      if (fs.existsSync(p) && fs.readdirSync(p).length === 0) fs.rmdirSync(p);
    }
  };
  for (const [dir, keep, exts] of [
    [readableDir, written.readable, /\.(pretty\.js|pretty\.css)$/],
    [srcDir, written.src, /\.js$/],
  ]) {
    for (const f of walkFiles(dir)) {
      const relFull = path.posix.join(path.basename(dir), f);
      if (exts.test(f) && !keep.has(relFull)) {
        fs.rmSync(path.join(dir, f));
        pruned++;
        console.log(`derive: pruned orphan derived file ${relFull}`);
      }
    }
    removeEmptyDirs(dir);
  }

  // ── 5) split-spec.json (2-space indent + trailing newline) ─────────────
  const indexedOccurrences = Object.values(renameMap.scoped).reduce(
    (n, m) => n + Object.values(m).reduce((k, hits) => k + hits.length, 0),
    0,
  );
  const appJs = sources.filter((s) => s.derived.startsWith("readable +"));
  const vendorJsS = sources.filter((s) => /wholeFile\)$/.test(s.derived) && s.capture.endsWith(".js"));
  const cssSources = sources.filter((s) => s.sourceFile.endsWith(".pretty.css"));
  const spec = {
    project: "bmx-mountain",
    kind: "statement-aligned-slices",
    defaultFile: `src/${sections.find((s) => !s.wholeFile && !s.skipped).file}`,
    note:
      "BMX MOUNTAIN (https://wavedash.com/games/bmx-mountain) is capture-class: a custom Vite " +
      "production build served by the Wavedash platform from a per-build CDN host (the platform page " +
      "server-renders playKey/gameCloudId/gameBuild and the game runs in an iframe whose src carries the " +
      "playKey + sdkconfig; see tools/update.mjs). §0.4 fork-over-mirror was checked on 2026-10-13 — the " +
      "page carries no link to a public source repo (platform SDK/library credits only; the bundle ships no " +
      "LICENSE/source references of its own), so the mirror stands. Derived pipeline: capture → pinned " +
      "prettier 3.9.6 (module API, default options, applied to a VERIFIED FIXED POINT — ≤4 passes, " +
      "stability checked at derive time; every file stabilizes in one pass except the main game bundle, " +
      "which needs two; never the CLI: it respects .gitignore and can silently echo its input) → " +
      "readable/<served path>.pretty.js|css per captured JS/CSS file (the capture preserves the served URL " +
      "structure — repo root == CDN host root — so the derived layers MIRROR it: real subdirectories and " +
      "the served filenames (hash included) are kept, no __-flattening; every pretty provably NOT " +
      "byte-identical to its capture source) → statement-aligned slices src/<served path>-NN.js of every " +
      "APP chunk (top-level declaration boundaries only, ~250-350 line windows; oversized single " +
      "declarations stay whole) with an exact 2-line provenance header. The identifier rename campaign " +
      "(PLAN §5) is applied to the app slices: the chunk's top-level bindings get semantic names " +
      "(tools/names.json), written by tools/apply-names.mjs with a scope-aware token pass, recovered " +
      "mechanically into rename-map.json (tools/recover-scoped-map.mjs: token alignment, non-identifier " +
      "positions identical) and re-applied by tools/derive.mjs through that recorded map — `files` " +
      "word-boundary records plus `scoped` token-index records; the chunk's fired bindings are recorded " +
      "here as sources[].renameBindings. Vendor identifiers and public export names keep their served " +
      "names. Every slice parses standalone under `node --input-type=module --check -` and round-trips " +
      "byte-exact to its recorded readable line range (through the recorded rename map where the chunk is " +
      "renamed). Vendor rule — wholeFile sections, never sliced: embed.js (Wavedash platform embed SDK), " +
      "sw-embed.js (embed service worker), the Vite modulepreload polyfill and the bundled three.js r186 " +
      "region inside assets/index-gCVK5XnX.js (core + node/TSL + WebGPURenderer/WebGLRenderer), " +
      "content-anchored and guarded. Boundary note: the app's first slice is the tail of a minifier-merged " +
      "`var` declaration whose head closes the three.js region, so it starts mid-declaration (flagged " +
      "`boundary`; still byte-exact and standalone-parsing). Machinery/non-standalone parts are skipped or " +
      "wholeFile sections, indexed but never sliced. Stylesheet rule — embed.css is wholeFile. Inline " +
      "<script>/<style> scan: index.html carries one inline <style> block; `embed` (the dynamic platform " +
      "shell, JWT-bearing) carries the inline window.__WAVEDASH_GAME__ boot script — twins + readable/" +
      "index-inline-map.json (the `embed` bytes rotate per session: JWT/sessionToken, marked dynamic in " +
      "the manifest). Binary payloads — tex/*.webp (24 textures) and sfx/*.wav (45 sounds) — are " +
      "sha256-recorded notRendered: served byte-exact, never text-derived, never re-encoded. Capture bytes " +
      "are untouched by everything above; re-cut with `node tools/derive.mjs` after any capture refresh. " +
      "`node tools/audit.js` is the gate.",
    renderOptions: {
      _default:
        "prettier 3.9.6, module API, default options, applied to a verified fixed point (≤4 passes; one pass stabilizes every file except the main game bundle, which needs two) — never the CLI: it respects .gitignore and can silently echo its input",
      js: "parser babel, no plugins",
      css: "parser css, no plugins",
      json: "parser json, no plugins (inline importmap blocks, if any)",
    },
    source:
      `readable/: ${sources.filter((s) => s.sourceFile?.endsWith(".pretty.js")).length} JS pretties ` +
      `(${appJs.length} app chunk(s) sliced, ${vendorJsS.length} vendor wholeFile) + ` +
      `${cssSources.length} CSS pretties; ` +
      `src/: ${appJs.reduce((n, s) => n + s.slices, 0)} statement-aligned slices across ${appJs.length} app chunk(s) ` +
      `(served-path layout, <chunk>-NN.js); ` +
      `${sections.filter((s) => s.skipped).length} skipped section(s); ` +
      `${sections.filter((s) => s.wholeFile).length} wholeFile section(s); ` +
      `rename campaign: ${renamedFiles} app chunk(s) with recorded renames ` +
      `(${renamedNames} name record(s), ${indexedOccurrences} indexed occurrence(s)) through rename-map.json; ` +
      `capture: ${captured.length} files under .upstream/manifest.json; ` +
      `notRendered: ${notRendered.length} binary payload(s) (tex/sfx); inline scan: ${inlineFiles.join(", ")} ` +
      `(${inlineMapBlocks.length} inline content block(s)).`,
    rename: {
      map: "rename-map.json",
      chunks: renamedFiles,
      names: renamedNames,
      indexedOccurrences,
      note:
        "Semantic renames are recorded per slice in rename-map.json and re-applied on every re-cut. " +
        "Vendor identifiers and public export names keep their served names (vendor/non-standalone rule).",
    },
    inline: {
      scanned: inlineFiles,
      contentBlocks: inlineMapBlocks.length,
      notRendered: 0,
      note:
        "index.html carries one inline <style> block; `embed` carries the platform's inline " +
        "window.__WAVEDASH_GAME__ boot script (rotating JWT/sessionToken — the capture bytes are the " +
        "snapshot, marked dynamic in the manifest). Twins + readable/index-inline-map.json record byte " +
        "ranges and sha256 of both.",
    },
    sources,
    sections,
    notRendered,
  };
  writeDerived("split-spec.json", JSON.stringify(spec, null, 2) + "\n");

  // ── 6) self-check (tools/audit.js is the authoritative gate) ────────────
  let bad = 0;
  const bySource = new Map();
  for (const s of sections) {
    if (!bySource.has(s.sourceFile)) bySource.set(s.sourceFile, []);
    bySource.get(s.sourceFile).push(s);
  }
  for (const [sourceFile, list] of bySource) {
    const lines = readLines(path.join(proj, sourceFile));
    const sorted = [...list].sort((a, b) => a.startLine - b.startLine);
    if (sorted[0].startLine !== 1) {
      console.error(`TILING FAIL ${sourceFile}: starts at line ${sorted[0].startLine}`);
      bad++;
    }
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i].startLine !== sorted[i - 1].endLine + 1) {
        console.error(`TILING FAIL ${sourceFile}: gap/overlap at ${sorted[i].file}`);
        bad++;
      }
    if (sorted[sorted.length - 1].endLine !== lines.length) {
      console.error(`TILING FAIL ${sourceFile}: does not reach EOF (${lines.length})`);
      bad++;
    }
  }
  let parsed = 0;
  let ranged = 0;
  let roundOK = 0;
  for (const s of sections) {
    if (s.wholeFile || s.skipped) continue;
    ranged++;
    const abs = path.join(proj, "src", s.file);
    const text = fs.readFileSync(abs, "utf8");
    const nl2 = text.indexOf("\n", text.indexOf("\n") + 1);
    const body = text.slice(nl2 + 1);
    const raw = readLines(path.join(proj, s.sourceFile)).slice(s.startLine - 1, s.endLine).join("\n") + "\n";
    const record = recordsFor(renameMap, s.file);
    const expected = record ? applyRecordedMap(raw, record) : raw;
    if (body !== expected) {
      console.error(`ROUND-TRIP FAIL ${s.file}`);
      bad++;
    } else roundOK++;
    if (!parses(text).ok) {
      console.error(`PARSE FAIL src/${s.file}`);
      bad++;
    } else parsed++;
  }
  let prettyParsed = 0;
  for (const s of sources) {
    if (!s.sourceFile?.endsWith(".pretty.js")) continue;
    if (!parses(fs.readFileSync(path.join(proj, s.sourceFile), "utf8")).ok) {
      console.error(`PARSE FAIL ${s.sourceFile}`);
      bad++;
    } else prettyParsed++;
  }
  console.log(
    `derive: ${written.readable.size} readable file(s), ${written.src.size} src slices ` +
      `(${parsed}/${ranged} parse standalone, ${roundOK}/${ranged} round-trip byte-exact), ` +
      `${skippedTotal} skipped, ${sections.filter((s) => s.wholeFile).length} wholeFile, ` +
      `${prettyParsed} pretty js parse clean, ${notRendered.length} notRendered, ${pruned} orphan(s) pruned — ` +
      `self-check ${bad ? bad + " FAILURE(S)" : "clean"}`,
  );
  if (bad) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
