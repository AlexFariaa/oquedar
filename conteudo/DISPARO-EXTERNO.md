# Disparo externo do robô de publicação

## Por que existe
O robô que publica os posts agendados roda no GitHub ("Publicar site", em `.github/workflows/publicar.yml`). O agendamento do próprio GitHub falha às vezes: em 22/11 e 23/11/2026 ele pulou várias horas seguidas e os posts das 7h e das 9h não saíram na hora.

A solução é um serviço externo gratuito, o **cron-job.org**, chamar o robô a cada 15 minutos. O agendamento do GitHub continua ligado como reserva. Quando nada mudou, o robô não reenvia o site (ele confere antes), então rodar mais vezes não atrapalha.

Você faz duas coisas: (1) cria uma chave no GitHub que só serve para acionar o robô e (2) cadastra o disparo no cron-job.org. Leva uns 10 minutos.

**Importante:** a chave é uma senha. Cole-a só no cron-job.org. Não mande no chat, não salve em arquivo do projeto e não mostre em print.

---

## Parte 1: criar a chave no GitHub
Use a conta do GitHub que é dona do site (**AlexFariaa**).

1. Entre em https://github.com/settings/personal-access-tokens/new
   (caminho pelo menu: foto do perfil > Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token).
2. **Token name:** `cron-job oquedar`
3. **Expiration:** a maior opção disponível (1 ano). Anote a data de vencimento: nesse dia o disparo para de funcionar e é preciso criar outra chave (ver "Quando a chave vencer").
4. **Repository access:** marque **Only select repositories** e escolha só `AlexFariaa/oquedar`.
5. **Permissions > Repository permissions:** em **Actions**, escolha **Read and write**. Não mexa em mais nada (o GitHub adiciona "Metadata: Read-only" sozinho; é normal).
6. Clique em **Generate token** e **copie a chave** (começa com `github_pat_`). Ela só aparece uma vez; se fechar a página sem copiar, apague e crie outra.

## Parte 2: cadastrar o disparo no cron-job.org
1. Crie uma conta gratuita em https://cron-job.org e entre.
2. Clique em **Create cronjob** (ou "Criar cronjob").
3. Aba **Common** (Geral):
   - **Title:** `Publicar O que dar?`
   - **URL:** `https://api.github.com/repos/AlexFariaa/oquedar/actions/workflows/publicar.yml/dispatches`
   - **Execution schedule:** **Every 15 minutes** (a cada 15 minutos).
4. Aba **Advanced** (Avançado):
   - **Request method:** `POST`
   - **Headers** (adicione um por um, nome e valor):
     | Nome | Valor |
     |---|---|
     | `Authorization` | `Bearer ` + a chave da Parte 1 (a palavra Bearer, um espaço e a chave) |
     | `Accept` | `application/vnd.github+json` |
     | `X-GitHub-Api-Version` | `2022-11-28` |
     | `Content-Type` | `application/json` |
   - **Request body:** `{"ref":"main"}`
   - **Timezone** (se aparecer): `America/Sao_Paulo`.
5. Se houver opção de avisar por e-mail quando falhar, deixe ligada (assim você fica sabendo se a chave vencer).
6. Salve (**Create** / **Save**).

## Parte 3: testar
1. No cron-job.org, abra o disparo e use **Test run** (Executar teste). A resposta certa é **204** (No Content): significa que o GitHub aceitou.
   - **401**: a chave está errada ou faltou o "Bearer " antes dela.
   - **403**: a chave não tem a permissão Actions: Read and write.
   - **404**: a chave não tem acesso ao repositório `oquedar`, ou o endereço da URL foi digitado errado.
   - **422**: o corpo `{"ref":"main"}` está faltando ou diferente.
2. Depois me avise. Eu confiro no GitHub se apareceu uma execução do robô do tipo "workflow_dispatch" (é o disparo externo) e se ela terminou com sucesso.

## Quando a chave vencer
O GitHub manda e-mail uns dias antes. Crie uma chave nova igual à da Parte 1 e troque só o valor do header `Authorization` no cron-job.org (mantendo o "Bearer "). Depois apague a chave antiga no GitHub.

## Se quiser desligar
Desative o disparo no cron-job.org e apague a chave no GitHub (Settings > Developer settings > Personal access tokens > Fine-grained tokens). O agendamento do próprio GitHub continua funcionando como antes.
