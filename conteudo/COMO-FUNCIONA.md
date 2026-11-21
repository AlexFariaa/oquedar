# Como funciona a produção de posts do O que dar?

## 1. Pesquisa de produtos (Claude)
A A.G. envia palavras-chave, público, quantidade de itens e faixa de preço.
Claude pesquisa na Amazon, no Mercado Livre e na Shopee (com as contas de afiliada da A.G.) e registra em `catalogo/produtos.json` cada produto encontrado:
- nome, foto, texto alternativo;
- por loja: link de afiliado, preço, nota, número de avaliações e data da verificação.
Entrega também uma tabela para a A.G. escolher e escrever.

## 2. Artigo (A.G.)
A A.G. escreve no formato de `conteudo/MODELO-ARTIGO.md` e envia o arquivo.

## 3. Montagem (Claude)
Cada post fica em `conteudo/posts/<endereço-do-post>/`:
- `artigo.md`: o texto da A.G. (nos posts que vieram do WordPress, `texto.txt`);
- `post.json`: categoria, capa, destaques, produtos usados (com links, preços, notas por loja), status e data de publicação;
- fotos tratadas em `imagens/posts/<endereço-do-post>/` (fundo branco retirado, `pN-r.webp`).

Regras de exibição: preço e nota só aparecem quando existem; a nota mostrada é a maior entre as lojas ("4,6 ★ na Amazon (1.234 avaliações)"); o botão e o selo da melhor oferta ficam na cor da loja mais barata; todo preço mostra a data de verificação.

## 4. Publicação
- `status: "publicado"`: entra no site no próximo envio.
- `status: "agendado"` com `publicar: "2026-12-01T09:00:00-03:00"`: o robô do GitHub publica sozinho quando a hora chegar (ele roda de hora em hora), atualizando inicial, categorias, "Outros posts" e o `sitemap.xml`.
- `status: "rascunho"`: fica guardado, fora do site.

## 5. Atualização de preços (sob demanda)
A A.G. pede "atualiza os preços do post X". Claude confere cada link, atualiza preço, nota e data em `post.json` e no `catalogo/produtos.json` (o histórico de preços fica guardado).

## Comandos (no computador)
- Gerar as páginas: `node _fonte-layout/gerar.js`
- Montar o site final em `site/`: `node _fonte-layout/final.js`
- Prévia do site final: `node _fonte-layout/servidor-site.js` (http://localhost:5180)
