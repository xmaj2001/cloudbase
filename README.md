# CloudBase

> *O que acontece quando pegas todo o espaço de armazenamento que já tens espalhado pelo mundo — Google Drive, Telegram, MEGA, Cloudinary, e dezenas de outros — e os transformas num único sistema inteligente que pensa, organiza, protege, e distribui os teus dados automaticamente?*
>
> *Acontece o CloudBase.*

---

## O que é o CloudBase?

O CloudBase começou como uma ideia simples: unir o espaço de armazenamento que já existe em múltiplas plataformas num único lugar. Mas à medida que foi sendo pensado e construído, tornou-se algo muito maior.

O CloudBase é hoje uma **infraestrutura de dados pessoais e profissionais** — uma plataforma que não apenas armazena ficheiros, mas que os distribui de forma inteligente entre múltiplos serviços, os organiza automaticamente, permite partilhá-los com segurança, trocá-los com outros utilizadores, transmiti-los em streaming, agendá-los para o futuro, e muito mais.

Tem dois públicos distintos com experiências desenhadas especificamente para cada um:

- **Utilizadores** — que querem um espaço unificado, organizado, e fácil de usar, sem se preocupar com onde cada ficheiro está guardado.
- **Developers** — que querem uma API e um SDK simples para integrar armazenamento inteligente nas suas aplicações, sem configurar cada provider separadamente.

Ambos partilham a mesma infraestrutura. A experiência é completamente diferente.

---

## Índice

### Para Utilizadores
- [Armazenamento Unificado](#-armazenamento-unificado)
- [Fragmentação e Distribuição Inteligente](#-fragmentação-e-distribuição-inteligente)
- [Visualização de Ficheiros](#-visualização-de-ficheiros)
- [Sistema de Partilha](#-sistema-de-partilha)
- [Partilha Agendada — Dead Man's Switch](#-partilha-agendada--dead-mans-switch)
- [Troca de Ficheiros](#-troca-de-ficheiros)
- [Space Pools — Espaço Partilhado](#-space-pools--espaço-partilhado)
- [Motor de Automação](#-motor-de-automação)
- [Gestão Avançada](#-gestão-avançada)
- [Espaço Público](#-espaço-público)
- [Controlo via WhatsApp e Telegram](#-controlo-via-whatsapp-e-telegram)

### Aplicação CloudBase
- [CloudBase App — Explorador Universal](#-cloudbase-app--explorador-universal)

### Para Developers
- [CloudBase para Developers](#-cloudbase-para-developers)
- [HLS Streaming](#-hls-streaming)
- [Space Pools para Developers](#-space-pools-para-developers)

### Infraestrutura
- [CloudBase Agent](#-cloudbase-agent)
- [Estrutura de Pastas nos Providers](#-estrutura-de-pastas-nos-providers)
- [Monetização e Planos](#-monetização-e-planos)
- [Visão Futura](#-visão-futura)
- [Contribuir](#-contribuir)

---

# Para Utilizadores

---

## ☁️ Armazenamento Unificado

O CloudBase conecta-se a múltiplos providers de armazenamento e apresenta todo o espaço disponível como se fosse um único disco.

O utilizador não precisa de saber onde cada ficheiro está. O CloudBase sabe.

### Providers suportados

| Provider | Espaço gratuito | Notas |
|---|---|---|
| Google Drive | 15 GB por conta | Múltiplas contas suportadas |
| OneDrive | 5 GB por conta | Múltiplas contas suportadas |
| Telegram | Ilimitado | Ideal para ficheiros grandes |
| MEGA | 20 GB | Encriptação end-to-end |
| Dropbox | 2 GB | |
| Box | 10 GB | |
| pCloud | 10 GB | |
| Yandex Disk | 10 GB | |
| VPS própria | Configurável | Via CloudBase Agent |

**Com múltiplas contas por provider, o espaço total disponível pode facilmente ultrapassar os 200 GB — completamente gratuito.**

### Como o routing funciona

Quando um ficheiro entra na plataforma, o CloudBase:

1. Analisa tipo, tamanho, e extensão
2. Verifica as regras de automação definidas pelo utilizador
3. Consulta o espaço disponível em tempo real em cada provider
4. Escolhe o destino óptimo
5. Faz o upload directamente do browser para o provider — **o servidor do CloudBase nunca toca nos dados**
6. Regista o ficheiro na base de dados com todos os metadados

---

## 🧩 Fragmentação e Distribuição Inteligente

Quando nenhum provider tem espaço suficiente individualmente, o CloudBase tem dois mecanismos: **distribuição** e **fragmentação**.

### Distribuição

Múltiplos ficheiros distribuídos pelos providers disponíveis, cada um indo para onde cabe:

```
2 ficheiros de 6 GB + 3 providers de 10 GB cada

Ficheiro A (6 GB) → Provider 1
Ficheiro B (6 GB) → Provider 2
Sem fragmentação necessária.
```

### Fragmentação

Um ficheiro único maior do que qualquer provider, dividido pelos providers disponíveis:

```
1 ficheiro de 25 GB + 3 providers de 10 GB cada

Fragmento 0 (10 GB) → Provider 1  [CloudBase/_fragments/]
Fragmento 1 (10 GB) → Provider 2  [CloudBase/_fragments/]
Fragmento 2 ( 5 GB) → Provider 3  [CloudBase/_fragments/]

Para o utilizador: um único ficheiro de 25 GB.
```

### Integridade garantida por criptografia

Cada fragmento recebe uma assinatura SHA-256 (*algoritmo que gera uma impressão digital única de cada bloco de dados*). No download:

1. Os fragmentos são descarregados em paralelo directamente no browser
2. A assinatura de cada fragmento é verificada individualmente
3. Os fragmentos são reunidos localmente
4. A assinatura do ficheiro completo é verificada contra o original
5. Só após verificação o download é disponibilizado

Se algum fragmento estiver corrompido ou em falta, o sistema identifica exactamente qual e informa com precisão.

### Regras de fragmentação por tipo de ficheiro

| Tipo | Fragmentação | Notas |
|---|---|---|
| Imagem | Nunca | Imagens têm de ser sempre acedidas como um todo |
| Vídeo / Áudio | Não — reprodução directa | Ver secção de Visualização |
| Documento / PDF | Opcional | Desactivado por padrão — utilizador confirma |
| ZIP / ISO / Arquivo | Opcional | Utilizador confirma explicitamente |
| Qualquer tipo | Sim, quando necessário | Tamanho mínimo recomendado: 100 MB |

---

## 👁️ Visualização de Ficheiros

O CloudBase permite visualizar o conteúdo dos ficheiros directamente na plataforma, sem necessidade de os descarregar.

### O que é possível visualizar

- **Imagens** — visualização directa, zoom, navegação em galeria
- **Vídeos** — reprodução directa no browser, sem download
- **Áudio** — reprodução directa com player integrado
- **PDFs** — leitura completa no browser
- **Documentos** — visualização de texto e formatação
- **Arquivos comprimidos** — listagem do conteúdo interno (ficheiros e pastas dentro de ZIPs, RARs, etc.) sem necessidade de extrair

### Visualização de conteúdo partilhado

Se outro utilizador do CloudBase partilhar uma pasta ou ficheiro contigo, podes:

- Visualizar imagens, vídeos, áudios, e documentos directamente
- Ver o conteúdo interno de arquivos comprimidos
- Tudo isto **sem fazer download** — o conteúdo é apresentado na interface do CloudBase

A visualização de conteúdo de outros utilizadores só é possível quando o utilizador proprietário concede permissão explícita.

---

## 🔗 Sistema de Partilha

### Partilha protegida com código

```
Link:    cloudbase.app/s/xK9mZ2aB
Código:  CB-7X9K2M
QR Code: gerado automaticamente

→ Destinatário acede ao link
→ Insere o código
→ Faz download
→ Link e código invalidados automaticamente
```

### Partilha pública directa

```
Expiração:          24h / 7 dias / 30 dias / permanente
Limite de downloads: N vezes ou ilimitado
Protecção por senha: opcional
Partilha via WhatsApp ou Telegram: com um clique
```

### Transferência temporária

```
→ Destinatário faz download
→ Ficheiro eliminado automaticamente do CloudBase
→ Espaço libertado imediatamente
→ Confirmação de entrega notificada ao remetente
```

---

## ⏰ Partilha Agendada — Dead Man's Switch

*Dead Man's Switch: mecanismo que executa uma acção automaticamente se o utilizador deixar de confirmar durante um período de tempo.*

Permite agendar a partilha de ficheiros para uma data futura. O sistema confirma periodicamente se o utilizador ainda quer prosseguir, usando um algoritmo de divisão progressiva do tempo restante:

```
Data definida: 365 dias no futuro

Confirmação 1:  faltam 365 dias  →  confirmas?
Confirmação 2:  faltam 182 dias  →  confirmas?
Confirmação 3:  faltam  91 dias  →  confirmas?
Confirmação 4:  faltam  45 dias  →  confirmas?
Confirmação 5:  faltam  22 dias  →  confirmas?
Confirmação 6:  faltam  11 dias  →  confirmas?
Confirmação 7:  faltam   5 dias  →  confirmas?
Confirmação 8:  faltam   2 dias  →  ÚLTIMA CONFIRMAÇÃO

Sem resposta em 48h  →  partilha executada automaticamente
```

**Destinos disponíveis:**
- Múltiplos endereços de email
- Números WhatsApp ou Telegram seleccionados
- Utilizadores CloudBase
- Espaço público do CloudBase

---

## 🔄 Troca de Ficheiros

O CloudBase permite trocas de ficheiros directas entre utilizadores, com verificação completa de integridade antes de qualquer transferência.

Antes de aceitar, ambos os utilizadores vêem:

- Nome, tamanho, e tipo do ficheiro
- Conteúdo interno no caso de arquivos comprimidos
- Assinatura SHA-256 verificada independentemente
- Resultado do scan de segurança
- Perfil de reputação do outro utilizador

**Sistema de reputação:** após cada troca, ambos avaliam a experiência. O histórico é público e afecta a confiança que outros depositam em cada perfil.

---

## 👥 Space Pools — Espaço Partilhado

O Space Pool permite que um grupo de utilizadores una o seu espaço disponível e o use colectivamente, com regras definidas pelo administrador.

### Configuração pelo administrador

```
Espaço contribuído:   cada membro define quanto contribui
Quota de uso:         % máxima do pool que cada membro pode ocupar
Fragmentação cruzada:
  LOCKED  →  membro não pode sair enquanto tiver fragmentos de outros nos seus drives
  FREE    →  membro pode sair a qualquer momento, com aviso de possível perda de dados
```

### Entrada no grupo

Cada membro convidado vê as regras completas antes de entrar. A aceitação é explícita e consciente.

### Sistema de reputação do pool

Se um membro sair causando perda de dados de outros:

```
→ Outros membros avaliam o comportamento
→ Avaliações negativas ficam no histórico público do utilizador
→ Utilizadores com histórico negativo têm mais dificuldade
   em ser aceites em novos grupos
```

---

## 🤖 Motor de Automação

> **Nota:** Esta funcionalidade está em avaliação. O sistema de automação abaixo descrito está definido e será implementado, mas pode ser ajustado antes do lançamento.

O motor de automação organiza ficheiros automaticamente com base em regras definidas pelo utilizador.

### Três formas de criar regras

**1. Builder visual** — arrastar e largar condições e acções, sem código.

**2. YAML manual** — para utilizadores técnicos:

```yaml
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

  - name: "Ficheiros grandes para Telegram"
    priority: 2
    conditions:
      match: ANY
      rules:
        - field: size
          operator: gt
          value: 500MB
    destination:
      driver: telegram
```

**3. Linguagem natural com IA** — descreves o que queres em linguagem normal, a IA gera a regra correspondente.

### Modos de operação

- **Manual** — o utilizador organiza quando quiser, com um clique
- **Automático** — cada ficheiro organizado no momento em que entra
- **Agendado** — organização acontece num horário definido
- **Híbrido** — automático com relatório semanal do que foi feito

---

## 📁 Gestão Avançada

### Lixeira com retenção configurável

Ficheiros eliminados vão para a lixeira por 30 dias (configurável) antes de serem apagados permanentemente. O dashboard mostra o espaço que a lixeira está a ocupar em tempo real. Restauração disponível com um clique.

### Validade de ficheiros

Define a data de expiração de qualquer ficheiro. O sistema notifica antes da data e permite renovar. A expiração move o ficheiro para a lixeira — nunca elimina directamente.

### Collections

Agrupa ficheiros de diferentes pastas e providers sob um mesmo nome, sem os mover. Funciona como uma playlist — os ficheiros ficam onde estão, aparecem juntos quando abres a collection. Ideal para projectos, clientes, ou qualquer conjunto de ficheiros relacionados.

### Sincronização com providers

O CloudBase detecta alterações feitas directamente nos providers (ficheiros eliminados, movidos, ou renomeados fora da plataforma) e notifica o utilizador com mensagens claras sobre as discrepâncias encontradas.

---

## 🌐 Espaço Público

Área da plataforma onde utilizadores disponibilizam ficheiros para acesso público, sem necessidade de conta.

Cada ficheiro passa por scan de segurança antes de ficar disponível. O publisher controla:

- Número máximo de downloads (ou ilimitado)
- Data de expiração do link público

Se o publisher eliminar o ficheiro ou cancelar a conta, o ficheiro sai do espaço público automaticamente.

---

## 💬 Controlo via WhatsApp e Telegram

O bot do CloudBase está disponível no WhatsApp e no Telegram, permitindo controlar a plataforma sem abrir o browser. O bot interpreta linguagem natural.

```
[envia ficheiro]            →  guardado automaticamente, link devolvido
"partilhar relatorio.pdf"   →  link + código gerados na hora
"buscar contrato do João"   →  ficheiro encontrado por IA
"espaço usado"              →  relatório detalhado por provider
"organizar"                 →  automação executada imediatamente
"trocar backup.zip"         →  proposta de troca criada
"listar pasta Trabalho"     →  conteúdo da pasta devolvido
```

---

# Aplicação CloudBase

---

## 📱 CloudBase App — Explorador Universal

A aplicação CloudBase pode ser instalada no computador (Windows, macOS, Linux) e no telemóvel (iOS, Android). Não é apenas um cliente da plataforma — é um explorador de ficheiros completo que une o teu dispositivo local com o ecossistema CloudBase.

### O que a aplicação permite fazer

**Exploração de ficheiros locais e remotos**

A aplicação apresenta numa única interface os ficheiros do teu dispositivo e os ficheiros que tens no CloudBase. Podes navegar entre ambos sem distinção.

**Transferência via WiFi (rede local)**

Dispositivos na mesma rede WiFi detectam-se automaticamente via mDNS (*protocolo de descoberta local, o mesmo usado pelo AirDrop da Apple*). A transferência é directa entre dispositivos, sem passar pela internet, com velocidades até 100 MB/s.

**Transferência via Bluetooth**

Suportado para ficheiros até 50 MB. Para ficheiros maiores, a aplicação recomenda automaticamente a transferência via WiFi.

**Redirecionamento de transferências recebidas**

Quando outro utilizador do CloudBase te envia um ficheiro, podes escolher para onde ele vai:

```
Opção A — Sistema automático do CloudBase
  O CloudBase decide o driver e pasta de destino
  com base nas tuas regras de automação

Opção B — Driver específico
  Tu escolhes qual dos teus drivers conectados
  vai receber o ficheiro

Opção C — Dispositivo local
  O ficheiro vai directamente para o teu computador
  ou telemóvel, sem passar pelos drivers cloud
```

**Visualização de ficheiros do CloudBase**

Através da aplicação, podes visualizar imagens, reproduzir vídeos e áudios, ler PDFs, e ver o conteúdo de arquivos comprimidos directamente — sem download, sem abrir o browser.

---

# Para Developers

---

## 🛠️ CloudBase para Developers

O CloudBase oferece um SDK e uma API REST para developers integrarem armazenamento inteligente nas suas aplicações, sem configurar cada provider separadamente.

### Providers disponíveis no modo Developer

Além dos providers do modo utilizador, o modo developer acrescenta providers com **URL pública directa** — essencial para servir imagens, vídeos, e documentos em aplicações web:

| Provider | Espaço gratuito | URL pública directa | Melhor para |
|---|---|---|---|
| Cloudinary | 25 GB | Sim | Imagens e vídeo com transformações |
| Supabase Storage | 1 GB por projecto | Sim | Documentos e ficheiros gerais |
| Firebase Storage | 5 GB por projecto | Sim | Ficheiros estáticos |
| ImageKit | 20 GB | Sim | Imagens com optimização automática |
| Backblaze B2 | 10 GB | Sim (via Cloudflare CDN) | Qualquer ficheiro, bandwidth gratuito |

Múltiplos projectos por provider são suportados — cada projecto adicional aumenta o espaço total disponível.

### Instalação

```bash
npm install @cloudbase/sdk
```

### Configuração

```typescript
import { CloudBase } from '@cloudbase/sdk'

const cb = new CloudBase({
  apiKey: 'cb_live_xxx',

  // Routing automático por tipo de ficheiro
  // O sistema escolhe o provider óptimo com base em:
  //   → espaço disponível em tempo real
  //   → bandwidth restante no período mensal
  //   → tipo de ficheiro e requisitos de URL pública
  routing: {
    images:    { primary: 'imagekit',   fallback: 'cloudinary' },
    videos:    { primary: 'cloudinary', fallback: 'firebase'   },
    documents: { primary: 'supabase',   fallback: 'backblaze'  },
    generic:   { primary: 'backblaze',  fallback: 'firebase'   },
  },

  // Alertas de uso de recursos
  alerts: {
    bandwidthWarningAt: 80,   // alerta quando bandwidth atingir 80%
    webhookUrl: 'https://minha-app.com/webhooks/cloudbase',
  },
})
```

### Operações principais

```typescript
// Upload — sistema escolhe provider automaticamente
const file = await cb.upload(myFile, { folder: 'produtos/imagens' })
// → { id, url, provider, size, createdAt }

// URL com expiração (para conteúdo privado)
const tempUrl = await cb.getSignedUrl(file.id, { expiresIn: '2h' })

// Eliminar
await cb.delete(file.id)

// Renomear
await cb.rename(file.id, 'novo-nome.jpg')

// Listar ficheiros numa pasta
const files = await cb.list({ folder: 'produtos/imagens' })

// Mover para outro provider
await cb.move(file.id, { toProvider: 'supabase' })
```

### API REST (qualquer linguagem)

```bash
# Upload
POST   https://api.cloudbase.app/v1/storage/upload
Authorization: Bearer cb_live_xxx

# URL de download
GET    https://api.cloudbase.app/v1/storage/{fileId}/url

# URL temporária
POST   https://api.cloudbase.app/v1/storage/{fileId}/signed-url
Body:  { "expiresIn": "2h" }

# Eliminar
DELETE https://api.cloudbase.app/v1/storage/{fileId}

# Listar
GET    https://api.cloudbase.app/v1/storage?folder=produtos
```

Compatível com qualquer linguagem:

```python
# Python
import requests
r = requests.post(
    'https://api.cloudbase.app/v1/storage/upload',
    headers={'Authorization': 'Bearer cb_live_xxx'},
    files={'file': open('foto.jpg', 'rb')}
)
url = r.json()['url']
```

```php
// Laravel
$r = Http::withToken('cb_live_xxx')
    ->attach('file', file_get_contents('foto.jpg'), 'foto.jpg')
    ->post('https://api.cloudbase.app/v1/storage/upload');
$url = $r->json('url');
```

### Routing inteligente — critérios em tempo real

| Factor | Como afecta a decisão |
|---|---|
| Tipo de ficheiro | Imagens e vídeos vão para providers com URL pública; ficheiros genéricos para providers com maior espaço |
| Espaço disponível | Verificado em tempo real antes de cada upload |
| Bandwidth restante | Providers próximos do limite mensal são evitados automaticamente |
| Custo de acesso | Cloudinary cobra bandwidth por acesso — evitado para ficheiros de acesso intensivo |
| Prioridade configurada | O developer define a ordem de preferência |

### Regras por tipo de ficheiro no SDK

| Tipo | Comportamento |
|---|---|
| Imagem | Distribuição apenas — nunca fragmentada — URL directa obrigatória |
| Vídeo | HLS se activado (ver secção seguinte); URL directa se desactivado |
| Áudio | HLS se activado; URL directa se desactivado |
| Documento / PDF | Sem fragmentação por padrão; download directo |
| ZIP / Arquivo | Fragmentação opcional com aviso explícito ao developer |

---

## 🎬 HLS Streaming

*HLS (HTTP Live Streaming) é a tecnologia usada pelo Netflix e pelo YouTube para entregar vídeo e áudio de forma progressiva — o utilizador começa a ver ou ouvir imediatamente, sem esperar que o ficheiro completo carregue.*

**Esta funcionalidade existe exclusivamente no modo developer.** Os utilizadores comuns do CloudBase reproduzem vídeos directamente — o CloudBase trata da optimização internamente, sem necessidade de configuração.

### Como funciona

Quando um vídeo ou áudio é enviado com HLS activado:

1. O CloudBase divide o ficheiro em segmentos de N segundos (padrão: 10s)
2. Cada segmento é enviado para o provider com mais espaço disponível
3. Se os segmentos não cabem num único provider, são distribuídos automaticamente por múltiplos providers
4. É gerado um ficheiro de índice `.m3u8` (*playlist que indica ao player a URL de cada segmento, na ordem correcta*)
5. O player de vídeo pede os segmentos sequencialmente — o utilizador começa a reproduzir com apenas os primeiros segundos carregados

```
Resultado devolvido ao developer:
{
  id:          "abc123",
  type:        "hls",
  playlistUrl: "https://api.cloudbase.app/hls/abc123/playlist.m3u8"
}

No frontend:
<video src={file.playlistUrl} /> — funciona em qualquer player HLS
```

### Activação

```typescript
// HLS desactivado por padrão
// Activado por upload ou globalmente na configuração

// Por upload
const video = await cb.upload(videoFile, {
  type: 'video',
  hls:  true,
})

// Globalmente na configuração
const cb = new CloudBase({
  apiKey: 'cb_live_xxx',
  hls: {
    enabled:         true,
    segmentDuration: 10,    // segundos por segmento
    minFileSizeMB:   5,     // só aplica HLS acima deste tamanho
  },
})

// Converter ficheiro já existente para HLS
const job = await cb.convertToHls(file.id)
// → processo assíncrono — webhook notifica quando terminar
```

### Vantagem vs usar Cloudinary directamente

Ao usar Cloudinary directamente, a geração de HLS tem custos de processamento por transformação. No CloudBase, a segmentação é feita antes do upload — os segmentos chegam ao provider já prontos, sem custo adicional de processamento.

### Quando usar HLS

| Situação | Recomendação |
|---|---|
| Vídeos acima de 5 MB numa plataforma web | Activar HLS |
| Plataforma de streaming de áudio | Activar HLS |
| Vídeos pequenos para download directo | HLS desnecessário |
| Ficheiros de vídeo para uso interno | HLS opcional |

---

## 👥 Space Pools para Developers

A funcionalidade de Space Pool está disponível no modo developer com uma diferença fundamental: os pools têm **duração definida**, alinhada com o ciclo de vida de um projecto.

```
Developer cria pool para um projecto:
  Nome:        "Projecto X — Fase de Desenvolvimento"
  Duração:     3 meses
  Membros:     equipa de desenvolvimento
  Contribuição: cada membro contribui com espaço próprio

Após 3 meses:
  → Notificação enviada a todos os membros com antecedência
  → Pool encerrado automaticamente na data definida
  → Todos os ficheiros removidos
  → Espaço de cada membro libertado
```

---

# Infraestrutura

---

## 🖥️ CloudBase Agent

O CloudBase Agent é uma aplicação leve que, quando instalada num servidor ou computador, o transforma num provider de armazenamento adicional dentro do CloudBase.

### Onde pode ser instalado

- **VPS** (*Virtual Private Server* — servidor virtual na nuvem) — qualquer provider: Hetzner, DigitalOcean, Vultr, e outros
- **Servidor dedicado** — máquinas com centenas de GB disponíveis
- **PC ou Mac** — computador pessoal

> **Nota importante:** Computadores pessoais e telemóveis não são recomendados para uso em Space Pools nem no modo developer, devido à instabilidade de conexão e latência variável. O Agent em dispositivos pessoais destina-se ao uso individual — receber transferências, ter um local de armazenamento pessoal adicional, e integrar o dispositivo na rede CloudBase pessoal do utilizador.

### Instalação

```bash
# Instalar o Agent
curl -sSL https://cloudbase.app/agent/install.sh | bash

# Ligar ao CloudBase
cloudbase-agent connect --token SEU_TOKEN

# O dispositivo aparece imediatamente no dashboard
# com espaço disponível, estado de conexão, e velocidade estimada
```

### Redirecionamento de transferências

Quando recebes um ficheiro pelo CloudBase, podes escolher para qual dos teus dispositivos conectados ele vai — mesmo que estejas a usar um dispositivo diferente:

```
Estás no PC do escritório.
Recebes um ficheiro de 20 GB pelo CloudBase.

→ Seleccionas "Receber no PC em casa"
→ O Agent no PC em casa recebe o ficheiro directamente
→ O servidor do CloudBase nunca tocou nos dados
→ Quando chegares a casa, o ficheiro já está lá
```

---

## 📂 Estrutura de Pastas nos Providers

Quando um provider é conectado ao CloudBase, a seguinte estrutura é criada automaticamente:

```
CloudBase/
├── _fragments/       ← PASTA PROTEGIDA
│                        Contém partes de ficheiros fragmentados.
│                        NÃO ELIMINAR — a eliminação desta pasta
│                        corrompe os ficheiros fragmentados.
│
├── _dev/             ← PASTA PROTEGIDA (apenas no modo developer)
│                        Contém ficheiros geridos pelo SDK.
│                        NÃO ELIMINAR — a eliminação afecta
│                        as aplicações que dependem destes ficheiros.
│
└── [pastas do utilizador]
    └── conteúdo normal organizado pelo utilizador ou pela automação
```

O utilizador é notificado sobre a importância destas pastas no momento de conectar cada provider, e novamente se o sistema detectar que foram eliminadas.

---

## 💰 Monetização e Planos

### Plano Gratuito

- Até 3 providers conectados
- Motor de automação com regras padrão
- Partilha com expiração de 24h
- 1 Space Pool com até 2 membros
- Bot WhatsApp e Telegram básico
- Visualização de ficheiros na plataforma

### Plano Pro

- Providers ilimitados
- Motor de automação com regras personalizadas e criação por IA
- Partilha permanente, com código, e QR Code
- Space Pools ilimitados com configuração avançada
- Dead Man's Switch
- CloudBase Agent (VPS e PC)
- CloudBase App com transferência WiFi e Bluetooth
- IA completa (pesquisa semântica, resumo, classificação automática)
- Prioridade no suporte

### Plano Developer

- Tudo do Plano Pro
- API Keys e SDK npm (`@cloudbase/sdk`)
- Providers com URL pública: Cloudinary, Supabase, Firebase, ImageKit, Backblaze B2
- HLS Streaming activável
- Space Pools com duração definida para equipas
- Dashboard de uso de bandwidth e storage por provider
- Webhooks para eventos de upload, delete, e bandwidth

### Funcionalidades que serão sempre pagas

| Funcionalidade | Razão |
|---|---|
| CloudBase Agent | Infraestrutura de relay e coordenação entre dispositivos |
| HLS Streaming | Processamento de segmentação de vídeo no momento do upload |
| Dead Man's Switch | Sistema de notificações e agendamento de longo prazo |
| SDK Developer com volume alto | Custo de requests à API e coordenação de providers |
| Space Pools acima de 5 membros | Complexidade de coordenação e sistema de reputação |

---

## 🔭 Visão Futura

**Marketplace de Space** — utilizadores com espaço excedente disponibilizam-no a outros dentro da plataforma, com o CloudBase a gerir a transacção e a garantir as regras de integridade.

**CloudBase Identity** — sistema de identidade onde os dados do utilizador estão sempre nos seus próprios drives, independentemente de quantas plataformas usa. Os dados pertencem ao utilizador — não à plataforma.

**Integrações de terceiros como backup** — API para plataformas externas usarem o CloudBase como camada de backup automático dos dados dos seus utilizadores. Se a plataforma encerrar, os dados continuam acessíveis ao utilizador no CloudBase.

**IA de análise de conteúdo** — transcrição automática de áudios, OCR em imagens (*tecnologia que extrai texto de imagens*), indexação completa do conteúdo de PDFs, e pesquisa dentro do conteúdo dos ficheiros.

---

## 🤝 Contribuir

O CloudBase é um projecto ambicioso. Se acreditas que o armazenamento pessoal e profissional pode ser radicalmente melhor do que o que existe hoje, e queres ajudar a construir algo que nunca foi feito desta forma, estás no sítio certo.

**Áreas onde a contribuição é mais necessária:**

- Adaptadores para novos providers de armazenamento
- CloudBase Agent (idealmente em Go ou Rust)
- SDK para linguagens além de JavaScript (Python, PHP, Go)
- Algoritmos de routing e fragmentação
- CloudBase App (mobile e desktop)
- Documentação técnica e testes

---

<div align="center">

*O CloudBase já não é uma ferramenta de armazenamento.*
*É a infraestrutura de dados que devias sempre ter tido.*

*Os teus ficheiros. Nos teus espaços. Sob o teu controlo.*

---

*CloudBase — Documentação v1.0*

</div>
ENDOFFILE
