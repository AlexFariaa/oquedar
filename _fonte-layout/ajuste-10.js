// Ajuste 10 (19/11/2026): faixa dos 14 presentes, prós e contras fechados no celular, modelos de celular para comparar,
// etiquetas coloridas, abertura centralizada (variante), marca-texto da curadora, caixa de favoritos com cor.
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-10.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}

// ---------------- ARTIGO ----------------
const CSS_NOVO_ART = `
/* faixa com os 14 presentes */
.faixa-prod{margin-bottom:var(--e5);-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}
.faixa-prod ol{display:flex;gap:var(--e3);overflow-x:auto;scroll-snap-type:x mandatory;padding:var(--e1) var(--e6) var(--e3) 0;scrollbar-width:thin}
.faixa-prod li{flex:none;width:116px;scroll-snap-align:start}
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
.marca{background:linear-gradient(var(--lavanda),var(--lavanda)) no-repeat 0 88%/0% 92%;border-radius:4px;padding:0 3px;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-size 1.3s var(--curva)}
.marca.visto,.no-js .marca{background-size:100% 92%}
.cursor-tag{display:inline-flex;align-items:center;gap:4px;vertical-align:middle;margin-left:4px;opacity:0;transform:translateY(4px);transition:opacity .4s var(--curva) 1.1s,transform .4s var(--curva) 1.1s;white-space:nowrap}
.cursor-tag i{display:inline-block;width:2px;height:1.2em;background:var(--coral);border-radius:2px}
.cursor-tag b{font-size:var(--t-rotulo);font-weight:var(--peso-forte);line-height:1;background:var(--coral);color:var(--tinta);border-radius:var(--pilula);padding:4px 8px;letter-spacing:0}
.marca.visto + .cursor-tag{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.marca{transition:none}.cursor-tag{transition:none}}

/* barra fixa e gaveta do celular (modelo "barra") */
.barra-mob,.folha{display:none}
@media (max-width:900px){
  .m-barra .indice-movel{display:none}
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
`;

const BARRA = `<nav class="barra-mob" aria-label="Atalhos do artigo">
  <button type="button" data-folha="indice"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>Índice</button>
  <button type="button" data-folha="presentes">14 presentes</button>
  <button type="button" data-abre-fav>\${CORACAO}Favoritos <span data-fav-n="presentes">0</span></button>
</nav>
<div class="folha" id="folha" role="dialog" aria-labelledby="folha-t" hidden>
  <div class="folha-topo"><b class="sub" id="folha-t">Neste artigo</b><button class="btn btn-sec btn-peq" type="button" id="folha-x">Fechar</button></div>
  <ol id="folha-indice">\${listaIndice}</ol>
  <ol id="folha-presentes" hidden>\${P.map((p, i) => \`<li><a href="#p-\${i + 1}"><span class="mini-f c-\${p.cor}">\${imgProd(i)}</span><span><b>\${String(i + 1).padStart(2, '0')}</b> \${esc(nomes[i])}</span></a></li>\`).join('')}</ol>
</div>
`;

const JS_MODELOS = `
  /* prós e contras fechados no celular */
  if(matchMedia('(max-width:900px)').matches)document.querySelectorAll('.pc-det').forEach(function(d){d.open=false;});
  /* marca-texto: acende quando aparece */
  var marcas=document.querySelectorAll('.marca');
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
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!folha.hidden)folha.hidden=true;});`;

patch('artigo.js', [
  ['<div class="filtro" role="group" aria-label="Filtrar por faixa de preço">',
   '<nav class="faixa-prod" aria-label="Os 14 presentes desta lista"><ol>${P.map((p, i) => `<li><a href="#p-${i + 1}"><span class="fp-img c-${p.cor}"><span class="fp-n">${String(i + 1).padStart(2, \'0\')}</span>${imgProd(i)}</span><span class="fp-t">${esc(nomes[i])}</span></a></li>`).join(\'\')}</ol></nav>\n          <div class="filtro" role="group" aria-label="Filtrar por faixa de preço">'],
  ['<div class="pc">', '<details class="pc-det" open><summary>Prós e contras</summary><div class="pc">'],
  ['</ul></div>\n          </div>\n          ${comparador(p, i)}', '</ul></div>\n          </div></details>\n          ${comparador(p, i)}'],
  ['@media (max-width:560px){\n  .pc{grid-template-columns:1fr}', CSS_NOVO_ART + '\n@media (max-width:900px){.pc-det summary{display:flex}.pc-det[open] .pc{padding-top:var(--e4)}.pc-det .pc{border-top:0}}\n@media (max-width:560px){\n  .pc{grid-template-columns:1fr}'],
  ['<body>\n<div class="progresso" id="progresso" aria-hidden="true"></div>', '<body>\n<script>(function(){var m=new URLSearchParams(location.search).get(\'modelo\');if(m)m.split(\',\').forEach(function(x){document.documentElement.classList.add(\'m-\'+x);});})();</script>\n<div class="progresso" id="progresso" aria-hidden="true"></div>'],
  ['</main>\n<div class="popup"', '</main>\n' + BARRA + '<div class="popup"'],
  ['  var mov=document.querySelector(\'.indice-movel\');', JS_MODELOS + '\n  var mov=document.querySelector(\'.indice-movel\');'],
  // caixa de favoritos com cor
  ['.favs-lado{background:#fff;border-radius:var(--raio);padding:var(--e4)}', '.favs-lado{background:var(--rosa);border-radius:var(--raio);padding:var(--e5) var(--e4) var(--e4)}\n.favs-lado .fav-tit{display:flex;align-items:center;gap:var(--e2);color:var(--tinta)}\n.favs-lado .fav-tit svg{width:18px;height:18px;color:var(--coral);fill:var(--coral)}\n.favs-lado p{color:var(--tinta)}'],
  ['<span class="rotulo">Seus favoritos</span>', '<span class="rotulo fav-tit">${CORACAO}Seus favoritos</span>'],
  ['<button class="btn btn-sec btn-peq" type="button" data-abre-fav>Ver favoritos</button>', '<button class="btn btn-escuro btn-peq" type="button" data-abre-fav>Ver favoritos</button>'],
  // marca-texto da curadora em três frases do texto real
  ["fs.writeFileSync(path.join(OUT, 'layout-artigo.html'), artigo);",
   `const marca = (h, txt) => h.replace(txt, '<span class="marca">' + txt + '</span><span class="cursor-tag" aria-hidden="true"><i></i><b>A.G.</b></span>');
let artigoM = marca(artigo, '“como você sabia que eu ia gostar disso?”');
artigoM = marca(artigoM, 'O segredo está em pensar qual desses presentes realmente combina com a pessoa que vai receber.');
artigoM = marca(artigoM, 'Essas respostas já eliminam várias opções.');
fs.writeFileSync(path.join(OUT, 'layout-artigo.html'), artigoM);
// página para comparar os modelos de celular lado a lado
const fr = (t, d, q) => \`<figure class="cel"><figcaption><b>\${t}</b><span>\${d}</span></figcaption><div class="moldura"><iframe src="layout-artigo.html?\${q}" title="\${t}" loading="lazy"></iframe></div></figure>\`;
const comp = \`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Modelos de celular · Artigo</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700&display=swap" rel="stylesheet">
<style>body{margin:0;background:#F4F2F0;color:#1C1A1F;font-family:"Bricolage Grotesque",system-ui,sans-serif;padding:40px 24px}h1{font-size:40px;letter-spacing:-.03em;margin:0 0 8px}p.i{color:#5E5963;max-width:60ch;margin:0 0 32px;line-height:1.5}
.grade{display:flex;gap:28px;overflow-x:auto;padding-bottom:24px}.cel{margin:0;flex:none;width:390px}.cel figcaption{display:flex;flex-direction:column;gap:4px;margin-bottom:12px;min-height:66px}.cel b{font-size:20px}.cel span{color:#5E5963;font-size:14px;line-height:1.4}
.moldura{width:390px;height:780px;border-radius:44px;border:10px solid #1C1A1F;overflow:hidden;background:#fff;box-shadow:0 30px 60px rgba(28,26,31,.18)}iframe{width:100%;height:100%;border:0}</style></head><body>
<h1>Artigo no celular: modelos</h1><p class="i">Todos já têm a faixa com os 14 presentes e os prós e contras fechados. Role dentro de cada celular para comparar. Os modelos podem ser combinados.</p>
<div class="grade">
\${fr('Base', 'Faixa dos 14 presentes e prós e contras fechados.', 'modelo=base#selecao')}
\${fr('1 · Cartão compacto', 'Foto pequena ao lado do nome, só a melhor oferta e a análise recolhida.', 'modelo=compacto#selecao')}
\${fr('3 · Barra fixa embaixo', 'Índice, lista dos 14 presentes e favoritos ao alcance do polegar.', 'modelo=barra#p-1')}
\${fr('4 · Comparativo em lista', 'A tabela vira uma lista, sem rolar para o lado.', 'modelo=lista#comp')}
\${fr('Tudo junto', 'Compacto, barra fixa e comparativo em lista.', 'modelo=compacto,barra,lista#selecao')}
</div></body></html>\`;
fs.writeFileSync(path.join(OUT, 'opcoes-celular.html'), comp);`],
]);

// ---------------- INICIAL ----------------
const CSS_NOVO_HOME = `/* etiquetas coloridas */
.cena .v1{background:rgba(216,203,250,.88)}
.cena .v2{background:rgba(248,207,219,.9)}
.cena .v3{background:rgba(255,216,201,.92)}
.cena .v4{background:rgba(255,216,201,.92)}
.cena .v5{background:rgba(216,203,250,.88)}
.cena .vid{border-color:rgba(255,255,255,.7)}
.v4,.v5,.anel{display:none}
.marca-h{position:relative}

/* variante: título centralizado com os tópicos em volta */
.ab-centro .abertura .wrap{justify-items:center;text-align:center}
.ab-centro .abertura .selo-topo{justify-self:center}
.ab-centro .abertura h1{max-width:15ch;margin-inline:auto}
.ab-centro .abertura .abre{grid-column:3/span 8;margin-inline:auto}
.ab-centro .cta{justify-content:center}
.ab-centro .abertura .mancha{right:auto;left:50%;margin-left:min(-31vw,-450px);top:0}
.ab-centro .anel{display:block;position:absolute;left:50%;top:50%;width:min(78vw,1000px);aspect-ratio:1;border-radius:50%;border:1.5px dashed rgba(255,255,255,.85);transform:translate(-50%,-50%);pointer-events:none}
.ab-centro .cena{position:absolute;inset:0;width:auto;height:auto;right:0;top:0;pointer-events:none}
.ab-centro .v4,.ab-centro .v5{display:inline-flex}
.ab-centro .v1{left:0;top:16%;right:auto;bottom:auto}
.ab-centro .v2{right:0;top:12%;left:auto;bottom:auto}
.ab-centro .v3{left:4%;bottom:14%;top:auto;right:auto}
.ab-centro .v4{right:2%;bottom:24%}
.ab-centro .v5{right:10%;top:48%}
.ab-centro .marca-h{background:linear-gradient(var(--lavanda),var(--lavanda)) no-repeat 0 82%/100% 46%;border-radius:6px}
.ab-centro .marca-h::after{content:"você";position:absolute;right:-.2em;top:-.45em;font-size:var(--t-rotulo);font-weight:var(--peso-forte);letter-spacing:0;line-height:1;background:var(--coral);color:var(--tinta);border-radius:var(--pilula);padding:5px 9px;transform:rotate(4deg)}
@media (max-width:900px){.ab-centro .cena{position:relative;inset:auto;height:260px}.ab-centro .abertura .abre{grid-column:1/-1}.ab-centro .anel{display:none}.ab-centro .v4{right:0;bottom:6%}.ab-centro .v5{left:30%;right:auto;top:40%}}

/* busca escura */`;

patch('inicial.js', [
  ['/* busca escura */', CSS_NOVO_HOME],
  ['<span class="vid v3"><i></i>até R$ 150</span>', '<span class="vid v3"><i></i>até R$ 150</span><span class="vid v4"><i></i>para um colega</span><span class="vid v5"><i></i>Natal</span>'],
  ['<h1 class="gigante" id="t-abertura">Ideias de presente para todas as pessoas e ocasiões.</h1>', '<h1 class="gigante" id="t-abertura">Ideias de presente para <span class="marca-h">todas as pessoas</span> e ocasiões.</h1>'],
  ['<div class="mancha" aria-hidden="true"></div>\n    <div class="wrap">\n      <span class="tag selo-topo">', '<div class="mancha" aria-hidden="true"></div><div class="anel" aria-hidden="true"></div>\n    <div class="wrap">\n      <span class="tag selo-topo">'],
  ["<body>\n${cab('')}", "<body>\n<script>if(new URLSearchParams(location.search).get('abertura')==='centro')document.documentElement.classList.add('ab-centro');</script>\n${cab('')}"],
]);
