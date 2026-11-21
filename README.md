# O que dar?

Fonte do site oquedar.com (HTML, CSS e JavaScript, sem framework).

- `conteudo/posts/<post>/`: texto do artigo e `post.json` (produtos, links e preços por loja, status e data de publicação)
- `catalogo/produtos.json`: todos os produtos pesquisados e onde foram usados
- `_fonte-layout/`: gerador das páginas
- `.github/workflows/publicar.yml`: robô que gera o site, solta os posts agendados e envia para o ramo `publicado`, que a Hostinger coloca no ar

Como funciona a produção de posts: `conteudo/COMO-FUNCIONA.md`.
