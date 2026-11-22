# Briefing para a IA que escreve os artigos do O que dar?

Cole tudo abaixo da linha na outra IA. Junto, envie a **lista de produtos validada** (nome exato + ficha de detalhes), que o Claude entrega antes.

---

Você vai escrever um artigo de lista de presentes para o site O que dar? (oquedar.com). O site já mostra sozinho, em cada produto: foto, preço, nota, botões das lojas e comparativo. O seu trabalho é **só o texto editorial**, no formato abaixo.

## Tema deste artigo
- Palavra-chave principal: **melhor presente para menino de 3 anos** (a busca é "melhor presente 3 anos menino"; escreva sempre na forma natural, nunca "presente 3 anos menino" solto).
- Variações para usar com naturalidade (cada uma no máximo 1 ou 2 vezes): presente para menino de 3 anos; o que dar de presente para menino de 3 anos; presente de aniversário de 3 anos; brinquedo para menino de 3 anos; ideias de presente para criança de 3 anos.
- Público: quem vai presentear (pais, tios, padrinhos, avós, amigos da família), não a criança.
- Use apenas os produtos da lista enviada, na ordem enviada, com o **nome exatamente igual** (é assim que o site liga cada texto à foto e aos links).

## Onde a palavra-chave precisa aparecer
- No título da aba (SEO title), no H1, na primeira frase da introdução, em pelo menos um H2 e na meta description.
- No resto do texto, só quando soar natural. Nada de repetir por repetir.

## Formato obrigatório (Markdown puro)
- `#` para o H1, `##` para H2, `###` para H3. Sem HTML, sem tabelas, sem negrito em títulos, sem emojis, sem caixas de código e sem qualquer tag de ferramenta (ex.: `</WritingBlock>`).
- Estrutura:

```
# H1 (contém a palavra-chave)

2 ou 3 parágrafos de introdução (a palavra-chave na primeira frase).

## Grupo 1 (ex.: Brinquedos para gastar energia: X ideias)
1 parágrafo curto apresentando o grupo.

### 1. Nome exato do produto
2 parágrafos.

### 2. Nome exato do produto
2 parágrafos.

## Grupo 2 ...
### 3. ... (a numeração continua, não recomeça em cada grupo)

## Como escolher o melhor presente para menino de 3 anos?
3 ou 4 parágrafos.

## Perguntas frequentes sobre presentes para menino de 3 anos
### Pergunta 1?
Resposta em 1 parágrafo.
(4 a 5 perguntas, cada uma em ###)

## H2 de fechamento
2 parágrafos.
```

- Se não fizer sentido dividir em grupos, use os produtos direto em `##` ("## 1. Nome"), sem os H2 de grupo. Nunca misture os dois jeitos.

## Como escrever cada produto
- 2 parágrafos por produto, de 60 a 110 palavras no total.
- Use **detalhes concretos da ficha enviada** (material, tamanho, quantas peças, faixa etária indicada, se usa pilha etc.). Pelo menos 1 detalhe concreto por produto. É isso que dá cara de quem conhece o produto.
- Diga **para que tipo de criança** combina (a que adora correr, a que gosta de montar, a que está na fase do faz de conta...) e **em que situação** o presente funciona (aniversário, Natal, visita).
- Não invente nada que não esteja na ficha: nem medida, nem material, nem benefício para o desenvolvimento, nem selo, nem prêmio.
- Segurança, com leveza: se a ficha indicar faixa etária, cite. Para peças pequenas, lembre de conferir a idade indicada na embalagem. Não faça alertas alarmistas.
- **Não escreva** preço, nota, número de avaliações, nome de loja, "link", "clique aqui", "compre agora" nem código do produto. O site mostra tudo isso e atualiza sozinho.
- Evite frases genéricas que serviriam para qualquer produto ("é uma ótima opção", "pode ser uma alternativa interessante", "vale a pena conferir"). No máximo uma vez no artigo inteiro.
- Tom: próximo, claro e confiante, em português do Brasil. Frases curtas. Sem exageros ("incrível", "perfeito", "imperdível").

## Entregue também, DEPOIS do artigo (fora do texto)
1. **SEO title** com até 60 caracteres, começando pela palavra-chave. Ex.: "Melhor presente para menino de 3 anos: 12 ideias".
2. **Meta description** com 130 a 155 caracteres, com a palavra-chave e um convite à leitura.
3. **Slug** sugerido (ex.: `melhor-presente-menino-3-anos`).
4. **Se você tem pouco tempo**: 3 produtos da lista, com um rótulo cada ("Melhor no geral", "Melhor custo", "Mais criativo") e 1 frase curta (até 12 palavras) dizendo por quê.
5. **Por produto**, uma linha neste formato:
   `N. Nome | Tags: tag 1, tag 2 | Prós: prós 1; prós 2 | Contras: contra 1`
   Tags de 1 ou 2 palavras (ex.: "Ao ar livre", "Criativo"). Prós e contras curtos (até 6 palavras cada), tirados da ficha. Um contra honesto por produto (ex.: "Precisa de pilhas", "Ocupa espaço").
6. **Duas frases do artigo** para o marca-texto do site, copiadas exatamente como estão no texto (trechos de 6 a 14 palavras, que resumam bem a ideia do post).

## Não precisa entregar
Alt text, nomes de arquivos de imagem, dados estruturados (schema), links internos ou configuração de plugin. O Claude cuida disso na montagem.
