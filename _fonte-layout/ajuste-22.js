// Ajuste 22 (21/11/2026): abertura mais equilibrada. Alternância foto/etiqueta dos dois lados,
// só uma etiqueta encostando numa foto, e a etiqueta "Natal" volta para fechar 4 fotos + 4 etiquetas.
// O bloco entra depois das regras antigas da abertura centralizada, para valer sobre elas.
const fs = require('fs');
const f = __dirname + '/inicial.js'; let s = fs.readFileSync(f, 'utf8');
fs.writeFileSync(f.replace('.js', '.antes-ajuste-22.js'), s);
function troca(a, b) { if (!s.includes(a)) { console.error('NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.replace(a, b); }
troca('.ab-centro .m1{left:11%;top:11%;width:92px;rotate:-7deg;filter:blur(.6px) saturate(.95)}\n' +
      '.ab-centro .m2{right:12%;top:9%;width:118px;rotate:6deg;animation-delay:-3s}\n' +
      '.ab-centro .m3{left:2%;top:47%;width:86px;rotate:5deg;filter:blur(1.2px);opacity:.92;animation-delay:-5s}\n' +
      '.ab-centro .m4{right:5%;bottom:13%;width:128px;rotate:-5deg;animation-delay:-1.5s}\n', '');
troca('@media (max-width:900px){.ab-centro .m1,.ab-centro .m3{display:none}.ab-centro .m2{right:auto;left:44%;top:4%;width:70px}.ab-centro .m4{right:2%;bottom:2%;width:78px}}', '');
troca('@media (max-width:900px){\n  .abertura h1,',
      '/* abertura: lado esquerdo foto, etiqueta, foto, etiqueta; lado direito etiqueta sobre a ponta da foto, foto, etiqueta, foto */\n' +
      '.ab-centro .m1{left:5%;top:12%;width:104px;rotate:-7deg;filter:blur(.5px) saturate(.95)}\n' +
      '.ab-centro .v1{left:9%;top:34%;right:auto;bottom:auto}\n' +
      '.ab-centro .m3{left:14%;top:50%;width:84px;rotate:5deg;filter:blur(1.2px);opacity:.92;animation-delay:-5s}\n' +
      '.ab-centro .v3{left:3%;bottom:13%;top:auto;right:auto}\n' +
      '.ab-centro .v2{right:8%;top:17%;left:auto;bottom:auto;z-index:2}\n' +
      '.ab-centro .m2{right:4%;top:22%;width:116px;rotate:6deg;animation-delay:-3s}\n' +
      '.ab-centro .v5{display:inline-flex;right:13%;left:auto;top:auto;bottom:34%}\n' +
      '.ab-centro .m4{right:3%;bottom:9%;width:120px;rotate:-5deg;animation-delay:-1.5s}\n' +
      '@media (max-width:900px){\n' +
      '  .ab-centro .v5,.ab-centro .m1,.ab-centro .m3{display:none}\n' +
      '  .ab-centro .v1{left:0;top:6%}.ab-centro .v2{right:0;top:auto;bottom:40%}.ab-centro .v3{left:6%;bottom:4%}\n' +
      '  .ab-centro .m2{right:6%;top:0;width:74px}.ab-centro .m4{right:auto;left:42%;bottom:28%;width:68px}\n' +
      '}\n' +
      '@media (max-width:900px){\n  .abertura h1,');
fs.writeFileSync(f, s); console.log('inicial.js ok');
