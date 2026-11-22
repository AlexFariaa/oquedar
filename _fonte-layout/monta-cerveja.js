// Monta conteudo/posts/presentes-para-quem-gosta-de-cerveja/post.json (rodar uma vez).
const fs = require('fs'), path = require('path');
const R = require('./pesquisa-cerveja.json'), HOJE = R.data, SLUG = 'presentes-para-quem-gosta-de-cerveja';
// [nome, arquivo, tags, prós, contras, alt]  (Amazon: ASIN, preço, nota e avaliações vêm de pesquisa-cerveja.json)
const L = [
  ['Kit Schornstein com 4 cervejas artesanais', 'kit-schornstein-4-cervejas-artesanais', ['Cerveja artesanal', 'Degustação'], ['Quatro estilos', 'Embalagem com alça'], ['Uma garrafa de cada estilo'], 'Caixa de presente com quatro garrafas de cerveja artesanal Schornstein.'],
  ['Kit Paulistânia Marco Zero com copo', 'kit-paulistania-marco-zero-copo', ['Kit presente', 'American Lager'], ['Duas garrafas de 600 ml', 'Copo da marca'], ['Copo de só 300 ml'], 'Caixa de presente com duas garrafas Paulistânia Marco Zero e um copo da marca.'],
  ['Barril Paulaner Hefe-Weissbier 5 litros', 'barril-paulaner-hefe-weissbier-5-litros', ['Cerveja de trigo', 'Barril'], ['5 litros para dividir', 'Cervejaria da Oktoberfest'], ['Melhor para dividir em grupo'], 'Barril de 5 litros de cerveja Paulaner Hefe-Weissbier com ilustração de paisagem.'],
  ['Caneca de chopp Caveira Rock Style, Lyor', 'caneca-chopp-caveira-lyor', ['Caneca', 'Visual rock'], ['Vidro, 510 ml', 'Formato de caveira'], ['Não vai à lava-louças'], 'Caneca de vidro de 510 ml em formato de caveira, cheia de cerveja com espuma.'],
  ['Jogo de 6 taças Floripa, Nadir', 'tacas-floripa-nadir', ['Taças', 'Receber em casa'], ['Seis taças', 'Uso versátil'], ['Modelo simples, de uso diário'], 'Taça de vidro Floripa vazia e conjunto com seis taças cheias de cerveja.'],
  ['Taças Beer Master, Ruvolo', 'tacas-beer-master-ruvolo', ['Taças', 'Degustação'], ['Borda fina', 'Realça o aroma'], ['Indicadas para cervejas claras'], 'Quatro taças de cerveja de vidro com formato bojudo e pé.'],
  ['Kit de degustação True com 4 copos', 'kit-degustacao-true-4-copos', ['Degustação', 'Copos'], ['Um copo por estilo', 'Vai à lava-louças'], ['Vendido do exterior'], 'Quatro copos de vidro para cerveja em formatos diferentes, cada um com um estilo.'],
  ['Caneca térmica para cerveja TermoPro', 'caneca-termica-cerveja-termopro', ['Térmico', 'Caneca'], ['709 ml em aço inox', 'Isolamento a vácuo'], ['Lavar só à mão'], 'Caneca térmica grande de aço inox com alça.'],
  ['Copo térmico 4 em 1 para lata e long neck', 'copo-termico-4-em-1-lata-long-neck', ['Térmico', 'Versátil'], ['Lata e long neck', 'Tampa inclusa'], ['Marca genérica'], 'Copo térmico de inox com borda de borracha e tampa transparente ao lado.'],
  ['Suporte térmico para lata Thermos', 'suporte-termico-lata-thermos', ['Térmico', 'Porta-lata'], ['Gelada por até 3 horas', 'Não marca a mesa'], ['Só para lata de 354 ml'], 'Suporte térmico de aço inox para lata, com borda preta e a marca Thermos.'],
  ['Growler térmico Stanley Classic 1,9 L', 'growler-stanley-classic', ['Growler', 'Térmico'], ['1,9 litro', 'Tampa que não vaza'], ['Mais caro que o Coleman'], 'Growler térmico de 1,9 litro com alça lateral e tampa com trava.'],
  ['Growler térmico Coleman 1,9 L', 'growler-coleman', ['Growler', 'Térmico'], ['Frio por até 76 horas', 'Base emborrachada'], ['Grande para o dia a dia'], 'Growler térmico Coleman de 1,9 litro com alça presa à tampa.'],
  ['Balde de gelo inox com tampa', 'balde-gelo-inox-tampa', ['Bar em casa', 'Gelo'], ['Parede dupla a vácuo', 'Pinça, colher e coador'], ['Marca genérica'], 'Balde de gelo de inox com tampa, colher, pinça e coador.'],
  ['Chopeira Krups Beertender', 'chopeira-krups-beertender', ['Chopeira', 'Bar em casa'], ['Resfria a 4 °C', 'Chope bom por 30 dias'], ['Barril vendido à parte'], 'Chopeira elétrica com torneira no alto e bandeja para apoiar o copo.'],
  ['Tábua de frios magnética Lumai', 'tabua-frios-magnetica-lumai', ['Petiscos', 'Bambu'], ['Peças encaixam por ímãs', '8 talheres inclusos'], ['Ocupa espaço na mesa'], 'Tábua de bambu com queijos, frutas, frios e talheres em suporte magnético.'],
  ['Kit de placas decorativas de bar', 'placas-decorativas-bar-cerveja', ['Decoração', 'Bar'], ['Seis placas', 'Fita dupla face inclusa'], ['Frases não agradam a todos'], 'Seis placas decorativas com frases sobre cerveja e churrasco, uma em formato de caneca.'],
  ['Abridor de garrafas Brinox Beli', 'abridor-garrafas-brinox-beli', ['Abridor', 'Aço inox'], ['Abre garrafas e latas', 'Compacto'], ['Pequeno, fácil de perder'], 'Abridor de aço inox para garrafas e latas, com 9 cm.'],
  ['Abridor de parede com coletor de tampinhas', 'abridor-parede-coletor-tampinhas', ['Abridor', 'Decoração'], ['Recolhe as tampinhas', 'Base de madeira'], ['Precisa fixar na parede'], 'Abridor de parede com base de madeira, âncora de metal e rede que recolhe as tampinhas.'],
  ['O livro da cerveja', 'o-livro-da-cerveja', ['Livro', 'Guia prático'], ['Escrito por sommelière', '272 páginas'], ['Menos completo que o Larousse'], 'Capa de O livro da cerveja com ilustração de uma garrafa e informações ao redor.'],
  ['Larousse da cerveja', 'larousse-da-cerveja', ['Livro', 'Cultura cervejeira'], ['440 páginas ilustradas', 'Guia de estilos'], ['Leitura longa'], 'Capa do Larousse da cerveja com três copos de cerveja de cores diferentes.'],
  ['Kit Craft A Brew para fazer cerveja em casa', 'kit-craft-a-brew-cerveja-em-casa', ['Cerveja caseira', 'Kit'], ['Equipamento e ingredientes', 'Guia de preparo'], ['Vendido do exterior'], 'Kit para fazer cerveja em casa com garrafão de vidro, funil, termômetro e ingredientes.'],
  ['Jogo Cala a Boca e Bebe Logo, Buró', 'jogo-cala-a-boca-e-bebe-logo-buro', ['Jogo', 'Adultos'], ['50 cartas', 'De 3 a 8 jogadores'], ['Só para maiores de 18'], 'Caixa do jogo de cartas Cala a Boca e Bebe Logo com um copo desenhado.'],
];
const CORES = ['pessego', 'lavanda', 'rosa'];
const produtos = L.map(([nome, arq, perfil, pros, contras, alt], i) => {
  const n = String(i + 1), [asin, preco, nota, av] = R.amazon[n];
  const lojas = { amazon: { url: `https://www.amazon.com.br/dp/${asin}?tag=oquedar-20`, nota, avaliacoes: av, ...(preco ? { preco } : {}), verificado: HOJE } };
  // ML sem nota: a busca não traz o número de avaliações; Shopee não mostra nota no portal de afiliados
  if (R.ml[n]) lojas.ml = { url: R.ml[n][1], preco: R.ml[n][0], verificado: HOJE };
  if (R.shopee[n]) lojas.shopee = { url: R.shopee[n][1], preco: R.shopee[n][0], verificado: HOJE };
  return { nome, img: `imagens/posts/${SLUG}/${arq}.webp`, alt, cheia: false, cor: CORES[i % 3], perfil, pros, contras, lojas };
});
const capa = { src: 'imagens/capa-presentes-para-quem-gosta-de-cerveja.webp', alt: 'Casal sorridente brindando com copos de bebida gelada ao ar livre', largura: 1400, altura: 933 };
const post = {
  slug: SLUG, status: 'agendado', data: '2026-11-23', publicar: '2026-11-23T07:00:00-03:00',
  titulo: 'Presentes para quem gosta de cerveja: opções para degustar, servir e compartilhar',
  titleTagCompleto: 'Presentes para quem gosta de cerveja: 22 ideias · O que dar?',
  desc: 'Presentes para quem gosta de cerveja incluem muito mais que bebidas. Explore acessórios, livros, utensílios e kits para diferentes ocasiões.',
  palavraChave: 'presentes para quem gosta de cerveja',
  categorias: ['interesse'], cat: 'Interesse', trilha: 'interesse', trilhaAtual: 'Cerveja', cor: 'pessego', pre: 'cv-',
  capa, cartao: capa,
  fatos: [['22 ideias', 'do kit artesanal à chopeira'], ['5 tipos de presente', 'beber, servir, gelar, bar e aprender'], ['3 lojas comparadas', 'Amazon, Mercado Livre e Shopee']],
  pouco: [[1, 'Melhor no geral', 'Quatro estilos numa embalagem pronta para presente.'], [4, 'Melhor custo', 'Caneca de vidro de 510 ml em formato de caveira.'], [21, 'Mais criativo', 'Equipamento e ingredientes para fazer cerveja em casa.']],
  posNemTodo: null,
  marcas: ['O recipiente também faz parte da experiência de apreciar uma cerveja.', 'O mais importante é escolher algo que tenha relação com os interesses de quem vai receber.'],
  links: [['presentes para homens de 30 anos', 'presentes-para-homens-30-anos.html'], ['ideias de presentes por interesse', 'categoria-interesse.html']],
  produtos,
};
const dir = path.join(__dirname, '..', 'conteudo', 'posts', SLUG); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'post.json'), JSON.stringify(post, null, 2));
console.log('post.json', produtos.length, 'produtos; lojas:', produtos.map(p => Object.keys(p.lojas).length).join(','));
