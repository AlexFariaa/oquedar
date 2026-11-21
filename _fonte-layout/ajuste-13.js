// Ajuste 13 (19/11/2026): título da busca vira o começo da frase que o "O que dar?" grande completa.
const fs = require('fs');
const f = __dirname + '/inicial.js'; let s = fs.readFileSync(f, 'utf8');
fs.writeFileSync(f.replace('.js', '.antes-ajuste-13.js'), s);
const a = '<h2 class="titulo" id="t-busca">O que dar de presente?</h2>';
if (!s.includes(a)) { console.error('NAO ACHEI'); process.exit(1); }
s = s.replace(a, '<h2 class="titulo" id="t-busca">Monte a frase e descubra<span class="sr-only"> o que dar de presente</span>…</h2>');
if (!s.includes('.sr-only{')) s = s.replace('/* busca escura */', '.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n/* busca escura */');
fs.writeFileSync(f, s); console.log('inicial.js ok');
