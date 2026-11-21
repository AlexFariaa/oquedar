# O que dar?

Site de ideias de presente (oquedar.com), feito em HTML, CSS e JavaScript, sem framework.

- `index.html`: página inicial
- posts, páginas de texto e categorias: um arquivo `.html` para cada página
- `imagens/`: todas as imagens usadas (créditos em `imagens/CREDITOS.md`)

Preços, notas e links de oferta são exemplos até a integração com as lojas.

## Kit do Claude (listas de produtos, links e publicação)

O repositório traz um kit para o Claude trabalhar no site. As instruções para ele ficam em `LEIA-PRIMEIRO.md` e as etapas em `.claude/skills/`.

**Para começar (uma vez):**

1. Baixe o repositório no PC, pelo GitHub Desktop (File → Clone repository) ou pela aba Code do app do Claude.
2. No Chrome, entre nas contas de afiliado: Amazon Associados, Mercado Livre Afiliados e Shopee Afiliados. Deixe a extensão Claude in Chrome ativa.
3. **No Cowork:** escolha a pasta do repositório e, nas instruções da pasta, escreva: "Antes de qualquer tarefa, leia o arquivo LEIA-PRIMEIRO.md desta pasta e siga as skills que ele indica." **Na aba Code:** abra a pasta; o Claude lê o kit sozinho.
4. Para as fotos: Python com Pillow (`pip install pillow`). O `rembg` é opcional e recorta melhor (`pip install rembg`).

**No dia a dia:**

- "Monta a lista de 10 presentes para namorado que gosta de basquete": a lista sai em `listas/<post>/lista.md`, com links e imagens.
- Você escreve o post.
- "Coloca os produtos no post e agenda para 01/12": o Claude mostra o que mudou e só envia ao GitHub com o seu OK.
- Uma vez só: "coloca o site no ar e monta o agendamento" (skill `oquedar-site-no-ar`).

`listas/`, `ferramentas/`, `.claude/` e estes arquivos de instrução não fazem parte do site e não vão para o ar.
