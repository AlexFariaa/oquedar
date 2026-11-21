// Extrai o texto dos posts/páginas salvos do oquedar.com no mesmo formato do basquete.txt
// (linhas "H1: ", "H2: ", "H3: ", "P: ", "LI: ") e lista as imagens de cada seção numerada (IMG: url | alt).
// Uso: node extrair.js  -> gera <slug>.txt ao lado de cada <slug>.html
const fs = require('fs'), path = require('path');
const dec = s => s.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&#8220;|&#8221;/g, '"').replace(/&#8216;|&#8217;/g, '’').replace(/&#8230;/g, '…').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n)).replace(/\s+/g, ' ').trim();
for (const f of fs.readdirSync(__dirname).filter(x => x.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(__dirname, f), 'utf8');
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const ini = html.indexOf('class="wpr-post-content"');
  let corpo = ini >= 0 ? html.slice(ini) : html;
  // corta no fim do conteúdo (primeiro widget depois dele)
  const fim = corpo.search(/<div class="elementor-element[^"]*elementor-widget-(?!wpr-post-content)/);
  if (fim > 0) corpo = corpo.slice(0, fim);
  const linhas = ['H1: ' + dec(h1)];
  const og = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
  if (og) linhas.push('CAPA: ' + og);
  const data = (html.match(/"datePublished":"([^"]+)"/) || [])[1];
  if (data) linhas.push('DATA: ' + data);
  const re = /<(h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>|<img\b[^>]*>/gi; let m;
  while ((m = re.exec(corpo))) {
    if (m[0].startsWith('<img')) {
      const src = (m[0].match(/\s(?:data-src|src)="([^"]+)"/) || [])[1] || '';
      const alt = dec((m[0].match(/\salt="([^"]*)"/) || [])[1] || '');
      if (src && !src.startsWith('data:')) linhas.push('IMG: ' + src + ' | ' + alt);
      continue;
    }
    const t = dec(m[2]); if (!t) continue;
    linhas.push(m[1].toUpperCase() + ': ' + t);
  }
  fs.writeFileSync(path.join(__dirname, f.replace('.html', '.txt')), linhas.join('\n'));
  console.log(f, linhas.length, 'linhas,', linhas.filter(l => l.startsWith('IMG')).length, 'imgs');
}
