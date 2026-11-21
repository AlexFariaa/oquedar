// Ofertas reais por loja. Cada produto tem:
//   p.lojas = { amazon: { url, preco, nota, avaliacoes, verificado }, ml: {...}, shopee: {...} }
// A página mostra só o que existe: loja sem preço vira só botão; nota só aparece se alguma loja tiver.
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const reais = v => 'R$ ' + v.toFixed(2).replace('.', ',');
const LOJAS = [['amazon', 'Amazon', 'loja-amazon'], ['ml', 'Mercado Livre', 'loja-ml'], ['shopee', 'Shopee', 'loja-shopee']];
const dataBR = iso => { if (!iso) return ''; const [a, m, d] = iso.slice(0, 10).split('-'); return d + '/' + m + '/' + a; };

function ofertasDe(p) {
  const l = LOJAS.filter(([k]) => p.lojas && p.lojas[k] && p.lojas[k].url).map(([k, nome, cls]) => Object.assign({ k, nome, cls }, p.lojas[k]));
  const pr = l.filter(o => o.preco > 0);
  const melhor = pr.length ? pr.reduce((a, b) => (b.preco < a.preco ? b : a)) : (l[0] || null);
  const verificado = pr.map(o => o.verificado).filter(Boolean).sort().pop();
  return { l, pr, melhor, destaque: pr.length >= 2 ? melhor : null, verificado };
}
// a maior nota entre as lojas (regra da A.G.); empate: a com mais avaliações
function notaDe(p) {
  const l = LOJAS.filter(([k]) => p.lojas && p.lojas[k] && p.lojas[k].nota > 0).map(([k, nome]) => Object.assign({ nome }, p.lojas[k]));
  if (!l.length) return null;
  return l.reduce((a, b) => (b.nota > a.nota || (b.nota === a.nota && (b.avaliacoes || 0) > (a.avaliacoes || 0)) ? b : a));
}
const notaTxt = n => n ? n.nota.toFixed(1).replace('.', ',') + ' ★ na ' + n.nome + (n.avaliacoes ? ' (' + n.avaliacoes.toLocaleString('pt-BR') + ' avaliações)' : '') : '';
const linkLoja = (o, nome, cls, txt) => `<a class="${cls}" href="${esc(o.url)}" target="_blank" rel="sponsored nofollow noopener" aria-label="${txt} ${esc(nome)} na ${o.nome}">${txt}</a>`;
const faixaDe = p => { const m = ofertasDe(p).pr; if (!m.length) return 'sem'; const v = Math.min(...m.map(o => o.preco)); return v < 100 ? 'ate100' : v <= 300 ? '100a300' : 'acima300'; };

function comparador(p, nome, opts = {}) {
  const O = ofertasDe(p);
  if (!O.l.length) return '';
  const linhas = O.l.map(o => {
    const best = O.destaque === o, principal = best || O.l.length === 1;
    return `
        <li class="oferta${best ? ' melhor' : ''}">
          <span class="loja">${o.nome}${best ? ` <span class="selo ${o.cls}">Melhor oferta</span>` : ''}</span>
          <span class="preco">${o.preco > 0 ? reais(o.preco) : ''}</span>
          ${linkLoja(o, nome, principal ? 'btn btn-oferta btn-peq' + (best ? ' ' + o.cls : '') : 'btn btn-sec btn-peq', o.preco > 0 ? 'Ver oferta' : 'Ver na ' + o.nome)}
        </li>`;
  }).join('');
  return `
      <div class="comparador${opts.vidro ? ' vidro' : ''}">
        <div class="comp-topo"><span class="rotulo">Onde comprar</span>${O.verificado ? `<span class="meta">Preço verificado em ${dataBR(O.verificado)}</span>` : ''}</div>
        <ul>${linhas}
        </ul>
      </div>`;
}

module.exports = { LOJAS, ofertasDe, notaDe, notaTxt, linkLoja, faixaDe, comparador, dataBR, reais };
