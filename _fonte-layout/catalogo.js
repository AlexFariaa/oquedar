// Mantém catalogo/produtos.json: todos os produtos pesquisados, com os dados por loja e o histórico de preços,
// e em quais posts cada um foi usado. Rodar depois de criar/atualizar posts: node _fonte-layout/catalogo.js
// Produtos pesquisados que não entraram em post ficam no catálogo (campo usado_em vazio).
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..'), CONT = path.join(RAIZ, 'conteudo', 'posts'), ARQ = path.join(RAIZ, 'catalogo', 'produtos.json');
fs.mkdirSync(path.dirname(ARQ), { recursive: true });
const cat = fs.existsSync(ARQ) ? JSON.parse(fs.readFileSync(ARQ, 'utf8')) : { produtos: [] };
const porChave = new Map(cat.produtos.map(p => [p.id, p]));
const idDe = p => { const u = Object.values(p.lojas || {}).map(l => l.url).filter(Boolean)[0] || ''; return (p.id || u || p.nome || '').toString(); };

for (const d of fs.readdirSync(CONT)) {
  const arq = path.join(CONT, d, 'post.json'); if (!fs.existsSync(arq)) continue;
  const post = JSON.parse(fs.readFileSync(arq, 'utf8'));
  const textoArq = ['artigo.md', 'texto.txt'].map(a => path.join(CONT, d, a)).find(a => fs.existsSync(a));
  const nomes = textoArq ? (fs.readFileSync(textoArq, 'utf8').match(/^(?:H2: |## )\d+\. .*$/gm) || []).map(l => l.replace(/^(H2: |## )\d+\. /, '').trim()) : [];
  post.produtos.forEach((p, i) => {
    const id = idDe(Object.assign({ nome: p.nome || nomes[i] }, p));
    const atual = porChave.get(id) || { id, nome: p.nome || nomes[i] || '', img: p.img, alt: p.alt, lojas: {}, usado_em: [] };
    atual.nome = atual.nome || p.nome || nomes[i] || ''; atual.img = p.img || atual.img; atual.alt = p.alt || atual.alt;
    for (const [k, l] of Object.entries(p.lojas || {})) {
      const a = atual.lojas[k] = atual.lojas[k] || { historico: [] };
      a.url = l.url || a.url;
      for (const c of ['nota', 'avaliacoes']) if (l[c] != null) a[c] = l[c];
      if (l.preco > 0 && !a.historico.some(h => h.data === l.verificado && h.preco === l.preco)) a.historico.push({ data: l.verificado, preco: l.preco });
    }
    const uso = `${post.slug}#p-${i + 1}`; if (!atual.usado_em.includes(uso)) atual.usado_em.push(uso);
    porChave.set(id, atual);
  });
}
cat.produtos = [...porChave.values()]; cat.atualizado = new Date().toISOString();
fs.writeFileSync(ARQ, JSON.stringify(cat, null, 2));
console.log('catálogo:', cat.produtos.length, 'produtos,', cat.produtos.filter(p => p.usado_em.length).length, 'usados em posts');
