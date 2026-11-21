// Ajuste 19 (19/11/2026): selo só entre "categorias" e "Como o OQD funciona";
// a faixa de ocasiões (Aniversário, Natal...) vira uma fita em onda, como a do "Como funciona", com as frases correndo dentro.
const fs = require('fs');
const f = __dirname + '/inicial.js'; let s = fs.readFileSync(f, 'utf8');
fs.writeFileSync(f.replace('.js', '.antes-ajuste-19.js'), s);
function troca(a, b) { if (!s.includes(a)) { console.error('NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }

// 1) selo muda de lugar
const i0 = s.indexOf('  <div class="selo-ponte" aria-hidden="true">');
const i1 = s.indexOf('</div></div>', i0) + '</div></div>\n'.length;
if (i0 < 0 || i1 < i0) { console.error('selo nao achado'); process.exit(1); }
const SELO = s.slice(i0, i1);
s = s.slice(0, i0) + s.slice(i1);
troca('  <section class="bloco-secao" aria-labelledby="t-como">', SELO + '  <section class="bloco-secao" aria-labelledby="t-como">');

// 2) fita em onda com as ocasiões correndo
const OCAS = "['Aniversário', 'Natal', 'Dia das Mães', 'Amigo secreto', 'Dia dos Namorados', 'Dia dos Pais', 'Casa nova', 'Formatura', 'Casamento']";
const antigo = s.slice(s.indexOf('  <div class="corre" aria-hidden="true">'), s.indexOf('</div></div>', s.indexOf('  <div class="corre" aria-hidden="true">')) + '</div></div>'.length);
troca(antigo,
  '  <div class="onda" aria-hidden="true"><svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMid meet"><defs>' +
  '<linearGradient id="g-onda" x1="0" x2="1"><stop offset="0" stop-color="#FF6650"/><stop offset=".45" stop-color="#FF8A6E"/><stop offset=".75" stop-color="#F7A8C4"/><stop offset="1" stop-color="#C7B4F7"/></linearGradient>' +
  '<path id="onda-p" d="M-80 160 C 160 40, 420 40, 640 130 S 1060 240, 1270 130 S 1470 50, 1540 90"/></defs>' +
  '<use href="#onda-p" class="onda-fita"/>' +
  '<text class="onda-txt" dy=".36em"><textPath href="#onda-p" id="onda-tp">${[0, 1, 2].map(() => ' + OCAS + '.map(t => t + \'  •  \').join(\'\')).join(\'\')}</textPath></text></svg></div>');

troca('.corre{margin-top:var(--secao);',
  '/* fita em onda com as ocasiões */\n' +
  '.onda{margin-top:var(--secao);overflow:hidden}\n' +
  '.onda svg{display:block;position:relative;left:50%;width:max(100%,960px);height:auto;transform:translateX(-50%);overflow:visible}\n' +
  '.onda-fita{fill:none;stroke:url(#g-onda);stroke-width:66;stroke-linecap:butt;filter:drop-shadow(0 12px 18px rgba(255,102,80,.22))}\n' +
  '.onda-txt{font-family:var(--fonte);font-size:27px;font-weight:var(--peso-forte);letter-spacing:-.01em;fill:var(--tinta);white-space:pre}\n' +
  '.corre{margin-top:var(--secao);');

troca('  /* marca-texto: acende quando aparece */',
  "  /* fita em onda: as ocasiões correm por dentro, param com o mouse em cima */\n" +
  "  var otp=document.getElementById('onda-tp');\n" +
  "  if(otp&&!reduz){var ciclo=otp.getComputedTextLength()/3,off=0,ult=0,ve=false,sobre=false,ond=otp.closest('.onda');\n" +
  "    ond.addEventListener('pointerenter',function(){sobre=true;});ond.addEventListener('pointerleave',function(){sobre=false;});\n" +
  "    if('IntersectionObserver' in window)new IntersectionObserver(function(es){ve=es[0].isIntersecting;}).observe(ond);else ve=true;\n" +
  "    (function passo(t){var dt=ult?Math.min(t-ult,64):0;ult=t;if(ve&&!sobre){off-=dt*.06;if(off<=-ciclo)off+=ciclo;otp.setAttribute('startOffset',off.toFixed(1));}requestAnimationFrame(passo);})(0);\n" +
  "  }\n" +
  "  /* marca-texto: acende quando aparece */");

fs.writeFileSync(f, s); console.log('inicial.js ok');
