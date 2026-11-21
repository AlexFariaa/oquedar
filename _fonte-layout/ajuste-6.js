// Ajuste 6 (19/11/2026): capas reais dos outros posts, rodapé escuro B+C, artigo mais largo, índice com a fita, pop-up na lateral.
const fs = require('fs');
function patch(arquivo, trocas, fatias = []) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-6.js'), s);
  for (const [ini, fim, novo] of fatias) { const a = s.indexOf(ini), b = s.indexOf(fim, a + 1); if (a < 0 || b < 0) { console.error(arquivo, 'FATIA NAO ACHADA:', ini.slice(0, 50)); process.exit(1); } s = s.slice(0, a) + novo + s.slice(b); }
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.replace(a, b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}

const CSS_ROD = `/* rodapé: escuro, chamada antes dos links e Q de vidro gigante */
.rodape{position:relative;margin-top:var(--secao);background:var(--tinta);color:var(--fundo);padding:var(--e9) 0 var(--e5);overflow:hidden;--apoio:rgba(244,242,240,.70);--fio:rgba(244,242,240,.16)}
.rodape .brilho{position:absolute;border-radius:50%;filter:blur(80px);opacity:.5;pointer-events:none}
.rodape .b1{width:620px;aspect-ratio:1;right:-160px;top:-180px;background:radial-gradient(circle,#FF6650 0%,transparent 68%)}
.rodape .b2{width:520px;aspect-ratio:1;right:220px;bottom:-260px;background:radial-gradient(circle,#C7B4F7 0%,transparent 68%)}
.rodape .q-gig{position:absolute;right:-140px;top:46%;transform:translateY(-50%);width:min(46vw,620px);aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.06);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;padding:0 22% 0 8%;text-align:center}
.rodape .q-gig figcaption{color:var(--tinta)}
.rodape .wrap{position:relative}
.rodape .chamada{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end;padding-bottom:var(--e8);margin-bottom:var(--e8);border-bottom:1px solid var(--fio)}
.rodape .chamada h2{grid-column:1/span 6;font-size:var(--t-titulo);font-weight:var(--peso-forte);line-height:1;letter-spacing:-.035em;color:var(--fundo);text-transform:none;margin:0}
.rodape .chamada .lado{grid-column:1/span 6;display:flex;flex-wrap:wrap;align-items:center;gap:var(--e4)}
.rodape .chamada .lado p{color:var(--apoio)}
.rodape .colunas{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:var(--e6);width:min(100%,900px);overflow-wrap:anywhere}
.rodape h3{font-size:var(--t-rotulo);font-weight:var(--peso-forte);letter-spacing:.08em;text-transform:uppercase;color:var(--apoio);margin-bottom:var(--e4)}
.rodape li a{display:inline-flex;min-height:36px;align-items:center;text-decoration:none;color:var(--fundo)}
@media (hover:hover){.rodape li a:hover{text-decoration:underline;text-underline-offset:4px}}
.rodape p{color:var(--apoio);max-width:40ch;line-height:1.6}
.rodape .sobre p+p{margin-top:var(--e4)}
.marca-rodape{display:block;width:180px;height:79px;overflow:hidden;position:relative;margin-bottom:var(--e5)}
.marca-rodape img{position:absolute;left:0;top:-31px;width:180px;height:auto;max-width:none;mix-blend-mode:lighten}
.rodape .linha{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--e4);border-top:1px solid var(--fio);padding-top:var(--e5);margin-top:var(--e8);font-size:var(--t-rotulo);color:var(--apoio)}
.rodape .linha a{color:var(--apoio)}
@media (max-width:900px){.rodape .colunas{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.rodape .sobre{grid-column:1/-1}.rodape .q-gig{width:340px;right:-170px;top:auto;bottom:40px;transform:none;opacity:.6}.rodape .q-gig figcaption{display:none}.rodape .chamada h2,.rodape .chamada .lado{grid-column:1/-1}}

`;

const ROD = `const rodape = \`
<footer class="rodape">
  <div class="brilho b1" aria-hidden="true"></div><div class="brilho b2" aria-hidden="true"></div>
  <figure class="reserva q-gig" aria-hidden="true"><figcaption><b>3D · Q de vidro gigante</b>o mesmo da abertura, cortado na borda</figcaption></figure>
  <div class="wrap">
    <div class="chamada">
      <h2>Ainda sem ideia do que dar?</h2>
      <div class="lado"><a class="btn btn-oferta" href="layout-alta-fidelidade.html#buscar">Montar minha busca</a><p>Diga para quem é e a gente procura por você.</p></div>
    </div>
    <div class="colunas">
      <div class="sobre">
        <a class="marca-rodape" href="layout-alta-fidelidade.html" aria-label="O que dar?, página inicial"><img src="\${LOGO_ESCURO}" alt="" width="500" height="500"></a>
        <p>O O que dar? é um blog especializado em ideias de presentes para todas as ocasiões. Através da curadoria da nossa equipe, selecionamos sugestões de presentes para namorados, amigas, familiares, colegas de trabalho e muito mais.</p>
        <p>Somos um site associado da Amazon e, portanto, recebemos comissões por compras qualificadas. Como se trata de um acordo de intermediação entre nosso site e a Amazon, os valores elegíveis de comissionamento não são repassados para os usuários. Para mais informações, leia nossa <a class="link" href="https://oquedar.com/declaracao-de-afiliados/">Política de Afiliados</a>.</p>
      </div>
      <div><h3>Presentes por</h3><ul>
        <li><a href="https://oquedar.com/category/genero/">Gênero</a></li><li><a href="https://oquedar.com/category/idade/">Idade</a></li><li><a href="https://oquedar.com/category/preco/">Preço</a></li><li><a href="https://oquedar.com/category/interesse/">Interesse</a></li><li><a href="https://oquedar.com/category/ocasiao/">Ocasião</a></li><li><a href="https://oquedar.com/category/relacionamento/">Relacionamento</a></li><li><a href="https://oquedar.com/category/profissao/">Profissão</a></li>
      </ul></div>
      <div><h3>Informações gerais</h3><ul>
        <li><a href="https://oquedar.com/politica-privacidade/">Política de Privacidade</a></li><li><a href="https://oquedar.com/termos-de-uso/">Termos de Uso</a></li><li><a href="https://oquedar.com/declaracao-de-afiliados/">Declaração de Afiliados</a></li><li><a href="https://oquedar.com/sobre-nos/">Sobre nós</a></li>
      </ul></div>
      <div><h3>Contato</h3><ul>
        <li><a href="mailto:contato@oquedar.com.br">contato@oquedar.com.br</a></li><li><a href="https://oquedar.com/contato/">Página de contato</a></li>
      </ul></div>
    </div>
    <div class="linha"><span>© 2026 O que dar?</span><span>Criação de sites profissionais por <a href="https://a2agency.com.br/">A2 Marketing</a></span></div>
  </div>
</footer>
`;

patch('base.js', [
  [`// botão de favoritar artigo (cartões)`, `// capas reais dos outros posts (baixadas do oquedar.com)
const CAPAS = [null, ['presente-para-quem-gosta-de-correr', 'Mulher sorrindo enquanto corre ao ar livre'], ['presente-dia-dos-namorados', 'Casal sorrindo trocando presente à luz de velas'], ['presentes-para-homens-30-anos', 'Homem sorrindo abrindo uma caixa de presente'], ['presente-1-mes-de-namoro', 'Casal sorrindo com caixas de presente no sofá']];
CAPAS.forEach((c, k) => { if (!c) return; artigos[k].foto = 'data:image/avif;base64,' + fs.readFileSync(OUT + '/imagens/capa-' + c[0] + '.avif').toString('base64'); artigos[k].alt = c[1]; });

// botão de favoritar artigo (cartões)`],
], [
  ['/* rodapé */', '/* favoritos */', CSS_ROD],
  ['const rodape = `', '<p class="aviso-layout"', ROD],
]);

patch('artigo.js', [
  [`:root{--largura:1440px}`, `:root{--largura:1600px}`],
  [`.indice ol{display:grid;gap:2px;border-left:1.5px solid var(--fio)}`, `.indice-fita{position:relative;padding-left:28px}
.indice-fita svg{position:absolute;left:0;top:0;width:24px;height:100%;overflow:visible}
.indice-fita .fundo-fita{stroke:var(--fio);stroke-width:3}
.indice-fita .prog-fita{stroke:var(--coral);stroke-width:5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1}
.indice ol{display:grid;gap:2px}`],
  [`margin-left:-1.5px;border-left:1.5px solid transparent;`, ``],
  [`.indice a.atual{color:var(--tinta);font-weight:var(--peso-forte);border-left-color:var(--coral)}`, `.indice a.atual{color:var(--tinta);font-weight:var(--peso-forte)}`],
  [`z-index:1;scrollbar-width:thin}`, `z-index:1;scrollbar-width:none}
.art-lado::-webkit-scrollbar{display:none}`],
  [`<ol id="indice">\${listaIndice}</ol>`, `<div class="indice-fita"><svg viewBox="0 0 24 360" preserveAspectRatio="none" fill="none" aria-hidden="true"><path class="fundo-fita" d="M12 0 C 22 30, 2 60, 12 90 S 22 150, 12 180 S 2 240, 12 270 S 22 330, 12 360"/><path class="prog-fita" id="prog-fita" pathLength="1" d="M12 0 C 22 30, 2 60, 12 90 S 22 150, 12 180 S 2 240, 12 270 S 22 330, 12 360"/></svg><ol id="indice">\${listaIndice}</ol></div>`],
  [`bar.style.transform='scaleX('+t+')';`, `bar.style.transform='scaleX('+t+')';var pf=document.getElementById('prog-fita');if(pf)pf.style.strokeDashoffset=1-t;`],
  // pop-up na lateral direita, acima do assistente
  [`.popup{position:fixed;left:50%;bottom:var(--e5);z-index:calc(var(--z-menu) + 2);width:min(560px,calc(100% - 24px));transform:translateX(-50%);`, `.popup{position:fixed;right:var(--e4);bottom:88px;z-index:calc(var(--z-menu) + 2);width:min(400px,calc(100% - 24px));`],
  [`@keyframes popup{from{opacity:0;transform:translate(-50%,24px)}}`, `@keyframes popup{from{opacity:0;transform:translateX(32px)}}`],
  [`.popup .ico{width:64px;height:64px;`, `.popup .ico{width:56px;height:56px;`],
  // capas reais em "outros posts" e "continue explorando"
  [`<span class="mini-img c-\${a.cor}"></span>`, `<span class="mini-img c-\${a.cor}">\${a.foto ? \`<img src="\${a.foto}" alt="">\` : ''}</span>`],
  [`<figure class="reserva"><figcaption><b>Imagem de capa</b>\${a.img} · 3:2 · ocupa topo e laterais</figcaption></figure>`, `\${a.foto ? \`<figure class="mini-capa"><img src="\${a.foto}" alt="\${a.alt}" width="600" height="400"></figure>\` : \`<figure class="reserva"><figcaption><b>Imagem de capa</b>\${a.img} · 3:2</figcaption></figure>\`}`],
  [`.mini .t{font-weight:var(--peso-forte);`, `.mini-capa{aspect-ratio:3/2;overflow:hidden;margin-bottom:var(--e2)}
.mini-capa img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--curva)}
@media (hover:hover){.mini:hover .mini-capa img{transform:scale(1.04)}}
.mini .t{font-weight:var(--peso-forte);`],
]);
