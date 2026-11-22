// Página inicial: layout-alta-fidelidade.html
const B = require('./base.js');
const { fs, path, OUT, esc, P, reais, melhorIdx, nomes, produtosTxt, cab, rodape, JS_BASE, head, comparador, CSS_COMP, artigos, imgProd, scriptImgs, PROD_ALT, favArtigo, qLogo } = B;

const cats = [
  ['Relacionamento', 'relacionamento', 'rosa', 'Casal sorrindo, fundo rosa'],
  ['Idade', 'idade', 'pessego', 'Três gerações juntas, fundo pêssego'],
  ['Gênero', 'genero', 'lavanda', 'Retrato de mulher e de homem, fundo lavanda'],
  ['Interesse', 'interesse', 'pessego', 'Mãos segurando um hobby, fundo pêssego'],
  ['Profissão', 'profissao', 'lavanda', 'Pessoa no trabalho, fundo lavanda'],
  ['Ocasião', 'ocasiao', 'rosa', 'Presente embrulhado em festa, fundo rosa'],
  ['Preço', 'preco', 'pessego', 'Etiqueta de presente em close, fundo pêssego'],
];

const CSS_HOME = CSS_COMP + `
section{position:relative}
.bloco-secao{margin-top:var(--secao)}
.cabeca{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end;margin-bottom:var(--e7)}
.cabeca h2{grid-column:1/span 7}
.cabeca p{grid-column:9/span 4}
.cabeca .rotulo{grid-column:1/-1;margin-bottom:calc(var(--e3) * -1)}

/* abertura: Q de vidro com etiquetas */
.abertura{padding-top:clamp(132px,16vw,184px);padding-bottom:var(--secao);overflow:clip}
.abertura .mancha{position:absolute;right:-14vw;top:4%;width:min(62vw,900px);aspect-ratio:1;border-radius:50%;background:var(--degrade);filter:blur(48px);opacity:.85;pointer-events:none;animation:respira 14s var(--curva) infinite alternate}
@keyframes respira{to{transform:scale(1.07) translate(-2%,3%)}}
.abertura .wrap{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.abertura .selo-topo{grid-column:1/-1;justify-self:start}
.abertura{min-height:min(100dvh,900px)}
.abertura h1{grid-column:1/-1;max-width:19ch;margin-top:var(--e5);font-size:clamp(3rem,5.6vw,5.5rem);position:relative;z-index:2}
.abertura .abre{grid-column:1/span 6;margin-top:var(--e5)}
.cta{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:var(--e3);align-items:center;margin-top:var(--e6)}
.cena{position:absolute;right:calc(var(--margem) + 2%);top:40px;width:min(36%,460px);height:520px;z-index:1}
.js .abertura .selo-topo,.js .abertura h1,.js .abertura .abre,.js .abertura .cta{animation:sobe .9s var(--curva) both}
.js .abertura h1{animation-delay:.08s}
.js .abertura h1.partido{animation:none}.js .abertura .abre{animation-delay:.18s}.js .abertura .cta{animation-delay:.26s}
.js .cena{animation:aparece 1.2s var(--curva) .3s both}
@keyframes sobe{from{opacity:0;transform:translateY(18px)}}
@keyframes aparece{from{opacity:0;transform:scale(.94)}}
.reserva.q{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(100%,400px);aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.28);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.7);justify-content:center;align-items:center;text-align:center}
.reserva.q{flex-direction:column}
.vid{position:absolute;display:inline-flex;align-items:center;gap:var(--e2);min-height:48px;padding:0 var(--e4);border-radius:var(--pilula);background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.9);font-weight:var(--peso-forte);box-shadow:0 12px 30px rgba(120,50,50,.12);white-space:nowrap;animation:flutua 6s var(--curva) infinite alternate}
.vid i{width:10px;height:10px;border-radius:50%;background:var(--coral)}
.v1{left:18%;top:14%}.v2{right:4%;top:42%;animation-delay:-2s}.v3{left:6%;bottom:22%;animation-delay:-4s}
.cena .vid{font-size:var(--t-abertura);min-height:56px;padding:0 var(--e5)}
@keyframes flutua{to{transform:translateY(-10px)}}

/* etiquetas coloridas */
.cena .v1{background:rgba(216,203,250,.88)}
.cena .v2{background:rgba(248,207,219,.9)}
.cena .v3{background:rgba(255,216,201,.92)}
.cena .v4{background:rgba(255,216,201,.92)}
.cena .v5{background:rgba(216,203,250,.88)}
.cena .vid{border-color:rgba(255,255,255,.7)}
.v4,.v5,.anel{display:none}
/* fotos de momentos felizes em volta do título */
.mom{display:none}
.ab-centro .mom{display:block;position:absolute;z-index:0;aspect-ratio:4/5;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(28,26,31,.16);border:3px solid rgba(255,255,255,.75);animation:flutua-m 7s var(--curva) infinite alternate}
.ab-centro .mom img{display:block;width:100%;height:100%;object-fit:cover}
.ab-centro .vid{z-index:1}
@keyframes flutua-m{to{transform:translateY(-12px)}}

.marca-h{position:relative}

/* variante: título centralizado com os tópicos em volta */
.ab-centro .abertura .wrap{justify-items:center;text-align:center}
.ab-centro .abertura .selo-topo{justify-self:center}
.ab-centro .abertura h1{max-width:15ch;margin-inline:auto}
.ab-centro .abertura .abre{grid-column:1/-1;max-width:30em;margin-inline:auto}
.ab-centro .cta{justify-content:center}
.ab-centro .abertura .mancha{right:auto;left:50%;width:min(62vw,900px);margin-left:calc(min(62vw,900px) / -2);top:2%;opacity:.5;background:radial-gradient(55% 55% at 32% 42%,#FF8A6E 0%,transparent 70%),radial-gradient(55% 55% at 68% 42%,#F7A8C4 0%,transparent 70%),radial-gradient(60% 55% at 50% 82%,#C7B4F7 0%,transparent 72%),#FBD3C8;animation:respira-c 14s var(--curva) infinite alternate}
@keyframes respira-c{to{transform:scale(1.06)}}
.ab-centro .anel{display:block;position:absolute;left:50%;top:52%;width:min(78vw,1000px);aspect-ratio:1;border-radius:50%;border:1.5px dashed rgba(255,255,255,.85);transform:translate(-50%,-50%);pointer-events:none}
.ab-centro .cena{position:absolute;inset:0;width:auto;height:auto;right:0;top:0;pointer-events:none}
.ab-centro .v1{left:2%;top:24%;right:auto;bottom:auto}
.ab-centro .v2{right:2%;top:24%;left:auto;bottom:auto}
.ab-centro .v3{left:6%;bottom:18%;top:auto;right:auto}
.ab-centro .v4{right:6%;bottom:18%}
.ab-centro .v5{right:10%;top:48%}
.ab-centro .marca-h{background:linear-gradient(var(--lavanda),var(--lavanda)) no-repeat 0 82%/100% 46%;border-radius:6px}
.tag-voce{display:none}
.ab-centro .marca-h{-webkit-box-decoration-break:clone;box-decoration-break:clone}
.ab-centro .tag-voce{display:inline-block;position:relative;width:0;height:1em;vertical-align:baseline;font-size:var(--t-rotulo);font-weight:var(--peso-forte);letter-spacing:0;line-height:1}
.ab-centro .tag-voce i{position:absolute;left:3px;bottom:-14px}
.ab-centro .tag-voce b{position:absolute;left:6px;top:18px;white-space:nowrap;transform:rotate(-3deg)}
.ab-centro .tag-voce i{display:block;width:2px;height:clamp(52px,5.6vw,86px);background:var(--coral);border-radius:2px}
.ab-centro .tag-voce{color:var(--tinta)}
.ab-centro .tag-voce b{background:var(--coral);color:var(--tinta);border-radius:var(--pilula);padding:5px 9px;font-weight:var(--peso-forte)}
@media (max-width:900px){.ab-centro .cena{position:relative;inset:auto;height:260px}.ab-centro .abertura .abre{grid-column:1/-1}.ab-centro .anel{display:none}.ab-centro .v4{right:0;bottom:6%}.ab-centro .v5{left:30%;right:auto;top:40%}}

.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* selo girando entre a abertura e a busca */
.selo-ponte{position:relative;height:0;z-index:5}
/* moldura que corta o selo na borda da tela (sem criar rolagem para o lado) */
.selo-clip{position:absolute;right:0;top:-170px;width:300px;height:340px;overflow:hidden;pointer-events:none}
.carimbo{position:absolute;right:-64px;top:52px;width:236px;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;background:conic-gradient(from 200deg,#FF6650,#F7A8C4,#C7B4F7,#FFD8C9,#FF6650);box-shadow:0 24px 50px rgba(28,26,31,.22)}
.carimbo::before{content:"";position:absolute;inset:30%;border-radius:50%;background:var(--fundo)}
.selo-giro{position:absolute;inset:0;width:100%;height:100%;animation:selo-gira 24s linear infinite}
.selo-giro text{font-family:var(--fonte);font-size:15.5px;font-weight:var(--peso-forte);letter-spacing:.06em;fill:var(--tinta)}
.selo-q{position:relative;width:52px;height:74px;background:var(--tinta);-webkit-mask:url(imagens/logo-oquedar.png) -54px -24px/151px 151px no-repeat;mask:url(imagens/logo-oquedar.png) -54px -24px/151px 151px no-repeat}
@keyframes selo-gira{to{transform:rotate(360deg)}}
@media (max-width:900px){.carimbo{width:168px;right:-52px;top:86px}.selo-q{transform:scale(.72)}}
@media (prefers-reduced-motion:reduce){.selo-giro{animation:none}}
/* busca escura */
.busca{background:var(--tinta);color:var(--fundo);padding:var(--secao) 0;overflow:hidden;--apoio:rgba(244,242,240,.70);--fio:rgba(244,242,240,.16)}
.busca{padding-bottom:0}
.busca .palavra{font-size:clamp(4rem,15vw,14rem);font-weight:var(--peso-forte);letter-spacing:-.055em;line-height:.78;color:var(--rosa);margin:var(--e8) 0 0 -.05em;white-space:nowrap;transform:translateY(.12em)}
.busca .palavra span{color:var(--coral)}
.busca .wrap{position:relative}
.busca .cabeca{margin-bottom:var(--e7)}
.busca .abre{color:var(--apoio)}
.buscador{background:rgba(255,255,255,.07);-webkit-backdrop-filter:blur(18px) saturate(1.2);backdrop-filter:blur(18px) saturate(1.2);border:1px solid rgba(255,255,255,.18);border-radius:var(--raio);padding:var(--e7) var(--e7) var(--e6);box-shadow:0 30px 80px rgba(0,0,0,.35)}
.frase{font-size:var(--t-abertura);line-height:2.5;letter-spacing:-.01em}
.frase > span{white-space:nowrap}
.esc{position:relative;display:inline-block;vertical-align:middle;margin:0 var(--e1);line-height:1.3}
.esc > button{position:relative;font:inherit;font-size:var(--t-corpo);font-weight:var(--peso-forte);color:var(--tinta);background:#fff;border:0;border-radius:var(--pilula);height:40px;padding:0 38px 0 var(--e4);cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.25);white-space:nowrap;transition:box-shadow .2s var(--curva)}
@media (pointer:coarse){.esc > button{height:44px}}
.esc > button::after{content:"";position:absolute;right:16px;top:50%;width:7px;height:7px;border-right:2px solid var(--coral);border-bottom:2px solid var(--coral);transform:translateY(-70%) rotate(45deg);transition:transform .25s var(--curva)}
.esc > button[aria-expanded="true"]::after{transform:translateY(-20%) rotate(-135deg)}
.esc ul{position:absolute;left:0;top:calc(100% + var(--e2));min-width:100%;z-index:5;display:grid;gap:2px;padding:var(--e2);background:rgba(255,255,255,.96);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border-radius:var(--raio);box-shadow:0 20px 50px rgba(0,0,0,.30);animation:abre-esc .25s var(--curva)}
@keyframes abre-esc{from{opacity:0;transform:translateY(-6px) scale(.98)}}
.esc li{color:var(--tinta);font-size:var(--t-corpo);padding:var(--e2) var(--e4);border-radius:var(--pilula);cursor:pointer;white-space:nowrap}
.esc li:hover,.esc li.foco{background:var(--fundo)}
.esc li[aria-selected="true"]{background:var(--lavanda);font-weight:var(--peso-forte)}
.esc > button.troca{animation:troca .5s var(--curva)}
@keyframes troca{from{opacity:.2;transform:translateY(6px)}}
.rodape-busca{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--e4);margin-top:var(--e5);padding-top:var(--e5);border-top:1px solid rgba(255,255,255,.14)}
.busca .meta{color:var(--apoio)}
.populares{display:flex;flex-wrap:wrap;align-items:center;gap:var(--e2);margin-top:var(--e6)}
.populares .rotulo{margin-right:var(--e2)}
.busca .tag{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.22);color:var(--fundo)}
@media (hover:hover){.busca a.tag:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.5)}}

/* achado */
.achado{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:stretch}
.achado .foto{position:relative;grid-column:1/span 7;border-radius:var(--raio);min-height:520px;overflow:hidden}
.achado .foto .img-prod{position:absolute;inset:0;padding:12%}
.nota{display:inline-flex;align-items:baseline;gap:var(--e2);background:#fff;border-radius:var(--pilula);padding:var(--e2) var(--e4)}
.nota b{font-size:var(--t-sub);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.achado .foto .nota{position:absolute;left:var(--e5);top:var(--e5);z-index:1}
.achado .info{grid-column:8/span 5;border-radius:var(--raio);background:var(--degrade);padding:var(--e6);display:flex;flex-direction:column;gap:var(--e4)}
.achado .info .comparador{margin-top:auto;padding:var(--e3)}
.ach-vitrine{display:grid}
.ach-vitrine > .ach-slide{grid-area:1/1}
.ach-vitrine > .ach-ctrl{grid-area:2/1}
.ach-slide:not(.ativo){visibility:hidden}
.ach-palavra{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);z-index:0;font-size:min(calc(94cqw / (var(--n) * .6)),15rem);font-weight:var(--peso-forte);letter-spacing:-.06em;line-height:.8;color:var(--tom,#fff);white-space:nowrap;pointer-events:none}
.achado .foto .img-prod{z-index:1;padding:20%}
.img-prod.recorte{mix-blend-mode:normal;filter:drop-shadow(0 24px 30px rgba(28,26,31,.18))}
.achado .foto{container-type:inline-size}
.foto.c-lavanda{--tom:#BBA3F6}.foto.c-rosa{--tom:#F0A3BC}.foto.c-pessego{--tom:#FFB496}
.achado .foto .nota{z-index:2}
.ach-link{position:absolute;inset:0;z-index:3;border-radius:inherit}
.ach-link:focus-visible{outline:3px solid var(--tinta);outline-offset:-6px}
.achado .foto .img-prod{transition:transform .5s var(--curva)}
@media (hover:hover){.achado .foto:has(.ach-link:hover) .img-prod{transform:scale(1.04) rotate(-2deg)}}
.ach-slide.entrando .ach-palavra{animation:palavra-entra .9s var(--curva) both}
.ach-slide.entrando .img-prod{animation:prod-entra .9s var(--curva) .08s both}
.ach-slide.entrando .info > *{animation:sobe .7s var(--curva) both}
.ach-slide.entrando .info > :nth-child(2){animation-delay:.05s}.ach-slide.entrando .info > :nth-child(3){animation-delay:.1s}.ach-slide.entrando .info > :nth-child(n+4){animation-delay:.15s}
@keyframes palavra-entra{from{opacity:0;transform:translate(-30%,-50%)}}
@keyframes prod-entra{from{opacity:0;transform:translateY(24px) scale(.9) rotate(-6deg)}}
.ach-ctrl{display:flex;align-items:center;justify-content:flex-end;gap:var(--e3);margin-top:var(--e5)}
.ach-ctrl > button{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:0;background:var(--tinta);color:var(--fundo);cursor:pointer;transition:transform .16s var(--curva)}
.ach-ctrl > button:active{transform:scale(.94)}
.ach-ctrl svg{width:18px;height:18px}
.ach-pontos{display:flex;gap:var(--e2);margin-right:auto}
.ach-pontos button{width:10px;height:10px;padding:0;border:0;border-radius:var(--pilula);background:var(--fio-forte, rgba(28,26,31,.25));cursor:pointer;transition:width .4s var(--curva),background .3s}
.ach-pontos button[aria-current="true"]{width:32px;background:var(--tinta)}
@media (pointer:coarse){.ach-pontos button{position:relative}.ach-pontos button::after{content:"";position:absolute;inset:-17px -8px}}

/* Natal: foto de fundo com vidro */
.ocasiao{margin-top:var(--secao)}
.faixa{position:relative;overflow:hidden;background:var(--degrade);min-height:88dvh;display:flex;align-items:center;padding:clamp(96px,12vw,176px) 0}
.faixa-grade{width:100%;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:center}
.faixa .gigante{font-size:clamp(3.5rem,9vw,9rem);line-height:.88;letter-spacing:-.05em}
.faixa .txt{grid-column:1/span 7;display:flex;flex-direction:column;gap:var(--e5);align-items:flex-start;position:relative;z-index:1}
.faixa .abre{color:var(--tinta);max-width:34ch}
.meia-lua{position:absolute;right:0;top:50%;transform:translateY(-50%);height:min(84%,760px);aspect-ratio:1/2;margin:0;border-radius:999px 0 0 999px;overflow:hidden;box-shadow:-30px 30px 80px rgba(28,26,31,.18)}
.meia-lua img{width:100%;height:100%;object-fit:cover;object-position:35% 50%}
.natal-sem .meia-lua{display:none}
.natal-sem .faixa .txt{grid-column:1/-1}

/* ideias: imagem ocupa topo e laterais */
.mosaico{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.art-item{position:relative;grid-column:span 3}
.art-item.grande{grid-column:span 6;grid-row:span 2}
.art{display:flex;flex-direction:column;gap:var(--e3);height:100%;border-radius:var(--raio);overflow:hidden;padding:0 0 var(--e5);text-decoration:none;transition:transform .25s var(--curva),box-shadow .25s var(--curva)}
.art > span{padding-inline:var(--e5)}
.art-img{aspect-ratio:3/2;margin-bottom:var(--e2);border-radius:0;overflow:hidden}
.grande .art-img{aspect-ratio:auto;flex:1;min-height:320px}
.art-img img{width:100%;height:100%;object-fit:cover;object-position:50% 30%}
.art-img.reserva{background:rgba(255,255,255,.35)}
.art-t{font-weight:var(--peso-forte);line-height:1.3;text-wrap:balance}
.js .mosaico .art-item.entra{transition:opacity .7s var(--curva),transform .7s var(--curva),translate .55s cubic-bezier(.34,1.56,.64,1),filter .4s var(--curva)}
.art{transition:box-shadow .4s var(--curva)}
@media (hover:hover){
  .mosaico .art-item:hover{translate:0 -14px}
  .mosaico .art-item:hover .art{box-shadow:0 28px 50px rgba(70,30,40,.16)}
  .mosaico:has(.art-item:hover) .art-item.visto:not(:hover){opacity:.62;filter:saturate(.7)}
}
@media (prefers-reduced-motion:reduce){.mosaico .art-item:hover{translate:none}}

/* fita em onda com as ocasiões */
.onda{margin-top:var(--e8);overflow:hidden}
.onda svg{display:block;position:relative;left:50%;width:max(100%,820px);height:auto;transform:translateX(-50%);overflow:visible}
.onda-fita{fill:none;stroke:url(#g-onda);stroke-width:42;stroke-linecap:butt;filter:drop-shadow(0 12px 18px rgba(255,102,80,.22))}
.onda-txt{font-family:var(--fonte);font-size:18px;font-weight:var(--peso-forte);letter-spacing:-.01em;fill:var(--tinta);white-space:pre}
.corre{margin-top:var(--secao);overflow:hidden;padding:var(--e3) 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.corre-trilho{display:flex;gap:var(--e3);width:max-content;animation:corre 38s linear infinite}
.corre:hover .corre-trilho{animation-play-state:paused}
.corre span{display:inline-flex;align-items:center;gap:var(--e3);min-height:56px;padding:0 var(--e5);border-radius:var(--pilula);font-size:var(--t-sub);font-weight:var(--peso-forte);letter-spacing:-.02em;white-space:nowrap}
.corre i{width:10px;height:10px;border-radius:50%;background:var(--coral)}
@keyframes corre{to{transform:translateX(-50%)}}
.art-img img{transition:transform .6s var(--curva)}
@media (hover:hover){.art:hover .art-img img{transform:scale(1.04)}}
/* categorias: escuro, dividido */
.cats-sec{margin-top:var(--e8);background:var(--tinta);color:var(--fundo);padding:var(--secao) 0;--apoio:rgba(244,242,240,.70);--fio:rgba(244,242,240,.18);--fio-forte:rgba(244,242,240,.35)}
.cats-grade{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:start}
.cats-esq{grid-column:1/span 5;position:sticky;top:120px;display:flex;flex-direction:column;gap:var(--e5)}
.cats-esq .abre{color:var(--apoio)}
.cats-previa{aspect-ratio:4/5;max-width:340px;border-radius:var(--raio);margin-top:var(--e3);transition:background-color .35s var(--curva)}
.cats-previa{padding:0;overflow:hidden}
.cats-cursor{display:none}
@media (hover:hover) and (pointer:fine){
  .cats-previa{display:none}
  .cats-cursor{display:block;position:fixed;left:0;top:0;z-index:4;width:240px;aspect-ratio:4/5;margin:0;border-radius:var(--raio);overflow:hidden;pointer-events:none;opacity:0;scale:.8;rotate:-6deg;transition:opacity .25s var(--curva),scale .35s var(--curva),rotate .45s var(--curva);box-shadow:0 30px 60px rgba(0,0,0,.35);will-change:transform}
  .cats-cursor.on{opacity:1;scale:1;rotate:-3deg}
  .cats-cursor img{width:100%;height:100%;object-fit:cover}
}
@media (prefers-reduced-motion:reduce){.cats-cursor{transition:opacity .2s linear}}
.cats-previa img{width:100%;height:100%;object-fit:cover}
.cats{grid-column:7/span 6;border-bottom:1px solid var(--fio)}
.cats a{display:flex;align-items:center;justify-content:space-between;gap:var(--e5);padding:var(--e5) 0;border-top:1px solid var(--fio);text-decoration:none}
.cats .nome{transition:transform .35s var(--curva),color .25s var(--curva)}
.cats .seta{flex:none;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;border:1.5px solid var(--fio-forte);transition:background-color .25s var(--curva),transform .25s var(--curva),border-color .25s var(--curva)}
.cats .seta svg{width:20px;height:20px}
.cats a:hover .nome,.cats a:focus-visible .nome,.cats a.ativo .nome{transform:translateX(12px)}
.cats a:hover .seta,.cats a:focus-visible .seta,.cats a.ativo .seta{background:var(--coral);border-color:var(--coral);color:var(--tinta);transform:rotate(-45deg)}

/* como funciona */
.fb{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e5)}
.fb .fita{position:absolute;left:calc(-1 * ((100vw - min(100vw, var(--largura))) / 2 + var(--margem)));top:34%;width:100vw;height:220px;z-index:0;overflow:visible;filter:drop-shadow(0 10px 18px rgba(255,102,80,.25))}
.fb .fita path{stroke-width:22;stroke-linecap:round}
.js .fb .fita path{stroke-dasharray:1;stroke-dashoffset:1}
.js .fb.desenhar .fita path{transition:stroke-dashoffset 2.2s var(--curva);stroke-dashoffset:0}
.fb > li{position:relative;z-index:1;border-radius:var(--raio);padding:var(--e6);display:flex;flex-direction:column;gap:var(--e4);min-height:300px;box-shadow:0 20px 50px rgba(120,50,50,.10);transition:transform .3s var(--curva)}
.fb > li .num{font-size:var(--t-rotulo);font-weight:var(--peso-forte);letter-spacing:.08em}
.fb > li h3{margin-top:auto}
@media (hover:hover){.fb > li:hover{transform:translateY(-6px) rotate(-.5deg)}}
.passos{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:var(--e4);align-items:start}
.passo{display:flex;flex-direction:column;gap:var(--e3)}
.passo .pil{display:flex;align-items:center;gap:var(--e3);background:#fff;border-radius:var(--pilula);padding:var(--e2) var(--e5) var(--e2) var(--e2);min-height:64px;box-shadow:0 8px 24px rgba(70,30,40,.06);font-weight:var(--peso-forte)}
.passo .n{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;flex:none;font-weight:var(--peso-forte)}
.passo p{color:var(--apoio);padding-inline:var(--e3)}
.liga{align-self:center;margin-top:-32px;color:var(--discreto)}
.liga svg{width:40px;height:24px}
.transparencia{margin-top:var(--e7);display:flex;flex-wrap:wrap;gap:var(--e3) var(--e5);align-items:center;border-top:1px solid var(--fio);padding-top:var(--e5);color:var(--apoio)}

/* newsletter */
.na{position:relative;overflow:hidden;border-radius:var(--raio);min-height:560px;display:flex;align-items:center;padding:clamp(24px,5vw,72px)}
.na .fundo{position:absolute;inset:0;border-radius:0;background:var(--degrade);justify-content:flex-end;align-items:flex-end;padding:var(--e5)}
.na .vidro{position:relative;width:min(560px,100%);display:flex;flex-direction:column;gap:var(--e5);background:rgba(255,255,255,.35);-webkit-backdrop-filter:blur(22px) saturate(1.2);backdrop-filter:blur(22px) saturate(1.2);border:1px solid rgba(255,255,255,.75);border-radius:var(--raio);padding:clamp(24px,4vw,48px)}
.na .abre{color:var(--tinta)}
.na .fundo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:78% 30%}
.na form{display:flex;flex-direction:column;gap:var(--e3)}
.na small{font-size:var(--t-rotulo);color:var(--tinta)}
.news{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:center;background:var(--lavanda);border-radius:var(--raio);padding:clamp(32px,5vw,64px)}
.news .txt{grid-column:1/span 6;display:flex;flex-direction:column;gap:var(--e4)}
.news .txt .abre{color:var(--tinta)}
.news form{grid-column:8/span 5;display:flex;flex-direction:column;gap:var(--e3)}
.campo{display:flex;gap:var(--e2);background:#fff;border-radius:var(--pilula);padding:var(--e1);border:1.5px solid transparent;transition:border-color .2s var(--curva)}
.campo:focus-within{border-color:var(--tinta)}
.campo input{flex:1;min-width:0;border:0;background:transparent;font:inherit;padding:0 var(--e4);min-height:48px;color:var(--tinta)}
.campo input:focus{outline:none}
.news small{font-size:var(--t-rotulo);color:var(--tinta)}

/* marca-texto (igual ao do artigo) */
.marca-txt{background:linear-gradient(var(--lavanda),var(--lavanda)) no-repeat 0 88%/0% 92%;border-radius:6px;padding:0 6px;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-size 1.3s var(--curva)}
.marca-txt.visto{background-size:100% 92%}
.cursor-tag{display:inline-flex;align-items:center;gap:4px;vertical-align:middle;margin-left:6px;opacity:0;transform:translateY(4px);transition:opacity .4s var(--curva) 1.1s,transform .4s var(--curva) 1.1s;white-space:nowrap}
.cursor-tag i{display:inline-block;width:2px;height:1em;background:var(--coral);border-radius:2px}
.cursor-tag b{font-size:var(--t-rotulo);font-weight:var(--peso-forte);line-height:1;background:var(--coral);color:var(--tinta);border-radius:var(--pilula);padding:4px 8px;letter-spacing:0}
.marca-txt.visto + .cursor-tag{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.marca-txt,.cursor-tag{transition:none}}

/* abertura: lado esquerdo foto, etiqueta, foto, etiqueta; lado direito etiqueta sobre a ponta da foto, foto, etiqueta, foto */
.ab-centro .m1{left:5%;top:12%;width:104px;rotate:-7deg;filter:blur(.5px) saturate(.95)}
.ab-centro .v1{left:2%;top:25%;right:auto;bottom:auto;z-index:2}
.ab-centro .m3{left:10%;top:auto;bottom:19%;width:84px;rotate:5deg;filter:blur(1.2px);opacity:.92;animation-delay:-5s}
.ab-centro .v3{left:3%;bottom:13%;top:auto;right:auto}
.ab-centro .v2{right:5%;top:15%;left:auto;bottom:auto;z-index:2}
.ab-centro .m2{right:3%;top:23%;width:116px;rotate:6deg;animation-delay:-3s}
.ab-centro .v5{display:inline-flex;right:8%;left:auto;top:auto;bottom:25%;z-index:2}
.ab-centro .m4{right:3%;bottom:9%;width:120px;rotate:-5deg;animation-delay:-1.5s}
@media (max-width:900px){
  /* celular: fotos e etiquetas em volta do título, menores (faixa em cima e faixa embaixo) */
  .ab-centro .abertura .wrap{padding-top:64px;padding-bottom:150px}
  .ab-centro .cena{position:absolute;inset:0;height:auto;width:auto;margin:0;order:0;grid-column:auto}
  .ab-centro .cena .vid{font-size:var(--t-rotulo);min-height:34px;padding:0 12px;gap:6px}
  .ab-centro .cena .vid i{width:7px;height:7px}
  .ab-centro .mom{display:block;width:56px;border-width:2px;border-radius:12px}
  .ab-centro .m1{left:0;top:0}
  .ab-centro .v2{right:0;left:auto;top:12px;bottom:auto}
  .ab-centro .m2{display:none}
  .ab-centro .v1{left:0;right:auto;top:auto;bottom:96px}
  .ab-centro .m4{right:0;left:auto;top:auto;bottom:70px;width:64px}
  .ab-centro .v3{left:26%;right:auto;top:auto;bottom:20px}
  .ab-centro .m3{left:0;top:auto;bottom:6px;width:48px}
  .ab-centro .v5{display:inline-flex;right:4%;left:auto;top:auto;bottom:6px}
}
@media (max-width:900px){
  .abertura h1,.abertura .abre{grid-column:1/-1}
  .cena{position:relative;right:auto;top:auto;width:100%;height:220px;grid-column:1/-1;order:5;margin-top:var(--e6)}
  .reserva.q{width:min(80%,300px)}
  .cabeca h2,.cabeca p{grid-column:1/-1}
  .achado .foto,.achado .info{grid-column:1/-1}
  .achado .foto{min-height:360px}
  .faixa .txt{grid-column:1/-1}
  /* celular: foto do presente abaixo do título e do texto, menor, grudada na borda direita */
  .faixa{min-height:0;flex-direction:column;align-items:stretch;padding:var(--e8) 0 var(--e7)}
  .meia-lua{position:relative;top:auto;right:auto;transform:none;height:200px;align-self:flex-end;margin-top:var(--e6)}
  .natal-sem .faixa{padding-top:clamp(96px,12vw,176px)}
  .art-item,.art-item.grande{grid-column:1/-1;grid-row:auto}
  .grande .art-img{aspect-ratio:3/2;flex:none;min-height:0}
  .cats-esq,.cats{grid-column:1/-1}
  .cats-esq{position:relative;top:auto}
  .cats-previa{display:none}
  .passos,.fb{grid-template-columns:1fr}
  .fb .fita{display:none}
  .fb > li{min-height:0}
  .liga{justify-self:center;margin:0;transform:rotate(90deg)}
  .news .txt,.news form{grid-column:1/-1}
  .na{align-items:flex-end;padding-top:300px}
  .na .fundo img{object-position:80% 0%;height:62%;bottom:auto}
}
@media (max-width:560px){
  .frase{line-height:2.4}
  .frase > span{white-space:normal}
  .esc,.esc > button{max-width:100%}
  .reserva.q .det{display:none}
  .buscador{padding:var(--e5) var(--e4)}
  .buscador .btn{width:100%}
  .vid{min-height:44px;font-size:var(--t-rotulo)}
  .cats .nome{font-size:var(--t-sub)}
  .cats .seta{width:44px;height:44px}
}
`;

const esc_ = (id, rotulo, ops) => `<span class="esc" id="${id}"><button type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="${rotulo}: ${ops[0]}">${ops[0]}</button><ul role="listbox" aria-label="${rotulo}" hidden>${ops.map((o, k) => `<li role="option" aria-selected="${k === 0}">${o}</li>`).join('')}</ul><input type="hidden" name="${id}" value="${ops[0]}"></span>`;
// dados reais: posts publicados e produtos do post de basquete (links e preços por loja)
const { lista: artigosPub, produtosPorPost } = require('./posts.js');
const { notaDe, comparador: compReal } = require('./ofertas.js');
const PB = produtosPorPost['presentes-para-quem-gosta-de-basquete'] || [];
const ACHADOS = [[0, 'Bola', 0, ['Para quem joga', 'Interesse']], [1, 'Caneca', 1, ['Fã da NBA', 'Interesse']], [4, 'Funko', 1, ['Colecionador', 'Interesse']]];
const achadoSlide = ([i, palavra, par, tags], k) => `
      <div class="achado ach-slide${k === 0 ? ' ativo' : ''}" role="group" aria-roledescription="achado" aria-label="${k + 1} de ${ACHADOS.length}"${k ? ' inert' : ''}>
        <div class="foto c-${P[i].cor}">
          <span class="ach-palavra" aria-hidden="true" style="--n:${palavra.length}">${palavra}</span>
          <a class="ach-link" href="layout-artigo.html#p-${i + 1}" aria-label="Ver ${esc(nomes[i])} no artigo de basquete"></a>
          ${(n => n ? `<span class="nota"><b>${n.nota.toFixed(1).replace('.', ',')} ★</b><span class="meta">na ${n.nome}</span></span>` : '')(notaDe(PB[i] || {}))}
          <img class="img-prod recorte" src="imagens/produtos/recorte/p${i + 1}.webp" alt="${esc(PROD_ALT[i])}" width="600" height="600">
        </div>
        <div class="info">
          <div class="tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <h3 class="sub">${esc(nomes[i])}</h3>
          <p>${produtosTxt[i].itens[par].x}</p>
          <a class="link" href="layout-artigo.html#p-${i + 1}">Ver no artigo de basquete</a>
          ${compReal(PB[i] || {}, nomes[i], { vidro: true })}
        </div>
      </div>`;
const SETA_E = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>', SETA_D = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const cartao = (a, k) => {
  const grande = k === 0;
  const id = a.id || ('art-' + k);
  const img = a.foto
    ? `<figure class="art-img"><img src="${a.foto}" alt="${a.alt}" width="600" height="400"></figure>`
    : `<figure class="art-img reserva"><figcaption><b>Imagem de capa</b>${a.img} · ${grande ? 'livre' : '3:2'} · ocupa topo e laterais</figcaption></figure>`;
  return `
        <div class="art-item${grande ? ' grande' : ''} entra" data-atraso="${k * 60}">
          <a class="art c-${a.cor}" href="${a.u}">${img}
            <span class="rotulo">${a.cat}</span>
            <span class="${grande ? 'sub' : 'art-t'}">${a.t}</span>
            <span class="meta">${a.d}</span>
          </a>
          ${favArtigo(a, id)}
        </div>`;
};

const seta = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const home = head('O que dar? · Ideias de presente para todas as pessoas e ocasiões', 'Ideias de presente para todas as pessoas e ocasiões, com curadoria e comparação de ofertas entre Amazon, Mercado Livre e Shopee.', CSS_HOME) + `
<body>
<script>if(new URLSearchParams(location.search).get('abertura')!=='esquerda')document.documentElement.classList.add('ab-centro');if(new URLSearchParams(location.search).get('natal')==='sem')document.documentElement.classList.add('natal-sem');</script>
${cab('')}
<main id="conteudo">

  <section class="abertura" aria-labelledby="t-abertura">
    <div class="mancha" aria-hidden="true"></div><div class="anel" aria-hidden="true"></div>
    <div class="wrap">
      <span class="tag selo-topo">Curadoria especializada de presentes</span>
      <div class="cena" aria-hidden="true">
        
        <span class="vid v1"><i></i>para minha mãe</span><span class="vid v2"><i></i>fã de basquete</span><span class="vid v3"><i></i>até R$ 150</span><span class="vid v5"><i></i>Natal</span><span class="mom m1"><img src="imagens/abraco.jpg" alt="Duas amigas se abraçando numa comemoração com presentes" width="480" height="600" decoding="async"></span><span class="mom m2"><img src="imagens/aniversario.jpg" alt="Casais comemorando um aniversário com presentes" width="480" height="600" decoding="async"></span><span class="mom m3"><img src="imagens/presentinho.jpg" alt="Mulher sorrindo com um pequeno presente nas mãos" width="480" height="600" decoding="async"></span><span class="mom m4"><img src="imagens/luzes.jpg" alt="Mulher abrindo um presente entre luzinhas" width="480" height="600" decoding="async"></span>
      </div>
      <h1 class="gigante" id="t-abertura">Ideias de presente para <span class="marca-h">todas as pessoas</span> e ocasiões.</h1>
      <p class="abre">Encontrar a ideia de presente perfeita nem sempre é simples. Nossa equipe pesquisa, seleciona e organiza sugestões cuidadosamente escolhidas para ajudar você a encontrar opções criativas, úteis e memoráveis para cada pessoa e momento especial.</p>
      <div class="cta">
        <a class="btn btn-oferta" href="#buscar">Montar minha busca</a>
        <a class="btn btn-sec" href="#ideias">Ver ideias em destaque</a>
      </div>
    </div>
  </section>


  <section class="busca" id="buscar" aria-labelledby="t-busca">
    <div class="wrap">
      <div class="cabeca">
        <h2 class="titulo" id="t-busca">Monte a frase e descubra<span class="sr-only"> o que dar de presente</span>…</h2>
        <p class="abre">Diga para quem é, do que a pessoa gosta e quanto quer gastar. A gente procura o resto.</p>
      </div>
      <form class="buscador" action="buscar.html" method="get" aria-label="Montar a busca de presente">
        <div class="frase">
          <span>Quero um presente para ${esc_('s-quem', 'Para quem é o presente', ['um colega', 'minha mãe', 'meu namorado', 'uma amiga', 'meu pai', 'minha namorada'])}</span>
          <span>que gosta de ${esc_('s-gosto', 'Do que a pessoa gosta', ['café', 'basquete', 'correr', 'games', 'livros', 'cozinhar'])}</span>
          <span>até ${esc_('s-preco', 'Até quanto quer gastar', ['R$ 150', 'R$ 100', 'R$ 300', 'R$ 500', 'qualquer valor'])}</span>
        </div>
        <div class="rodape-busca">
          <span class="meta">Mostramos os artigos e os presentes que combinam com a sua frase.</span>
          <button class="btn btn-oferta" type="submit">Mostrar ideias</button>
        </div>
      </form>
      <div class="populares">
        <span class="rotulo">Populares</span>
        <a class="tag" href="https://oquedar.com/tag/mulher">Mulher</a>
        <a class="tag" href="https://oquedar.com/tag/homem">Homem</a>
        <a class="tag" href="https://oquedar.com/tag/namorado">Namorado</a>
        <a class="tag" href="https://oquedar.com/tag/amiga">Amiga</a>
        <a class="tag" href="https://oquedar.com/tag/mae">Mãe</a>
        <a class="tag" href="https://oquedar.com/tag/gamer">Gamer</a>
      </div>
      <p class="palavra" aria-hidden="true">O que <span>dar?</span></p>
    </div>
  </section>

  <section class="bloco-secao" aria-labelledby="t-achado">
    <div class="wrap">
      <div class="cabeca">
        <span class="rotulo">Escolha da curadoria</span>
        <h2 class="titulo" id="t-achado">Um achado. Três lojas.</h2>
        <p class="abre">Comparamos o mesmo presente na Amazon, no Mercado Livre e na Shopee e marcamos onde está mais barato.</p>
      </div>
      <div class="ach-vitrine entra" aria-roledescription="carrossel" aria-label="Achados da curadoria">${ACHADOS.map(achadoSlide).join('')}
        <div class="ach-ctrl">
          <button type="button" class="ach-ant" aria-label="Achado anterior">${SETA_E}</button>
          <span class="ach-pontos">${ACHADOS.map((a, k) => `<button type="button" aria-label="Ver achado ${k + 1}: ${a[1]}"${k === 0 ? ' aria-current="true"' : ''}></button>`).join('')}</span>
          <button type="button" class="ach-prox" aria-label="Próximo achado">${SETA_D}</button>
        </div>
      </div>
    </div>
  </section>

  <section class="ocasiao" aria-labelledby="t-ocasiao">
    <div class="faixa">
      <div class="wrap faixa-grade">
        <div class="txt entra">
          <span class="rotulo" style="color:var(--tinta)">Ocasião do momento</span>
          <h2 class="gigante" id="t-ocasiao">O Natal está chegando.</h2>
          <p class="abre">Ideias para presentear a família, os amigos e quem mais estiver na sua lista.</p>
          <a class="btn btn-sec" href="https://oquedar.com/category/ocasiao/">Ver ideias por ocasião</a>
        </div>
      </div>
      <figure class="meia-lua"><img src="imagens/natal.jpg" alt="Presentes de Natal embrulhados em papel kraft com bolinhas, barbante e ramos de pinheiro" loading="lazy"></figure>
    </div>
  </section>

  <section class="bloco-secao" id="ideias" aria-labelledby="t-ideias" data-lembrete="Viu um artigo que combina com alguém? Toque no coração para guardar e ver depois em Favoritos.">
    <div class="wrap">
      <div class="cabeca">
        <h2 class="titulo" id="t-ideias">Sem ideia de <span class="marca-txt">presente?</span><span class="cursor-tag" aria-hidden="true"><i></i><b>A.G.</b></span></h2>
        <p class="abre">Ideias de presentes selecionadas para cada pessoa e ocasião.</p>
      </div>
      <div class="mosaico">${artigosPub.slice(0, 5).map(cartao).join('')}
      </div>
    </div>
  </section>

  <div class="onda" aria-hidden="true"><svg viewBox="0 0 1440 170" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="g-onda" x1="0" x2="1"><stop offset="0" stop-color="#FF6650"/><stop offset=".45" stop-color="#FF8A6E"/><stop offset=".75" stop-color="#F7A8C4"/><stop offset="1" stop-color="#C7B4F7"/></linearGradient><path id="onda-p" d="M-80 105 C 160 45, 420 45, 640 92 S 1060 140, 1270 88 S 1470 52, 1540 72"/></defs><use href="#onda-p" class="onda-fita"/><text class="onda-txt" dy=".36em"><textPath href="#onda-p" id="onda-tp">${[0, 1, 2].map(() => ['Aniversário', 'Natal', 'Dia das Mães', 'Amigo secreto', 'Dia dos Namorados', 'Dia dos Pais', 'Casa nova', 'Formatura', 'Casamento'].map(t => t + '  •  ').join('')).join('')}</textPath></text></svg></div>

  <section class="cats-sec" id="categorias" aria-labelledby="t-cats">
    <div class="wrap cats-grade">
      <div class="cats-esq">
        <h2 class="titulo" id="t-cats">Ou explore por categoria.</h2>
        <p class="abre">Escolha por quem vai receber, pela data ou pelo quanto quer gastar.</p>
        <figure class="reserva cats-previa c-rosa" id="cats-previa" aria-hidden="true"><img id="cats-previa-img" src="imagens/categorias/relacionamento.jpg" alt=""></figure>${cats.map(c => `<link rel="prefetch" href="imagens/categorias/${c[1]}.jpg">`).join('')}
      </div>
      <figure class="cats-cursor" id="cats-cursor" aria-hidden="true"><img id="cats-cursor-img" src="imagens/categorias/relacionamento.jpg" alt=""></figure>
      <ul class="cats" id="lista-cats">${cats.map((c, k) => `
        <li><a${k === 0 ? ' class="ativo"' : ''} href="${c[1] === 'interesse' ? 'layout-categoria.html' : 'https://oquedar.com/category/' + c[1] + '/'}" data-cor="${c[2]}" data-img="${c[3]}" data-slug="${c[1]}"><span class="titulo nome">${c[0]}</span><span class="seta" aria-hidden="true">${seta}</span></a></li>`).join('')}
      </ul>
    </div>
  </section>

  <div class="selo-ponte" aria-hidden="true"><div class="selo-clip"><div class="carimbo">
    <svg class="selo-giro" viewBox="0 0 200 200"><defs><path id="selo-circ" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs><text><textPath href="#selo-circ" textLength="462" lengthAdjust="spacing">IDEIAS DE PRESENTE · CURADORIA O QUE DAR? · </textPath></text></svg>
    <span class="selo-q"></span>
  </div></div></div>
  <section class="bloco-secao" aria-labelledby="t-como">
    <div class="wrap">
      <div class="cabeca">
        <h2 class="titulo" id="t-como">Como o OQD funciona.</h2>
        <p class="abre">Você chega com uma dúvida e sai com o presente e a loja certa.</p>
      </div>
      <ol class="fb">
        <svg class="fita" viewBox="0 0 1000 220" fill="none" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="g-fita" x1="0" x2="1"><stop offset="0" stop-color="#FF6650"/><stop offset=".55" stop-color="#FF8A6E"/><stop offset="1" stop-color="#F7A8C4"/></linearGradient></defs><path d="M0 150 C 120 30, 230 30, 340 110 S 540 210, 680 100 S 890 10, 1000 90" stroke="url(#g-fita)" pathLength="1"/></svg>
        <li class="c-lavanda entra"><span class="num">PASSO 1</span><h3 class="sub">A curadoria escolhe pelo perfil</h3><p>Cada lista é pensada para um tipo de pessoa, de interesse ou de ocasião.</p></li>
        <li class="c-rosa entra" data-atraso="120"><span class="num">PASSO 2</span><h3 class="sub">Comparamos as lojas</h3><p>Mostramos o preço na Amazon, no Mercado Livre e na Shopee, lado a lado.</p></li>
        <li class="c-pessego entra" data-atraso="240"><span class="num">PASSO 3</span><h3 class="sub">Você compra direto na loja</h3><p>A compra acontece no marketplace. O OQD não vende nem cobra nada.</p></li>
      </ol>
      <p class="transparencia"><span>Quando você compra por um link do OQD, podemos receber uma comissão da loja. Você não paga nada a mais por isso.</span><a class="link" href="https://oquedar.com/declaracao-de-afiliados/">Ler a declaração de afiliados</a></p>
    </div>
  </section>

  <section class="bloco-secao" aria-labelledby="t-news">
    <div class="wrap wrap-larga">
      <div class="na entra">
        <figure class="reserva fundo"><img src="imagens/newsletter.jpg" alt="Mulher de óculos escuros sorrindo ao abrir uma caixa de presente em forma de coração" loading="lazy" width="2400" height="961"></figure>
        <div class="vidro">
          <h2 class="titulo" id="t-news">Ideias de presentes sempre.</h2>
          <p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p>
        <form action="#" onsubmit="return false" aria-label="Assinar a newsletter">
          <label class="rotulo" for="email" style="color:var(--tinta)">Seu e-mail</label>
          <div class="campo"><input id="email" type="email" name="email" placeholder="seu@email.com" autocomplete="email" required><button class="btn btn-oferta" type="submit">Assinar</button></div>
          <small>O envio ainda não está conectado.</small>
        </form>
        </div>
      </div>
    </div>
  </section>

</main>
${rodape}
${scriptImgs([])}
<script>${JS_BASE}
(function(){
  var reduz=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* seleção arredondada: abre lista, teclado, troca de palavra até a pessoa mexer */
  var escs=[].slice.call(document.querySelectorAll('.esc')),parado=false;
  function escolhe(e,i){var lis=e.querySelectorAll('li'),b=e.querySelector('button');lis.forEach(function(l,k){l.setAttribute('aria-selected',k===i);});b.textContent=lis[i].textContent;b.setAttribute('aria-label',b.getAttribute('aria-label').split(':')[0]+': '+lis[i].textContent);e.querySelector('input').value=lis[i].textContent;}
  function idx(e){var lis=[].slice.call(e.querySelectorAll('li'));return lis.findIndex(function(l){return l.getAttribute('aria-selected')==='true';});}
  function fechaE(e,foco){e.querySelector('ul').hidden=true;e.querySelector('button').setAttribute('aria-expanded','false');if(foco)e.querySelector('button').focus();}
  function abreE(e){escs.forEach(function(x){if(x!==e)fechaE(x);});var ul=e.querySelector('ul');ul.hidden=false;e.querySelector('button').setAttribute('aria-expanded','true');var lis=ul.querySelectorAll('li');lis.forEach(function(l){l.classList.remove('foco');});e._f=Math.max(0,idx(e));lis[e._f].classList.add('foco');}
  escs.forEach(function(e){var b=e.querySelector('button'),ul=e.querySelector('ul'),lis=ul.querySelectorAll('li');
    b.addEventListener('click',function(){parado=true;ul.hidden?abreE(e):fechaE(e);});
    lis.forEach(function(l,i){l.addEventListener('click',function(){escolhe(e,i);fechaE(e,true);});});
    e.addEventListener('keydown',function(ev){var aberto=!ul.hidden;if(ev.key==='ArrowDown'||ev.key==='ArrowUp'){ev.preventDefault();parado=true;if(!aberto){abreE(e);return;}lis[e._f].classList.remove('foco');e._f=(e._f+(ev.key==='ArrowDown'?1:-1)+lis.length)%lis.length;lis[e._f].classList.add('foco');}else if((ev.key==='Enter'||ev.key===' ')&&aberto){ev.preventDefault();escolhe(e,e._f);fechaE(e,true);}else if(ev.key==='Escape'&&aberto){ev.stopPropagation();fechaE(e,true);}});
  });
  document.addEventListener('click',function(ev){escs.forEach(function(e){if(!e.contains(ev.target))fechaE(e);});});
  if(!reduz){var k=0;setInterval(function(){if(parado||document.hidden)return;var e=escs[k%2];var n=e.querySelectorAll('li').length;escolhe(e,(idx(e)+1)%n);var b=e.querySelector('button');b.classList.remove('troca');void b.offsetWidth;b.classList.add('troca');k++;},2600);}
  /* vitrine de achados: troca com setas, pontos e sozinha a cada 7s até a pessoa mexer */
  var vit=document.querySelector('.ach-vitrine');
  if(vit){var sl=vit.querySelectorAll('.ach-slide'),pts=vit.querySelectorAll('.ach-pontos button'),at=0,mexeu=false,dentro=false;
    function mostra(n){n=(n+sl.length)%sl.length;if(n===at)return;sl[at].setAttribute('inert','');sl[at].classList.remove('ativo','entrando');pts[at].removeAttribute('aria-current');at=n;sl[at].removeAttribute('inert');sl[at].classList.add('ativo');if(!reduz){void sl[at].offsetWidth;sl[at].classList.add('entrando');}pts[at].setAttribute('aria-current','true');}
    vit.querySelector('.ach-ant').onclick=function(){mexeu=true;mostra(at-1);};
    vit.querySelector('.ach-prox').onclick=function(){mexeu=true;mostra(at+1);};
    pts.forEach(function(p,k){p.onclick=function(){mexeu=true;mostra(k);};});
    vit.addEventListener('pointerenter',function(){dentro=true;});vit.addEventListener('pointerleave',function(){dentro=false;});vit.addEventListener('focusin',function(){mexeu=true;});
    if(!reduz)setInterval(function(){var r=vit.getBoundingClientRect();if(mexeu||dentro||document.hidden||r.bottom<0||r.top>innerHeight)return;mostra(at+1);},7000);
  }
  /* fita em onda: as ocasiões correm por dentro, param com o mouse em cima */
  var otp=document.getElementById('onda-tp');
  if(otp&&!reduz){var ciclo=otp.getComputedTextLength()/3,off=0,ult=0,ve=false,sobre=false,ond=otp.closest('.onda');
    ond.addEventListener('pointerenter',function(){sobre=true;});ond.addEventListener('pointerleave',function(){sobre=false;});
    if('IntersectionObserver' in window)new IntersectionObserver(function(es){ve=es[0].isIntersecting;}).observe(ond);else ve=true;
    (function passo(t){var dt=ult?Math.min(t-ult,64):0;ult=t;if(ve&&!sobre){off-=dt*.06;if(off<=-ciclo)off+=ciclo;otp.setAttribute('startOffset',off.toFixed(1));}requestAnimationFrame(passo);})(0);
  }
  /* marca-texto: acende quando aparece */
  var marcas=document.querySelectorAll('.marca-txt');
  if('IntersectionObserver' in window){var iom=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visto');iom.unobserve(e.target);}});},{rootMargin:'0px 0px -25% 0px'});marcas.forEach(function(m){iom.observe(m);});}else marcas.forEach(function(m){m.classList.add('visto');});
  /* a fita do "como funciona" se desenha quando aparece */
  var fb=document.querySelector('.fb');if(fb&&'IntersectionObserver' in window){var io2=new IntersectionObserver(function(es){if(es[0].isIntersecting){fb.classList.add('desenhar');io2.disconnect();}},{rootMargin:'0px 0px -20% 0px'});io2.observe(fb);}else if(fb)fb.classList.add('desenhar');
  /* categoria ativa troca o retrato à esquerda */
  var prev=document.getElementById('cats-previa'),pt=document.getElementById('cats-previa-img'),links=document.querySelectorAll('#lista-cats a');
  function ativa(a){links.forEach(function(x){x.classList.toggle('ativo',x===a);});prev.className='reserva cats-previa c-'+a.dataset.cor;pt.src='imagens/categorias/'+a.dataset.slug+'.jpg';}
  links.forEach(function(a){a.addEventListener('mouseenter',function(){ativa(a);});a.addEventListener('focus',function(){ativa(a);});});
  /* foto da categoria acompanha o mouse, com um leve atraso */
  var cc=document.getElementById('cats-cursor'),cci=document.getElementById('cats-cursor-img'),lista=document.getElementById('lista-cats');
  if(cc&&matchMedia('(hover:hover) and (pointer:fine)').matches){var tx=0,ty=0,x=0,y=0,anda=false;
    function mexe(){x+=(tx-x)*(reduz?1:.18);y+=(ty-y)*(reduz?1:.18);cc.style.transform='translate('+(x+24)+'px,'+(y-150)+'px)';if(Math.abs(tx-x)>.5||Math.abs(ty-y)>.5)requestAnimationFrame(mexe);else anda=false;}
    lista.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!cc.classList.contains('on')){x=tx;y=ty;}cc.classList.add('on');if(!anda){anda=true;requestAnimationFrame(mexe);}});
    lista.addEventListener('mouseleave',function(){cc.classList.remove('on');});
    links.forEach(function(a){a.addEventListener('mouseenter',function(){cci.src='imagens/categorias/'+a.dataset.slug+'.jpg';});});
    addEventListener('scroll',function(){cc.classList.remove('on');},{passive:true});
  }
})();
</script>
</body>
</html>`;
// dados estruturados da inicial: o site (com a busca interna) e a marca
const LD_HOME = [
  { '@context': 'https://schema.org', '@type': 'WebSite', name: 'O que dar?', alternateName: 'OQD', url: 'https://oquedar.com/', inLanguage: 'pt-BR',
    potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://oquedar.com/buscar/?q={search_term_string}' }, 'query-input': 'required name=search_term_string' } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'O que dar?', url: 'https://oquedar.com/', logo: 'https://oquedar.com/imagens/icone.png' },
];
fs.writeFileSync(path.join(OUT, 'layout-alta-fidelidade.html'), home.replace('</head>', LD_HOME.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n') + '\n</head>'));
console.log('inicial ok', Math.round(home.length / 1024) + 'KB');
