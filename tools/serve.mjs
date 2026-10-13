// serve.mjs — minimal static server for boot-testing the mirror on loopback.
// usage: node tools/serve.mjs [port] [root]
//
// Serves the capture exactly as a naive static host would (directory-index for
// `/x/` -> `x/index.html`, .html/.js/.css/.wav/.webp MIME map). The capture is
// produced at the repo root == CDN host root, so `/index.html` + `./assets/…`
// reproduce the game's own request graph.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.argv[3] || path.join(here, ".."));
const port = Number(process.argv[2] || 8747);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
  ".woff2": "font/woff2",
  ".glb": "model/gltf-binary",
};

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let rel = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (rel === "" || rel.endsWith("/")) rel += "index.html";
    const abs = path.normalize(path.join(root, rel));
    if (!abs.startsWith(root)) {
      res.writeHead(403).end("forbidden");
      return;
    }
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
      res.writeHead(404, { "content-type": "text/plain" }).end("404 " + rel);
      return;
    }
    const ext = path.extname(abs).toLowerCase();
    const body = fs.readFileSync(abs);
    res.writeHead(200, {
      "content-type": MIME[ext] || "application/octet-stream",
      "content-length": body.length,
      "access-control-allow-origin": "*",
    });
    res.end(body);
  } catch (e) {
    res.writeHead(500, { "content-type": "text/plain" }).end(String(e));
  }
});
server.listen(port, "127.0.0.1", () => {
  console.log(`serving ${root} on http://127.0.0.1:${port}/ (pid ${process.pid})`);
});
