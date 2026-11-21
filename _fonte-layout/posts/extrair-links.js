// Associa os links reais de afiliado de cada post atual (WordPress) ao número de cada presente.
const fs = require('fs'), path = require('path');
const LOJA = u => /amzn\.to|link\.amazon|amazon\.com/.test(u) ? 'amazon' : /mercadoliv|meli\.la/.test(u) ? 'ml' : /shopee/.test(u) ? 'shopee' : null;
for (const slug of ['presentes-para-quem-gosta-de-basquete', 'presente-para-quem-gosta-de-correr', 'presentes-para-homens-30-anos', 'presente-1-mes-de-namoro', 'presente-dia-dos-namorados']) {
  const h = fs.readFileSync(path.join(__dirname, slug + '.html'), 'utf8');
  const ini = h.indexOf('class="wpr-post-content"'); const corpo = ini >= 0 ? h.slice(ini) : h;
  const re = /<h2\b[^>]*>([\s\S]*?)<\/h2>|<a\b[^>]*href="([^"]+)"/gi; let m, n = null; const out = {};
  while ((m = re.exec(corpo))) {
    if (m[1] !== undefined) { const t = m[1].replace(/<[^>]+>/g, '').trim(); const k = t.match(/^(\d+)\./); n = k ? +k[1] : null; continue; }
    const loja = LOJA(m[2]); if (!loja || !n) continue;
    out[n] = out[n] || {}; if (!out[n][loja]) out[n][loja] = m[2];
  }
  fs.writeFileSync(path.join(__dirname, slug + '.links.json'), JSON.stringify(out, null, 1));
  const lojas = Object.values(out).flatMap(o => Object.keys(o));
  console.log(slug, Object.keys(out).length, 'presentes com link |', ['amazon', 'ml', 'shopee'].map(l => l + ':' + lojas.filter(x => x === l).length).join(' '));
}
