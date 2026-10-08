// Sert le dossier out/ (export statique) comme GitHub Pages :
// fichier exact, sinon redirection vers le slash final pour un dossier, sinon 404.html avec un statut 404.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "out");
const portIndex = process.argv.indexOf("--port");
const port = Number(portIndex > -1 ? process.argv[portIndex + 1] : process.env.PORT || 3000);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".mp4": "video/mp4", ".pdf": "application/pdf", ".woff2": "font/woff2", ".ico": "image/x-icon" };

if (!existsSync(root)) { console.error("Dossier out/ introuvable : lancer d'abord npm run build."); process.exit(1); }

const send = (res, status, file) => {
  res.writeHead(status, { "Content-Type": types[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const file = join(root, path);
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isFile()) return send(res, 200, file);
  if (existsSync(join(file, "index.html"))) {
    if (!url.pathname.endsWith("/")) { res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end(); return; }
    return send(res, 200, join(file, "index.html"));
  }
  send(res, 404, join(root, "404.html"));
}).listen(port, () => console.log(`out/ servi sur http://localhost:${port}`));
