// Monta conteudo/posts/melhor-presente-menino-3-anos/post.json (rodar uma vez).
const fs = require('fs'), path = require('path');
const R = require('./pesquisa-menino3.json'), HOJE = '2026-11-22', SLUG = 'melhor-presente-menino-3-anos';
// [nome, asin, preço Amazon, nota, avaliações, arquivo, tags, prós, contras, alt]
const L = [
  ['Bicicleta de equilíbrio Buba', 'B0DFFTP71B', 139.00, 4.8, 5726, 'bicicleta-equilibrio-buba', ['Movimento', 'Equilíbrio'], ['Quatro rodas', 'Guidão móvel e macio'], ['Idade exata não informada'], 'Bicicleta infantil de equilíbrio com quatro rodas, guidão e assento, sem pedais.'],
  ['Triciclo Avespa Spider, Maral', 'B0D6HGCRL3', 199.80, 4.8, 4166, 'triciclo-avespa-spider-maral', ['Passeio', 'Movimento'], ['Dois modos de uso', 'Haste removível'], ['Ocupa espaço para guardar'], 'Triciclo infantil com haste de empurrar para o adulto e pedais.'],
  ['Patinete Hurtle 2 em 1', 'B088TY63YB', 338.16, 4.6, 18569, 'patinete-hurtle-2-em-1', ['Movimento', 'Versátil'], ['Assento retrátil', 'Guidão em quatro alturas'], ['Pesa cerca de 3 kg'], 'Patinete infantil de três rodas com assento retrátil e rodas com LED.'],
  ['Barraca toca infantil dobrável', 'B0997SCXLT', 67.01, 4.9, 568, 'barraca-toca-infantil', ['Imaginação', 'Faz de conta'], ['Dobrável', 'Fácil de armar'], ['Ocupa 72 x 70 x 91 cm'], 'Barraca infantil dobrável em formato de oca com estampa de animais da floresta.'],
  ['LEGO DUPLO Caixa Clássica de Peças 10913', 'B07WJJF8PB', null, 4.9, 12540, 'lego-duplo-caixa-classica-10913', ['Construção', 'Criatividade'], ['65 peças grandes', 'Caixa para guardar'], ['Idade exata não informada'], 'Caixa LEGO DUPLO com peças grandes, carrinho e bonequinhos montados.'],
  ['Blocos de montar magnéticos Brastoy', 'B09K7NGY56', 121.56, 4.8, 1130, 'blocos-magneticos-brastoy', ['Construção', 'Magnético'], ['120 peças', 'Montagem 2D e 3D'], ['Muitas peças para guardar'], 'Peças magnéticas translúcidas montadas em formato de castelo e outras figuras.'],
  ['Play-Doh Fun Tub com 19 acessórios', 'B00TPMDLOG', 93.41, 4.8, 13428, 'play-doh-fun-tub', ['Massinha', 'Criatividade'], ['19 acessórios', 'Pote para guardar'], ['Pede supervisão na brincadeira'], 'Balde Play-Doh com potes de massinha e acessórios para modelar.'],
  ['Lousa mágica digital', 'B09FJ4SXYK', 18.61, 4.4, 9452, 'lousa-magica-digital', ['Desenho', 'Criatividade'], ['Tela de 8,5 polegadas', 'Permite apagar'], ['Faixa etária não informada'], 'Lousa digital de 8,5 polegadas com caneta e desenho em traços coloridos.'],
  ['Quebra-cabeça Grow com animais', 'B0932G7J48', 25.13, 4.8, 2356, 'quebra-cabeca-grow-animais', ['Quebra-cabeça', 'Animais'], ['Três quebra-cabeças', 'Temas variados'], ['Montagens pequenas'], 'Caixa de quebra-cabeças Grow com ilustrações de animais.'],
  ['Hot Wheels Monster Trucks', 'B07F6ZBW52', 77.80, 4.8, 22168, 'hot-wheels-monster-trucks', ['Carrinhos', 'Veículos'], ['Rodas gigantes', 'Carroceria detalhada'], ['Escala pequena (1:64)'], 'Carrinhos Hot Wheels Monster Trucks com rodas gigantes ao lado da embalagem.'],
  ['Caminhão de bombeiro Brutale, Roma Jensen', 'B076B9PBDL', 51.39, 4.7, 1150, 'caminhao-bombeiro-brutale-roma', ['Veículos', 'Faz de conta'], ['Escada giratória', 'Lança água'], ['Brincar com água molha'], 'Caminhão de bombeiro de brinquedo com escada giratória e mangueira.'],
  ['Pista Ramp Racer, Maral', 'B07SMXX88D', 56.89, 4.7, 2914, 'pista-ramp-racer-maral', ['Carrinhos', 'Pistas'], ['Três montagens', '28 peças e dois carrinhos'], ['Faixa etária não informada'], 'Criança brincando com pista de rampas e carrinhos.'],
  ['Caixa de ferramentas infantil', 'B07C7LM836', 64.12, 4.7, 1348, 'caixa-ferramentas-infantil', ['Ferramentas', 'Montagem'], ['Maleta para guardar', 'Vem com carrinho para montar'], ['Ferramentas são de brinquedo'], 'Maleta de ferramentas de brinquedo aberta com martelo, chaves, parafusos e carrinho.'],
  ['Maleta Doutora com luz e som, BBR Toys', 'B09611H8SS', 88.35, 4.8, 642, 'maleta-doutora-luz-som-bbr', ['Médico', 'Faz de conta'], ['Luz e som', 'Acompanha acessórios'], ['Peças pequenas para guardar'], 'Maleta médica infantil com estetoscópio, seringa e acessórios de brinquedo.'],
  ['Jogo da memória Frutas e Hortaliças, Carlu', 'B07BH438CZ', 32.97, 4.8, 1514, 'jogo-memoria-frutas-carlu', ['Jogo', 'Memória'], ['20 pares em MDF', 'Caixa de madeira'], ['Peças pequenas, de 5 x 5 cm'], 'Jogo da memória em caixa de madeira com peças ilustradas de frutas e hortaliças.'],
  ['Xilofone Peixinho, Buba', 'B07CVQS58G', 63.91, 4.8, 635, 'xilofone-peixinho-buba', ['Música', 'Sons'], ['Formato de peixe', 'Acompanha baqueta'], ['Simples para crianças maiores'], 'Xilofone infantil em formato de peixe com teclas e baqueta.'],
  ['Livro Perigoso!', '8538058975', 16.98, 4.9, 29346, 'livro-perigoso', ['Livro', 'Leitura'], ['Livro infantil ilustrado', 'Capa com crocodilo'], ['Faixa etária não informada'], 'Capa do livro infantil Perigoso! com ilustração de um crocodilo.'],
];
const CORES = ['lavanda', 'rosa', 'pessego'];
const produtos = L.map(([nome, asin, preco, nota, av, arq, perfil, pros, contras, alt], i) => {
  const n = String(i + 1), lojas = { amazon: { url: `https://www.amazon.com.br/dp/${asin}?tag=oquedar-20`, nota, avaliacoes: av, ...(preco ? { preco } : {}), verificado: HOJE } };
  // ML sem nota: a busca não traz o número de avaliações, e a regra do site é nota sempre com avaliações
  if (R.ml[n]) lojas.ml = { url: R.ml[n][1], preco: R.ml[n][0], verificado: HOJE };
  if (R.shopee[n]) lojas.shopee = { url: R.shopee[n][1], preco: R.shopee[n][0], verificado: HOJE };
  return { nome, img: `imagens/posts/${SLUG}/${arq}.webp`, alt, cheia: false, cor: CORES[i % 3], perfil, pros, contras, lojas };
});
const capa = { src: 'imagens/capa-menino-3-anos-unicornio.webp', alt: 'Criança de cabelo cacheado sorrindo e segurando um unicórnio de pelúcia' };
const post = {
  slug: SLUG, status: 'agendado', data: HOJE, publicar: `${HOJE}T09:00:00-03:00`,
  titulo: 'Melhor presente para menino de 3 anos: ideias para gastar energia e se divertir',
  titleTagCompleto: 'Melhor presente para menino de 3 anos: dicas e ideias',
  desc: 'Procurando o melhor presente para menino de 3 anos? Veja 17 ideias de brinquedos e descubra opções para diferentes gostos e brincadeiras.',
  palavraChave: 'melhor presente para menino de 3 anos',
  categorias: ['idade'], cat: 'Idade', trilha: 'idade', trilhaAtual: 'Menino de 3 anos', cor: 'lavanda', pre: 'm3-',
  capa, cartao: capa,
  fatos: [['17 ideias', 'da bicicleta ao livro ilustrado'], ['4 estilos de brincadeira', 'energia, criar, faz de conta e jogos'], ['3 lojas comparadas', 'Amazon, Mercado Livre e Shopee']],
  pouco: [[4, 'Melhor no geral', '65 peças grandes e caixa para guardar.'], [14, 'Melhor custo', '40 peças de MDF em caixa de madeira.'], [6, 'Mais criativo', 'Massinha, cortadores, extrusor, rolo e carimbos.']],
  posNemTodo: null,
  marcas: ['O melhor presente não é necessariamente o mais caro ou o mais elaborado', 'um presente escolhido com atenção pode render muitas brincadeiras e boas lembranças'],
  links: [['seleção de presentes por idade', 'categoria-idade.html']],
  produtos,
};
const dir = path.join(__dirname, '..', 'conteudo', 'posts', SLUG); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'post.json'), JSON.stringify(post, null, 2));
console.log('post.json', produtos.length, 'produtos; lojas:', produtos.map(p => Object.keys(p.lojas).length).join(','));
