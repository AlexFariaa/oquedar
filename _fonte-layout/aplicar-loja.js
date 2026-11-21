// Aplica uma pesquisa de loja (ML ou Shopee) nos posts.
// Uso: node _fonte-layout/aplicar-loja.js ml _fonte-layout/pesquisa-ml.json 2026-11-21
// A pesquisa é { "<índice em pesquisa-lista.json>": { afiliado, url, preco, nota, av } | { faltou } }.
const fs = require('fs'), path = require('path');
const [loja, arqPesq, data] = process.argv.slice(2);
if (!loja || !arqPesq || !data) { console.error('uso: node aplicar-loja.js <ml|shopee> <pesquisa.json> <aaaa-mm-dd>'); process.exit(1); }
const RAIZ = path.join(__dirname, '..');
const lista = require('./pesquisa-lista.json');
const pesq = JSON.parse(fs.readFileSync(path.resolve(arqPesq), 'utf8'));
const posts = {}, faltam = [];
for (const [i, r] of Object.entries(pesq)) {
  const [slug, n, nome] = lista[i];
  const arq = path.join(RAIZ, 'conteudo', 'posts', slug, 'post.json');
  const post = posts[slug] = posts[slug] || JSON.parse(fs.readFileSync(arq, 'utf8'));
  const p = post.produtos[n - 1]; p.lojas = p.lojas || {};
  if (!r.afiliado) { delete p.lojas[loja]; faltam.push(`${slug} #${n} ${nome}${r.faltou ? ' (' + r.faltou + ')' : ''}`); continue; }
  const o = { url: r.afiliado, preco: r.preco || null, verificado: data };
  if (r.nota) o.nota = r.nota; if (r.av) o.avaliacoes = r.av;
  if (!o.preco) delete o.preco;
  p.lojas[loja] = o;
}
for (const [slug, post] of Object.entries(posts)) fs.writeFileSync(path.join(RAIZ, 'conteudo', 'posts', slug, 'post.json'), JSON.stringify(post, null, 2));
console.log(loja, 'aplicado em', Object.keys(posts).length, 'posts;', Object.keys(pesq).length - faltam.length, 'produtos com link');
if (faltam.length) console.log('sem ' + loja + ':\n  ' + faltam.join('\n  '));
