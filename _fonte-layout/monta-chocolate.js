// pouco: índice começa em 0 (0 = primeiro produto)
// Monta conteudo/posts/chocolate-para-presentear/post.json (rodar uma vez).
// Dados das lojas em pesquisa-chocolate.json, com a numeração da lista de candidatos (o = número original).
const fs = require('fs'), path = require('path');
const R = require('./pesquisa-chocolate.json'), HOJE = R.data, SLUG = 'chocolate-para-presentear';
// [nº original, nome (igual ao H3 do artigo), tags, prós, contras, alt]
const L = [
  [1, 'Trufas Kopenhagen Língua de Gato 120 g', ['Trufas', 'Clássico'], ['Embaladas individualmente', 'Recheio cremoso'], ['Apenas chocolate ao leite'], 'Dez minitrufas de chocolate ao leite com recheio cremoso, embaladas individualmente.'],
  [2, 'Cacau Show Clássicos Golden Gift 160 g', ['Sortidos', 'Presente'], ['Três tipos de recheio', 'Apresentação para presente'], ['Inclui cereja ao licor'], 'Caixa de bombons sortidos de chocolate ao leite com recheios variados.'],
  [38, 'Bombons Kopenhagen Soul Good avelã zero açúcar 160 g', ['Zero açúcar', 'Avelã'], ['Sem açúcar', 'Sem glúten e lactose'], ['Apenas oito bombons'], 'Lata com oito bombons de chocolate ao leite e recheio de avelã.'],
  [3, 'Kopenhagen Bombons Degradê Duo 176 g', ['Duo', 'Bombons'], ['Chocolate ao leite', 'Chocolate amargo'], ['Preço alto pelo peso'], 'Caixa com bombons de chocolate ao leite e chocolate amargo.'],
  [4, 'Ferrero Collection Grand Assortment 158,9 g', ['Sortidos', 'Ferrero'], ['Sabores variados', 'Caixa de presente'], ['Pouca quantidade pelo preço'], 'Caixa com seleção de bombons Ferrero de sabores variados.'],
  [6, 'Kopenhagen Bombons Clássicos, caixa com 18', ['Clássicos', 'Sortidos'], ['Quatro combinações', '18 unidades'], ['Nem todos gostam de frutas'], 'Caixa com 18 bombons de chocolate amargo, branco e ao leite.'],
  [5, 'Lata Lindt com 10 trufas Lindor sortidas', ['Trufas', 'Lata'], ['Lata reutilizável', 'Sabores variados'], ['Apenas dez unidades'], 'Lata reutilizável com dez trufas Lindor de sabores variados.'],
  [7, 'Lata Dengo de trufas ao leite 132 g', ['Natal', 'Trufas'], ['12 unidades', 'Lata reutilizável'], ['Preço alto pelo peso'], 'Lata decorativa com 12 trufas de ganache ao leite cobertas com cacau em pó.'],
  [8, 'Lindt Dulces Deseos 143 g', ['Bombons', 'Sortidos'], ['15 bombons', 'Recheios variados'], ['Pouca quantidade pelo preço'], 'Caixa com 15 bombons finos sortidos de chocolate amargo e ao leite.'],
  [9, 'Nhá Benta Kopenhagen, caixa com 6', ['Marshmallow', 'Clássico'], ['Seis unidades', 'Combina wafer e marshmallow'], ['Apenas chocolate ao leite'], 'Caixa com seis Nhá Bentas de marshmallow, wafer e cobertura de chocolate ao leite.'],
  [10, 'Trufas Lindt Lindor sortidas 337 g', ['Trufas', 'Sortidos'], ['Três tipos de chocolate', 'Recheio cremoso'], ['Preço varia muito entre lojas'], 'Caixa com trufas Lindor de chocolate ao leite, amargo extra e branco.'],
  [11, 'Ferrero Rocher, caixa com 48', ['Compartilhar', 'Avelã'], ['48 bombons', 'Pacotes com três unidades'], ['Um sabor só'], 'Caixa com 48 bombons de avelã, recheio cremoso, wafer e cobertura de chocolate.'],
  [12, 'Lata Dengo Rochedos de noz-pecã e castanha-de-caju 170 g', ['Castanhas', 'Natal'], ['Duas castanhas', 'Textura crocante'], ['Preço alto pelo peso'], 'Lata com rochedos de chocolate, noz-pecã e castanha-de-caju.'],
  [13, 'Cacau Show Mini Show Pistache 108 g', ['Pistache', 'Bombons'], ['Recheio cremoso', 'Sabor de pistache'], ['Só para quem gosta de pistache'], 'Caixa com bombons pequenos recheados com creme de pistache.'],
  [14, 'Chocolate orgânico Mendoá 81% com nibs 80 g', ['Amargo', 'Orgânico'], ['Cacau 81%', 'Nibs crocantes'], ['Sabor intenso'], 'Barra de chocolate orgânico 81% cacau com nibs crocantes.'],
  [15, 'Kit degustação GranKakao com 6 minibarras', ['Degustação', 'Variados'], ['Cinco sabores', 'Seis minibarras'], ['Porções pequenas'], 'Kit com seis minibarras de chocolate em cinco sabores, incluindo cupuaçu e tangerina.'],
  [17, 'Chocolate Dubai branco com pistache e kunafa 80 g', ['Pistache', 'Diferente'], ['Recheio de pistache', 'Kunafa crocante'], ['Apenas 80 g'], 'Barra de chocolate branco recheada com pistache e kunafa crocante.'],
  [18, 'Kit Kopenhagen Dolce Gusto Língua de Gato', ['Bebida', 'Kit'], ['Duas cápsulas', 'Duas barras'], ['Precisa de máquina Dolce Gusto'], 'Kit com duas cápsulas Dolce Gusto sabor Língua de Gato e duas barras de chocolate.'],
  [19, 'Acauá Cacao com 10 minibarras', ['Degustação', 'Origem'], ['Dez minibarras', 'Cinco sabores'], ['Porções de 15 g'], 'Conjunto com dez minibarras de chocolate tree to bar em cinco sabores.'],
  [20, 'Lindt Gold ao leite 300 g', ['Ao leite', 'Tablete'], ['300 g', 'Textura macia'], ['Apenas chocolate ao leite'], 'Tablete grande de chocolate ao leite Lindt.'],
  [21, 'Lindt Dubai Style 70% pistache e kadayif', ['Amargo', 'Pistache'], ['Cacau 70%', 'Recheio crocante'], ['Preço alto para uma barra'], 'Barra de chocolate 70% cacau recheada com pistache e kadayif crocante.'],
  [22, 'Dengo drágeas de cupuaçu 150 g', ['Cupuaçu', 'Frutas'], ['Fruta amazônica', 'Combinação diferente'], ['Preço alto pelo peso'], 'Drágeas de chocolate com cupuaçu, fruta da Amazônia.'],
  [23, 'Godiva Masterpieces ao leite com avelã', ['Importado', 'Avelã'], ['Chocolate belga', 'Ao leite com avelã'], ['Caro para 83 g'], 'Chocolate belga ao leite com avelã em embalagem de 83 g.'],
  [24, 'Godiva chocolate Dubai com kadayif e pistache 122 g', ['Importado', 'Pistache'], ['Pistache de Antep', 'Kadayif crocante'], ['Importado e caro'], 'Chocolate ao leite com pistache de Antep e kadayif crocante.'],
  [25, 'Kit Chaminé do Noel com caneca, Chocolataria Gramado', ['Natal', 'Caneca'], ['Caneca reutilizável', '160 g de chocolate'], ['Tema natalino'], 'Caneca temática com bola de Natal de chocolate ao leite e confeitos.'],
  [26, 'Kit Mimo de Natal, Chocolataria Gramado', ['Natal', 'Cesta'], ['402 g de chocolates', 'Cesta pronta'], ['Tema natalino'], 'Cesta natalina decorada com seleção de chocolates e laço.'],
  [27, 'Calendário do Advento Milka', ['Natal', 'Calendário'], ['24 janelinhas', 'Pequenos chocolates'], ['Uso ligado à contagem natalina'], 'Calendário de Natal com 24 janelinhas de pequenos chocolates Milka.'],
  [28, 'Dengo cubos de panetone 200 g', ['Panetone', 'Natal'], ['200 g', 'Chocolate 50% cacau'], ['Preço alto pelo peso'], 'Cubos de panetone cobertos com chocolate ao leite 50% cacau.'],
  [29, 'Conjunto para fondue inox com 10 peças', ['Fondue', 'Inox'], ['Aço inox', 'Dez peças'], ['Chocolate comprado à parte'], 'Conjunto de fondue com panela de aço inox e cabo de baquelite.'],
  [30, 'Kit fondue para casal com petisqueira de madeira', ['Fondue', 'Casal'], ['Petisqueira de madeira', 'Peça de cerâmica e inox'], ['Chocolate comprado à parte'], 'Kit de fondue de cerâmica e aço inox com petisqueira de madeira.'],
  [31, 'Livro Enciclopédia do chocolate', ['Livro', 'Receitas'], ['Capa dura', 'Técnicas e receitas'], ['Mais para quem cozinha'], 'Livro de capa dura sobre técnicas e receitas com chocolate, de Frédéric Bau.'],
  [33, 'Panela elétrica para fondue Oster', ['Fondue', 'Elétrica'], ['Quatro temperaturas', 'Mantém aquecido'], ['Confira a voltagem'], 'Panela elétrica para fondue com quatro níveis de temperatura e função manter aquecido.'],
  [34, 'Panela elétrica para fondue Mondial', ['Fondue', 'Elétrica'], ['Capacidade de 2,4 litros', 'Oito garfos'], ['Confira a voltagem'], 'Panela elétrica de fondue com capacidade de 2,4 litros e oito garfos, presente para quem gosta de chocolate.'],
  [36, 'Cesta Lindt Lindor coração', ['Romântico', 'Trufas'], ['Caixa em formato de coração', 'Trufas individuais'], ['Só para ocasião romântica'], 'Caixa em formato de coração com frase romântica e trufas Lindor embaladas individualmente.'],
  [37, 'Cesta Cacau Show com 25 chocolates', ['Cesta', 'Sortidos'], ['25 chocolates', 'Três formatos'], ['Preço alto'], 'Cesta de chocolate para presentear com trufas, barrinhas e tabletes sortidos.'],
];
const CORES = ['lavanda', 'rosa', 'pessego'];
const produtos = L.map(([o, nome, perfil, pros, contras, alt], i) => {
  const lojas = {}, a = R.amazon[o], m = R.ml[o], s = R.shopee[o];
  if (a) { lojas.amazon = { url: `https://www.amazon.com.br/dp/${a[0]}?tag=oquedar-20`, verificado: HOJE }; if (a[1]) lojas.amazon.preco = a[1]; if (a[2]) Object.assign(lojas.amazon, { nota: a[2], avaliacoes: a[3] }); }
  // ML: nota só com 20+ avaliações (uma nota 5,0 com 1 avaliação passaria na frente da Amazon)
  if (m) { lojas.ml = { url: m[1], preco: m[0], verificado: HOJE }; if (m[4] && m[5] >= 20) Object.assign(lojas.ml, { nota: m[4], avaliacoes: m[5] }); }
  if (s) lojas.shopee = { url: s[1], preco: s[0], verificado: HOJE };
  return { nome, img: `imagens/posts/${SLUG}/${R.fotos[o]}.webp`, alt, cheia: false, cor: CORES[i % 3], perfil, pros, contras, lojas };
});
// capa: foto do Lummi (uso livre), enviada pela A.G.; original 1920 x 2400, recortada em 3:2
const capa = { src: 'imagens/capa-chocolate-para-presentear.webp', alt: 'Bombons de chocolate ao leite, amargo e branco em formato de coração sobre fundo rosa', largura: 1400, altura: 933 };
const post = {
  slug: SLUG, status: 'agendado', data: '2026-11-25', publicar: '2026-11-25T07:00:00-03:00',
  titulo: 'Chocolate para presentear: opções clássicas, diferentes e especiais',
  titleTagCompleto: 'Chocolate para presentear: 35 sugestões especiais',
  desc: 'Chocolate para presentear vai muito além da caixa de bombons tradicional. Conheça 35 ideias, de trufas e barras especiais a kits e cestas.',
  palavraChave: 'chocolate para presentear',
  categorias: ['interesse', 'ocasiao'], cat: 'Interesse · Ocasião', trilha: 'interesse', trilhaAtual: 'Chocolate', cor: 'lavanda', pre: 'ch-',
  capa, cartao: capa,
  fatos: [['35 ideias', 'de caixas clássicas a fondue'], ['5 tipos de presente', 'caixas, diferentes, Natal, fondue e cestas'], ['3 lojas comparadas', 'Amazon, Mercado Livre e Shopee']],
  pouco: [[4, 'Melhor no geral', 'Reúne bombons variados em uma caixa pronta para presentear.'], [13, 'Melhor custo', 'Bombons de pistache numa caixa pronta para presentear.'], [15, 'Mais criativo', 'Oferece cinco sabores para experimentar em pequenas porções.']],
  posNemTodo: null,
  marcas: ['Uma seleção bem pensada pode transformar um doce em uma lembrança especial', 'A escolha fica mais fácil quando você considera o gosto da pessoa, a ocasião e o tipo de experiência que gostaria de proporcionar.'],
  links: [['ideias de presente para amigo secreto criativo', 'presente-para-amigo-secreto-criativo.html'], ['ideias de presente por interesse', 'categoria-interesse.html']],
  produtos,
};
const dir = path.join(__dirname, '..', 'conteudo', 'posts', SLUG); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'post.json'), JSON.stringify(post, null, 2));
console.log('post.json', produtos.length, 'produtos; lojas:', produtos.map(p => Object.keys(p.lojas).length).join(','));
