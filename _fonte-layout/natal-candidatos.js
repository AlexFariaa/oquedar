// Gera conteudo/pesquisas/natal-candidatos.html e _fonte-layout/pesquisa-natal-candidatos.json (Amazon, 24/11/2026)
const fs=require('fs');
const G=[
['Até R$ 100',[
['B07FFKS5KH','Kit Banho Diário Chá Branco e Gengibre',79.99,4.9,621,'91v6n9aKYGL'],
['B0FWMJ64SP','Kit Granado Terrapeutics, Trio de Gengibre Revigorante',71.90,4.8,86,'514PFSKQwWL'],
['B0D5BZ3JQ3','Luminária articulada de mesa abajur Pixar',69.25,4.7,576,'51X0Zzr3AOL'],
['B0DKZ9JKXK','Brinox cafeteira italiana 6 xícaras Verona',94.99,4.6,501,'51ZGDz-ZJ5L'],
['B0GK9RDPJM','Jogo 6 taças de vinho 440 ml em cristal, haste longa',75.42,4.6,217,'61nimcBdOoL'],
['B0CJ9R95CC','Kit caipirinha profissional, coqueteleira 500 ml, 5 peças inox',53.97,4.8,113,'61fnuNZhsdL'],
['B0DQF3SFQQ','Kit café especial em grãos Reserva Gourmet, 3 sabores',71.25,4.6,69,'71P5Ey1xzLL'],
['B07WR4TP9W','Jogo de facas Tramontina Plenus',62.54,4.9,272,'61XYJxq-3PL'],
['B0FRFR6X83','Manta 100% algodão para sofá 240 x 180 cm',59.74,4.5,493,'71xq7BKuDRL'],
['B0DVMQVVDY','Philips fone sem fio TWS TAT1109',89.00,4.6,106,'519bjoeFBTL']]],
['R$ 100 a 200',[
['B0GL3JXLRY','Stanley copo Everyday Tumbler com tampa',104.50,4.8,190,'51t0gnSFNDL'],
['B0GHP7RCVF','Principia kit limpeza e hidratação facial completo',102.75,4.8,318,'516Qs2ugFbL'],
['B0FF9X7RYZ','Kit de coquetel profissional com 26 peças',112.33,4.7,104,'71G7tQs3YKL'],
['B0FDK26ZPV','Lumai kit tábua de frios de bambu premium com petisqueiras',118.82,4.9,110,'61DPNKsZn2L'],
['B0B5LPPZVQ','Jogo de 6 taças para champanhe em cristal',119.00,4.7,276,'31Gcs0i9egL'],
['B0D45QCBF7','Huawei FreeBuds SE 2 fone sem fio',119.00,4.7,135,'41t-GpTeQuL'],
['B0BNCBLHBM','Kit Café Gourmet Baggio chocolate com avelã e trufado',126.97,4.7,184,'71LhZ6i6x0L'],
['B0H5TH4QHW','Jogo com 6 taças de vinho tinto em cristal ecológico',132.99,4.5,208,'71sBZ4yB0XL'],
['B0HF1N8QGR','Stanley garrafa térmica Quick Flip 710 ml',135.85,4.8,142,'51XjLYM-leL'],
['B0DJ19VGDD','LEGO Botanicals Mini Orquídea 10343',137.12,4.8,57,'71p7JAoI7hL'],
['B0CV2KSL3V','LEGO Botanicals Crisântemo 10368',143.43,4.9,45,'71CQditw8GL'],
['B0FPNXM7TF','JBL Go Essential caixa de som bluetooth',154.85,4.8,808,'71cWjfs8G3L'],
['B082MT1WX6','Chá Twinings, kit com 100 sachês',160.45,4.8,373,'71dD2S5Cn+L'],
['B0GM1LSHQF','JBL Tune 530BT fone over-ear sem fio',163.30,4.8,917,'61TNh5cVcsL'],
['B0DHL63KWK','JBL Wave Buds fone sem fio',188.10,4.6,91,'414+kOLlS5L']]],
['R$ 200 a 400',[
['B0D3N7TRJ4','Kit caixa de madeira com 60 sachês de chás',233.69,4.8,117,'41gSrdD2F+L'],
['B0H1F1VKJT','JBL Go 5 caixa de som bluetooth à prova d\'água',266.00,4.9,317,'71iEBIqbzkL'],
['B094SK425Z','Electrolux kit 6 facas de aço inox com afiador',289.90,4.8,261,'51M9eAP6oYL'],
['B0CX43FY4T','Overmont panela holandesa de ferro fundido esmaltada',298.62,4.6,114,'71ArdkSvPhL'],
['B0D9B8SHKL','Moldura digital WiFi 10,1 polegadas',310.39,4.5,174,'71aftImUerL'],
['B0CDCL6Y5T','LEGO Icons 10329 Plantas em Miniatura',317.20,4.9,63,'81SEw3QMkkL'],
['B00004RFRU','Bialetti Moka Express 6 xícaras',319.67,4.8,862,'616WtXLQ9jL'],
['B0FVBH3L33','JBL Grip caixa de som bluetooth 16 W',399.84,4.7,432,'61v5T6gMkjL']]]];
let n=0;const J={data:'2026-11-24',formato:'[n, asin, nome, preço, nota, avaliações, imagem]',grupos:[]};
let h='<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Natal: candidatos</title><style>body{font-family:system-ui,sans-serif;background:#F4F2F0;color:#1C1A1F;margin:0;padding:24px 16px 60px}main{max-width:1200px;margin:auto}h2{margin:36px 0 12px;font-size:20px}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}.c{position:relative;background:#fff;border-radius:14px;padding:12px;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:6px}.c img{width:100%;height:170px;object-fit:contain}.c b{font-size:14px;line-height:1.3}.p{font-weight:700}.s{font-size:13px;color:#666}.n{position:absolute;top:8px;left:8px;background:#1C1A1F;color:#fff;border-radius:99px;padding:2px 9px;font-size:13px;font-weight:700}</style><main><h1>Sugestão de presente de Natal: candidatos</h1><p>Amazon, 24/11/2026. Clique no card para abrir. Me diga os números que quer (30 no total, distribuídos pelas faixas).</p>';
for(const [t,L] of G){h+=`<h2>${t}</h2><div class="g">`;J.grupos.push([t,[]]);for(const [a,nm,p,r,v,img] of L){n++;J.grupos.at(-1)[1].push([n,a,nm,p,r,v,img]);h+=`<a class="c" href="https://www.amazon.com.br/dp/${a}" target="_blank" rel="noopener"><span class="n">${n}</span><img loading="lazy" src="https://m.media-amazon.com/images/I/${img}._AC_SL300_.jpg" alt=""><b>${nm}</b><span class="p">R$ ${p.toFixed(2).replace('.',',')}</span><span class="s">${r} ★ (${v})</span></a>`}h+='</div>'}
fs.writeFileSync('conteudo/pesquisas/natal-candidatos.html',h);fs.writeFileSync('_fonte-layout/pesquisa-natal-candidatos.json',JSON.stringify(J,null,1));console.log(n)
