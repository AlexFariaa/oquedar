// Ajuste 14b: corrige o escape do \s dentro do template do JS_BASE e aumenta a palavra da vitrine.
const fs = require('fs');
let s = fs.readFileSync(__dirname + '/base.js', 'utf8');
const BS = String.fromCharCode(92);
const a = 'split(/(' + BS + 's+)/)', b = 'split(/(' + BS + BS + 's+)/)';
const c = '/^' + BS + 's+$/.test', d = '/^' + BS + BS + 's+$/.test';
if (!s.includes(a) || !s.includes(c)) { console.error('nao achei'); process.exit(1); }
s = s.replace(a, b).replace(c, d);
fs.writeFileSync(__dirname + '/base.js', s);
let t = fs.readFileSync(__dirname + '/inicial.js', 'utf8');
const e = 'font-size:clamp(5rem,13vw,12.5rem);font-weight:var(--peso-forte);letter-spacing:-.06em';
if (!t.includes(e)) { console.error('nao achei 2'); process.exit(1); }
t = t.replace(e, 'font-size:clamp(5.5rem,19vw,17rem);font-weight:var(--peso-forte);letter-spacing:-.06em');
t = t.replace('.achado .foto .img-prod{z-index:1}', '.achado .foto .img-prod{z-index:1;padding:17%}');
fs.writeFileSync(__dirname + '/inicial.js', t);
console.log('ok');
