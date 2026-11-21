// Ajuste 11 (19/11/2026): artigo no celular, faixas sem barra com setas, "qual presente combina" com fotos,
// barra fixa e lista como padrão, fontes padronizadas, abertura centralizada mais clara e simétrica.
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-11.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}

const SETAS = '<div class="fp-setas"><button type="button" class="fp-ant" aria-label="Ver anteriores" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><button type="button" class="fp-prox" aria-label="Ver próximos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>';

patch('artigo.js', [
  // ajudante: cartão de miniatura (faixa da seleção e "qual presente combina")
  ["const idDe = nome => 'p-' + (nomes.indexOf(nome) + 1);",
   "const idDe = nome => 'p-' + (nomes.indexOf(nome) + 1);\nconst SETAS = '" + SETAS.replace(/'/g, "\\'") + "';\nconst fpItem = i => `<li><a href=\"#p-${i + 1}\"><span class=\"fp-img c-${P[i].cor}\"><span class=\"fp-n\">${String(i + 1).padStart(2, '0')}</span>${imgProd(i)}</span><span class=\"fp-t\">${esc(nomes[i])}</span></a></li>`;"],
  // faixa da seleção: setas e mesma função
  ['<nav class="faixa-prod" aria-label="Os 14 presentes desta lista"><ol>${P.map((p, i) => `<li><a href="#p-${i + 1}"><span class="fp-img c-${p.cor}"><span class="fp-n">${String(i + 1).padStart(2, \'0\')}</span>${imgProd(i)}</span><span class="fp-t">${esc(nomes[i])}</span></a></li>`).join(\'\')}</ol></nav>',
   '<nav class="faixa-prod" aria-label="Os 14 presentes desta lista">${SETAS}<ol>${P.map((p, i) => fpItem(i)).join(\'\')}</ol></nav>'],
  // "qual presente combina": fotos lado a lado
  ["lista.push(`<li><a href=\"#${idDe(b.x)}\">${esc(b.x)}</a></li>`)", "lista.push(fpItem(nomes.indexOf(b.x)))"],
  ["const fecha = () => { if (lista.length) { h += `<ul class=\"marcadores\">${lista.join('')}</ul>\\n`; lista = []; } };\n  for (const b of qualCombina.itens) {",
   "const fecha = () => { if (lista.length) { h += `<nav class=\"faixa-prod faixa-qual\" aria-label=\"Presentes deste perfil\">${SETAS}<ol>${lista.join('')}</ol></nav>\\n`; lista = []; } };\n  for (const b of qualCombina.itens) {"],
  // CSS da faixa: sem barra, fotos maiores, setas
  ['.faixa-prod{margin-bottom:var(--e5);-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}\n.faixa-prod ol{display:flex;gap:var(--e3);overflow-x:auto;scroll-snap-type:x mandatory;padding:var(--e1) var(--e6) var(--e3) 0;scrollbar-width:thin}\n.faixa-prod li{flex:none;width:116px;scroll-snap-align:start}',
   '.faixa-prod{position:relative;margin-bottom:var(--e5)}\n.faixa-prod ol{display:flex;gap:var(--e3);overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:var(--e1) 0 var(--e2);scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 85%,transparent);mask-image:linear-gradient(90deg,#000 85%,transparent)}\n.faixa-prod ol::-webkit-scrollbar{display:none}\n.faixa-prod.fim ol{-webkit-mask-image:none;mask-image:none}\n.faixa-prod li{flex:none;width:156px;scroll-snap-align:start}\n.fp-setas{display:flex;justify-content:flex-end;gap:var(--e2);margin-bottom:var(--e3)}\n.fp-setas button{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:0;background:var(--tinta);color:var(--fundo);cursor:pointer;transition:opacity .2s var(--curva),transform .16s var(--curva)}\n.fp-setas button:active{transform:scale(.94)}\n.fp-setas button:disabled{opacity:.25;cursor:default}\n.fp-setas svg{width:18px;height:18px}\n.faixa-qual{margin-top:var(--e4)}\n.faixa-qual .fp-setas{margin-top:calc(var(--e4) * -1)}\n@media (max-width:900px){.faixa-prod li{width:44vw;max-width:180px}}'],
  // JS das setas
  ['  /* prós e contras fechados no celular */',
   "  /* faixas de miniaturas: setas e fim da faixa */\n  document.querySelectorAll('.faixa-prod').forEach(function(n){var ol=n.querySelector('ol'),a=n.querySelector('.fp-ant'),p=n.querySelector('.fp-prox');function at(){var fim=ol.scrollLeft+ol.clientWidth>=ol.scrollWidth-4;a.disabled=ol.scrollLeft<4;p.disabled=fim;n.classList.toggle('fim',fim);}a.onclick=function(){ol.scrollBy({left:-ol.clientWidth*.8,behavior:'smooth'});};p.onclick=function(){ol.scrollBy({left:ol.clientWidth*.8,behavior:'smooth'});};ol.addEventListener('scroll',at,{passive:true});at();});\n  /* prós e contras fechados no celular */"],
  // primeiro parágrafo da introdução no mesmo tamanho dos outros
  ['.intro p:first-child{font-size:var(--t-abertura);line-height:1.5}\n', ''],
  // "Nem todo fã" menor
  ['<h2 class="titulo" id="t-nemtodo">', '<h2 class="sub" id="t-nemtodo">'],
  ['.pausa .falas p{font-size:var(--t-sub);', '.pausa .falas p{font-size:var(--t-abertura);'],
  // celular: tira o resumo "14 ideias...", "Neste artigo" em lilás
  ['.indice-movel{display:block;margin-bottom:var(--e7);background:#fff;border-radius:var(--raio);border:1px solid var(--fio)}',
   '.indice-movel{display:block;margin-bottom:var(--e7);background:var(--lavanda);border-radius:var(--raio);border:0}\n  .indice-movel a:hover{background:rgba(255,255,255,.5)}\n  .capa-lado{display:none}'],
  ['  .m-barra .indice-movel{display:none}\n', ''],
  // barra fixa e comparativo em lista como padrão no celular
  ["var m=new URLSearchParams(location.search).get('modelo');if(m)m.split(',').forEach(function(x){document.documentElement.classList.add('m-'+x);});",
   "var m=new URLSearchParams(location.search).get('modelo');(m?m.split(','):['barra','lista']).forEach(function(x){document.documentElement.classList.add('m-'+x);});"],
  ["fs.writeFileSync(path.join(OUT, 'opcoes-celular.html'), comp);", '// (comparação dos modelos de celular encerrada: barra fixa e lista escolhidas)'],
]);

patch('inicial.js', [
  ['<span class="tag-voce" aria-hidden="true"><i></i><b>você</b></span>', ''],
  ['.ab-centro .abertura .mancha{right:auto;left:50%;margin-left:min(-31vw,-450px);top:0}', '.ab-centro .abertura .mancha{right:auto;left:50%;margin-left:min(-31vw,-450px);top:2%;opacity:.5}'],
  ['.ab-centro .v1{left:0;top:16%;right:auto;bottom:auto}', '.ab-centro .v1{left:2%;top:24%;right:auto;bottom:auto}'],
  ['.ab-centro .v2{right:0;top:12%;left:auto;bottom:auto}', '.ab-centro .v2{right:2%;top:24%;left:auto;bottom:auto}'],
  ['.ab-centro .v3{left:4%;bottom:14%;top:auto;right:auto}', '.ab-centro .v3{left:6%;bottom:18%;top:auto;right:auto}'],
  ['.ab-centro .v4{right:2%;bottom:24%}', '.ab-centro .v4{right:6%;bottom:18%}'],
  ['.ab-centro .v4,.ab-centro .v5{display:inline-flex}', '.ab-centro .v4{display:inline-flex}'],
  ['.ab-centro .anel{display:block;position:absolute;left:50%;top:50%;', '.ab-centro .anel{display:block;position:absolute;left:50%;top:52%;'],
]);
