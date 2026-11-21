// Ajuste 12 (19/11/2026): busca sem degradê e com "O que dar?" grande, Natal com título grande
// e foto em meia-lua na borda direita (ou sem foto: ?natal=sem), marca-texto em "Sem ideia de presente?".
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-12.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}

patch('inicial.js', [
  // busca: sem brilhos; "O que dar?" grande no pé da seção, como no rodapé
  ['.busca .brilho{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;opacity:.55}\n.busca .b1{width:min(48vw,640px);aspect-ratio:1;left:-12vw;top:-18%;background:radial-gradient(circle,#FF6650 0%,transparent 68%)}\n.busca .b2{width:min(44vw,600px);aspect-ratio:1;right:-10vw;bottom:-30%;background:radial-gradient(circle,#C7B4F7 0%,transparent 68%)}\n.busca .b3{width:min(30vw,420px);aspect-ratio:1;right:24%;top:-20%;background:radial-gradient(circle,#F7A8C4 0%,transparent 68%);opacity:.35}\n',
   '.busca{padding-bottom:0}\n.busca .palavra{font-size:clamp(4rem,15vw,14rem);font-weight:var(--peso-forte);letter-spacing:-.055em;line-height:.78;color:var(--rosa);margin:var(--e8) 0 0 -.05em;white-space:nowrap;transform:translateY(.12em)}\n.busca .palavra span{color:var(--coral)}\n'],
  ['    <div class="brilho b1" aria-hidden="true"></div><div class="brilho b2" aria-hidden="true"></div><div class="brilho b3" aria-hidden="true"></div>\n', ''],
  ['        <a class="tag" href="https://oquedar.com/tag/gamer">Gamer</a>\n      </div>\n    </div>\n  </section>',
   '        <a class="tag" href="https://oquedar.com/tag/gamer">Gamer</a>\n      </div>\n      <p class="palavra" aria-hidden="true">O que <span>dar?</span></p>\n    </div>\n  </section>'],

  // Natal: título grande de novo e foto em meia-lua grudada na direita
  ['.faixa .gigante{font-size:clamp(3rem,5.6vw,5.5rem);line-height:.95}', '.faixa .gigante{font-size:clamp(3.5rem,9vw,9rem);line-height:.88;letter-spacing:-.05em}'],
  ['.faixa .txt{grid-column:1/span 8;', '.faixa .txt{grid-column:1/span 7;'],
  ['.faixa .reserva.q{position:relative;left:auto;top:auto;transform:none;grid-column:9/span 4;justify-self:end;width:clamp(160px,28vw,400px)}',
   '.meia-lua{position:absolute;right:0;top:50%;transform:translateY(-50%);height:min(84%,760px);aspect-ratio:1/2;margin:0;border-radius:999px 0 0 999px;overflow:hidden;box-shadow:-30px 30px 80px rgba(28,26,31,.18)}\n.meia-lua img{width:100%;height:100%;object-fit:cover;object-position:35% 50%}\n.natal-sem .meia-lua{display:none}\n.natal-sem .faixa .txt{grid-column:1/-1}'],
  ['  .faixa .txt,.faixa .reserva.q{grid-column:1/-1}\n  .faixa .reserva.q{justify-self:start;order:-1;width:140px}\n  .faixa{min-height:0}',
   '  .faixa .txt{grid-column:1/-1}\n  .faixa{min-height:0;padding-top:300px}\n  .meia-lua{top:var(--e6);transform:none;height:240px}\n  .natal-sem .faixa{padding-top:clamp(96px,12vw,176px)}'],
  ['        <figure class="reserva q foto-q"><img src="imagens/natal.jpg" alt="Presentes de Natal embrulhados em papel kraft com bolinhas, barbante e ramos de pinheiro" loading="lazy"></figure>\n      </div>\n    </div>',
   '      </div>\n      <figure class="meia-lua"><img src="imagens/natal.jpg" alt="Presentes de Natal embrulhados em papel kraft com bolinhas, barbante e ramos de pinheiro" loading="lazy"></figure>\n    </div>'],
  ["document.documentElement.classList.add('ab-centro');</script>",
   "document.documentElement.classList.add('ab-centro');if(new URLSearchParams(location.search).get('natal')==='sem')document.documentElement.classList.add('natal-sem');</script>"],

  // "Sem ideia de presente?" com marca-texto
  ['<h2 class="titulo" id="t-ideias">Sem ideia de presente?</h2>',
   '<h2 class="titulo" id="t-ideias">Sem ideia de <span class="marca-txt">presente?</span><span class="cursor-tag" aria-hidden="true"><i></i><b>A.G.</b></span></h2>'],
  ['@media (max-width:900px){\n  .abertura h1,',
   '/* marca-texto (igual ao do artigo) */\n.marca-txt{background:linear-gradient(var(--lavanda),var(--lavanda)) no-repeat 0 88%/0% 92%;border-radius:6px;padding:0 6px;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-size 1.3s var(--curva)}\n.marca-txt.visto{background-size:100% 92%}\n.cursor-tag{display:inline-flex;align-items:center;gap:4px;vertical-align:middle;margin-left:6px;opacity:0;transform:translateY(4px);transition:opacity .4s var(--curva) 1.1s,transform .4s var(--curva) 1.1s;white-space:nowrap}\n.cursor-tag i{display:inline-block;width:2px;height:1em;background:var(--coral);border-radius:2px}\n.cursor-tag b{font-size:var(--t-rotulo);font-weight:var(--peso-forte);line-height:1;background:var(--coral);color:var(--tinta);border-radius:var(--pilula);padding:4px 8px;letter-spacing:0}\n.marca-txt.visto + .cursor-tag{opacity:1;transform:none}\n@media (prefers-reduced-motion:reduce){.marca-txt,.cursor-tag{transition:none}}\n\n@media (max-width:900px){\n  .abertura h1,'],
  ['  /* a fita do "como funciona" se desenha quando aparece */',
   "  /* marca-texto: acende quando aparece */\n  var marcas=document.querySelectorAll('.marca-txt');\n  if('IntersectionObserver' in window){var iom=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visto');iom.unobserve(e.target);}});},{rootMargin:'0px 0px -25% 0px'});marcas.forEach(function(m){iom.observe(m);});}else marcas.forEach(function(m){m.classList.add('visto');});\n  /* a fita do \"como funciona\" se desenha quando aparece */"],
]);
