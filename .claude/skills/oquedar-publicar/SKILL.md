---
name: oquedar-publicar
description: Coloca os produtos de uma lista conferida dentro do post do oquedar (cartões, "Onde comprar", filtro de preço), liga o post na home, nas categorias e no sitemap, e agenda a data de publicação. Use quando a dona pedir "coloca os produtos no post", "publica" ou "agenda para dia X".
---

# Publicar um post

A dona escreve o texto e escolhe os produtos finais da lista. Esta skill encaixa os dados no HTML e prepara a publicação. **Antes de enviar ao GitHub, mostre a ela o que mudou e espere o OK.**

## 1. Produtos dentro do post

Fonte: `listas/<slug>/produtos.json`, só com os itens que ela manteve, na ordem dela.

Use como molde um post que já existe (ex.: `presente-para-quem-gosta-de-basquete.html`) e **copie a estrutura dele**, sem inventar classes novas:

- **Faixa do topo** (`nav.faixa-prod`): um `<li>` por produto, com número (`01`, `02`…), imagem e nome; ciclo de cores `c-lavanda`, `c-rosa`, `c-pessego`.
- **Cartão** (`article.produto`, `id="p-N"`, `data-faixa` do json): foto, nome, tag, Nota OQD e prós e contras (da dona) e o bloco "Onde comprar".
- **"Onde comprar"** (`div.comparador`): um `<li class="oferta">` por loja que tem o produto, com o preço no formato `R$ 129,90`.
  - A melhor oferta ganha `class="oferta melhor"`, o selo `<span class="selo loja-ml">Melhor oferta</span>` e o botão `btn btn-oferta btn-peq loja-ml` (Amazon: `loja-amazon`; Shopee: `loja-shopee`).
  - As outras lojas usam `btn btn-sec btn-peq`.
  - Todo botão de loja: `href` = link de afiliado, `target="_blank"` e `rel="sponsored nofollow noopener"`.
- **Contagem:** "Mostrando N de N presentes".

### Trocar os textos "de exemplo"

O molde tem marcas de exemplo que **não podem ir para o ar com dado real**:

- "Preços de exemplo" → "Preços conferidos em DD/MM/AAAA · podem mudar";
- "valor de exemplo" → "conferido em DD/MM";
- "Nota, prós e contras de exemplo" → remova quando a nota e os prós e contras forem da dona;
- "· preços de exemplo" na contagem → remova.

**Nunca** coloque nota ou número de avaliações da Amazon no site. Só a Nota OQD.

Se `aviso_foto` for `true`, acrescente embaixo da foto: `<span class="meta">Foto ilustrativa; confira a cor e a versão no anúncio.</span>`

### Aviso de afiliado

No começo de cada post (perto do título) e em `declaracao-de-afiliados.html`, tem de constar a frase da Amazon:

> Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas.

Pode vir junto do aviso que já existe ("podemos ganhar uma comissão…"). Hoje essa frase ainda não está no site: inclua-a no primeiro post que publicar.

## 2. Ligar o post no resto do site

- **Home** (`index.html`): um cartão `a.art` igual aos que já existem, com capa, título e link.
- **Categorias:** um cartão em cada `categoria-*.html` em que o post se encaixa (ocasião, relacionamento, interesse, preço…).
- **Sitemap:** se já existir `sitemap.xml`, acrescente a URL. Se o site já tiver o script de montagem (ver a skill do site no ar), ele gera o sitemap sozinho.

## 3. Agendar

O agendamento funciona depois de a skill `oquedar-site-no-ar` ter sido feita uma vez.

- No `<head>` do post: `<meta name="oqd:publicar-em" content="AAAA-MM-DD">`.
- Em cada cartão novo (home e categorias): o atributo `data-publicar-em="AAAA-MM-DD"`.
- Na montagem diária, o site só publica o post e os cartões quando a data chega. Sem data = publica na próxima montagem.

Enquanto o site novo não estiver no ar, a data fica marcada no arquivo e passa a valer quando ele entrar.

## 4. Conferir e enviar

- Abra o post no navegador (arquivo local) e confira: imagens aparecendo, filtro de preço funcionando, botões abrindo o produto certo, nada escrito "exemplo".
- Mostre à dona a lista de arquivos alterados e um resumo.
- Com o OK dela: commit com uma mensagem clara (ex.: "Post: presente para namorado que gosta de basquete, agendado para 01/12") e envio ao GitHub, pela aba Code ou pelo GitHub Desktop (botão **Push origin**).
