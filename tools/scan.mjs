// scan.mjs — closure fixpoint scanner for the BMX MOUNTAIN capture (PLAN §4).
// usage: node tools/scan.mjs            # print all referenced-but-missing candidates
//        node tools/scan.mjs --all      # print every extracted reference
//
// Scans every captured text file for references the runtime network log may
// have missed: module script/link refs, import()/from specifiers, new URL()
// asset expressions, worker URLs and quoted asset-path literals (/tex, /sfx,
// /assets, /models, /anim, /tracks — the whole build tree). A reference is
// "missing" when the corresponding file is not on disk under the repo root.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const SHOW_ALL = process.argv.includes("--all");
const SKIP_TOP = new Set(["tools", ".git", ".upstream", ".work", "docs", "readable", "src", "node_modules", "legacy"]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.relative(proj, path.join(dir, e.name)).split(path.sep).join("/");
    const top = rel.split("/")[0];
    if (SKIP_TOP.has(top)) continue;
    if (e.isDirectory()) walk(path.join(dir, e.name), out);
    else out.push(rel);
  }
  return out;
}

const TEXT_EXT = new Set([".js", ".mjs", ".html", ".css", ".json", ".txt", ".wgsl", ".webmanifest"]);
const files = walk(proj).filter((f) => TEXT_EXT.has(path.extname(f).toLowerCase()));
const refs = new Map(); // candidate path (no leading slash) -> {from:Set}
const add = (p, from) => {
  if (!p) return;
  let c = p.replace(/^\.\//, "").replace(/^\//, "");
  if (/^[a-z]+:/i.test(c) || c.startsWith("data:") || c.startsWith("#") || c.startsWith("?")) return;
  if (c.includes("${") || c.includes("\\") || /[<>{}"'`]/.test(c)) return;
  if (!c.includes("/") && !/\.(js|css|html|wasm|json|ico|png|webp|jpg|wav|mp3|glb|wgsl|bin|data)$/i.test(c)) return;
  c = c.split("?")[0].split("#")[0];
  if (!c) return;
  if (!refs.has(c)) refs.set(c, { from: new Set() });
  refs.get(c).from.add(from);
};

// path-shaped literals anywhere in the text (covers fetch("..."), tables, keys)
const PATHY = /["'`]((?:\.?\/)?(?:assets|tex|sfx|models|anim|tracks|textures|audio|fonts|data|wasm|snippets)\/[A-Za-z0-9._\-/@]+)["'`]/g;
for (const rel of files) {
  const text = fs.readFileSync(path.join(proj, rel), "utf8");
  // HTML refs
  for (const m of text.matchAll(/<(?:script|link|img|source|audio|video)[^>]+(?:src|href)=["']([^"']+)["']/g)) add(m[1], rel);
  // import specifiers: static from, bare, dynamic
  for (const m of text.matchAll(/\bimport\s*\(?\s*["']([^"']+)["']/g)) add(m[1], rel);
  for (const m of text.matchAll(/\bfrom\s*["']([^"']+)["']/g)) add(m[1], rel);
  // new URL("x", import.meta.url)
  for (const m of text.matchAll(/new\s+URL\s*\(\s*["']([^"']+)["']/g)) add(m[1], rel);
  // path literals
  for (const m of text.matchAll(PATHY)) add(m[1], rel);
}

const missing = [];
const present = [];
for (const [p, info] of [...refs.entries()].sort()) {
  const onDisk = fs.existsSync(path.join(proj, p));
  (onDisk ? present : missing).push({ p, from: [...info.from].slice(0, 3) });
}
if (SHOW_ALL) {
  console.log(`refs total ${refs.size} (present ${present.length}, missing ${missing.length})`);
  for (const r of [...present, ...missing]) console.log(`${fs.existsSync(path.join(proj, r.p)) ? "  " : "M "}${r.p}  ← ${r.from.join(", ")}`);
} else {
  console.log(`missing candidates: ${missing.length}`);
  for (const r of missing) console.log(`${r.p}  ← ${r.from.join(", ")}`);
}
