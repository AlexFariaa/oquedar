// Modelo de página de categoria: layout-categoria.html (exemplo: Interesse)
const B = require('./base.js');
const { fs, path, OUT, esc, P, reais, melhorIdx, nomes, lojas, cab, rodape, JS_BASE, head, artigos, imgProd, scriptImgs, favArtigo, CORACAO, qLogo } = B;

// artigos reais da categoria Interesse: basquete (0) e corrida (1)
const daCategoria = [{ a: artigos[0], k: 0, sub: 'esportes' }, { a: artigos[1], k: 1, sub: 'esportes' }];
const subs = [['todos', 'Todos'], ['esportes', 'Esportes'], ['games', 'Games'], ['musica', 'Música'], ['cafe', 'Café'], ['leitura', 'Leitura'], ['cozinha', 'Cozinha']];
const maisSalvos = [0, 4, 2, 8, 10, 1];
const outras = [['Relacionamento', 'rosa'], ['Idade', 'pessego'], ['Gênero', 'lavanda'], ['Profissão', 'lavanda'], ['Ocasião', 'rosa'], ['Preço', 'pessego']];
const seta = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const CSS_CAT = `
section{position:relative}
.trilha ol{display:flex;flex-wrap:wrap;gap:var(--e2);align-items:center}
.trilha li{display:flex;align-items:center;gap:var(--e2);font-size:var(--t-rotulo)}
.trilha li+li::before{content:"";width:6px;height:6px;border-right:1.5px solid var(--discreto);border-bottom:1.5px solid var(--discreto);transform:rotate(-45deg)}
.trilha a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;font-weight:var(--peso-forte)}

/* abertura da categoria, com a fita atravessando */
.cat-abertura{position:relative;padding-top:clamp(132px,15vw,176px);padding-bottom:calc(var(--e9) + var(--e6));overflow:clip}
.cat-abertura .fita-cat{position:absolute;z-index:0;left:0;top:auto;bottom:0;width:100%;height:190px;pointer-events:none;filter:drop-shadow(0 10px 18px rgba(255,102,80,.22))}
.cat-abertura .fita-cat path{stroke-width:22;stroke-linecap:round}
.js .cat-abertura .fita-cat path{stroke-dasharray:1;stroke-dashoffset:1;animation:desenha-cat 2.4s var(--curva) .3s forwards}
@keyframes desenha-cat{to{stroke-dashoffset:0}}
.cat-abertura .wrap{position:relative;z-index:1}
.cat-grade{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end}
.cat-txt{grid-column:1/span 7;display:flex;flex-direction:column;gap:var(--e5);position:relative;z-index:2}
.cat-txt .gigante{font-size:clamp(3rem,7vw,7rem)}
.cat-txt .abre{max-width:32em}
.cat-numeros{display:flex;flex-wrap:wrap;gap:var(--e2)}
.cat-foto{grid-column:9/span 4;aspect-ratio:4/5;border-radius:var(--raio);position:relative;z-index:1;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.cat-foto{overflow:hidden}
.cat-foto img{width:100%;height:100%;object-fit:cover}

/* filtro por assunto */
.sub-filtro{position:sticky;top:88px;z-index:calc(var(--z-cab) - 1);display:flex;gap:var(--e2);overflow-x:auto;padding:var(--e2);margin:var(--e6) 0 var(--e5);border-radius:var(--pilula);background:rgba(255,255,255,.75);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid #fff;box-shadow:0 10px 30px rgba(70,30,40,.06);scrollbar-width:none}
.sub-filtro::-webkit-scrollbar{display:none}
.sub-filtro button{flex:none;font:inherit;min-height:44px;padding:0 var(--e4);border-radius:var(--pilula);border:1.5px solid var(--fio-forte);background:transparent;color:var(--tinta);cursor:pointer}
.sub-filtro button[aria-pressed="true"]{background:var(--tinta);border-color:var(--tinta);color:var(--fundo);font-weight:var(--peso-forte)}
.ordem{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--e3);margin-bottom:var(--e5)}

/* artigos da categoria */
.cat-artigos{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.art-item{position:relative;grid-column:span 4}
.art-item.grande{grid-column:span 8}
.art-item[hidden]{display:none}
.art{display:flex;flex-direction:column;gap:var(--e3);height:100%;border-radius:var(--raio);overflow:hidden;padding:0 0 var(--e5);text-decoration:none;transition:transform .25s var(--curva),box-shadow .25s var(--curva)}
.art > span{padding-inline:var(--e5)}
.art-img{aspect-ratio:3/2;margin-bottom:var(--e2);overflow:hidden}
.grande .art-img{aspect-ratio:16/9}
.art-img img{width:100%;height:100%;object-fit:cover;object-position:50% 30%;transition:transform .6s var(--curva)}
.art-t{font-weight:var(--peso-forte);line-height:1.3;text-wrap:balance}
@media (hover:hover){.art:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(70,30,40,.10)}.art:hover .art-img img{transform:scale(1.04)}}
.vazio-cat{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--e4);padding:var(--e8) var(--e5);border-radius:var(--raio);background:#fff}
.vazio-cat .q-logo{width:56px}
.vazio-cat .q-rotulo{display:none}

/* presentes mais salvos */
.salvos{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--e4)}
.salvo{position:relative;display:flex;flex-direction:column;gap:var(--e2)}
.salvo .foto-s{position:relative;aspect-ratio:1;border-radius:var(--raio);overflow:hidden}
.salvo .foto-s .img-prod{position:absolute;inset:0;transition:transform .6s var(--curva)}
@media (hover:hover){.salvo:hover .foto-s .img-prod{transform:scale(1.05)}}
.salvo a.nome{font-weight:var(--peso-forte);line-height:1.3;text-decoration:none;font-size:var(--t-rotulo)}
.salvo a.nome:hover{text-decoration:underline}
.salvo b{font-variant-numeric:tabular-nums}

/* outras categorias */
.outras{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--e3)}
.outras a{display:flex;justify-content:space-between;align-items:center;gap:var(--e2);min-height:72px;padding:0 var(--e4);border-radius:var(--raio);text-decoration:none;font-weight:var(--peso-forte);transition:transform .25s var(--curva)}
.outras a svg{width:18px;height:18px;flex:none;transition:transform .25s var(--curva)}
@media (hover:hover){.outras a:hover{transform:translateY(-3px)}.outras a:hover svg{transform:rotate(-45deg)}}

.cabeca{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end;margin-bottom:var(--e6)}
.cabeca h2{grid-column:1/span 7}
.cabeca p{grid-column:9/span 4}
.bloco-secao{margin-top:var(--secao)}

@media (max-width:900px){
  .cat-txt,.cat-foto{grid-column:1/-1}
  .cat-foto{aspect-ratio:16/9}
  .cat-abertura .fita-cat{top:30%}
  .art-item,.art-item.grande{grid-column:1/-1}
  .salvos{grid-template-columns:repeat(2,minmax(0,1fr))}
  .outras{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cabeca h2,.cabeca p{grid-column:1/-1}
}
@media (prefers-reduced-motion:reduce){.js .cat-abertura .fita-cat path{animation:none;stroke-dashoffset:0}}
`;

const cartao = ({ a, k, sub }, grande) => `
        <div class="art-item${grande ? ' grande' : ''} entra" data-sub="${sub}">
          <a class="art c-${a.cor}" href="${a.u}">
            <figure class="art-img"><img src="${a.foto}" alt="${a.alt}" width="600" height="400"></figure>
            <span class="rotulo">${a.cat}</span>
            <span class="${grande ? 'sub' : 'art-t'}">${a.t}</span>
            <span class="meta">${a.d}</span>
          </a>
          ${favArtigo(a, 'art-' + k)}
        </div>`;

const pagina = head('Presentes por Interesse · O que dar?', 'Ideias de presente para quem tem um hobby, um esporte ou uma paixão.', CSS_CAT) + `
<body>
${cab('cat')}
<main id="conteudo">
  <section class="cat-abertura" aria-labelledby="t-cat">
    <svg class="fita-cat" viewBox="0 0 1440 260" preserveAspectRatio="none" fill="none" aria-hidden="true"><defs><linearGradient id="g-cat" x1="0" x2="1"><stop offset="0" stop-color="#FF6650"/><stop offset=".55" stop-color="#FF8A6E"/><stop offset="1" stop-color="#F7A8C4"/></linearGradient></defs><path d="M-20 236 C 240 246, 460 232, 660 188 S 1000 196, 1180 120 S 1400 40, 1460 70" stroke="url(#g-cat)" pathLength="1"/></svg>
    <div class="wrap">
      <nav class="trilha" aria-label="Você está em"><ol><li><a href="layout-alta-fidelidade.html">Início</a></li><li><a href="layout-alta-fidelidade.html#categorias">Categorias</a></li><li><span aria-current="page">Interesse</span></li></ol></nav>
      <div class="cat-grade">
        <div class="cat-txt">
          <span class="rotulo">Categoria</span>
          <h1 class="gigante" id="t-cat">Presentes por interesse.</h1>
          <p class="abre">Ideias para quem tem um hobby, um esporte ou uma paixão. Escolha pelo que a pessoa gosta e a gente mostra o que combina.</p>
          <div class="cat-numeros"><span class="tag">2 artigos</span><span class="tag">29 ideias de presente</span></div>
        </div>
        <figure class="cat-foto c-pessego"><img src="imagens/categorias/interesse.jpg" alt="Mãos servindo macarons rosa numa xícara com borda dourada"></figure>
      </div>
    </div>
  </section>

  <section class="wrap" aria-labelledby="t-lista">
    <h2 class="sr" id="t-lista">Artigos de presentes por interesse</h2>
    <div class="sub-filtro" role="group" aria-label="Filtrar por assunto">${subs.map((s, k) => `<button type="button" data-sub="${s[0]}" aria-pressed="${k === 0}">${s[1]}</button>`).join('')}</div>
    <div class="ordem"><p class="meta" id="cat-cont" aria-live="polite">Mostrando 2 artigos</p><span class="exemplo">Assuntos de exemplo: o filtro funciona com os artigos reais</span></div>
    <div class="cat-artigos" id="cat-artigos">${daCategoria.map((x, i) => cartao(x, i === 0)).join('')}
      <div class="vazio-cat" id="vazio-cat" hidden>${qLogo()}<p class="sub">Ainda não temos ideias aqui.</p><p class="meta">Esse assunto está chegando. Enquanto isso, veja os outros ou salve a categoria nos favoritos.</p></div>
    </div>
  </section>

  <section class="bloco-secao wrap" aria-labelledby="t-salvos">
    <div class="cabeca"><h2 class="titulo" id="t-salvos">Presentes mais salvos.</h2><p class="abre">Os achados desta categoria que mais gente guardou para depois.</p></div>
    <div class="salvos">${maisSalvos.map(i => { const p = P[i], m = melhorIdx(p); return `
      <div class="salvo entra">
        <div class="foto-s c-${p.cor}">${imgProd(i, `" data-fav-img="p-${i + 1}`)}<button class="fav-card" type="button" data-fav-tipo="presentes" data-fav-id="p-${i + 1}" data-fav-nome="${esc(nomes[i])}" data-fav-url="layout-artigo.html#p-${i + 1}" data-fav-cor="${p.cor}" aria-pressed="false" aria-label="Salvar ${esc(nomes[i])} nos favoritos">${CORACAO}</button></div>
        <a class="nome" href="layout-artigo.html#p-${i + 1}">${esc(nomes[i])}</a>
        <span class="meta">a partir de <b>${reais(p.precos[m])}</b></span>
      </div>`; }).join('')}
    </div>
    <p class="meta" style="margin-top:var(--e4)">Ordem e preços de exemplo, até a integração.</p>
  </section>

  <section class="bloco-secao wrap" aria-labelledby="t-outras">
    <div class="cabeca"><h2 class="titulo" id="t-outras">Outras categorias.</h2></div>
    <div class="outras">${outras.map(o => `<a class="c-${o[1]}" href="https://oquedar.com/category/${o[0].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}/">${o[0]}${seta}</a>`).join('')}</div>
  </section>
</main>
${rodape}
${scriptImgs(maisSalvos)}
<script>${JS_BASE}
(function(){
  var bts=document.querySelectorAll('.sub-filtro button'),itens=document.querySelectorAll('#cat-artigos .art-item'),vazio=document.getElementById('vazio-cat'),cont=document.getElementById('cat-cont');
  bts.forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.sub,n=0;bts.forEach(function(x){x.setAttribute('aria-pressed',x===b);});itens.forEach(function(it){var ok=f==='todos'||it.dataset.sub===f;it.hidden=!ok;if(ok)n++;});vazio.hidden=n>0;cont.textContent='Mostrando '+n+(n===1?' artigo':' artigos');});});
})();
</script>
</body>
</html>`;
fs.writeFileSync(path.join(OUT, 'layout-categoria.html'), pagina);
console.log('categoria ok', Math.round(pagina.length / 1024) + 'KB');
