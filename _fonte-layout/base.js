// Base comum: dados, estilos, cabeçalho, rodapé, favoritos. Usado por inicial.js, artigo.js e opcoes.js.
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..'); // raiz do projeto (funciona no computador e no robô do GitHub)
const txt = fs.readFileSync(path.join(__dirname, 'basquete.txt'), 'utf8').split('\n');
const LOGO = 'imagens/logo-oquedar.png';
const FOTO_BASQ = 'imagens/capa-presentes-para-quem-gosta-de-basquete.avif';
const LOGO_ESCURO = 'imagens/logo-oquedar-rodape.png';
// fotos dos produtos do post real (embutidas para abrir em qualquer lugar)
const PROD = []; for (let n = 1; n <= 14; n++) PROD.push('data:image/avif;base64,' + fs.readFileSync(OUT + '/imagens/produtos/p' + n + '.avif').toString('base64'));
const PROD_ALT = require('./produtos.json').map(o => o.alt);
// cada foto é embutida uma vez (scriptImgs) e aplicada em todos os lugares onde aparece
const imgProd = (i, extra = '') => `<img class="img-prod${i === 2 ? ' cheia' : ''}${extra}" data-p="${i}" src="imagens/produtos/p${i + 1}${i === 2 ? '.avif' : '-r.webp'}" loading="lazy" decoding="async" width="600" height="600" alt="${PROD_ALT[i].replace(/"/g, '&quot;')}">`;
const scriptImgs = (lista) => ''; const scriptImgsAntigo = (lista) => `<script>(function(){var I={};${lista.map(i => `I[${i}]="${PROD[i]}";`).join('')}document.querySelectorAll('img[data-p]').forEach(function(im){if(I[im.dataset.p])im.src=I[im.dataset.p];});})();</script>`;
const CORACAO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- parse do artigo real ----------
const blocos = []; // {tipo, texto}
for (const l of txt) { const m = l.match(/^(H1|H2|H3|P|LI): (.*)$/); if (m) blocos.push({ t: m[1], x: m[2] }); }
function secao(tituloRegex) {
  const i = blocos.findIndex(b => (b.t === 'H2') && tituloRegex.test(b.x));
  const out = []; for (let k = i + 1; k < blocos.length; k++) { if (blocos[k].t === 'H2') break; out.push(blocos[k]); }
  return { titulo: blocos[i].x, itens: out };
}
const intro = []; { const i = blocos.findIndex(b => b.t === 'H1'); for (let k = i + 1; k < blocos.length; k++) { if (blocos[k].t === 'H2') break; if (blocos[k].t === 'P') intro.push(blocos[k].x); } }
const produtosTxt = [];
for (let n = 1; n <= 14; n++) produtosTxt.push(secao(new RegExp('^' + n + '\\. ')));
const nemTodo = secao(/^Nem Todo F/);
const comoEscolhemos = secao(/^Como escolhemos/);
const qualCombina = secao(/^Qual Presente Combina/);
const comoEscolher = secao(/^Como escolher um presente/);
const faq = secao(/^Perguntas Frequentes/);
const fechamento = secao(/^Um Presente que Tenha/);

// ---------- dados de exemplo (fictícios, marcados na página) ----------
const lojas = ['Amazon', 'Mercado Livre', 'Shopee'];
const lojaCls = ['loja-amazon', 'loja-ml', 'loja-shopee'];
const P = [
  { cor: 'lavanda', nota: '9,4', precos: [129.9, 119.9, 134.0], perfil: ['Para quem joga'], pros: ['Útil de verdade para quem joga', 'Serve para quem está começando'], contras: ['Pouco sentido para quem só assiste'] },
  { cor: 'rosa', nota: '8,8', precos: [69.9, 74.9, 62.5], perfil: ['Fã da NBA'], pros: ['Entra na rotina', 'Produto oficial do time'], contras: ['Só faz sentido para torcedor do Celtics'] },
  { cor: 'pessego', nota: '8,6', precos: [89.9, 79.9, 72.0], perfil: ['Decoração'], pros: ['Foge de roupas e acessórios', 'Efeito 3D chama atenção'], contras: ['Mais decorativa que útil'] },
  { cor: 'lavanda', nota: '8,5', precos: [149.9, 139.0, 159.9], perfil: ['Fã da NBA', 'Roupas e acessórios'], pros: ['Fácil de usar no dia a dia', 'Boa para quem não joga'], contras: ['Depende de acertar o tamanho'] },
  { cor: 'rosa', nota: '9,0', precos: [159.9, 169.0, 174.9], perfil: ['Colecionador', 'Fã da NBA'], pros: ['Ótimo para quem coleciona', 'Funciona como decoração'], contras: ['Feito para fã do LeBron'] },
  { cor: 'pessego', nota: '8,3', precos: [129.9, 119.9, 124.0], perfil: ['Roupas e acessórios'], pros: ['Confortável e casual', 'Não exige entender de basquete'], contras: ['Proposta mais básica'] },
  { cor: 'lavanda', nota: '8,4', precos: [219.9, 229.0, 209.9], perfil: ['Fã da NBA', 'Roupas e acessórios'], pros: ['Junta NBA e acessório', 'Estilo esportivo'], contras: ['Só para quem já usa boné'] },
  { cor: 'rosa', nota: '8,2', precos: [299.9, 289.0, 319.0], perfil: ['Fã da NBA', 'Roupas e acessórios'], pros: ['Estética marcante', 'Fica pessoal com o time certo'], contras: ['Arriscado sem saber o time'] },
  { cor: 'pessego', nota: '8,7', precos: [249.9, 239.9, 259.0], perfil: ['Para quem joga', 'Decoração'], pros: ['Diversão dentro de casa', 'Bom para competir com amigos'], contras: ['Precisa de porta ou parede livre'] },
  { cor: 'lavanda', nota: '8,6', precos: [149.9, 139.9, 129.9], perfil: ['Para quem joga'], pros: ['Visual urbano e colorido', 'Bola extra para os treinos'], contras: ['A estampa não agrada a todos'] },
  { cor: 'rosa', nota: '8,9', precos: [349.9, 369.0, 339.9], perfil: ['Fã da NBA', 'Roupas e acessórios'], pros: ['Neutro: várias equipes', 'Bom para dias frios'], contras: ['Menos personalizado'] },
  { cor: 'pessego', nota: '8,8', precos: [134.9, 129.9, 139.0], perfil: ['Para quem joga'], pros: ['Cor diferente do tradicional', 'Para quem joga com frequência'], contras: ['Parecida com a DRV tradicional'] },
  { cor: 'lavanda', nota: '8,1', precos: [199.9, 189.9, 209.0], perfil: ['Para quem joga', 'Roupas e acessórios'], pros: ['Treino ou visual casual', 'Pegada bem esportiva'], contras: ['Exige saber time e tamanho'] },
  { cor: 'rosa', nota: '8,5', precos: [59.9, 54.9, 49.9], perfil: ['Decoração'], pros: ['Não exige acertar o time', 'Tem sensor de presença'], contras: ['Função mais decorativa'] },
];
const reais = v => 'R$ ' + v.toFixed(2).replace('.', ',');
const melhorIdx = p => p.precos.indexOf(Math.min(...p.precos));
const nomes = produtosTxt.map(s => s.titulo.replace(/^\d+\. /, ''));
const faixa = v => v < 100 ? 'ate100' : v <= 300 ? '100a300' : 'acima300';

// ---------- CSS compartilhado ----------
const CSS = `
:root{
  /* cor */
  --fundo:#F4F2F0; --cartao:#FFFFFF; --tinta:#1C1A1F; --apoio:#5E5963; --discreto:#8C8690;
  --coral:#FF6650; --lavanda:#D8CBFA; --rosa:#F8CFDB; --pessego:#FFD8C9;
  --fio:rgba(28,26,31,.13); --fio-forte:rgba(28,26,31,.28);
  --degrade:radial-gradient(60% 80% at 18% 28%,#FF8A6E 0%,transparent 70%),radial-gradient(55% 75% at 78% 30%,#F7A8C4 0%,transparent 70%),radial-gradient(60% 70% at 55% 100%,#C7B4F7 0%,transparent 72%),#FBD3C8;
  --degrade-suave:radial-gradient(70% 90% at 10% 0%,rgba(255,138,110,.30) 0%,transparent 70%),radial-gradient(70% 90% at 100% 100%,rgba(199,180,247,.40) 0%,transparent 70%),#FBF1EE;
  /* tipografia */
  --fonte:"Bricolage Grotesque",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --t-gigante:clamp(3rem,7vw,6.75rem);
  --t-titulo:clamp(2.25rem,4vw,3.5rem);
  --t-sub:1.625rem;
  --t-abertura:1.3125rem;
  --t-corpo:1.0625rem;
  --t-rotulo:.8125rem;
  --peso-normal:400; --peso-forte:700;
  /* espaço */
  --e1:4px; --e2:8px; --e3:12px; --e4:16px; --e5:24px; --e6:32px; --e7:48px; --e8:64px; --e9:96px;
  --secao:clamp(80px,10vw,144px);
  --margem:clamp(16px,4vw,48px);
  --largura:1280px;
  /* forma e movimento */
  --raio:24px; --raio-interno:12px; --pilula:999px;
  --curva:cubic-bezier(.22,1,.36,1);
  --z-cab:30; --z-menu:40; --z-progresso:50;
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-padding-top:120px}
@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
body{margin:0;background:var(--fundo);color:var(--tinta);font-family:var(--fonte);font-size:var(--t-corpo);line-height:1.6;font-weight:var(--peso-normal);-webkit-font-smoothing:antialiased;font-optical-sizing:auto}
img{max-width:100%;display:block}
a{color:inherit}
h1,h2,h3,p,ul,ol,figure,blockquote{margin:0}
ul,ol{padding:0;list-style:none}
::selection{background:var(--rosa);color:var(--tinta)}
:focus-visible{outline:3px solid var(--tinta);outline-offset:2px;border-radius:6px}
.wrap{max-width:var(--largura);margin-inline:auto;padding-inline:var(--margem)}
.pular{position:absolute;left:var(--e4);top:-100px;background:var(--tinta);color:var(--fundo);padding:var(--e3) var(--e4);border-radius:var(--pilula);z-index:var(--z-progresso);text-decoration:none;font-weight:var(--peso-forte)}
.pular:focus{top:var(--e4)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* papéis tipográficos */
.gigante{font-size:var(--t-gigante);font-weight:var(--peso-forte);line-height:.95;letter-spacing:-.04em;text-wrap:balance;margin-left:-.04em}
.titulo{font-size:var(--t-titulo);font-weight:var(--peso-forte);line-height:1;letter-spacing:-.035em;text-wrap:balance}
.sub{font-size:var(--t-sub);font-weight:var(--peso-forte);line-height:1.2;letter-spacing:-.02em;text-wrap:balance}
.abre{font-size:var(--t-abertura);line-height:1.5;color:var(--apoio);text-wrap:pretty}
.rotulo{font-size:var(--t-rotulo);font-weight:var(--peso-forte);letter-spacing:.08em;text-transform:uppercase;color:var(--apoio)}
.meta{font-size:var(--t-rotulo);color:var(--apoio)}
p{text-wrap:pretty}

/* botões */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--e2);min-height:48px;padding:0 var(--e5);border-radius:var(--pilula);font:inherit;font-weight:var(--peso-forte);text-decoration:none;border:1.5px solid transparent;cursor:pointer;white-space:nowrap;transition:transform .16s var(--curva),box-shadow .2s var(--curva),background-color .2s var(--curva),border-color .2s var(--curva)}
.btn:active{transform:scale(.97)}
.btn-oferta{background:var(--coral);color:var(--tinta)}
.btn-sec{background:transparent;color:var(--tinta);border-color:var(--fio-forte)}
.btn-escuro{background:var(--tinta);color:var(--fundo)}
.wrap-larga{max-width:1600px}
.btn-peq{min-height:44px;padding:0 var(--e4)}
.btn svg{width:18px;height:18px;flex:none}
@media (hover:hover){
  .btn-oferta:hover{box-shadow:0 10px 28px rgba(255,102,80,.38);transform:translateY(-2px)}
  .btn-sec:hover{border-color:var(--tinta);background:rgba(255,255,255,.5)}
}
.link{font-weight:var(--peso-forte);text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:4px}
.link:hover{text-decoration-color:var(--coral)}

/* pílulas de tag */
.tags{display:flex;flex-wrap:wrap;gap:var(--e2)}
.tag{display:inline-flex;align-items:center;min-height:32px;padding:0 var(--e3);border-radius:var(--pilula);background:rgba(255,255,255,.7);border:1px solid var(--fio);font-size:var(--t-rotulo);font-weight:var(--peso-forte);text-decoration:none;color:var(--tinta)}
a.tag{min-height:44px;padding:0 var(--e4);font-size:var(--t-corpo);font-weight:var(--peso-normal);transition:background-color .2s var(--curva),border-color .2s var(--curva)}
@media (hover:hover){a.tag:hover{background:#fff;border-color:var(--fio-forte)}}
.exemplo{display:inline-flex;align-items:center;gap:6px;min-height:26px;padding:var(--e1) var(--e3);border-radius:var(--pilula);border:1px dashed var(--fio-forte);font-size:var(--t-rotulo);line-height:1.3;color:var(--apoio);background:rgba(255,255,255,.6)}

/* reserva de imagem (só no layout preliminar) */
.reserva{position:relative;border-radius:var(--raio-interno);overflow:hidden;display:flex;align-items:flex-end;padding:var(--e4);color:var(--tinta)}
.reserva::before{content:none}
.foto-q{padding:0!important;overflow:hidden}
.foto-q img{width:100%;height:100%;object-fit:cover}
.foto-av{overflow:hidden;border-radius:50%;padding:0}
.foto-av img{width:100%;height:100%;object-fit:cover;object-position:50% 22%}
.q-logo{position:relative;display:block;width:46%;aspect-ratio:162/228;overflow:hidden;filter:drop-shadow(0 18px 30px rgba(255,102,80,.35))}
.q-logo img{position:absolute;width:309%;max-width:none;left:-112%;top:-37%}
.q-rotulo{font-size:var(--t-rotulo);color:var(--apoio);background:rgba(255,255,255,.7);border-radius:var(--pilula);padding:2px var(--e3);margin-top:var(--e3);text-align:center}
.img-prod{width:100%;height:100%;object-fit:contain;padding:10%}
/* fotos de produto recortadas (sem fundo branco): cor real do produto sobre a cor da caixa */
.esc-img{border-radius:var(--raio-interno);overflow:hidden}
.img-prod.cheia{object-fit:cover;mix-blend-mode:normal;padding:0}
html{overflow-x:clip}
[hidden]{display:none!important}
.reserva figcaption{position:relative;font-size:var(--t-rotulo);line-height:1.45;background:rgba(255,255,255,.78);border-radius:var(--raio-interno);padding:var(--e2) var(--e3);max-width:34ch}
.reserva figcaption b{display:block}
.reserva figcaption.sr{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0 0 0 0)}
.c-lavanda{background:var(--lavanda)} .c-rosa{background:var(--rosa)} .c-pessego{background:var(--pessego)}
.c-degrade{background:var(--degrade)}

/* cabeçalho */
.cab{position:fixed;top:var(--e3);left:0;right:0;z-index:var(--z-cab);transition:transform .35s var(--curva)}
.cab.some{transform:translateY(calc(-100% - 24px))}
.barra{display:flex;align-items:center;justify-content:space-between;gap:var(--e4);background:rgba(255,255,255,.62);-webkit-backdrop-filter:blur(16px) saturate(1.3);backdrop-filter:blur(16px) saturate(1.3);border:1px solid rgba(255,255,255,.85);border-radius:var(--pilula);padding:var(--e2) var(--e2) var(--e2) var(--e5);transition:box-shadow .3s var(--curva)}
.cab.rolou .barra{box-shadow:0 12px 40px rgba(70,30,40,.10)}
.marca{display:block;width:104px;height:46px;overflow:hidden;position:relative;flex:none}
.marca img{position:absolute;left:0;top:-18px;width:104px;height:auto;max-width:none}
.menu{display:flex;gap:var(--e1)}
.menu a{display:inline-flex;align-items:center;min-height:44px;padding:0 var(--e4);border-radius:var(--pilula);text-decoration:none;transition:background-color .2s var(--curva)}
.menu a[aria-current]{font-weight:var(--peso-forte)}
@media (hover:hover){.menu a:hover{background:rgba(28,26,31,.06)}}
.acoes{display:flex;gap:var(--e2);align-items:center}
.btn-menu{display:none}
@media (max-width:820px){
  .menu{display:none;position:absolute;left:var(--margem);right:var(--margem);top:calc(100% + var(--e2));flex-direction:column;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid #fff;border-radius:var(--raio);padding:var(--e3);box-shadow:0 20px 50px rgba(70,30,40,.14);z-index:var(--z-menu)}
  .menu.aberto{display:flex}
  .btn-menu{display:inline-flex}
  .barra{padding-left:var(--e4)}
}

/* rodapé: escuro, chamada antes dos links e Q de vidro gigante */
.rodape{position:relative;margin-top:var(--secao);background:var(--tinta);color:var(--fundo);padding:var(--e8) 0 var(--e5);overflow:hidden;--apoio:rgba(244,242,240,.70);--fio:rgba(244,242,240,.16)}
.rodape .brilho{position:absolute;border-radius:50%;filter:blur(80px);opacity:.5;pointer-events:none}
.rodape .b1{width:620px;aspect-ratio:1;right:-160px;top:-180px;background:radial-gradient(circle,#FF6650 0%,transparent 68%)}
.rodape .b2{width:520px;aspect-ratio:1;right:220px;bottom:-260px;background:radial-gradient(circle,#C7B4F7 0%,transparent 68%)}
.rodape .q-gig{position:absolute;right:-240px;top:46%;transform:translateY(-50%);width:min(46vw,620px);aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.06);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;padding:0 22% 0 8%;text-align:center}
.rodape .q-gig figcaption{color:var(--tinta)}
.rodape .wrap{position:relative}
.rodape .chamada{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end;padding-bottom:var(--e8);margin-bottom:var(--e8);border-bottom:1px solid var(--fio)}
.rodape .chamada h2{grid-column:1/span 8;text-wrap:balance;font-size:var(--t-titulo);font-weight:var(--peso-forte);line-height:1;letter-spacing:-.035em;color:var(--fundo);text-transform:none;margin:0}
.rodape .chamada .lado{grid-column:1/span 6;display:flex;flex-wrap:wrap;align-items:center;gap:var(--e4)}
.rodape .chamada .lado p{color:var(--apoio)}
.rodape .colunas{display:grid;grid-template-columns:1.3fr .9fr 1fr 1fr 1.5fr;gap:var(--e6);width:100%;overflow-wrap:anywhere}
.rodape h3,.rodape .rod-tit{font-size:var(--t-rotulo);font-weight:var(--peso-forte);letter-spacing:.08em;text-transform:uppercase;color:var(--apoio);margin-bottom:var(--e4)}
.rodape li a{display:inline-flex;min-height:36px;align-items:center;text-decoration:none;color:var(--fundo)}
@media (hover:hover){.rodape li a:hover{text-decoration:underline;text-underline-offset:4px}}
.rodape p{color:var(--apoio);max-width:40ch;line-height:1.6}
.rodape .divulga p{font-size:var(--t-rotulo);line-height:1.55}
.rodape .sobre p+p{margin-top:var(--e4)}
.marca-rodape{display:block;width:180px;height:79px;overflow:hidden;position:relative;margin-bottom:var(--e5)}
.marca-rodape img{position:absolute;left:0;top:-31px;width:180px;height:auto;max-width:none;mix-blend-mode:lighten}
.rodape .palavra{font-size:clamp(3.5rem,12vw,10.5rem);font-weight:var(--peso-forte);letter-spacing:-.055em;line-height:.8;color:var(--rosa);margin:var(--e8) 0 var(--e5) -.05em;white-space:nowrap;max-width:none}
.rodape .palavra span{color:var(--coral)}
.rodape .linha{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--e4);border-top:1px solid var(--fio);padding-top:var(--e5);margin-top:0;font-size:var(--t-rotulo);color:var(--apoio)}
.rodape .linha a{color:var(--apoio)}
@media (max-width:900px){.rodape .colunas{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.rodape .sobre,.rodape .divulga{grid-column:1/-1}.rodape .q-gig{width:340px;right:-170px;top:auto;bottom:40px;transform:none;opacity:.6}.rodape .q-gig figcaption{display:none}.rodape .chamada h2,.rodape .chamada .lado{grid-column:1/-1}}

/* favoritos */
.btn-fav .cont{display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:var(--pilula);background:var(--tinta);color:var(--fundo);font-size:var(--t-rotulo);font-variant-numeric:tabular-nums}
.btn-fav svg{color:var(--coral)}
.btn-fav.tem svg{fill:var(--coral)}
.btn-fav.pulsa .cont{animation:pulsa .4s var(--curva)}
@keyframes pulsa{50%{transform:scale(1.35)}}
.gaveta-fundo{position:fixed;inset:0;background:rgba(28,26,31,.35);z-index:var(--z-menu)}
.gaveta{position:fixed;top:var(--e3);right:var(--e3);bottom:var(--e3);width:min(420px,calc(100% - 24px));z-index:calc(var(--z-menu) + 1);background:rgba(255,255,255,.88);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid #fff;border-radius:var(--raio);padding:var(--e5);display:flex;flex-direction:column;gap:var(--e4);box-shadow:0 30px 80px rgba(70,30,40,.2);overflow:auto;animation:gaveta .4s var(--curva)}
@keyframes gaveta{from{opacity:0;transform:translateX(24px)}}
.gaveta-topo{display:flex;justify-content:space-between;align-items:center;gap:var(--e3)}
.abas{display:flex;gap:var(--e2)}
.abas button{font:inherit;min-height:44px;padding:0 var(--e4);border-radius:var(--pilula);border:1.5px solid var(--fio-forte);background:transparent;cursor:pointer;color:var(--tinta)}
.abas button[aria-selected="true"]{background:var(--tinta);border-color:var(--tinta);color:var(--fundo);font-weight:var(--peso-forte)}
.fav-lista{display:grid;gap:var(--e2)}
.fav-lista li{display:flex;align-items:center;gap:var(--e3);background:#fff;border-radius:var(--raio-interno);padding:var(--e2) var(--e2) var(--e2) var(--e3)}
.fav-lista .ponto{width:40px;height:40px;border-radius:var(--raio-interno);flex:none;overflow:hidden}
.fav-lista .ponto img{width:100%;height:100%;object-fit:contain;padding:4px}
.fav-lista a{flex:1;min-width:0;font-weight:var(--peso-forte);text-decoration:none;line-height:1.3}
.fav-lista a:hover{text-decoration:underline}
.fav-lista button{flex:none;width:44px;height:44px;border:0;border-radius:50%;background:transparent;cursor:pointer;font:inherit;font-size:var(--t-sub);line-height:1;color:var(--apoio)}
.fav-lista button:hover{background:var(--fundo);color:var(--tinta)}
.fav-vazio{color:var(--apoio)}
.fav-card{position:absolute;top:var(--e3);right:var(--e3);z-index:2;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.85);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);cursor:pointer;color:var(--tinta);transition:transform .16s var(--curva)}
.fav-card svg{width:20px;height:20px}
.fav-card[aria-pressed="true"] svg{fill:var(--coral);stroke:var(--coral)}
.fav-card:active{transform:scale(.92)}
@media (max-width:560px){.txt-fav{display:none}.txt-buscar{display:none}.btn-buscar{padding-inline:12px}.cab .acoes{gap:4px}.btn-fav,.btn-menu,.btn-buscar{padding-inline:10px}.cab .marca img{width:76px}.barra{gap:var(--e2)}}

/* assistente */
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

/* aviso de exemplo */
.rodape .creditos{margin:var(--e3) 0 0;font-size:var(--t-rotulo);color:var(--apoio)}
.aviso-layout{position:fixed;left:var(--e3);bottom:var(--e3);max-width:min(560px,calc(100% - 110px));z-index:var(--z-menu);background:var(--tinta);color:var(--fundo);font-size:var(--t-rotulo);border-radius:var(--pilula);padding:var(--e2) var(--e4);max-width:calc(100% - 24px)}

/* entradas */
.js .entra{opacity:0;transform:translateY(16px);transition:opacity .7s var(--curva),transform .7s var(--curva)}
.js .entra.visto{opacity:1;transform:none}
/* títulos palavra por palavra */
.partido .pal{display:inline-block;opacity:0;transform:translateY(.45em) rotate(2deg);transition:opacity .6s var(--curva),transform .8s var(--curva);transition-delay:calc(var(--i) * 70ms)}
.partido .pal-el{opacity:0;transition:opacity .7s var(--curva);transition-delay:calc(var(--i) * 70ms)}
.partido.visto .pal,.partido.visto .pal-el{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important}
  .js .entra{transform:none;transition:opacity .2s linear}
  .cab{transition:none}
}
`;

// ---------- cabeçalho e rodapé ----------
const cab = (atual) => `
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="cab" id="cab">
  <div class="wrap">
    <div class="barra">
      <a class="marca" href="layout-alta-fidelidade.html" aria-label="O que dar?, página inicial"><img src="${LOGO}" alt="" width="500" height="500"></a>
      <nav class="menu" id="menu" aria-label="Principal">
        <a href="layout-alta-fidelidade.html#categorias"${atual === 'cat' ? ' aria-current="page"' : ''}>Categorias</a>
        <a href="layout-alta-fidelidade.html#ideias"${atual === 'ideias' ? ' aria-current="page"' : ''}>Ideias</a>
        <a href="https://oquedar.com/sobre-nos/">Sobre</a>
      </nav>
      <div class="acoes">
        <button class="btn btn-sec btn-peq btn-fav" type="button" id="abre-fav" aria-label="Favoritos salvos" aria-controls="gaveta" aria-expanded="false">${CORACAO}<span class="txt-fav">Favoritos</span><span class="cont" id="fav-cont">0</span></button>
        <a class="btn btn-sec btn-peq btn-buscar" href="buscar.html" aria-label="Buscar ideias de presente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg><span class="txt-buscar">Buscar</span></a>
        <button class="btn btn-sec btn-peq btn-menu" type="button" aria-expanded="false" aria-controls="menu">Menu</button>
      </div>
    </div>
  </div>
</header>
<div class="gaveta-fundo" id="gaveta-fundo" hidden></div>
<aside class="gaveta" id="gaveta" aria-labelledby="t-gaveta" hidden>
  <div class="gaveta-topo">
    <p class="sub" id="t-gaveta">Seus favoritos</p>
    <button class="btn btn-sec btn-peq" type="button" id="fecha-fav">Fechar</button>
  </div>
  <p class="meta">Guarde presentes e artigos enquanto navega. Quando chegar a data, está tudo aqui.</p>
  <div class="abas" role="tablist" aria-label="Tipo de favorito">
    <button type="button" role="tab" aria-selected="true" data-aba="presentes">Presentes <span id="n-presentes">0</span></button>
    <button type="button" role="tab" aria-selected="false" data-aba="artigos">Artigos <span id="n-artigos">0</span></button>
  </div>
  <ul class="fav-lista" id="fav-lista"></ul>
  <p class="fav-vazio" id="fav-vazio">Nada salvo ainda. Toque no coração de um presente ou de um artigo.</p>
  <p class="exemplo">Os favoritos ficam salvos só neste navegador.</p>
</aside>`;

const rodape = `
<footer class="rodape">
  <div class="brilho b1" aria-hidden="true"></div><div class="brilho b2" aria-hidden="true"></div>
  <div class="wrap">
    <div class="colunas">
      <div class="sobre">
        <a class="marca-rodape" href="layout-alta-fidelidade.html" aria-label="O que dar?, página inicial"><img src="${LOGO_ESCURO}" alt="" width="500" height="500"></a>
        <p>O O que dar? é um blog especializado em ideias de presentes para todas as ocasiões. Através da curadoria da nossa equipe, selecionamos sugestões de presentes para namorados, amigas, familiares, colegas de trabalho e muito mais.</p>
      </div>
      <div><p class="rod-tit">Presentes por</p><ul>
        <li><a href="https://oquedar.com/category/genero/">Gênero</a></li><li><a href="https://oquedar.com/category/idade/">Idade</a></li><li><a href="https://oquedar.com/category/preco/">Preço</a></li><li><a href="https://oquedar.com/category/interesse/">Interesse</a></li><li><a href="https://oquedar.com/category/ocasiao/">Ocasião</a></li><li><a href="https://oquedar.com/category/relacionamento/">Relacionamento</a></li><li><a href="https://oquedar.com/category/profissao/">Profissão</a></li>
      </ul></div>
      <div><p class="rod-tit">Informações gerais</p><ul>
        <li><a href="https://oquedar.com/politica-privacidade/">Política de Privacidade</a></li><li><a href="https://oquedar.com/termos-de-uso/">Termos de Uso</a></li><li><a href="https://oquedar.com/declaracao-de-afiliados/">Declaração de Afiliados</a></li><li><a href="https://oquedar.com/sobre-nos/">Sobre nós</a></li>
      </ul></div>
      <div><p class="rod-tit">Contato</p><ul>
        <li><a href="mailto:contato@oquedar.com.br">contato@oquedar.com.br</a></li><li><a href="https://oquedar.com/contato/">Página de contato</a></li>
      </ul></div>
      <div class="divulga"><p class="rod-tit">Divulgação de produtos</p>
        <p>Somos um site associado da Amazon e, portanto, recebemos comissões por compras qualificadas. Como se trata de um acordo de intermediação entre nosso site e a Amazon, os valores elegíveis de comissionamento não são repassados para os usuários. Para mais informações, leia nossa <a class="link" href="https://oquedar.com/declaracao-de-afiliados/">Política de Afiliados</a>.</p>
      </div>
    </div>
    <p class="palavra" aria-hidden="true">O que <span>dar?</span></p>
    <div class="linha"><span>© 2026 O que dar?</span><span>Criação de sites profissionais por <a href="https://a2agency.com.br/">A2 Marketing</a></span></div>
    <p class="creditos">Fotos: Magnific (benzoix, ArthurHidden, gpointstudio e equipe Magnific), Lummi (lébéa) e oquedar.com.</p>
  </div>
</footer>
<button class="assist-bt" type="button" id="assist-bt" aria-label="Dúvidas? Abrir ajuda" aria-controls="assist" aria-expanded="false"><span class="bola"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg></span><span class="txt-a">Dúvidas?</span></button>
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
</aside>`;

const JS_BASE = `
document.documentElement.classList.add('js');
(function(){
  var cab=document.getElementById('cab'),ultimo=0,menu=document.getElementById('menu'),bt=document.querySelector('.btn-menu');
  addEventListener('scroll',function(){var y=scrollY;cab.classList.toggle('rolou',y>24);if(!menu.classList.contains('aberto'))cab.classList.toggle('some',y>ultimo&&y>320);ultimo=y;},{passive:true});
  bt.addEventListener('click',function(){var a=menu.classList.toggle('aberto');bt.setAttribute('aria-expanded',a);bt.textContent=a?'Fechar':'Menu';});
  addEventListener("keydown",function(e){if(e.key==="Escape"&&menu.classList.contains("aberto")){menu.classList.remove("aberto");bt.setAttribute("aria-expanded","false");bt.textContent="Menu";bt.focus();}});
  menu.addEventListener("click",function(e){if(e.target.closest('a')){menu.classList.remove('aberto');bt.setAttribute('aria-expanded','false');bt.textContent='Menu';}});
  /* títulos: cada palavra vira uma peça que sobe */
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
    var tits=document.querySelectorAll('h1.gigante,h2.titulo,h2.gigante');
    var iot=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visto');iot.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px'});
    tits.forEach(function(h){var i=0;[].slice.call(h.childNodes).forEach(function(n){if(n.nodeType===3){var fr=document.createDocumentFragment();n.textContent.split(/(\\s+)/).forEach(function(w){if(!w)return;if(/^\\s+$/.test(w)){fr.appendChild(document.createTextNode(w));return;}var s=document.createElement('span');s.className='pal';s.style.setProperty('--i',i++);s.textContent=w;fr.appendChild(s);});h.replaceChild(fr,n);}else if(n.nodeType===1&&!n.classList.contains('sr-only')&&!n.classList.contains('cursor-tag')){n.classList.add('pal-el');n.style.setProperty('--i',i++);}});h.classList.add('partido');iot.observe(h);});
  }
  var itens=document.querySelectorAll('.entra');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;el.style.transitionDelay=(el.dataset.atraso||0)+'ms';el.classList.add('visto');setTimeout(function(){el.style.transitionDelay='';},1200);io.unobserve(el);}});},{rootMargin:'0px 0px -8% 0px'});
    itens.forEach(function(el){io.observe(el);});
  } else itens.forEach(function(el){el.classList.add('visto');});
})();
(function(){
  /* favoritos: presentes e artigos, guardados neste navegador */
  var CH='oqd-favoritos',dados={presentes:[],artigos:[]},aba='presentes';
  try{var s=JSON.parse(localStorage.getItem(CH));if(s&&s.presentes&&s.artigos)dados=s;}catch(e){}
  function salva(){try{localStorage.setItem(CH,JSON.stringify(dados));}catch(e){}}
  var bt=document.getElementById('abre-fav'),gav=document.getElementById('gaveta'),fundo=document.getElementById('gaveta-fundo'),fecha=document.getElementById('fecha-fav'),lista=document.getElementById('fav-lista'),vazio=document.getElementById('fav-vazio');
  function tem(t,id){return dados[t].some(function(x){return x.id===id;});}
  function desenha(){
    var n=dados.presentes.length+dados.artigos.length;
    document.getElementById('fav-cont').textContent=n;bt.classList.toggle('tem',n>0);
    document.querySelectorAll('[data-fav-n]').forEach(function(x){x.textContent=dados[x.dataset.favN].length;});
    document.getElementById('n-presentes').textContent=dados.presentes.length;document.getElementById('n-artigos').textContent=dados.artigos.length;
    document.querySelectorAll('[data-fav-id]').forEach(function(b){var on=tem(b.dataset.favTipo,b.dataset.favId);b.setAttribute('aria-pressed',on);var l=b.querySelector('.fav-txt');if(l)l.textContent=on?(b.dataset.favTipo==='artigos'?'Artigo salvo':'Salvo nos favoritos'):(b.dataset.favTipo==='artigos'?'Salvar artigo':'Salvar nos favoritos');});
    lista.innerHTML='';dados[aba].forEach(function(x){var li=document.createElement('li');var img=x.id&&document.querySelector('[data-fav-img="'+x.id+'"]');li.innerHTML='<span class="ponto c-'+(x.cor||'lavanda')+'">'+(img?'<img src="'+img.getAttribute('src')+'" alt="">':'')+'</span><a href="'+x.url+'"></a><button type="button" aria-label="Remover dos favoritos">&times;</button>';li.querySelector('a').textContent=x.nome;li.querySelector('button').onclick=function(){dados[aba]=dados[aba].filter(function(y){return y.id!==x.id;});salva();desenha();};lista.appendChild(li);});
    vazio.hidden=dados[aba].length>0;
  }
  document.addEventListener('click',function(e){var b=e.target.closest('[data-fav-id]');if(!b)return;e.preventDefault();var t=b.dataset.favTipo,id=b.dataset.favId;if(tem(t,id))dados[t]=dados[t].filter(function(x){return x.id!==id;});else dados[t].push({id:id,nome:b.dataset.favNome,url:b.dataset.favUrl,cor:b.dataset.favCor});salva();desenha();bt.classList.remove('pulsa');void bt.offsetWidth;bt.classList.add('pulsa');});
  function abre(){gav.hidden=false;fundo.hidden=false;bt.setAttribute('aria-expanded','true');desenha();fecha.focus();}
  function fechar(){gav.hidden=true;fundo.hidden=true;bt.setAttribute('aria-expanded','false');bt.focus();}
  bt.addEventListener('click',abre);fecha.addEventListener('click',fechar);fundo.addEventListener('click',fechar);
  document.querySelectorAll('[data-abre-fav]').forEach(function(x){x.addEventListener('click',function(e){e.preventDefault();abre();});});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!gav.hidden)fechar();});
  document.querySelectorAll('.abas button').forEach(function(a){a.addEventListener('click',function(){aba=a.dataset.aba;document.querySelectorAll('.abas button').forEach(function(x){x.setAttribute('aria-selected',x===a);});desenha();});});
  desenha();
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
})();`;

const head = (titulo, desc, extraCss) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<meta name="description" content="${desc}">
<link rel="icon" type="image/png" href="imagens/icone.png">
<link rel="apple-touch-icon" href="imagens/icone.png">
<meta name="theme-color" content="#F4F2F0">
<meta property="og:type" content="website">
<meta property="og:site_name" content="O que dar?">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="https://oquedar.com/imagens/compartilhar.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700&display=swap" rel="stylesheet">
<style>${CSS}${extraCss}</style>
</head>`;

// ---------- comparador ----------
function comparador(p, i, opts = {}) {
  const m = melhorIdx(p); const nomeP = opts.nome || nomes[i];
  const linhas = lojas.map((l, k) => `
        <li class="oferta${k === m ? ' melhor' : ''}">
          <span class="loja">${l}${k === m ? ` <span class="selo ${lojaCls[k]}">Melhor oferta</span>` : ''}</span>
          <span class="preco">${reais(p.precos[k])}</span>
          ${k === m ? `<a class="btn btn-oferta btn-peq ${lojaCls[k]}" href="#" aria-label="Ver oferta de ${esc(nomeP)} na ${l}">Ver oferta</a>` : `<a class="btn btn-sec btn-peq" href="#" aria-label="Ver oferta de ${esc(nomeP)} na ${l}">Ver oferta</a>`}
        </li>`).join('');
  return `
      <div class="comparador${opts.vidro ? ' vidro' : ''}">
        <div class="comp-topo"><span class="rotulo">Onde comprar</span><span class="exemplo">Preços de exemplo</span></div>
        <ul>${linhas}
        </ul>
      </div>`;
}

const CSS_COMP = `
.comparador{border-radius:var(--raio);padding:var(--e4);background:var(--degrade-suave)}
.comparador.vidro{background:rgba(255,255,255,.42);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.8)}
.comp-topo{display:flex;justify-content:space-between;align-items:center;gap:var(--e3);padding:0 var(--e2) var(--e3)}
.comparador ul{display:grid;gap:var(--e2)}
.oferta{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:var(--e4);padding:var(--e2) var(--e2) var(--e2) var(--e5);border-radius:var(--pilula);background:rgba(255,255,255,.55);min-height:60px}
.oferta.melhor{background:#fff;box-shadow:0 8px 24px rgba(120,50,50,.10)}
.loja{font-weight:var(--peso-forte);display:flex;flex-wrap:wrap;align-items:center;gap:var(--e2)}
/* botão da melhor oferta na cor da loja que tem o menor preço */
.btn-oferta.loja-amazon,.selo.loja-amazon{background:#FFAE3D;color:var(--tinta)}
.btn-oferta.loja-ml,.selo.loja-ml{background:#FFE14D;color:var(--tinta)}
.btn-oferta.loja-shopee,.selo.loja-shopee{background:#FF6A3D;color:var(--tinta)}
.btn-oferta.loja-amazon:hover,.btn-oferta.loja-ml:hover,.btn-oferta.loja-shopee:hover{filter:brightness(.95)}
.selo{display:inline-flex;align-items:center;min-height:24px;padding:0 var(--e2);border-radius:var(--pilula);background:var(--coral);font-size:var(--t-rotulo);font-weight:var(--peso-forte)}
.preco{font-weight:var(--peso-forte);font-variant-numeric:tabular-nums;font-size:var(--t-corpo)}
@media (max-width:560px){
  .oferta{grid-template-columns:1fr auto;border-radius:var(--raio-interno);padding:var(--e3)}
  .oferta .btn{grid-column:1/-1;width:100%}
}
`;
// ---------- PÁGINA INICIAL ----------
const artigos = [
  { t: 'Presente para Quem Gosta de Basquete: 14 Ideias', cat: 'Interesse', d: '14 de agosto de 2026', u: 'layout-artigo.html', cor: 'lavanda', img: 'Presentes de basquete recortados: bola, boné e caneca', foto: FOTO_BASQ, alt: 'Rapaz sorrindo enquanto gira uma bola de basquete na ponta do dedo' },
  { t: 'Presente para Quem Gosta de Correr: 15 Ideias que Todo Corredor Vai Gostar', cat: 'Interesse · Ocasião', d: '23 de junho de 2026', u: 'https://oquedar.com/presente-para-quem-gosta-de-correr/', cor: 'pessego', img: 'Tênis, relógio e garrafa de corrida' },
  { t: '15 Ideias de Presente para o Dia dos Namorados Que Fogem do Óbvio', cat: 'Namoro · Relacionamento', d: '11 de junho de 2026', u: 'https://oquedar.com/presente-dia-dos-namorados/', cor: 'rosa', img: 'Presentes românticos fora do óbvio' },
  { t: '15 Ideias de Presentes para Homens de 30 Anos que Valem a Pena', cat: 'Gênero · Idade', d: '5 de junho de 2026', u: 'https://oquedar.com/presentes-para-homens-30-anos/', cor: 'lavanda', img: 'Objetos de uso diário para homem de 30 anos' },
  { t: 'Presente para 1 Mês de Namoro: 10 Ideias Românticas para Surpreender', cat: 'Namoro', d: '3 de junho de 2026', u: 'https://oquedar.com/presente-1-mes-de-namoro/', cor: 'rosa', img: 'Pequenos presentes para início de namoro' },
];

// capas reais dos outros posts (baixadas do oquedar.com)
const CAPAS = [null, ['presente-para-quem-gosta-de-correr', 'Mulher sorrindo enquanto corre ao ar livre'], ['presente-dia-dos-namorados', 'Casal sorrindo trocando presente à luz de velas'], ['presentes-para-homens-30-anos', 'Homem sorrindo abrindo uma caixa de presente'], ['presente-1-mes-de-namoro', 'Casal sorrindo com caixas de presente no sofá']];
CAPAS.forEach((c, k) => { if (!c) return; artigos[k].foto = 'imagens/capa-' + c[0] + '.avif'; artigos[k].alt = c[1]; });

// Q recortado da imagem do logo (sem redesenhar): ocupa as reservas do Q de vidro até o 3D existir
const qLogo = (rotulo = 'Q do logo · a versão 3D em vidro entra aqui') => `<span class="q-logo"><img src="${LOGO}" alt=""></span><span class="q-rotulo">${rotulo}</span>`;

// botão de favoritar artigo (cartões)
const favArtigo = (a, id) => `<button class="fav-card" type="button" aria-pressed="false" aria-label="Salvar o artigo ${a.t.replace(/"/g, '&quot;')} nos favoritos" data-fav-tipo="artigos" data-fav-id="${id}" data-fav-nome="${a.t.replace(/"/g, '&quot;')}" data-fav-url="${a.u}" data-fav-cor="${a.cor}">${CORACAO}</button>`;

module.exports = { lojaCls, fs, path, OUT, esc, blocos, secao, intro, produtosTxt, nemTodo, comoEscolhemos, qualCombina, comoEscolher, faq, fechamento, lojas, P, reais, melhorIdx, nomes, faixa, CSS, cab, rodape, JS_BASE, head, comparador, CSS_COMP, artigos, LOGO, LOGO_ESCURO, FOTO_BASQ, PROD, PROD_ALT, imgProd, scriptImgs, CORACAO, favArtigo, qLogo };
