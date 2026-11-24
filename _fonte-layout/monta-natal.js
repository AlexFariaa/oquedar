// pouco: índice começa em 0 (0 = primeiro produto)
// Monta conteudo/posts/sugestao-de-presente-de-natal/post.json (rodar uma vez).
// Dados: natal-lista.js (foto), pesquisa-natal-amazon.js, pesquisa-natal-ml.js, pesquisa-natal-shopee.js, natal-ordem.js (grupos e ordem).
const fs = require('fs'), path = require('path');
const LISTA = require('./natal-lista.js'), AMZ = require('./pesquisa-natal-amazon.js'), ML = require('./pesquisa-natal-ml.js'), SH = require('./pesquisa-natal-shopee.js'), ORDEM = require('./natal-ordem.js');
const HOJE = AMZ.data, SLUG = 'sugestao-de-presente-de-natal';
// n da lista -> [nome (igual ao H3 do artigo), tags, prós, contras, alt]
const T = {
  6: ['Kit caipirinha com coqueteleira 500 ml', ['Bar', 'Drinks'], ['Coqueteleira de 500 ml', 'Vários utensílios'], ['Presente para adultos'], 'Kit caipirinha de aço inox com coqueteleira de 500 ml, dosador, colher e socador de frutas'],
  8: ['Manta de algodão para sofá 240 x 180 cm', ['Casa', 'Decoração'], ['Algodão 100%', 'Três possibilidades de uso'], ['Peça grande para guardar'], 'Manta de algodão para sofá 240 x 180 cm com franjas, presente de Natal para deixar a casa aconchegante'],
  3: ['Luminária articulada de mesa Pixar', ['Escritório', 'Iluminação'], ['Cúpula ajustável', 'Base com peso'], ['Uso mais específico'], 'Luminária de mesa articulada Pixar com base pesada e cúpula móvel, para escritório e estudo'],
  7: ['Kit café especial em grãos Reserva Gourmet', ['Café', 'Gourmet'], ['Três variedades', 'Café 100% arábica'], ['Precisa de moedor'], 'Kit café especial em grãos Reserva Gourmet com três pacotes de 200 g de café 100% arábica'],
  2: ['Granado Terrapeutics Trio de Gengibre', ['Cuidados', 'Fragrância'], ['Três produtos', 'Óleos naturais no creme'], ['Fragrância única'], 'Granado Terrapeutics Trio de Gengibre com creme para as mãos, colônia e sabonete'],
  5: ['Jogo de 6 taças de vinho em cristal 440 ml', ['Mesa', 'Vinho'], ['Seis taças', 'Cristal de 440 ml'], ['Presente para adultos'], 'Jogo de 6 taças de vinho em cristal 440 ml com haste longa, para tinto, branco e rosé'],
  1: ['Kit Banho Diário Chá Branco e Gengibre', ['Banho', 'Autocuidado'], ['Vários itens', 'Caixa de madeira'], ['Fragrância específica'], 'Kit Banho Diário Chá Branco e Gengibre em caixa de madeira com sabonetes, loção, esponja e pente'],
  9: ['Philips fone sem fio TWS TAT1109', ['Áudio', 'Tecnologia'], ['Conexão Bluetooth', 'Estojo de carregamento'], ['Precisa carregar o estojo'], 'Fone sem fio Philips TWS TAT1109 com estojo de carregamento'],
  4: ['Cafeteira italiana Brinox Verona 6 xícaras', ['Café', 'Cozinha'], ['Prepara seis xícaras', 'Corpo de alumínio'], ['Preparo manual no fogão'], 'Cafeteira italiana Brinox Verona de alumínio para 6 xícaras'],
  10: ['Stanley copo Everyday Tumbler com tampa', ['Térmico', 'Bebidas'], ['Aço inox 18/8', 'Isolamento a vácuo'], ['Capacidade de 473 ml'], 'Copo térmico Stanley Everyday Tumbler de 473 ml com tampa, em aço inoxidável 18/8'],
  11: ['Kit de coquetel profissional 26 peças', ['Bar', 'Drinks'], ['26 peças', 'Aço inox 304'], ['Presente para adultos'], 'Kit de coquetel profissional com 26 peças de aço inox, coqueteleira de 750 ml e acessórios de bar'],
  12: ['Lumai kit tábua de frios de bambu', ['Cozinha', 'Petiscos'], ['Tábua de bambu', 'Acompanha petisqueiras'], ['Uso voltado a servir'], 'Kit tábua de frios de bambu Lumai com petisqueiras para servir queijos e petiscos na ceia'],
  13: ['Jogo de 6 taças para champanhe em cristal', ['Mesa', 'Brinde'], ['Seis taças', 'Cristal Bohemia'], ['Presente para adultos'], 'Jogo de 6 taças de cristal Bohemia para champanhe e espumante, para brindar no Natal e no Réveillon'],
  14: ['Huawei FreeBuds SE 2', ['Áudio', 'Tecnologia'], ['Até 40 horas com estojo', 'Resistência IP54'], ['Nove horas sem o estojo'], 'Fones de ouvido sem fio Huawei FreeBuds SE 2 com estojo de carregamento'],
  16: ['Jogo de 6 taças de vinho tinto em cristal', ['Mesa', 'Vinho'], ['Seis taças', 'Cristal ecológico'], ['Feitas para vinho tinto'], 'Jogo de 6 taças de cristal ecológico com bojo amplo para vinho tinto'],
  15: ['Kit Café Gourmet Baggio', ['Café', 'Gourmet'], ['Três sabores', 'Aromas variados'], ['Sabores específicos'], 'Kit Café Gourmet Baggio com três sabores: chocolate com avelã, trufado e caramelo'],
  17: ['Stanley garrafa térmica Quick Flip 710 ml', ['Térmico', 'Garrafa'], ['Capacidade de 710 ml', 'Tampa com trava'], ['Preço acima de garrafas comuns'], 'Garrafa térmica Stanley Quick Flip de 710 ml em aço inoxidável, com tampa de abertura com uma mão'],
  18: ['LEGO Botanicals Mini Orquídea', ['LEGO', 'Decoração'], ['274 peças', 'Cinco flores'], ['Exige montagem'], 'LEGO Botanicals Mini Orquídea, kit de 274 peças para montar, presente de Natal para adultos'],
  19: ['LEGO Botanicals Crisântemo', ['LEGO', 'Decoração'], ['Pétalas articuláveis', 'Vaso incluso'], ['Exige montagem'], 'LEGO Botanicals Crisântemo com pétalas articuláveis e vaso, para montar e decorar'],
  21: ['Chá Twinings kit com 100 sachês', ['Chá', 'Bebidas'], ['100 sachês', 'Embalagens individuais'], ['Não detalha as variedades'], 'Chá Twinings em sachês: kit com 100 unidades embaladas individualmente, presente de Natal para quem ama chá'],
  20: ['JBL Go Essential', ['Áudio', 'Bluetooth'], ['Compacta', 'Fácil de transportar'], ['Som para ambientes pequenos'], 'Caixa de som Bluetooth portátil JBL Go Essential, compacta para levar na bolsa'],
  22: ['JBL Tune 530BT', ['Áudio', 'Fones'], ['Até 76 horas', 'Conexão multiponto'], ['Mais volumoso que intra-auricular'], 'Fone de ouvido over-ear Bluetooth JBL Tune 530BT com Pure Bass e até 76 horas de bateria'],
  24: ['Caixa de madeira com 60 sachês de chá', ['Chá', 'Organização'], ['Seis variedades', 'Caixa reutilizável'], ['Só para quem gosta de chá'], 'Caixa de madeira com 60 sachês de chá Twinings em seis variedades'],
  23: ['JBL Wave Buds', ['Áudio', 'Fones'], ['Bluetooth', 'Estojo de carregamento'], ['Precisa carregar o estojo'], 'Fones sem fio JBL Wave Buds com estojo de carregamento e som Pure Bass'],
  25: ['JBL Go 5', ['Áudio', 'Portátil'], ['Resistência IP68', 'Até dez horas'], ['Dez horas só com Playtime Boost'], 'Caixa de som Bluetooth JBL Go 5 resistente a água e poeira (IP68), com iluminação LED nas bordas'],
  26: ['Electrolux kit com 6 facas e afiador', ['Cozinha', 'Utensílios'], ['Seis facas', 'Acompanha afiador'], ['Uso voltado à cozinha'], 'Kit Electrolux com 6 facas de aço inox e afiador para a cozinha'],
  27: ['Overmont panela holandesa de ferro fundido', ['Cozinha', 'Panela'], ['Ferro fundido esmaltado', 'Compatível com indução'], ['Material pesado'], 'Panela holandesa Overmont de ferro fundido esmaltado, compatível com indução'],
  29: ['LEGO Icons Plantas em Miniatura', ['LEGO', 'Decoração'], ['758 peças', 'Plantas decorativas'], ['Exige montagem'], 'LEGO Icons Plantas em Miniatura, kit de 758 peças para montar e decorar'],
  30: ['Bialetti Moka Express 6 xícaras', ['Café', 'Cafeteira'], ['Fabricada na Itália', 'Válvula patenteada'], ['Preparo no fogão'], 'Cafeteira italiana Bialetti Moka Express de 6 xícaras, feita na Itália'],
  28: ['Moldura digital WiFi 10,1 polegadas', ['Tecnologia', 'Fotos'], ['WiFi', 'Exibe fotos e vídeos'], ['Depende de conexão WiFi'], 'Moldura digital WiFi de 10,1 polegadas para exibir fotos e vídeos'],
  31: ['JBL Grip', ['Áudio', 'Bluetooth'], ['Até 14 horas', 'Luz ambiente ajustável'], ['Preço mais alto da lista'], 'Caixa de som Bluetooth JBL Grip de 16 W com luz ambiente ajustável'],
};
const CORES = ['pessego', 'lavanda', 'rosa'];
const ordem = ORDEM.flatMap(g => g[1]);
const produtos = ordem.map((n, i) => {
  const [nome, perfil, pros, contras, alt] = T[n], [asin, slugFoto] = LISTA[n], [preco, nota, av] = AMZ.a[asin];
  const lojas = { amazon: { url: `https://www.amazon.com.br/dp/${asin}?tag=oquedar09-20`, nota, avaliacoes: av, preco, verificado: HOJE } };
  // ML: nota só com 20+ avaliações (uma nota 5,0 com 3 avaliações passaria na frente da Amazon); Shopee não mostra nota no portal de afiliados
  const m = ML[n], s = SH[n];
  if (m) { lojas.ml = { url: m[1], preco: m[0], verificado: HOJE }; if (m[3] >= 20) Object.assign(lojas.ml, { nota: m[2], avaliacoes: m[3] }); }
  if (s) lojas.shopee = { url: s[1], preco: s[0], verificado: HOJE };
  return { nome, img: `imagens/posts/${SLUG}/${slugFoto}.webp`, alt, cheia: false, cor: CORES[i % 3], perfil, pros, contras, lojas };
});
// capa: foto do Lummi (Patrick Venegas, uso livre), baixada em 1500 x 1991 e recortada em 3:2 (1400 x 933)
const capa = { src: 'imagens/capa-sugestao-de-presente-de-natal.webp', alt: 'Duas mulheres de blusa vermelha, gorro de Papai Noel e óculos escuros posam diante de uma árvore de Natal enfeitada', largura: 1400, altura: 933, credito: 'Patrick Venegas / Lummi', autor: 'Patrick Venegas' };
const post = {
  slug: SLUG, status: 'agendado', data: '2026-11-26', publicar: '2026-11-26T07:00:00-03:00',
  titulo: 'Sugestão de presente de Natal: 31 ideias organizadas por faixa de preço',
  titleTagCompleto: 'Sugestão de presente de Natal: 31 ideias por faixa de preço',
  desc: 'Sugestão de presente de Natal: 31 ideias até R$ 400, com preços da Amazon, Mercado Livre e Shopee. Escolha pela faixa de preço.',
  palavraChave: 'sugestão de presente de Natal',
  categorias: ['ocasiao', 'preco'], cat: 'Ocasião', trilha: 'ocasiao', trilhaAtual: 'Natal', cor: 'pessego', pre: 'sn-',
  capa, cartao: capa,
  fatos: [['31 ideias', 'de presente de Natal para vários gostos'], ['3 faixas de preço', 'até R$ 100, até R$ 200 e até R$ 400'], ['3 lojas comparadas', 'Amazon, Mercado Livre e Shopee']],
  pouco: [[13, 'Melhor no geral', 'Fones compactos com até 40 horas de bateria com o estojo.'], [3, 'Melhor custo', 'Três variedades de café 100% arábica para experimentar.'], [17, 'Mais criativo', 'Montagem de 274 peças que depois vira decoração.']],
  posNemTodo: null,
  marcas: ['estabelecer um limite antes de começar a procurar ajuda a filtrar as opções', 'O mais importante é encontrar uma opção que combine com a pessoa e caiba no seu planejamento para as festas.'],
  links: [['ideias de presente para amigo secreto criativo', 'presente-para-amigo-secreto-criativo.html'], ['presentes para quem gosta de cerveja', 'presentes-para-quem-gosta-de-cerveja.html'], ['chocolate para presentear', 'chocolate-para-presentear.html'], ['presentes por faixa de preço', 'categoria-preco.html'], ['ideias de presente por ocasião', 'categoria-ocasiao.html']],
  produtos,
};
const dir = path.join(__dirname, '..', 'conteudo', 'posts', SLUG); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'post.json'), JSON.stringify(post, null, 2));
console.log('post.json', produtos.length, 'produtos; lojas:', produtos.map(p => Object.keys(p.lojas).length).join(','));
