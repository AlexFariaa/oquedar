// Ajuste 28 (21/11/2026): o modelo de artigo passa a usar só dados reais por loja (ofertas.js).
// Sem preço/nota de exemplo: preço e nota aparecem só quando existem; filtro de preço só se houver preço.
const fs = require('fs');
const f = __dirname + '/modelo-artigo.js'; let s = fs.readFileSync(f, 'utf8');
fs.writeFileSync(f.replace('.js', '.antes-ajuste-28.js'), s);
function troca(a, b) { if (!s.includes(a)) { console.error('NAO ACHEI:', a.slice(0, 80)); process.exit(1); } s = s.replace(a, b); }

troca("const { esc, lojas, reais, melhorIdx, faixa, cab, rodape, JS_BASE, head, comparador, CORACAO, favArtigo } = B;",
  "const { esc, cab, rodape, JS_BASE, head, CORACAO, favArtigo } = B;\nconst { ofertasDe, notaDe, notaTxt, linkLoja, faixaDe, comparador, dataBR, reais } = require('./ofertas.js');");

// cartão do produto
troca("    const m = melhorIdx(p), n = i + 1;", "    const n = i + 1, nota = notaDe(p);");
troca('<article class="produto" id="p-${n}" data-faixa="${faixa(p.precos[m])}"', '<article class="produto" id="p-${n}" data-faixa="${faixaDe(p)}"');
troca(`          <div class="avaliacao">
            <span class="nota"><span class="meta">Nota OQD</span><b>\${p.nota}</b></span>
            <span class="exemplo">Nota, prós e contras de exemplo</span>
          </div>`,
  `          \${nota ? \`<div class="avaliacao"><span class="nota"><b>\${nota.nota.toFixed(1).replace('.', ',')} ★</b><span class="meta">na \${nota.nome}\${nota.avaliacoes ? \` · \${nota.avaliacoes.toLocaleString('pt-BR')} avaliações\` : ''}</span></span></div>\` : ''}`);
troca("${comparador(p, i, { nome: nomes[i] })}", "${comparador(p, nomes[i])}");

// "Se você tem pouco tempo": preço só se existir; botão leva à loja de melhor preço (ou à loja disponível)
troca("<div class=\"rapido\">${D.pouco.map((e, k) => { const p = P[e.i]; const m = melhorIdx(p); return `",
  "<div class=\"rapido\">${D.pouco.map((e, k) => { const p = P[e.i]; const O = ofertasDe(p), mo = O.melhor; return `");
troca("<div class=\"linha-preco\"><span><span class=\"meta\">a partir de</span><br><b>${reais(p.precos[m])}</b></span><a class=\"btn btn-oferta\" href=\"#\" aria-label=\"Ver oferta de ${esc(nomes[e.i])} na ${lojas[m]}\">Ver oferta</a></div>\n              <span class=\"meta\">Melhor preço na ${lojas[m]} · valor de exemplo</span>",
  "${mo ? `<div class=\"linha-preco\">${mo.preco > 0 ? `<span><span class=\"meta\">a partir de</span><br><b>${reais(mo.preco)}</b></span>` : '<span></span>'}${linkLoja(mo, nomes[e.i], 'btn btn-oferta', mo.preco > 0 ? 'Ver oferta' : 'Ver na ' + mo.nome)}</div>\n              <span class=\"meta\">${mo.preco > 0 ? `Melhor preço na ${mo.nome} · verificado em ${dataBR(mo.verificado)}` : `Disponível na ${O.l.map(o => o.nome).join(', ')}`}</span>` : ''}");

// seleção: texto e filtro de preço só quando houver preços
troca("<p class=\"abre\">${N} presentes, cada um com nota, prós e contras e o preço nas três lojas. Toque no coração para guardar os que você gostou.</p>",
  "<p class=\"abre\">${N} presentes, cada um com prós e contras e onde comprar. Toque no coração para guardar os que você gostou.</p>");
troca('          <div class="filtro" role="group" aria-label="Filtrar por faixa de preço">', '          ${temPreco ? `<div class="filtro" role="group" aria-label="Filtrar por faixa de preço">');
troca('            <button type="button" data-f="acima300" aria-pressed="false">Acima de R$ 300</button>\n          </div>\n          <p class="contagem" id="contagem" aria-live="polite">Mostrando ${N} de ${N} presentes · preços de exemplo</p>',
  '            <button type="button" data-f="acima300" aria-pressed="false">Acima de R$ 300</button>\n          </div>\n          <p class="contagem" id="contagem" aria-live="polite">Mostrando ${N} de ${N} presentes</p>` : \'\'}');

// comparativo: colunas de nota e preço só se existirem
troca("<p class=\"abre\">Os ${N} presentes lado a lado, com o menor preço encontrado.</p>", "<p class=\"abre\">Os ${N} presentes lado a lado${temPreco ? ', com o menor preço encontrado' : ''}.</p>");
troca("              <caption>Notas e preços de exemplo, fictícios até a integração com o sistema de ofertas.</caption>\n", "              <caption class=\"sr\">Os presentes desta lista e onde comprar</caption>\n");
troca('<thead><tr><th scope="col">Presente</th><th scope="col">Nota</th><th scope="col">A partir de</th><th scope="col"><span class="sr">Ação</span></th></tr></thead>',
  '<thead><tr><th scope="col">Presente</th>${temNota ? \'<th scope="col">Nota</th>\' : \'\'}${temPreco ? \'<th scope="col">A partir de</th>\' : \'\'}<th scope="col"><span class="sr">Ação</span></th></tr></thead>');
troca("<tbody>${P.map((p, i) => { const m = melhorIdx(p); return `", "<tbody>${P.map((p, i) => { const O = ofertasDe(p), mo = O.melhor, nt = notaDe(p); return `");
troca('</th><td class="n">${p.nota}</td><td class="n">${reais(p.precos[m])}</td><td><a class="btn btn-sec btn-peq" href="#" aria-label="Ver oferta de ${esc(nomes[i])} na ${lojas[m]}">Ver oferta</a></td></tr>`',
  '</th>${temNota ? `<td class="n">${nt ? nt.nota.toFixed(1).replace(\'.\', \',\') + \' ★\' : \'\'}</td>` : \'\'}${temPreco ? `<td class="n">${mo && mo.preco > 0 ? reais(mo.preco) : \'\'}</td>` : \'\'}<td>${mo ? linkLoja(mo, nomes[i], \'btn btn-sec btn-peq\', mo.preco > 0 ? \'Ver oferta\' : \'Ver na \' + mo.nome) : \'\'}</td></tr>`');

// texto de transparência sem marca de "exemplo"
troca('              <span class="exemplo">Texto a atualizar quando Mercado Livre e Shopee estiverem ativos</span>\n', '');
// contagem do filtro (JS) sem "preços de exemplo"
troca("cont.textContent='Mostrando '+n+' de ${N} presentes · preços de exemplo';", "cont.textContent='Mostrando '+n+' de ${N} presentes';");
// variáveis de apoio, calculadas antes do HTML
troca('  const total = P.map((p, i) => cardProduto(p, i));', '  const temPreco = P.some(p => ofertasDe(p).pr.length), temNota = P.some(p => notaDe(p));\n  const total = P.map((p, i) => cardProduto(p, i));');
fs.writeFileSync(f, s); console.log('modelo-artigo ok');
