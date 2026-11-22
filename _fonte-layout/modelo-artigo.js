// Modelo de artigo para qualquer post. Recebe os dados de um post (D) e devolve o HTML da página.
// É o mesmo modelo aprovado no post de basquete, agora sem nada fixo do basquete.
const B = require('./base.js');
const { esc, cab, rodape, JS_BASE, head, CORACAO, favArtigo } = B;
const { ofertasDe, notaDe, notaTxt, linkLoja, faixaDe, comparador, dataBR, reais } = require('./ofertas.js');
const CSS_ART = require('./css-artigo.js');

const SETAS = '<div class="fp-setas"><button type="button" class="fp-ant" aria-label="Ver anteriores" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><button type="button" class="fp-prox" aria-label="Ver próximos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>';
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const pTxt = itens => (itens || []).filter(b => b.t === 'P').map(b => b.x);
// trechos de texto corrido: parágrafos, subtítulos e listas
function blocosHtml(itens, ind = '            ') {
  let h = '', lista = [];
  const fecha = () => { if (lista.length) { h += `${ind}<ul class="marcadores">${lista.map(x => `<li>${esc(x)}</li>`).join('')}</ul>\n`; lista = []; } };
  for (const b of itens || []) {
    if (b.t === 'LI') { lista.push(b.x); continue; }
    fecha();
    if (b.t === 'H3') h += `${ind}<h3 class="sub">${esc(b.x)}</h3>\n`;
    else if (b.t === 'P') h += `${ind}<p>${esc(b.x)}</p>\n`;
  }
  fecha(); return h;
}

function montaArtigo(D) {
  const P = D.produtos, N = P.length, nomes = P.map(p => p.nome);
  const G = D.grupos || [], hProd = G.length ? 'h3' : 'h2'; // com grupos, cada presente é H3 dentro do H2 do grupo
  const imgProd = i => `<img class="img-prod${P[i].cheia ? ' cheia' : ''}" src="${P[i].img}" loading="lazy" decoding="async" width="600" height="600" alt="${esc(P[i].alt)}">`;
  const fpItem = i => `<li><a href="#p-${i + 1}"><span class="fp-img c-${P[i].cor}"><span class="fp-n">${String(i + 1).padStart(2, '0')}</span>${imgProd(i)}</span><span class="fp-t">${esc(nomes[i])}</span></a></li>`;
  const favPresente = (i, comTexto) => { const p = P[i], n = i + 1; const attrs = `data-fav-tipo="presentes" data-fav-id="${D.pre}p-${n}" data-fav-nome="${esc(nomes[i])}" data-fav-url="${D.arquivo}#p-${n}" data-fav-cor="${p.cor}" aria-pressed="false"`;
    return comTexto ? `<button class="favoritar" type="button" ${attrs}>${CORACAO}<span class="fav-txt">Salvar nos favoritos</span></button>`
      : `<button class="fav-card" type="button" ${attrs} aria-label="Salvar ${esc(nomes[i])} nos favoritos">${CORACAO}</button>`; };
  const imgFav = i => imgProd(i).replace('<img ', `<img data-fav-img="${D.pre}p-${i + 1}" `);

  const cardProduto = (p, i) => {
    const n = i + 1, nota = notaDe(p);
    return `
    <article class="produto" id="p-${n}" data-faixa="${faixaDe(p)}"${n === 3 ? ' data-lembrete="Gostou de algum presente? Toque no coração para salvar e ver depois, quando chegar a data."' : ''}>
      <div class="prod-topo">
        <div class="prod-foto c-${p.cor}">${imgFav(i)}${favPresente(i, false)}</div>
        <div class="prod-info">
          <span class="num">${String(n).padStart(2, '0')} de ${N}</span>
          <${hProd} class="sub">${esc(p.titulo)}</${hProd}>
          <div class="tags">${p.perfil.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          ${nota ? `<div class="avaliacao"><span class="nota"><b>${nota.nota.toFixed(1).replace('.', ',')} ★</b><span class="meta">na ${nota.nome}${nota.avaliacoes ? ` · ${nota.avaliacoes.toLocaleString('pt-BR')} avaliações` : ''}</span></span></div>` : ''}
          <details class="pc-det" open><summary>Prós e contras</summary><div class="pc">
            <div><span class="rotulo">Prós</span><ul class="mais">${p.pros.map(x => `<li>${x}</li>`).join('')}</ul></div>
            <div><span class="rotulo">Contras</span><ul class="menos">${p.contras.map(x => `<li>${x}</li>`).join('')}</ul></div>
          </div></details>
          ${comparador(p, nomes[i])}
          ${favPresente(i, true)}
        </div>
      </div>
      <div class="prod-texto leitura">
${blocosHtml(p.itens, '        ')}      </div>
    </article>`;
  };

  // índice: só as seções que o post tem
  const indice = [['intro', 'Introdução'], ['rapido', 'Se você tem pouco tempo'], ['selecao', 'Seleção O que dar de presente']];
  G.forEach((g, k) => indice.push(['grupo-' + (k + 1), g.curto || g.titulo.replace(/:.*$/, '')]));
  if (D.comoEscolhemos) indice.push(['escolhemos', 'Como escolhemos']);
  indice.push(['comp', 'Comparativo rápido']);
  if (D.qualCombina) indice.push(['qual', 'Qual presente combina']);
  (D.extras || []).forEach((x, k) => indice.push(['extra-' + k, x.curto || x.titulo]));
  if (D.faq) indice.push(['faq', 'Perguntas frequentes']);
  if (D.fechamento) indice.push(['fecho', 'Fechamento']);
  const listaIndice = indice.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('');

  const temPreco = P.some(p => ofertasDe(p).pr.length), temNota = P.some(p => notaDe(p));
  const total = P.map((p, i) => {
    const g = G.findIndex(x => x.de === i);
    const cabG = g < 0 ? '' : `
    <div class="grupo-prod" id="grupo-${g + 1}">
      <h2 class="sub" id="t-grupo-${g + 1}">${esc(G[g].titulo)}</h2>
      <div class="leitura">
${blocosHtml(G[g].itens, '        ')}      </div>
    </div>`;
    return cabG + cardProduto(p, i);
  });
  const posPausa = D.nemTodo ? Math.min(D.posNemTodo || 10, N) : N;
  let pausa = '';
  if (D.nemTodo) {
    const f = pTxt(D.nemTodo.itens);
    pausa = `
      <aside class="pausa" aria-labelledby="t-nemtodo">
        <div class="pausa-grade">
          <h2 class="sub" id="t-nemtodo">${esc(D.nemTodo.titulo)}</h2>
          <div class="falas">${f.slice(1, 5).map(x => `<p>${esc(x)}</p>`).join('')}</div>
          <div class="resto">${[f[0], ...f.slice(5)].filter(Boolean).map(x => `<p>${esc(x)}</p>`).join('')}</div>
        </div>
      </aside>`;
  }
  const linka = h => (D.links || []).reduce((s, [txt, href]) => s.replace(esc(txt), `<a class="link" href="${href}">${esc(txt)}</a>`), h);

  // "qual presente combina": itens de lista que são presentes da lista viram miniaturas
  const qualHtml = (() => {
    if (!D.qualCombina) return '';
    let h = '', lista = [], soltos = [];
    const acha = x => {
      const n = norm(x); let k = nomes.findIndex(y => norm(y) === n); if (k < 0) k = nomes.findIndex(y => n.includes(norm(y)) || norm(y).includes(n));
      if (k < 0) { // palavras em comum (ex.: "Luminária com Foto Personalizada" x "Luminária com Sua Foto Personalizada LED")
        const pal = s => norm(s).split(' ').filter(w => w.length > 2); const a = pal(x); let melhor = 0;
        nomes.forEach((y, j) => { const b = pal(y); const c = a.filter(w => b.includes(w)).length / a.length; if (c > melhor && c >= .6) { melhor = c; k = j; } });
      }
      return k;
    };
    const fecha = () => {
      if (lista.length) { h += `<nav class="faixa-prod faixa-qual" aria-label="Presentes deste perfil">${SETAS}<ol>${lista.join('')}</ol></nav>\n`; lista = []; }
      if (soltos.length) { h += `<ul class="marcadores">${soltos.map(x => `<li>${esc(x)}</li>`).join('')}</ul>\n`; soltos = []; }
    };
    for (const b of D.qualCombina.itens) {
      if (b.t === 'LI') { const k = acha(b.x); if (k >= 0) lista.push(fpItem(k)); else soltos.push(b.x); continue; }
      fecha();
      if (b.t === 'H3') h += `<h3 class="sub">${esc(b.x)}</h3>\n`;
      else h += linka(`<p>${esc(b.x)}</p>`) + '\n';
    }
    fecha(); return h;
  })();

  const faqPares = [];
  if (D.faq) for (let k = 0; k < D.faq.itens.length; k++) if (D.faq.itens[k].t === 'H3') {
    const r = []; for (let j = k + 1; j < D.faq.itens.length && D.faq.itens[j].t !== 'H3'; j++) if (D.faq.itens[j].t === 'P') r.push(D.faq.itens[j].x);
    faqPares.push([D.faq.itens[k].x, r]);
  }
  const fechoP = D.fechamento ? pTxt(D.fechamento.itens) : [];
  const citacao = fechoP.find(x => /pensar: ["“]/.test(x));
  const textoSec = (id, sec, extraClasse = '') => sec ? `
        <section class="secao-art texto-art${extraClasse}" id="${id}" aria-labelledby="t-${id}">
          <h2 class="sub" id="t-${id}">${esc(sec.titulo)}</h2>
          <div class="leitura">
${linka(blocosHtml(sec.itens))}          </div>
        </section>
` : '';
  const a0 = D.artigo;
  const outros = D.outros;

  let html = head(D.titleTag, D.desc, CSS_ART) + `
<body>
<script>(function(){var m=new URLSearchParams(location.search).get('modelo');(m?m.split(','):['barra','lista']).forEach(function(x){document.documentElement.classList.add('m-'+x);});if(window.self!==window.top)document.documentElement.classList.add('em-moldura');})();</script>
<div class="progresso" id="progresso" aria-hidden="true"></div>
${cab('')}
<main id="conteudo">
  <article>
    <header class="art-abertura">
      <div class="mancha" aria-hidden="true"></div>
      <div class="wrap grade">
        <nav class="trilha" aria-label="Você está em" style="grid-column:1/-1;position:relative">
          <ol><li><a href="layout-alta-fidelidade.html">Início</a></li><li><a href="${D.trilha[1]}">${D.trilha[0]}</a></li><li><span aria-current="page">${D.trilhaAtual}</span></li></ol>
        </nav>
        <h1 class="gigante">${esc(D.h1)}</h1>
        <div class="autoria">
          <span class="quem"><figure class="avatar foto-av"><img src="imagens/autora.jpg" alt="Foto de A.G."></figure>Por A.G.</span>
          <span class="meta">${D.dataTxt} · ${D.leitura} min de leitura</span>
          <button class="btn btn-sec btn-peq fav-artigo" type="button" data-fav-tipo="artigos" data-fav-id="${a0.id}" data-fav-nome="${esc(a0.t)}" data-fav-url="${D.arquivo}" data-fav-cor="${a0.cor}" aria-pressed="false">${CORACAO}<span class="fav-txt">Salvar artigo</span></button>
          <span class="aviso"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>Este artigo tem links de afiliados. Se você comprar por eles, podemos receber uma comissão, sem custo a mais para você.</span>
        </div>
        <div class="capa-grade">
          <figure class="capa-foto"><img src="${D.capa.src}" alt="${esc(D.capa.alt)}" width="600" height="400" fetchpriority="high"></figure>
          <div class="capa-lado c-${a0.cor}">
            <span class="rotulo" style="color:var(--tinta)">Neste artigo</span>
            <ul class="fatos">
${D.fatos.map(f => `              <li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('\n')}
            </ul>
          </div>
        </div>
      </div>
    </header>

    <div class="wrap art-corpo">
      <div class="art-main">
        <details class="indice-movel"><summary>Neste artigo</summary><ol>${listaIndice}</ol></details>

        <section id="intro" class="intro leitura" aria-label="Introdução">
          ${D.intro.map(x => `<p>${esc(x)}</p>`).join('\n          ')}
        </section>

        <section class="secao-art" id="rapido" aria-labelledby="t-rapido">
          <div class="cabeca-art">
            <h2 class="titulo" id="t-rapido">Se você tem pouco tempo.</h2>
            <p class="abre">Três escolhas para decidir agora. A lista completa vem logo abaixo.</p>
          </div>
          <div class="rapido">${D.pouco.map((e, k) => { const p = P[e.i]; const O = ofertasDe(p), mo = O.melhor; return `
            <div class="escolha c-${e.cor} entra" data-atraso="${k * 70}">
              <figure class="esc-img">${imgProd(e.i)}</figure>
              <span class="tag">${e.selo}</span>
              <h3><a href="#p-${e.i + 1}" style="text-decoration:none">${esc(nomes[e.i])}</a></h3>
              <p>${e.porque}</p>
              ${mo ? `<div class="linha-preco">${mo.preco > 0 ? `<span><span class="meta">a partir de</span><br><b>${reais(mo.preco)}</b></span>` : '<span></span>'}${linkLoja(mo, nomes[e.i], 'btn btn-oferta', mo.preco > 0 ? 'Ver oferta' : 'Ver na ' + mo.nome)}</div>
              <span class="meta">${mo.preco > 0 ? `Melhor preço na ${mo.nome} · verificado em ${dataBR(mo.verificado)}` : `Disponível na ${O.l.map(o => o.nome).join(', ')}`}</span>` : ''}
            </div>`; }).join('')}
          </div>
        </section>

        <section class="secao-art" id="selecao" aria-labelledby="t-selecao">
          <div class="cabeca-art">
            <h2 class="titulo" id="t-selecao">Seleção O que dar de presente</h2>
            <p class="abre">${N} presentes, cada um com prós e contras e onde comprar. Toque no coração para guardar os que você gostou.</p>
          </div>
          <nav class="faixa-prod" aria-label="Os ${N} presentes desta lista">${SETAS}<ol>${P.map((p, i) => fpItem(i)).join('')}</ol></nav>
          ${temPreco ? `<div class="filtro" role="group" aria-label="Filtrar por faixa de preço">
            <span class="rotulo">Preço</span>
            <button type="button" data-f="todos" aria-pressed="true">Todos</button>
            <button type="button" data-f="ate100" aria-pressed="false">Até R$ 100</button>
            <button type="button" data-f="100a300" aria-pressed="false">R$ 100 a 300</button>
            <button type="button" data-f="acima300" aria-pressed="false">Acima de R$ 300</button>
          </div>
          <p class="contagem" id="contagem" aria-live="polite">Mostrando ${N} de ${N} presentes</p>` : ''}
          <div id="produtos">${total.slice(0, posPausa).join('')}
${pausa}${total.slice(posPausa).join('')}
          </div>
        </section>
${textoSec('escolhemos', D.comoEscolhemos)}
        <section class="secao-art" id="comp" aria-labelledby="t-comp">
          <div class="cabeca-art">
            <h2 class="titulo" id="t-comp">Comparativo rápido.</h2>
            <p class="abre">Os ${N} presentes lado a lado${temPreco ? ', com o menor preço encontrado' : ''}.</p>
          </div>
          <div class="tabela-caixa">
            <table>
              <caption class="sr">Os presentes desta lista e onde comprar</caption>
              <thead><tr><th scope="col">Presente</th>${temNota ? '<th scope="col">Nota</th>' : ''}${temPreco ? '<th scope="col">A partir de</th>' : ''}<th scope="col"><span class="sr">Ação</span></th></tr></thead>
              <tbody>${P.map((p, i) => { const O = ofertasDe(p), mo = O.melhor, nt = notaDe(p); return `
                <tr><th scope="row"><span class="cel-prod"><span class="num-c">${String(i + 1).padStart(2, '0')}</span><span class="mini-prod c-${p.cor}">${imgProd(i)}</span><a class="nome" href="#p-${i + 1}">${esc(nomes[i])}</a></span></th>${temNota ? `<td class="n nota-c">${nt ? nt.nota.toFixed(1).replace('.', ',') + ' ★' : ''}</td>` : ''}${temPreco ? `<td class="n preco-c">${mo && mo.preco > 0 ? reais(mo.preco) : ''}</td>` : ''}<td>${mo ? linkLoja(mo, nomes[i], 'btn btn-sec btn-peq', mo.preco > 0 ? 'Ver oferta' : 'Ver na ' + mo.nome) : ''}</td></tr>`; }).join('')}
              </tbody>
            </table>
          </div>
        </section>
${D.qualCombina ? `
        <section class="secao-art texto-art bloco-cor c-lavanda" id="qual" aria-labelledby="t-qual">
          <h2 class="sub" id="t-qual">${esc(D.qualCombina.titulo)}</h2>
          <div class="leitura">
            ${qualHtml}
          </div>
        </section>
` : ''}${(D.extras || []).map((x, k) => textoSec('extra-' + k, x)).join('')}${D.faq ? `
        <section class="secao-art texto-art bloco-escuro" id="faq" aria-labelledby="t-faq">
          <h2 class="sub" id="t-faq">${esc(D.faq.titulo)}</h2>
          <div class="faq">${faqPares.map(q => `
            <details><summary><h3 class="faq-q">${esc(q[0])}</h3><span class="mais-ico" aria-hidden="true"></span></summary>${q[1].map(r => linka(`<p class="resp">${esc(r)}</p>`)).join('')}</details>`).join('')}
          </div>
        </section>
` : ''}${D.fechamento ? `
        <section class="secao-art texto-art fecho" id="fecho" aria-labelledby="t-fecho">
          <h2 class="sub" id="t-fecho">${esc(D.fechamento.titulo)}</h2>
          <div class="leitura">
            ${fechoP.filter(x => x !== citacao).slice(0, 4).map(x => linka(`<p>${esc(x)}</p>`)).join('\n            ')}
            ${citacao ? `<blockquote>${esc(citacao.replace(/.*pensar: /, ''))}</blockquote>` : ''}
            ${fechoP.filter(x => x !== citacao).slice(4).map(x => linka(`<p style="margin-top:var(--e6)">${esc(x)}</p>`)).join('')}
          </div>
        </section>
` : ''}
        <section class="secao-art" aria-labelledby="t-autora">
          <div class="autora entra">
            <div class="quem">
              <figure class="avatar foto-av"><img src="imagens/autora.jpg" alt="Retrato de A.G., autora do artigo" loading="lazy"></figure>
              <span class="rotulo">Escrito por</span>
              <p class="sub" id="t-autora">A.G.</p>
              <span class="meta">Curadoria O que dar? · ${D.trilha[0]}</span>
            </div>
            <div class="transp">
              <span class="rotulo">Transparência</span>
              <p>Somos um site associado da Amazon e, portanto, recebemos comissões por compras qualificadas. Como se trata de um acordo de intermediação entre nosso site e a Amazon, os valores elegíveis de comissionamento não são repassados para os usuários.</p>
              <a class="link" href="declaracao-de-afiliados.html">Ler a declaração de afiliados</a>
            </div>
          </div>
        </section>
      </div>

      <aside class="art-lado" aria-label="Navegação do artigo">
        <nav class="lado-bloco indice" aria-labelledby="t-indice">
          <span class="rotulo" id="t-indice">Neste artigo</span>
          <div class="indice-fita"><svg viewBox="0 0 24 360" preserveAspectRatio="none" fill="none" aria-hidden="true"><path class="fundo-fita" d="M12 0 C 22 30, 2 60, 12 90 S 22 150, 12 180 S 2 240, 12 270 S 22 330, 12 360"/><path class="prog-fita" id="prog-fita" pathLength="1" d="M12 0 C 22 30, 2 60, 12 90 S 22 150, 12 180 S 2 240, 12 270 S 22 330, 12 360"/></svg><ol id="indice">${listaIndice}</ol></div>
        </nav>
        <div class="lado-bloco favs-lado">
          <span class="rotulo fav-tit">${CORACAO}Seus favoritos</span>
          <p class="meta">Você guardou <b data-fav-n="presentes">0</b> presentes e <b data-fav-n="artigos">0</b> artigos.</p>
          <button class="btn btn-escuro btn-peq" type="button" data-abre-fav>Ver favoritos</button>
        </div>
        <div class="lado-bloco outros">
          <span class="rotulo">Outros posts</span>
          <ul>${outros.map(a => `
            <li><a href="${a.u}"><span class="mini-img c-${a.cor}">${a.foto ? `<img src="${a.foto}" alt="${a.alt || ''}" loading="lazy">` : ''}</span><span class="txt-o"><span class="t">${a.t}</span><span class="meta">${a.cat}</span></span></a></li>`).join('')}
          </ul>
        </div>
      </aside>
    </div>
  </article>

  <section class="secao-art wrap" aria-labelledby="t-news-fim">
    <div class="news-fim entra">
      <div class="pilha" aria-hidden="true">${[0, 1, 2, 3, 4].filter(i => i < N).map(i => `<span class="c-${P[i].cor}">${imgProd(i)}</span>`).join('')}</div>
      <span class="tag">Newsletter O que dar?</span>
      <p class="titulo" id="t-news-fim">Ideias de presentes sempre.</p>
      <p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p>
      <form action="#" onsubmit="return false" aria-label="Assinar a newsletter">
        <label class="sr" for="email-fim">Seu e-mail</label>
        <div class="campo"><input id="email-fim" type="email" placeholder="seu@email.com" autocomplete="email"><button class="btn btn-oferta" type="submit">Assinar</button></div>
        <small>O envio ainda não está conectado.</small>
      </form>
    </div>
  </section>

  <section class="secao-art wrap" aria-labelledby="t-mais">
    <div class="cabeca-art"><p class="titulo" id="t-mais">Continue explorando.</p></div>
    <div class="mais-artigos">${outros.slice(0, 3).map((a, k) => `
      <div class="mini-item entra" data-atraso="${k * 60}">
        <a class="mini c-${a.cor}" href="${a.u}">
          <figure class="mini-capa"><img src="${a.foto}" alt="${esc(a.alt || '')}" width="600" height="400" loading="lazy"></figure>
          <span class="rotulo">${a.cat}</span>
          <span class="t">${a.t}</span>
          <span class="meta">${a.d}</span>
        </a>
        ${favArtigo(a, a.id)}
      </div>`).join('')}
    </div>
  </section>
</main>
<nav class="barra-mob" aria-label="Atalhos do artigo">
  <button type="button" data-folha="indice"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>Índice</button>
  <button type="button" data-folha="presentes">${N} presentes</button>
  <button type="button" data-abre-fav>${CORACAO}Favoritos <span data-fav-n="presentes">0</span></button>
</nav>
<div class="folha" id="folha" role="dialog" aria-labelledby="folha-t" hidden>
  <div class="folha-topo"><b class="sub" id="folha-t">Neste artigo</b><button class="btn btn-sec btn-peq" type="button" id="folha-x">Fechar</button></div>
  <ol id="folha-indice">${listaIndice}</ol>
  <ol id="folha-presentes" hidden>${P.map((p, i) => `<li><a href="#p-${i + 1}"><span class="mini-f c-${p.cor}">${imgProd(i)}</span><span><b>${String(i + 1).padStart(2, '0')}</b> ${esc(nomes[i])}</span></a></li>`).join('')}</ol>
</div>
<div class="popup" id="popup" role="dialog" aria-labelledby="t-popup" hidden>
  <button class="fechar-pop" type="button" id="popup-x" aria-label="Fechar">&times;</button>
  <span class="ico" aria-hidden="true">${CORACAO}</span>
  <div>
    <p class="sub" id="t-popup">Guarde para ver depois.</p>
    <p>Salve este artigo e os presentes que você gostou. Quando chegar a data, está tudo em Favoritos.</p>
  </div>
  <div class="acoes-pop">
    <button class="btn btn-escuro" type="button" id="popup-salvar" data-fav-tipo="artigos" data-fav-id="${a0.id}" data-fav-nome="${esc(a0.t)}" data-fav-url="${D.arquivo}" data-fav-cor="${a0.cor}" aria-pressed="false">${CORACAO}<span>Salvar artigo</span></button>
    <a class="btn btn-sec" href="#selecao" id="popup-presentes">Escolher presentes</a>
    <button class="btn btn-sec" type="button" id="popup-nao" style="border-color:transparent">Agora não</button>
  </div>
  <p class="ok" id="popup-ok" hidden>Salvo! Está em Favoritos, no topo da página.</p>
</div>
${rodape}
<script>${JS_BASE}
(function(){
  var bar=document.getElementById('progresso'),art=document.querySelector('article'),cab=document.getElementById('cab');
  function prog(){var r=art.getBoundingClientRect();var t=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));bar.style.transform='scaleX('+t+')';var pf=document.getElementById('prog-fita');if(pf)pf.style.strokeDashoffset=1-t;document.body.classList.toggle('cab-oculto',cab.classList.contains('some'));}
  addEventListener('scroll',prog,{passive:true});prog();
  var bts=document.querySelectorAll('.filtro button'),prods=document.querySelectorAll('.produto'),cont=document.getElementById('contagem'),pausa=document.querySelector('.pausa');
  bts.forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.f,n=0;bts.forEach(function(x){x.setAttribute('aria-pressed',x===b);});prods.forEach(function(p){var ok=f==='todos'||p.dataset.faixa===f;p.hidden=!ok;if(ok)n++;});if(pausa)pausa.hidden=f!=='todos';cont.textContent='Mostrando '+n+' de ${N} presentes';});});
  var links=document.querySelectorAll('#indice a'),mapa={};links.forEach(function(a){mapa[a.getAttribute('href').slice(1)]=a;});
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(x){x.classList.remove('atual');});var a=mapa[e.target.id];if(a)a.classList.add('atual');}});},{rootMargin:'-30% 0px -60% 0px'});Object.keys(mapa).forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s);});}
  var pop=document.getElementById('popup'),mostrou=false;try{mostrou=sessionStorage.getItem('oqd-popup')==='1';}catch(e){}
  function fechaPop(){pop.hidden=true;}
  document.getElementById('popup-x').onclick=fechaPop;document.getElementById('popup-nao').onclick=fechaPop;document.getElementById('popup-presentes').addEventListener('click',fechaPop);
  document.getElementById('popup-salvar').addEventListener('click',function(){var ok=document.getElementById('popup-ok');setTimeout(function(){ok.hidden=false;setTimeout(fechaPop,1800);},50);});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!pop.hidden)fechaPop();});
  addEventListener('scroll',function(){if(mostrou)return;var r=art.getBoundingClientRect();var t=-r.top/(r.height-innerHeight);if(t>.5){mostrou=true;try{sessionStorage.setItem('oqd-popup','1');}catch(e){}if(document.querySelector('.fav-artigo').getAttribute('aria-pressed')==='true')return;pop.hidden=false;}},{passive:true});
  document.querySelectorAll('.faixa-prod').forEach(function(n){var ol=n.querySelector('ol'),a=n.querySelector('.fp-ant'),p=n.querySelector('.fp-prox');function at(){var fim=ol.scrollLeft+ol.clientWidth>=ol.scrollWidth-4;a.disabled=ol.scrollLeft<4;p.disabled=fim;n.classList.toggle('fim',fim);}a.onclick=function(){ol.scrollBy({left:-ol.clientWidth*.8,behavior:'smooth'});};p.onclick=function(){ol.scrollBy({left:ol.clientWidth*.8,behavior:'smooth'});};ol.addEventListener('scroll',at,{passive:true});at();});
  if(matchMedia('(max-width:900px)').matches)document.querySelectorAll('.pc-det').forEach(function(d){d.open=false;});
  var marcas=document.querySelectorAll('.marca-txt');
  if('IntersectionObserver' in window){var iom=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visto');iom.unobserve(e.target);}});},{rootMargin:'0px 0px -25% 0px'});marcas.forEach(function(m){iom.observe(m);});}else marcas.forEach(function(m){m.classList.add('visto');});
  var folha=document.getElementById('folha');
  document.querySelectorAll('[data-folha]').forEach(function(b){b.addEventListener('click',function(){var q=b.dataset.folha;document.getElementById('folha-indice').hidden=q!=='indice';document.getElementById('folha-presentes').hidden=q!=='presentes';document.getElementById('folha-t').textContent=q==='indice'?'Neste artigo':'Os ${N} presentes';folha.hidden=false;document.getElementById('folha-x').focus();});});
  document.getElementById('folha-x').onclick=function(){folha.hidden=true;};
  folha.addEventListener('click',function(e){if(e.target.closest('a'))folha.hidden=true;});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!folha.hidden)folha.hidden=true;});
  var mov=document.querySelector('.indice-movel');mov.addEventListener('click',function(e){if(e.target.closest('a'))mov.open=false;});
})();
</script>
</body>
</html>`;
  // marca-texto só dentro do conteúdo (nunca no título ou na descrição da página)
  const marca = (h, txt) => { const i = h.indexOf('<main'), k = h.indexOf(esc(txt), i); if (i < 0 || k < 0) { console.warn('marca-texto não achado:', txt.slice(0, 50)); return h; } return h.slice(0, k) + '<span class="marca-txt">' + esc(txt) + '</span><span class="cursor-tag" aria-hidden="true"><i></i><b>A.G.</b></span>' + h.slice(k + esc(txt).length); };
  for (const t of D.marcas || []) html = marca(html, t);
  // dados estruturados (schema.org): trilha, lista de presentes e perguntas frequentes. Sem autor e sem data, a pedido da A.G.
  const SITE = 'https://oquedar.com', urlPost = `${SITE}/${D.slug}/`, abs = s => /^https?:/.test(s) ? s : `${SITE}/${s.replace(/^\/+/, '')}`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: D.trilha[0], item: `${SITE}/category/${D.trilha[1].replace(/^categoria-|\.html$/g, '')}/` },
      { '@type': 'ListItem', position: 3, name: D.trilhaAtual, item: urlPost }] },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: D.h1, numberOfItems: N, itemListElement: P.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: nomes[i], url: `${urlPost}#p-${i + 1}`, ...(p.img ? { image: abs(p.img) } : {}) })) },
  ];
  if (faqPares.length) ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqPares.map(([q, r]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r.join(' ') } })) });
  // capa como imagem principal da página (Google Imagens/Discover) e como imagem de compartilhamento
  if (D.capa && D.capa.src) {
    const capaAbs = abs(D.capa.src), dims = D.capa.largura ? { width: D.capa.largura, height: D.capa.altura } : {};
    ld.push({ '@context': 'https://schema.org', '@type': 'WebPage', name: D.titleTag, url: urlPost, description: D.desc, primaryImageOfPage: { '@type': 'ImageObject', url: capaAbs, caption: D.capa.alt, ...dims } });
    html = html.replace(/<meta property="og:type" content="website">/, '<meta property="og:type" content="article">');
    // WhatsApp e Facebook não leem .avif: nesses posts o compartilhamento continua com a imagem padrão
    if (!/\.avif$/i.test(D.capa.src)) html = html.replace(/<meta property="og:image" content="[^"]*">\n<meta property="og:image:width" content="\d+">\n<meta property="og:image:height" content="\d+">/,
        `<meta property="og:image" content="${capaAbs}">\n` + (D.capa.largura ? `<meta property="og:image:width" content="${D.capa.largura}">\n<meta property="og:image:height" content="${D.capa.altura}">\n` : '') + `<meta property="og:image:alt" content="${esc(D.capa.alt)}">\n<meta name="twitter:image" content="${capaAbs}">`);
  }
  html = html.replace('</head>', ld.map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n') + '\n</head>');
  return html;
}

// lê um post salvo em posts/<slug>.txt (formato H1/H2/H3/P/LI) e separa as partes
// artigo em Markdown -> mesmo formato de linhas do texto migrado (H1/H2/H3/P/LI)
function mdParaLinhas(md) {
  const limpa = t => t.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, '$1$2').replace(/(^|\s)[*_]([^*_]+)[*_](?=\s|[.,!?;:]|$)/g, '$1$2').trim();
  md = md.replace(/<!--[\s\S]*?-->/g, ''); // comentários de instrução não entram no texto
  const out = []; let par = [];
  const fecha = () => { if (par.length) { const t = limpa(par.join(' ')); if (t) out.push('P: ' + t); par = []; } };
  let fm = false;
  for (const bruta of md.replace(/\r/g, '').split('\n')) {
    const l = bruta.trim();
    if (l === '---' && !out.length && !par.length) { fm = !fm; continue; } // ignora cabeçalho YAML, se houver
    if (fm) continue;
    if (!l) { fecha(); continue; }
    let m;
    if ((m = l.match(/^(#{1,3})\s+(.*)$/))) { fecha(); out.push(['H1', 'H2', 'H3'][m[1].length - 1] + ': ' + limpa(m[2])); continue; }
    if ((m = l.match(/^[-*+]\s+(.*)$/))) { fecha(); out.push('LI: ' + limpa(m[1])); continue; }
    if (/^!\[/.test(l)) { fecha(); continue; }
    par.push(l);
  }
  fecha(); return out.join('\n');
}

function lePost(arq) {
  const fs = require('fs');
  const bl = []; const meta = {};
  const bruto = fs.readFileSync(arq, 'utf8');
  for (const l of (arq.endsWith('.md') ? mdParaLinhas(bruto) : bruto).split('\n')) {
    const m = l.match(/^(H1|H2|H3|P|LI|IMG|CAPA|DATA): (.*)$/); if (!m) continue;
    if (m[1] === 'CAPA' || m[1] === 'DATA') { meta[m[1]] = m[2]; continue; }
    if (m[1] === 'IMG') continue;
    bl.push({ t: m[1], x: m[2] });
  }
  const h1 = (bl.find(b => b.t === 'H1') || {}).x;
  const secoes = []; let atual = null; const intro = [];
  for (const b of bl) {
    if (b.t === 'H1') continue;
    if (b.t === 'H2') { atual = { titulo: b.x, itens: [] }; secoes.push(atual); continue; }
    if (b.t === 'P' && /^Alt text:/i.test(b.x)) continue; // nota de edição esquecida no post original
    if (!atual) { if (b.t === 'P') intro.push(b.x); continue; }
    atual.itens.push(b);
  }
  return { h1, meta, intro, secoes, palavras: bl.map(b => b.x).join(' ').split(/\s+/).length };
}

module.exports = { montaArtigo, lePost, norm };
