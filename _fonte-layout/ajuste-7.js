// Ajuste 7 (19/11/2026): comparativo numerado, Q do logo nas reservas, rodapé com "O que dar?" grande, links para a página de categoria.
const fs = require('fs');
function patch(arquivo, trocas, fatias = []) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-7.js'), s);
  for (const [ini, fim, novo] of fatias) { const a = s.indexOf(ini), b = s.indexOf(fim, a + 1); if (a < 0 || b < 0) { console.error(arquivo, 'FATIA NAO ACHADA:', ini.slice(0, 50)); process.exit(1); } s = s.slice(0, a) + novo + s.slice(b); }
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }
  fs.writeFileSync(f, s); console.log(arquivo, 'ok');
}

patch('base.js', [
  // Q recortado do logo, para as reservas do 3D
  [`// botão de favoritar artigo (cartões)`, `// Q recortado da imagem do logo (sem redesenhar): ocupa as reservas do Q de vidro até o 3D existir
const qLogo = (rotulo = 'Q do logo · a versão 3D em vidro entra aqui') => \`<span class="q-logo"><img src="\${LOGO}" alt=""></span><span class="q-rotulo">\${rotulo}</span>\`;

// botão de favoritar artigo (cartões)`],
  [`.img-prod{width:100%;`, `.q-logo{position:relative;display:block;width:42%;aspect-ratio:150/228;overflow:hidden;filter:drop-shadow(0 18px 30px rgba(255,102,80,.35))}
.q-logo img{position:absolute;width:333%;max-width:none;left:-128%;top:-37%}
.q-rotulo{font-size:var(--t-rotulo);color:var(--apoio);background:rgba(255,255,255,.7);border-radius:var(--pilula);padding:2px var(--e3);margin-top:var(--e3);text-align:center}
.img-prod{width:100%;`],
  [`PROD, PROD_ALT, imgProd, scriptImgs, CORACAO, favArtigo };`, `PROD, PROD_ALT, imgProd, scriptImgs, CORACAO, favArtigo, qLogo };`],
  // rodapé: sai a chamada, volta o "O que dar?" grande, sai o Q gigante
  [`  <figure class="reserva q-gig" aria-hidden="true"><figcaption><b>3D · Q de vidro gigante</b>o mesmo da abertura, cortado na borda</figcaption></figure>
`, ``],
  [`    <div class="chamada">
      <h2>Ainda sem ideia do que dar?</h2>
      <div class="lado"><a class="btn btn-oferta" href="layout-alta-fidelidade.html#buscar">Montar minha busca</a><p>Diga para quem é e a gente procura por você.</p></div>
    </div>
`, ``],
  [`    <div class="linha"><span>© 2026 O que dar?</span>`, `    <p class="palavra" aria-hidden="true">O que <span>dar?</span></p>
    <div class="linha"><span>© 2026 O que dar?</span>`],
  [`.rodape .linha{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--e4);border-top:1px solid var(--fio);padding-top:var(--e5);margin-top:var(--e8);`, `.rodape .palavra{font-size:clamp(4.5rem,17.5vw,16rem);font-weight:var(--peso-forte);letter-spacing:-.055em;line-height:.8;color:var(--rosa);margin:var(--e9) 0 var(--e5) -.05em;white-space:nowrap;max-width:none}
.rodape .palavra span{color:var(--coral)}
.rodape .linha{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--e4);border-top:1px solid var(--fio);padding-top:var(--e5);margin-top:0;`],
]);

patch('inicial.js', [
  [`const { fs, path, OUT, esc, P, reais, melhorIdx, nomes, cab, rodape, JS_BASE, head, comparador, CSS_COMP, artigos, imgProd, scriptImgs, favArtigo } = B;`,
   `const { fs, path, OUT, esc, P, reais, melhorIdx, nomes, cab, rodape, JS_BASE, head, comparador, CSS_COMP, artigos, imgProd, scriptImgs, favArtigo, qLogo } = B;`],
  [`<figure class="reserva q"><figcaption><b>3D · O Q do logo em vidro</b><span class="det">rosa-coral, com laço, fundo transparente, 1:1</span></figcaption></figure>`, `<figure class="reserva q">\${qLogo()}</figure>`],
  [`<figure class="reserva q"><figcaption><b>3D · Q de vidro com laço de Natal</b><span class="det">mesmo objeto da abertura · 1:1</span></figcaption></figure>`, `<figure class="reserva q">\${qLogo('Q do logo · versão 3D de Natal entra aqui')}</figure>`],
  [`.reserva.q figcaption{max-width:20ch}`, `.reserva.q{flex-direction:column}`],
  // categoria Interesse leva para o modelo de página de categoria
  [`href="https://oquedar.com/category/\${c[1]}/"`, `href="\${c[1] === 'interesse' ? 'layout-categoria.html' : 'https://oquedar.com/category/' + c[1] + '/'}"`],
]);

patch('artigo.js', [
  [`<thead><tr><th scope="col">Presente</th><th scope="col">Para quem</th><th scope="col">Nota</th>`, `<thead><tr><th scope="col">Presente</th><th scope="col">Nota</th>`],
  [`<span class="cel-prod"><span class="mini-prod c-\${p.cor}">\${imgProd(i)}</span>`, `<span class="cel-prod"><span class="num-c">\${String(i + 1).padStart(2, '0')}</span><span class="mini-prod c-\${p.cor}">\${imgProd(i)}</span>`],
  [`<a class="nome" href="#p-\${i + 1}">\${esc(nomes[i])}</a></span></th><td>\${p.perfil[0]}</td>`, `<a class="nome" href="#p-\${i + 1}">\${esc(nomes[i])}</a></span></th>`],
  [`table{width:100%;border-collapse:collapse;min-width:640px}`, `table{width:100%;border-collapse:collapse;min-width:520px}
.num-c{font-size:var(--t-rotulo);font-weight:var(--peso-forte);color:var(--apoio);font-variant-numeric:tabular-nums;width:24px;flex:none}`],
  [`<li><a href="https://oquedar.com/category/interesse/">Interesse</a></li><li><span aria-current="page">Basquete</span></li>`, `<li><a href="layout-categoria.html">Interesse</a></li><li><span aria-current="page">Basquete</span></li>`],
]);
