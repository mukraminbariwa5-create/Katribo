/**
 * Production server for hosts that run Node (e.g. Render).
 * Serves the built site from dist/ and POST /api/place-order, using the same
 * order validation as the Netlify Function (shared/order.ts, built to dist-server/).
 * Zero dependencies.  Build: npm run build:server   Start: npm start
 */
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = resolve(root, 'dist');
const { handleOrder } = await import(new URL('./dist-server/order.js', import.meta.url).href);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json',
};
const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
};

function fileFor(urlPath) {
  let p;
  try { p = decodeURIComponent(urlPath); } catch { return null; }
  const full = normalize(join(dist, p));
  if (!full.startsWith(dist)) return null; // block ../ path tricks
  try { return statSync(full).isFile() ? full : null; } catch { return null; }
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');

  if (url.pathname === '/api/place-order') {
    let body = '';
    for await (const chunk of req) { body += chunk; if (body.length > 100_000) { res.writeHead(413).end(); return; } }
    const { status, data } = handleOrder(req.method ?? 'GET', body);
    res.writeHead(status, { ...SECURITY, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(data));
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, SECURITY).end(); return; }

  // Real file, else the single-page app shell (client-side routes like /menu).
  const file = fileFor(url.pathname) ?? join(dist, 'index.html');
  const immutable = url.pathname.startsWith('/assets/') || url.pathname.startsWith('/fonts/');
  res.writeHead(200, {
    ...SECURITY,
    'Content-Type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : (file.endsWith('.html') ? 'no-cache' : 'public, max-age=86400'),
  });
  if (req.method === 'HEAD') { res.end(); return; }
  createReadStream(file).pipe(res);
}).listen(Number(process.env.PORT) || 10000, () => console.log('KATRIBO running on port ' + (process.env.PORT || 10000)));
