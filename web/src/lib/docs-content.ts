import {
  Cloud,
  Puzzle,
  Film,
  Bot,
  Share2,
  Timer,
  ArrowLeftRight,
  Users,
  Code2,
  MonitorSmartphone,
  Wifi,
  MessageCircle,
  Sparkles,
  Globe2,
  FolderCog,
  CreditCard,
  Telescope,
  type LucideIcon,
} from "lucide-react";

export interface DocSection {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  markdown: string;
}

export const docSections: DocSection[] = [
  {
    id: "armazenamento-unificado",
    title: "Armazenamento Unificado",
    icon: Cloud,
    description: "Conecta múltiplos providers num único disco virtual.",
    markdown: `# ☁️ Armazenamento Unificado

O CloudBase conecta-se a múltiplos providers de armazenamento e apresenta todo o espaço disponível como se fosse um único disco.

## Providers suportados

| Provider | Espaço gratuito | URL pública directa | Notas |
|---|---|---|---|
| Google Drive | 15 GB por conta | Não | Múltiplas contas suportadas |
| OneDrive | 5 GB por conta | Não | Múltiplas contas suportadas |
| Telegram | Ilimitado | Não | Ideal para ficheiros grandes |
| Cloudinary | 25 GB | Sim | Ideal para imagens e vídeo |
| MEGA | 20 GB | Não | Encriptação end-to-end |
| Supabase Storage | 1 GB por projecto | Sim | Múltiplos projectos suportados |
| Firebase Storage | 5 GB por projecto | Sim | Múltiplos projectos suportados |
| ImageKit | 20 GB | Sim | Optimizado para imagens |
| Backblaze B2 | 10 GB | Sim (via Cloudflare CDN) | Bandwidth gratuito |
| Dropbox | 2 GB | Não | |
| Box | 10 GB | Não | |
| pCloud | 10 GB | Não | |
| Yandex Disk | 10 GB | Não | |
| VPS própria | Configurável | Sim | Via CloudBase Agent |
| Máquina local | Espaço do disco | Sim (na rede local) | Via CloudBase Agent |

**Com múltiplas contas por provider, o espaço total disponível pode facilmente ultrapassar os 200 GB — completamente gratuito.**

## Como o espaço é gerido internamente

Quando um ficheiro entra na plataforma, o CloudBase:

1. Analisa o tipo, tamanho, e extensão do ficheiro
2. Verifica as regras de automação definidas pelo utilizador
3. Consulta o espaço disponível em tempo real em cada provider
4. Escolhe o destino óptimo com base em todos estes critérios
5. Faz o upload directamente do browser para o provider — o servidor do CloudBase nunca toca nos dados
6. Regista o ficheiro na base de dados com todos os metadados necessários

O utilizador vê sempre um único explorador de ficheiros, independentemente de onde cada ficheiro está guardado.`,
  },
  {
    id: "fragmentacao",
    title: "Fragmentação e Distribuição",
    icon: Puzzle,
    description: "Divide ficheiros grandes por vários providers automaticamente.",
    markdown: `# 🧩 Fragmentação e Distribuição Inteligente

Quando nenhum provider tem espaço suficiente para um ficheiro individualmente, o CloudBase tem dois mecanismos: **distribuição** e **fragmentação**.

## Distribuição

Quando existem múltiplos ficheiros e cada um cabe num provider diferente:

\`\`\`
2 ficheiros de 6 GB + 3 providers de 10 GB cada

Ficheiro A (6 GB) → Provider 1
Ficheiro B (6 GB) → Provider 2
Sem fragmentação necessária.
\`\`\`

## Fragmentação

Quando um ficheiro único é maior do que qualquer provider disponível, mas a soma do espaço de todos é suficiente:

\`\`\`
1 ficheiro de 25 GB + 3 providers de 10 GB cada

Fragmento 0 (10 GB) → Provider 1  [CloudBase/_fragments/]
Fragmento 1 (10 GB) → Provider 2  [CloudBase/_fragments/]
Fragmento 2 ( 5 GB) → Provider 3  [CloudBase/_fragments/]

Para o utilizador: um único ficheiro de 25 GB.
\`\`\`

## Como a integridade é garantida

Cada fragmento recebe uma assinatura criptográfica individual (SHA-256 — *algoritmo que gera uma impressão digital única de cada bloco de dados*). No download:

1. Os fragmentos são descarregados em paralelo directamente no browser
2. A assinatura de cada fragmento é verificada
3. Os fragmentos são reunidos localmente
4. A assinatura do ficheiro completo é verificada contra o original
5. Só após verificação bem sucedida o download é disponibilizado

## A pasta protegida

Em cada provider conectado, o CloudBase cria automaticamente:

\`\`\`
CloudBase/
├── _fragments/     ← PASTA PROTEGIDA — não eliminar
└── [pastas do utilizador]
\`\`\`

## Limites por tipo de ficheiro

| Tipo | Fragmentação | Condição |
|---|---|---|
| Imagem | Nunca | Imagens devem ser sempre URLs directas |
| Vídeo / Áudio | Via HLS | Quando HLS está activado |
| Documento / PDF | Opcional | Desactivado por padrão |
| ZIP / ISO | Opcional | Utilizador confirma explicitamente |
| Qualquer (modo pessoal) | Sim, quando necessário | Mínimo recomendado: 100 MB |`,
  },
  {
    id: "hls-streaming",
    title: "HLS Streaming",
    icon: Film,
    description: "Vídeo e áudio com streaming progressivo como Netflix.",
    markdown: `# 🎬 HLS Streaming para Vídeo e Áudio

*HLS (HTTP Live Streaming) é a tecnologia usada pelo Netflix e YouTube para entregar vídeo de forma progressiva — o utilizador começa a ver imediatamente, sem esperar que o ficheiro completo carregue.*

## Como o CloudBase implementa HLS

Quando um vídeo ou áudio é enviado com HLS activado:

1. O CloudBase divide o ficheiro em segmentos de N segundos (padrão: 10s)
2. Cada segmento é enviado para o provider com mais espaço disponível
3. Se os segmentos não cabem num único provider, são distribuídos automaticamente
4. É gerado um ficheiro de índice \`.m3u8\` (*playlist que lista a URL de cada segmento*)
5. O utilizador começa a ver após receber apenas os primeiros segundos

**HLS é opcional. Por padrão está desactivado. O developer activa explicitamente.**

## Vantagem vs usar Cloudinary directamente

Ao usar Cloudinary directamente, HLS tem custos de processamento. No CloudBase, a segmentação é feita antes do upload — os segmentos chegam ao provider já prontos, sem custo adicional.`,
  },
  {
    id: "motor-automacao",
    title: "Motor de Automação",
    icon: Bot,
    description: "Regras de organização por YAML, builder visual, ou IA.",
    markdown: `# 🤖 Motor de Automação

## Três formas de criar regras

**1. Builder visual** — arrastar e largar condições, sem código.

**2. YAML manual:**

\`\`\`yaml
routing:
  - name: "Faturas para Google Drive"
    priority: 1
    conditions:
      match: ALL
      rules:
        - field: extension
          operator: in
          value: [pdf, xlsx]
        - field: name
          operator: contains
          value: fatura
    destination:
      driver: google_drive_pessoal
      folder: /Finanças/Faturas
    actions:
      notify: true
      tag: financeiro
\`\`\`

**3. Linguagem natural com IA** — descreves o que queres, a IA gera a regra.

## Modos de operação

- **Manual** — organiza quando o utilizador quiser
- **Automático** — cada ficheiro organizado no momento de entrada
- **Agendado** — num horário definido
- **Híbrido** — automático com relatório semanal`,
  },
  {
    id: "sistema-partilha",
    title: "Sistema de Partilha",
    icon: Share2,
    description: "Partilha protegida, pública, e temporária.",
    markdown: `# 🔗 Sistema de Partilha

## Partilha protegida com código

\`\`\`
Link:    cloudbase.app/s/xK9mZ2aB
Código:  CB-7X9K2M
QR Code: gerado automaticamente

→ Destinatário acede ao link, insere o código, faz download
→ Link e código invalidados automaticamente após o download
\`\`\`

## Partilha pública directa

\`\`\`
Expiração: 24h / 7 dias / 30 dias / permanente
Limite de downloads: N vezes ou ilimitado
Protecção por senha opcional
Partilha directa via WhatsApp com um clique
\`\`\`

## Transferência temporária

\`\`\`
→ Destinatário faz download
→ Ficheiro eliminado automaticamente
→ Espaço libertado imediatamente
→ Confirmação de entrega notificada ao remetente
\`\`\``,
  },
  {
    id: "dead-mans-switch",
    title: "Dead Man's Switch",
    icon: Timer,
    description: "Partilha automática agendada com confirmação progressiva.",
    markdown: `# ⏰ Partilha Agendada — Dead Man's Switch

*Dead Man's Switch: mecanismo que executa uma acção automaticamente se o utilizador deixar de responder durante um período de tempo.*

O sistema usa divisão progressiva do tempo restante para verificar se o utilizador ainda quer prosseguir:

\`\`\`
Data definida: 365 dias

Notificação 1:  faltam 365 dias  →  confirmas?
Notificação 2:  faltam 182 dias  →  confirmas?
...
Notificação 8:  faltam   2 dias  →  ÚLTIMA CONFIRMAÇÃO

Sem resposta em 48h  →  partilha executada automaticamente
\`\`\`

Destinos: email, WhatsApp, utilizadores CloudBase, espaço público.`,
  },
  {
    id: "troca-ficheiros",
    title: "Troca de Ficheiros",
    icon: ArrowLeftRight,
    description: "Troca segura entre utilizadores com verificação e reputação.",
    markdown: `# 🔄 Troca de Ficheiros

Antes de aceitar uma troca, ambos os utilizadores vêem:

- Nome, tamanho, e conteúdo do ficheiro
- Assinatura SHA-256 verificada
- Resultado do scan de segurança
- Perfil de reputação do outro utilizador

O histórico de reputação é público e afecta a confiança que outros depositam em cada perfil.`,
  },
  {
    id: "space-pools",
    title: "Space Pools",
    icon: Users,
    description: "Espaço partilhado colectivamente por grupos de utilizadores.",
    markdown: `# 👥 Space Pools — Espaço Partilhado

O Space Pool permite que um grupo de utilizadores una o seu espaço e o use colectivamente.

## Regras configuradas pelo administrador

\`\`\`
Espaço contribuído por membro:   cada membro decide quanto contribui
Quota de uso por membro:         % máxima do pool que cada membro pode usar
Regra de fragmentação cruzada:
  LOCKED  →  membro não pode sair se tiver fragmentos de outros
  FREE    →  membro pode sair, com aviso de dados potencialmente perdidos
\`\`\`

## Sistema de reputação

Se um membro sair causando perda de dados:

\`\`\`
→ Outros membros avaliam o comportamento
→ Avaliações negativas ficam no histórico público
→ Utilizadores com histórico negativo têm dificuldade
   em ser aceites em novos grupos
\`\`\``,
  },
  {
    id: "cloudbase-developers",
    title: "CloudBase para Developers",
    icon: Code2,
    description: "SDK npm, API REST, routing inteligente, e HLS.",
    markdown: `# 🛠️ CloudBase para Developers

## Instalação

\`\`\`bash
npm install @cloudbase/sdk
\`\`\`

## Configuração

\`\`\`typescript
import { CloudBase } from '@cloudbase/sdk'

const cb = new CloudBase({
  apiKey: 'cb_live_xxx',
  routing: {
    images:    { primary: 'imagekit',   fallback: 'cloudinary' },
    videos:    { primary: 'cloudinary', fallback: 'firebase'   },
    documents: { primary: 'supabase',   fallback: 'backblaze'  },
    generic:   { primary: 'backblaze',  fallback: 'firebase'   },
  },
  hls: {
    enabled:         false,
    segmentDuration: 10,
    minFileSizeMB:   5,
  },
})
\`\`\`

## Operações principais

\`\`\`typescript
// Upload
const file = await cb.upload(myFile, { folder: 'produtos/imagens' })
// → { id, url, provider, size, createdAt }

// Upload de vídeo com HLS
const video = await cb.upload(videoFile, { type: 'video', hls: true })
// → { id, type: "hls", playlistUrl: "...playlist.m3u8" }

// URL temporária
const tempUrl = await cb.getSignedUrl(file.id, { expiresIn: '2h' })

// Eliminar / Renomear / Listar / Mover
await cb.delete(file.id)
await cb.rename(file.id, 'novo-nome.jpg')
const files = await cb.list({ folder: 'produtos' })
await cb.move(file.id, { toProvider: 'supabase' })

// Converter para HLS (ficheiro já existente)
const job = await cb.convertToHls(file.id)
\`\`\`

## API REST (qualquer linguagem)

\`\`\`bash
POST   https://api.cloudbase.app/v1/storage/upload
GET    https://api.cloudbase.app/v1/storage/{fileId}/url
POST   https://api.cloudbase.app/v1/storage/{fileId}/signed-url
DELETE https://api.cloudbase.app/v1/storage/{fileId}
GET    https://api.cloudbase.app/v1/storage?folder=produtos
\`\`\`

## Routing inteligente

| Factor | Descrição |
|---|---|
| Tipo de ficheiro | Imagens para providers com URL pública; vídeos para providers com CDN |
| Espaço disponível | Verificado antes de cada upload |
| Bandwidth restante | Evita providers próximos do limite mensal |
| Prioridade configurada | O developer define a ordem de preferência |

## Regras por tipo no SDK Dev

| Tipo | Comportamento |
|---|---|
| Imagem | Distribuição apenas — nunca fragmentada |
| Vídeo / Áudio | HLS se activado; directo se desactivado |
| Documento / PDF | Sem fragmentação por padrão |
| ZIP / Arquivo | Fragmentação opcional com aviso explícito |`,
  },
  {
    id: "space-pools-developers",
    title: "Space Pools para Developers",
    icon: Users,
    description: "Pools temporários com duração definida para projectos.",
    markdown: `# 👥 Space Pools para Developers

A mesma funcionalidade do Space Pool está disponível no modo developer, com duração definida:

\`\`\`
Developer cria pool para um projecto:
  Duração:     3 meses
  Membros:     equipa de desenvolvimento
  Contribuição: cada membro contribui com espaço próprio

Após 3 meses:
  → Pool encerrado automaticamente
  → Todos os ficheiros removidos
  → Espaço de cada membro libertado
  → Notificação prévia para backup
\`\`\``,
  },
  {
    id: "rede-dispositivos",
    title: "Rede de Dispositivos",
    icon: MonitorSmartphone,
    description: "VPS, PC, e telemóvel como nós da mesma rede via Agent.",
    markdown: `# 🖥️ Rede de Dispositivos — CloudBase Agent

## Instalação

\`\`\`bash
curl -sSL https://cloudbase.app/agent/install.sh | bash
cloudbase-agent connect --token SEU_TOKEN
\`\`\`

Suportado em: VPS, PC/Mac/Linux, servidores dedicados.

## Redirecionamento de transferências

\`\`\`
Estás no PC do escritório.
Recebes um ficheiro de 20 GB.

→ Seleccionas "Receber no PC em casa"
→ O Agent recebe o ficheiro directamente
→ O servidor CloudBase nunca tocou nos dados
\`\`\``,
  },
  {
    id: "wifi-bluetooth",
    title: "Transferência WiFi e Bluetooth",
    icon: Wifi,
    description: "Transferência local directa entre dispositivos na mesma rede.",
    markdown: `# 📡 Transferência Local WiFi e Bluetooth

Dispositivos na mesma rede detectam-se via mDNS (*protocolo de descoberta local, o mesmo do AirDrop*). Transferência directa até 100 MB/s via WiFi. Bluetooth suportado para ficheiros até 50 MB.

O ficheiro recebido pode ser guardado directamente em qualquer driver ou dispositivo conectado ao CloudBase.`,
  },
  {
    id: "whatsapp",
    title: "Controlo via WhatsApp",
    icon: MessageCircle,
    description: "Bot que percebe linguagem natural para todas as operações.",
    markdown: `# 💬 Controlo via WhatsApp

\`\`\`
[envia ficheiro]          →  guardado automaticamente, link devolvido
"partilhar relatorio.pdf" →  link + código gerados
"buscar contrato do João" →  ficheiro encontrado por IA
"espaço usado"            →  relatório por provider
"organizar"               →  automação executada
"trocar backup.zip"       →  proposta de troca criada
\`\`\``,
  },
  {
    id: "inteligencia-artificial",
    title: "Inteligência Artificial",
    icon: Sparkles,
    description: "Pesquisa semântica, classificação, duplicados, e resumos.",
    markdown: `# 🧠 Inteligência Artificial

- **Pesquisa semântica** — encontra ficheiros por descrição sem o nome exacto
- **Classificação automática** — aprende com as correcções do utilizador
- **Detecção de duplicados** — mesmo com nomes diferentes
- **Resumo de documentos** — PDFs resumidos directamente na interface
- **Criação de regras por linguagem natural** — descreves, a IA gera`,
  },
  {
    id: "espaco-publico",
    title: "Espaço Público",
    icon: Globe2,
    description: "Área de downloads públicos com scan de segurança.",
    markdown: `# 🌐 Espaço Público

Área onde utilizadores disponibilizam ficheiros para acesso público. Cada ficheiro passa por scan de segurança. O publisher controla número de downloads e data de expiração. Se o publisher eliminar a conta, o ficheiro sai do espaço público automaticamente.`,
  },
  {
    id: "gestao-avancada",
    title: "Gestão Avançada",
    icon: FolderCog,
    description: "Lixeira, validade, Collections, e sincronização.",
    markdown: `# 📁 Gestão Avançada

**Lixeira** — 30 dias de retenção (configurável), restauração com um clique.

**Validade de ficheiros** — define data de expiração, sistema notifica antes, expiração move para lixeira.

**Collections** — agrupa ficheiros de diferentes providers sem os mover, como uma playlist.

**Sincronização** — detecta alterações feitas directamente nos providers e notifica discrepâncias.`,
  },
  {
    id: "planos-monetizacao",
    title: "Planos e Monetização",
    icon: CreditCard,
    description: "Planos Gratuito, Pro, e Developer com funcionalidades detalhadas.",
    markdown: `# 💰 Monetização e Planos

## Plano Gratuito
- Até 3 providers conectados
- Automação com regras padrão
- Partilha com expiração de 24h
- 1 Space Pool com até 2 membros
- Bot WhatsApp básico

## Plano Pro
- Providers ilimitados
- Regras de automação personalizadas e por IA
- Partilha permanente com código e QR Code
- Space Pools ilimitados
- Dead Man's Switch
- CloudBase Agent
- Transferência WiFi e Bluetooth
- IA completa

## Plano Developer
- Tudo do Plano Pro
- API Keys e SDK npm
- HLS Streaming
- Supabase, Firebase, ImageKit, Backblaze B2
- Space Pools com duração definida
- Dashboard de bandwidth e storage
- Webhooks para eventos

## Funcionalidades sempre pagas

| Funcionalidade | Razão |
|---|---|
| CloudBase Agent | Infraestrutura de relay entre dispositivos |
| HLS Streaming | Processamento de segmentação de vídeo |
| Dead Man's Switch | Notificações e agendamento a longo prazo |
| SDK Developer com volume alto | Custo de API e proxy |
| Space Pools acima de 5 membros | Coordenação e moderação |`,
  },
  {
    id: "visao-futura",
    title: "Visão Futura",
    icon: Telescope,
    description: "Marketplace, Identity, Mobile, e IA de conteúdo.",
    markdown: `# 🔭 Visão Futura

**Marketplace de Space** — utilizadores com espaço excedente disponibilizam-no a outros, com o CloudBase a gerir a transacção.

**CloudBase Identity** — sistema de identidade onde os dados do utilizador estão sempre nos seus próprios drives, independentemente das plataformas que usa.

**Integrações de terceiros** — API para plataformas externas usarem o CloudBase como backup automático dos dados dos utilizadores. Se a plataforma encerrar, os dados continuam acessíveis.

**CloudBase Mobile** — aplicação nativa iOS e Android com sincronização automática de fotos e vídeos.

**IA de análise de conteúdo** — transcrição de áudios, OCR em imagens (*extracção de texto de imagens*), indexação completa de PDFs, pesquisa dentro do conteúdo.`,
  },
];
