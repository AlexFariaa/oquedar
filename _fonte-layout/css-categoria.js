// CSS do modelo de categoria
const CSS_CAT = `
section{position:relative}
.trilha ol{display:flex;flex-wrap:wrap;gap:var(--e2);align-items:center}
.trilha li{display:flex;align-items:center;gap:var(--e2);font-size:var(--t-rotulo)}
.trilha li+li::before{content:"";width:6px;height:6px;border-right:1.5px solid var(--discreto);border-bottom:1.5px solid var(--discreto);transform:rotate(-45deg)}
.trilha a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;font-weight:var(--peso-forte)}

/* abertura da categoria, com a fita atravessando */
.cat-abertura{position:relative;padding-top:clamp(132px,15vw,176px);padding-bottom:calc(var(--e9) + var(--e6));overflow:clip}
.cat-abertura .fita-cat{position:absolute;z-index:0;left:0;top:auto;bottom:0;width:100%;height:190px;pointer-events:none;filter:drop-shadow(0 10px 18px rgba(255,102,80,.22))}
.cat-abertura .fita-cat path{stroke-width:22;stroke-linecap:round}
.js .cat-abertura .fita-cat path{stroke-dasharray:1;stroke-dashoffset:1;animation:desenha-cat 2.4s var(--curva) .3s forwards}
@keyframes desenha-cat{to{stroke-dashoffset:0}}
.cat-abertura .wrap{position:relative;z-index:1}
.cat-grade{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end}
.cat-txt{grid-column:1/span 7;display:flex;flex-direction:column;gap:var(--e5);position:relative;z-index:2}
.cat-txt .gigante{font-size:clamp(3rem,7vw,7rem)}
.cat-txt .abre{max-width:32em}
.cat-numeros{display:flex;flex-wrap:wrap;gap:var(--e2)}
.cat-foto{grid-column:9/span 4;aspect-ratio:4/5;border-radius:var(--raio);position:relative;z-index:1;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.cat-foto{overflow:hidden}
.cat-foto img{width:100%;height:100%;object-fit:cover}

/* filtro por assunto */
.sub-filtro{position:sticky;top:88px;z-index:calc(var(--z-cab) - 1);display:flex;gap:var(--e2);overflow-x:auto;padding:var(--e2);margin:var(--e6) 0 var(--e5);border-radius:var(--pilula);background:rgba(255,255,255,.75);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid #fff;box-shadow:0 10px 30px rgba(70,30,40,.06);scrollbar-width:none}
.sub-filtro::-webkit-scrollbar{display:none}
.sub-filtro button{flex:none;font:inherit;min-height:44px;padding:0 var(--e4);border-radius:var(--pilula);border:1.5px solid var(--fio-forte);background:transparent;color:var(--tinta);cursor:pointer}
.sub-filtro button[aria-pressed="true"]{background:var(--tinta);border-color:var(--tinta);color:var(--fundo);font-weight:var(--peso-forte)}
.ordem{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--e3);margin-bottom:var(--e5)}

/* artigos da categoria */
.cat-artigos{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5)}
.art-item{position:relative;grid-column:span 4}
.art-item.grande{grid-column:span 8}
.art-item[hidden]{display:none}
.art{display:flex;flex-direction:column;gap:var(--e3);height:100%;border-radius:var(--raio);overflow:hidden;padding:0 0 var(--e5);text-decoration:none;transition:transform .25s var(--curva),box-shadow .25s var(--curva)}
.art > span{padding-inline:var(--e5)}
.art-img{aspect-ratio:3/2;margin-bottom:var(--e2);overflow:hidden}
.grande .art-img{aspect-ratio:16/9}
.art-img img{width:100%;height:100%;object-fit:cover;object-position:50% 30%;transition:transform .6s var(--curva)}
.art-t{font-weight:var(--peso-forte);line-height:1.3;text-wrap:balance}
@media (hover:hover){.art:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(70,30,40,.10)}.art:hover .art-img img{transform:scale(1.04)}}
.vazio-cat{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--e4);padding:var(--e8) var(--e5);border-radius:var(--raio);background:#fff}
.vazio-cat .q-logo{width:56px}
.vazio-cat .q-rotulo{display:none}

/* presentes mais salvos */
.salvos{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--e4)}
.salvo{position:relative;display:flex;flex-direction:column;gap:var(--e2)}
.salvo .foto-s{position:relative;aspect-ratio:1;border-radius:var(--raio);overflow:hidden}
.salvo .foto-s .img-prod{position:absolute;inset:0;transition:transform .6s var(--curva)}
@media (hover:hover){.salvo:hover .foto-s .img-prod{transform:scale(1.05)}}
.salvo a.nome{font-weight:var(--peso-forte);line-height:1.3;text-decoration:none;font-size:var(--t-rotulo)}
.salvo a.nome:hover{text-decoration:underline}
.salvo b{font-variant-numeric:tabular-nums}

/* outras categorias */
.outras{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--e3)}
.outras a{display:flex;justify-content:space-between;align-items:center;gap:var(--e2);min-height:72px;padding:0 var(--e4);border-radius:var(--raio);text-decoration:none;font-weight:var(--peso-forte);transition:transform .25s var(--curva)}
.outras a svg{width:18px;height:18px;flex:none;transition:transform .25s var(--curva)}
@media (hover:hover){.outras a:hover{transform:translateY(-3px)}.outras a:hover svg{transform:rotate(-45deg)}}

.cabeca{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--e5);align-items:end;margin-bottom:var(--e6)}
.cabeca h2{grid-column:1/span 7}
.cabeca p{grid-column:9/span 4}
.bloco-secao{margin-top:var(--secao)}

@media (max-width:900px){
  .cat-txt,.cat-foto{grid-column:1/-1}
  .cat-foto{aspect-ratio:16/9}
  .cat-abertura .fita-cat{top:30%}
  .art-item,.art-item.grande{grid-column:1/-1}
  .salvos{grid-template-columns:repeat(2,minmax(0,1fr))}
  .outras{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cabeca h2,.cabeca p{grid-column:1/-1}
}
@media (prefers-reduced-motion:reduce){.js .cat-abertura .fita-cat path{animation:none;stroke-dashoffset:0}}
`;
module.exports = CSS_CAT;
