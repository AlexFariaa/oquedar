// Ajuste 4 (19/11/2026): abertura em 3 linhas, seleção arredondada, Natal anterior, como funciona B, newsletter A, movimentos leves, artigo mais largo, assistente.
const fs = require('fs');
function patch(arquivo, trocas) {
  const f = __dirname + '/' + arquivo; let s = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '.antes-ajuste-4.js'), s);
  for (const [a, b] of trocas) { if (!s.includes(a)) { console.error(arquivo, 'NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.replace(a, b); }
  fs.writeFileSync(f, s); console.log(arquivo, trocas.length, 'trocas');
}

// ================= INICIAL =================
patch('inicial.js', [
  // abertura: título em 3 linhas, cena mais baixa
  [`.abertura h1{grid-column:1/span 7;margin-top:var(--e5)}`, `.abertura h1{grid-column:1/-1;max-width:19ch;margin-top:var(--e5);font-size:clamp(3rem,6.2vw,6rem);position:relative;z-index:2}`],
  [`.cena{position:absolute;right:var(--margem);top:var(--e5);width:min(40%,500px);height:560px;z-index:1}`, `.cena{position:absolute;right:var(--margem);top:300px;width:min(40%,480px);height:520px;z-index:1}
.js .abertura .selo-topo,.js .abertura h1,.js .abertura .abre,.js .abertura .cta{animation:sobe .9s var(--curva) both}
.js .abertura h1{animation-delay:.08s}.js .abertura .abre{animation-delay:.18s}.js .abertura .cta{animation-delay:.26s}
.js .cena{animation:aparece 1.2s var(--curva) .3s both}
@keyframes sobe{from{opacity:0;transform:translateY(18px)}}
@keyframes aparece{from{opacity:0;transform:scale(.94)}}`],
  // seleção arredondada sob medida
  [`.sel{position:relative;display:inline-block;vertical-align:middle;margin:0 var(--e1)}
.sel select{appearance:none;-webkit-appearance:none;font:inherit;font-size:var(--t-corpo);font-weight:var(--peso-forte);color:var(--tinta);background:#fff;border:0;border-radius:var(--pilula);height:40px;padding:0 36px 0 var(--e4);cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.25);transition:box-shadow .2s var(--curva)}
@media (pointer:coarse){.sel select{height:44px}}
.sel::after{content:"";position:absolute;right:15px;top:50%;width:7px;height:7px;border-right:2px solid var(--coral);border-bottom:2px solid var(--coral);transform:translateY(-70%) rotate(45deg);pointer-events:none}
.sel select.troca{animation:troca .5s var(--curva)}`,
  `.esc{position:relative;display:inline-block;vertical-align:middle;margin:0 var(--e1);line-height:1.3}
.esc > button{position:relative;font:inherit;font-size:var(--t-corpo);font-weight:var(--peso-forte);color:var(--tinta);background:#fff;border:0;border-radius:var(--pilula);height:40px;padding:0 38px 0 var(--e4);cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.25);white-space:nowrap;transition:box-shadow .2s var(--curva)}
@media (pointer:coarse){.esc > button{height:44px}}
.esc > button::after{content:"";position:absolute;right:16px;top:50%;width:7px;height:7px;border-right:2px solid var(--coral);border-bottom:2px solid var(--coral);transform:translateY(-70%) rotate(45deg);transition:transform .25s var(--curva)}
.esc > button[aria-expanded="true"]::after{transform:translateY(-20%) rotate(-135deg)}
.esc ul{position:absolute;left:0;top:calc(100% + var(--e2));min-width:100%;z-index:5;display:grid;gap:2px;padding:var(--e2);background:rgba(255,255,255,.96);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border-radius:var(--raio);box-shadow:0 20px 50px rgba(0,0,0,.30);animation:abre-esc .25s var(--curva)}
@keyframes abre-esc{from{opacity:0;transform:translateY(-6px) scale(.98)}}
.esc li{color:var(--tinta);font-size:var(--t-corpo);padding:var(--e2) var(--e4);border-radius:var(--pilula);cursor:pointer;white-space:nowrap}
.esc li:hover,.esc li.foco{background:var(--fundo)}
.esc li[aria-selected="true"]{background:var(--lavanda);font-weight:var(--peso-forte)}
.esc > button.troca{animation:troca .5s var(--curva)}`],
  [`  .sel,.sel select{max-width:100%}`, `  .esc,.esc > button{max-width:100%}`],
  [`<label>Quero um presente para <span class="sel"><select id="s-quem" aria-label="Para quem é o presente">\${opcoes(['um colega', 'minha mãe', 'meu namorado', 'uma amiga', 'meu pai', 'minha namorada'])}</select></span></label>
          <label>que gosta de <span class="sel"><select id="s-gosto" aria-label="Do que a pessoa gosta">\${opcoes(['café', 'basquete', 'correr', 'games', 'livros', 'cozinhar'])}</select></span></label>
          <label>até <span class="sel"><select id="s-preco" aria-label="Até quanto quer gastar">\${opcoes(['R$ 150', 'R$ 100', 'R$ 300', 'R$ 500', 'qualquer valor'])}</select></span></label>`,
  `<span>Quero um presente para \${esc_('s-quem', 'Para quem é o presente', ['um colega', 'minha mãe', 'meu namorado', 'uma amiga', 'meu pai', 'minha namorada'])}</span>
          <span>que gosta de \${esc_('s-gosto', 'Do que a pessoa gosta', ['café', 'basquete', 'correr', 'games', 'livros', 'cozinhar'])}</span>
          <span>até \${esc_('s-preco', 'Até quanto quer gastar', ['R$ 150', 'R$ 100', 'R$ 300', 'R$ 500', 'qualquer valor'])}</span>`],
  [`.frase label{white-space:nowrap}`, `.frase > span{white-space:nowrap}`],
  [`  .frase label{white-space:normal}`, `  .frase > span{white-space:normal}`],
  [`const opcoes = arr => arr.map(o => \`<option>\${o}</option>\`).join('');`,
  `const esc_ = (id, rotulo, ops) => \`<span class="esc" id="\${id}"><button type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="\${rotulo}: \${ops[0]}">\${ops[0]}</button><ul role="listbox" aria-label="\${rotulo}" hidden>\${ops.map((o, k) => \`<li role="option" aria-selected="\${k === 0}">\${o}</li>\`).join('')}</ul><input type="hidden" name="\${id}" value="\${ops[0]}"></span>\`;`],
  [`  /* lacunas que trocam de palavra até a pessoa mexer */
  var sels=['s-quem','s-gosto','s-preco'].map(function(i){return document.getElementById(i);});
  var parado=false; sels.forEach(function(s){['focus','change','pointerdown'].forEach(function(ev){s.addEventListener(ev,function(){parado=true;});});});
  if(!reduz){var k=0;setInterval(function(){if(parado||document.hidden)return;var s=sels[k%2];s.selectedIndex=(s.selectedIndex+1)%s.options.length;s.classList.remove('troca');void s.offsetWidth;s.classList.add('troca');k++;},2600);}`,
  `  /* seleção arredondada: abre lista, teclado, troca de palavra até a pessoa mexer */
  var escs=[].slice.call(document.querySelectorAll('.esc')),parado=false;
  function escolhe(e,i){var lis=e.querySelectorAll('li'),b=e.querySelector('button');lis.forEach(function(l,k){l.setAttribute('aria-selected',k===i);});b.textContent=lis[i].textContent;b.setAttribute('aria-label',b.getAttribute('aria-label').split(':')[0]+': '+lis[i].textContent);e.querySelector('input').value=lis[i].textContent;}
  function idx(e){var lis=[].slice.call(e.querySelectorAll('li'));return lis.findIndex(function(l){return l.getAttribute('aria-selected')==='true';});}
  function fechaE(e,foco){e.querySelector('ul').hidden=true;e.querySelector('button').setAttribute('aria-expanded','false');if(foco)e.querySelector('button').focus();}
  function abreE(e){escs.forEach(function(x){if(x!==e)fechaE(x);});var ul=e.querySelector('ul');ul.hidden=false;e.querySelector('button').setAttribute('aria-expanded','true');var lis=ul.querySelectorAll('li');lis.forEach(function(l){l.classList.remove('foco');});e._f=Math.max(0,idx(e));lis[e._f].classList.add('foco');}
  escs.forEach(function(e){var b=e.querySelector('button'),ul=e.querySelector('ul'),lis=ul.querySelectorAll('li');
    b.addEventListener('click',function(){parado=true;ul.hidden?abreE(e):fechaE(e);});
    lis.forEach(function(l,i){l.addEventListener('click',function(){escolhe(e,i);fechaE(e,true);});});
    e.addEventListener('keydown',function(ev){var aberto=!ul.hidden;if(ev.key==='ArrowDown'||ev.key==='ArrowUp'){ev.preventDefault();parado=true;if(!aberto){abreE(e);return;}lis[e._f].classList.remove('foco');e._f=(e._f+(ev.key==='ArrowDown'?1:-1)+lis.length)%lis.length;lis[e._f].classList.add('foco');}else if((ev.key==='Enter'||ev.key===' ')&&aberto){ev.preventDefault();escolhe(e,e._f);fechaE(e,true);}else if(ev.key==='Escape'&&aberto){ev.stopPropagation();fechaE(e,true);}});
  });
  document.addEventListener('click',function(ev){escs.forEach(function(e){if(!e.contains(ev.target))fechaE(e);});});
  if(!reduz){var k=0;setInterval(function(){if(parado||document.hidden)return;var e=escs[k%2];var n=e.querySelectorAll('li').length;escolhe(e,(idx(e)+1)%n);var b=e.querySelector('button');b.classList.remove('troca');void b.offsetWidth;b.classList.add('troca');k++;},2600);}
  /* a fita do "como funciona" se desenha quando aparece */
  var fb=document.querySelector('.fb');if(fb&&'IntersectionObserver' in window){var io2=new IntersectionObserver(function(es){if(es[0].isIntersecting){fb.classList.add('desenhar');io2.disconnect();}},{rootMargin:'0px 0px -20% 0px'});io2.observe(fb);}else if(fb)fb.classList.add('desenhar');`],
  // Natal: volta para a versão anterior (degradê de ponta a ponta com o Q)
  [`.faixa{position:relative;overflow:hidden;min-height:88dvh;display:flex;align-items:center;padding:clamp(96px,12vw,176px) 0}
.fundo-foto{position:absolute;inset:0;border-radius:0;background:var(--degrade);justify-content:flex-end;align-items:flex-end;padding:var(--e6)}
.faixa-grade{position:relative;width:100%;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.vidro-natal{grid-column:1/span 7;display:flex;flex-direction:column;gap:var(--e5);align-items:flex-start;background:rgba(255,255,255,.30);-webkit-backdrop-filter:blur(22px) saturate(1.2);backdrop-filter:blur(22px) saturate(1.2);border:1px solid rgba(255,255,255,.75);border-radius:var(--raio);padding:clamp(32px,4.5vw,64px);box-shadow:0 30px 80px rgba(120,50,50,.15)}
.vidro-natal .gigante{font-size:clamp(3rem,7.5vw,7.5rem);line-height:.9}
.vidro-natal .abre{color:var(--tinta);max-width:34ch}`,
  `.faixa{position:relative;overflow:hidden;background:var(--degrade);min-height:88dvh;display:flex;align-items:center;padding:clamp(96px,12vw,176px) 0}
.faixa-grade{width:100%;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:center}
.faixa .gigante{font-size:clamp(3.5rem,10vw,9.5rem);line-height:.9}
.faixa .txt{grid-column:1/span 8;display:flex;flex-direction:column;gap:var(--e5);align-items:flex-start;position:relative;z-index:1}
.faixa .abre{color:var(--tinta);max-width:34ch}
.faixa .reserva.q{position:relative;left:auto;top:auto;transform:none;grid-column:9/span 4;justify-self:end;width:clamp(160px,28vw,400px)}`],
  [`  .vidro-natal{grid-column:1/-1}`, `  .faixa .txt,.faixa .reserva.q{grid-column:1/-1}
  .faixa .reserva.q{justify-self:start;order:-1;width:140px}`],
  [`      <figure class="reserva fundo-foto"><figcaption><b>Foto de fundo</b>Presentes de Natal embrulhados em papel kraft com fitas coral e rosa, luz quente, leve desfoque · tela cheia 16:9 · área livre à esquerda para o vidro</figcaption></figure>
      <div class="wrap faixa-grade">
        <div class="vidro-natal entra">`, `      <div class="wrap faixa-grade">
        <div class="txt entra">`],
  [`          <a class="btn btn-sec" href="https://oquedar.com/category/ocasiao/">Ver ideias por ocasião</a>
        </div>
      </div>`, `          <a class="btn btn-sec" href="https://oquedar.com/category/ocasiao/">Ver ideias por ocasião</a>
        </div>
        <figure class="reserva q"><figcaption><b>3D · Q de vidro com laço de Natal</b><span class="det">mesmo objeto da abertura · 1:1</span></figcaption></figure>
      </div>`],
  // como funciona: opção B com fita grossa
  [`.passos{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:var(--e4);align-items:start}`, `.fb{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e5)}
.fb .fita{position:absolute;left:-6%;top:34%;width:112%;height:220px;z-index:0;overflow:visible;filter:drop-shadow(0 10px 18px rgba(255,102,80,.25))}
.fb .fita path{stroke-width:22;stroke-linecap:round}
.js .fb .fita path{stroke-dasharray:1;stroke-dashoffset:1}
.js .fb.desenhar .fita path{transition:stroke-dashoffset 2.2s var(--curva);stroke-dashoffset:0}
.fb > li{position:relative;z-index:1;border-radius:var(--raio);padding:var(--e6);display:flex;flex-direction:column;gap:var(--e4);min-height:300px;box-shadow:0 20px 50px rgba(120,50,50,.10);transition:transform .3s var(--curva)}
.fb > li .num{font-size:var(--t-rotulo);font-weight:var(--peso-forte);letter-spacing:.08em}
.fb > li h3{margin-top:auto}
@media (hover:hover){.fb > li:hover{transform:translateY(-6px) rotate(-.5deg)}}
.passos{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:var(--e4);align-items:start}`],
  [`      <ol class="passos">
        <li class="passo entra"><span class="pil"><span class="n c-lavanda">1</span>A curadoria escolhe pelo perfil</span><p>Cada lista é pensada para um tipo de pessoa, de interesse ou de ocasião.</p></li>
        <li class="liga entra" data-atraso="120" aria-hidden="true"><svg viewBox="0 0 40 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h34M29 5l7 7-7 7"/></svg></li>
        <li class="passo entra" data-atraso="200"><span class="pil"><span class="n c-rosa">2</span>Comparamos as lojas</span><p>Mostramos o preço na Amazon, no Mercado Livre e na Shopee, lado a lado.</p></li>
        <li class="liga entra" data-atraso="320" aria-hidden="true"><svg viewBox="0 0 40 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h34M29 5l7 7-7 7"/></svg></li>
        <li class="passo entra" data-atraso="400"><span class="pil"><span class="n c-pessego">3</span>Você compra direto na loja</span><p>A compra acontece no marketplace. O OQD não vende nem cobra nada.</p></li>
      </ol>`,
  `      <ol class="fb">
        <svg class="fita" viewBox="0 0 1000 220" fill="none" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="g-fita" x1="0" x2="1"><stop offset="0" stop-color="#FF6650"/><stop offset=".55" stop-color="#FF8A6E"/><stop offset="1" stop-color="#F7A8C4"/></linearGradient></defs><path d="M0 150 C 120 30, 230 30, 340 110 S 540 210, 680 100 S 890 10, 1000 90" stroke="url(#g-fita)" pathLength="1"/></svg>
        <li class="c-lavanda entra"><span class="num">PASSO 1</span><h3 class="sub">A curadoria escolhe pelo perfil</h3><p>Cada lista é pensada para um tipo de pessoa, de interesse ou de ocasião.</p></li>
        <li class="c-rosa entra" data-atraso="120"><span class="num">PASSO 2</span><h3 class="sub">Comparamos as lojas</h3><p>Mostramos o preço na Amazon, no Mercado Livre e na Shopee, lado a lado.</p></li>
        <li class="c-pessego entra" data-atraso="240"><span class="num">PASSO 3</span><h3 class="sub">Você compra direto na loja</h3><p>A compra acontece no marketplace. O OQD não vende nem cobra nada.</p></li>
      </ol>`],
  [`  .passos{grid-template-columns:1fr}`, `  .passos,.fb{grid-template-columns:1fr}
  .fb .fita{display:none}
  .fb > li{min-height:0}`],
  // newsletter: opção A, foto de fundo com vidro
  [`.news{display:grid;`, `.na{position:relative;overflow:hidden;border-radius:var(--raio);min-height:520px;display:flex;align-items:center;padding:clamp(24px,5vw,72px)}
.na .fundo{position:absolute;inset:0;border-radius:0;background:var(--degrade);justify-content:flex-end;align-items:flex-end;padding:var(--e5)}
.na .vidro{position:relative;width:min(560px,100%);display:flex;flex-direction:column;gap:var(--e5);background:rgba(255,255,255,.35);-webkit-backdrop-filter:blur(22px) saturate(1.2);backdrop-filter:blur(22px) saturate(1.2);border:1px solid rgba(255,255,255,.75);border-radius:var(--raio);padding:clamp(24px,4vw,48px)}
.na .abre{color:var(--tinta)}
.na form{display:flex;flex-direction:column;gap:var(--e3)}
.na small{font-size:var(--t-rotulo);color:var(--tinta)}
.news{display:grid;`],
  [`      <div class="news entra">
        <div class="txt">
          <h2 class="titulo" id="t-news">Ideias de presentes sempre.</h2>
          <p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p>
        </div>`, `      <div class="na entra">
        <figure class="reserva fundo"><figcaption><b>Foto de fundo</b>Mesa vista de cima com presentes embrulhados, fitas e cartões · 16:9 · área livre à esquerda para o vidro</figcaption></figure>
        <div class="vidro">
          <h2 class="titulo" id="t-news">Ideias de presentes sempre.</h2>
          <p class="abre">Inscreva-se na nossa Newsletter e receba as melhores dicas de presentes no seu email.</p>`],
  [`          <small>Layout preliminar: o envio ainda não está conectado.</small>
        </form>
      </div>`, `          <small>Layout preliminar: o envio ainda não está conectado.</small>
        </form>
        </div>
      </div>`],
  // movimento leve: faixa de ocasiões correndo + zoom suave nas fotos
  [`/* categorias: escuro, dividido */`, `.corre{margin-top:var(--secao);overflow:hidden;padding:var(--e3) 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.corre-trilho{display:flex;gap:var(--e3);width:max-content;animation:corre 38s linear infinite}
.corre:hover .corre-trilho{animation-play-state:paused}
.corre span{display:inline-flex;align-items:center;gap:var(--e3);min-height:56px;padding:0 var(--e5);border-radius:var(--pilula);font-size:var(--t-sub);font-weight:var(--peso-forte);letter-spacing:-.02em;white-space:nowrap}
.corre i{width:10px;height:10px;border-radius:50%;background:var(--coral)}
@keyframes corre{to{transform:translateX(-50%)}}
.art-img img{transition:transform .6s var(--curva)}
@media (hover:hover){.art:hover .art-img img{transform:scale(1.04)}}
/* categorias: escuro, dividido */`],
  [`  <section class="cats-sec" id="categorias"`, `  <div class="corre" aria-hidden="true"><div class="corre-trilho">\${[0, 1].map(() => ['Aniversário', 'Natal', 'Dia das Mães', 'Amigo secreto', 'Dia dos Namorados', 'Dia dos Pais', 'Casa nova', 'Formatura', 'Casamento'].map((t, k) => \`<span class="c-\${['lavanda', 'rosa', 'pessego'][k % 3]}"><i></i>\${t}</span>\`).join('')).join('')}</div></div>

  <section class="cats-sec" id="categorias"`],
  [`.cats-sec{margin-top:var(--secao);`, `.cats-sec{margin-top:var(--e8);`],
  // lembrete do assistente
  [`<section class="bloco-secao" id="ideias" aria-labelledby="t-ideias">`, `<section class="bloco-secao" id="ideias" aria-labelledby="t-ideias" data-lembrete="Viu um artigo que combina com alguém? Toque no coração para guardar e ver depois em Favoritos.">`],
]);

// ================= ARTIGO =================
patch('artigo.js', [
  [`const CSS_ART = CSS_COMP + \``, `const CSS_ART = CSS_COMP + \`
:root{--largura:1440px}`],
  [`.art-main{grid-column:1/span 8;min-width:0}
.art-lado{grid-column:10/span 3;`, `.art-main{grid-column:1/span 9;min-width:0}
.art-lado{grid-column:10/span 3;`],
  [`.pausa{position:relative;z-index:2;width:100vw;margin:var(--e7) 0 var(--e7) calc((min(100vw, var(--largura)) - 100vw) / 2 - var(--margem));background:var(--rosa);padding:clamp(56px,8vw,120px) calc((100vw - min(100vw, var(--largura))) / 2 + var(--margem))}`,
   `.pausa{--sangria:calc((100vw - min(100vw, var(--largura))) / 2 + var(--margem));position:relative;width:calc(100% + var(--sangria));margin:var(--e7) 0 var(--e7) calc(-1 * var(--sangria));background:var(--rosa);border-radius:0 var(--raio) var(--raio) 0;padding:clamp(48px,6vw,96px) clamp(24px,4vw,64px) clamp(48px,6vw,96px) calc(var(--sangria) + clamp(0px,2vw,24px))}`],
  [`.pausa h2{grid-column:1/span 5}
.pausa .falas{grid-column:7/span 6;`, `.pausa h2{grid-column:1/span 5}
.pausa .falas{grid-column:6/span 7;`],
  [`.pausa .resto{grid-column:7/span 6;`, `.pausa .resto{grid-column:6/span 7;`],
  [`.prod-foto .img-prod{position:absolute;inset:0}`, `.prod-foto .img-prod{position:absolute;inset:0;transition:transform .6s var(--curva)}
@media (hover:hover){.prod-foto:hover .img-prod{transform:scale(1.05)}}`],
  [`<article class="produto" id="p-\${n}" data-faixa="\${faixa(p.precos[m])}">`, `<article class="produto" id="p-\${n}" data-faixa="\${faixa(p.precos[m])}"\${n === 3 ? ' data-lembrete="Gostou de algum presente? Toque no coração para salvar e ver depois, quando chegar a data."' : ''}>`],
]);

// ================= BASE: assistente =================
patch('base.js', [
  [`/* aviso de layout preliminar */`, `/* assistente */
.assist-bt{position:fixed;right:var(--e4);bottom:var(--e4);z-index:var(--z-menu);display:inline-flex;align-items:center;gap:var(--e2);min-height:56px;padding:0 var(--e5) 0 var(--e2);border:0;border-radius:var(--pilula);background:var(--tinta);color:var(--fundo);font:inherit;font-weight:var(--peso-forte);cursor:pointer;box-shadow:0 16px 40px rgba(28,26,31,.28);transition:transform .2s var(--curva)}
.assist-bt:active{transform:scale(.96)}
.assist-bt .bola{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--degrade)}
.assist-bt svg{width:20px;height:20px;color:var(--tinta)}
.balao{position:fixed;right:var(--e4);bottom:88px;z-index:var(--z-menu);width:min(300px,calc(100% - 32px));background:#fff;border-radius:var(--raio) var(--raio) 6px var(--raio);padding:var(--e4) var(--e6) var(--e4) var(--e4);box-shadow:0 20px 50px rgba(70,30,40,.18);line-height:1.45;animation:balao .5s var(--curva)}
@keyframes balao{from{opacity:0;transform:translateY(10px) scale(.96)}}
.balao button{position:absolute;right:4px;top:4px;width:36px;height:36px;border:0;background:none;border-radius:50%;cursor:pointer;font-size:var(--t-sub);line-height:1;color:var(--apoio)}
.assist{position:fixed;right:var(--e3);bottom:var(--e3);z-index:calc(var(--z-menu) + 1);width:min(380px,calc(100% - 24px));max-height:min(620px,calc(100dvh - 24px));display:flex;flex-direction:column;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid #fff;border-radius:var(--raio);box-shadow:0 30px 80px rgba(70,30,40,.22);overflow:hidden;animation:balao .4s var(--curva)}
.assist-topo{display:flex;align-items:center;gap:var(--e3);padding:var(--e4) var(--e4) var(--e3);border-bottom:1px solid var(--fio)}
.assist-topo .bola{width:40px;height:40px;border-radius:50%;background:var(--degrade);flex:none}
.assist-topo b{display:block;line-height:1.2}
.assist-topo .btn{margin-left:auto}
.msgs{flex:1;overflow:auto;padding:var(--e4);display:flex;flex-direction:column;gap:var(--e3)}
.msg{max-width:88%;padding:var(--e3) var(--e4);border-radius:18px;line-height:1.45}
.msg.bot{background:var(--fundo);border-bottom-left-radius:6px}
.msg.eu{align-self:flex-end;background:var(--lavanda);border-bottom-right-radius:6px}
.chips{display:flex;flex-wrap:wrap;gap:var(--e2)}
.chips button{font:inherit;font-size:var(--t-rotulo);font-weight:var(--peso-forte);min-height:36px;padding:0 var(--e3);border-radius:var(--pilula);border:1.5px solid var(--fio-forte);background:#fff;cursor:pointer;color:var(--tinta)}
.chips button:hover{border-color:var(--tinta)}
.assist form{display:flex;gap:var(--e2);padding:var(--e3);border-top:1px solid var(--fio)}
.assist input{flex:1;min-width:0;font:inherit;min-height:44px;border:1.5px solid var(--fio-forte);border-radius:var(--pilula);padding:0 var(--e4);background:#fff;color:var(--tinta)}
.assist .nota-assist{font-size:var(--t-rotulo);color:var(--apoio);padding:0 var(--e4) var(--e3)}
@media (max-width:560px){.assist-bt .txt-a{display:none}.assist-bt{padding:0 var(--e2)}}

/* aviso de layout preliminar */`],
  [`<p class="aviso-layout" role="note">Layout preliminar · áreas tracejadas são reservas de imagem · preços e notas são exemplos</p>\`;`,
   `<p class="aviso-layout" role="note">Layout preliminar · áreas com legenda são reservas de imagem · preços e notas são exemplos</p>
<button class="assist-bt" type="button" id="assist-bt" aria-controls="assist" aria-expanded="false"><span class="bola"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg></span><span class="txt-a">Dúvidas?</span></button>
<div class="balao" id="balao" role="status" hidden><span id="balao-t"></span><button type="button" id="balao-x" aria-label="Fechar lembrete">&times;</button></div>
<aside class="assist" id="assist" aria-labelledby="t-assist" hidden>
  <div class="assist-topo"><span class="bola" aria-hidden="true"></span><span><b id="t-assist">Assistente O que dar?</b><span class="meta">Respostas rápidas sobre o site</span></span><button class="btn btn-sec btn-peq" type="button" id="assist-x">Fechar</button></div>
  <div class="msgs" id="msgs" aria-live="polite">
    <p class="msg bot">Oi! Posso te ajudar a encontrar um presente ou tirar dúvidas. Dica: toque no coração para salvar o que gostar e ver depois em Favoritos.</p>
    <div class="chips" id="chips">
      <button type="button">Como salvo um presente?</button>
      <button type="button">Como funciona a comparação?</button>
      <button type="button">O OQD vende os produtos?</button>
      <button type="button">Me ajuda a escolher</button>
    </div>
  </div>
  <form id="assist-f"><input type="text" aria-label="Escreva sua dúvida" placeholder="Escreva sua dúvida"><button class="btn btn-oferta btn-peq" type="submit">Enviar</button></form>
  <p class="nota-assist">Protótipo: respostas prontas. A conversa com IA entra na integração.</p>
</aside>\`;`],
  [`  desenha();
})();\`;`, `  desenha();
})();
(function(){
  /* assistente: respostas prontas e lembrete de salvar */
  var bt=document.getElementById('assist-bt'),box=document.getElementById('assist'),x=document.getElementById('assist-x'),msgs=document.getElementById('msgs'),bal=document.getElementById('balao');
  var R={'Como salvo um presente?':'Toque no coração ao lado de qualquer presente ou artigo. Ele vai para Favoritos, no topo da página, e fica guardado para quando chegar a data.','Como funciona a comparação?':'Mostramos o preço do mesmo presente na Amazon, no Mercado Livre e na Shopee e marcamos a melhor oferta. A compra é feita direto na loja.','O OQD vende os produtos?':'Não. O OQD indica e compara. Quando você compra por um link nosso, a loja pode nos pagar uma comissão, sem custo a mais para você.','Me ajuda a escolher':'Claro! Me diga para quem é e do que a pessoa gosta. Enquanto isso, a busca "O que dar de presente?" na página inicial já monta a pergunta para você.'};
  function diz(t,quem){var p=document.createElement('p');p.className='msg '+quem;p.textContent=t;msgs.insertBefore(p,document.getElementById('chips'));msgs.scrollTop=msgs.scrollHeight;}
  function abre(){box.hidden=false;bal.hidden=true;bt.setAttribute('aria-expanded','true');x.focus();}
  function fecha(){box.hidden=true;bt.setAttribute('aria-expanded','false');bt.focus();}
  bt.addEventListener('click',function(){box.hidden?abre():fecha();});x.addEventListener('click',fecha);
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!box.hidden)fecha();});
  document.getElementById('chips').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;diz(b.textContent,'eu');setTimeout(function(){diz(R[b.textContent],'bot');},350);});
  document.getElementById('assist-f').addEventListener('submit',function(e){e.preventDefault();var i=this.querySelector('input');if(!i.value.trim())return;diz(i.value,'eu');i.value='';setTimeout(function(){diz('Ainda sou um protótipo e respondo só as perguntas prontas acima. Na versão final, respondo o que você escrever.','bot');},350);});
  document.getElementById('balao-x').addEventListener('click',function(){bal.hidden=true;});
  var visto=false;try{visto=sessionStorage.getItem('oqd-lembrete')==='1';}catch(e){}
  var alvo=document.querySelector('[data-lembrete]');
  if(alvo&&!visto&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;io.disconnect();var n=+document.getElementById('fav-cont').textContent;if(n>0||!box.hidden)return;document.getElementById('balao-t').textContent=alvo.dataset.lembrete;bal.hidden=false;try{sessionStorage.setItem('oqd-lembrete','1');}catch(e){}setTimeout(function(){bal.hidden=true;},9000);},{threshold:.3});io.observe(alvo);}
})();\`;`],
  [`.aviso-layout{position:fixed;left:var(--e3);bottom:var(--e3);`, `.aviso-layout{position:fixed;left:var(--e3);bottom:var(--e3);max-width:min(560px,calc(100% - 110px));`],
]);
