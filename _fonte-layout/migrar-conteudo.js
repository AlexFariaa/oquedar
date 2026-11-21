// Migração única: leva os 5 posts para conteudo/posts/<slug>/ (texto.txt + post.json).
// post.json guarda tudo o que a página precisa e os produtos com os links reais de cada loja.
// Os preços e notas de exemplo NÃO são migrados: a página só mostra dados reais.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..');
const DESTINO = path.join(RAIZ, 'conteudo', 'posts');
const src = fs.readFileSync(path.join(__dirname, 'posts.js'), 'utf8');
const DADOS = eval('(' + src.slice(src.indexOf('const DADOS = {') + 'const DADOS = '.length, src.indexOf('\n};', src.indexOf('const DADOS = {')) + 2) + ')');
const AMBIENTE = eval('(' + src.match(/const AMBIENTE = (\{[^\n]*\});/)[1] + ')');
const B = require('./base.js');
const CORES = ['lavanda', 'rosa', 'pessego'];
const cats = { 'presentes-para-quem-gosta-de-basquete': ['interesse'], 'presente-para-quem-gosta-de-correr': ['interesse', 'ocasiao'], 'presentes-para-homens-30-anos': ['genero', 'idade'], 'presente-1-mes-de-namoro': ['namoro'], 'presente-dia-dos-namorados': ['namoro', 'relacionamento'] };
const cartaoK = { 'presentes-para-quem-gosta-de-basquete': 0, 'presente-para-quem-gosta-de-correr': 1, 'presente-dia-dos-namorados': 2, 'presentes-para-homens-30-anos': 3, 'presente-1-mes-de-namoro': 4 };
const isoDe = { 0: '2026-08-14', 1: '2026-06-23', 2: '2026-06-11', 3: '2026-06-05', 4: '2026-06-03' };
const links = slug => JSON.parse(fs.readFileSync(path.join(__dirname, 'posts', slug + '.links.json'), 'utf8'));
const lojasDe = (slug, n) => { const l = links(slug)[n] || {}; const o = {}; for (const k of ['amazon', 'ml', 'shopee']) if (l[k]) o[k] = { url: l[k] }; return o; };

function grava(slug, post, textoArq) {
  const dir = path.join(DESTINO, slug); fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(textoArq, path.join(dir, 'texto.txt'));
  fs.writeFileSync(path.join(dir, 'post.json'), JSON.stringify(post, null, 2));
  console.log(slug, post.produtos.length, 'produtos', post.produtos.filter(p => Object.keys(p.lojas).length).length, 'com link');
}

// basquete (o post aprovado no layout)
{
  const slug = 'presentes-para-quem-gosta-de-basquete', k = cartaoK[slug], a = B.artigos[k];
  const pouco = [[0, 'Melhor no geral', 'Útil de verdade para quem joga ou está começando.'], [1, 'Melhor custo', 'Entra na rotina e mostra que você conhece o time.'], [2, 'Mais criativo', 'Foge das roupas e deixa o quarto com a cara da pessoa.']];
  const post = {
    slug, status: 'publicado', data: isoDe[k], publicar: isoDe[k] + 'T09:00:00-03:00',
    titulo: a.t, titleTag: 'Presente para Quem Gosta de Basquete: 14 Ideias Criativas', desc: 'Confira 14 ideias de presente para quem gosta de basquete, com opções criativas para fãs da NBA e apaixonados pelo esporte.',
    categorias: cats[slug], cat: a.cat, trilha: 'interesse', trilhaAtual: 'Basquete', cor: a.cor, pre: '',
    capa: { src: 'imagens/basquete-capa.avif', alt: a.alt }, cartao: { src: a.foto, alt: a.alt },
    fatos: [['14 ideias', 'da bola ao Funko'], ['5 perfis de fã', 'quem joga, quem coleciona, quem decora'], ['3 lojas comparadas', 'Amazon, Mercado Livre e Shopee']],
    pouco, posNemTodo: 10,
    marcas: ['“como você sabia que eu ia gostar disso?”', 'O segredo está em pensar qual desses presentes realmente combina com a pessoa que vai receber.', 'Essas respostas já eliminam várias opções.'],
    links: [['presentes para homens de 30 anos', 'presentes-para-homens-30-anos.html']],
    produtos: B.P.map((p, i) => ({ img: i === 2 ? 'imagens/produtos/p3.avif' : `imagens/produtos/p${i + 1}-r.webp`, alt: B.PROD_ALT[i], cheia: i === 2, cor: p.cor, perfil: p.perfil, pros: p.pros, contras: p.contras, lojas: lojasDe(slug, i + 1) })),
  };
  grava(slug, post, path.join(__dirname, 'basquete.txt'));
}
// os outros 4
for (const [slug, X] of Object.entries(DADOS)) {
  const k = cartaoK[slug], a = B.artigos[k];
  const imgs = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts', slug + '.imagens.json'), 'utf8'));
  const capaIntro = imgs.find(x => x.nome === 'capa');
  const post = {
    slug, status: 'publicado', data: isoDe[k], publicar: isoDe[k] + 'T09:00:00-03:00',
    titulo: a.t, categorias: cats[slug], cat: a.cat, trilha: X.trilha[1].replace('categoria-', '').replace('.html', ''), trilhaAtual: X.atual, cor: a.cor, pre: X.pre,
    capa: capaIntro ? { src: `imagens/posts/${slug}/${capaIntro.arq}`, alt: capaIntro.alt } : { src: a.foto, alt: a.alt }, cartao: { src: a.foto, alt: a.alt },
    fatos: X.fatos, pouco: X.pouco, posNemTodo: X.nemTodo || null, marcas: X.marcas || [], links: [],
    produtos: X.p.map((d, i) => {
      const im = imgs.find(x => x.nome === 'p' + (i + 1)), amb = (AMBIENTE[slug] || []).includes(i + 1);
      return { img: im ? (amb ? `imagens/posts/${slug}/${im.arq}` : `imagens/posts/${slug}/p${i + 1}-r.webp`) : '', alt: im && im.alt ? im.alt : '', cheia: amb, cor: CORES[i % 3], perfil: d[0], pros: d[3], contras: d[4], lojas: lojasDe(slug, i + 1) };
    }),
  };
  grava(slug, post, path.join(__dirname, 'posts', slug + '.txt'));
}
