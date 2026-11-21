// Troca os links do oquedar.com antigo (WordPress) pelas páginas geradas aqui.
// Nesta etapa os nomes ainda são "planos" (slug.html); o final.js transforma em endereços de pasta (/slug/).
const fs = require('fs'), path = require('path');
const { OUT } = require('./base.js');
const POSTS = fs.readdirSync(path.join(__dirname, '..', 'conteudo', 'posts'));
const PAGS = ['sobre-nos', 'contato', 'termos-de-uso', 'politica-privacidade', 'declaracao-de-afiliados'];
const arquivos = fs.readdirSync(OUT).filter(f => /^(layout-alta-fidelidade|categoria-[a-z]+)\.html$/.test(f) || POSTS.includes(f.replace('.html', '')) || PAGS.includes(f.replace('.html', '')));
for (const f of arquivos) {
  let h = fs.readFileSync(path.join(OUT, f), 'utf8'), antes = h;
  h = h.replace(/https:\/\/oquedar\.com\/category\/([a-z-]+)\/?/g, 'categoria-$1.html');
  h = h.replace(new RegExp('https://oquedar\\.com/(' + PAGS.join('|') + ')/?(?=["#])', 'g'), '$1.html');
  h = h.replace(new RegExp('https://oquedar\\.com/(' + POSTS.join('|') + ')/?(?=["#])', 'g'), '$1.html');
  // etiquetas do WordPress (não existem no site novo) -> categoria mais próxima
  const TAG = { mulher: 'genero', homem: 'genero', namorado: 'namoro', amiga: 'relacionamento', mae: 'relacionamento', gamer: 'interesse' };
  h = h.replace(/https:\/\/oquedar\.com\/tag\/([a-z-]+)\/?/g, (m, t) => 'categoria-' + (TAG[t] || 'interesse') + '.html');
  h = h.split('layout-artigo.html').join('presentes-para-quem-gosta-de-basquete.html').split('layout-categoria.html').join('categoria-interesse.html');
  if (h !== antes) fs.writeFileSync(path.join(OUT, f), h);
}
console.log('links ok', arquivos.length, 'páginas');
