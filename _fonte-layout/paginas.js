// Páginas de texto do oquedar.com (Sobre nós, Contato, Termos, Política, Declaração de afiliados)
// no visual aprovado: mesma abertura do artigo, texto em coluna de leitura, cabeçalho e rodapé do site.
const fs = require('fs'), path = require('path');
const { OUT, esc, cab, rodape, JS_BASE, head } = require('./base.js');
const CSS_ART = require('./css-artigo.js');

const CSS_PAG = CSS_ART + `
.pag-corpo{padding-bottom:var(--secao)}
.pag-corpo .leitura{margin-inline:0;max-width:46em}
.pag-corpo .leitura h2{font-size:var(--t-sub);line-height:1.2;letter-spacing:-.02em;margin:var(--e7) 0 var(--e3)}
.pag-corpo .leitura h3{font-size:var(--t-abertura);margin:var(--e6) 0 var(--e2)}
.pag-corpo .leitura p{margin:0 0 var(--e4)}
.pag-corpo .leitura ul{margin:0 0 var(--e5);padding-left:1.2em}
.pag-corpo .leitura li{margin-bottom:var(--e2)}
.pag-abertura .abre{max-width:40ch;margin-top:var(--e5)}
.pag-abertura h1{max-width:16ch}
.cartoes-ct{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e5);margin:0 0 var(--e8);max-width:1040px}
.cartoes-ct a,.cartoes-ct div{display:flex;flex-direction:column;gap:var(--e2);padding:var(--e6);border-radius:var(--raio);text-decoration:none;min-height:180px;justify-content:flex-end}
.cartoes-ct b{font-size:var(--t-abertura);letter-spacing:-.02em;line-height:1.15;overflow-wrap:anywhere}
.autora-pag{display:grid;grid-template-columns:200px 1fr;gap:var(--e6);align-items:center;margin:var(--e7) 0;padding:var(--e6);border-radius:var(--raio)}
.autora-pag img{width:200px;aspect-ratio:1;object-fit:cover;border-radius:50%}
@media (max-width:900px){.cartoes-ct{grid-template-columns:1fr}.autora-pag{grid-template-columns:1fr;text-align:left}.autora-pag img{width:140px}}
`;

function blocos(arq) {
  return fs.readFileSync(path.join(__dirname, 'posts', arq), 'utf8').split('\n').map(l => l.match(/^(H1|H2|H3|P|LI|IMG): (.*)$/)).filter(Boolean).map(m => ({ t: m[1], x: m[2] }));
}
function corpo(bl) {
  let h = '', lista = [];
  const fecha = () => { if (lista.length) { h += `<ul>${lista.map(x => `<li>${esc(x)}</li>`).join('')}</ul>\n`; lista = []; } };
  for (const b of bl) {
    if (b.t === 'LI') { lista.push(b.x); continue; }
    fecha();
    if (b.t === 'H2') h += `<h2>${esc(b.x)}</h2>\n`; else if (b.t === 'H3') h += `<h3>${esc(b.x)}</h3>\n`; else if (b.t === 'P') h += `<p>${esc(b.x)}</p>\n`;
  }
  fecha(); return h;
}
const pagina = (arquivo, titulo, desc, rotulo, h1, abre, miolo) => head(titulo + ' · O que dar?', desc, CSS_PAG) + `
<body>
${cab('')}
<main id="conteudo">
  <header class="art-abertura pag-abertura">
    <div class="mancha" aria-hidden="true"></div>
    <div class="wrap grade">
      <nav class="trilha" aria-label="Você está em" style="grid-column:1/-1;position:relative"><ol><li><a href="layout-alta-fidelidade.html">Início</a></li><li><span aria-current="page">${rotulo}</span></li></ol></nav>
      <h1 class="gigante" style="grid-column:1/-1">${esc(h1)}</h1>
      ${abre ? `<p class="abre" style="grid-column:1/-1">${esc(abre)}</p>` : ''}
    </div>
  </header>
  <div class="wrap pag-corpo">
${miolo}
  </div>
</main>
${rodape}
<script>${JS_BASE}</script>
</body>
</html>`;

const AG = s => s.replace(/Laura Mendes/g, 'A.G.').replace(/\bLaura\b/g, 'A.G.');

// Sobre nós: texto real, com "Laura Mendes" trocado por A.G. (pedido da A.G.) e a foto dela
{
  const bl = blocos('pagina-sobre-nos.txt').filter(b => b.t !== 'IMG').map(b => ({ t: b.t, x: AG(b.x) }));
  const tit = bl.shift(); // "Sobre nós"
  const iQuem = bl.findIndex(b => b.t === 'H2' && /Quem está por trás/.test(b.x));
  const antes = bl.slice(0, iQuem), quem = bl.slice(iQuem + 1).filter(b => b.t !== 'H3');
  // subtítulos que no site atual vinham como parágrafo
  const sub = new Set(['O que você encontrará aqui', 'Nossa Curadoria']);
  const ant = antes.map(b => b.t === 'P' && sub.has(b.x) ? { t: 'H2', x: b.x } : b);
  const miolo = `    <div class="leitura">
${corpo(ant)}
      <h2>${esc(bl[iQuem].x)}</h2>
      <div class="autora-pag c-rosa">
        <img src="imagens/autora.jpg" alt="Retrato de A.G., criadora do O que dar?" width="200" height="200" loading="lazy">
        <div><span class="rotulo">Curadoria</span><p class="sub" style="margin:var(--e1) 0 var(--e3)">A.G.</p>${quem.slice(0, 1).map(b => `<p>${esc(b.x)}</p>`).join('')}</div>
      </div>
${corpo(quem.slice(1))}
    </div>`;
  fs.writeFileSync(path.join(OUT, 'sobre-nos.html'), pagina('sobre-nos.html', 'Sobre nós', 'Conheça o O que dar?, guia de ideias de presentes com curadoria para cada pessoa e ocasião.', 'Sobre nós', 'Sobre nós', null, miolo));
}

// Contato: dados reais da página atual
{
  const bl = blocos('pagina-contato.txt');
  const val = r => ((bl.find(b => r.test(b.x)) || {}).x || '').replace(/^[^:]+:\s*/, '');
  const tel = val(/^Telefone/), mail = val(/^E-mail/), loc = val(/^Localiza/).replace(/ [–—] /g, ', ');
  const miolo = `    <div class="cartoes-ct">
      <a class="c-lavanda" href="mailto:${mail}"><span class="rotulo">E-mail</span><b>${esc(mail)}</b></a>
      <a class="c-rosa" href="tel:+55${tel.replace(/\D/g, '')}"><span class="rotulo">Telefone</span><b>${esc(tel)}</b></a>
      <div class="c-pessego"><span class="rotulo">Localização</span><b>${esc(loc)}</b></div>
    </div>`;
  fs.writeFileSync(path.join(OUT, 'contato.html'), pagina('contato.html', 'Contato', 'Fale com o O que dar?: e-mail, telefone e localização.', 'Contato', 'Entre em contato.', null, miolo));
}

// Termos, Política e Declaração: texto integral
for (const [arq, rot, desc] of [
  ['termos-de-uso', 'Termos de Uso', 'Termos de uso do O que dar?.'],
  ['politica-privacidade', 'Política de Privacidade', 'Como o O que dar? trata os seus dados.'],
  ['declaracao-de-afiliados', 'Declaração de Afiliados', 'Como funcionam os links de afiliados do O que dar?.'],
]) {
  const bl = blocos('pagina-' + arq + '.txt').filter(b => b.t !== 'IMG');
  const tit = bl[0] && /^H[12]$/.test(bl[0].t) ? bl.shift().x : rot;
  fs.writeFileSync(path.join(OUT, arq + '.html'), pagina(arq + '.html', rot, desc, rot, tit, null, `    <div class="leitura">\n${corpo(bl)}    </div>`));
}
console.log('paginas ok');

// Página 404 (endereço que não existe)
fs.writeFileSync(path.join(OUT, '404.html'), pagina('404.html', 'Página não encontrada', 'Esta página não existe no O que dar?.', 'Página não encontrada', 'Essa página não existe.', 'O endereço pode ter mudado. Comece pela página inicial ou escolha uma categoria.', `    <div class="leitura"><p><a class="btn btn-oferta" href="layout-alta-fidelidade.html">Ir para a página inicial</a></p></div>`));
