// pouco: índice começa em 0 (0 = primeiro produto)
// Monta conteudo/posts/presente-para-amigo-secreto-criativo/post.json (rodar uma vez).
const fs = require('fs'), path = require('path');
const R = require('./pesquisa-amigo-secreto.json'), HOJE = R.data, SLUG = 'presente-para-amigo-secreto-criativo';
// [nome (igual ao H3 do artigo), tags, prós, contras, alt]  (arquivo da foto vem de R.fotos)
const L = [
  ['Kit 6 porta-copos Flork de MDF', ['Divertido', 'Casa'], ['Seis peças', 'Acompanha suporte'], ['Tema de humor específico'], 'Seis porta-copos com desenhos e frases do meme Flork e suporte para guardar.'],
  ['Luminária de mesa LED recarregável touch', ['Iluminação', 'Tecnologia'], ['Recarregável por USB', 'Três temperaturas de luz'], ['Depende de recarga'], 'Luminária de mesa cilíndrica com iluminação LED.'],
  ['Cafeteira prensa francesa Mimo Style 350 ml', ['Café', 'Cozinha'], ['Vidro borossilicato', 'Dispensa filtro de papel'], ['Preparo manual'], 'Prensa francesa de vidro com tampa, haste e alça.'],
  ['Aromatizador elétrico Via Aroma', ['Casa', 'Aromas'], ['Modelo bivolt', 'Aceita óleos e essências'], ['Essência vendida à parte'], 'Aromatizador elétrico de tomada ao lado da embalagem.'],
  ['Caneca Biblioteca "A leitura engrandece a alma"', ['Leitura', 'Café'], ['Porcelana de 325 ml', 'Acompanha saquinho'], ['Tema voltado a leitores'], 'Caneca com estampa de estante cheia de livros, presente para amigo secreto que gosta de ler.'],
  ['Caneca térmica Contigo Street 414 ml', ['Térmico', 'Bebidas'], ['Aço inox', 'Isolamento a vácuo'], ['Mais cara que caneca comum'], 'Caneca térmica com alça e a marca Contigo.'],
  ['Caixa de som Bluetooth GO 5W', ['Música', 'Tecnologia'], ['Proteção IP67', 'Até sete horas de bateria'], ['Som para ambientes pequenos'], 'Caixa de som portátil quadrada com alça de tecido.'],
  ['Garrafa térmica Contigo Matterhorn 591 ml', ['Térmico', 'Rotina'], ['Gelada por até 24 horas', 'Livre de BPA'], ['Lavagem só à mão'], 'Garrafa térmica alta com tampa de bico.'],
  ['Quebra-cabeça A Noite Estrelada, 1000 peças', ['Jogos', 'Arte'], ['Mil peças', 'Arte de Van Gogh'], ['Exige tempo para montar'], 'Caixa de quebra-cabeça com a pintura A Noite Estrelada, de Van Gogh.'],
  ['Kit abridor de vinho elétrico', ['Bebidas', 'Acessórios'], ['Quatro peças', 'Abre com um botão'], ['Só para maiores de 18'], 'Abridor elétrico de vinho acompanhado de taça, bico dosador e rolha.'],
  ['Kit caipirinha com coqueteleira, 5 peças inox', ['Bebidas', 'Drinques'], ['Cinco peças de inox', 'Coqueteleira de 500 ml'], ['Só para maiores de 18'], 'Cinco utensílios de aço inox para preparar caipirinhas e outros drinques.'],
  ['Moedor de café manual com regulagem', ['Café', 'Cozinha'], ['Moagem regulável', 'Pote extra de vidro'], ['Exige esforço manual'], 'Moedor manual com manivela e dois recipientes de vidro para café.'],
  ['Travesseiro de viagem NAP Nasa', ['Viagem', 'Conforto'], ['Espuma viscoelástica', 'Capa removível'], ['Útil só em deslocamentos'], 'Travesseiro de viagem em formato de U para apoiar o pescoço.'],
  ['Kit 4 cafés especiais em grãos Coffee Mais', ['Café', 'Degustação'], ['Quatro variedades', 'Cafés especiais'], ['Precisa de moedor'], 'Quatro pacotes de cafés especiais em grãos.'],
  ['Kit Banho Diário Chá Branco e Gengibre', ['Autocuidado', 'Banho'], ['Seis itens', 'Caixa de madeira'], ['Fragrância única'], 'Caixa de madeira com sabonetes, loção hidratante, esponja e pente.'],
  ['Copo térmico Stanley Stacking 473 ml', ['Térmico', 'Bebidas'], ['Isolamento a vácuo', 'Design empilhável'], ['Não vem com tampa'], 'Copo térmico Stanley de 473 ml com design empilhável.'],
  ['Mini impressora térmica Bluetooth com 10 rolos', ['Tecnologia', 'Organização'], ['Não usa tinta', 'Acompanha onze rolos'], ['Imprime só em preto e branco'], 'Mini impressora térmica com rolos de papel e etiquetas impressas, presente criativo para amigo secreto.'],
  ['Pipoqueira Britânia Pop Time', ['Cozinha', 'Lazer'], ['Pipoca sem óleo', 'Pronta em 3,5 minutos'], ['Confira a voltagem'], 'Pipoqueira elétrica com bocal de saída e pipocas ao redor.'],
  ['Máquina de waffle Mondial Pratic', ['Cozinha', 'Receitas'], ['Até quatro waffles', 'Chapas antiaderentes'], ['Confira a voltagem'], 'Máquina de waffle aberta com um waffle pronto nas chapas.'],
  ['LEGO Botanicals Mini Orquídea', ['Decoração', 'Montagem'], ['274 peças', 'Resultado decorativo'], ['Acima da faixa de R$ 100'], 'Orquídea montada com peças LEGO em um vaso.'],
  ['Biscoiteira Marcato Elegance', ['Cozinha', 'Confeitaria'], ['20 discos', 'Desmonta para lavar'], ['Bem mais cara que as outras'], 'Biscoiteira manual com alavanca e discos de formatos variados.'],
];
const CORES = ['rosa', 'pessego', 'lavanda'];
const produtos = L.map(([nome, perfil, pros, contras, alt], i) => {
  const n = String(i + 1), [asin, preco, nota, av] = R.amazon[n];
  const lojas = { amazon: { url: `https://www.amazon.com.br/dp/${asin}?tag=oquedar-20`, nota, avaliacoes: av, preco, verificado: HOJE } };
  // ML sem nota: a busca não traz o número de avaliações; Shopee não mostra nota no portal de afiliados
  if (R.ml[n]) lojas.ml = { url: R.ml[n][1], preco: R.ml[n][0], verificado: HOJE };
  if (R.shopee[n]) lojas.shopee = { url: R.shopee[n][1], preco: R.shopee[n][0], verificado: HOJE };
  return { nome, img: `imagens/posts/${SLUG}/${R.fotos[n]}.webp`, alt, cheia: false, cor: CORES[i % 3], perfil, pros, contras, lojas };
});
// capa: foto do Magnific (zinkevych), baixada pela conta da A.G. em tamanho original
const capa = { src: 'imagens/capa-presente-para-amigo-secreto-criativo.webp', alt: 'Homem cobre os olhos de uma mulher sorridente enquanto segura uma caixa de presente para surpreendê-la', largura: 1400, altura: 931 };
const post = {
  slug: SLUG, status: 'agendado', data: '2026-11-24', publicar: '2026-11-24T07:00:00-03:00',
  titulo: 'Presente para amigo secreto criativo: 21 sugestões para acertar na escolha',
  titleTagCompleto: 'Presente para amigo secreto criativo: o que dar?',
  desc: 'De itens para café a jogos e acessórios, encontre um presente para amigo secreto criativo entre 21 opções para vários estilos e bolsos.',
  palavraChave: 'presente para amigo secreto criativo',
  categorias: ['ocasiao', 'preco'], cat: 'Ocasião', trilha: 'ocasiao', trilhaAtual: 'Amigo secreto', cor: 'rosa', pre: 'as-',
  capa, cartao: capa,
  fatos: [['21 ideias', 'todas servem para homem ou mulher'], ['4 faixas de preço', 'até R$ 30, 50, 100 e acima'], ['3 lojas comparadas', 'Amazon, Mercado Livre e Shopee']],
  pouco: [[5, 'Melhor no geral', 'Uma opção versátil para acompanhar bebidas ao longo do dia.'], [0, 'Melhor custo', 'Uma lembrancinha divertida que também ajuda a proteger a mesa.'], [16, 'Mais criativo', 'Imprime etiquetas, listas, fotos e lembretes pelo celular.']],
  posNemTodo: null,
  marcas: ['As ideias estão organizadas por faixa de preço, já que a maioria dos sorteios de amigo secreto combina um valor antes da troca.', 'Um presente para amigo secreto criativo não precisa ser caro nem muito elaborado.'],
  links: [['presentes para quem gosta de cerveja', 'presentes-para-quem-gosta-de-cerveja.html'], ['ideias de presente por ocasião', 'categoria-ocasiao.html'], ['ideias de chocolate para presentear', 'chocolate-para-presentear.html']],
  produtos,
};
const dir = path.join(__dirname, '..', 'conteudo', 'posts', SLUG); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'post.json'), JSON.stringify(post, null, 2));
console.log('post.json', produtos.length, 'produtos; lojas:', produtos.map(p => Object.keys(p.lojas).length).join(','));
