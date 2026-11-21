// Ajuste 20 (19/11/2026): fita em onda menor, com o mesmo respiro acima e abaixo;
// nas categorias, a foto aparece junto do mouse (no computador) em vez do retrato fixo à esquerda.
const fs = require('fs');
const f = __dirname + '/inicial.js'; let s = fs.readFileSync(f, 'utf8');
fs.writeFileSync(f.replace('.js', '.antes-ajuste-20.js'), s);
function troca(a, b) { if (!s.includes(a)) { console.error('NAO ACHEI:', a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); }

// fita: onda mais baixa, fita e letras menores, respiro igual ao de cima e de baixo
troca('<svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMid meet">', '<svg viewBox="0 0 1440 170" preserveAspectRatio="xMidYMid meet">');
troca('<path id="onda-p" d="M-80 160 C 160 40, 420 40, 640 130 S 1060 240, 1270 130 S 1470 50, 1540 90"/>',
      '<path id="onda-p" d="M-80 105 C 160 45, 420 45, 640 92 S 1060 140, 1270 88 S 1470 52, 1540 72"/>');
troca('.onda{margin-top:var(--secao);overflow:hidden}', '.onda{margin-top:var(--e8);overflow:hidden}');
troca('.onda svg{display:block;position:relative;left:50%;width:max(100%,960px);', '.onda svg{display:block;position:relative;left:50%;width:max(100%,820px);');
troca('stroke-width:66;', 'stroke-width:42;');
troca('.onda-txt{font-family:var(--fonte);font-size:27px;', '.onda-txt{font-family:var(--fonte);font-size:18px;');

// categorias: foto que segue o mouse
troca('      <ul class="cats" id="lista-cats">', '      <figure class="cats-cursor" id="cats-cursor" aria-hidden="true"><img id="cats-cursor-img" src="imagens/categorias/relacionamento.jpg" alt=""></figure>\n      <ul class="cats" id="lista-cats">');
troca('.cats-previa{padding:0;overflow:hidden}',
  '.cats-previa{padding:0;overflow:hidden}\n' +
  '.cats-cursor{display:none}\n' +
  '@media (hover:hover) and (pointer:fine){\n' +
  '  .cats-previa{display:none}\n' +
  '  .cats-cursor{display:block;position:fixed;left:0;top:0;z-index:4;width:240px;aspect-ratio:4/5;margin:0;border-radius:var(--raio);overflow:hidden;pointer-events:none;opacity:0;scale:.8;rotate:-6deg;transition:opacity .25s var(--curva),scale .35s var(--curva),rotate .45s var(--curva);box-shadow:0 30px 60px rgba(0,0,0,.35);will-change:transform}\n' +
  '  .cats-cursor.on{opacity:1;scale:1;rotate:-3deg}\n' +
  '  .cats-cursor img{width:100%;height:100%;object-fit:cover}\n' +
  '}\n' +
  '@media (prefers-reduced-motion:reduce){.cats-cursor{transition:opacity .2s linear}}');
troca("  links.forEach(function(a){a.addEventListener('mouseenter',function(){ativa(a);});a.addEventListener('focus',function(){ativa(a);});});",
  "  links.forEach(function(a){a.addEventListener('mouseenter',function(){ativa(a);});a.addEventListener('focus',function(){ativa(a);});});\n" +
  "  /* foto da categoria acompanha o mouse, com um leve atraso */\n" +
  "  var cc=document.getElementById('cats-cursor'),cci=document.getElementById('cats-cursor-img'),lista=document.getElementById('lista-cats');\n" +
  "  if(cc&&matchMedia('(hover:hover) and (pointer:fine)').matches){var tx=0,ty=0,x=0,y=0,anda=false;\n" +
  "    function mexe(){x+=(tx-x)*(reduz?1:.18);y+=(ty-y)*(reduz?1:.18);cc.style.transform='translate('+(x+24)+'px,'+(y-150)+'px)';if(Math.abs(tx-x)>.5||Math.abs(ty-y)>.5)requestAnimationFrame(mexe);else anda=false;}\n" +
  "    lista.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!cc.classList.contains('on')){x=tx;y=ty;}cc.classList.add('on');if(!anda){anda=true;requestAnimationFrame(mexe);}});\n" +
  "    lista.addEventListener('mouseleave',function(){cc.classList.remove('on');});\n" +
  "    links.forEach(function(a){a.addEventListener('mouseenter',function(){cci.src='imagens/categorias/'+a.dataset.slug+'.jpg';});});\n" +
  "    addEventListener('scroll',function(){cc.classList.remove('on');},{passive:true});\n" +
  "  }");
fs.writeFileSync(f, s); console.log('inicial.js ok');
