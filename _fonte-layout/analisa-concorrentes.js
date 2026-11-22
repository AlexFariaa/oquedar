// Lê os CSVs de palavras orgânicas dos concorrentes (export de pesquisa de domínio) e gera:
//  - resumo por concorrente (tráfego estimado, palavras no top 3/top 10, páginas que mais trazem visitas)
//  - lista de palavras com dificuldade baixa e volume >= 150, sem repetição, para a pauta
// Uso: node _fonte-layout/analisa-concorrentes.js <pasta-dos-csv> <saida.json>
const fs = require('fs'), path = require('path');
const [pasta, saida] = process.argv.slice(2);
const csv = t => { const L = [], re = /("([^"]|"")*"|[^,\n\r]*)(,|\r?\n|$)/g; let row = [], m; t = t.replace(/^﻿/, '');
  while ((m = re.exec(t)) && m[0] !== '') { let v = m[1]; if (v.startsWith('"')) v = v.slice(1, -1).replace(/""/g, '"'); row.push(v); if (m[3] !== ',') { L.push(row); row = []; } }
  return L; };
const arqs = fs.readdirSync(pasta).filter(f => /^export_research_br_domain_history_.*\.csv$/.test(f));
const resumo = [], todas = new Map();
for (const f of arqs) {
  const dom = f.replace(/^.*_2026-\d\d_/, '').replace(/\.csv$/, '');
  const [cab, ...linhas] = csv(fs.readFileSync(path.join(pasta, f), 'utf8')); const i = n => cab.indexOf(n);
  const R = linhas.filter(r => r.length > 5).map(r => ({ kw: r[i('Palavra-chave')], kd: +r[i('Dificuldade')], pos: +r[i('Posição')], vol: +r[i('Vol. de pesquisa')], int: r[i('Intenção de pesquisa')], url: r[i('URL')], traf: +r[i('Tráfego')] || 0, custo: +r[i('Custo de tráfego')] || 0, cpc: +r[i('CPC')] || 0 }));
  const traf = R.reduce((s, r) => s + r.traf, 0), custo = R.reduce((s, r) => s + r.custo, 0);
  const pag = {}; R.forEach(r => { pag[r.url] = (pag[r.url] || 0) + r.traf; });
  resumo.push({ dom, palavras: R.length, top3: R.filter(r => r.pos <= 3).length, top10: R.filter(r => r.pos <= 10).length, trafego: Math.round(traf), custoUSD: Math.round(custo),
    paginas: Object.entries(pag).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([u, t]) => u.replace(/^https?:\/\/[^/]+/, '') + ' (' + Math.round(t) + ')') });
  for (const r of R) { const k = r.kw.toLowerCase().trim(); const a = todas.get(k) || { kw: k, kd: r.kd, vol: r.vol, int: r.int, cpc: r.cpc, quem: [] }; a.quem.push(dom.split('.')[0] + ':' + r.pos); todas.set(k, a); }
}
// pauta: dificuldade até 29 (baixa/fácil), volume >= 150, intenção que não seja só navegação
const pauta = [...todas.values()].filter(a => a.kd <= 29 && a.vol >= 150 && !/^N$/.test(a.int)).sort((a, b) => b.vol - a.vol);
fs.writeFileSync(saida, JSON.stringify({ resumo, pauta }, null, 1));
console.log(resumo.map(r => `${r.dom}: ${r.trafego} visitas/mês, ${r.palavras} palavras, top3 ${r.top3}, top10 ${r.top10}, valor US$ ${r.custoUSD} | ${r.paginas.join(' ; ')}`).join('\n'));
console.log('pauta:', pauta.length, 'palavras com dificuldade <= 29 e volume >= 150');
