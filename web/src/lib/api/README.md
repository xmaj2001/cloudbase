# lib/api — comunicação Next.js ⇄ NestJS (Better Auth em BFF)

## Porquê dois fetchers em vez de um só

Pensei nas duas opções que puseste — um `apiFetch` só, com uma flag
`client`/`server`, ou dois separados — e fiquei com os dois separados.
Motivo: no App Router, código de servidor (`next/headers`, cookies,
`server-only`) **não pode** ser importado num Client Component, nem
por acidente. Um único fetch com `if (isServer)` lá dentro obriga a
`import()` dinâmico para não rebentar o bundle do client (era o que o
teu `api-fetch.server.ts` original já fazia à força) — é uma
gambiarra a mais para manter. Com dois ficheiros, cada um vive na
pasta certa (`client/` ou `server/`), o pacote `server-only` denuncia
em build-time qualquer import errado, e fica óbvio ao ler o import de
onde é que aquele fetch está a correr.

## Estrutura

```
lib/api/
  types.ts              tipos do envelope (ApiEnvelope, ErrorResponse, paginação...)
  api-error.ts           ApiRequestError (erro de negócio) e ApiNetworkError (erro de transporte)
  parse-response.ts       único lugar que interpreta o envelope — usado pelos dois fetchers
  index.ts                 barrel só de tipos/erros (seguro em client e server)

  client/
    api-fetch.ts           apiFetch() — para Client Components / hooks
    index.ts

  server/
    api-fetch.ts           apiFetchServer() — para Server Components / Actions
    proxy-fetch.ts          proxyFetch() — para usar dentro de Route Handlers (o "BFF" em si)
    session.ts               getServerSession() — lê a sessão do Better Auth no Nest
    require-session.ts       requireSession() — guard de rota
    index.ts
```

## Os três caminhos possíveis

```
Client Component
    │  apiFetch(url)                    credentials:"include" + Authorization: Bearer (fallback)
    ▼
/api/[...]/route.ts  (Route Handler no Next — o teu BFF)
    │  proxyFetch(req, path)            repassa cookie + Authorization recebidos
    ▼
NestJS (Better Auth)


Server Component / Server Action
    │  apiFetchServer(url)              lê o cookie via next/headers e repassa-o manualmente
    ▼
NestJS (Better Auth)                    (direto, sem passar pelas tuas rotas /api)
```

`apiFetch` (client) nunca fala com o NestJS diretamente — fala com as
tuas próprias rotas `/api/*`, que é quem faz de BFF via `proxyFetch`.
`apiFetchServer` (server) fala direto com o NestJS, porque um Server
Component já corre no teu servidor Next, não precisa de saltar por
uma rota própria.

## O cookie do Better Auth e o Bearer de reserva

Como pediste: o cookie que o Better Auth cria é para o domínio onde a
sessão foi estabelecida. Enquanto o client só fala com o teu próprio
`/api/*` (same-origin), o cookie viaja sozinho — não precisas de nada
extra. O risco é se algum dia esse mesmo `apiFetch` tiver de bater
direto num domínio diferente (Nest exposto separadamente, app mobile
via webview, etc.) — aí o cookie pode simplesmente não seguir viagem.

Por isso o `apiFetch` do client já vem com uma rede de segurança: antes
de disparar o pedido, pergunta ao client do Better Auth
(`authClient.getSession()`) se há um `session.token`, e se houver,
manda também um `Authorization: Bearer <token>`. O `proxyFetch` do
lado do Route Handler repassa os dois — cookie e Authorization — para
o Nest, e o Nest aceita o que sobreviver.

**Precisas de ligar isto ao teu client real do Better Auth**: em
`client/api-fetch.ts` há um import de `@/lib/auth-client` — ajusta o
caminho para onde exportas o teu `authClient`
(`createAuthClient({...})`). Se ainda não tens o `token` a vir na
sessão, confirma que o plugin/opção do Better Auth que expõe o token
de sessão está ativo do lado do Nest.

## O envelope — porque é o centro de tudo

Toda resposta do Nest chega neste formato:

```ts
// sucesso
{ success: true, data: T, ts: string }

// erro
{ success: false, data: { code, message, fields }, path, ts }
```

`parse-response.ts` é o único ponto que lê esse envelope. Ele decide,
a partir da resposta HTTP:

- **`response.ok === false`** → é um erro de negócio, o envelope de
  erro veio completo → lança `ApiRequestError`, com `.code`,
  `.fields`, `.path`, `.ts` e helpers (`isUnauthorizedError()`,
  `isValidationError()`, `isNotFoundError()`, `isServerError()`).
- **JSON inválido/ausente** → nem chegou a haver um envelope para ler
  (rede caiu, API offline) → lança `ApiNetworkError` (`code: 503`).
- **`response.ok === true`** → devolve o envelope tal como veio,
  tipado como `T`.

Os dois fetchers (`apiFetch` e `apiFetchServer`) só tratam de *como*
chegar à API (cookies, Bearer, BFF ou direto); a leitura do envelope é
sempre a mesma função, então nunca há um dos dois a interpretar um
erro de forma diferente do outro.

```ts
try {
  const res = await apiFetch<ApiEnvelope<Filme[]>>("filmes");
} catch (err) {
  if (err instanceof ApiRequestError) {
    if (err.isUnauthorizedError()) { /* ... */ }
    // err.fields -> erros de validação por campo
  } else if (err instanceof ApiNetworkError) {
    // API offline, sem rede, etc.
  }
}
```

## Uso

```ts
// Client Component
import { apiFetch } from "@/lib/api/client";
const filmes = await apiFetch<ApiEnvelope<Filme[]>>("filmes");

// Server Component / Action
import { apiFetchServer } from "@/lib/api/server";
const filmes = await apiFetchServer<ApiEnvelope<Filme[]>>("filmes");

// Route Handler (app/api/filmes/route.ts) — o teu BFF
import { proxyFetch } from "@/lib/api/server";
export async function GET(req: NextRequest) {
  const res = await proxyFetch(req, "filmes");
  return new Response(res.body, { status: res.status });
}

// Guard de página
import { requireSession } from "@/lib/api/server";
const session = await requireSession("/dashboard");
```

## O que mudou em relação aos ficheiros que mandaste

- `backend-fetch.ts` → renomeado para `server/proxy-fetch.ts` (é o que
  ele é: o lado do proxy dentro do Route Handler). Tirei os
  `console.log` de debug.
- `api-fetch.server.ts` → `server/api-fetch.ts`. Tirei o `try/catch`
  em torno do `import("next/headers")` — com `import "server-only"`
  no topo, um import errado já rebenta em build, não precisa da rede
  extra.
- `get-session.server.ts` → `server/session.ts`, mesma lógica.
- `require-session.ts` → `server/require-session.ts`, agora devolve o
  tipo `AuthSession` (não `AuthSession | null`) porque depois do
  `redirect()` a sessão nunca é nula — só limpei o tipo, o
  `console.log("session", ...)` também saiu.
- **Reparei numa inconsistência**: `api-fetch.server.ts` usava
  `BACKEND_URL || "http://localhost:3001"` e `backend-fetch.ts` usava
  `BACKEND_URL || "http://localhost:5000/v1"` — dois defaults
  diferentes para a mesma env var. Uniformizei para `:3001` nos dois
  novos ficheiros; ajusta se o valor certo for outro.
- A leitura do envelope e a construção dos erros (que antes estavam
  repetidas em `api-fetch.ts` e `api-fetch.server.ts`) ficaram só em
  `parse-response.ts`.
