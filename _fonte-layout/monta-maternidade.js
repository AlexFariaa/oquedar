// Monta conteudo/posts/presente-para-maternidade/post.json a partir de pesquisa-maternidade.json (rodar uma vez).
const fs = require('fs'), path = require('path');
const R = require('./pesquisa-maternidade.json'), HOJE = '2026-11-21';
const arq = { 1: 'kit-bodies-carters-manga-curta', 2: 'kit-cueiros-flanelados-papi', 3: 'naninha-buba-ovelhinha', 4: 'toalha-capuz-papi-mami-bichuus', 5: 'kit-paninhos-boca-papi', 6: 'mobile-tiny-love-take-along', 7: 'saida-maternidade-sanches-baby', 8: 'livro-primeiro-ano-do-bebe', 9: 'almofada-amamentacao-extra-grande', 10: 'copo-stanley-quencher-118l', 11: 'kit-camisolas-amamentacao-viscose', 12: 'luz-noturna-recarregavel-toque', 13: 'mochila-maternidade-bh-store', 14: 'baba-eletronica-tp-link-tapo-c210', 15: 'canguru-cosco-kids-loop' };
// texto alternativo conferido em cada foto
const alt = {
  1: "Kit com oito bodies de manga curta Simple Joys by Carter's em branco e tons de cinza",
  2: 'Três cueiros flanelados Papi dobrados, em tons de rosa com estampa delicada',
  3: 'Naninha Buba bege em formato de ovelhinha, com estrelas bordadas',
  4: 'Toalha infantil com capuz de coelhinho bordado, Papi Mami Bichuus, em branco e cinza',
  5: 'Três paninhos de boca Papi estampados, com fita para prender a chupeta',
  6: 'Móbile Tiny Love Take Along com bichinhos coloridos pendurados, para berço e carrinho',
  7: 'Saída de maternidade Sanches Baby verde e cru, com casaquinho, touca, luvas, sapatinhos e manta',
  8: 'Capa azul do livro Primeiro Ano do Bebê, com ilustração de elefantinho',
  9: 'Almofada de amamentação rosê extra grande, com babado e laço',
  10: 'Copo Stanley Quencher de 1,18 litro rosa-claro, com alça e canudo',
  11: 'Duas mulheres usando camisolas de amamentação em viscose com botões na frente',
  12: 'Luz noturna de toque com brilho quente, ao lado do controle remoto',
  13: 'Bolsa maternidade BH Store azul-marinho em formato de mochila',
  14: 'Câmera TP-Link Tapo C210 ao lado da caixa e de um celular com o aplicativo',
  15: 'Canguru Cosco Kids Loop preto para carregar o bebê junto ao corpo',
};
const ed = { // perfil, prós, contras (a partir dos dados de cada produto)
  1: [['Enxoval', 'Clássico'], ['Vem com 8 peças', 'Cores neutras combinam com tudo'], ['Bebês crescem rápido: escolha bem o tamanho']],
  2: [['Enxoval', 'Barato'], ['Flanela 100% algodão', 'Três unidades no kit'], ['Muitas famílias já ganham cueiros']],
  3: [['Afetivo', 'Lúdico'], ['Leve e sem pilhas', 'Visual delicado'], ['Siga as orientações de uso no sono']],
  4: [['Banho', 'Enxoval'], ['Forrada com tecido de fralda', 'Tamanho que acompanha o crescimento'], ['Ocupa mais espaço na mala']],
  5: [['Barato', 'Prático'], ['Prende a chupeta', 'Cabe na bolsa do bebê'], ['Presente simples, bom para combinar com outro']],
  6: [['Quarto', 'Estímulo'], ['Serve no berço e no carrinho', '5 melodias'], ['Pilhas AA não inclusas']],
  7: [['Especial', 'Para guardar'], ['Conjunto completo de 7 peças', 'Marca a ida para casa'], ['Os pais podem já ter escolhido a saída']],
  8: [['Afetivo', 'Barato'], ['Vira lembrança para a vida', 'Espaço para fotos e recados'], ['Pede tempo dos pais para preencher']],
  9: [['Para a mãe', 'Conforto'], ['Capa removível com zíper', 'Enchimento em refil'], ['A família pode já ter uma']],
  10: [['Para a mãe', 'Uso pessoal'], ['Mantém a bebida gelada', 'Tampa com canudo e alça'], ['Mais caro que copos comuns']],
  11: [['Para a mãe', 'Conforto'], ['Abertura com botões para amamentar', 'Duas peças no kit'], ['Depende de acertar o tamanho']],
  12: [['Noites', 'Prático'], ['Luz quente e regulável', 'Timer e controle remoto'], ['Mais uma coisa para recarregar']],
  13: [['Passeios', 'Prático'], ['Mãos livres', 'Bolsos térmicos para mamadeira'], ['Volumosa para levar na visita']],
  14: [['Tecnologia', 'Segurança'], ['Avisa quando detecta choro', 'Visão noturna'], ['Precisa de Wi-Fi e configuração']],
  15: [['Passeios', 'Primeiros meses'], ['Bebê perto do corpo', 'Lavável à máquina'], ['Só até 9 kg', 'Nem toda família usa']],
};
const CORES = ['lavanda', 'rosa', 'pessego'];
const produtos = Object.keys(R).map(Number).sort((a, b) => a - b).map((n, i) => {
  const r = R[n], lojas = {};
  lojas.amazon = { url: `https://www.amazon.com.br/dp/${r.asin}?tag=oquedar-20`, nota: r.nota, avaliacoes: r.av, ...(r.preco ? { preco: r.preco } : {}), verificado: HOJE };
  if (r.ml && r.ml.afiliado) lojas.ml = { url: r.ml.afiliado, ...(r.ml.preco ? { preco: r.ml.preco } : {}), verificado: HOJE, ...(r.ml.nota ? { nota: r.ml.nota } : {}), ...(r.ml.av ? { avaliacoes: r.ml.av } : {}) };
  if (r.shopee && r.shopee.afiliado) lojas.shopee = { url: r.shopee.afiliado, preco: r.shopee.preco, verificado: HOJE };
  return { nome: r.nome, img: `imagens/posts/presente-para-maternidade/${arq[n]}.webp`, alt: alt[n], cheia: false, cor: CORES[i % 3], perfil: ed[n][0], pros: ed[n][1], contras: ed[n][2], lojas };
});
const post = {
  slug: 'presente-para-maternidade', status: 'publicado', data: HOJE, publicar: `${HOJE}T09:00:00-03:00`,
  titulo: '15 ideias de presente para maternidade: opções para mãe e bebê',
  titleTagCompleto: 'Presente para maternidade: 15 ideias para mãe e bebê',
  desc: 'Procurando um presente para maternidade? Veja 15 sugestões para o bebê, para a mãe e para tornar os primeiros meses mais especiais.',
  palavraChave: 'presente para maternidade',
  categorias: ['ocasiao'], cat: 'Ocasião', trilha: 'ocasiao', trilhaAtual: 'Maternidade', cor: 'rosa', pre: 'mat-',
  capa: { src: 'imagens/capa-presente-para-maternidade.webp', alt: 'Almofada de amamentação, naninha, livro do bebê, paninhos de boca e bodies sobre fundo rosa' },
  cartao: { src: 'imagens/capa-presente-para-maternidade.webp', alt: 'Almofada de amamentação, naninha, livro do bebê, paninhos de boca e bodies sobre fundo rosa' },
  fatos: [['15 ideias', 'do body ao canguru'], ['3 momentos', 'para o bebê, para a mãe e para os primeiros meses'], ['3 lojas comparadas', 'Amazon, Mercado Livre e Shopee']],
  pouco: [[8, 'Melhor no geral', 'Conforto para a mãe em todas as mamadas.'], [4, 'Melhor custo', 'Barato, útil e fácil de levar na visita.'], [7, 'Mais afetivo', 'Vira lembrança para guardar por anos.']],
  posNemTodo: null,
  marcas: ['é uma maneira carinhosa de participar dessa nova fase', 'o mais importante é considerar as necessidades e preferências de quem vai receber'],
  links: [['presentes para homens de 30 anos', 'presentes-para-homens-30-anos.html']],
  produtos,
};
const dir = path.join(__dirname, '..', 'conteudo', 'posts', post.slug); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'post.json'), JSON.stringify(post, null, 2));
console.log('post.json', produtos.length, 'produtos;', produtos.map(p => Object.keys(p.lojas).length).join(','));
