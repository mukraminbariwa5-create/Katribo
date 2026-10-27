// npm run check:images — lists every image the site needs and whether it's OK, LOW-RES or MISSING.
import fs from 'fs';
const root = new URL('../public', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const src = fs.readFileSync(new URL('../src/data/menu.ts', import.meta.url), 'utf8');
const files = [...new Set([...src.matchAll(/'([a-z-]+)', (?:true|false)/g)].map((m) => m[1]))];

function jpegSize(path) {
  const b = fs.readFileSync(path);
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1], len = b.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  return null;
}

const need = [['images/hero-katribo.jpg', 1295, 1214], ['images/hero-katribo-square.jpg', 975, 975], ['images/hero-katribo-bg.jpg', 520, 1214], ...files.map((f) => [`images/drinks/${f}.jpg`, 900, 900])];
const count = { OK: 0, 'LOW-RES': 0, MISSING: 0 };
for (const [f, w, h] of need) {
  const p = `${root}/${f}`;
  const s = fs.existsSync(p) ? jpegSize(p) : null;
  const status = !s ? 'MISSING' : s[0] >= w && s[1] >= h ? 'OK' : 'LOW-RES';
  count[status]++;
  console.log(`${status.padEnd(8)} public/${f.padEnd(42)} ${s ? s.join('×') : '—'}  (need ${w}×${h})`);
}
console.log(`\nOK ${count.OK} · LOW-RES ${count['LOW-RES']} · MISSING ${count.MISSING}`);
