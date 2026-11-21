// Ajuste 18 (19/11/2026): selo colorido girando no canto inferior direito da abertura,
// meio para fora da tela e atravessando para a seção escura da busca. Texto preto em volta, Q no centro.
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-18.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}
const TEXTO = 'IDEIAS DE PRESENTE · CURADORIA O QUE DAR? · ';
const SELO = `
  <div class="selo-ponte" aria-hidden="true"><div class="selo">
    <svg class="selo-giro" viewBox="0 0 200 200"><defs><path id="selo-circ" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs><text><textPath href="#selo-circ" textLength="462" lengthAdjust="spacing">${TEXTO}</textPath></text></svg>
    <span class="selo-q"></span>
  </div></div>
`;
patch('inicial.js', [
  ['  <section class="busca" id="buscar" aria-labelledby="t-busca">', SELO + '  <section class="busca" id="buscar" aria-labelledby="t-busca">'],
  ['/* busca escura */',
   '/* selo girando entre a abertura e a busca */\n' +
   '.selo-ponte{position:relative;height:0;z-index:5}\n' +
   '.selo{position:absolute;right:-64px;top:-118px;width:236px;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;background:conic-gradient(from 200deg,#FF6650,#F7A8C4,#C7B4F7,#FFD8C9,#FF6650);box-shadow:0 24px 50px rgba(28,26,31,.22)}\n' +
   '.selo::before{content:"";position:absolute;inset:30%;border-radius:50%;background:var(--fundo)}\n' +
   '.selo-giro{position:absolute;inset:0;width:100%;height:100%;animation:selo-gira 24s linear infinite}\n' +
   '.selo-giro text{font-family:var(--fonte);font-size:15.5px;font-weight:var(--peso-forte);letter-spacing:.06em;fill:var(--tinta)}\n' +
   '.selo-q{position:relative;width:52px;height:74px;background:var(--tinta);-webkit-mask:url(imagens/logo-oquedar.png) -54px -24px/151px 151px no-repeat;mask:url(imagens/logo-oquedar.png) -54px -24px/151px 151px no-repeat}\n' +
   '@keyframes selo-gira{to{transform:rotate(360deg)}}\n' +
   '@media (max-width:900px){.selo{width:168px;right:-52px;top:-84px}.selo-q{transform:scale(.72)}}\n' +
   '@media (prefers-reduced-motion:reduce){.selo-giro{animation:none}}\n' +
   '/* busca escura */'],
]);
