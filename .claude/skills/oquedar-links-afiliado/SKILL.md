---
name: oquedar-links-afiliado
description: Gera os links de afiliado oficiais do oquedar na Amazon (SiteStripe), no Mercado Livre (botão Compartilhar da conta de afiliado) e na Shopee (Link personalizado), pelo Chrome da dona já logado. Use para preencher os links de uma lista ou trocar um link quebrado.
---

# Links de afiliado

As contas de afiliado já estão criadas e são compartilhadas. A dona loga nelas no Chrome dela uma vez; o Claude usa esse Chrome pelo **Claude in Chrome**.

**Regras:**

- Link só pelo gerador oficial de cada loja. Nunca monte link à mão, nunca copie link de outro site, nunca invente.
- Gere o link a partir da **página do produto** (não da busca).
- Depois de gerar, **abra o link** numa aba nova e confira que caiu no produto certo.
- Se aparecer login, CAPTCHA ou código de verificação, **pare** e peça para a dona resolver na tela. Não tente de novo em loop.
- Sem pressa: um produto por vez, sem abrir dezenas de abas ao mesmo tempo (as lojas bloqueiam acesso que parece robô).

## Amazon — SiteStripe

1. Abra a página do produto em amazon.com.br, logada na conta de Associados.
2. No topo aparece a barra **SiteStripe**. Confira se o ID de rastreamento selecionado é **`oquedar-20`**.
3. Clique em **Obter link** → **Texto** → copie o link curto (`https://amzn.to/...`).
4. Se a barra não aparecer, a conta não está logada: peça à dona para entrar em associados.amazon.com.br.

## Mercado Livre — Compartilhar

1. Abra a página do produto no Mercado Livre, logada na conta de afiliado.
2. Clique em **Compartilhar** (perto do título ou da foto). Na conta de afiliado aparece a opção de **link de afiliado** com a etiqueta.
3. Escolha a etiqueta do oquedar, se houver mais de uma (se não houver uma com o nome do site, use a disponível e avise a dona).
4. Copie o link curto (`https://meli.la/...`).

## Shopee — Link personalizado

1. Copie a URL da página do produto na Shopee.
2. Abra `https://affiliate.shopee.com.br/offer/custom_link` (painel de afiliado).
3. Cole a URL no campo (até 5 por vez). Em **Sub_id**, use `oquedar`, para separar as vendas deste site.
4. Clique em **Obter link** e copie o link curto (`https://s.shopee.com.br/...`).
5. A Shopee às vezes pede CAPTCHA: a dona resolve e o Claude tenta uma única vez de novo.

## Onde anotar

No `produtos.json` da lista: `link_afiliado` (o link curto gerado) e `pagina` (a URL normal do produto, para conferir depois). Se não deu para gerar, deixe `link_afiliado` vazio e escreva o motivo em `observacoes`.

## Trocar um link quebrado

Produto esgotado ou link que não abre: procure o mesmo produto em outro anúncio confiável da mesma loja, gere o link de novo e troque no `produtos.json` e no post. Se não houver, avise a dona para ela decidir se tira o item.
