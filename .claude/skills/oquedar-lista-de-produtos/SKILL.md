---
name: oquedar-lista-de-produtos
description: Monta e confere a lista de produtos de um artigo do oquedar a partir da palavra-chave que a dona enviar (ex. "presente para namorado que gosta de basquete"), com preço conferido, lojas, links de afiliado e imagens tratadas. Use quando pedirem "monta a lista", "busca os itens", "separa os presentes".
---

# Lista de produtos de um artigo

A dona manda a palavra-chave (e, se quiser, quantidade, faixa de preço, para quem é). O resultado é uma lista que ela usa para escrever o artigo. **Ela escreve o texto; esta skill não escreve o artigo.**

## 1. Entender o pedido

Anote, sem perguntar o que dá para deduzir:

- **palavra-chave** e **slug** do post (minúsculas, hífens, sem acento; ex.: `presente-namorado-basquete`). Se já existir um `.html` com esse assunto na raiz, use o slug dele;
- **para quem** é o presente e **qual a ocasião**;
- **quantidade:** ela pede N; entregue de N+2 a N+4 opções (pedido de 10 → 12 a 14), para ela poder cortar;
- **faixa de preço**, se ela disse. Se não disse, misture as três faixas do site: `ate100`, `100a300`, `acima300`.

Só pergunte se a palavra-chave tiver duas leituras muito diferentes.

## 2. Garimpar candidatos

No Chrome (Claude in Chrome), abas novas:

- busca das próprias lojas: Amazon, Mercado Livre e Shopee;
- "mais vendidos" e "mais desejados" da categoria na Amazon e no Mercado Livre;
- ideias de presente para esse público, para não esquecer nada óbvio.

Busque o dobro do necessário e corte depois.

## 3. Critérios de corte (o produto entra só se passar em tudo)

1. **Faz sentido como presente** para a pessoa da palavra-chave. Ex.: para "namorado que gosta de basquete", bola e camisa fazem sentido; um suplemento genérico não faz.
2. **Está à venda agora**, com estoque, em pelo menos uma das três lojas.
3. **Boa reputação:** nota a partir de 4,3 com pelo menos 50 avaliações. Produto novo com pouca avaliação só entra se for de marca conhecida, e isso vai anotado.
4. **Vendedor confiável:** na Amazon, vendido ou enviado pela Amazon ou loja oficial; no Mercado Livre, loja oficial ou MercadoLíder; na Shopee, loja oficial ("Shopee Mall") ou loja indicada com boa nota. Evite anúncio com título confuso, foto de outro produto ou réplica.
5. **Variedade:** não repita o mesmo tipo de item mais de duas vezes (duas bolas, no máximo). Varie entre útil, decorativo, experiência, roupa e criativo, e entre as faixas de preço.
6. **Nada perigoso, proibido ou constrangedor** para dar de presente.

## 4. Conferir em cada loja

Para cada produto aprovado, procure **o mesmo produto** (mesma marca e modelo) nas três lojas:

- **igual:** mesmo modelo → anote preço e link da página;
- **parecido:** versão diferente (cor, tamanho) → anote como "parecido" e diga a diferença;
- **não tem:** deixe em branco. Não force uma loja.

Anote o **preço à vista que aparece na página**, sem cupom e sem "preço de antes", com a **data da conferência**. A **melhor oferta** é a de menor preço entre as lojas com o produto igual.

## 5. Links e imagens

- Links: siga `.claude/skills/oquedar-links-afiliado/SKILL.md` para cada loja marcada como "igual" ou "parecido".
- Imagens: siga `.claude/skills/oquedar-imagens/SKILL.md`, uma imagem por produto.

## 6. Entrega

Crie a pasta `listas/<slug>/` com dois arquivos.

**`produtos.json`** — uma entrada por produto, na ordem sugerida:

```json
{
  "palavra_chave": "presente para namorado que gosta de basquete",
  "slug": "presente-namorado-basquete",
  "conferido_em": "2026-11-21",
  "produtos": [
    {
      "n": 1,
      "nome": "Bola de Basquete Wilson NBA DRV Series",
      "por_que": "Útil para quem joga de verdade; serve para iniciante e para quem joga sempre.",
      "tag_sugerida": "Para quem joga",
      "faixa": "100a300",
      "imagem": "imagens/posts/presente-namorado-basquete/p1-r.webp",
      "alt": "Bola de basquete Wilson NBA DRV Series laranja",
      "aviso_foto": false,
      "lojas": [
        {"loja": "amazon", "status": "igual", "preco": 129.90, "link_afiliado": "https://amzn.to/...", "pagina": "https://www.amazon.com.br/dp/...", "nota_interna": "4,8 (3.200)"},
        {"loja": "ml", "status": "igual", "preco": 119.90, "link_afiliado": "https://meli.la/...", "pagina": "https://produto.mercadolivre.com.br/...", "nota_interna": "4,9 (1.100)"},
        {"loja": "shopee", "status": "nao_tem"}
      ],
      "melhor_oferta": "ml",
      "observacoes": ""
    }
  ]
}
```

- `faixa` usa o preço da melhor oferta: até R$ 100 = `ate100`; de R$ 100 a R$ 300 = `100a300`; acima de R$ 300 = `acima300`.
- `nota_interna` é só para a curadoria e **não vai para o site** (ver o LEIA-PRIMEIRO, regra 4).
- `aviso_foto: true` quando a foto não é exatamente a do anúncio (outra cor, por exemplo).

**`lista.md`** — o mesmo conteúdo em formato fácil de ler, para a dona escrever o artigo:

- topo: palavra-chave, data da conferência, quantos itens e quantos em cada faixa;
- uma seção por produto: nome, foto (caminho), por que entra, para quem funciona melhor, o que observar (tamanho, voltagem, compatibilidade), preço em cada loja, melhor oferta e links;
- no fim, "Ficaram de fora": produtos descartados e o motivo em uma linha (ajuda se ela quiser trocar algum).

## 7. Conferência final antes de entregar

- [ ] Nenhum link repetido entre produtos diferentes.
- [ ] Cada link abre o produto certo (abra cada um uma vez).
- [ ] Toda imagem existe no caminho indicado e mostra o produto certo.
- [ ] Todos os preços têm data; nada "de exemplo".
- [ ] Quantidade entre N+2 e N+4, com as faixas de preço misturadas.

Depois responda à dona em poucas linhas: quantos itens, onde está a lista (`listas/<slug>/lista.md`) e o que não deu para conferir.
