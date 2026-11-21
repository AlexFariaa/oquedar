---
name: oquedar-imagens
description: Baixa e trata a foto de cada produto de uma lista do oquedar no padrão do site (recorte sem fundo, até 900 px, WebP, nomeado pN-r.webp na pasta do post). Use ao montar a lista ou para refazer a imagem de um produto.
---

# Imagens dos produtos

## O padrão do site

- **Produto recortado, sem fundo** (transparente). A cor pastel atrás vem do próprio site.
- Lado maior com **até 900 px**, sem distorcer.
- Formato **WebP**, idealmente abaixo de 200 KB.
- Nome **`p<N>-r.webp`** na pasta **`imagens/posts/<slug>/`**, onde N é o número do produto na lista.

## De onde vem a foto

Use bom senso, sem pesquisa longa:

1. a foto principal do anúncio (Amazon, Mercado Livre ou Shopee), de preferência a de fundo branco;
2. outra foto do mesmo produto na internet, inclusive de outra cor, se a do anúncio for ruim;
3. nunca uma foto de outro produto ou modelo.

Se a foto não for exatamente a do anúncio (outra cor, por exemplo), marque `aviso_foto: true` no `produtos.json`.

Salve a foto original em `listas/<slug>/originais/p<N>.<ext>` (essa pasta não vai para o site).

## Tratar

Use o script do kit (precisa de Python com Pillow: `pip install pillow`):

```
python ferramentas/tratar_imagem.py listas/<slug>/originais/p1.jpg imagens/posts/<slug>/p1-r.webp
```

O script:

- recorta o fundo. Se o `rembg` estiver instalado (`pip install rembg`), usa ele, que recorta qualquer fundo. Se não estiver, remove o **fundo branco ou quase branco** a partir das bordas, o que funciona na maioria das fotos de marketplace;
- corta a sobra transparente, reduz para até 900 px e salva em WebP.

Se o Python não estiver disponível, trate a imagem pela ferramenta que houver (o Canva remove fundo) e salve com o mesmo nome e tamanho.

## Conferir cada imagem

Abra a imagem final e confira:

- o produto está inteiro, sem pedaço cortado nem sobra de fundo em volta;
- partes brancas do próprio produto não sumiram (bola branca, caneca branca). Se sumiram, use a versão com `rembg` ou mantenha a foto com o fundo, salva em WebP com o mesmo nome;
- não há marca d'água, texto promocional ("frete grátis", "-30%") nem selo da loja.

O texto alternativo (`alt`) descreve o produto e para quem ele é, numa frase. Ex.: "Caneca de cerâmica do Boston Celtics para fã de basquete".
