#!/usr/bin/env node
/**
 * Preview the static export exactly as it is deployed.
 *
 * `next build` writes to `out/` with `basePath: "/MonoChrome"`, so `next start`
 * refuses to serve it. This dependency-free server mounts `out/` at that base
 * path and redirects `/` to it, which is what `npm run start` and
 * `npm run smoke` expect.
 *
 *     PORT=3001 BASE_PATH=/MonoChrome npm start
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../out/", import.meta.url)));
const basePath = (process.env.BASE_PATH ?? "/MonoChrome").replace(/\/$/, "");
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const contentType = (file) => TYPES[extname(file).toLowerCase()] ?? "application/octet-stream";

function send(res, status, body, headers = {}) {
  res.writeHead(status, { "Content-Length": body.length, ...headers });
  res.end(body);
}

function notFound(res) {
  readFile(join(root, "404.html"))
    .then((body) => send(res, 404, body, { "Content-Type": TYPES[".html"] }))
    .catch(() => send(res, 404, Buffer.from("Not found"), { "Content-Type": TYPES[".txt"] }));
}

async function fileFor(pathname) {
  const relative = normalize(pathname.slice(basePath.length)).replace(/^[/\\]+/, "");
  const candidate = resolve(join(root, relative));

  if (candidate !== root && !candidate.startsWith(root + sep)) {
    return null;
  }

  let info = await stat(candidate).catch(() => null);
  if (info?.isDirectory()) {
    info = await stat(join(candidate, "index.html")).catch(() => null);
    if (info?.isFile()) return join(candidate, "index.html");
    return null;
  }

  return info?.isFile() ? candidate : null;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? host}`);
    const pathname = decodeURIComponent(url.pathname);

    if (pathname === "/" || pathname === basePath) {
      res.writeHead(302, { Location: `${basePath}/` });
      res.end();
      return;
    }

    if (!pathname.startsWith(`${basePath}/`)) {
      notFound(res);
      return;
    }

    const file = await fileFor(pathname);
    if (!file) {
      notFound(res);
      return;
    }

    const body = await readFile(file);
    const immutable = pathname.startsWith(`${basePath}/_next/static/`);
    send(res, 200, body, {
      "Content-Type": contentType(file),
      "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
    });
  } catch {
    send(res, 500, Buffer.from("Internal server error"), { "Content-Type": TYPES[".txt"] });
  }
});

server.listen(port, host, () => {
  console.log(`Serving out/ at http://${host}:${port}${basePath}/`);
});
