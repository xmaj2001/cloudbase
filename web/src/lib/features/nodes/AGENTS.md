# Arquitetura da Feature `nodes`

Este ficheiro documenta a estrutura, responsabilidades e contratos de cada ficheiro da feature `nodes` e do seu BFF.

---

## Visão Geral do Fluxo

```
Browser / React Component
      │
      │  import { useNodeChildren, useNodeMutations } from "@/features/nodes"
      ▼
[feature layer]  src/features/nodes/
   hooks/use-nodes.ts  →  TanStack Query (useQuery / useMutation)
   node.service.ts     →  apiFetch → chama /api/nodes/*
      │
      │  fetch("/api/nodes/...")   ← cookie de sessão enviado automaticamente
      ▼
[BFF layer]  src/app/api/nodes/
   route.ts                  →  GET (listagem) / POST (criar)
   [id]/route.ts             →  GET (detalhe) / DELETE (eliminação permanente)
   [id]/trash/route.ts       →  PATCH (mover para reciclagem)
   [id]/restore/route.ts     →  PATCH (restaurar da reciclagem)
   [id]/rename/route.ts      →  PATCH (renomear)
   [id]/move/route.ts        →  PATCH (mover para outra pasta)
      │
      │  backendFetch(req, "nodes/...")  ← repassa cookie do utilizador
      ▼
[NestJS Backend]  cbb/src/modules/nodes/
   node.controller.ts  →  POST / GET / GET :id / DELETE :id/trash
   node.service.ts     →  lógica de negócio + Prisma (transações atómicas)
```

---

## Conceitos Chave do Domínio

### NodeType
- `FOLDER` — pasta/diretório. Não tem `size`, `mimeType` nem `chunks`.
- `FILE` — ficheiro. Pode ser **simples** (`isFragmented: false`) ou **fragmentado** (`isFragmented: true`).

### Ficheiro Fragmentado (Chunked)
Ficheiros grandes são divididos em partes (`FileChunk`) armazenadas em diferentes providers.
Cada chunk tem o seu `chunkIndex`, `startByte`, `endByte` e `providerId` próprios.
Os chunks só aparecem no **detalhe** de um node (`GET /api/nodes/:id`), nunca na listagem.

### Soft Delete (Reciclagem)
`moveToTrash` define `trashedAt` no node — não elimina o registo.
A listagem (`GET /api/nodes`) filtra automaticamente nodes com `trashedAt != null`.
`restore` limpa `trashedAt` e o node volta a aparecer na listagem.

---

## Feature Layer — `src/features/nodes/`

### `types.ts`

| Tipo | Descrição |
|------|-----------|
| `NodeType` | `"FILE"` \| `"FOLDER"` |
| `ApiNode` | Node como vem na **listagem** — inclui `_count` (children + chunks), sem chunks expandidos |
| `ApiNodeDetail` | Node com detalhe completo — inclui `fileChunks[]` e `Provider` |
| `ApiFileChunk` | Um fragmento de um ficheiro fragmentado, com `Provider` associado |
| `NodeProviderRef` | Referência resumida ao provider `{ id, displayName, type }` |
| `CreateNodeInput` | Payload para criar um node (FILE ou FOLDER, com ou sem chunks) |
| `CreateFileChunkInput` | Dados de um chunk para inclusão no payload de criação |

> **Nota:** `size`, `startByte`, `endByte` são `string` (BigInt serializado pelo Prisma).

---

### `cache.keys.ts`

```ts
NODE_QUERY_KEYS.all                    // ["nodes"]
NODE_QUERY_KEYS.lists()                // ["nodes", "list"]
NODE_QUERY_KEYS.children(parentId)     // ["nodes", "list", "root"] ou ["nodes", "list", "<uuid>"]
NODE_QUERY_KEYS.detail(id)             // ["nodes", "detail", "<uuid>"]
```

> Cada diretório tem a sua **própria entrada de cache** via `children(parentId)`.
> Isto permite navegar para trás sem re-fetch — o cache do nível anterior permanece válido.

---

### `schema.ts`

| Export | Descrição |
|--------|-----------|
| `createNodeSchema` | Schema Zod para criação de node (FILE ou FOLDER) |
| `fileChunkSchema` | Schema Zod para cada chunk de um ficheiro fragmentado |
| `CreateNodeFormValues` | Tipo inferido de `createNodeSchema` |
| `FileChunkFormValues` | Tipo inferido de `fileChunkSchema` |

---

### `node.service.ts`

| Método | BFF | NestJS | Descrição |
|--------|-----|--------|-----------|
| `listChildren(parentId?)` | `GET /api/nodes?parentId=...` | `GET /v1/nodes` | Lista o diretório |
| `getNode(id)` | `GET /api/nodes/:id` | `GET /v1/nodes/:id` | Detalhes com chunks |
| `createNode(body)` | `POST /api/nodes` | `POST /v1/nodes` | Cria FILE ou FOLDER |
| `moveToTrash(id)` | `PATCH /api/nodes/:id/trash` | `DELETE /v1/nodes/:id/trash` | Soft delete |
| `restore(id)` | `PATCH /api/nodes/:id/restore` | *(planeado)* | Restaurar da reciclagem |
| `rename(id, name)` | `PATCH /api/nodes/:id/rename` | *(planeado)* | Renomear |
| `move(id, parentId)` | `PATCH /api/nodes/:id/move` | *(planeado)* | Mover para outra pasta |
| `deleteForever(id)` | `DELETE /api/nodes/:id` | *(planeado)* | Eliminação permanente |

---

### `hooks/use-nodes.ts`

| Hook / Mutation | Tipo | Descrição |
|----------------|------|-----------|
| `useNodeChildren(parentId)` | Query | Lista do diretório (`null` = raiz) |
| `useNode(id)` | Query | Detalhe com chunks e provider |
| `useNodeMutations()` | Mutations | Objeto com `{ create, trash, restore, rename, move, deleteForever }` |

**Estratégia de invalidação cirúrgica:**
- `create` → invalida `children(newNode.parentId)`
- `trash` → invalida `children(parentId)` + remove `detail(id)` da cache
- `restore` → invalida `children(parentId)`
- `rename` → invalida `children(parentId)` + atualiza `detail(id)` via `setQueryData`
- `move` → invalida `children(parentId)` (destino)
- `deleteForever` → invalida `children(parentId)` + remove `detail(id)`

---

### `index.ts`

Barrel export — ponto único de entrada:
```ts
import { useNodeChildren, nodeService, ApiNode, NODE_QUERY_KEYS } from "@/features/nodes";
```

---

## BFF Layer — `src/app/api/nodes/`

| Ficheiro | Método | URL BFF | Encaminha para NestJS |
|----------|--------|---------|-----------------------|
| `route.ts` | `GET` | `/api/nodes?parentId=` | `GET /nodes` |
| `route.ts` | `POST` | `/api/nodes` | `POST /nodes` |
| `[id]/route.ts` | `GET` | `/api/nodes/:id` | `GET /nodes/:id` |
| `[id]/route.ts` | `DELETE` | `/api/nodes/:id` | `DELETE /nodes/:id` |
| `[id]/trash/route.ts` | `PATCH` | `/api/nodes/:id/trash` | `DELETE /nodes/:id/trash` |
| `[id]/restore/route.ts` | `PATCH` | `/api/nodes/:id/restore` | `PATCH /nodes/:id/restore` |
| `[id]/rename/route.ts` | `PATCH` | `/api/nodes/:id/rename` | `PATCH /nodes/:id/rename` |
| `[id]/move/route.ts` | `PATCH` | `/api/nodes/:id/move` | `PATCH /nodes/:id/move` |

---

## Backend NestJS — `cbb/src/modules/nodes/`

| Ficheiro | Responsabilidade |
|----------|-----------------|
| `node.controller.ts` | Endpoints: `POST /`, `GET /`, `GET /:id`, `DELETE /:id/trash` |
| `node.service.ts` | Lógica: criação em transação, listagem, detalhe com chunks, soft delete |
| `node.inputs.ts` | DTOs: `CreateNodeDto`, `CreateFileChunkDto`, `CreateNodeWithChunksDto` |

### Envelope de resposta
```json
{ "success": true, "data": { ... }, "ts": "..." }
```

---

## Regras e Convenções

1. **`parentId = null` é a raiz** — nunca enviar string vazia, sempre `null` ou omitir.
2. **Chunks só no detalhe** — `ApiNode` (listagem) não tem `fileChunks`. Só `ApiNodeDetail` (GET /:id) os inclui.
3. **BigInt como string** — `size`, `startByte`, `endByte` vêm como `string` do Prisma. Converter com `Number()` ou `BigInt()` conforme necessário na UI.
4. **Invalidação cirúrgica** — usar `children(parentId)` para invalidar só o diretório afetado, não a cache inteira.
5. **Soft delete first** — usar `moveToTrash` antes de `deleteForever`. O `deleteForever` é destrutivo e irreversível.
