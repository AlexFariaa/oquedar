// Ajuste 1 (19/11/2026): faixa escura do buscador, rodapé escuro de ponta a ponta com logo, foto real do basquete.
const fs = require('fs');
const f = __dirname + '/gerar.js';
let s = fs.readFileSync(f, 'utf8');
let n = 0;
function troca(a, b) { if (!s.includes(a)) { console.error('NAO ACHEI:', a.slice(0, 80)); process.exit(1); } s = s.replace(a, b); n++; }

// caminho do texto e logos relativos à pasta do gerador
troca(`const LOGO = 'data:image/png;base64,' + fs.readFileSync(OUT + '/logo/logo-oquedar-branco.png').toString('base64');`,
`const LOGO = 'data:image/png;base64,' + fs.readFileSync(OUT + '/logo/logo-oquedar-branco.png').toString('base64');
const LOGO_ESCURO = 'data:image/png;base64,' + fs.readFileSync(OUT + '/logo/logo-oquedar.png').toString('base64');`);

// ---- rodapé de ponta a ponta ----
troca(`.rodape{margin-top:var(--secao);padding-bottom:var(--e3)}`,
`.rodape{margin-top:var(--secao);background:var(--tinta);color:var(--fundo);padding:var(--e9) 0 var(--e5);overflow:hidden}`);
troca(`.rodape .bloco{background:var(--tinta);color:var(--fundo);border-radius:var(--raio);padding:var(--e8) var(--e7) var(--e6);overflow:hidden;--apoio:rgba(244,242,240,.70);--fio:rgba(244,242,240,.16)}`,
`.rodape .bloco{--apoio:rgba(244,242,240,.70);--fio:rgba(244,242,240,.16)}
.marca-rodape{display:block;width:180px;height:79px;overflow:hidden;position:relative;margin-bottom:var(--e6)}
.marca-rodape img{position:absolute;left:0;top:-31px;width:180px;height:auto;max-width:none;mix-blend-mode:lighten}`);
troca(`.rodape .sobre{grid-column:1/-1}.rodape .bloco{padding:var(--e7) var(--e5) var(--e5)}}`, `.rodape .sobre{grid-column:1/-1}}`);
troca(`<div class="sobre">
          <h2>Quem somos nós?</h2>`, `<div class="sobre">
          <a class="marca-rodape" href="layout-alta-fidelidade.html" aria-label="O que dar?, página inicial"><img src="\${LOGO_ESCURO}" alt="" width="500" height="500"></a>
          <h2>Quem somos nós?</h2>`);

// ---- faixa escura do buscador ----
troca(`.populares{grid-column:1/-1;`, `.cta{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:var(--e3);align-items:center;margin-top:var(--e6)}
.busca{background:var(--tinta);color:var(--fundo);padding:var(--secao) 0;overflow:hidden;--apoio:rgba(244,242,240,.70);--fio:rgba(244,242,240,.16)}
.busca .brilho{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;opacity:.55}
.busca .b1{width:min(48vw,640px);aspect-ratio:1;left:-12vw;top:-18%;background:radial-gradient(circle,#FF6650 0%,transparent 68%)}
.busca .b2{width:min(44vw,600px);aspect-ratio:1;right:-10vw;bottom:-30%;background:radial-gradient(circle,#C7B4F7 0%,transparent 68%)}
.busca .b3{width:min(30vw,420px);aspect-ratio:1;right:24%;top:-20%;background:radial-gradient(circle,#F7A8C4 0%,transparent 68%);opacity:.35}
.busca .wrap{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.busca .cabeca{grid-column:1/-1;margin-bottom:0}
.busca .abre{color:var(--apoio)}
.busca .buscador{grid-column:1/-1;margin-top:var(--e5);background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.18);box-shadow:0 30px 80px rgba(0,0,0,.35)}
.busca .buscador .rodape-busca{border-top-color:rgba(255,255,255,.14)}
.busca .meta{color:var(--apoio)}
.busca .tag{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.22);color:var(--fundo)}
@media (hover:hover){.busca a.tag:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.5)}}
.busca .sel select{box-shadow:0 6px 18px rgba(0,0,0,.25)}
.populares{grid-column:1/-1;`);

// tira o buscador e os populares da abertura; põe chamada
const iniForm = s.indexOf('      <form class="buscador" id="buscar"');
const fimPop = s.indexOf('      </div>\n    </div>\n  </section>\n\n  <section aria-labelledby="t-achado">');
if (iniForm < 0 || fimPop < 0) { console.error('blocos da abertura nao achados'); process.exit(1); }
const blocoBusca = s.slice(iniForm, fimPop + '      </div>\n'.length);
s = s.slice(0, iniForm) + `      <div class="cta">
        <a class="btn btn-oferta" href="#buscar">Montar minha busca</a>
        <a class="btn btn-sec" href="#ideias">Ver ideias em destaque</a>
      </div>
` + s.slice(fimPop + '      </div>\n'.length);
n++;
troca(`  <section aria-labelledby="t-achado">`, `  <section class="busca" id="buscar" aria-labelledby="t-busca">
    <div class="brilho b1" aria-hidden="true"></div><div class="brilho b2" aria-hidden="true"></div><div class="brilho b3" aria-hidden="true"></div>
    <div class="wrap">
      <div class="cabeca">
        <h2 class="titulo" id="t-busca">Monte a sua pergunta.</h2>
        <p class="abre">Diga para quem é, do que a pessoa gosta e quanto quer gastar. A gente procura o resto.</p>
      </div>
${blocoBusca.replace('id="buscar" ', '')}    </div>
  </section>

  <section class="bloco-secao" aria-labelledby="t-achado">`);

// ---- foto real do basquete ----
troca(`{ t: 'Presente para Quem Gosta de Basquete: 14 Ideias', cat: 'Interesse', d: '14 de agosto de 2026', u: 'layout-artigo.html', cor: 'lavanda', img: 'Presentes de basquete recortados: bola, boné e caneca' }`,
`{ t: 'Presente para Quem Gosta de Basquete: 14 Ideias', cat: 'Interesse', d: '14 de agosto de 2026', u: 'layout-artigo.html', cor: 'lavanda', img: 'Presentes de basquete recortados: bola, boné e caneca', foto: 'imagens/basquete-capa.avif', alt: 'Rapaz sorrindo enquanto gira uma bola de basquete na ponta do dedo' }`);
troca(`        <figure class="reserva \${grande ? 'r-grande' : 'r-peq'}" style="background:rgba(255,255,255,.35)"><figcaption><b>Imagem de capa</b>\${a.img} · \${grande ? '4:3' : '3:2'} · produtos recortados</figcaption></figure>`,
`        \${a.foto ? \`<figure class="foto-art \${grande ? 'r-grande' : 'r-peq'}"><img src="\${a.foto}" alt="\${a.alt}" width="600" height="400"></figure>\` : \`<figure class="reserva \${grande ? 'r-grande' : 'r-peq'}" style="background:rgba(255,255,255,.35)"><figcaption><b>Imagem de capa</b>\${a.img} · \${grande ? '4:3' : '3:2'} · produtos recortados</figcaption></figure>\`}`);
troca(`.art-t{font-weight:var(--peso-forte);`, `.foto-art{border-radius:var(--raio-interno);overflow:hidden;background:#fff}
.foto-art img{width:100%;height:100%;object-fit:cover;object-position:50% 30%}
.art-t{font-weight:var(--peso-forte);`);

// capa do artigo: foto real + bloco lavanda
troca(`        <figure class="reserva capa c-lavanda"><figcaption><b>Imagem de capa</b>Composição dos presentes de basquete recortados sobre lavanda, com o Q de vidro ao fundo · 16:7 no computador, 4:3 no celular · área livre à direita</figcaption></figure>`,
`        <div class="capa-grade">
          <figure class="capa-foto"><img src="imagens/basquete-capa.avif" alt="Rapaz sorrindo enquanto gira uma bola de basquete na ponta do dedo" width="600" height="400"></figure>
          <div class="capa-lado c-lavanda">
            <span class="rotulo" style="color:var(--tinta)">Neste artigo</span>
            <ul class="fatos">
              <li><b>14 ideias</b><span>da bola ao Funko</span></li>
              <li><b>5 perfis de fã</b><span>quem joga, quem coleciona, quem decora</span></li>
              <li><b>3 lojas comparadas</b><span>Amazon, Mercado Livre e Shopee</span></li>
            </ul>
          </div>
        </div>`);
troca(`.capa{grid-column:1/-1;margin-top:var(--e7);aspect-ratio:16/7;border-radius:var(--raio)}`,
`.capa-grade{grid-column:1/-1;margin-top:var(--e7);display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.capa-foto{grid-column:1/span 8;aspect-ratio:3/2;border-radius:var(--raio);overflow:hidden;background:#fff}
.capa-foto img{width:100%;height:100%;object-fit:cover}
.capa-lado{grid-column:9/span 4;border-radius:var(--raio);padding:var(--e6);display:flex;flex-direction:column;justify-content:space-between;gap:var(--e5)}
.fatos{display:grid}
.fatos li{display:flex;flex-direction:column;gap:var(--e1);padding:var(--e4) 0;border-top:1px solid rgba(28,26,31,.18)}
.fatos b{font-size:var(--t-sub);letter-spacing:-.02em;line-height:1.1}
.fatos span{font-size:var(--t-rotulo)}`);
troca(`  .capa{aspect-ratio:4/3}`, `  .capa-foto,.capa-lado{grid-column:1/-1}`);

fs.writeFileSync(f, s);
console.log('trocas:', n);
