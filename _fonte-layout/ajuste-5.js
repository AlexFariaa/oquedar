// Ajuste 5 (19/11/2026): Q ao lado do título, fita de ponta a ponta, newsletter mais larga, artigo com respiro, fundos novos, newsletter final, pop-up de salvar, opções de rodapé.
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-5.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.replace(a, b); }
  fs.writeFileSync(f, s); console.log(arquivo, trocas.length, 'trocas');
}

// ================= BASE =================
patch('base.js', [
  [`.btn-sec{background:transparent;color:var(--tinta);border-color:var(--fio-forte)}`, `.btn-sec{background:transparent;color:var(--tinta);border-color:var(--fio-forte)}
.btn-escuro{background:var(--tinta);color:var(--fundo)}
.wrap-larga{max-width:1600px}`],
]);

// ================= INICIAL =================
patch('inicial.js', [
  [`.abertura h1{grid-column:1/-1;max-width:19ch;margin-top:var(--e5);font-size:clamp(3rem,6.2vw,6rem);position:relative;z-index:2}`,
   `.abertura{min-height:min(100dvh,900px)}
.abertura h1{grid-column:1/-1;max-width:19ch;margin-top:var(--e5);font-size:clamp(3rem,5.6vw,5.5rem);position:relative;z-index:2}`],
  [`.cena{position:absolute;right:var(--margem);top:300px;width:min(40%,480px);height:520px;z-index:1}`,
   `.cena{position:absolute;right:calc(var(--margem) + 2%);top:40px;width:min(36%,460px);height:520px;z-index:1}`],
  [`.v1{left:-4%;top:12%}.v2{right:-2%;top:44%;animation-delay:-2s}.v3{left:6%;bottom:8%;animation-delay:-4s}`,
   `.v1{left:8%;top:6%}.v2{right:-6%;top:46%;animation-delay:-2s}.v3{left:2%;bottom:10%;animation-delay:-4s}`],
  [`.fb .fita{position:absolute;left:-6%;top:34%;width:112%;height:220px;`,
   `.fb .fita{position:absolute;left:calc(-1 * ((100vw - min(100vw, var(--largura))) / 2 + var(--margem)));top:34%;width:100vw;height:220px;`],
  [`  <section class="bloco-secao" aria-labelledby="t-news">
    <div class="wrap">`, `  <section class="bloco-secao" aria-labelledby="t-news">
    <div class="wrap wrap-larga">`],
  [`.na{position:relative;overflow:hidden;border-radius:var(--raio);min-height:520px;`, `.na{position:relative;overflow:hidden;border-radius:var(--raio);min-height:560px;`],
]);

// ================= ARTIGO =================
patch('artigo.js', [
  [`.art-main{grid-column:1/span 9;min-width:0}`, `.art-main{grid-column:1/span 8;min-width:0}`],
  [`.leitura{max-width:40em}`, `.leitura{max-width:46em}
.leitura p{line-height:1.7}
.bloco-cor{border-radius:var(--raio);padding:clamp(28px,4vw,56px)}
.bloco-cor .marcadores li a{border-color:transparent}
.bloco-escuro{background:var(--tinta);color:var(--fundo);border-radius:var(--raio);padding:clamp(28px,4vw,56px);--apoio:rgba(244,242,240,.72);--fio:rgba(244,242,240,.18);--fio-forte:rgba(244,242,240,.4)}
.bloco-escuro .faq summary .mais-ico{color:var(--fundo)}
.bloco-escuro .faq details[open] .mais-ico{color:var(--tinta)}

/* newsletter no fim do artigo */
.news-fim{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--e5);padding:clamp(56px,8vw,112px) var(--margem);border-radius:var(--raio);background:radial-gradient(60% 80% at 50% 0%,rgba(255,138,110,.22),transparent 70%),radial-gradient(50% 70% at 85% 100%,rgba(199,180,247,.35),transparent 70%),#fff}
.news-fim .pilha{display:flex}
.news-fim .pilha span{width:64px;height:64px;border-radius:50%;border:4px solid #fff;margin-left:-14px;overflow:hidden;box-shadow:0 8px 20px rgba(70,30,40,.10)}
.news-fim .pilha span:first-child{margin-left:0}
.news-fim .pilha .img-prod{padding:8px}
.news-fim h2{max-width:14ch}
.news-fim .abre{max-width:34em}
.news-fim form{width:min(520px,100%);display:flex;flex-direction:column;gap:var(--e3);align-items:stretch;text-align:left}
.news-fim .campo{display:flex;gap:var(--e2);background:#fff;border-radius:var(--pilula);padding:var(--e1);border:1.5px solid var(--fio-forte)}
.news-fim .campo:focus-within{border-color:var(--tinta)}
.news-fim .campo input{flex:1;min-width:0;border:0;background:transparent;font:inherit;padding:0 var(--e4);min-height:48px;color:var(--tinta)}
.news-fim .campo input:focus{outline:none}
.news-fim small{font-size:var(--t-rotulo);color:var(--apoio);text-align:center}

/* pop-up para guardar */
.popup{position:fixed;left:50%;bottom:var(--e5);z-index:calc(var(--z-menu) + 2);width:min(560px,calc(100% - 24px));transform:translateX(-50%);display:grid;grid-template-columns:auto 1fr;gap:var(--e4) var(--e5);align-items:center;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid #fff;border-radius:var(--raio);padding:var(--e5);box-shadow:0 30px 80px rgba(70,30,40,.25);animation:popup .5s var(--curva)}
@keyframes popup{from{opacity:0;transform:translate(-50%,24px)}}
.popup .ico{width:64px;height:64px;border-radius:var(--raio-interno);background:var(--degrade);display:grid;place-items:center}
.popup .ico svg{width:28px;height:28px;color:var(--tinta);fill:#fff}
.popup h2{margin-bottom:var(--e1)}
.popup p{color:var(--apoio);line-height:1.45}
.popup .acoes-pop{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:var(--e2);align-items:center}
.popup .fechar-pop{position:absolute;right:var(--e2);top:var(--e2);width:40px;height:40px;border:0;background:none;border-radius:50%;cursor:pointer;font-size:var(--t-sub);line-height:1;color:var(--apoio)}
.popup .fechar-pop:hover{background:var(--fundo)}
.popup .ok{grid-column:1/-1;font-weight:var(--peso-forte)}
@media (max-width:560px){.popup{grid-template-columns:1fr}.popup .ico{display:none}.popup .acoes-pop .btn{flex:1}}`],
  [`<section class="secao-art texto-art" id="qual"`, `<section class="secao-art texto-art bloco-cor c-lavanda" id="qual"`],
  [`<section class="secao-art texto-art" id="faq"`, `<section class="secao-art texto-art bloco-escuro" id="faq"`],
  [`  <section class="secao-art wrap" aria-labelledby="t-mais">`, `  <section class="secao-art wrap" aria-labelledby="t-news-fim">
    <div class="news-fim entra">
      <div class="pilha" aria-hidden="true">\${[0, 4, 1, 8, 13].map(i => \`<span class="c-\${P[i].cor}">\${imgProd(i)}</span>\`).join('')}</div>
      <span class="tag">Newsletter O que dar?</span>
      <h2 class="gigante" id="t-news-fim">Ideias de presentes sempre.</h2>
      <p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p>
      <form action="#" onsubmit="return false" aria-label="Assinar a newsletter">
        <label class="sr" for="email-fim">Seu e-mail</label>
        <div class="campo"><input id="email-fim" type="email" placeholder="seu@email.com" autocomplete="email"><button class="btn btn-oferta" type="submit">Assinar</button></div>
        <small>Layout preliminar: o envio ainda não está conectado.</small>
      </form>
    </div>
  </section>

  <section class="secao-art wrap" aria-labelledby="t-mais">`],
  [`</main>
\${rodape}`, `</main>
<div class="popup" id="popup" role="dialog" aria-labelledby="t-popup" hidden>
  <button class="fechar-pop" type="button" id="popup-x" aria-label="Fechar">&times;</button>
  <span class="ico" aria-hidden="true">\${CORACAO}</span>
  <div>
    <h2 class="sub" id="t-popup">Guarde para ver depois.</h2>
    <p>Salve este artigo e os presentes que você gostou. Quando chegar a data, está tudo em Favoritos.</p>
  </div>
  <div class="acoes-pop">
    <button class="btn btn-escuro" type="button" id="popup-salvar" data-fav-tipo="artigos" data-fav-id="art-0" data-fav-nome="\${a0.t}" data-fav-url="layout-artigo.html" data-fav-cor="lavanda" aria-pressed="false">\${CORACAO}<span>Salvar artigo</span></button>
    <a class="btn btn-sec" href="#selecao" id="popup-presentes">Escolher presentes</a>
    <button class="btn btn-sec" type="button" id="popup-nao" style="border-color:transparent">Agora não</button>
  </div>
  <p class="ok" id="popup-ok" hidden>Salvo! Está em Favoritos, no topo da página.</p>
</div>
\${rodape}`],
  [`  var mov=document.querySelector('.indice-movel');`, `  /* pop-up para guardar: aparece uma vez por visita, depois de metade do artigo, se ainda não foi salvo */
  var pop=document.getElementById('popup'),mostrou=false;try{mostrou=sessionStorage.getItem('oqd-popup')==='1';}catch(e){}
  function fechaPop(){pop.hidden=true;}
  document.getElementById('popup-x').onclick=fechaPop;document.getElementById('popup-nao').onclick=fechaPop;document.getElementById('popup-presentes').addEventListener('click',fechaPop);
  document.getElementById('popup-salvar').addEventListener('click',function(){var ok=document.getElementById('popup-ok');setTimeout(function(){ok.hidden=false;setTimeout(fechaPop,1800);},50);});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!pop.hidden)fechaPop();});
  addEventListener('scroll',function(){if(mostrou)return;var r=art.getBoundingClientRect();var t=-r.top/(r.height-innerHeight);if(t>.5){mostrou=true;try{sessionStorage.setItem('oqd-popup','1');}catch(e){}if(document.querySelector('.fav-artigo').getAttribute('aria-pressed')==='true')return;pop.hidden=false;}},{passive:true});
  var mov=document.querySelector('.indice-movel');`],
]);

// ================= OPÇÕES: rodapé =================
patch('opcoes.js', [
  [`const { fs, path, OUT, head } = B;`, `const { fs, path, OUT, head, LOGO_ESCURO } = B;
const colunas = () => \`<div><h3 class="rotulo">Presentes por</h3><ul><li><a href="#">Gênero</a></li><li><a href="#">Idade</a></li><li><a href="#">Preço</a></li><li><a href="#">Interesse</a></li><li><a href="#">Ocasião</a></li><li><a href="#">Relacionamento</a></li><li><a href="#">Profissão</a></li></ul></div>
  <div><h3 class="rotulo">Informações gerais</h3><ul><li><a href="#">Política de Privacidade</a></li><li><a href="#">Termos de Uso</a></li><li><a href="#">Declaração de Afiliados</a></li><li><a href="#">Sobre nós</a></li></ul></div>
  <div><h3 class="rotulo">Contato</h3><ul><li><a href="#">contato@oquedar.com.br</a></li><li><a href="#">Página de contato</a></li></ul></div>\`;
const linha = \`<div class="r-linha"><span>© 2026 O que dar?</span><span>Criação de sites profissionais por A2 Marketing</span></div>\`;
const logoR = \`<span class="r-logo"><img src="\${LOGO_ESCURO}" alt="O que dar?"></span>\`;`],
  [`@media (max-width:900px){
  .cabeca h2,.cabeca p{grid-column:1/-1}`, `/* rodapés */
.rod{border-radius:var(--raio);overflow:hidden;position:relative;padding:clamp(40px,5vw,72px) clamp(24px,4vw,56px) var(--e5)}
.rod ul{display:grid;gap:var(--e1)}
.rod li a{display:inline-flex;min-height:34px;align-items:center;text-decoration:none}
.rod li a:hover{text-decoration:underline;text-underline-offset:4px}
.rod .rotulo{margin-bottom:var(--e3)}
.r-escuro{background:var(--tinta);color:var(--fundo);--apoio:rgba(244,242,240,.7);--fio:rgba(244,242,240,.16)}
.r-cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e6)}
.r-linha{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--e3);border-top:1px solid var(--fio);padding-top:var(--e5);margin-top:var(--e7);font-size:var(--t-rotulo);color:var(--apoio)}
.r-logo{display:block;width:180px;height:79px;overflow:hidden;position:relative}
.r-logo img{position:absolute;left:0;top:-31px;width:180px;max-width:none;mix-blend-mode:lighten}
/* B: chamada no topo */
.rb .chamada{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end;padding-bottom:var(--e7);margin-bottom:var(--e7);border-bottom:1px solid var(--fio)}
.rb .chamada h2{grid-column:1/span 7}
.rb .chamada .lado{grid-column:9/span 4;display:flex;flex-direction:column;gap:var(--e3)}
.rb .baixo{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.rb .baixo .sobre-r{grid-column:1/span 4;display:flex;flex-direction:column;gap:var(--e4)}
.rb .baixo .r-cols{grid-column:6/span 7}
.rb .sobre-r p{color:var(--apoio);max-width:34ch}
/* C: Q gigante */
.rc{min-height:520px}
.rc .brilho{position:absolute;border-radius:50%;filter:blur(70px);opacity:.55;pointer-events:none}
.rc .b1{width:520px;aspect-ratio:1;right:-120px;top:-120px;background:radial-gradient(circle,#FF6650 0%,transparent 68%)}
.rc .b2{width:420px;aspect-ratio:1;right:120px;bottom:-200px;background:radial-gradient(circle,#C7B4F7 0%,transparent 68%)}
.rc .q-gig{position:absolute;right:-90px;top:50%;transform:translateY(-50%);width:520px;aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.07);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;padding:0 140px 0 60px;text-align:center}
.rc .q-gig figcaption{color:var(--tinta)}
.rc .conteudo{position:relative;width:min(62%,760px);display:flex;flex-direction:column;gap:var(--e6)}
/* D: claro em degradê */
.rd{background:var(--degrade);padding-bottom:0}
.rd .vidro-r{background:rgba(255,255,255,.4);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.8);border-radius:var(--raio);padding:clamp(24px,4vw,48px);display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.rd .vidro-r .sobre-r{grid-column:1/span 4;display:flex;flex-direction:column;gap:var(--e3)}
.rd .vidro-r .r-cols{grid-column:6/span 7}
.rd .r-logo img{mix-blend-mode:normal;filter:none}
.rd .r-logo-claro{display:block;width:180px;height:79px;overflow:hidden;position:relative}
.rd .r-logo-claro img{position:absolute;left:0;top:-31px;width:180px;max-width:none}
.rd .r-linha{border-top-color:rgba(28,26,31,.15);margin-top:var(--e5);color:var(--tinta)}
.rd .palavra-r{font-size:clamp(4.5rem,17vw,15rem);font-weight:var(--peso-forte);letter-spacing:-.055em;line-height:.78;color:rgba(255,255,255,.75);margin:var(--e7) 0 -.12em -.05em;white-space:nowrap}
@media (max-width:900px){
  .r-cols{grid-template-columns:1fr 1fr}
  .rb .chamada h2,.rb .chamada .lado,.rb .baixo .sobre-r,.rb .baixo .r-cols,.rd .vidro-r .sobre-r,.rd .vidro-r .r-cols{grid-column:1/-1}
  .rc .q-gig{display:none}.rc .conteudo{width:100%}
  .cabeca h2,.cabeca p{grid-column:1/-1}`],
  [`</main>
<p class="aviso-layout" role="note">Comparação de opções · áreas com legenda são reservas de imagem</p>`, `  <div class="grupo"><div class="wrap"><h1 class="titulo">Rodapé</h1><p class="abre">Hoje o rodapé é escuro, com o logo, as colunas de links e o "O que dar?" gigante (opção A, a atual). Outras três possibilidades:</p></div>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção B · Chamada antes dos links</b><span class="meta">O rodapé começa com uma última chamada para a busca e a newsletter, e só depois vêm os links. Aproveita quem chegou ao fim da página.</span></div>
      <footer class="rod r-escuro rb">
        <div class="chamada"><h2 class="titulo">Ainda sem ideia do que dar?</h2><div class="lado"><p style="color:var(--apoio)">Monte sua pergunta e a gente procura por você.</p><a class="btn btn-oferta" href="#">Montar minha busca</a></div></div>
        <div class="baixo"><div class="sobre-r">\${logoR}<p>O O que dar? é um blog especializado em ideias de presentes para todas as ocasiões.</p></div><div class="r-cols">\${colunas()}</div></div>
        \${linha}
      </footer>
    </div></section>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção C · O Q de vidro gigante</b><span class="meta">O Q do logo em vidro, enorme e cortado na borda, com brilho coral e lavanda. Fecha a página com o mesmo objeto da abertura.</span></div>
      <footer class="rod r-escuro rc">
        <div class="brilho b1" aria-hidden="true"></div><div class="brilho b2" aria-hidden="true"></div>
        <figure class="reserva q-gig"><figcaption><b>3D · Q de vidro gigante</b>cortado na borda direita</figcaption></figure>
        <div class="conteudo">\${logoR}<div class="r-cols">\${colunas()}</div></div>
        \${linha}
      </footer>
    </div></section>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção D · Claro, em degradê com vidro</b><span class="meta">O rodapé deixa de ser escuro: degradê da marca, links num vidro fosco e o "O que dar?" gigante em branco translúcido na base.</span></div>
      <footer class="rod rd">
        <div class="vidro-r"><div class="sobre-r"><span class="r-logo-claro"><img src="\${B.LOGO}" alt="O que dar?"></span><p>O O que dar? é um blog especializado em ideias de presentes para todas as ocasiões.</p></div><div class="r-cols">\${colunas()}</div></div>
        \${linha}
        <p class="palavra-r" aria-hidden="true">O que dar?</p>
      </footer>
    </div></section>
  </div>
</main>
<p class="aviso-layout" role="note">Comparação de opções · áreas com legenda são reservas de imagem</p>`],
]);
