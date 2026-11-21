// Gera todos os posts a partir de conteudo/posts/<slug>/:
//   post.json  -> dados do post (categoria, capa, destaques, produtos com links/preços/notas reais por loja, status e data)
//   artigo.md  -> texto do artigo escrito pela A.G. (ou texto.txt, nos posts migrados do WordPress)
// Só entram no site os posts "publicado" e os "agendado" cuja data de publicação já chegou.
const fs = require('fs'), path = require('path');
const B = require('./base.js');
const { OUT } = B;
const { montaArtigo, lePost } = require('./modelo-artigo.js');

const RAIZ = path.join(__dirname, '..'), CONT = path.join(RAIZ, 'conteudo', 'posts');
const AGORA = new Date(process.env.OQD_AGORA || Date.now());
const CATNOME = { relacionamento: 'Relacionamento', idade: 'Idade', genero: 'Gênero', interesse: 'Interesse', profissao: 'Profissão', ocasiao: 'Ocasião', preco: 'Preço', namoro: 'Namoro' };
const CORES = ['lavanda', 'rosa', 'pessego'];
const dataLonga = iso => new Date(iso + 'T12:00:00-03:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' });
const publicado = p => p.status === 'publicado' || (p.status === 'agendado' && new Date(p.publicar) <= AGORA);

const todos = fs.readdirSync(CONT).filter(d => fs.existsSync(path.join(CONT, d, 'post.json'))).map(d => Object.assign(JSON.parse(fs.readFileSync(path.join(CONT, d, 'post.json'), 'utf8')), { dir: path.join(CONT, d) }));
const pub = todos.filter(publicado).sort((a, b) => b.publicar.localeCompare(a.publicar));
const lista = pub.map((p, k) => ({ t: p.titulo, cat: p.cat, d: dataLonga(p.data), u: p.slug + '.html', cor: p.cor || CORES[k % 3], foto: p.cartao.src, alt: p.cartao.alt, id: 'art-' + p.slug, slug: p.slug, categorias: p.categorias }));
const produtosPorPost = {}, textoPorPost = {};

for (const P0 of pub) {
  const slug = P0.slug;
  const arqTexto = ['artigo.md', 'texto.txt'].map(a => path.join(P0.dir, a)).find(a => fs.existsSync(a));
  const post = lePost(arqTexto);
  textoPorPost[slug] = [post.h1, ...post.intro, ...post.secoes.flatMap(s => [s.titulo, ...s.itens.map(b => b.x)])].join(' ');
  const achaSec = re => post.secoes.find(s => re.test(s.titulo)) || null;
  const numeradas = post.secoes.filter(s => /^\d+\. /.test(s.titulo));
  if (numeradas.length !== P0.produtos.length) console.warn(`ATENÇÃO ${slug}: ${numeradas.length} presentes no texto e ${P0.produtos.length} em post.json`);
  const comoEscolhemos = achaSec(/^Como (escolhemos|selecionamos)/i), nemTodo = achaSec(/^Nem Todo/i), qualCombina = achaSec(/^Qual Presente Combina/i), faq = achaSec(/^Perguntas Frequentes/i);
  const usadas = new Set([comoEscolhemos, nemTodo, qualCombina, faq, ...numeradas]);
  const sobra = post.secoes.filter(s => !usadas.has(s) && !/^(Neste artigo|Sugestões de Presentes)/i.test(s.titulo));
  const fechamento = sobra.length ? sobra[sobra.length - 1] : null, extras = sobra.slice(0, -1);
  const a0 = lista.find(a => a.slug === slug);
  const produtos = numeradas.map((s, i) => {
    const d = P0.produtos[i] || {}; const tit = s.titulo.replace(/ [–—] /g, ': ');
    const nome = d.nome || tit.replace(/^\d+\. /, '');
    return { titulo: tit, nome, itens: s.itens, img: d.img || '', alt: d.alt || nome, cheia: !!d.cheia, cor: d.cor || CORES[i % 3], perfil: d.perfil || [], pros: d.pros || [], contras: d.contras || [], lojas: d.lojas || {} };
  });
  produtosPorPost[slug] = produtos.map((p, i) => ({ nome: p.nome, img: p.img, alt: p.alt, cor: p.cor, cheia: p.cheia, lojas: p.lojas, url: `${slug}.html#p-${i + 1}`, id: (P0.pre || '') + 'p-' + (i + 1) }));
  const D = {
    slug, arquivo: slug + '.html', pre: P0.pre || '',
    titleTag: (P0.titleTag || post.h1) + ' · O que dar?', desc: P0.desc || (post.intro[0] || post.h1).slice(0, 155),
    h1: post.h1, dataTxt: dataLonga(P0.data), leitura: Math.max(3, Math.round(post.palavras / 200)),
    trilha: [CATNOME[P0.trilha] || P0.trilha, `categoria-${P0.trilha}.html`], trilhaAtual: P0.trilhaAtual,
    capa: P0.capa, fatos: P0.fatos, intro: post.intro, produtos,
    pouco: (P0.pouco || []).map(([i, selo, porque], j) => ({ i, selo, porque, cor: CORES[j] })),
    nemTodo, posNemTodo: P0.posNemTodo, comoEscolhemos, qualCombina, extras, faq, fechamento,
    marcas: P0.marcas || [], links: P0.links || [], artigo: a0, outros: lista.filter(x => x !== a0),
  };
  fs.writeFileSync(path.join(OUT, D.arquivo), montaArtigo(D));
  console.log(D.arquivo, produtos.length, 'presentes');
}
const agendados = todos.filter(p => !publicado(p));
if (agendados.length) console.log('agendados (fora do site até a data):', agendados.map(p => p.slug + ' em ' + p.publicar).join(', '));
module.exports = { lista, produtosPorPost, textoPorPost, todos, pub };
