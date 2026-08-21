# Arquitetura da Feature `providers`

Este ficheiro documenta a estrutura, responsabilidades e contratos de cada ficheiro da feature `providers` e do seu BFF (Backend-For-Frontend).

---

## Visão Geral do Fluxo

```
Browser / React Component
      │
      │  import { useProviders } from "@/features/providers"
      ▼
[feature layer]  src/features/providers/
   hooks/use-providers.ts  →  TanStack Query (useQuery / useMutation)
   provider.service.ts     →  apiFetch → chama /api/providers/*
      │
      │  fetch("/api/providers/...")   ← cookie de sessão enviado automaticamente
      ▼
[BFF layer]  src/app/api/providers/
   route.ts                   →  GET (lista) / POST (cria)
   supported/route.ts         →  GET (tipos suportados)
   [id]/credentials/route.ts  →  GET (credenciais de um provider)
      │
      │  backendFetch(req, "providers/...")  ← repassa cookie do utilizador
      ▼
[NestJS Backend]  cbb/src/modules/providers/
   provider.controller.ts  →  @Get() / @Post() / @Get(":id/credentials")
   provider.service.ts     →  lógica de negócio + Prisma
```

---

## Feature Layer — `src/features/providers/`

### `types.ts`
Contratos TypeScript do domínio providers para o frontend.

| Tipo | Descrição |
|------|-----------|
| `ProviderType` | Union literal de todos os tipos de provider (ex: `"TELEGRAM"`, `"GOOGLE_DRIVE"`) |
| `ProviderCategory` | Categoria do provider: `"CLOUD"` \| `"SOCIAL"` \| `"MEDIA"` \| `"SELF_HOSTED"` |
| `ApiProvider` | Provider como vem na **listagem** — **sem** o campo `credentials` |
| `ApiProviderWithCredentials` | Provider com `credentials` — só usado após `/credentials` |
| `ProviderCredentials` | Union discriminada de todas as credenciais possíveis |
| `GoogleDriveCredentials` | Credenciais para Google Drive e OneDrive (OAuth 2.0) |
| `TelegramCredentials` | `{ botToken, chatId }` |
| `CloudinaryCredentials` | `{ apiKey, apiSecret, cloudName }` |
| `MegaCredentials` | `{ sessionToken, accountEmail }` |
| `VpsCredentials` | `{ agentToken, host?, port? }` |
| `DropboxCredentials` | Credenciais para Dropbox, Box, pCloud, Yandex (OAuth 2.0) |
| `SupportedProvider` | Info de um tipo suportado: `{ type, label, category }` |
| `CreateProviderInput` | Payload para criar um provider: `{ type, displayName, priority?, credentials }` |

> **Nota:** `credentials` **nunca** vêm no tipo `ApiProvider`. Esta separação é intencional e reflecte o comportamento do backend — as credenciais só chegam via `GET /v1/providers/:id/credentials`.

---

### `cache.keys.ts`
Chaves de cache hierárquicas para TanStack Query.

```ts
PROVIDER_QUERY_KEYS.all             // ["providers"]
PROVIDER_QUERY_KEYS.lists()         // ["providers", "list"]
PROVIDER_QUERY_KEYS.supported()     // ["providers", "supported"]
PROVIDER_QUERY_KEYS.detail(id)      // ["providers", "detail", id]
PROVIDER_QUERY_KEYS.credentials(id) // ["providers", "detail", id, "credentials"]
```

---

### `schema.ts`
Validação client-side com **Zod**.

| Export | Descrição |
|--------|-----------|
| `createProviderSchema` | Schema para o formulário de criação de provider |
| `CreateProviderFormValues` | Tipo inferido do schema (`z.infer`) |

---

### `provider.service.ts`
Camada de acesso ao BFF. Todas as chamadas usam `apiFetch` que envia cookies automaticamente.

| Método | BFF | Descrição |
|--------|-----|-----------|
| `getSupportedProviders()` | `GET /api/providers/supported` | Tipos de providers suportados |
| `getProviders()` | `GET /api/providers` | Lista de providers do utilizador (sem credentials) |
| `createProvider(body)` | `POST /api/providers` | Cria/Conecta um novo provider |
| `getCredentials(id)` | `GET /api/providers/:id/credentials` | Credenciais de um provider específico |

---

### `hooks/use-providers.ts`
Hooks React (TanStack Query) para consumo nos componentes.

| Hook | Tipo | Descrição |
|------|------|-----------|
| `useProviders()` | Query | Lista de providers do utilizador |
| `useSupportedProviders()` | Query | Tipos suportados (cache 1h) |
| `useProviderCredentials(id)` | Query | Credenciais on-demand (cache 5min, enabled só com id) |
| `useProviderMutations()` | Mutations | `{ create }` — cria provider e invalida cache |

---

### `index.ts`
Barrel export. Ponto único de entrada para a feature:

```ts
import { useProviders, providerService, ApiProvider } from "@/features/providers";
```

---

## BFF Layer — `src/app/api/providers/`

O BFF (Backend-For-Frontend) é um proxy de autenticação. O seu papel é:
1. Receber requests do browser (com cookie de sessão Better Auth)
2. Repassar o cookie ao NestJS via `backendFetch(req, path)`
3. Devolver a resposta do NestJS ao browser

> O NestJS valida a sessão internamente via `@Session()` — o BFF não precisa de verificar autenticação.

### Rotas BFF

| Ficheiro | Método | URL BFF | Encaminha para NestJS |
|----------|--------|---------|-----------------------|
| `route.ts` | `GET` | `/api/providers` | `GET /providers` |
| `route.ts` | `POST` | `/api/providers` | `POST /providers` |
| `supported/route.ts` | `GET` | `/api/providers/supported` | `GET /providers/supported` |
| `[id]/credentials/route.ts` | `GET` | `/api/providers/:id/credentials` | `GET /providers/:id/credentials` |

> **Ordem de rotas:** `supported` é uma rota estática e fica numa pasta separada para não ser capturada pela rota dinâmica `[id]`. O Next.js resolve rotas estáticas antes de dinâmicas.

---

## Backend NestJS — `cbb/src/modules/providers/`

Referência para o contrato da API (não modificar aqui, apenas leitura):

| Ficheiro | Responsabilidade |
|----------|-----------------|
| `provider.controller.ts` | Endpoints REST: `GET /supported`, `POST /`, `GET /`, `GET /:id/credentials` |
| `provider.service.ts` | Lógica de negócio: criação, listagem, credenciais, snapshots |
| `provider.input.ts` | DTOs de validação (class-validator) e `ProviderSnapshot` |
| `helper/credentials.ts` | Enum `ProviderType`, interfaces de credenciais, type guards, validadores |

### Envelope de resposta do backend

O NestJS envolve todas as respostas num `ApiEnvelope<T>`:

```json
{
  "success": true,
  "data": { ... },
  "ts": "2026-08-21T16:02:55.678Z"
}
```

O tipo `ApiEnvelope<T>` está definido em:
- `src/api/core/api.types.ts` (usado no BFF e feature layer da pasta `api/`)
- `src/features/core/api.types.ts` (usado na feature layer da pasta `features/`)

---

## Regras e Convenções

1. **Credentials nunca na listagem** — `ApiProvider` não tem `credentials`. Só `useProviderCredentials(id)` as busca.
2. **Nunca chamar o NestJS directamente do browser** — Sempre passar pelo BFF (`/api/providers/*`).
3. **Cache keys centralizadas** — Usar sempre `PROVIDER_QUERY_KEYS.*` para queries e invalidações.
4. **Invalidação em cascata** — `invalidateProviderCache()` usa `PROVIDER_QUERY_KEYS.all` para apanhar lista + detalhes.
5. **`apiFetch` vs `backendFetch`** — `apiFetch` é usado no feature service (browser→BFF); `backendFetch` é usado nos route handlers do BFF (BFF→NestJS).
