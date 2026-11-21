// Ajuste 27 (21/11/2026): assinatura "A.G." em letra cursiva no fim de cada post, escrita da esquerda para a direita quando aparece.
// Fonte de assinatura (Mrs Saint Delafield, Google Fonts) só com as letras "A", "." e "G", só nas páginas de post.
const fs = require('fs');
const ASS = '\n            <p class="assinatura entra" aria-label="Assinado, A.G.">A.G.</p>';
const LINK = '<link href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&text=A.G&display=swap" rel="stylesheet">\n</head>';
const CSS = '\n/* assinatura da autora no fim do post */\n.assinatura{font-family:"Mrs Saint Delafield","Segoe Script","Brush Script MT",cursive;font-weight:400;font-size:clamp(4.5rem,9vw,7rem);line-height:1;letter-spacing:0;color:var(--tinta);margin:var(--e6) 0 0;padding:.1em .3em .15em 0;width:max-content}\n.js .assinatura{clip-path:inset(-20% 100% -20% 0);transition:clip-path 1.8s var(--curva) .2s,opacity .4s}\n.js .assinatura.visto{clip-path:inset(-20% -10% -20% 0)}\n@media (prefers-reduced-motion:reduce){.js .assinatura{clip-path:none;transition:none}}\n';

function patch(f, trocas) {
  let s = fs.readFileSync(__dirname + '/' + f, 'utf8');
  fs.writeFileSync(__dirname + '/' + f.replace('.js', '.antes-ajuste-27.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(f, 'NAO ACHEI', a.slice(0, 70)); process.exit(1); } s = s.replace(a, b); }
  fs.writeFileSync(__dirname + '/' + f, s); console.log(f, 'ok');
}
patch('modelo-artigo.js', [
  ["${fechoP.filter(x => x !== citacao).slice(4).map(x => linka(`<p style=\"margin-top:var(--e6)\">${esc(x)}</p>`)).join('')}",
   "${fechoP.filter(x => x !== citacao).slice(4).map(x => linka(`<p style=\"margin-top:var(--e6)\">${esc(x)}</p>`)).join('')}" + ASS],
  ['  for (const t of D.marcas || []) html = marca(html, t);', "  html = html.replace('</head>', " + JSON.stringify(LINK) + ");\n  for (const t of D.marcas || []) html = marca(html, t);"],
]);
patch('artigo.js', [
  ["${fechoP.filter(x => x !== citacao).slice(4).map(x => `<p style=\"margin-top:var(--e6)\">${esc(x)}</p>`).join('')}",
   "${fechoP.filter(x => x !== citacao).slice(4).map(x => `<p style=\"margin-top:var(--e6)\">${esc(x)}</p>`).join('')}" + ASS],
  ["fs.writeFileSync(path.join(OUT, 'layout-artigo.html'), artigoM);", "artigoM = artigoM.replace('</head>', " + JSON.stringify('<style>' + CSS + '</style>\n' + LINK) + ");\nfs.writeFileSync(path.join(OUT, 'layout-artigo.html'), artigoM);"],
]);
// CSS no arquivo de estilo dos artigos (vale para os 5 posts)
let c = fs.readFileSync(__dirname + '/css-artigo.js', 'utf8');
if (!c.includes('.assinatura{')) { c = c.replace(/\n`;\s*module\.exports = CSS_ART;/, CSS + '`;\nmodule.exports = CSS_ART;'); fs.writeFileSync(__dirname + '/css-artigo.js', c); }
console.log('css', c.includes('.assinatura{'));
