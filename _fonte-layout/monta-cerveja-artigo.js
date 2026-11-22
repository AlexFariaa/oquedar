// Põe as marcações de título no texto da outra IA (presentes para quem gosta de cerveja). Rodar uma vez.
// Uso: node _fonte-layout/monta-cerveja-artigo.js <texto-bruto.txt>
const fs = require('fs'), path = require('path');
const L = fs.readFileSync(process.argv[2], 'utf8').trim().split(/\r?\n/).map(s => s.trim()).filter(Boolean);
const H2 = new Set([
  'Cervejas e kits para presentear quem aprecia novos sabores',
  'Copos, taças e canecas para servir cerveja',
  'Acessórios térmicos para manter a cerveja gelada',
  'Presentes para montar um bar de cerveja em casa',
  'Livros, kits e jogos para aprender e se divertir',
  'Como escolher presentes para quem gosta de cerveja?',
  'Perguntas frequentes sobre presentes para quem gosta de cerveja',
  'Como acertar na escolha do presente para um apreciador de cerveja?',
]);
let faq = false;
const out = L.map((l, i) => {
  if (i === 0) return '# ' + l;
  if (H2.has(l)) { faq = l.startsWith('Perguntas'); return '## ' + l; }
  if (/^\d+\. /.test(l)) return '### ' + l;
  if (faq && l.endsWith('?')) return '### ' + l;
  return l;
});
const dir = path.join(__dirname, '..', 'conteudo', 'posts', 'presentes-para-quem-gosta-de-cerveja');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'artigo.md'), out.join('\n\n') + '\n');
console.log(out.filter(x => x.startsWith('#')).length, 'títulos;', out.filter(x => /^### \d/.test(x)).length, 'presentes');
