// Opções para "Como o OQD funciona" e para a newsletter: opcoes-secoes.html
const B = require('./base.js');
const { fs, path, OUT, head, LOGO_ESCURO } = B;
const colunas = () => `<div><h3 class="rotulo">Presentes por</h3><ul><li><a href="#">Gênero</a></li><li><a href="#">Idade</a></li><li><a href="#">Preço</a></li><li><a href="#">Interesse</a></li><li><a href="#">Ocasião</a></li><li><a href="#">Relacionamento</a></li><li><a href="#">Profissão</a></li></ul></div>
  <div><h3 class="rotulo">Informações gerais</h3><ul><li><a href="#">Política de Privacidade</a></li><li><a href="#">Termos de Uso</a></li><li><a href="#">Declaração de Afiliados</a></li><li><a href="#">Sobre nós</a></li></ul></div>
  <div><h3 class="rotulo">Contato</h3><ul><li><a href="#">contato@oquedar.com.br</a></li><li><a href="#">Página de contato</a></li></ul></div>`;
const linha = `<div class="r-linha"><span>© 2026 O que dar?</span><span>Criação de sites profissionais por A2 Marketing</span></div>`;
const logoR = `<span class="r-logo"><img src="${LOGO_ESCURO}" alt="O que dar?"></span>`;

// fita: curva tirada do laço do logo
const fita = (w, h, d, cls = '') => `<svg class="fita ${cls}" viewBox="0 0 ${w} ${h}" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" stroke="currentColor" stroke-width="3" stroke-linecap="round" pathLength="1"/></svg>`;

const passos = [
  ['A curadoria escolhe pelo perfil', 'Cada lista é pensada para um tipo de pessoa, de interesse ou de ocasião.', 'lavanda'],
  ['Comparamos as lojas', 'Mostramos o preço na Amazon, no Mercado Livre e na Shopee, lado a lado.', 'rosa'],
  ['Você compra direto na loja', 'A compra acontece no marketplace. O OQD não vende nem cobra nada.', 'pessego'],
];
const transp = `<p class="transparencia"><span>Quando você compra por um link do OQD, podemos receber uma comissão da loja. Você não paga nada a mais por isso.</span><a class="link" href="#">Ler a declaração de afiliados</a></p>`;
const form = (escuro) => `<form action="#" onsubmit="return false" aria-label="Assinar a newsletter"><label class="rotulo" ${escuro ? '' : 'style="color:var(--tinta)"'}>Seu e-mail</label><div class="campo"><input type="email" placeholder="seu@email.com" aria-label="Seu e-mail"><button class="btn btn-oferta" type="submit">Assinar</button></div></form>`;

const CSS_OPC = `
section{position:relative}
.rot-opc{display:flex;flex-wrap:wrap;gap:var(--e3);align-items:baseline;padding:var(--e7) 0 var(--e5)}
.rot-opc b{font-size:var(--t-sub);letter-spacing:-.02em}
.grupo{border-top:6px solid var(--tinta);margin-top:var(--e9)}
.grupo:first-of-type{margin-top:0}
.grupo > .wrap > h1{padding-top:var(--e8)}
.opc{padding-bottom:var(--e9)}
.opc + .opc{border-top:1px dashed var(--fio-forte)}
.cabeca{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end;margin-bottom:var(--e7)}
.cabeca h2{grid-column:1/span 7}
.cabeca p{grid-column:9/span 4}
.transparencia{margin-top:var(--e7);display:flex;flex-wrap:wrap;gap:var(--e3) var(--e5);align-items:center;border-top:1px solid var(--fio);padding-top:var(--e5);color:var(--apoio)}
.fita{color:var(--coral);overflow:visible}
.fita path{stroke-dasharray:1;stroke-dashoffset:1;animation:desenha 2.4s var(--curva) .3s forwards}
@keyframes desenha{to{stroke-dashoffset:0}}
.campo{display:flex;gap:var(--e2);background:#fff;border-radius:var(--pilula);padding:var(--e1);border:1.5px solid transparent}
.campo:focus-within{border-color:var(--tinta)}
.campo input{flex:1;min-width:0;border:0;background:transparent;font:inherit;padding:0 var(--e4);min-height:48px;color:var(--tinta)}
.campo input:focus{outline:none}
form{display:flex;flex-direction:column;gap:var(--e3)}

/* A: fita que liga os passos */
.fa{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e6);padding-top:var(--e4)}
.fa .fita{position:absolute;left:0;top:0;width:100%;height:120px}
.fa li{position:relative;display:flex;flex-direction:column;gap:var(--e3)}
.fa li:nth-child(2){margin-top:72px}
.fa .n{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;font-size:var(--t-sub);font-weight:var(--peso-forte);border:4px solid var(--fundo);box-shadow:0 10px 30px rgba(120,50,50,.12)}
.fa li:nth-child(1) .n{margin-top:28px}
.fa li:nth-child(3) .n{margin-top:28px}
.fa p{color:var(--apoio);max-width:30ch}

/* B: cartões com a fita por trás */
.fb{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e5)}
.fb .fita{position:absolute;left:-4%;top:42%;width:108%;height:180px;z-index:0}
.fb li{position:relative;z-index:1;border-radius:var(--raio);padding:var(--e6);display:flex;flex-direction:column;gap:var(--e4);min-height:300px;box-shadow:0 20px 50px rgba(120,50,50,.10)}
.fb li .num{font-size:var(--t-rotulo);font-weight:var(--peso-forte);letter-spacing:.08em}
.fb li h3{margin-top:auto}

/* C: vertical com curva */
.fc{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:start}
.fc .esq{grid-column:1/span 5;position:sticky;top:120px;display:flex;flex-direction:column;gap:var(--e4)}
.fc .esq .abre{max-width:30ch}
.fc ol{grid-column:7/span 6;position:relative;display:grid;gap:var(--e8);padding-left:96px}
.fc .fita{position:absolute;left:0;top:0;width:64px;height:100%}
.fc li{display:flex;flex-direction:column;gap:var(--e3);position:relative}
.fc li .n{position:absolute;left:-96px;top:-4px;display:grid;place-items:center;width:56px;height:56px;border-radius:50%;font-weight:var(--peso-forte);font-size:var(--t-sub);border:4px solid var(--fundo)}
.fc p{color:var(--apoio)}

/* newsletter A: foto de fundo com vidro */
.na{position:relative;overflow:hidden;border-radius:var(--raio);min-height:520px;display:flex;align-items:center;padding:clamp(32px,5vw,72px)}
.na .reserva{position:absolute;inset:0;border-radius:0;background:var(--degrade);justify-content:flex-end;align-items:flex-end;padding:var(--e5)}
.na .vidro{position:relative;width:min(560px,100%);display:flex;flex-direction:column;gap:var(--e5);background:rgba(255,255,255,.35);-webkit-backdrop-filter:blur(22px) saturate(1.2);backdrop-filter:blur(22px) saturate(1.2);border:1px solid rgba(255,255,255,.75);border-radius:var(--raio);padding:clamp(28px,4vw,48px)}
.na .abre{color:var(--tinta)}

/* newsletter B: etiqueta de presente */
.nb{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:center}
.nb .txt{grid-column:1/span 5;display:flex;flex-direction:column;gap:var(--e4)}
.etq{grid-column:7/span 6;position:relative;background:var(--lavanda);clip-path:polygon(14% 0,100% 0,100% 100%,14% 100%,0 50%);padding:var(--e7) var(--e7) var(--e7) 22%;transform:rotate(-2deg);min-height:260px;display:flex;flex-direction:column;justify-content:center;gap:var(--e3)}
.etq::before{content:"";position:absolute;left:6.5%;top:50%;width:22px;height:22px;border-radius:50%;background:var(--fundo);transform:translateY(-50%)}
.etq .de{font-size:var(--t-sub);font-weight:var(--peso-forte);letter-spacing:-.02em}

/* newsletter C: faixa em degradê com o Q */
.nc{position:relative;overflow:hidden;border-radius:var(--raio);background:var(--degrade);padding:clamp(40px,6vw,96px);display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:center}
.nc .txt{grid-column:1/span 7;display:flex;flex-direction:column;gap:var(--e5)}
.nc .abre{color:var(--tinta)}
.nc .reserva.q{grid-column:9/span 4;justify-self:center;width:min(100%,300px);aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.28);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.7);justify-content:center;align-items:center;text-align:center}

/* rodapés */
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
  .cabeca h2,.cabeca p{grid-column:1/-1}
  .fa,.fb{grid-template-columns:1fr}
  .fa .fita,.fb .fita{display:none}
  .fa li:nth-child(2){margin-top:0}
  .fa li .n{margin-top:0!important}
  .fc .esq,.fc ol{grid-column:1/-1}
  .fc .esq{position:relative;top:auto}
  .nb .txt,.etq,.nc .txt,.nc .reserva.q{grid-column:1/-1}
  .etq{transform:none;padding-left:26%}
}
@media (prefers-reduced-motion:reduce){.fita path{stroke-dashoffset:0}}
`;

const cabecaComo = `<div class="cabeca"><h2 class="titulo">Como o OQD funciona.</h2><p class="abre">Você chega com uma dúvida e sai com o presente e a loja certa.</p></div>`;
const pagina = head('Opções de seções · O que dar?', 'Opções para Como o OQD funciona e para a newsletter.', CSS_OPC) + `
<body>
<main>
  <div class="grupo"><div class="wrap"><h1 class="titulo">Como o OQD funciona</h1><p class="abre">Três jeitos de mostrar os passos. Nos três, a curva coral é a fita do laço do logo, desenhada como um elemento gráfico.</p></div>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção A · A fita liga os passos</b><span class="meta">Uma fita só atravessa a seção e passa pelos três números, como um laço sendo desfeito. Ela se desenha quando a seção aparece.</span></div>
      ${cabecaComo}
      <ol class="fa">${fita(1000, 120, 'M30 60 C 180 -10, 260 140, 470 110 S 760 0, 970 60')}
        ${passos.map((p, k) => `<li><span class="n c-${p[2]}">${k + 1}</span><h3 class="sub">${p[0]}</h3><p>${p[1]}</p></li>`).join('')}
      </ol>
      ${transp}
    </div></section>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção B · Cartões com a fita por trás</b><span class="meta">Três cartões nas cores dos perfis, com a fita passando por trás e ligando um ao outro. Mais cor, mais presença.</span></div>
      ${cabecaComo}
      <ol class="fb">${fita(1000, 180, 'M0 120 C 120 20, 220 20, 330 90 S 520 180, 660 80 S 880 -10, 1000 70')}
        ${passos.map((p, k) => `<li class="c-${p[2]}"><span class="num">PASSO ${k + 1}</span><h3 class="sub">${p[0]}</h3><p>${p[1]}</p></li>`).join('')}
      </ol>
      ${transp}
    </div></section>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção C · Vertical, com a fita descendo</b><span class="meta">O título fica parado à esquerda e os passos descem pela direita, ligados por uma fita ondulada. Mais calmo, bom para leitura.</span></div>
      <div class="fc">
        <div class="esq"><h2 class="titulo">Como o OQD funciona.</h2><p class="abre">Você chega com uma dúvida e sai com o presente e a loja certa.</p></div>
        <ol>${fita(64, 600, 'M28 10 C 60 90, -4 160, 28 240 S 60 400, 28 470 S -4 560, 28 600')}
          ${passos.map((p, k) => `<li><span class="n c-${p[2]}">${k + 1}</span><h3 class="sub">${p[0]}</h3><p>${p[1]}</p></li>`).join('')}
        </ol>
      </div>
      ${transp}
    </div></section>
  </div>

  <div class="grupo"><div class="wrap"><h1 class="titulo">Ideias de presentes sempre</h1><p class="abre">Três jeitos para a newsletter.</p></div>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção A · Foto de fundo com vidro</b><span class="meta">Uma foto ocupa o bloco inteiro e o texto fica num vidro fosco por cima, como você sugeriu.</span></div>
      <div class="na">
        <figure class="reserva"><figcaption><b>Foto de fundo</b>Mesa vista de cima com presentes embrulhados, fitas e cartões · 16:9 · área livre à esquerda</figcaption></figure>
        <div class="vidro"><h2 class="titulo">Ideias de presentes sempre.</h2><p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p>${form()}</div>
      </div>
    </div></section>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção B · Etiqueta de presente</b><span class="meta">O formulário vira uma etiqueta de presente: "Para: você". Lúdico e direto ao assunto.</span></div>
      <div class="nb">
        <div class="txt"><h2 class="titulo">Ideias de presentes sempre.</h2><p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p></div>
        <div class="etq"><span class="meta" style="color:var(--tinta)">Para</span><span class="de">você, toda semana</span>${form()}</div>
      </div>
    </div></section>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção C · Degradê com o Q de vidro</b><span class="meta">Repete o degradê e o Q de vidro da abertura e fecha a página com a mesma cara do começo.</span></div>
      <div class="nc">
        <div class="txt"><h2 class="titulo">Ideias de presentes sempre.</h2><p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p>${form()}</div>
        <figure class="reserva q"><figcaption><b>3D · Q de vidro</b>mesmo objeto da abertura</figcaption></figure>
      </div>
    </div></section>
  </div>
  <div class="grupo"><div class="wrap"><h1 class="titulo">Rodapé</h1><p class="abre">Hoje o rodapé é escuro, com o logo, as colunas de links e o "O que dar?" gigante (opção A, a atual). Outras três possibilidades:</p></div>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção B · Chamada antes dos links</b><span class="meta">O rodapé começa com uma última chamada para a busca e a newsletter, e só depois vêm os links. Aproveita quem chegou ao fim da página.</span></div>
      <footer class="rod r-escuro rb">
        <div class="chamada"><h2 class="titulo">Ainda sem ideia do que dar?</h2><div class="lado"><p style="color:var(--apoio)">Monte sua pergunta e a gente procura por você.</p><a class="btn btn-oferta" href="#">Montar minha busca</a></div></div>
        <div class="baixo"><div class="sobre-r">${logoR}<p>O O que dar? é um blog especializado em ideias de presentes para todas as ocasiões.</p></div><div class="r-cols">${colunas()}</div></div>
        ${linha}
      </footer>
    </div></section>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção C · O Q de vidro gigante</b><span class="meta">O Q do logo em vidro, enorme e cortado na borda, com brilho coral e lavanda. Fecha a página com o mesmo objeto da abertura.</span></div>
      <footer class="rod r-escuro rc">
        <div class="brilho b1" aria-hidden="true"></div><div class="brilho b2" aria-hidden="true"></div>
        <figure class="reserva q-gig"><figcaption><b>3D · Q de vidro gigante</b>cortado na borda direita</figcaption></figure>
        <div class="conteudo">${logoR}<div class="r-cols">${colunas()}</div></div>
        ${linha}
      </footer>
    </div></section>

    <section class="opc"><div class="wrap">
      <div class="rot-opc"><b>Opção D · Claro, em degradê com vidro</b><span class="meta">O rodapé deixa de ser escuro: degradê da marca, links num vidro fosco e o "O que dar?" gigante em branco translúcido na base.</span></div>
      <footer class="rod rd">
        <div class="vidro-r"><div class="sobre-r"><span class="r-logo-claro"><img src="${B.LOGO}" alt="O que dar?"></span><p>O O que dar? é um blog especializado em ideias de presentes para todas as ocasiões.</p></div><div class="r-cols">${colunas()}</div></div>
        ${linha}
        <p class="palavra-r" aria-hidden="true">O que dar?</p>
      </footer>
    </div></section>
  </div>
</main>
<p class="aviso-layout" role="note">Comparação de opções · áreas com legenda são reservas de imagem</p>
</body>
</html>`;
fs.writeFileSync(path.join(OUT, 'opcoes-secoes.html'), pagina);
console.log('opcoes ok');
