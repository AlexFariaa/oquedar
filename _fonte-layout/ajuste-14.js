// Ajuste 14 (19/11/2026): movimento.
// 1) "Um achado. Três lojas." vira vitrine com 3 achados e palavra gigante atrás do produto, que troca junto.
// 3) Títulos sobem palavra por palavra quando aparecem (todas as páginas).
// 5) Cartões de "Sem ideia de presente?" sobem como livros numa estante; os vizinhos recuam.
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-14.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}

// ---------- 3) títulos palavra por palavra (base: vale para as três páginas) ----------
patch('base.js', [
  ['.js .entra.visto{opacity:1;transform:none}',
   '.js .entra.visto{opacity:1;transform:none}\n/* títulos palavra por palavra */\n.partido .pal{display:inline-block;opacity:0;transform:translateY(.45em) rotate(2deg);transition:opacity .6s var(--curva),transform .8s var(--curva);transition-delay:calc(var(--i) * 70ms)}\n.partido .pal-el{opacity:0;transition:opacity .7s var(--curva);transition-delay:calc(var(--i) * 70ms)}\n.partido.visto .pal,.partido.visto .pal-el{opacity:1;transform:none}'],
  ["  var itens=document.querySelectorAll('.entra');",
   "  /* títulos: cada palavra vira uma peça que sobe */\n  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){\n    var tits=document.querySelectorAll('h1.gigante,h2.titulo,h2.gigante');\n    var iot=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visto');iot.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px'});\n    tits.forEach(function(h){var i=0;[].slice.call(h.childNodes).forEach(function(n){if(n.nodeType===3){var fr=document.createDocumentFragment();n.textContent.split(/(\\s+)/).forEach(function(w){if(!w)return;if(/^\\s+$/.test(w)){fr.appendChild(document.createTextNode(w));return;}var s=document.createElement('span');s.className='pal';s.style.setProperty('--i',i++);s.textContent=w;fr.appendChild(s);});h.replaceChild(fr,n);}else if(n.nodeType===1&&!n.classList.contains('sr-only')&&!n.classList.contains('cursor-tag')){n.classList.add('pal-el');n.style.setProperty('--i',i++);}});h.classList.add('partido');iot.observe(h);});\n  }\n  var itens=document.querySelectorAll('.entra');"],
  // depois de entrar, o atraso sai (para o hover não esperar)
  ["el.style.transitionDelay=(el.dataset.atraso||0)+'ms';el.classList.add('visto');",
   "el.style.transitionDelay=(el.dataset.atraso||0)+'ms';el.classList.add('visto');setTimeout(function(){el.style.transitionDelay='';},1200);"],
]);

// ---------- inicial ----------
const ACHADO_ANTIGO = `      <div class="achado">
        <div class="foto c-lavanda entra">
          <span class="nota"><span class="meta">Nota OQD</span><b>\${p0.nota}</b><span class="exemplo">exemplo</span></span>
          \${imgProd(0)}
        </div>
        <div class="info entra" data-atraso="80">
          <div class="tags"><span class="tag">Para quem joga</span><span class="tag">Interesse</span></div>
          <h3 class="sub">Bola de Basquete Wilson NBA DRV Series</h3>
          <p>Se a pessoa que você vai presentear realmente joga basquete, uma bola provavelmente está entre as escolhas mais certeiras.</p>
          <a class="link" href="layout-artigo.html#p-1">Ver no artigo de basquete</a>
          \${comparador(p0, 0, { vidro: true })}
        </div>
      </div>`;

const SETA_E = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
const SETA_D = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

patch('inicial.js', [
  ["const { fs, path, OUT, esc, P, reais, melhorIdx, nomes,", "const { fs, path, OUT, esc, P, reais, melhorIdx, nomes, produtosTxt,"],
  // dados da vitrine (textos reais do artigo de basquete)
  ["const p0 = P[0];",
   "const p0 = P[0];\n" +
   "const ACHADOS = [[0, 'Bola', 0, ['Para quem joga', 'Interesse']], [1, 'Caneca', 1, ['Fã da NBA', 'Interesse']], [4, 'Funko', 1, ['Colecionador', 'Interesse']]];\n" +
   "const achadoSlide = ([i, palavra, par, tags], k) => `\n" +
   "      <div class=\"achado ach-slide${k === 0 ? ' ativo' : ''}\" role=\"group\" aria-roledescription=\"achado\" aria-label=\"${k + 1} de ${ACHADOS.length}\"${k ? ' hidden' : ''}>\n" +
   "        <div class=\"foto c-${P[i].cor}\">\n" +
   "          <span class=\"ach-palavra\" aria-hidden=\"true\">${palavra}</span>\n" +
   "          <span class=\"nota\"><span class=\"meta\">Nota OQD</span><b>${P[i].nota}</b><span class=\"exemplo\">exemplo</span></span>\n" +
   "          ${imgProd(i)}\n" +
   "        </div>\n" +
   "        <div class=\"info\">\n" +
   "          <div class=\"tags\">${tags.map(t => `<span class=\"tag\">${t}</span>`).join('')}</div>\n" +
   "          <h3 class=\"sub\">${esc(nomes[i])}</h3>\n" +
   "          <p>${produtosTxt[i].itens[par].x}</p>\n" +
   "          <a class=\"link\" href=\"layout-artigo.html#p-${i + 1}\">Ver no artigo de basquete</a>\n" +
   "          ${comparador(P[i], i, { vidro: true })}\n" +
   "        </div>\n" +
   "      </div>`;\n" +
   "const SETA_E = '" + SETA_E + "', SETA_D = '" + SETA_D + "';"],
  [ACHADO_ANTIGO,
   "      <div class=\"ach-vitrine entra\" aria-roledescription=\"carrossel\" aria-label=\"Achados da curadoria\">${ACHADOS.map(achadoSlide).join('')}\n" +
   "        <div class=\"ach-ctrl\">\n" +
   "          <button type=\"button\" class=\"ach-ant\" aria-label=\"Achado anterior\">${SETA_E}</button>\n" +
   "          <span class=\"ach-pontos\">${ACHADOS.map((a, k) => `<button type=\"button\" aria-label=\"Ver achado ${k + 1}: ${a[1]}\"${k === 0 ? ' aria-current=\"true\"' : ''}></button>`).join('')}</span>\n" +
   "          <button type=\"button\" class=\"ach-prox\" aria-label=\"Próximo achado\">${SETA_D}</button>\n" +
   "        </div>\n" +
   "      </div>"],
  ['${scriptImgs([0])}', '${scriptImgs([0, 1, 4])}'],
  // CSS da vitrine
  ['.achado .info .comparador{margin-top:auto;padding:var(--e3)}',
   '.achado .info .comparador{margin-top:auto;padding:var(--e3)}\n' +
   '.ach-palavra{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);z-index:0;font-size:clamp(5rem,13vw,12.5rem);font-weight:var(--peso-forte);letter-spacing:-.06em;line-height:.8;color:rgba(255,255,255,.78);white-space:nowrap;pointer-events:none}\n' +
   '.achado .foto .img-prod{z-index:1}\n' +
   '.achado .foto .nota{z-index:2}\n' +
   '.ach-slide.entrando .ach-palavra{animation:palavra-entra .9s var(--curva) both}\n' +
   '.ach-slide.entrando .img-prod{animation:prod-entra .9s var(--curva) .08s both}\n' +
   '.ach-slide.entrando .info > *{animation:sobe .7s var(--curva) both}\n' +
   '.ach-slide.entrando .info > :nth-child(2){animation-delay:.05s}.ach-slide.entrando .info > :nth-child(3){animation-delay:.1s}.ach-slide.entrando .info > :nth-child(n+4){animation-delay:.15s}\n' +
   '@keyframes palavra-entra{from{opacity:0;transform:translate(-30%,-50%)}}\n' +
   '@keyframes prod-entra{from{opacity:0;transform:translateY(24px) scale(.9) rotate(-6deg)}}\n' +
   '.ach-ctrl{display:flex;align-items:center;justify-content:flex-end;gap:var(--e3);margin-top:var(--e5)}\n' +
   '.ach-ctrl > button{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:0;background:var(--tinta);color:var(--fundo);cursor:pointer;transition:transform .16s var(--curva)}\n' +
   '.ach-ctrl > button:active{transform:scale(.94)}\n' +
   '.ach-ctrl svg{width:18px;height:18px}\n' +
   '.ach-pontos{display:flex;gap:var(--e2);margin-right:auto}\n' +
   '.ach-pontos button{width:10px;height:10px;padding:0;border:0;border-radius:var(--pilula);background:var(--fio-forte, rgba(28,26,31,.25));cursor:pointer;transition:width .4s var(--curva),background .3s}\n' +
   '.ach-pontos button[aria-current="true"]{width:32px;background:var(--tinta)}\n' +
   '@media (pointer:coarse){.ach-pontos button{position:relative}.ach-pontos button::after{content:"";position:absolute;inset:-17px -8px}}'],
  // 5) estante: o cartão sobe, os vizinhos recuam
  ['@media (hover:hover){.art:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(70,30,40,.10)}}',
   '.js .mosaico .art-item.entra{transition:opacity .7s var(--curva),transform .7s var(--curva),translate .55s cubic-bezier(.34,1.56,.64,1),filter .4s var(--curva)}\n' +
   '.art{transition:box-shadow .4s var(--curva)}\n' +
   '@media (hover:hover){\n' +
   '  .mosaico .art-item:hover{translate:0 -14px}\n' +
   '  .mosaico .art-item:hover .art{box-shadow:0 28px 50px rgba(70,30,40,.16)}\n' +
   '  .mosaico:has(.art-item:hover) .art-item.visto:not(:hover){opacity:.62;filter:saturate(.7)}\n' +
   '}\n' +
   '@media (prefers-reduced-motion:reduce){.mosaico .art-item:hover{translate:none}}'],
  // título do hero: sai a subida inteira, entra palavra por palavra
  ['.js .abertura h1{animation-delay:.08s}', '.js .abertura h1{animation-delay:.08s}\n.js .abertura h1.partido{animation:none}'],
  // JS da vitrine
  ['  /* marca-texto: acende quando aparece */',
   "  /* vitrine de achados: troca com setas, pontos e sozinha a cada 7s até a pessoa mexer */\n" +
   "  var vit=document.querySelector('.ach-vitrine');\n" +
   "  if(vit){var sl=vit.querySelectorAll('.ach-slide'),pts=vit.querySelectorAll('.ach-pontos button'),at=0,mexeu=false,dentro=false;\n" +
   "    function mostra(n){n=(n+sl.length)%sl.length;if(n===at)return;sl[at].hidden=true;sl[at].classList.remove('ativo','entrando');pts[at].removeAttribute('aria-current');at=n;sl[at].hidden=false;sl[at].classList.add('ativo');if(!reduz){void sl[at].offsetWidth;sl[at].classList.add('entrando');}pts[at].setAttribute('aria-current','true');}\n" +
   "    vit.querySelector('.ach-ant').onclick=function(){mexeu=true;mostra(at-1);};\n" +
   "    vit.querySelector('.ach-prox').onclick=function(){mexeu=true;mostra(at+1);};\n" +
   "    pts.forEach(function(p,k){p.onclick=function(){mexeu=true;mostra(k);};});\n" +
   "    vit.addEventListener('pointerenter',function(){dentro=true;});vit.addEventListener('pointerleave',function(){dentro=false;});vit.addEventListener('focusin',function(){mexeu=true;});\n" +
   "    if(!reduz)setInterval(function(){var r=vit.getBoundingClientRect();if(mexeu||dentro||document.hidden||r.bottom<0||r.top>innerHeight)return;mostra(at+1);},7000);\n" +
   "  }\n" +
   "  /* marca-texto: acende quando aparece */"],
]);
