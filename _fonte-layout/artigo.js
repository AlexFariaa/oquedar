// Modelo de artigo: layout-artigo.html (post real de basquete)
const B = require('./base.js');
const { fs, path, OUT, esc, blocos, intro, produtosTxt, nemTodo, comoEscolhemos, qualCombina, comoEscolher, faq, fechamento, lojas, P, reais, melhorIdx, nomes, faixa, cab, rodape, JS_BASE, head, comparador, CSS_COMP, artigos, FOTO_BASQ, imgProd, scriptImgs, CORACAO, favArtigo } = B;

const idDe = nome => 'p-' + (nomes.indexOf(nome) + 1);
const SETAS = '<div class="fp-setas"><button type="button" class="fp-ant" aria-label="Ver anteriores" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><button type="button" class="fp-prox" aria-label="Ver próximos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>';
const fpItem = i => `<li><a href="#p-${i + 1}"><span class="fp-img c-${P[i].cor}"><span class="fp-n">${String(i + 1).padStart(2, '0')}</span>${imgProd(i)}</span><span class="fp-t">${esc(nomes[i])}</span></a></li>`;
const pouco = [
  { i: 0, selo: 'Melhor no geral', cor: 'lavanda', porque: 'Útil de verdade para quem joga ou está começando.' },
  { i: 1, selo: 'Melhor custo', cor: 'rosa', porque: 'Entra na rotina e mostra que você conhece o time.' },
  { i: 2, selo: 'Mais criativo', cor: 'pessego', porque: 'Foge das roupas e deixa o quarto com a cara da pessoa.' },
];
const indice = [['intro', 'Introdução'], ['rapido', 'Se você tem pouco tempo'], ['selecao', 'Seleção O que dar?'], ['escolhemos', 'Como escolhemos'], ['comp', 'Comparativo rápido'], ['qual', 'Qual presente combina'], ['semerrar', 'Como escolher sem errar'], ['faq', 'Perguntas frequentes'], ['fecho', 'Fechamento']];

const favPresente = (i, comTexto) => { const p = P[i], n = i + 1; const attrs = `data-fav-tipo="presentes" data-fav-id="p-${n}" data-fav-nome="${esc(nomes[i])}" data-fav-url="layout-artigo.html#p-${n}" data-fav-cor="${p.cor}" aria-pressed="false"`;
  return comTexto ? `<button class="favoritar" type="button" ${attrs}>${CORACAO}<span class="fav-txt">Salvar nos favoritos</span></button>`
    : `<button class="fav-card" type="button" ${attrs} aria-label="Salvar ${esc(nomes[i])} nos favoritos">${CORACAO}</button>`; };

const cardProduto = (s, i) => {
  const p = P[i], m = melhorIdx(p), n = i + 1;
  return `
    <article class="produto" id="p-${n}" data-faixa="${faixa(p.precos[m])}"${n === 3 ? ' data-lembrete="Gostou de algum presente? Toque no coração para salvar e ver depois, quando chegar a data."' : ''}>
      <div class="prod-topo">
        <div class="prod-foto c-${p.cor}">${imgProd(i, `" data-fav-img="p-${n}`)}${favPresente(i, false)}</div>
        <div class="prod-info">
          <span class="num">${String(n).padStart(2, '0')} de 14</span>
          <h2 class="sub">${esc(s.titulo)}</h2>
          <div class="tags">${p.perfil.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <div class="avaliacao">
            <span class="nota"><span class="meta">Nota OQD</span><b>${p.nota}</b></span>
            <span class="exemplo">Nota, prós e contras de exemplo</span>
          </div>
          <details class="pc-det" open><summary>Prós e contras</summary><div class="pc">
            <div><span class="rotulo">Prós</span><ul class="mais">${p.pros.map(x => `<li>${x}</li>`).join('')}</ul></div>
            <div><span class="rotulo">Contras</span><ul class="menos">${p.contras.map(x => `<li>${x}</li>`).join('')}</ul></div>
          </div></details>
          ${comparador(p, i)}
          ${favPresente(i, true)}
        </div>
      </div>
      <div class="prod-texto leitura">
        ${s.itens.filter(b => b.t === 'P').map(b => `<p>${esc(b.x)}</p>`).join('\n        ')}
      </div>
    </article>`;
};

const CSS_ART = CSS_COMP + `
:root{--largura:1600px}
.progresso{position:fixed;left:0;top:0;height:4px;width:100%;background:var(--coral);transform-origin:0 50%;transform:scaleX(0);z-index:var(--z-progresso)}
.grade{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.art-abertura{padding-top:clamp(132px,15vw,176px);position:relative;overflow:clip}
.art-abertura .mancha{position:absolute;right:-18vw;top:-10%;width:min(55vw,780px);aspect-ratio:1;border-radius:50%;background:var(--degrade);filter:blur(56px);opacity:.6;pointer-events:none}
.trilha ol{display:flex;flex-wrap:wrap;gap:var(--e2);align-items:center}
.trilha li{display:flex;align-items:center;gap:var(--e2);font-size:var(--t-rotulo)}
.trilha li+li::before{content:"";width:6px;height:6px;border-right:1.5px solid var(--discreto);border-bottom:1.5px solid var(--discreto);transform:rotate(-45deg)}
.trilha a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;font-weight:var(--peso-forte)}
.trilha a:hover{text-decoration:underline}
.art-abertura h1{grid-column:1/span 10;margin-top:var(--e5);position:relative}
.autoria{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:var(--e3) var(--e5);margin-top:var(--e5);position:relative}
.autoria .quem{display:flex;align-items:center;gap:var(--e3);font-weight:var(--peso-forte)}
.avatar{width:44px;height:44px;border-radius:50%;flex:none;padding:0;justify-content:center;align-items:center}
.aviso{display:inline-flex;align-items:center;gap:var(--e2);min-height:44px;padding:var(--e2) var(--e4);border-radius:var(--pilula);background:rgba(255,255,255,.7);border:1px solid var(--fio);font-size:var(--t-rotulo);color:var(--apoio)}
.aviso svg{width:18px;height:18px;flex:none;color:var(--tinta)}
.fav-artigo[aria-pressed="true"] svg{fill:var(--coral);stroke:var(--coral)}
.capa-grade{grid-column:1/-1;margin-top:var(--e7);display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.capa-foto{grid-column:1/span 8;aspect-ratio:3/2;border-radius:var(--raio);overflow:hidden;background:#fff}
.capa-foto img{width:100%;height:100%;object-fit:cover}
.capa-lado{grid-column:9/span 4;border-radius:var(--raio);padding:var(--e6);display:flex;flex-direction:column;justify-content:space-between;gap:var(--e5)}
.fatos{display:grid}
.fatos li{display:flex;flex-direction:column;gap:var(--e1);padding:var(--e4) 0;border-top:1px solid rgba(28,26,31,.18)}
.fatos b{font-size:var(--t-sub);letter-spacing:-.02em;line-height:1.1}
.fatos span{font-size:var(--t-rotulo)}

/* corpo com coluna lateral */
.art-corpo{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);margin-top:var(--secao);align-items:start}
.art-main{grid-column:1/span 8;min-width:0}
.art-lado{grid-column:10/span 3;position:sticky;top:104px;max-height:calc(100dvh - 124px);overflow:auto;display:flex;flex-direction:column;gap:var(--e5);padding-bottom:var(--e4);z-index:1;scrollbar-width:none}
.art-lado::-webkit-scrollbar{display:none}
.lado-bloco{display:flex;flex-direction:column;gap:var(--e3)}
.lado-bloco + .lado-bloco{border-top:1px solid var(--fio);padding-top:var(--e5)}
.indice-fita{position:relative;padding-left:28px}
.indice-fita svg{position:absolute;left:0;top:0;width:24px;height:100%;overflow:visible}
.indice-fita .fundo-fita{stroke:var(--fio);stroke-width:3}
.indice-fita .prog-fita{stroke:var(--coral);stroke-width:5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1}
.indice ol{display:grid;gap:2px}
.indice a{display:flex;align-items:center;min-height:36px;padding:var(--e1) var(--e4);text-decoration:none;color:var(--apoio);line-height:1.3;transition:color .2s var(--curva),border-color .2s var(--curva)}
.indice a:hover{color:var(--tinta)}
.indice a.atual{color:var(--tinta);font-weight:var(--peso-forte)}
.favs-lado{background:var(--rosa);border-radius:var(--raio);padding:var(--e5) var(--e4) var(--e4)}
.favs-lado .fav-tit{display:flex;align-items:center;gap:var(--e2);color:var(--tinta)}
.favs-lado .fav-tit svg{width:18px;height:18px;color:var(--coral);fill:var(--coral)}
.favs-lado p{color:var(--tinta)}
.lado-bloco + .favs-lado{border-top:0;padding-top:var(--e4)}
.favs-lado p{line-height:1.4}
.favs-lado b{font-variant-numeric:tabular-nums}
.outros ul{display:grid;gap:var(--e3)}
.outros a{display:flex;gap:var(--e3);align-items:center;text-decoration:none}
.outros .mini-img{width:56px;height:56px;border-radius:var(--raio-interno);flex:none;overflow:hidden}
.outros .mini-img img{width:100%;height:100%;object-fit:cover}
.outros .txt-o{display:flex;flex-direction:column;gap:2px;min-width:0}
.outros .t{font-weight:var(--peso-forte);line-height:1.3;font-size:var(--t-rotulo)}
.outros a:hover .t{text-decoration:underline}
.indice-movel{display:none}

.leitura{max-width:46em}
.leitura p{line-height:1.7}
.bloco-cor{border-radius:var(--raio);padding:clamp(28px,4vw,56px)}
.bloco-cor .marcadores li a{border-color:transparent}
.bloco-escuro{background:var(--tinta);color:var(--fundo);border-radius:var(--raio);padding:clamp(28px,4vw,56px);--apoio:rgba(244,242,240,.72);--fio:rgba(244,242,240,.18);--fio-forte:rgba(244,242,240,.4)}
.bloco-escuro .faq summary .mais-ico{color:var(--fundo)}
.bloco-escuro .faq details[open] .mais-ico{color:var(--tinta)}

/* newsletter no fim do artigo */
.news-fim{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--e5);padding:clamp(56px,8vw,112px) var(--margem);border-radius:var(--raio);background:radial-gradient(60% 80% at 50% 0%,rgba(255,138,110,.22),transparent 70%),radial-gradient(50% 70% at 85% 100%,rgba(199,180,247,.35),transparent 70%),#fff}
.news-fim .pilha{display:flex}
.news-fim .pilha span{width:64px;height:64px;border-radius:50%;border:4px solid #fff;margin-left:-14px;overflow:hidden;box-shadow:0 8px 20px rgba(70,30,40,.10)}
.news-fim .pilha span:first-child{margin-left:0}
.news-fim .pilha .img-prod{padding:8px}
.news-fim h2{max-width:14ch}
.news-fim .abre{max-width:34em}
.news-fim form{width:min(520px,100%);display:flex;flex-direction:column;gap:var(--e3);align-items:stretch;text-align:left}
.news-fim .campo{display:flex;gap:var(--e2);background:#fff;border-radius:var(--pilula);padding:var(--e1);border:1.5px solid var(--fio-forte)}
.news-fim .campo:focus-within{border-color:var(--tinta)}
.news-fim .campo input{flex:1;min-width:0;border:0;background:transparent;font:inherit;padding:0 var(--e4);min-height:48px;color:var(--tinta)}
.news-fim .campo input:focus{outline:none}
.news-fim small{font-size:var(--t-rotulo);color:var(--apoio);text-align:center}

/* pop-up para guardar */
.popup{position:fixed;right:var(--e4);bottom:88px;z-index:calc(var(--z-menu) + 2);width:min(400px,calc(100% - 24px));display:grid;grid-template-columns:auto 1fr;gap:var(--e4) var(--e5);align-items:center;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid #fff;border-radius:var(--raio);padding:var(--e5);box-shadow:0 30px 80px rgba(70,30,40,.25);animation:popup .5s var(--curva)}
@keyframes popup{from{opacity:0;transform:translateX(32px)}}
.popup .ico{width:56px;height:56px;border-radius:var(--raio-interno);background:var(--degrade);display:grid;place-items:center}
.popup .ico svg{width:28px;height:28px;color:var(--tinta);fill:#fff}
.popup h2{margin-bottom:var(--e1)}
.popup p{color:var(--apoio);line-height:1.45}
.popup .acoes-pop{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:var(--e2);align-items:center}
.popup .fechar-pop{position:absolute;right:var(--e2);top:var(--e2);width:40px;height:40px;border:0;background:none;border-radius:50%;cursor:pointer;font-size:var(--t-sub);line-height:1;color:var(--apoio)}
.popup .fechar-pop:hover{background:var(--fundo)}
.popup .ok{grid-column:1/-1;font-weight:var(--peso-forte)}
@media (max-width:560px){.popup{grid-template-columns:1fr}.popup .ico{display:none}.popup .acoes-pop .btn{flex:1}}
.leitura p+p,.leitura p+ul,.leitura ul+p,.leitura h3+p{margin-top:var(--e4)}
.leitura h3{margin-top:var(--e7)}
.intro p:last-child{font-size:var(--t-sub);font-weight:var(--peso-forte);line-height:1.25;letter-spacing:-.02em;margin-top:var(--e6)}

.secao-art{margin-top:var(--secao)}
.cabeca-art{display:flex;flex-direction:column;gap:var(--e3);margin-bottom:var(--e6)}
.cabeca-art .abre{max-width:34em}

.rapido{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e4)}
.escolha{display:flex;flex-direction:column;gap:var(--e3);border-radius:var(--raio);overflow:hidden;padding:0 0 var(--e5);transition:transform .25s var(--curva),box-shadow .25s var(--curva)}
.escolha > :not(figure){margin-inline:var(--e4)}
.esc-img{aspect-ratio:1;margin-bottom:var(--e2)}
.escolha .tag{align-self:flex-start;background:#fff}
.escolha .linha-preco{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--e3);margin-top:auto;padding-top:var(--e3)}
.escolha .linha-preco b{font-size:var(--t-sub);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.escolha h3{font-size:var(--t-corpo);line-height:1.35}
@media (hover:hover){.escolha:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(70,30,40,.10)}}

.filtro{position:sticky;top:var(--e3);z-index:calc(var(--z-cab) - 1);display:flex;flex-wrap:wrap;align-items:center;gap:var(--e2);padding:var(--e2);margin-bottom:var(--e5);border-radius:var(--pilula);background:rgba(255,255,255,.75);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid #fff;box-shadow:0 10px 30px rgba(70,30,40,.06);transition:top .35s var(--curva)}
body:not(.cab-oculto) .filtro{top:88px}
.filtro .rotulo{padding:0 var(--e3)}
.filtro button{font:inherit;min-height:44px;padding:0 var(--e4);border-radius:var(--pilula);border:1.5px solid var(--fio-forte);background:transparent;color:var(--tinta);cursor:pointer;transition:background-color .2s var(--curva),color .2s var(--curva),border-color .2s var(--curva)}
.filtro button[aria-pressed="true"]{background:var(--tinta);border-color:var(--tinta);color:var(--fundo);font-weight:var(--peso-forte)}
.filtro button:active{transform:scale(.97)}
@media (hover:hover){.filtro button:not([aria-pressed="true"]):hover{border-color:var(--tinta)}}
.contagem{font-size:var(--t-rotulo);color:var(--apoio);margin-bottom:var(--e3)}

.produto{padding:var(--e7) 0;border-top:1px solid var(--fio)}
.produto[hidden]{display:none}
.prod-topo{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:start}
.prod-foto{position:sticky;top:160px;grid-column:1/span 5;aspect-ratio:1;border-radius:var(--raio);overflow:hidden}
.prod-foto .img-prod{position:absolute;inset:0;transition:transform .6s var(--curva)}
@media (hover:hover){.prod-foto:hover .img-prod{transform:scale(1.05)}}
.prod-info{grid-column:6/span 7;display:flex;flex-direction:column;gap:var(--e4);min-width:0}
.num{font-size:var(--t-rotulo);font-weight:var(--peso-forte);color:var(--apoio);font-variant-numeric:tabular-nums}
.avaliacao{display:flex;flex-wrap:wrap;gap:var(--e3);align-items:center}
.nota{display:inline-flex;align-items:baseline;gap:var(--e2);background:#fff;border-radius:var(--pilula);padding:var(--e2) var(--e4);border:1px solid var(--fio)}
.nota b{font-size:var(--t-sub);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.pc{display:grid;grid-template-columns:1fr 1fr;gap:var(--e5);padding:var(--e4) 0;border-top:1px solid var(--fio);border-bottom:1px solid var(--fio)}
.pc ul{display:grid;gap:var(--e2);margin-top:var(--e2)}
.pc li{display:flex;gap:var(--e2);line-height:1.4}
.mais li::before{content:"+";font-weight:var(--peso-forte);color:var(--tinta);width:12px;flex:none}
.menos li::before{content:"–";font-weight:var(--peso-forte);color:var(--apoio);width:12px;flex:none}
.favoritar{align-self:flex-start;display:inline-flex;align-items:center;gap:var(--e2);min-height:44px;padding:0 var(--e3);border:0;background:none;font:inherit;color:var(--apoio);cursor:pointer;border-radius:var(--pilula)}
.favoritar svg{width:20px;height:20px;transition:transform .2s var(--curva)}
.favoritar[aria-pressed="true"]{color:var(--tinta);font-weight:var(--peso-forte)}
.favoritar[aria-pressed="true"] svg{fill:var(--coral);stroke:var(--coral);transform:scale(1.12)}
@media (hover:hover){.favoritar:hover{color:var(--tinta)}}
.prod-texto{margin-left:calc((100% + var(--e5)) * 5 / 12);margin-top:var(--e6)}

/* faixa que atravessa a página inteira */
.pausa{--sangria:calc((100vw - min(100vw, var(--largura))) / 2 + var(--margem));position:relative;width:calc(100% + var(--sangria));margin:var(--e7) 0 var(--e7) calc(-1 * var(--sangria));background:var(--rosa);border-radius:0 var(--raio) var(--raio) 0;padding:clamp(48px,6vw,96px) clamp(24px,4vw,64px) clamp(48px,6vw,96px) calc(var(--sangria) + clamp(0px,2vw,24px))}
.pausa-grade{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.pausa h2{grid-column:1/span 5}
.pausa .falas{grid-column:6/span 7;display:grid;gap:var(--e3)}
.pausa .falas p{font-size:var(--t-abertura);font-weight:var(--peso-forte);letter-spacing:-.02em;line-height:1.2}
.pausa .resto{grid-column:6/span 7;margin-top:var(--e3)}
.pausa .resto p+p{margin-top:var(--e3)}

.texto-art h2{margin-bottom:var(--e5)}
.marcadores{display:flex;flex-wrap:wrap;gap:var(--e2);margin-top:var(--e4)}
.marcadores li a{display:inline-flex;align-items:center;min-height:44px;padding:0 var(--e4);border-radius:var(--pilula);background:#fff;border:1px solid var(--fio);text-decoration:none;transition:border-color .2s var(--curva)}
.marcadores li a:hover{border-color:var(--tinta)}

.tabela-caixa{position:relative;overflow-x:auto;border-radius:var(--raio);background:#fff;border:1px solid var(--fio)}
table{width:100%;border-collapse:collapse;min-width:520px}
.num-c{font-size:var(--t-rotulo);font-weight:var(--peso-forte);color:var(--apoio);font-variant-numeric:tabular-nums;width:24px;flex:none}
caption{text-align:left;padding:var(--e4) var(--e5);font-size:var(--t-rotulo);color:var(--apoio);caption-side:bottom;border-top:1px solid var(--fio)}
th,td{text-align:left;padding:var(--e3) var(--e4);border-top:1px solid var(--fio);vertical-align:middle}
thead th{border-top:0;font-size:var(--t-rotulo);text-transform:uppercase;letter-spacing:.08em;color:var(--apoio);font-weight:var(--peso-forte);padding-top:var(--e4);padding-bottom:var(--e4)}
td.n{font-variant-numeric:tabular-nums;font-weight:var(--peso-forte);white-space:nowrap}
.cel-prod{display:flex;align-items:center;gap:var(--e3)}
.mini-prod{width:48px;height:48px;border-radius:var(--raio-interno);flex:none;overflow:hidden}
.mini-prod .img-prod{padding:4px}
td a.nome,th a.nome{font-weight:var(--peso-forte);text-decoration:none;line-height:1.3}
a.nome:hover{text-decoration:underline}

.faq{border-bottom:1px solid var(--fio)}
.faq details{border-top:1px solid var(--fio)}
.faq summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:var(--e4);min-height:64px;padding:var(--e4) 0;cursor:pointer;font-weight:var(--peso-forte);font-size:var(--t-abertura);line-height:1.35}
.faq summary::-webkit-details-marker{display:none}
.faq summary .mais-ico{flex:none;width:44px;height:44px;border-radius:50%;border:1.5px solid var(--fio-forte);position:relative;transition:transform .3s var(--curva),background-color .2s var(--curva)}
.faq summary .mais-ico::before,.faq summary .mais-ico::after{content:"";position:absolute;left:50%;top:50%;width:14px;height:2px;background:currentColor;transform:translate(-50%,-50%)}
.faq summary .mais-ico::after{transform:translate(-50%,-50%) rotate(90deg)}
.faq details[open] .mais-ico{transform:rotate(45deg);background:var(--coral);border-color:var(--coral)}
.faq .resp{padding:0 var(--e8) var(--e5) 0;max-width:40em;color:var(--apoio)}
.faq details[open] .resp{animation:abre .4s var(--curva)}
@keyframes abre{from{opacity:0;transform:translateY(-6px)}}

.fecho blockquote{margin-top:var(--e7);font-size:var(--t-titulo);font-weight:var(--peso-forte);letter-spacing:-.035em;line-height:1.05;text-wrap:balance}

.autora{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);background:var(--rosa);border-radius:var(--raio);padding:clamp(28px,4vw,48px)}
.autora .quem{grid-column:1/span 4;display:flex;flex-direction:column;gap:var(--e3);align-items:flex-start}
.autora .avatar{width:88px;height:88px;background:rgba(255,255,255,.5)}
.autora .transp{grid-column:6/span 7;display:flex;flex-direction:column;gap:var(--e3)}
.autora .exemplo{align-self:flex-start}

.mais-artigos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e5)}
.mini-item{position:relative}
.mini{display:flex;flex-direction:column;gap:var(--e3);height:100%;border-radius:var(--raio);overflow:hidden;padding:0 0 var(--e5);text-decoration:none;transition:transform .25s var(--curva),box-shadow .25s var(--curva)}
.mini > span{padding-inline:var(--e5)}
.mini .reserva{aspect-ratio:3/2;border-radius:0;background:rgba(255,255,255,.35);margin-bottom:var(--e2)}
.mini-capa{aspect-ratio:3/2;overflow:hidden;margin-bottom:var(--e2)}
.mini-capa img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--curva)}
@media (hover:hover){.mini:hover .mini-capa img{transform:scale(1.04)}}
.mini .t{font-weight:var(--peso-forte);line-height:1.3;text-wrap:balance}
@media (hover:hover){.mini:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(70,30,40,.10)}}

@media (max-width:1100px){
  .art-main{grid-column:1/-1}
  .art-lado{display:none}
  .indice-movel{display:block;margin-bottom:var(--e7);background:var(--lavanda);border-radius:var(--raio);border:0}
  .indice-movel a:hover{background:rgba(255,255,255,.5)}
  .capa-lado{display:none}
  .indice-movel summary{list-style:none;display:flex;justify-content:space-between;align-items:center;min-height:56px;padding:0 var(--e5);cursor:pointer;font-weight:var(--peso-forte)}
  .indice-movel summary::-webkit-details-marker{display:none}
  .indice-movel summary::after{content:"";width:8px;height:8px;border-right:2px solid var(--coral);border-bottom:2px solid var(--coral);transform:rotate(45deg);transition:transform .25s var(--curva)}
  .indice-movel[open] summary::after{transform:rotate(-135deg)}
  .indice-movel ol{padding:0 var(--e3) var(--e3)}
  .indice-movel a{display:flex;align-items:center;min-height:44px;padding:0 var(--e3);border-radius:var(--raio-interno);text-decoration:none}
  .indice-movel a:hover{background:var(--fundo)}
}
@media (max-width:900px){
  .art-abertura h1{grid-column:1/-1}
  .capa-foto,.capa-lado{grid-column:1/-1}
  .rapido,.mais-artigos{grid-template-columns:1fr}
  .esc-img{aspect-ratio:4/3}
  .prod-foto,.prod-info{grid-column:1/-1}
  .prod-foto{position:relative;top:auto;aspect-ratio:4/3}
  .prod-texto{margin-left:0}
  .pausa h2,.pausa .falas,.pausa .resto{grid-column:1/-1}
  .autora .quem,.autora .transp{grid-column:1/-1}
}

.em-moldura .aviso-layout{display:none}
/* faixa com os 14 presentes */
.faixa-prod{position:relative;margin-bottom:var(--e5)}
.faixa-prod ol{display:flex;gap:var(--e3);overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:var(--e1) 0 var(--e2);scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 85%,transparent);mask-image:linear-gradient(90deg,#000 85%,transparent)}
.faixa-prod ol::-webkit-scrollbar{display:none}
.faixa-prod.fim ol{-webkit-mask-image:none;mask-image:none}
.faixa-prod li{flex:none;width:156px;scroll-snap-align:start}
.fp-setas{display:flex;justify-content:flex-end;gap:var(--e2);margin-bottom:var(--e3)}
.fp-setas button{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:0;background:var(--tinta);color:var(--fundo);cursor:pointer;transition:opacity .2s var(--curva),transform .16s var(--curva)}
.fp-setas button:active{transform:scale(.94)}
.fp-setas button:disabled{opacity:.25;cursor:default}
.fp-setas svg{width:18px;height:18px}
.faixa-qual{margin-top:var(--e4)}
.faixa-qual .fp-img{background:#fff}
.faixa-qual .fp-setas{margin-top:calc(var(--e4) * -1)}
@media (max-width:900px){.faixa-prod li{width:44vw;max-width:180px}}
.faixa-prod a{display:flex;flex-direction:column;gap:var(--e2);text-decoration:none}
.fp-img{position:relative;aspect-ratio:1;border-radius:var(--raio-interno);overflow:hidden;transition:transform .25s var(--curva)}
.fp-img .img-prod{position:absolute;inset:0;padding:8%}
.fp-n{position:absolute;left:6px;top:6px;z-index:1;font-size:var(--t-rotulo);font-weight:var(--peso-forte);background:#fff;border-radius:var(--pilula);padding:0 var(--e2);font-variant-numeric:tabular-nums}
.fp-t{font-size:var(--t-rotulo);font-weight:var(--peso-forte);line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
@media (hover:hover){.faixa-prod a:hover .fp-img{transform:translateY(-3px)}}

/* prós e contras que abrem e fecham */
.pc-det summary{list-style:none;display:none;align-items:center;justify-content:space-between;min-height:48px;cursor:pointer;font-weight:var(--peso-forte);border-top:1px solid var(--fio);border-bottom:1px solid var(--fio)}
.pc-det summary::-webkit-details-marker{display:none}
.pc-det summary::after{content:"";width:8px;height:8px;border-right:2px solid var(--coral);border-bottom:2px solid var(--coral);transform:rotate(45deg);transition:transform .25s var(--curva)}
.pc-det[open] summary::after{transform:rotate(-135deg)}

/* marca-texto da curadora */
.marca-txt{background:linear-gradient(var(--lavanda),var(--lavanda)) no-repeat 0 88%/0% 92%;border-radius:4px;padding:0 3px;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-size 1.3s var(--curva)}
.marca-txt.visto,.no-js .marca-txt{background-size:100% 92%}
.cursor-tag{display:inline-flex;align-items:center;gap:4px;vertical-align:middle;margin-left:4px;opacity:0;transform:translateY(4px);transition:opacity .4s var(--curva) 1.1s,transform .4s var(--curva) 1.1s;white-space:nowrap}
.cursor-tag i{display:inline-block;width:2px;height:1.2em;background:var(--coral);border-radius:2px}
.cursor-tag b{font-size:var(--t-rotulo);font-weight:var(--peso-forte);line-height:1;background:var(--coral);color:var(--tinta);border-radius:var(--pilula);padding:4px 8px;letter-spacing:0}
.marca-txt.visto + .cursor-tag{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.marca-txt{transition:none}.cursor-tag{transition:none}}

/* barra fixa e gaveta do celular (modelo "barra") */
.barra-mob,.folha{display:none}
@media (max-width:900px){
  .m-barra .barra-mob{display:flex;position:fixed;left:var(--e3);right:var(--e3);bottom:var(--e3);z-index:var(--z-menu);gap:var(--e1);padding:var(--e1);border-radius:var(--pilula);background:rgba(28,26,31,.92);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);box-shadow:0 16px 40px rgba(28,26,31,.3)}
  .m-barra .barra-mob button{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:48px;border:0;border-radius:var(--pilula);background:transparent;color:var(--fundo);font:inherit;font-weight:var(--peso-forte);font-size:var(--t-rotulo);cursor:pointer}
  .m-barra .barra-mob button:first-child{background:rgba(255,255,255,.12)}
  .m-barra .barra-mob svg{width:16px;height:16px}
  .m-barra .assist-bt{bottom:84px}
  .m-barra .aviso-layout{display:none}
  .m-barra .folha:not([hidden]){display:flex;flex-direction:column;position:fixed;left:0;right:0;bottom:0;z-index:calc(var(--z-menu) + 3);max-height:72dvh;background:#fff;border-radius:var(--raio) var(--raio) 0 0;box-shadow:0 -20px 60px rgba(28,26,31,.25);padding:var(--e3) var(--e4) var(--e5);animation:sobe-folha .35s var(--curva)}
  .folha-topo{display:flex;justify-content:space-between;align-items:center;padding:var(--e2) 0 var(--e3)}
  .folha-topo::before{content:"";position:absolute;left:50%;top:8px;width:40px;height:4px;border-radius:4px;background:var(--fio-forte);transform:translateX(-50%)}
  .folha ol{overflow:auto;display:grid;gap:2px}
  .folha ol a{display:flex;align-items:center;gap:var(--e3);min-height:48px;padding:var(--e1) var(--e2);border-radius:var(--raio-interno);text-decoration:none}
  .folha ol a:hover{background:var(--fundo)}
  .folha .mini-f{position:relative;width:44px;height:44px;border-radius:10px;overflow:hidden;flex:none}
  .folha .mini-f .img-prod{position:absolute;inset:0;padding:3px}
}
@keyframes sobe-folha{from{transform:translateY(40px);opacity:0}}

/* cartão compacto (modelo "compacto") */
@media (max-width:900px){
  .m-compacto .produto{padding:var(--e6) 0}
  .m-compacto .prod-topo{grid-template-columns:96px minmax(0,1fr);gap:var(--e3) var(--e4);align-items:start}
  .m-compacto .prod-info{display:contents}
  .m-compacto .prod-foto{grid-column:1;grid-row:1/span 3;aspect-ratio:1;width:96px;position:relative;top:auto}
  .m-compacto .prod-foto .fav-card{width:36px;height:36px;top:4px;right:4px}
  .m-compacto .prod-info > .num,.m-compacto .prod-info > h2,.m-compacto .prod-info > .tags{grid-column:2}
  .m-compacto .prod-info > h2{font-size:var(--t-abertura)}
  .m-compacto .prod-info > .avaliacao,.m-compacto .prod-info > .pc-det,.m-compacto .prod-info > .comparador,.m-compacto .prod-info > .favoritar{grid-column:1/-1}
  .m-compacto .oferta:not(.melhor){display:none}
  .m-compacto .comparador.aberto .oferta{display:grid}
  .m-compacto .prod-texto p:nth-child(n+2){display:none}
  .m-compacto .prod-texto.aberto p{display:block}
  .m-compacto .prod-texto{margin-top:var(--e4)}
  .mais-lojas,.ler-mais{font:inherit;font-weight:var(--peso-forte);min-height:44px;border:0;background:none;color:var(--tinta);text-decoration:underline;text-underline-offset:4px;cursor:pointer;padding:0 var(--e2)}
}

/* comparativo em lista (modelo "lista") */
@media (max-width:900px){
  .m-lista .tabela-caixa{overflow:visible;border:0;background:none}
  .m-lista table{min-width:0}
  .m-lista thead{display:none}
  .m-lista tbody{display:grid;gap:var(--e2)}
  .m-lista tbody tr{display:grid;grid-template-columns:auto 1fr auto;gap:var(--e2) var(--e3);align-items:center;background:#fff;border-radius:var(--raio-interno);padding:var(--e3)}
  .m-lista th,.m-lista td{border:0;padding:0}
  .m-lista tbody th{grid-column:1/-1}
  .m-lista td.n:nth-of-type(1)::before{content:"Nota ";font-weight:var(--peso-normal);color:var(--apoio)}
  .m-lista td.n:nth-of-type(2){text-align:right}
  .m-lista td:last-child{grid-column:3;grid-row:2}
  .m-lista td:last-child .btn{min-height:40px}
  .m-lista caption{border:0;padding:var(--e3) 0 0}
}

@media (max-width:900px){.pc-det summary{display:flex}.pc-det[open] .pc{padding-top:var(--e4)}.pc-det .pc{border-top:0}}
@media (max-width:560px){
  .pc{grid-template-columns:1fr}
  .filtro{border-radius:var(--raio);top:var(--e2)}
  body:not(.cab-oculto) .filtro{top:80px}
  .faq summary{font-size:var(--t-corpo);min-height:56px}
  .faq .resp{padding-right:0}
  .fecho blockquote{font-size:var(--t-sub)}
  .aviso{border-radius:var(--raio-interno)}
}
`;

const total14 = produtosTxt.map((s, i) => cardProduto(s, i));
const nemTodoFalas = nemTodo.itens.filter(b => b.t === 'P');
const pausa = `
      <aside class="pausa" aria-labelledby="t-nemtodo">
        <div class="pausa-grade">
          <h2 class="sub" id="t-nemtodo">${esc(nemTodo.titulo)}</h2>
          <div class="falas">${nemTodoFalas.slice(1, 5).map(b => `<p>${esc(b.x)}</p>`).join('')}</div>
          <div class="resto">${[nemTodoFalas[0], ...nemTodoFalas.slice(5)].map(b => `<p>${esc(b.x)}</p>`).join('')}</div>
        </div>
      </aside>`;

const qualHtml = (() => {
  let h = '', lista = [];
  const fecha = () => { if (lista.length) { h += `<nav class="faixa-prod faixa-qual" aria-label="Presentes deste perfil">${SETAS}<ol>${lista.join('')}</ol></nav>\n`; lista = []; } };
  for (const b of qualCombina.itens) {
    if (b.t === 'LI') { lista.push(fpItem(nomes.indexOf(b.x))); continue; }
    fecha();
    if (b.t === 'H3') h += `<h3 class="sub">${esc(b.x)}</h3>\n`;
    else if (/homens de 30 anos/.test(b.x)) h += `<p>${esc(b.x).replace('presentes para homens de 30 anos', '<a class="link" href="https://oquedar.com/presentes-para-homens-30-anos/">presentes para homens de 30 anos</a>')}</p>\n`;
    else h += `<p>${esc(b.x)}</p>\n`;
  }
  fecha(); return h;
})();
const faqPares = []; for (let k = 0; k < faq.itens.length; k++) if (faq.itens[k].t === 'H3') faqPares.push([faq.itens[k].x, faq.itens[k + 1].x]);
const fechoP = fechamento.itens.filter(b => b.t === 'P').map(b => b.x);
const citacao = fechoP.find(x => /muito a minha cara/.test(x));
const listaIndice = indice.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('');
const a0 = artigos[0];

const artigo = head('Presente para Quem Gosta de Basquete: 14 Ideias Criativas · O que dar?', 'Confira 14 ideias de presente para quem gosta de basquete, com opções criativas para fãs da NBA e apaixonados pelo esporte.', CSS_ART) + `
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
          <ol><li><a href="layout-alta-fidelidade.html">Início</a></li><li><a href="layout-categoria.html">Interesse</a></li><li><span aria-current="page">Basquete</span></li></ol>
        </nav>
        <h1 class="gigante">${esc(blocos.find(b => b.t === 'H1').x)}</h1>
        <div class="autoria">
          <span class="quem"><figure class="avatar foto-av"><img src="imagens/autora.jpg" alt="Foto de A.G."></figure>Por A.G.</span>
          <span class="meta">14 de agosto de 2026 · 14 min de leitura</span>
          <button class="btn btn-sec btn-peq fav-artigo" type="button" data-fav-tipo="artigos" data-fav-id="art-0" data-fav-nome="${a0.t}" data-fav-url="layout-artigo.html" data-fav-cor="lavanda" aria-pressed="false">${CORACAO}<span class="fav-txt">Salvar artigo</span></button>
          <span class="aviso"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>Este artigo tem links de afiliados. Se você comprar por eles, podemos receber uma comissão, sem custo a mais para você.</span>
        </div>
        <div class="capa-grade">
          <figure class="capa-foto"><img src="${FOTO_BASQ}" alt="Rapaz sorrindo enquanto gira uma bola de basquete na ponta do dedo" width="600" height="400"></figure>
          <div class="capa-lado c-lavanda">
            <span class="rotulo" style="color:var(--tinta)">Neste artigo</span>
            <ul class="fatos">
              <li><b>14 ideias</b><span>da bola ao Funko</span></li>
              <li><b>5 perfis de fã</b><span>quem joga, quem coleciona, quem decora</span></li>
              <li><b>3 lojas comparadas</b><span>Amazon, Mercado Livre e Shopee</span></li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <div class="wrap art-corpo">
      <div class="art-main">
        <details class="indice-movel"><summary>Neste artigo</summary><ol>${listaIndice}</ol></details>

        <section id="intro" class="intro leitura" aria-label="Introdução">
          ${intro.map(x => `<p>${esc(x)}</p>`).join('\n          ')}
        </section>

        <section class="secao-art" id="rapido" aria-labelledby="t-rapido">
          <div class="cabeca-art">
            <h2 class="titulo" id="t-rapido">Se você tem pouco tempo.</h2>
            <p class="abre">Três escolhas para decidir agora. A lista completa vem logo abaixo.</p>
          </div>
          <div class="rapido">${pouco.map((e, k) => { const p = P[e.i]; const m = melhorIdx(p); return `
            <div class="escolha c-${e.cor} entra" data-atraso="${k * 70}">
              <figure class="esc-img">${imgProd(e.i)}</figure>
              <span class="tag">${e.selo}</span>
              <h3><a href="#p-${e.i + 1}" style="text-decoration:none">${esc(nomes[e.i])}</a></h3>
              <p>${e.porque}</p>
              <div class="linha-preco"><span><span class="meta">a partir de</span><br><b>${reais(p.precos[m])}</b></span><a class="btn btn-oferta" href="#" aria-label="Ver oferta de ${esc(nomes[e.i])} na ${lojas[m]}">Ver oferta</a></div>
              <span class="meta">Melhor preço na ${lojas[m]} · valor de exemplo</span>
            </div>`; }).join('')}
          </div>
        </section>

        <section class="secao-art" id="selecao" aria-labelledby="t-selecao">
          <div class="cabeca-art">
            <h2 class="titulo" id="t-selecao">Seleção O que dar?</h2>
            <p class="abre">14 presentes, cada um com nota, prós e contras e o preço nas três lojas. Toque no coração para guardar os que você gostou.</p>
          </div>
          <nav class="faixa-prod" aria-label="Os 14 presentes desta lista">${SETAS}<ol>${P.map((p, i) => fpItem(i)).join('')}</ol></nav>
          <div class="filtro" role="group" aria-label="Filtrar por faixa de preço">
            <span class="rotulo">Preço</span>
            <button type="button" data-f="todos" aria-pressed="true">Todos</button>
            <button type="button" data-f="ate100" aria-pressed="false">Até R$ 100</button>
            <button type="button" data-f="100a300" aria-pressed="false">R$ 100 a 300</button>
            <button type="button" data-f="acima300" aria-pressed="false">Acima de R$ 300</button>
          </div>
          <p class="contagem" id="contagem" aria-live="polite">Mostrando 14 de 14 presentes · preços de exemplo</p>
          <div id="produtos">${total14.slice(0, 10).join('')}
${pausa}${total14.slice(10).join('')}
          </div>
        </section>

        <section class="secao-art texto-art" id="escolhemos" aria-labelledby="t-escolhemos">
          <h2 class="sub" id="t-escolhemos">${esc(comoEscolhemos.titulo)}</h2>
          <div class="leitura">
            ${comoEscolhemos.itens.filter(b => b.t === 'P').map(b => `<p>${esc(b.x)}</p>`).join('\n            ')}
          </div>
        </section>

        <section class="secao-art" id="comp" aria-labelledby="t-comp">
          <div class="cabeca-art">
            <h2 class="titulo" id="t-comp">Comparativo rápido.</h2>
            <p class="abre">Os 14 presentes lado a lado, com o menor preço encontrado.</p>
          </div>
          <div class="tabela-caixa">
            <table>
              <caption>Notas e preços de exemplo, fictícios até a integração com o sistema de ofertas.</caption>
              <thead><tr><th scope="col">Presente</th><th scope="col">Nota</th><th scope="col">A partir de</th><th scope="col"><span class="sr">Ação</span></th></tr></thead>
              <tbody>${P.map((p, i) => { const m = melhorIdx(p); return `
                <tr><th scope="row"><span class="cel-prod"><span class="num-c">${String(i + 1).padStart(2, '0')}</span><span class="mini-prod c-${p.cor}">${imgProd(i)}</span><a class="nome" href="#p-${i + 1}">${esc(nomes[i])}</a></span></th><td class="n">${p.nota}</td><td class="n">${reais(p.precos[m])}</td><td><a class="btn btn-sec btn-peq" href="#" aria-label="Ver oferta de ${esc(nomes[i])} na ${lojas[m]}">Ver oferta</a></td></tr>`; }).join('')}
              </tbody>
            </table>
          </div>
        </section>

        <section class="secao-art texto-art bloco-cor c-lavanda" id="qual" aria-labelledby="t-qual">
          <h2 class="sub" id="t-qual">${esc(qualCombina.titulo)}</h2>
          <div class="leitura">
            ${qualHtml}
          </div>
        </section>

        <section class="secao-art texto-art" id="semerrar" aria-labelledby="t-semerrar">
          <h2 class="sub" id="t-semerrar">${esc(comoEscolher.titulo)}</h2>
          <div class="leitura">
            ${comoEscolher.itens.filter(b => b.t === 'P').map(b => `<p>${esc(b.x)}</p>`).join('\n            ')}
          </div>
        </section>

        <section class="secao-art texto-art bloco-escuro" id="faq" aria-labelledby="t-faq">
          <h2 class="sub" id="t-faq">Perguntas Frequentes</h2>
          <div class="faq">${faqPares.map(q => `
            <details><summary>${esc(q[0])}<span class="mais-ico" aria-hidden="true"></span></summary><p class="resp">${esc(q[1])}</p></details>`).join('')}
          </div>
        </section>

        <section class="secao-art texto-art fecho" id="fecho" aria-labelledby="t-fecho">
          <h2 class="sub" id="t-fecho">${esc(fechamento.titulo)}</h2>
          <div class="leitura">
            ${fechoP.filter(x => x !== citacao).slice(0, 4).map(x => `<p>${esc(x)}</p>`).join('\n            ')}
            <blockquote>${esc(citacao.replace(/.*pensar: /, ''))}</blockquote>
            ${fechoP.filter(x => x !== citacao).slice(4).map(x => `<p style="margin-top:var(--e6)">${esc(x)}</p>`).join('')}
          </div>
        </section>

        <section class="secao-art" aria-labelledby="t-autora">
          <div class="autora entra">
            <div class="quem">
              <figure class="avatar foto-av"><img src="imagens/autora.jpg" alt="Retrato de A.G., autora do artigo" loading="lazy"></figure>
              <span class="rotulo">Escrito por</span>
              <h2 class="sub" id="t-autora">A.G.</h2>
              <span class="meta">Curadoria O que dar? · Interesse</span>
            </div>
            <div class="transp">
              <span class="rotulo">Transparência</span>
              <p>Somos um site associado da Amazon e, portanto, recebemos comissões por compras qualificadas. Como se trata de um acordo de intermediação entre nosso site e a Amazon, os valores elegíveis de comissionamento não são repassados para os usuários.</p>
              <span class="exemplo">Texto a atualizar quando Mercado Livre e Shopee estiverem ativos</span>
              <a class="link" href="https://oquedar.com/declaracao-de-afiliados/">Ler a declaração de afiliados</a>
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
          <ul>${artigos.slice(1).map(a => `
            <li><a href="${a.u}"><span class="mini-img c-${a.cor}">${a.foto ? `<img src="${a.foto}" alt="${a.alt || ''}" loading="lazy">` : ''}</span><span class="txt-o"><span class="t">${a.t}</span><span class="meta">${a.cat}</span></span></a></li>`).join('')}
          </ul>
        </div>
      </aside>
    </div>
  </article>

  <section class="secao-art wrap" aria-labelledby="t-news-fim">
    <div class="news-fim entra">
      <div class="pilha" aria-hidden="true">${[0, 4, 1, 8, 13].map(i => `<span class="c-${P[i].cor}">${imgProd(i)}</span>`).join('')}</div>
      <span class="tag">Newsletter O que dar?</span>
      <h2 class="titulo" id="t-news-fim">Ideias de presentes sempre.</h2>
      <p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p>
      <form action="#" onsubmit="return false" aria-label="Assinar a newsletter">
        <label class="sr" for="email-fim">Seu e-mail</label>
        <div class="campo"><input id="email-fim" type="email" placeholder="seu@email.com" autocomplete="email"><button class="btn btn-oferta" type="submit">Assinar</button></div>
        <small>O envio ainda não está conectado.</small>
      </form>
    </div>
  </section>

  <section class="secao-art wrap" aria-labelledby="t-mais">
    <div class="cabeca-art"><h2 class="titulo" id="t-mais">Continue explorando.</h2></div>
    <div class="mais-artigos">${artigos.slice(1, 4).map((a, k) => `
      <div class="mini-item entra" data-atraso="${k * 60}">
        <a class="mini c-${a.cor}" href="${a.u}">
          ${a.foto ? `<figure class="mini-capa"><img src="${a.foto}" alt="${a.alt}" width="600" height="400"></figure>` : `<figure class="reserva"><figcaption><b>Imagem de capa</b>${a.img} · 3:2</figcaption></figure>`}
          <span class="rotulo">${a.cat}</span>
          <span class="t">${a.t}</span>
          <span class="meta">${a.d}</span>
        </a>
        ${favArtigo(a, 'art-' + (k + 1))}
      </div>`).join('')}
    </div>
  </section>
</main>
<nav class="barra-mob" aria-label="Atalhos do artigo">
  <button type="button" data-folha="indice"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>Índice</button>
  <button type="button" data-folha="presentes">14 presentes</button>
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
    <h2 class="sub" id="t-popup">Guarde para ver depois.</h2>
    <p>Salve este artigo e os presentes que você gostou. Quando chegar a data, está tudo em Favoritos.</p>
  </div>
  <div class="acoes-pop">
    <button class="btn btn-escuro" type="button" id="popup-salvar" data-fav-tipo="artigos" data-fav-id="art-0" data-fav-nome="${a0.t}" data-fav-url="layout-artigo.html" data-fav-cor="lavanda" aria-pressed="false">${CORACAO}<span>Salvar artigo</span></button>
    <a class="btn btn-sec" href="#selecao" id="popup-presentes">Escolher presentes</a>
    <button class="btn btn-sec" type="button" id="popup-nao" style="border-color:transparent">Agora não</button>
  </div>
  <p class="ok" id="popup-ok" hidden>Salvo! Está em Favoritos, no topo da página.</p>
</div>
${rodape}
${scriptImgs([0,1,2,3,4,5,6,7,8,9,10,11,12,13])}
<script>${JS_BASE}
(function(){
  var bar=document.getElementById('progresso'),art=document.querySelector('article'),cab=document.getElementById('cab');
  function prog(){var r=art.getBoundingClientRect();var t=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));bar.style.transform='scaleX('+t+')';var pf=document.getElementById('prog-fita');if(pf)pf.style.strokeDashoffset=1-t;document.body.classList.toggle('cab-oculto',cab.classList.contains('some'));}
  addEventListener('scroll',prog,{passive:true});prog();
  var bts=document.querySelectorAll('.filtro button'),prods=document.querySelectorAll('.produto'),cont=document.getElementById('contagem'),pausa=document.querySelector('.pausa');
  bts.forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.f,n=0;bts.forEach(function(x){x.setAttribute('aria-pressed',x===b);});prods.forEach(function(p){var ok=f==='todos'||p.dataset.faixa===f;p.hidden=!ok;if(ok)n++;});pausa.hidden=f!=='todos';cont.textContent='Mostrando '+n+' de 14 presentes · preços de exemplo';});});
  /* índice lateral marca a seção atual */
  var links=document.querySelectorAll('#indice a'),mapa={};links.forEach(function(a){mapa[a.getAttribute('href').slice(1)]=a;});
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(x){x.classList.remove('atual');});var a=mapa[e.target.id];if(a)a.classList.add('atual');}});},{rootMargin:'-30% 0px -60% 0px'});Object.keys(mapa).forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s);});}
  /* pop-up para guardar: aparece uma vez por visita, depois de metade do artigo, se ainda não foi salvo */
  var pop=document.getElementById('popup'),mostrou=false;try{mostrou=sessionStorage.getItem('oqd-popup')==='1';}catch(e){}
  function fechaPop(){pop.hidden=true;}
  document.getElementById('popup-x').onclick=fechaPop;document.getElementById('popup-nao').onclick=fechaPop;document.getElementById('popup-presentes').addEventListener('click',fechaPop);
  document.getElementById('popup-salvar').addEventListener('click',function(){var ok=document.getElementById('popup-ok');setTimeout(function(){ok.hidden=false;setTimeout(fechaPop,1800);},50);});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!pop.hidden)fechaPop();});
  addEventListener('scroll',function(){if(mostrou)return;var r=art.getBoundingClientRect();var t=-r.top/(r.height-innerHeight);if(t>.5){mostrou=true;try{sessionStorage.setItem('oqd-popup','1');}catch(e){}if(document.querySelector('.fav-artigo').getAttribute('aria-pressed')==='true')return;pop.hidden=false;}},{passive:true});

  /* faixas de miniaturas: setas e fim da faixa */
  document.querySelectorAll('.faixa-prod').forEach(function(n){var ol=n.querySelector('ol'),a=n.querySelector('.fp-ant'),p=n.querySelector('.fp-prox');function at(){var fim=ol.scrollLeft+ol.clientWidth>=ol.scrollWidth-4;a.disabled=ol.scrollLeft<4;p.disabled=fim;n.classList.toggle('fim',fim);}a.onclick=function(){ol.scrollBy({left:-ol.clientWidth*.8,behavior:'smooth'});};p.onclick=function(){ol.scrollBy({left:ol.clientWidth*.8,behavior:'smooth'});};ol.addEventListener('scroll',at,{passive:true});at();});
  /* prós e contras fechados no celular */
  if(matchMedia('(max-width:900px)').matches)document.querySelectorAll('.pc-det').forEach(function(d){d.open=false;});
  /* marca-texto: acende quando aparece */
  var marcas=document.querySelectorAll('.marca-txt');
  if('IntersectionObserver' in window){var iom=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visto');iom.unobserve(e.target);}});},{rootMargin:'0px 0px -25% 0px'});marcas.forEach(function(m){iom.observe(m);});}else marcas.forEach(function(m){m.classList.add('visto');});
  var H=document.documentElement;
  /* modelo compacto: botões para abrir lojas e análise */
  if(H.classList.contains('m-compacto')&&matchMedia('(max-width:900px)').matches){
    document.querySelectorAll('.produto').forEach(function(pr){
      var c=pr.querySelector('.comparador'),b=document.createElement('button');b.type='button';b.className='mais-lojas';b.textContent='Ver as outras 2 lojas';b.onclick=function(){c.classList.toggle('aberto');b.textContent=c.classList.contains('aberto')?'Mostrar só a melhor oferta':'Ver as outras 2 lojas';};c.appendChild(b);
      var t=pr.querySelector('.prod-texto'),l=document.createElement('button');l.type='button';l.className='ler-mais';l.textContent='Ler análise completa';l.onclick=function(){t.classList.add('aberto');l.remove();};t.appendChild(l);
    });
  }
  /* modelo barra: gaveta de baixo para cima */
  var folha=document.getElementById('folha');
  document.querySelectorAll('[data-folha]').forEach(function(b){b.addEventListener('click',function(){var q=b.dataset.folha;document.getElementById('folha-indice').hidden=q!=='indice';document.getElementById('folha-presentes').hidden=q!=='presentes';document.getElementById('folha-t').textContent=q==='indice'?'Neste artigo':'Os 14 presentes';folha.hidden=false;document.getElementById('folha-x').focus();});});
  document.getElementById('folha-x').onclick=function(){folha.hidden=true;};
  folha.addEventListener('click',function(e){if(e.target.closest('a'))folha.hidden=true;});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!folha.hidden)folha.hidden=true;});
  var mov=document.querySelector('.indice-movel');mov.addEventListener('click',function(e){if(e.target.closest('a'))mov.open=false;});
})();
</script>
</body>
</html>`;
const marca = (h, txt) => h.replace(txt, '<span class="marca-txt">' + txt + '</span><span class="cursor-tag" aria-hidden="true"><i></i><b>A.G.</b></span>');
let artigoM = marca(artigo, '“como você sabia que eu ia gostar disso?”');
artigoM = marca(artigoM, 'O segredo está em pensar qual desses presentes realmente combina com a pessoa que vai receber.');
artigoM = marca(artigoM, 'Essas respostas já eliminam várias opções.');
fs.writeFileSync(path.join(OUT, 'layout-artigo.html'), artigoM);
// página para comparar os modelos de celular lado a lado
const fr = (t, d, q) => `<figure class="cel"><figcaption><b>${t}</b><span>${d}</span></figcaption><div class="moldura"><iframe src="layout-artigo.html?${q.split('#')[0]}" data-alvo="${q.split('#')[1]}" title="${t}"></iframe></div></figure>`;
const comp = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Modelos de celular · Artigo</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700&display=swap" rel="stylesheet">
<style>body{margin:0;background:#F4F2F0;color:#1C1A1F;font-family:"Bricolage Grotesque",system-ui,sans-serif;padding:40px 24px}h1{font-size:40px;letter-spacing:-.03em;margin:0 0 8px}p.i{color:#5E5963;max-width:60ch;margin:0 0 32px;line-height:1.5}
.grade{display:flex;gap:28px;overflow-x:auto;padding-bottom:24px}.cel{margin:0;flex:none;width:390px}.cel figcaption{display:flex;flex-direction:column;gap:4px;margin-bottom:12px;min-height:66px}.cel b{font-size:20px}.cel span{color:#5E5963;font-size:14px;line-height:1.4}
.moldura{width:390px;height:780px;border-radius:44px;border:10px solid #1C1A1F;overflow:hidden;background:#fff;box-shadow:0 30px 60px rgba(28,26,31,.18)}iframe{width:100%;height:100%;border:0}</style></head><body>
<h1>Artigo no celular: modelos</h1><p class="i">Todos já têm a faixa com os 14 presentes e os prós e contras fechados. Role dentro de cada celular para comparar. Os modelos podem ser combinados.</p>
<div class="grade">
${fr('Base', 'Faixa dos 14 presentes e prós e contras fechados.', 'modelo=base#selecao')}
${fr('1 · Cartão compacto', 'Foto pequena ao lado do nome, só a melhor oferta e a análise recolhida.', 'modelo=compacto#selecao')}
${fr('3 · Barra fixa embaixo', 'Índice, lista dos 14 presentes e favoritos ao alcance do polegar.', 'modelo=barra#p-1')}
${fr('4 · Comparativo em lista', 'A tabela vira uma lista, sem rolar para o lado.', 'modelo=lista#comp')}
${fr('Tudo junto', 'Compacto, barra fixa e comparativo em lista.', 'modelo=compacto,barra,lista#selecao')}
</div><script>document.querySelectorAll("iframe").forEach(function(f){f.addEventListener("load",function(){try{var d=f.contentDocument;d.documentElement.style.scrollBehavior="auto";var el=d.getElementById(f.dataset.alvo);setTimeout(function(){el.scrollIntoView();},600);}catch(e){}});});</script></body></html>`;
// (comparação dos modelos de celular encerrada: barra fixa e lista escolhidas)
console.log('artigo ok', Math.round(artigo.length / 1024) + 'KB');
