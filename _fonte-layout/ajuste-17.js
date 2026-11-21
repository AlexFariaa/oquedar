// Ajuste 17 (19/11/2026), etapa 5C: imagens como arquivos (funcionam sem JavaScript e deixam a página leve),
// créditos no rodapé e textos de "layout preliminar" trocados pelos avisos reais de exemplo.
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-17.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}
patch('base.js', [
  ["const LOGO = 'data:image/png;base64,' + fs.readFileSync(OUT + '/logo/logo-oquedar-branco.png').toString('base64');", "const LOGO = 'imagens/logo-oquedar.png';"],
  ["const FOTO_BASQ = 'data:image/avif;base64,' + fs.readFileSync(OUT + '/imagens/basquete-capa.avif').toString('base64');", "const FOTO_BASQ = 'imagens/basquete-capa.avif';"],
  ["const LOGO_ESCURO = 'data:image/png;base64,' + fs.readFileSync(OUT + '/logo/logo-oquedar.png').toString('base64');", "const LOGO_ESCURO = 'imagens/logo-oquedar-rodape.png';"],
  ['const imgProd = (i, extra = \'\') => `<img class="img-prod${i === 2 ? \' cheia\' : \'\'}${extra}" data-p="${i}" alt=',
   'const imgProd = (i, extra = \'\') => `<img class="img-prod${i === 2 ? \' cheia\' : \'\'}${extra}" data-p="${i}" src="imagens/produtos/p${i + 1}.avif" loading="lazy" decoding="async" width="600" height="600" alt='],
  ["const scriptImgs = (lista) => `<script>", "const scriptImgs = (lista) => ''; const scriptImgsAntigo = (lista) => `<script>"],
  ['<p class="exemplo">Layout preliminar: os favoritos ficam só neste navegador.</p>', '<p class="exemplo">Os favoritos ficam salvos só neste navegador.</p>'],
  ['<span>Criação de sites profissionais por <a href="https://a2agency.com.br/">A2 Marketing</a></span></div>',
   '<span>Criação de sites profissionais por <a href="https://a2agency.com.br/">A2 Marketing</a></span></div>\n    <p class="creditos">Fotos: Magnific (benzoix e equipe Magnific) e oquedar.com.</p>'],
  ['<p class="aviso-layout" role="note">Layout preliminar · áreas com legenda são reservas de imagem · preços e notas são exemplos</p>',
   '<p class="aviso-layout" role="note">Preços, notas e links de oferta são exemplos até a integração com as lojas.</p>'],
  ['/* aviso de layout preliminar */', '/* aviso de exemplo */\n.rodape .creditos{margin:var(--e3) 0 0;font-size:var(--t-rotulo);color:var(--apoio)}'],
]);
patch('inicial.js', [['<small>Layout preliminar: o envio ainda não está conectado.</small>', '<small>O envio ainda não está conectado.</small>']]);
patch('artigo.js', [['<small>Layout preliminar: o envio ainda não está conectado.</small>', '<small>O envio ainda não está conectado.</small>']]);
