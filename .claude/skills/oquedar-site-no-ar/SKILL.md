---
name: oquedar-site-no-ar
description: Passo a passo, feito uma vez, para colocar o site novo do oquedar no ar (hospedagem grátis ligada ao GitHub, domínio, redirecionamentos) e montar a publicação agendada diária. Use quando a dona pedir "coloca o site no ar" ou "monta o agendamento".
---

# Site no ar e publicação agendada (montar uma vez)

**Situação em 21/11/2026:** oquedar.com ainda responde pelo WordPress antigo. O site novo está só no GitHub. Não existe `sitemap.xml`, `robots.txt` nem configuração de hospedagem.

Faça em etapas e mostre cada uma à dona antes de seguir. **Trocar o domínio é o passo sem volta fácil:** só com o OK dela e do Alex.

## Etapa 1 — Script de montagem (`ferramentas/montar_site.py`)

O repositório é público e guarda coisas que não são do site (o kit, as listas). Por isso o site no ar é **montado** numa pasta separada, `publico/`, com só o que é do site. O script:

1. copia para `publico/` só: os `*.html` da raiz, `imagens/` e os arquivos de site que existirem (css, js, ícones, `_redirects`). **Nunca** copia `.claude/`, `listas/`, `ferramentas/`, `LEIA-PRIMEIRO.md`, `CLAUDE.md`, `README.md` nem `imagens/**/_originais*`;
2. lê a data de hoje **no fuso de São Paulo**;
3. **post agendado:** se um `.html` tem `<meta name="oqd:publicar-em" content="AAAA-MM-DD">` com data futura, ele não é copiado;
4. **cartão agendado:** em toda página copiada, remove os elementos com `data-publicar-em` de data futura (use um parser de HTML, como o `html.parser` do Python, e não substituição por texto solto);
5. gera `publico/sitemap.xml` com as páginas publicadas (URL `https://oquedar.com/<arquivo>`, `lastmod` = data do último commit do arquivo ou a data de hoje) e `publico/robots.txt` apontando para o sitemap;
6. roda só com a biblioteca padrão do Python (a hospedagem não instala nada).

Teste local antes: rode o script, abra `publico/index.html` e confira que não sobrou nada do kit. Faça também um teste com um post de data futura, que deve sumir.

## Etapa 2 — Hospedagem grátis (Cloudflare Pages)

Quem faz é a dona, no navegador, com o Claude guiando passo a passo:

1. Conta grátis na Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → repositório `oquedar`.
2. Build command: `python3 ferramentas/montar_site.py`. Build output directory: `publico`.
3. Salvar e esperar a primeira montagem. O site fica num endereço provisório `*.pages.dev`: confira tudo nele.

Cada envio ao GitHub passa a montar e publicar sozinho.

## Etapa 3 — Montagem diária (para os agendados entrarem no dia)

1. No Cloudflare Pages → **Settings** → **Builds** → **Deploy hooks** → criar um hook (ex.: "diario") e copiar a URL.
2. No GitHub → repositório → **Settings** → **Secrets and variables** → **Actions** → novo segredo `CF_DEPLOY_HOOK` com essa URL. **A URL nunca vai para arquivo do repositório.**
3. Criar `.github/workflows/publicar-agendados.yml`:

```yaml
name: Publicar agendados
on:
  schedule:
    - cron: "0 9 * * *"   # 06h em Brasília
  workflow_dispatch: {}
jobs:
  montar:
    runs-on: ubuntu-latest
    steps:
      - run: curl -fsS -X POST "${{ secrets.CF_DEPLOY_HOOK }}"
```

4. Testar pelo botão **Run workflow** na aba Actions e conferir que uma nova montagem apareceu na Cloudflare.

## Etapa 4 — Domínio (só com o OK)

Antes de apontar oquedar.com para o site novo:

1. **Endereços antigos:** liste as URLs do WordPress (posts, categorias, páginas; o `sitemap_index.xml` do Rank Math ajuda). Toda URL antiga que mudar ganha linha em `_redirects` (formato Cloudflare: `/antiga/ /nova.html 301`). Nada pode virar 404.
2. **E-mail do domínio:** se houver e-mail @oquedar.com, anote os registros MX e TXT atuais para não perder.
3. No Cloudflare Pages → **Custom domains** → `oquedar.com` e `www.oquedar.com`, seguindo o que a Cloudflare pedir no registro do domínio.
4. Depois de no ar: Search Console com o novo `sitemap.xml`, e conferência das URLs antigas abrindo com o redirecionamento.

## Etapa 5 — Atualizar este kit

Quando tudo funcionar, atualize a seção "Situação" no topo desta skill e a seção "Agendar" de `oquedar-publicar`.
