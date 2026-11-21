// Página de comparação: opções de visual para os preços das três lojas (gera opcoes-precos.html).
const fs = require('fs'), path = require('path');
const { OUT, head, CSS_COMP, reais, melhorIdx, lojas, comparador, P, imgProd } = require('./base.js');

const p = P[0]; const m = melhorIdx(p); const nome = 'Bola de Basquete Wilson NBA DRV Series';
// tons das lojas: pastel (combina com o site) e original (da marca)
const COR = {
  pastel: [{ f: '#FFE7C2', b: '#FFC870', t: '#1C1A1F' }, { f: '#FFF6B8', b: '#FFE45C', t: '#1C1A1F' }, { f: '#FFDCD3', b: '#FF9C85', t: '#1C1A1F' }],
  marca: [{ f: '#FFF3E0', b: '#FF9900', t: '#111' }, { f: '#FFFBD6', b: '#FFE600', t: '#2D3277' }, { f: '#FDE7E2', b: '#EE4D2D', t: '#fff' }],
};
const selo = '<span class="selo-m">Melhor oferta</span>';
const linhas = (tom, comFundo) => lojas.map((l, k) => { const c = COR[tom][k], best = k === m; return `
      <li class="lin${best ? ' best' : ''}" style="--f:${c.f};--b:${c.b};--t:${c.t}"${comFundo ? ' data-fundo' : ''}>
        <span class="lj"><i></i>${l}${best ? selo : ''}</span><span class="pr">${reais(p.precos[k])}</span>
        <a class="bt" href="#">Ver oferta</a>
      </li>`; }).join('');

const opA = `<ul class="opA">${linhas('pastel', true)}</ul>`;
const opB = `<ul class="opB">${linhas('pastel', false)}</ul>`;
const opC = `<div class="opC">${lojas.map((l, k) => { const c = COR.pastel[k], best = k === m; return `
      <div class="cart${best ? ' best' : ''}" style="--f:${c.f};--b:${c.b};--t:${c.t}">${best ? selo : ''}
        <span class="lj">${l}</span><span class="pr">${reais(p.precos[k])}</span>${best ? `<span class="eco">R$ ${(Math.max(...p.precos) - p.precos[k]).toFixed(2).replace('.', ',')} a menos</span>` : '<span class="eco"> </span>'}
        <a class="bt" href="#">Ver oferta</a>
      </div>`; }).join('')}</div>`;
const opD = `<ul class="opA opD">${linhas('marca', true)}</ul>`;
const opE = `<div class="opE" style="--f:${COR.pastel[m].f};--b:${COR.pastel[m].b};--t:${COR.pastel[m].t}">
      <div class="topo-e">${selo}<span class="lj">${lojas[m]}</span><span class="pr">${reais(p.precos[m])}</span><a class="bt" href="#">Ver oferta na ${lojas[m]}</a></div>
      <ul>${lojas.map((l, k) => k === m ? '' : `<li style="--b:${COR.pastel[k].b}"><span class="lj"><i></i>${l}</span><span class="pr">${reais(p.precos[k])}</span><a class="bt2" href="#">Ver</a></li>`).join('')}</ul>
    </div>`;

const OPS = [
  ['A', 'Cor da loja em cada linha, em tom pastel', 'Cada loja ganha o seu tom (laranja da Amazon, amarelo do Mercado Livre, coral da Shopee) bem clarinho, e o botão no mesmo tom mais forte. A melhor oferta fica com borda escura e selo coral. É a mais colorida sem brigar com o site.', opA],
  ['B', 'Linhas brancas, cor só no botão', 'O fundo fica branco e limpo; a cor da loja aparece numa bolinha ao lado do nome e no botão. A melhor oferta cresce um pouco e ganha o selo. Mais discreta, mas os botões já ficam fáceis de diferenciar.', opB],
  ['C', 'Três cartões lado a lado', 'Cada loja vira um cartãozinho com o preço grande. O da melhor oferta sobe, ganha borda e mostra quanto a pessoa economiza. Bom para comparar de relance; no celular os cartões ficam um embaixo do outro.', opC],
  ['D', 'Cores originais das lojas', 'Igual à A, mas com as cores de verdade das marcas nos botões (laranja Amazon, amarelo Mercado Livre, laranja-avermelhado Shopee). Reconhece a loja na hora, mas chama mais atenção que o resto do site.', opD],
  ['E', 'Melhor oferta em destaque, as outras menores', 'A melhor oferta aparece grande, no tom da loja, com um botão só. As outras duas ficam embaixo, em linhas menores. Ajuda a pessoa a decidir rápido e reduz a sensação de "apagado".', opE],
];

const CSS = CSS_COMP + `
body{background:var(--fundo)}
.topo{padding:clamp(40px,6vw,80px) 0 var(--e6)}
.topo h1{font-size:var(--t-titulo);letter-spacing:-.03em;line-height:1.05;margin:0 0 var(--e3)}
.grade-op{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--e6);padding-bottom:var(--secao)}
.op{background:#fff;border-radius:var(--raio);padding:var(--e6);display:flex;flex-direction:column;gap:var(--e4)}
.op.atual{background:transparent;border:1.5px dashed var(--fio-forte,#ccc)}
.op h2{font-size:var(--t-sub);letter-spacing:-.02em;line-height:1.2;margin:0}
.op .letra{display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--tinta);color:var(--fundo);font-weight:700;margin-right:var(--e2)}
.op p{margin:0;color:var(--apoio)}
.prod-mini{display:flex;align-items:center;gap:var(--e3);font-weight:700}
.prod-mini .im{width:56px;height:56px;border-radius:12px;background:var(--lavanda);position:relative;overflow:hidden;flex:none}
.prod-mini .im img{position:absolute;inset:0}
ul{list-style:none;margin:0;padding:0}
.lj{display:flex;align-items:center;gap:var(--e2);font-weight:700;flex-wrap:wrap}
.lj i{width:12px;height:12px;border-radius:50%;background:var(--b)}
.pr{font-weight:700;font-variant-numeric:tabular-nums}
.selo-m{display:inline-flex;align-items:center;min-height:24px;padding:0 10px;border-radius:999px;background:var(--coral);color:var(--tinta);font-size:var(--t-rotulo);font-weight:700}
.bt,.bt2{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 var(--e5);border-radius:999px;background:var(--b);color:var(--t);font-weight:700;text-decoration:none;white-space:nowrap;transition:transform .16s var(--curva),filter .2s}
.bt:hover,.bt2:hover{filter:brightness(.95)}.bt:active{transform:scale(.97)}
/* A e D */
.opA{display:grid;gap:var(--e2)}
.opA .lin{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:var(--e4);padding:var(--e2) var(--e2) var(--e2) var(--e5);border-radius:999px;background:var(--f);min-height:60px;border:2px solid transparent}
.opA .lin.best{border-color:var(--tinta);box-shadow:0 10px 24px rgba(28,26,31,.10)}
.opA .lj i{display:none}
/* B */
.opB{display:grid;gap:var(--e2)}
.opB .lin{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:var(--e4);padding:var(--e2) var(--e2) var(--e2) var(--e5);border-radius:999px;background:#fff;border:1px solid var(--fio,#e5e1e6);min-height:60px}
.opB .lin.best{min-height:72px;border:2px solid var(--coral);box-shadow:0 10px 24px rgba(255,102,80,.15)}
.opB .lin.best .pr{font-size:var(--t-abertura)}
/* C */
.opC{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--e3);align-items:end}
.opC .cart{position:relative;display:flex;flex-direction:column;gap:var(--e2);padding:var(--e5) var(--e4) var(--e4);border-radius:var(--raio-interno);background:var(--f);border-top:6px solid var(--b)}
.opC .cart.best{padding-top:var(--e7);border:2px solid var(--tinta);border-top-width:6px;box-shadow:0 14px 30px rgba(28,26,31,.12)}
.opC .cart .selo-m{position:absolute;top:-12px;left:50%;transform:translateX(-50%);white-space:nowrap}
.opC .pr{font-size:var(--t-sub);letter-spacing:-.02em}
.opC .eco{font-size:var(--t-rotulo);min-height:1.2em;color:var(--tinta)}
.opC .bt{padding:0 var(--e3)}
/* E */
.opE{border-radius:var(--raio);overflow:hidden;border:1px solid var(--fio,#e5e1e6)}
.opE .topo-e{display:grid;grid-template-columns:1fr auto;gap:var(--e2) var(--e4);align-items:center;padding:var(--e5);background:var(--f)}
.opE .topo-e .selo-m{grid-column:1/-1;justify-self:start}
.opE .topo-e .pr{font-size:var(--t-sub);letter-spacing:-.02em}
.opE .topo-e .bt{grid-column:1/-1}
.opE ul{display:grid}
.opE li{display:grid;grid-template-columns:1fr auto auto;gap:var(--e4);align-items:center;padding:var(--e3) var(--e5);border-top:1px solid var(--fio,#e5e1e6)}
.opE .bt2{background:transparent;border:1.5px solid var(--b);min-height:40px;padding:0 var(--e4)}
@media (max-width:900px){.grade-op{grid-template-columns:1fr}}
@media (max-width:560px){
  .opA .lin,.opB .lin{grid-template-columns:1fr auto;border-radius:var(--raio-interno);padding:var(--e3)}
  .opA .bt,.opB .bt{grid-column:1/-1}
  .opC{grid-template-columns:1fr}.opC .cart.best{order:-1}
}
`;

const html = head('Opções de preços · O que dar?', 'Opções de visual para os preços das três lojas.', CSS) + `
<body>
<main class="wrap">
  <header class="topo">
    <span class="rotulo">Para escolher</span>
    <h1>Como mostrar os preços das três lojas.</h1>
    <p class="abre" style="max-width:52ch">Mesmo presente, mesmos preços de exemplo, cinco jeitos de mostrar. A primeira caixa é como está hoje, para comparar.</p>
  </header>
  <div class="grade-op">
    <section class="op atual">
      <h2>Como está hoje</h2>
      <p>Linhas em tom claro, todas parecidas; só a melhor oferta fica branca com o selo.</p>
      ${comparador(p, 0, { nome })}
    </section>
${OPS.map(([l, t, d, h]) => `    <section class="op" id="op-${l}">
      <h2><span class="letra">${l}</span>${t}</h2>
      <p>${d}</p>
      <div class="prod-mini"><span class="im">${imgProd(0)}</span>${nome}</div>
      ${h}
      <span class="meta">Preços de exemplo</span>
    </section>`).join('\n')}
  </div>
</main>
</body>
</html>`;
fs.writeFileSync(path.join(OUT, 'opcoes-precos.html'), html);
console.log('opcoes-precos ok');
