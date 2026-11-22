// Monta o site final em site/ com os mesmos endereços do WordPress antigo:
//   /                      página inicial
//   /<post>/               cada post (pasta com index.html)
//   /category/<categoria>/ cada categoria
//   /sobre-nos/ ...        páginas de texto
// Também gera sitemap.xml, robots.txt, 404.html e .htaccess. Localmente, empacota em site-oquedar.zip.
// Uso: node _fonte-layout/gerar.js && node _fonte-layout/final.js
const fs = require('fs'), path = require('path'), os = require('os'), { execSync } = require('child_process');
const RAIZ = path.join(__dirname, '..'), SITE = path.join(RAIZ, 'site'), DOMINIO = 'https://oquedar.com';
const AGORA = new Date(process.env.OQD_AGORA || Date.now()), HOJE = AGORA.toISOString().slice(0, 10);
const CONT = path.join(RAIZ, 'conteudo', 'posts');

// posts que estão no ar (mesma regra de posts.js)
const posts = fs.readdirSync(CONT).filter(d => fs.existsSync(path.join(CONT, d, 'post.json')))
  .map(d => JSON.parse(fs.readFileSync(path.join(CONT, d, 'post.json'), 'utf8')))
  .filter(p => p.status === 'publicado' || (p.status === 'agendado' && new Date(p.publicar) <= AGORA));
const PAGS = ['sobre-nos', 'contato', 'termos-de-uso', 'politica-privacidade', 'declaracao-de-afiliados'];
const cats = fs.readdirSync(RAIZ).filter(f => /^categoria-[a-z]+\.html$/.test(f)).map(f => f.slice(10, -5));

// [arquivo gerado, endereço no site, data para o sitemap]
const mapa = [['layout-alta-fidelidade.html', '/', HOJE]]
  .concat(posts.map(p => [p.slug + '.html', '/' + p.slug + '/', p.atualizado || p.data]))
  .concat(cats.map(c => ['categoria-' + c + '.html', '/category/' + c + '/', HOJE]))
  .concat(PAGS.map(p => [p + '.html', '/' + p + '/', HOJE]))
  .concat([['buscar.html', '/buscar/', null], ['404.html', '/404.html', null]]);

// limpa o conteúdo de site/ (não a pasta, que o OneDrive às vezes segura)
fs.mkdirSync(SITE, { recursive: true });
for (const e of fs.readdirSync(SITE)) { try { fs.rmSync(path.join(SITE, e), { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); } catch (err) { console.warn('não apaguei', e, err.code); } }

const usadas = new Set();
for (const [arq, url] of mapa) {
  let h = fs.readFileSync(path.join(RAIZ, arq), 'utf8');
  for (const [a, u] of mapa) for (const q of ['"', "'"]) h = h.split(q + a).join(q + u);
  h = h.replace(/(["'(])imagens\//g, '$1/imagens/').split("'busca.json'").join("'/busca.json'");
  const extra = url === '/404.html' ? '<meta name="robots" content="noindex">\n' : url === '/buscar/' ? `<meta name="robots" content="noindex, follow">\n<link rel="canonical" href="${DOMINIO}${url}">\n` : `<link rel="canonical" href="${DOMINIO}${url}">\n<meta property="og:url" content="${DOMINIO}${url}">\n`;
  h = h.replace('</head>', extra + '</head>');
  (h.match(/\/imagens\/[A-Za-z0-9_\/.-]+\.(?:avif|webp|jpg|png)/g) || []).forEach(x => usadas.add(x.slice(1)));
  const destino = url.endsWith('/') ? path.join(SITE, url, 'index.html') : path.join(SITE, url);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, h);
}

let total = 0;
for (const rel of usadas) {
  const o = path.join(RAIZ, rel), d = path.join(SITE, rel);
  if (!fs.existsSync(o)) { console.error('FALTA', rel); process.exitCode = 1; continue; }
  fs.mkdirSync(path.dirname(d), { recursive: true }); fs.copyFileSync(o, d); total += fs.statSync(o).size;
}
fs.copyFileSync(path.join(RAIZ, 'imagens', 'CREDITOS.md'), path.join(SITE, 'imagens', 'CREDITOS.md'));

// índice da busca, com os mesmos endereços
{ let j = fs.readFileSync(path.join(RAIZ, 'busca.json'), 'utf8'); for (const [a, u] of mapa) j = j.split('"' + a).join('"' + u); j = j.replace(/"imagens\//g, '"/imagens/'); fs.writeFileSync(path.join(SITE, 'busca.json'), j); }

// sitemap, robots, .htaccess
// capa de cada post entra no sitemap de imagens (ajuda o Google Imagens a achar e ligar a foto ao post)
const capaDe = Object.fromEntries(posts.filter(p => p.capa && p.capa.src).map(p => ['/' + p.slug + '/', p.capa.src]));
fs.writeFileSync(path.join(SITE, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  mapa.filter(m => m[2]).map(([, u, d]) => `  <url><loc>${DOMINIO}${u}</loc><lastmod>${d}</lastmod>${capaDe[u] ? `<image:image><image:loc>${DOMINIO}/${capaDe[u]}</image:loc></image:image>` : ''}</url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(SITE, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${DOMINIO}/sitemap.xml\n`);
fs.writeFileSync(path.join(SITE, '.htaccess'), `# O que dar? · site estático (gerado por _fonte-layout/final.js)
DirectoryIndex index.html
ErrorDocument 404 /404.html
Options -Indexes

<IfModule mod_rewrite.c>
RewriteEngine On
# sempre https e sem www
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\\. [NC]
RewriteRule ^ https://oquedar.com%{REQUEST_URI} [L,R=301]
# endereço de pasta sem a barra final -> com barra
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
RewriteRule ^(.+[^/])$ /$1/ [L,R=301]
# endereços antigos do WordPress
RewriteRule ^feed/?$ / [L,R=301]
RewriteRule ^tag/(mulher|homem)/?$ /category/genero/ [L,R=301]
RewriteRule ^tag/namorado/?$ /category/namoro/ [L,R=301]
RewriteRule ^tag/(amiga|mae)/?$ /category/relacionamento/ [L,R=301]
RewriteRule ^tag/[^/]+/?$ /category/interesse/ [L,R=301]
RewriteRule ^category/sem-categoria/?$ / [L,R=301]
RewriteRule ^author/[^/]+/?$ /sobre-nos/ [L,R=301]
</IfModule>

<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType image/avif "access plus 1 year"
ExpiresByType image/webp "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType text/html "access plus 10 minutes"
</IfModule>

<IfModule mod_mime.c>
AddType image/avif .avif
AddType image/webp .webp
</IfModule>
`);
console.log(mapa.length, 'páginas,', usadas.size, 'imagens,', Math.round(total / 1024) + 'KB');

// ZIP só no computador (no robô do GitHub não precisa)
if (!process.env.CI) {
  const zip = path.join(RAIZ, 'site-oquedar.zip'); fs.rmSync(zip, { force: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'oqd-')), zipTmp = tmp + '.zip';
  fs.cpSync(SITE, tmp, { recursive: true });
  execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${tmp}\\*' -DestinationPath '${zipTmp}'"`);
  fs.copyFileSync(zipTmp, zip); fs.rmSync(tmp, { recursive: true, force: true }); fs.rmSync(zipTmp, { force: true });
  console.log('zip', Math.round(fs.statSync(zip).size / 1024) + 'KB');
}
