// Baixa as imagens de cada post do oquedar.com: a foto da introdução (capa.avif) e a de cada presente (pN.avif).
// Gera também <slug>.imagens.json com o texto alternativo de cada uma.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..');
const posts = ['presente-para-quem-gosta-de-correr', 'presentes-para-homens-30-anos', 'presente-1-mes-de-namoro', 'presente-dia-dos-namorados'];
(async () => {
  for (const slug of posts) {
    const linhas = fs.readFileSync(path.join(__dirname, slug + '.txt'), 'utf8').split('\n');
    let sec = null; const lista = [];
    for (const l of linhas) {
      const h = l.match(/^H2: (\d+)\. /); if (h) { sec = +h[1]; continue; }
      if (/^H2: /.test(l)) { if (sec) sec = 'fim'; continue; }
      const m = l.match(/^IMG: (\S+) \| (.*)$/); if (!m) continue;
      if (sec === null) { if (!lista.find(x => x.nome === 'capa')) lista.push({ nome: 'capa', u: m[1], alt: m[2] }); }
      else if (typeof sec === 'number' && !lista.find(x => x.nome === 'p' + sec)) lista.push({ nome: 'p' + sec, u: m[1], alt: m[2] });
    }
    const dir = path.join(RAIZ, 'imagens', 'posts', slug); fs.mkdirSync(dir, { recursive: true });
    for (const x of lista) {
      const r = await fetch(x.u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!r.ok) { console.error('falhou', slug, x.nome, r.status); continue; }
      const ext = (x.u.match(/\.(avif|webp|jpe?g|png)$/i) || [, 'avif'])[1].toLowerCase().replace('jpeg', 'jpg');
      x.arq = x.nome + '.' + ext;
      fs.writeFileSync(path.join(dir, x.arq), Buffer.from(await r.arrayBuffer()));
    }
    fs.writeFileSync(path.join(__dirname, slug + '.imagens.json'), JSON.stringify(lista, null, 1));
    console.log(slug, lista.length, 'imagens', lista.map(x => x.nome).join(','));
  }
})();
