// Busca do site: gera busca.json (índice com o texto de cada post e os presentes) e a página /buscar/.
// A página entende tanto a busca livre (?q=namorado) quanto a frase da inicial (?s-quem=...&s-gosto=...&s-preco=...).
const fs = require('fs'), path = require('path');
const { OUT, esc, cab, rodape, JS_BASE, head, CORACAO } = require('./base.js');
const CSS_ART = require('./css-artigo.js');
const { lista, produtosPorPost, textoPorPost } = require('./posts.js');
const { ofertasDe } = require('./ofertas.js');
const CATNOME = { relacionamento: 'Relacionamento', idade: 'Idade', genero: 'Gênero', interesse: 'Interesse', profissao: 'Profissão', ocasiao: 'Ocasião', preco: 'Preço', namoro: 'Namoro' };

// índice: um item por post publicado
const indice = lista.map(a => ({
  t: a.t, u: a.u, cat: a.cat, d: a.d, foto: a.foto, alt: a.alt, cor: a.cor,
  cats: (a.categorias || []).map(c => CATNOME[c] || c).join(' '),
  texto: textoPorPost[a.slug] || '',
  p: (produtosPorPost[a.slug] || []).map(x => { const O = ofertasDe(x); return { n: x.nome, u: x.url, i: x.img, a: x.alt, c: x.cor, ch: x.cheia ? 1 : 0, v: O.pr.length ? Math.min(...O.pr.map(o => o.preco)) : null }; }),
}));
fs.writeFileSync(path.join(OUT, 'busca.json'), JSON.stringify(indice));

const CSS = CSS_ART + `
.busca-pag{padding-bottom:var(--secao)}
.busca-form{display:flex;gap:var(--e2);max-width:720px;background:#fff;border-radius:var(--pilula);padding:var(--e1);border:1.5px solid var(--fio);margin:var(--e5) 0 var(--e3)}
.busca-form:focus-within{border-color:var(--tinta)}
.busca-form input{flex:1;min-width:0;border:0;background:transparent;font:inherit;font-size:var(--t-abertura);padding:0 var(--e4);min-height:52px;color:var(--tinta)}
.busca-form input:focus{outline:none}
.sugere{display:flex;flex-wrap:wrap;gap:var(--e2);margin-bottom:var(--e6)}
.sugere a{text-decoration:none}
.res-tit{font-size:var(--t-sub);letter-spacing:-.02em;margin:var(--e7) 0 var(--e4)}
.res-posts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e5)}
.res-post{display:flex;flex-direction:column;gap:var(--e2);border-radius:var(--raio);overflow:hidden;text-decoration:none;padding-bottom:var(--e5);transition:transform .25s var(--curva)}
.res-post figure{margin:0 0 var(--e2);aspect-ratio:3/2;overflow:hidden}
.res-post img{width:100%;height:100%;object-fit:cover}
.res-post > span{padding-inline:var(--e5)}
.res-post .art-t{font-weight:var(--peso-forte);line-height:1.3}
@media (hover:hover){.res-post:hover{transform:translateY(-4px)}}
.res-prods{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--e4)}
.res-prod{display:flex;flex-direction:column;gap:var(--e2);text-decoration:none}
.res-prod .fp{position:relative;aspect-ratio:1;border-radius:var(--raio-interno);overflow:hidden}
.res-prod .fp img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;padding:10%}
.res-prod .fp img.cheia{object-fit:cover;padding:0}
.res-prod b{font-size:var(--t-corpo);line-height:1.3}
.res-vazio{max-width:46em}
@media (max-width:900px){.res-posts{grid-template-columns:1fr}.res-prods{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;

const html = head('Buscar · O que dar?', 'Busque ideias de presente por pessoa, interesse ou ocasião.', CSS) + `
<body>
${cab('')}
<main id="conteudo">
  <header class="art-abertura pag-abertura">
    <div class="mancha" aria-hidden="true"></div>
    <div class="wrap">
      <h1 class="gigante" id="t-busca">Buscar ideias.</h1>
      <form class="busca-form" role="search" action="buscar.html" method="get">
        <label class="sr" for="q">O que você procura?</label>
        <input id="q" name="q" type="search" placeholder="Ex.: namorado, mãe, basquete, Natal" autocomplete="off">
        <button class="btn btn-oferta" type="submit">Buscar</button>
      </form>
      <div class="sugere" aria-label="Sugestões de busca"><span class="rotulo">Tente</span><a class="tag" href="buscar.html?q=namorado">namorado</a><a class="tag" href="buscar.html?q=m%C3%A3e">mãe</a><a class="tag" href="buscar.html?q=corrida">corrida</a><a class="tag" href="buscar.html?q=basquete">basquete</a><a class="tag" href="buscar.html?q=30%20anos">30 anos</a></div>
    </div>
  </header>
  <div class="wrap busca-pag">
    <p class="meta" id="res-resumo" aria-live="polite"></p>
    <div id="res"></div>
    <noscript><p>Para buscar, ative o JavaScript ou navegue pelas <a href="layout-alta-fidelidade.html#categorias">categorias</a>.</p></noscript>
  </div>
</main>
${rodape}
<script>${JS_BASE}
(function(){
  var P=new URLSearchParams(location.search),inp=document.getElementById('q'),out=document.getElementById('res'),resumo=document.getElementById('res-resumo');
  var norm=function(s){return (s||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();};
  var PARA={'um colega':'colega trabalho profissao','minha mae':'mae','meu namorado':'namorado namoro casal','uma amiga':'amiga','meu pai':'pai homem','minha namorada':'namorada namoro casal'};
  var IGNORA={'de':1,'da':1,'do':1,'para':1,'pra':1,'que':1,'gosta':1,'presente':1,'presentes':1,'um':1,'uma':1,'meu':1,'minha':1,'o':1,'a':1,'e':1,'com':1,'ideias':1};
  // raiz curta o bastante para achar plural e feminino, mas sem cortar demais ("corrida" -> "corri", não "corr")
  var raiz=function(w){w=w.replace(/s$/,'');return w.length>=8?w.slice(0,-3):w.length>=6?w.slice(0,-2):w;};
  var SIN={corri:['corri','corre'],corre:['corre','corri'],namor:['namor'],mae:['mae','mamae','maes'],pai:['pai','papai'],livr:['livr','leitur','kindle'],leitur:['leitur','livr','kindle'],cafe:['cafe','nespresso','cafeteir'],musica:['musica','fone','som','spotify'],natal:['natal'],basquet:['basquet','nba']};
  var termos=function(q){return norm(q).split(/[^a-z0-9]+/).filter(function(w){return w&&!IGNORA[w];}).map(raiz).map(function(t){return SIN[t]||[t];});};
  var tem=function(txt,t){return [].concat(t).some(function(x){return (' '+txt).indexOf(' '+x)>=0;});};
  var reais=function(v){return 'R$ '+v.toFixed(2).replace('.',',');};
  var e=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');};
  var quem=P.get('s-quem'),gosto=P.get('s-gosto'),ate=P.get('s-preco'),q=P.get('q');
  var limite=ate&&/\\d/.test(ate)?parseFloat(ate.replace(/[^0-9,]/g,'').replace(',','.')):null;
  var frase=quem?('Presente para '+quem+(gosto?' que gosta de '+gosto:'')+(ate?' até '+ate:'')):'';
  if(q)inp.value=q;else if(frase)inp.value=(PARA[norm(quem)]||quem).split(' ')[0]+(gosto?' '+gosto:'');
  var busca=q||(quem?(PARA[norm(quem)]||quem)+' '+(gosto||''):'');
  if(!busca){resumo.textContent='Digite uma palavra: para quem é, do que a pessoa gosta ou a ocasião.';inp.focus();return;}
  fetch('busca.json').then(function(r){return r.json();}).then(function(I){
    var T=termos(busca),tG=gosto?termos(gosto):[],tP=quem?termos(PARA[norm(quem)]||quem):[];
    var pts=function(p,L){var tt=norm(p.t),tc=norm(p.cats+' '+p.cat),tx=norm(p.texto),tp=norm(p.p.map(function(x){return x.n;}).join(' '));var s=0;
      L.forEach(function(t){if(tem(tt,t))s+=5;if(tem(tc,t))s+=3;if(tem(tp,t))s+=2;if(tem(tx,t))s+=1;});return s;};
    // frase da inicial: o gosto pesa mais que a pessoa; quem combina com os dois vem primeiro
    var posts=I.map(function(p){var s;if(quem){var g=pts(p,tG),q2=pts(p,tP);s=g*2+q2+(g&&q2?10:0);}else s=pts(p,T);return {p:p,s:s};})
      .filter(function(x){return x.s>0;}).sort(function(a,b){return b.s-a.s;});
    // só fica quem tem relação de verdade: some o post que só cita a palavra de passagem no texto
    var topo=posts.length?posts[0].s:0;posts=posts.filter(function(x){return x.s>=Math.max(2,topo*0.3);});
    var prods=[];I.forEach(function(p){p.p.forEach(function(x){var n=norm(x.n+' '+x.a),s=0;(quem?tG:T).forEach(function(t){if(tem(n,t))s+=2;});if(quem)tP.forEach(function(t){if(tem(n,t))s++;});if(s&&(limite==null||x.v==null||x.v<=limite))prods.push({x:x,s:s});});});
    prods.sort(function(a,b){return b.s-a.s;});
    var h='';
    if(frase)h+='<p class="abre">'+e(frase)+'.</p>';
    if(posts.length){h+='<h2 class="res-tit">'+posts.length+(posts.length===1?' artigo':' artigos')+'</h2><div class="res-posts">'+posts.map(function(r){var p=r.p;return '<a class="res-post c-'+p.cor+'" href="'+p.u+'"><figure><img src="'+p.foto+'" alt="'+e(p.alt||'')+'" loading="lazy"></figure><span class="rotulo">'+e(p.cat)+'</span><span class="art-t">'+e(p.t)+'</span><span class="meta">'+e(p.d)+'</span></a>';}).join('')+'</div>';}
    if(prods.length){h+='<h2 class="res-tit">'+prods.length+(prods.length===1?' presente':' presentes')+'</h2><div class="res-prods">'+prods.slice(0,24).map(function(r){var x=r.x;return '<a class="res-prod" href="'+x.u+'"><span class="fp c-'+x.c+'"><img class="'+(x.ch?'cheia':'')+'" src="'+x.i+'" alt="'+e(x.a||x.n)+'" loading="lazy"></span><b>'+e(x.n)+'</b>'+(x.v!=null?'<span class="meta">a partir de '+reais(x.v)+'</span>':'')+'</a>';}).join('')+'</div>';}
    if(!posts.length&&!prods.length){h+='<div class="res-vazio"><h2 class="res-tit">Ainda não temos ideias para essa busca.</h2><p>Tente outra palavra ou veja as <a class="link" href="layout-alta-fidelidade.html#categorias">categorias</a>.</p></div>';}
    else if(gosto&&tG.length&&!posts.some(function(r){var tx=norm(r.p.t+' '+r.p.texto+' '+r.p.p.map(function(x){return x.n;}).join(' '));return tG.some(function(t){return tem(tx,t);});}))h='<p class="meta">Ainda não temos um artigo sobre '+e(gosto)+'. Veja o que combina com quem vai receber:</p>'+h;
    if(limite!=null&&prods.some(function(r){return r.x.v==null;}))h+='<p class="meta" style="margin-top:var(--e5)">Alguns presentes ainda estão sem preço cadastrado; confira o valor na loja.</p>';
    out.innerHTML=h;resumo.textContent=posts.length||prods.length?'Resultados para "'+(q||frase)+'"':'';
  }).catch(function(){resumo.textContent='Não foi possível carregar a busca agora. Tente de novo em instantes.';});
})();
</script>
</body>
</html>`;
fs.writeFileSync(path.join(OUT, 'buscar.html'), html);
console.log('busca ok', indice.length, 'posts no índice');
