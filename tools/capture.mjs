// capture.mjs — (re)fetch the BMX MOUNTAIN build closure into the repo root.
// usage: node tools/capture.mjs [--dry-run] [--list <file>]
//
// Reproducible record of HOW the capture was assembled (2026-10-13) and the
// refresh path (PLAN §3). The platform mechanics are shared with the sibling
// wavedash mirror blood-slayers (see tools/update.mjs for the full write-up):
// the game page server-renders a per-load bootstrap (playKey, gameCloudId,
// gameBuild metadata); the game itself is served by a per-build CDN host
//
//   https://<gameCloudId>-<fnv32(userId)>-<fnv32(gameBuildId)>.builds.wavedashcdn.com
//
// /embed?…&pk=<playKey>&sdkconfig=… answers the shell carrying a ~1 h
// gameplay JWT; every build-file request then travels with
// `Authorization: Bearer <jwt>` + `X-Wd-Sw: jwt`.
//
// The candidate universe is network-log-led: it starts from the browser
// network log captured while loading and playing the game
// (docs/network-log-2026-10-13.jsonl) and the static scan of the captured
// files (tools/scan.mjs) — the script re-derives that same list here.
//
//   node tools/capture.mjs
//   node tools/make-manifest.mjs . .upstream/manifest.json
//   node tools/derive.mjs && node tools/audit.js && node tools/verify.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const DRY = process.argv.includes("--dry-run");
const ORIGIN = "https://wavedash.com";
const PAGE = "/games/bmx-mountain";
const GAME_SLUG = "bmx-mountain";
const UA = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};
const sha = (b) => crypto.createHash("sha256").update(b).digest("hex");
function fnv32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

// ── candidate universe ──────────────────────────────────────────────────
// Fixed entry files observed on the CDN host + every URL from the runtime
// network log + (second pass) static-scan additions passed via --list.
const ENGINE = ["index.html", "embed", "embed.js", "embed.css", "sw-embed.js"];
function candidates() {
  const c = new Set(ENGINE);
  const logPath = path.join(proj, "docs", "network-log-2026-10-13.jsonl");
  if (fs.existsSync(logPath)) {
    for (const line of fs.readFileSync(logPath, "utf8").split("\n")) {
      if (!line.trim().startsWith("{")) continue;
      try {
        const j = JSON.parse(line);
        const u = new URL(j.url);
        if (!u.host.endsWith("builds.wavedashcdn.com")) continue;
        const p = u.pathname.replace(/^\//, "");
        if (p === "embed") continue; // dynamic shell — fetched via the bootstrap above
        if (p.startsWith("auth/")) continue; // dynamic platform endpoints (JWT mint/refresh), never captured
        if (p) c.add(p);
      } catch {}
    }
  }
  const extraPath = process.argv.indexOf("--list");
  if (extraPath !== -1 && process.argv[extraPath + 1]) {
    for (const line of fs.readFileSync(process.argv[extraPath + 1], "utf8").split("\n")) {
      const t = line.trim();
      if (t && !t.startsWith("#")) c.add(t);
    }
  }
  return [...c].sort();
}

// ── bootstrap (same mechanics as tools/update.mjs) ──────────────────────
async function get(url, headers) {
  const r = await fetch(url, { headers: { ...UA, ...(headers || {}) } });
  return { status: r.status, buf: r.ok ? Buffer.from(await r.arrayBuffer()) : null, headers: r.headers };
}
// re-merge the raw per-session browser follow logs into the record file first
{
  const raw = [".work/net-live.jsonl", ".work/net-game.jsonl"].map((f) => path.join(proj, f));
  const seen = new Map();
  for (const f of raw) {
    if (!fs.existsSync(f)) continue;
    for (const line of fs.readFileSync(f, "utf8").split("\n")) {
      if (!line.trim().startsWith("{")) continue;
      try {
        const j = JSON.parse(line);
        if (!j.url) continue;
        const key = (j.method || "GET") + " " + j.url;
        const prev = seen.get(key);
        if (!prev || (prev.status === 0 && j.status !== 0)) seen.set(key, j);
      } catch {}
    }
  }
  if (seen.size) {
    const out = [...seen.values()].sort((a, b) => String(a.timestamp || "").localeCompare(String(b.timestamp || "")));
    fs.mkdirSync(path.join(proj, "docs"), { recursive: true });
    fs.writeFileSync(path.join(proj, "docs", "network-log-2026-10-13.jsonl"), out.map((j) => JSON.stringify(j)).join("\n") + "\n");
  }
}
const page = await get(ORIGIN + PAGE);
if (page.status !== 200) {
  console.error(`live page -> HTTP ${page.status}`);
  process.exit(2);
}
const html = page.buf.toString("utf8");
const playKey = /playKey:"([0-9a-f]+)"/.exec(html)?.[1];
const gameCloudId = /gameCloud:\{.*?_id:"([^"]+)"/.exec(html)?.[1];
const gameBuildId = /gameBuild:\{.*?_id:"([^"]+)"/.exec(html)?.[1];
const engine = /gameBuild:\{.*?engine:"([^"]+)"/.exec(html)?.[1] || "CUSTOM";
const entrypoint = /gameBuild:\{.*?entrypoint:"([^"]+)"/.exec(html)?.[1] || "index.html";
const anonId = /anonymousUser:\{id:"([^"]+)"/.exec(html)?.[1];
const anonName = /anonymousUser:\{id:"[^"]+",username:"([^"]+)"/.exec(html)?.[1] || "anonymous";
if (!playKey || !gameCloudId || !gameBuildId || !anonId) {
  console.error("could not extract the game bootstrap from the SSR page");
  process.exit(2);
}
const host = `${gameCloudId}-${fnv32(anonId)}-${fnv32(gameBuildId)}.builds.wavedashcdn.com`;
const sdk = JSON.stringify({ convexCloudUrl: "https://convex-api.wavedash.com", wavedashUser: { id: anonId, username: anonName }, gameCloudId, ugcHost: "ugc.wavedashcdn.com", uploadsHost: "uploads.wavedash.com", launchParams: {}, parentOrigin: "https://wavedash.com", initialVolume: 1 });
const embedUrl = `https://${host}/embed?entrypoint=${encodeURIComponent(entrypoint)}&engine=${encodeURIComponent(engine)}&pk=${playKey}&sdkconfig=${encodeURIComponent(sdk)}&gameSlug=${GAME_SLUG}`;
const embed = await get(embedUrl);
const jwt = embed.status === 200 ? /gameplayJwt":"([^"]+)"/.exec(embed.buf.toString("utf8"))?.[1] : null;
if (!jwt) {
  console.error(`live embed -> HTTP ${embed.status}, no gameplayJwt`);
  process.exit(2);
}
console.log(`build ${fnv32(gameBuildId)} @ ${host}`);
if (!DRY) {
  // `embed` (no extension, served at the host root) is the dynamic shell for
  // this capture session — stored byte-exact, marked dynamic in the manifest.
  fs.writeFileSync(path.join(proj, "embed"), embed.buf);
}

// ── fetch ───────────────────────────────────────────────────────────────
const list = candidates();
console.log(`candidates: ${list.length}${DRY ? " (dry run — no writes)" : ""}`);
const results = [];
let i = 0;
let done = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (i < list.length) {
    const p = list[i++];
    try {
      const r = await get(`https://${host}/${p}`, { Authorization: `Bearer ${jwt}`, "X-Wd-Sw": "jwt" });
      if (r.status === 200) {
        if (!DRY) {
          const dst = path.join(proj, p.split("?")[0]);
          fs.mkdirSync(path.dirname(dst), { recursive: true });
          fs.writeFileSync(dst, r.buf);
        }
        results.push({ p, status: 200, bytes: r.buf.length });
      } else results.push({ p, status: r.status });
    } catch (e) {
      results.push({ p, status: 0, err: String(e) });
    }
    if (++done % 50 === 0) console.log(`  ${done}/${list.length}`);
  }
}));
const ok = results.filter((r) => r.status === 200);
const missing = results.filter((r) => r.status !== 200);
console.log(`captured ${ok.length} file(s), ${ok.reduce((a, b) => a + b.bytes, 0)} bytes; ${missing.length} absent:`);
for (const m of missing) console.log(`  ${m.status} ${m.p}`);
if (!DRY) console.log("next: node tools/make-manifest.mjs . .upstream/manifest.json && node tools/derive.mjs && node tools/audit.js");
