// Ajuste 21 (21/11/2026): abertura sem "para um colega" e com 4 fotos pequenas de momentos felizes
// em volta do título, misturadas às etiquetas (inspiração: pin 299982025202315395, sem copiar).
// Corrige também o círculo no "Um achado": o selo girando usava a classe .selo, a mesma do rótulo "Melhor oferta".
const fs = require('fs');
const f = __dirname + '/inicial.js'; let s = fs.readFileSync(f, 'utf8');
fs.writeFileSync(f.replace('.js', '.antes-ajuste-21.js'), s);
function troca(a, b, todos) { if (!s.includes(a)) { console.error('NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = todos ? s.split(a).join(b) : s.replace(a, b); }

// 1) selo girando: classe própria (.carimbo)
troca('<div class="selo-ponte" aria-hidden="true"><div class="selo">', '<div class="selo-ponte" aria-hidden="true"><div class="carimbo">');
troca('.selo{position:absolute;right:-64px;', '.carimbo{position:absolute;right:-64px;');
troca('.selo::before{', '.carimbo::before{');
troca('@media (max-width:900px){.selo{width:168px;', '@media (max-width:900px){.carimbo{width:168px;');

// 2) abertura: sai "para um colega", entram as fotos
troca('<span class="vid v4"><i></i>para um colega</span>', '');
const fotos = [['m1', 'abraco', 'Duas amigas se abraçando numa comemoração'], ['m2', 'aniversario', 'Casais comemorando um aniversário'], ['m3', 'presentinho', 'Mulher sorrindo com um pequeno presente nas mãos'], ['m4', 'luzes', 'Mulher abrindo um presente entre luzinhas']];
troca('<span class="vid v5"><i></i>Natal</span>', '<span class="vid v5"><i></i>Natal</span>' + fotos.map(([c, n]) => `<span class="mom ${c}"><img src="imagens/${n}.jpg" alt="" width="480" height="600" decoding="async"></span>`).join(''));
troca('.v4,.v5,.anel{display:none}',
  '.v4,.v5,.anel{display:none}\n' +
  '/* fotos de momentos felizes em volta do título */\n' +
  '.mom{display:none}\n' +
  '.ab-centro .mom{display:block;position:absolute;z-index:0;aspect-ratio:4/5;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(28,26,31,.16);border:3px solid rgba(255,255,255,.75);animation:flutua-m 7s var(--curva) infinite alternate}\n' +
  '.ab-centro .mom img{display:block;width:100%;height:100%;object-fit:cover}\n' +
  '.ab-centro .vid{z-index:1}\n' +
  '.ab-centro .m1{left:11%;top:11%;width:92px;rotate:-7deg;filter:blur(.6px) saturate(.95)}\n' +
  '.ab-centro .m2{right:12%;top:9%;width:118px;rotate:6deg;animation-delay:-3s}\n' +
  '.ab-centro .m3{left:2%;top:47%;width:86px;rotate:5deg;filter:blur(1.2px);opacity:.92;animation-delay:-5s}\n' +
  '.ab-centro .m4{right:5%;bottom:13%;width:128px;rotate:-5deg;animation-delay:-1.5s}\n' +
  '@keyframes flutua-m{to{transform:translateY(-12px)}}\n' +
  '@media (max-width:900px){.ab-centro .m1,.ab-centro .m3{display:none}.ab-centro .m2{right:auto;left:44%;top:4%;width:70px}.ab-centro .m4{right:2%;bottom:2%;width:78px}}');
// a posição da antiga etiqueta "para um colega" fica para a foto
troca('.ab-centro .v4{display:inline-flex}\n', '');
fs.writeFileSync(f, s); console.log('inicial.js ok');
