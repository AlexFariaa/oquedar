// Servidor local simples para ver o layout: node _fonte-layout/servidor.js  (http://localhost:5173)
const http = require('http'), fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const tipos = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.pdf': 'application/pdf', '.css': 'text/css', '.js': 'text/javascript' };
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]); if (u === '/') u = '/layout-alta-fidelidade.html';
  const f = path.join(raiz, u); if (!f.startsWith(raiz)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end('não encontrado'); } res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] || 'application/octet-stream' }); res.end(d); });
}).listen(5173, '127.0.0.1', () => console.log('http://localhost:5173'));
