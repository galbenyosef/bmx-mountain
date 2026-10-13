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
// Pipeline:
//   each capture *.js -> pinned prettier 3.9.6 (module API — the CLI respects
//                        .gitignore and can silently echo its input), single
//                        pass, verified idempotent -> readable/<name>.pretty.js
//                        (capture-root-relative name; nested dirs flattened
//                        with __).
//   the capture embed.css -> readable/embed.pretty.css, wholeFile section
//                        (stylesheet rule: stylesheets are never sliced).
//   vendor bundles     -> readable/ + wholeFile section (vendor rule): the
//                        Wavedash platform embed SDK (embed.js), the embed
//                        service worker (sw-embed.js) and the modulepreload
//                        polyfill + the bundled three.js r186 region (core +
//                        node/TSL system + WebGPURenderer/WebGLRenderer) inside
//                        assets/index-gCVK5XnX.js are indexed whole, never
//                        sliced.
//   app chunks         -> statement-aligned slices src/<name>-NN.js at
//                        top-level declaration boundaries, ~250-350 line
//                        windows (oversized single declarations stay whole),
//                        exact 2-line provenance header; every slice is
//                        parse-checked with `node --input-type=module --check
//                        -` and round-trips byte-exact to its readable range.
//                        One recorded exception: the app's first slice is the
//                        tail of a minifier-merged `var` declaration whose head
//                        closes the three.js vendor region, so it starts
//                        mid-declaration (still byte-exact and standalone-
//                        parsing) — flagged `boundary` in the spec.
//   entry documents    -> inline <script>/<style> scan (byte ranges + sha256):
//                        index.html carries one inline <style> block, `embed`
//                        carries the rotating window.__WAVEDASH_GAME__ inline
//                        <script> boot block — twins + readable/index-inline-
//                        map.json.
//   binary payloads    -> tex/*.webp + sfx/*.wav are hashed notRendered
//                        (served byte-exact; never text-derived).
//
// Identifiers in src/ are the bundle's own minified names — the rename
// campaign (PLAN §5) is recorded as an open task in README.md. usage:
//   node tools/derive.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

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

// capture-relative name -> readable twin name (dirs flattened with __)
const tagOf = (capRel) => capRel.replace(/\.(js|css)$/i, "").split("/").join("__");
const prettyRelFor = (capRel) =>
  "readable/" + tagOf(capRel) + (/\.css$/i.test(capRel) ? ".pretty.css" : ".pretty.js");

// ── pinned prettier (module API, exactly 3.9.6) ─────────────────────────
async function loadPrettier() {
  const candidates = [
    process.env.PRETTIER_MJS,
    path.join(proj, "node_modules", "prettier", "index.mjs"),
    "D:/repos/mirrors/metropolygonia/node_modules/prettier/index.mjs",
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
  throw new Error(`pinned prettier ${PINNED} not found (set PRETTIER_MJS to its index.mjs)`);
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
  return { out: cur, passes };
}
async function formatOnce(prettier, text, parser) {
  const { out, passes } = await formatToFixedPoint(prettier, text, parser);
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

// ── markers for titles (top tokens, lowercase; fleet convention) ────────
const STOP = new Set(
  ("function return typeof undefined object string number boolean prototype length value default " +
    "exports import this that with from then else case break continue delete instanceof constructor " +
    "arguments void null true false call apply name type text target window document globalthis self " +
    "require module async await yield static class const let var new for while switch throw try catch " +
    "finally extends super using debugger of in do if has own hasown get set")
    .split(" ")
    .filter(Boolean),
);
function markers(text, n = 2) {
  const code = text.replace(/`[^`]*`|"[^"\n]*"|'[^'\n]*'/g, " ");
  const counts = new Map();
  for (const m of code.matchAll(/[A-Za-z][A-Za-z0-9_]{2,}/g)) {
    const w = m[0].toLowerCase();
    if (STOP.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);
}
const markerText = (ms) => ms.map(([w, c]) => `${w}(${c})`).join(", ");

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
const MAIN = "assets/index-gCVK5XnX.js";
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
  const rank = (rel) => (rel === MAIN ? 0 : /^assets\/.*\.worker-/.test(rel) ? 1 : 2);
  const jsSorted = jsRels.slice().sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  for (const rel of jsSorted) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    if (!Buffer.from(text, "utf8").equals(buf)) throw new Error(`${rel} does not round-trip through utf8`);
    const pretty = await formatOnce(prettier, text, "babel");
    if (pretty === text)
      throw new Error(`${rel}: prettier output is byte-identical to the capture — nothing to derive`);
    const sourceFile = prettyRelFor(rel);
    fs.writeFileSync(path.join(proj, sourceFile), pretty);
    written.readable.add(path.basename(sourceFile));
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

    if (rel === MAIN) {
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
      // whose tail carries the first app constants (J = physics config).
      const merged = stmts.find(
        (s) => s.node.type === "VariableDeclaration" && s.startLine <= 47339 && s.endLine >= 47339,
      );
      if (!merged) throw new Error(`${rel}: merged boundary declaration not found — readable changed shape`);
      const decl = (merged.node.declarations || []).find(
        (d) =>
          d.init &&
          d.init.type === "ObjectExpression" &&
          (d.init.properties || []).some((p) => p.key && (p.key.name === "wheelRadius" || p.key.value === "wheelRadius")),
      );
      if (!decl) throw new Error(`${rel}: app physics-config declarator (wheelRadius) not found in the merged declaration`);
      const boundaryLine = lineOf(pretty, decl.start);
      const mergeIdx = stmts.indexOf(merged);
      if (mergeIdx < 1) throw new Error(`${rel}: polyfill/three region boundary is not where the readable shape says`);
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
      /^export\s*\{[\s\S]*\}\s*;?$/.test(pretty.slice(lastStmt.startOffset, lastStmt.endOffset).trim()) &&
      !/\bfrom\b/.test(pretty.slice(lastStmt.startOffset, lastStmt.endOffset))
    ) {
      claim(stmts.length - 1, stmts.length - 1, {
        kind: "skip",
        file: `${tag}-tail-export.js`,
        title: `${tag} — final export table (not sliced)`,
        desc: `Lines ${lastStmt.startLine}-${lastStmt.endLine}. The chunk's final export {…} table — the exported bindings live in the earlier slices; a standalone tail carries no new statements, so it is indexed only.`,
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
    for (const b of blocks) {
      if (b.kind === "slice") {
        nn++;
        const num = String(nn).padStart(2, "0");
        const body = lines.slice(b.A - 1, b.B).join("\n") + "\n";
        const ms = markers(body);
        const topWord = ms.length ? ms[0][0] : /^\s*import\b/.test(body) ? "imports" : tag.toLowerCase();
        const oversized = b.count === 1 && b.B - b.A + 1 > MAX_WINDOW;
        const file = `${tag}-${num}.js`;
        const sliceText =
          `// ${tag} ${num} — ${topWord}\n` +
          `// Lines ${b.A}-${b.B} of ${sourceFile} (statement-aligned).\n` +
          body;
        const chk = parses(sliceText);
        if (!chk.ok) throw new Error(`generated src/${file} does not parse standalone: ${chk.why}`);
        fs.writeFileSync(path.join(srcDir, file), sliceText);
        written.src.add(file);
        sections.push({
          file,
          title: `${tag} ${num} — ${topWord}`,
          desc:
            (b.boundary
              ? "Boundary fragment: the tail of the minifier-merged `var` declaration whose head closes the three.js vendor region; starts mid-declaration by construction (parses standalone, round-trips byte-exact). "
              : "") +
            (oversized ? "Oversized single declaration (kept whole). " : "") +
            `Lines ${b.A}-${b.B}. Markers: ${markerText(ms)}.`,
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
      prettyRecipe: 'prettier 3.9.6 → fixed point (≤4 passes; stability verified at derive time)',
      tag,
      slices: nn,
      derived:
        `readable + ${nn} statement-aligned slice(s)` +
        (perFileVendor ? ` + ${perFileVendor} wholeFile region(s)` : "") +
        (perFileSkipped ? ` + ${perFileSkipped} skipped section(s)` : ""),
    });
    console.log(
      `derive: ${rel} -> ${sourceFile} (${lines.length} lines, ${nn} slices, ${perFileVendor} wholeFile, ${perFileSkipped} skipped)`,
    );
  }

  // ── 2) CSS: readable pretty, wholeFile section (stylesheet rule) ────────
  for (const rel of cssRels) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    const pretty = await formatOnce(prettier, text, "css");
    if (pretty === text) throw new Error(`${rel}: prettier output is byte-identical to the capture`);
    const sourceFile = prettyRelFor(rel);
    fs.writeFileSync(path.join(proj, sourceFile), pretty);
    written.readable.add(path.basename(sourceFile));
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
      prettyRecipe: 'prettier 3.9.6 → fixed point (≤4 passes; stability verified at derive time)',
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
    const entryTag = rel.replace(/\.html$/i, "").split("/").join("__");
    for (const b of inline) {
      const isImportmap = b.kind === "importmap";
      const parser = isImportmap ? "json" : b.kind === "style" ? "css" : "babel";
      const tag = `${entryTag}-inline-${b.block}`;
      const prettyFile = `${tag}.pretty.${isImportmap ? "json" : b.kind === "style" ? "css" : "js"}`;
      const pretty = await formatOnce(prettier, b.text, parser);
      if (pretty === b.text)
        throw new Error(`readable/${prettyFile} would be byte-identical to its capture source`);
      fs.writeFileSync(path.join(readableDir, prettyFile), pretty);
      written.readable.add(prettyFile);
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
  fs.writeFileSync(
    path.join(readableDir, "index-inline-map.json"),
    JSON.stringify(
      {
        note: "inline <script>/<style> byte ranges + sha256 inside the captured documents",
        blocks: inlineMapBlocks,
      },
      null,
      2,
    ) + "\n",
  );

  // ── 4) prune orphan derived files (capture untouched) ──────────────────
  let pruned = 0;
  for (const [dir, keep, exts] of [
    [readableDir, written.readable, /\.(pretty\.js|pretty\.css)$/],
    [srcDir, written.src, /\.js$/],
  ]) {
    for (const f of fs.readdirSync(dir)) {
      if (exts.test(f) && !keep.has(f)) {
        fs.rmSync(path.join(dir, f));
        pruned++;
        console.log(`derive: pruned orphan derived file ${path.join(path.basename(dir), f)}`);
      }
    }
  }

  // ── 5) split-spec.json (2-space indent + trailing newline) ─────────────
  const appJs = sources.filter((s) => s.derived.startsWith("readable +"));
  const vendorJsS = sources.filter((s) => /wholeFile\)$/.test(s.derived) && s.capture.endsWith(".js"));
  const spec = {
    project: "bmx-mountain",
    kind: "statement-aligned-slices",
    defaultFile: `src/${sections.find((s) => !s.wholeFile && !s.skipped).file}`,
    note:
      "BMX MOUNTAIN (https://wavedash.com/games/bmx-mountain) is capture-class: a custom Vite production " +
      "build served by the Wavedash platform from a per-build CDN host (the platform page server-renders " +
      "playKey/gameCloudId/gameBuild and the game runs in an iframe whose src carries the playKey + sdkconfig; " +
      "see tools/update.mjs). §0.4 fork-over-mirror was checked on 2026-10-13 — the page carries no link to a " +
      "public source repo (platform SDK/library credits only; the bundle ships no LICENSE/source references of " +
      "its own), so the mirror stands. Derived pipeline: capture → pinned prettier 3.9.6 (module API, default " +
      "options, applied to a VERIFIED FIXED POINT — ≤4 passes, stability checked at derive time; every file " +
      "stabilizes in one pass except the main game bundle, which needs two; never the CLI: it respects " +
      ".gitignore and can silently echo its input) → readable/<name>.pretty.js|css per captured JS/CSS file " +
      "(capture-root-relative name with nested dirs flattened with __; every pretty provably NOT byte-identical " +
      "to its capture source) → " +
      "statement-aligned slices src/<name>-NN.js of every APP chunk (top-level declaration boundaries only, " +
      "~250-350 line windows; oversized single declarations stay whole) with an exact 2-line provenance header. " +
      "Every slice parses standalone under `node --input-type=module --check -` and round-trips byte-exact to " +
      "its recorded readable line range. Vendor rule — wholeFile sections, never sliced: embed.js (Wavedash " +
      "platform embed SDK), sw-embed.js (embed service worker), the Vite modulepreload polyfill and the " +
      "bundled three.js r186 region inside assets/index-gCVK5XnX.js (core + node/TSL + WebGPURenderer/" +
      "WebGLRenderer), content-anchored and guarded. Boundary note: the app's first slice is the tail of a " +
      "minifier-merged `var` declaration whose head closes the three.js region, so it starts mid-declaration " +
      "(flagged `boundary`; still byte-exact and standalone-parsing). Machinery/non-standalone parts are " +
      "skipped or wholeFile sections, indexed but never sliced: the final export table of every module worker. " +
      "Stylesheet rule — embed.css is wholeFile. Inline <script>/<style> scan: index.html carries one inline " +
      "<style> block; `embed` (the dynamic platform shell, JWT-bearing) carries the inline " +
      "window.__WAVEDASH_GAME__ boot script — twins + readable/index-inline-map.json (the `embed` bytes " +
      "rotate per session: JWT/sessionToken, marked dynamic in the manifest). Binary payloads — tex/*.webp " +
      "(24 textures) and sfx/*.wav (45 sounds) — are sha256-recorded notRendered: served byte-exact, never " +
      "text-derived, never re-encoded. Identifiers in src/ are the bundle's own minified names — the rename " +
      "campaign (PLAN §5) is recorded as an open task in README.md, not claimed here. Capture bytes are " +
      "untouched by everything above; re-cut with `node tools/derive.mjs` after any capture refresh. " +
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
      `${sources.filter((s) => s.sourceFile?.endsWith(".pretty.css")).length} CSS pretties; ` +
      `src/: ${appJs.reduce((n, s) => n + s.slices, 0)} statement-aligned slices across ${appJs.length} app chunk(s); ` +
      `${sections.filter((s) => s.skipped).length} skipped section(s); ` +
      `${sections.filter((s) => s.wholeFile).length} wholeFile section(s); ` +
      `capture: ${captured.length} files under .upstream/manifest.json; ` +
      `notRendered: ${notRendered.length} binary payload(s) (tex/sfx); inline scan: ${inlineFiles.join(", ")} ` +
      `(${inlineMapBlocks.length} inline content block(s)).`,
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
  fs.writeFileSync(path.join(proj, "split-spec.json"), JSON.stringify(spec, null, 2) + "\n");

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
    const abs = path.join(srcDir, s.file);
    const text = fs.readFileSync(abs, "utf8");
    const nl2 = text.indexOf("\n", text.indexOf("\n") + 1);
    const body = text.slice(nl2 + 1);
    const expected = readLines(path.join(proj, s.sourceFile)).slice(s.startLine - 1, s.endLine).join("\n") + "\n";
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
