// Ajuste 8 (19/11/2026): fotos reais no lugar do Q, fotos das categorias, newsletter com foto, autora A.G., rodapé menor com afiliados à direita, fita da categoria mais baixa.
// As fotos novas são referenciadas pela pasta imagens/ (abrem com duplo clique e pelo servidor local).
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-8.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}

patch('base.js', [
  [`.q-logo{position:relative;`, `.foto-q{padding:0!important;overflow:hidden}
.foto-q img{width:100%;height:100%;object-fit:cover}
.foto-av{overflow:hidden;border-radius:50%;padding:0}
.foto-av img{width:100%;height:100%;object-fit:cover;object-position:50% 22%}
.q-logo{position:relative;`],
  // rodapé menor, afiliados na coluna da direita
  [`        <p>Somos um site associado da Amazon e, portanto, recebemos comissões por compras qualificadas. Como se trata de um acordo de intermediação entre nosso site e a Amazon, os valores elegíveis de comissionamento não são repassados para os usuários. Para mais informações, leia nossa <a class="link" href="https://oquedar.com/declaracao-de-afiliados/">Política de Afiliados</a>.</p>
`, ``],
  [`        <li><a href="mailto:contato@oquedar.com.br">contato@oquedar.com.br</a></li><li><a href="https://oquedar.com/contato/">Página de contato</a></li>
      </ul></div>`, `        <li><a href="mailto:contato@oquedar.com.br">contato@oquedar.com.br</a></li><li><a href="https://oquedar.com/contato/">Página de contato</a></li>
      </ul></div>
      <div class="divulga"><h3>Divulgação de produtos</h3>
        <p>Somos um site associado da Amazon e, portanto, recebemos comissões por compras qualificadas. Como se trata de um acordo de intermediação entre nosso site e a Amazon, os valores elegíveis de comissionamento não são repassados para os usuários. Para mais informações, leia nossa <a class="link" href="https://oquedar.com/declaracao-de-afiliados/">Política de Afiliados</a>.</p>
      </div>`],
  [`.rodape{position:relative;margin-top:var(--secao);background:var(--tinta);color:var(--fundo);padding:var(--e9) 0 var(--e5);`, `.rodape{position:relative;margin-top:var(--secao);background:var(--tinta);color:var(--fundo);padding:var(--e8) 0 var(--e5);`],
  [`.rodape .colunas{display:grid;grid-template-columns:1.6fr 1fr 1.1fr 1.2fr;gap:var(--e7);width:min(100%,1040px);`, `.rodape .colunas{display:grid;grid-template-columns:1.3fr .9fr 1fr 1fr 1.5fr;gap:var(--e6);width:100%;`],
  [`.rodape p{color:var(--apoio);max-width:40ch;line-height:1.6}`, `.rodape p{color:var(--apoio);max-width:40ch;line-height:1.6}
.rodape .divulga p{font-size:var(--t-rotulo);line-height:1.55}`],
  [`.rodape .palavra{font-size:clamp(4.5rem,17.5vw,16rem);font-weight:var(--peso-forte);letter-spacing:-.055em;line-height:.8;color:var(--rosa);margin:var(--e9) 0 var(--e5) -.05em;`, `.rodape .palavra{font-size:clamp(3.5rem,12vw,10.5rem);font-weight:var(--peso-forte);letter-spacing:-.055em;line-height:.8;color:var(--rosa);margin:var(--e8) 0 var(--e5) -.05em;`],
  [`@media (max-width:900px){.rodape .colunas{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.rodape .sobre{grid-column:1/-1}`, `@media (max-width:900px){.rodape .colunas{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.rodape .sobre,.rodape .divulga{grid-column:1/-1}`],
]);

patch('inicial.js', [
  [`<figure class="reserva q">\${qLogo()}</figure>`, `<figure class="reserva q foto-q"><img src="imagens/abertura-presente.jpg" alt="Caixa de presente de papel kraft com fita rosa sobre fundo rosa"></figure>`],
  [`<figure class="reserva q">\${qLogo('Q do logo · versão 3D de Natal entra aqui')}</figure>`, `<figure class="reserva q foto-q"><img src="imagens/natal.jpg" alt="Presentes de Natal embrulhados em papel kraft com bolinhas, barbante e ramos de pinheiro" loading="lazy"></figure>`],
  [`<figure class="reserva fundo"><figcaption><b>Foto de fundo</b>Mesa vista de cima com presentes embrulhados, fitas e cartões · 16:9 · área livre à esquerda para o vidro</figcaption></figure>`, `<figure class="reserva fundo"><img src="imagens/newsletter.jpg" alt="" loading="lazy"></figure>`],
  [`.na .abre{color:var(--tinta)}`, `.na .abre{color:var(--tinta)}
.na .fundo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scaleX(-1)}`],
  [`<figure class="reserva cats-previa c-rosa" id="cats-previa" aria-hidden="true"><figcaption><b>Retrato da categoria</b><span id="cats-previa-t">\${cats[0][3]}</span> · 4:5</figcaption></figure>`, `<figure class="reserva cats-previa c-rosa" id="cats-previa" aria-hidden="true"><img id="cats-previa-img" src="imagens/categorias/relacionamento.jpg" alt=""></figure>\${cats.map(c => \`<link rel="prefetch" href="imagens/categorias/\${c[1]}.jpg">\`).join('')}`],
  [`data-cor="\${c[2]}" data-img="\${c[3]}"`, `data-cor="\${c[2]}" data-img="\${c[3]}" data-slug="\${c[1]}"`],
  [`pt=document.getElementById('cats-previa-t')`, `pt=document.getElementById('cats-previa-img')`],
  [`pt.textContent=a.dataset.img;`, `pt.src='imagens/categorias/'+a.dataset.slug+'.jpg';`],
  [`.cats-previa figcaption{color:var(--tinta)}`, `.cats-previa{padding:0;overflow:hidden}
.cats-previa img{width:100%;height:100%;object-fit:cover}`],
]);

patch('categoria.js', [
  [`<figure class="reserva cat-foto c-pessego"><figcaption><b>Retrato da categoria</b>Mãos segurando um objeto de hobby (bola, fone, xícara), fundo pêssego liso, luz suave · 4:5</figcaption></figure>`, `<figure class="cat-foto c-pessego"><img src="imagens/categorias/interesse.jpg" alt="Mãos servindo macarons rosa numa xícara com borda dourada"></figure>`],
  [`.cat-foto figcaption{max-width:26ch}`, `.cat-foto{overflow:hidden}
.cat-foto img{width:100%;height:100%;object-fit:cover}`],
  [`M-20 200 C 220 40, 420 60, 620 150 S 1000 260, 1180 120 S 1400 30, 1460 80`, `M-20 236 C 240 246, 460 232, 660 188 S 1000 196, 1180 120 S 1400 40, 1460 70`],
]);

patch('artigo.js', [
  [`<figure class="reserva avatar c-rosa"><figcaption class="sr">Retrato da autora</figcaption></figure>Por Laura Mendes`, `<figure class="avatar foto-av"><img src="imagens/autora.jpg" alt=""></figure>Por A.G.`],
  [`<figure class="reserva avatar"><figcaption class="sr">Retrato da autora</figcaption></figure>`, `<figure class="avatar foto-av"><img src="imagens/autora.jpg" alt="Retrato de A.G., autora do artigo" loading="lazy"></figure>`],
  [`<h2 class="sub" id="t-autora">Laura Mendes</h2>`, `<h2 class="sub" id="t-autora">A.G.</h2>`],
]);
