// Prévia do site final como ele fica no ar: serve site/ na raiz, com endereços de pasta (/post/) e a 404.
// Uso: node _fonte-layout/servidor-site.js  (http://localhost:5180)
const http = require('http'), fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..', 'site');
const tipos = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8' };
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  let f = path.join(raiz, u); if (!f.startsWith(raiz)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) { if (!u.endsWith('/')) { res.writeHead(301, { Location: u + '/' }); return res.end(); } f = path.join(f, 'index.html'); }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404, { 'Content-Type': tipos['.html'] }); return res.end(fs.readFileSync(path.join(raiz, '404.html'))); }
    res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] || 'application/octet-stream' }); res.end(d);
  });
}).listen(5180, '127.0.0.1', () => console.log('http://localhost:5180'));
