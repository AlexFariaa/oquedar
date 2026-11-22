// CSS do modelo de artigo (separado de artigo.js para servir a todos os posts)
const { CSS_COMP } = require('./base.js');
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
/* último parágrafo da introdução no mesmo tamanho dos outros (sem destaque não pedido) */

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
.grupo-prod{padding:var(--e8) 0 var(--e5);border-top:1px solid var(--fio)}
.grupo-prod h2{font-size:clamp(1.6rem,1.2rem + 1.6vw,2.3rem);margin:0 0 var(--e4)}
.grupo-prod+.produto{border-top:0}
#produtos .produto h3.sub{font-size:clamp(1.35rem,1.1rem + 1vw,1.8rem)}
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
.faq-q{font:inherit;margin:0;color:inherit}
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
module.exports = CSS_ART;
