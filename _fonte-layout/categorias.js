// Páginas de categoria no modelo aprovado (Interesse). Gera categoria-<slug>.html para cada categoria.
// Os artigos de cada categoria vêm da marcação real dos posts; categorias ainda sem post mostram o estado vazio.
const fs = require('fs'), path = require('path');
const B = require('./base.js');
const { OUT, esc, P, reais, melhorIdx, nomes, cab, rodape, JS_BASE, head, artigos, imgProd, favArtigo, CORACAO, qLogo } = B;
const CSS_CAT = require('./css-categoria.js');
const { lista, produtosPorPost } = require('./posts.js');

const seta = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
// [nome, slug, cor, h1, texto de abertura (proposta, a revisar), foto, alt]
const CATS = [
  ['Relacionamento', 'relacionamento', 'rosa', 'Presentes por relacionamento.', 'Ideias para namorado, namorada, amigos e família. Escolha pela relação com quem vai receber e a gente mostra o que combina.', 'imagens/categorias/relacionamento.jpg', 'Mulher sorrindo surpresa enquanto o namorado esconde um presente nas costas'],
  ['Idade', 'idade', 'pessego', 'Presentes por idade.', 'Ideias para cada fase da vida. Escolha pela idade de quem vai receber e veja o que faz sentido agora.', 'imagens/categorias/idade.jpg', 'Duas mulheres felizes segurando uma caixa de presente'],
  ['Gênero', 'genero', 'lavanda', 'Presentes por gênero.', 'Ideias para homens e mulheres, com sugestões que fogem do óbvio.', 'imagens/categorias/genero.jpg', 'Mulher sorrindo com um presente na mão e o outro braço erguido, comemorando'],
  ['Interesse', 'interesse', 'pessego', 'Presentes por interesse.', 'Ideias para quem tem um hobby, um esporte ou uma paixão. Escolha pelo que a pessoa gosta e a gente mostra o que combina.', 'imagens/categorias/interesse.jpg', 'Mãos servindo macarons rosa numa xícara com borda dourada'],
  ['Profissão', 'profissao', 'lavanda', 'Presentes por profissão.', 'Ideias para presentear colegas, chefes e quem ama o que faz.', 'imagens/categorias/profissao.jpg', 'Pessoa comemorando aniversário no escritório'],
  ['Ocasião', 'ocasiao', 'rosa', 'Presentes por ocasião.', 'Aniversário, Natal, Dia das Mães e outras datas. Escolha pela ocasião e encontre o presente certo.', 'imagens/categorias/ocasiao.jpg', 'Caixa de presente rosa com laço de fita branca'],
  ['Preço', 'preco', 'pessego', 'Presentes por preço.', 'Ideias organizadas pelo quanto você quer gastar.', 'imagens/categorias/preco.jpg', 'Caixa de presente embrulhada com ramo de pinheiro e etiqueta'],
  ['Namoro', 'namoro', 'rosa', 'Presentes para namoro.', 'Ideias para cada fase do namoro, do primeiro mês às datas especiais.', 'imagens/aniversario.jpg', 'Casais comemorando um aniversário'],
];
// assuntos de exemplo só na categoria Interesse (aprovado no layout)
const SUBS = { interesse: [['todos', 'Todos'], ['esportes', 'Esportes'], ['games', 'Games'], ['musica', 'Música'], ['cafe', 'Café'], ['bebidas', 'Bebidas'], ['leitura', 'Leitura'], ['cozinha', 'Cozinha']] };
const subDe = { 'presentes-para-quem-gosta-de-basquete.html': 'esportes', 'presente-para-quem-gosta-de-correr.html': 'esportes', 'presentes-para-quem-gosta-de-cerveja.html': 'bebidas' };
const { ofertasDe, reais: reaisO } = require('./ofertas.js');

// presentes de um post: basquete vem da base; os outros, de posts.js
const presentesDe = a => {
  const slug = a.u.replace('.html', ''), l = produtosPorPost[slug] || [];
  return l.map(x => ({ nome: x.nome, html: `<img class="img-prod${x.cheia ? ' cheia' : ''}" data-fav-img="${x.id}" src="${x.img}" alt="${esc(x.alt)}" loading="lazy" decoding="async" width="600" height="600">`, cor: x.cor, lojas: x.lojas, url: x.url, id: x.id }));
};

const cartao = (a, grande, sub) => `
        <div class="art-item${grande ? ' grande' : ''} entra" data-sub="${sub || 'todos'}">
          <a class="art c-${a.cor}" href="${a.u}">
            <figure class="art-img"><img src="${a.foto}" alt="${esc(a.alt || '')}" width="600" height="400"></figure>
            <span class="rotulo">${a.cat}</span>
            <span class="${grande ? 'sub' : 'art-t'}">${a.t}</span>
            <span class="meta">${a.d}</span>
          </a>
          ${favArtigo(a, a.id)}
        </div>`;

for (const [nome, slug, cor, h1, abre, foto, alt] of CATS) {
  const daCat = lista.filter(a => (a.categorias || []).includes(slug));
  const presentes = daCat.flatMap(presentesDe);
  // "mais salvos": até 6, alternando entre os posts da categoria (ordem de exemplo)
  const salvos = []; for (let r = 0; salvos.length < 6 && r < 15; r++) daCat.forEach(a => { const l = presentesDe(a); if (l[r * 2] && salvos.length < 6) salvos.push(l[r * 2]); });
  const subs = SUBS[slug];
  const nA = daCat.length, nI = presentes.length;
  const pagina = head(`${h1.replace(/.$/, "")} · O que dar?`, abre, CSS_CAT) + `
<body>
${cab('cat')}
<main id="conteudo">
  <section class="cat-abertura" aria-labelledby="t-cat">
    <svg class="fita-cat" viewBox="0 0 1440 260" preserveAspectRatio="none" fill="none" aria-hidden="true"><defs><linearGradient id="g-cat" x1="0" x2="1"><stop offset="0" stop-color="#FF6650"/><stop offset=".55" stop-color="#FF8A6E"/><stop offset="1" stop-color="#F7A8C4"/></linearGradient></defs><path d="M-20 236 C 240 246, 460 232, 660 188 S 1000 196, 1180 120 S 1400 40, 1460 70" stroke="url(#g-cat)" pathLength="1"/></svg>
    <div class="wrap">
      <nav class="trilha" aria-label="Você está em"><ol><li><a href="layout-alta-fidelidade.html">Início</a></li><li><a href="layout-alta-fidelidade.html#categorias">Categorias</a></li><li><span aria-current="page">${nome}</span></li></ol></nav>
      <div class="cat-grade">
        <div class="cat-txt">
          <span class="rotulo">Categoria</span>
          <h1 class="gigante" id="t-cat">${h1}</h1>
          <p class="abre">${abre}</p>
          <div class="cat-numeros"><span class="tag">${nA} ${nA === 1 ? 'artigo' : 'artigos'}</span><span class="tag">${nI} ideias de presente</span></div>
        </div>
        <figure class="cat-foto c-${cor}"><img src="${foto}" alt="${esc(alt)}"></figure>
      </div>
    </div>
  </section>

  <section class="wrap" aria-labelledby="t-lista">
    <h2 class="sr" id="t-lista">Artigos de presentes por ${nome.toLowerCase()}</h2>
    ${subs ? `<div class="sub-filtro" role="group" aria-label="Filtrar por assunto">${subs.map((s, k) => `<button type="button" data-sub="${s[0]}" aria-pressed="${k === 0}">${s[1]}</button>`).join('')}</div>` : ''}
    <div class="ordem"><p class="meta" id="cat-cont" aria-live="polite">Mostrando ${nA} ${nA === 1 ? 'artigo' : 'artigos'}</p></div>
    <div class="cat-artigos" id="cat-artigos">${daCat.map((a, i) => cartao(a, i === 0 && nA > 1, subDe[a.u])).join('')}
      <div class="vazio-cat" id="vazio-cat"${nA ? ' hidden' : ''}>${qLogo()}<p class="sub">Ainda não temos ideias aqui.</p><p class="meta">Esse assunto está chegando. Enquanto isso, veja os outros ou salve a categoria nos favoritos.</p></div>
    </div>
  </section>
${salvos.length ? `
  <section class="bloco-secao wrap" aria-labelledby="t-salvos">
    <div class="cabeca"><h2 class="titulo" id="t-salvos">Presentes desta categoria.</h2><p class="abre">Alguns achados dos artigos desta categoria. Toque no coração para guardar.</p></div>
    <div class="salvos">${salvos.map(x => { const mo = ofertasDe(x).pr.sort((a, b) => a.preco - b.preco)[0]; return `
      <div class="salvo entra">
        <div class="foto-s c-${x.cor}">${x.html}<button class="fav-card" type="button" data-fav-tipo="presentes" data-fav-id="${x.id}" data-fav-nome="${esc(x.nome)}" data-fav-url="${x.url}" data-fav-cor="${x.cor}" aria-pressed="false" aria-label="Salvar ${esc(x.nome)} nos favoritos">${CORACAO}</button></div>
        <a class="nome" href="${x.url}">${esc(x.nome)}</a>
        ${mo ? `<span class="meta">a partir de <b>${reaisO(mo.preco)}</b></span>` : ''}
      </div>`; }).join('')}
    </div>
  </section>
` : ''}
  <section class="bloco-secao wrap" aria-labelledby="t-outras">
    <div class="cabeca"><h2 class="titulo" id="t-outras">Outras categorias.</h2></div>
    <div class="outras">${CATS.filter(c => c[1] !== slug).map(c => `<a class="c-${c[2]}" href="categoria-${c[1]}.html">${c[0]}${seta}</a>`).join('')}</div>
  </section>
</main>
${rodape}
<script>${JS_BASE}
(function(){
  var bts=document.querySelectorAll('.sub-filtro button'),itens=document.querySelectorAll('#cat-artigos .art-item'),vazio=document.getElementById('vazio-cat'),cont=document.getElementById('cat-cont');
  bts.forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.sub,n=0;bts.forEach(function(x){x.setAttribute('aria-pressed',x===b);});itens.forEach(function(it){var ok=f==='todos'||it.dataset.sub===f;it.hidden=!ok;if(ok)n++;});vazio.hidden=n>0;cont.textContent='Mostrando '+n+(n===1?' artigo':' artigos');});});
})();
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT, `categoria-${slug}.html`), pagina);
  console.log(`categoria-${slug}.html`, nA, 'artigos', nI, 'presentes');
}
