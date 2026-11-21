# O que dar? — kit de trabalho do Claude

Este arquivo é para o Claude (Cowork ou aba Code do app). Leia inteiro antes de qualquer tarefa neste repositório.

## O site

- oquedar.com: ideias de presente, pago por comissão de afiliado (Amazon, Mercado Livre e Shopee).
- HTML, CSS e JavaScript puros, sem framework. Cada post é um `.html` na raiz; imagens em `imagens/`.
- **Quem manda é a dona do site.** Ela pesquisa as palavras-chave, escolhe os produtos finais e escreve os artigos. O Claude monta a lista de produtos, gera os links, trata as imagens e cuida da publicação.
- Tudo em português do Brasil, valores em R$.

## O que o Claude faz aqui (uma skill por etapa)

Leia só a skill da etapa pedida. No Cowork, abra o arquivo pelo caminho; na aba Code, ela também aparece pelo nome.

| Pedido | Skill | Arquivo |
|---|---|---|
| "monta a lista de presentes para <palavra-chave>" | lista de produtos | `.claude/skills/oquedar-lista-de-produtos/SKILL.md` |
| "gera os links" / parte da lista | links de afiliado | `.claude/skills/oquedar-links-afiliado/SKILL.md` |
| "trata as imagens" / parte da lista | imagens dos produtos | `.claude/skills/oquedar-imagens/SKILL.md` |
| "coloca os produtos no post", "publica", "agenda para dia X" | publicar | `.claude/skills/oquedar-publicar/SKILL.md` |
| "coloca o site no ar", "monta o agendamento" (uma vez só) | site no ar | `.claude/skills/oquedar-site-no-ar/SKILL.md` |

Fluxo normal de um artigo: **lista → links → imagens → (a dona escreve) → publicar**.

## Onde fica cada coisa

| Pasta | O que guarda |
|---|---|
| raiz (`*.html`) | páginas e posts do site |
| `imagens/posts/<slug-do-post>/` | imagens dos produtos de cada post (`p1-r.webp`, `p2-r.webp`…) |
| `listas/<slug-do-post>/` | entrega da lista: `lista.md` (para a dona ler), `produtos.json` (dados), `originais/` (fotos baixadas) |
| `ferramentas/` | scripts do kit (ex.: `tratar_imagem.py`) |
| `.claude/skills/` | as skills deste kit |

`listas/`, `ferramentas/`, `.claude/`, `LEIA-PRIMEIRO.md` e `CLAUDE.md` **não fazem parte do site** e nunca podem ir para o ar (ver a skill do site no ar).

## Regras que valem sempre

1. **Nada de dado inventado.** Preço, loja, link e disponibilidade são conferidos na página da loja, com data. Se não deu para conferir, escreva "não conferido", nunca um número de exemplo.
2. **Link de afiliado só pelo gerador oficial** de cada loja, no Chrome dela logado nas contas. Nunca monte link à mão nem copie de outro site.
3. **Produto ruim não entra** só porque vende ou paga comissão. Precisa fazer sentido como presente para a pessoa da palavra-chave.
4. **Amazon:** o site **não mostra** nota nem número de avaliações copiados da Amazon (regra do programa). Eles servem só para a curadoria, dentro da lista. A "Nota OQD" é a nota própria do site e pode aparecer.
5. **Aviso de afiliado:** a frase exigida pela Amazon precisa estar no site — "Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas." (ver a skill de publicar).
6. **Sem pessoa ou experiência inventada:** nada de "testei", "uso há anos" se não for verdade.
7. **Sem senha, token ou chave em arquivo.** Logins ficam no navegador.
8. **Publicar e enviar ao GitHub só quando a dona pedir.** Antes de enviar, mostre o que mudou.
9. Mudou um padrão (loja nova, formato novo)? Atualize a skill correspondente para valer nas próximas vezes.

## Navegador

Use o **Claude in Chrome** no Chrome da dona, já logado em Amazon Associados, Mercado Livre Afiliados e Shopee Afiliados. Abra abas novas e não feche as dela. Se uma loja pedir login, CAPTCHA ou código, pare e peça para ela resolver na tela; depois continue.
