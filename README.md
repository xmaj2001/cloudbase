<div align="center">

```
   ___  _                 _ ___
  / __|| | ___  _  _  __| || _ ) __ _  ___ ___
 | (__ | |/ _ \| || |/ _` || _ \/ _` |(_-</ -_)
  \___||_|\___/ \_,_|\__,_||___/\__,_|/__/\___|
```

**O espaço ilimitado que já existe. Reunido. Inteligente. Teu.**

---

![Estado](https://img.shields.io/badge/estado-em%20desenvolvimento-7c3aed?style=flat-square)
![Versão](https://img.shields.io/badge/versão-1.0--fundadores-7c3aed?style=flat-square)
![Licença](https://img.shields.io/badge/licença-MIT-7c3aed?style=flat-square)
![Plataformas](https://img.shields.io/badge/plataformas-Web%20%7C%20Mobile%20%7C%20WhatsApp-7c3aed?style=flat-square)

</div>

---

## O Problema

Tens espaço espalhado por cinco plataformas diferentes. Ficheiros que não encontras. Drives que enchem sempre na pior altura. Nenhuma forma de gerir tudo isso num só lugar.

O problema nunca foi falta de espaço. Foi a falta de uma plataforma que reunisse o que já existe e te deixasse finalmente no controlo.

> O CloudBase não te vende espaço. Conecta o espaço que já é teu — o teu Google Drive, o teu Telegram, o teu OneDrive, e muito mais — numa única interface que pensa por ti, organiza sozinha, transfere com segurança, e acompanha-te em qualquer dispositivo. Custo mensal: zero.

---

## Índice

- [Armazenamento Unificado](#-armazenamento-unificado)
- [Fragmentação Inteligente](#-fragmentação-inteligente)
- [Motor de Automação](#-motor-de-automação)
- [Sistema de Partilha](#-sistema-de-partilha)
- [Partilha Agendada](#-partilha-agendada)
- [Troca de Ficheiros](#-troca-de-ficheiros)
- [Rede de Dispositivos](#-rede-de-dispositivos)
- [Inteligência Artificial](#-inteligência-artificial)
- [Espaço Público](#-espaço-público)
- [Gestão Avançada](#-gestão-avançada)
- [Controlo via WhatsApp](#-controlo-via-whatsapp)
- [CloudBase vs Mercado](#-cloudbase-vs-mercado)
- [Roadmap](#-roadmap)

---

## Armazenamento Unificado

Cada plataforma que conectas contribui com o seu espaço para o teu armazenamento total. Quanto mais contas adicionas, maior o teu espaço disponível — sempre sem custo adicional.

```
Google Drive A    →   14.2 GB disponível
Google Drive B    →   12.8 GB disponível
Google Drive C    →   15.0 GB disponível
OneDrive          →    4.9 GB disponível
MEGA              →   19.7 GB disponível
Telegram          →   ilimitado
VPS Hetzner       →  178.0 GB disponível
─────────────────────────────────────────
Total unificado   →  244.6 GB + ilimitado
```

**Providers suportados:**

| Provider | Espaço gratuito | Tipo de ficheiro ideal |
|---|---|---|
| Google Drive | 15 GB por conta | Documentos, qualquer formato |
| OneDrive | 5 GB por conta | Documentos, Office |
| Telegram | Ilimitado | Ficheiros grandes, arquivos |
| Cloudinary | 25 GB | Imagens, vídeo optimizado |
| MEGA | 20 GB | Ficheiros encriptados |
| Dropbox | 2 GB | Colaboração |
| Box | 10 GB | Empresarial |
| pCloud | 10 GB | Media |
| Yandex Disk | 10 GB | Backup |
| VPS própria | Configurável | Tudo, centenas de GB por $5/mês |

**Desde o primeiro dia, sem pagar nada: mais de 100 GB disponíveis.**

---

## Fragmentação Inteligente

Quando nenhum dos teus drives tem espaço suficiente para um ficheiro grande, o CloudBase divide-o automaticamente e distribui pelos drives disponíveis. Para ti, continua a aparecer como um único ficheiro. A complexidade é invisível.

**Exemplo real:**

Tens um ficheiro de 30 GB. Os teus três Google Drives têm 10 GB livres cada.

```
ficheiro: GTA6_Complete.zip  (30.0 GB)

analisando espaço disponível...

fragmento_001  →  Google Drive A   →  10.0 GB  |  sha256: a8f3...9c2d
fragmento_002  →  Google Drive B   →  10.0 GB  |  sha256: b4e1...7f3a
fragmento_003  →  Telegram         →  10.0 GB  |  sha256: c9d2...1e8b

hash original: sha256:f1a9...3c7d
verificação: ok — integridade garantida
```

O ficheiro é dividido com base no espaço exacto disponível em cada drive. Cada fragmento recebe uma assinatura criptográfica individual. No download, os fragmentos são descarregados em paralelo no teu dispositivo e reunidos localmente. A assinatura final é verificada contra o original antes de ser entregue. Se algum fragmento estiver corrompido ou em falta, o sistema identifica e informa com precisão. Para o utilizador, o ficheiro aparece sempre como uma unidade única e completa.

---

## Motor de Automação

O CloudBase tem um motor de automação que classifica e organiza os teus ficheiros automaticamente — por tipo, por nome, por tamanho, ou pelas regras que tu defines. Podes deixar o sistema trabalhar sozinho, ou descrever exactamente como queres que tudo funcione.

**Automação padrão — funciona desde o primeiro dia:**

```
Imagens      →  /Imagens
Documentos   →  /Documentos
Áudio        →  /Áudio
Vídeos       →  /Vídeos
Arquivos     →  /Arquivos
Código       →  /Dev
```

**Regras personalizadas — o teu drive, à tua maneira:**

```yaml
regras:
  - nome: "Faturas"
    condições:
      - nome_contém: "fatura"
      - extensão: ".pdf"
    destino: "/Finanças/Faturas"
    notificar: true

  - nome: "Ficheiros grandes para Telegram"
    condições:
      - tamanho_maior_que: "1GB"
    destino: "telegram"

  - nome: "Backups de código"
    condições:
      - nome_contém: "backup"
      - extensão: [".zip", ".tar.gz"]
    acções:
      - comprimir: true
      - destino: "/Dev/Backups"
```

**Modos de operação:**

- **Manual** — organizas quando quiseres com um clique
- **Automático** — cada ficheiro é organizado no momento em que entra
- **Agendado** — o sistema organiza numa hora que defines
- **Híbrido** — automático, com relatório semanal do que foi feito

---

## Sistema de Partilha

O CloudBase oferece três formas de partilha, cada uma pensada para um cenário diferente. Todas geram automaticamente um link, um código de segurança, e um QR Code.

**Modo protegido — link com código obrigatório:**

```
link:    cloudbase.app/s/xK9mZ2aB
código:  CB-7X9K2M
QR Code: redireciona para página de verificação do código

→  Quem acede ao link precisa do código para fazer download
→  Mesmo que o link seja interceptado, sem o código não há acesso
→  Após o download, link e código são invalidados automaticamente
```

**Modo público — link directo, download imediato:**

```
link:    cloudbase.app/d/xK9mZ2aB
QR Code: redireciona directamente para o download

→  Expiração configurável: 24h / 7 dias / 30 dias / sem limite
→  Protecção por senha opcional
→  Limite de número de downloads configurável
→  Partilha directa para número WhatsApp com um clique
```

**Transferência temporária — enviado, descarregado, apagado:**

```
→  Após o destinatário fazer download, o ficheiro é eliminado automaticamente
→  Não ocupa espaço no teu drive após a transferência
→  Confirmação de entrega notificada em tempo real
→  Ideal para ficheiros grandes que não precisas de guardar
```

---

## Partilha Agendada

Escolhes ficheiros, defines uma data, e indicas para onde devem ir. O CloudBase notifica-te periodicamente para confirmares que ainda queres prosseguir. Se não responderes, a partilha acontece automaticamente na data definida.

**Sistema de confirmação progressiva:**

O sistema divide o tempo restante por dois a cada notificação, aproximando-se gradualmente da data definida. Se deixares de responder, interpreta isso como intenção de avançar e executa automaticamente.

```
data definida: 365 dias

notificação 1  →  faltam 365 dias  →  confirmas?
notificação 2  →  faltam 182 dias  →  confirmas?
notificação 3  →  faltam  91 dias  →  confirmas?
notificação 4  →  faltam  45 dias  →  confirmas?
notificação 5  →  faltam  22 dias  →  confirmas?
notificação 6  →  faltam  11 dias  →  confirmas?
notificação 7  →  faltam   5 dias  →  confirmas?
notificação 8  →  faltam   2 dias  →  última confirmação

sem resposta em 48h  →  executa automaticamente
```

**Destinos suportados:**

- Múltiplos endereços de email
- Números WhatsApp seleccionados
- Utilizadores CloudBase
- Espaço público do CloudBase

---

## Troca de Ficheiros

O CloudBase permite que dois utilizadores troquem ficheiros directamente entre si. Antes de qualquer transferência, a plataforma verifica a integridade e autenticidade de ambos os ficheiros. Nenhuma troca acontece sem que os dois lados saibam exactamente o que estão a receber.

```
proposta de troca #TK-9821
──────────────────────────────────────────────────────

  o que ofereces                o que recebes
  ──────────────                ─────────────────
  Adobe_Premiere_2025.zip       DaVinci_Resolve_18.zip
  tamanho: 4.2 GB               tamanho: 3.8 GB
  conteúdo: 478 ficheiros       conteúdo: 312 ficheiros
  sha256: a8f3...9c2d           sha256: 9b2c...7f1e
  scan: limpo                   scan: limpo
  verificado: sim               verificado: sim

──────────────────────────────────────────────────────
aguarda a tua confirmação
```

Cada utilizador tem um perfil de reputação público com histórico de trocas, taxa de conclusão, e avaliações. O sistema de reputação torna as trocas auditáveis e confiáveis.

---

## Rede de Dispositivos

O CloudBase vai além dos drives na nuvem. Com o CloudBase Agent instalado nos teus dispositivos, o teu telemóvel, o teu computador em casa, e a tua VPS tornam-se parte da mesma rede — e podes enviar ficheiros directamente entre eles, de qualquer lugar.

**CloudBase Agent — instalação:**

```bash
# Instala o Agent com um único comando
curl -sSL https://cloudbase.app/agent/install.sh | bash

# Liga ao teu CloudBase
cloudbase-agent connect --token SEU_TOKEN

# Resultado no dashboard:
# VPS Hetzner  →  180 GB livres  →  online  →  1 Gbps
```

**Redirecionamento inteligente de transferências:**

Quando recebes um ficheiro pelo CloudBase, não tens de recebê-lo no dispositivo que estás a usar. Escolhes o destino antes de confirmar.

```
Estás no trabalho. Recebes um ficheiro de 20 GB.
Não queres descarregar no PC da empresa.

→  seleccionas: "receber no PC em casa"
→  o Agent no teu PC em casa recebe directamente
→  quando chegares a casa, já está lá
```

Suporte para Windows, macOS, Linux e qualquer VPS. Transferências encriptadas de ponta a ponta. O servidor coordena — nunca vê o conteúdo.

---

## Inteligência Artificial

O motor de IA do CloudBase analisa conteúdo, aprende os teus padrões, e mantém o armazenamento limpo e organizado — sem que tenhas de fazer nada.

```
pesquisa: "contrato do arrendamento 2024"

a analisar conteúdo dos documentos...

resultado: contrato_arrendamento_final_v3.pdf
           Google Drive A / Documentos/Legal/
           modificado: 14 Mar 2024
           confiança: 97%

também pode interessar:
  recibo_renda_jan2024.pdf
  recibo_renda_fev2024.pdf
```

**Funcionalidades:**

- Pesquisa por descrição — encontra ficheiros sem saber o nome exacto
- Leitura de conteúdo de documentos PDF e imagens para indexação
- Detecção automática de ficheiros duplicados, mesmo com nomes diferentes
- Sugestão de compressão para ficheiros que podem ser reduzidos
- Relatório mensal de utilização com recomendações de limpeza
- Classificação automática que aprende com as tuas correcções
- Resumo de documentos PDF directamente na interface
- Identificação de conteúdo em imagens para indexação e pesquisa

---

## Espaço Público

O CloudBase Public é uma área da plataforma onde qualquer utilizador pode disponibilizar ficheiros para download público, sem restrições de acesso. Cada ficheiro passa por verificação de segurança antes de ficar disponível.

- Qualquer utilizador registado pode publicar ficheiros
- Scan de segurança obrigatório antes da publicação
- Sistema de categorias para organização do conteúdo
- Sistema de denúncia — conteúdo reportado é revisto e removido
- O ficheiro ocupa espaço no drive do utilizador que o publicou
- Se o utilizador remover o ficheiro ou cancelar a conta, sai do espaço público automaticamente

---

## Gestão Avançada

**Lixeira com período de retenção:**

Ficheiros eliminados vão para a lixeira por 30 dias antes de serem apagados permanentemente. Podes restaurar qualquer ficheiro durante esse período — ou eliminar antes se assim quiseres. O dashboard mostra em tempo real o espaço que a lixeira está a ocupar.

**Validade de ficheiros:**

Define quanto tempo um ficheiro deve existir na plataforma. O sistema notifica antes da data de eliminação e dá-te a opção de renovar. A expiração envia o ficheiro para a lixeira — nunca elimina directamente.

**Collections:**

Agrupa ficheiros de diferentes pastas e providers sob um mesmo nome, sem os mover. Funciona como uma playlist — os ficheiros ficam onde estão, mas aparecem juntos quando abres a collection. Ideal para projectos, clientes, ou qualquer conjunto de ficheiros relacionados que estejam espalhados pelo teu armazenamento.

---

## Controlo via WhatsApp

Não precisas de abrir o browser. O bot do CloudBase no WhatsApp dá-te acesso a todas as funcionalidades principais directamente na aplicação que já usas todos os dias. O bot interpreta linguagem natural — escreves o que queres fazer, ele percebe e executa.

```
[envia ficheiro]
→ guardado em Google Drive A
→ link: cloudbase.app/f/xK9m

partilhar relatorio.pdf
→ link: cloudbase.app/s/aB3x
→ código: CB-7X9K2M

buscar contrato joao
→ contrato_joao_2024.pdf — Google Drive / Legal /

espaço usado
→ usado: 47.3 GB de 244.6 GB
→ Google Drive: 28 GB  |  Telegram: 19 GB

organizar
→ 847 ficheiros organizados
→ 3 duplicados encontrados
```

**Comandos disponíveis por categoria:**

| Categoria | Exemplos |
|---|---|
| Armazenamento | `listar pasta Trabalho`, `mover ficheiro`, `criar pasta` |
| Partilha | `partilhar [ficheiro]`, `partilhar [ficheiro] código`, `partilhar [ficheiro] 7dias` |
| Organização | `organizar`, `organizar automático`, `criar regra`, `ver regras` |
| Busca | `buscar [descrição]`, `buscar tipo pdf`, `buscar maior que 1GB` |
| Troca | `trocar [ficheiro] por [descrição]`, `ver propostas`, `aceitar troca #ID` |
| Estatísticas | `espaço usado`, `meus ficheiros`, `duplicados`, `relatório` |

---

## CloudBase vs Mercado

| Funcionalidade | CloudBase | Google Drive | Dropbox | OneDrive |
|---|---|---|---|---|
| Espaço gratuito | **100 GB+** | 15 GB | 2 GB | 5 GB |
| Múltiplos providers unificados | Sim | Não | Não | Não |
| Fragmentação automática de ficheiros | Sim | Não | Não | Não |
| Automação com regras personalizadas | Sim | Não | Não | Não |
| Partilha com código de segurança | Sim | Não | Não | Não |
| Partilha agendada para o futuro | Sim | Não | Não | Não |
| Troca de ficheiros entre utilizadores | Sim | Não | Não | Não |
| Controlo via WhatsApp | Sim | Não | Não | Não |
| Redirecionamento entre dispositivos | Sim | Não | Não | Não |
| VPS como provider de armazenamento | Sim | Não | Não | Não |
| Espaço público de download | Sim | Não | Não | Não |
| **Custo mensal base** | **$0** | $2.99/mês | $11.99/mês | $1.99/mês |

---

## Roadmap

```
fase 01 — Core Storage                          em construção
──────────────────────────────────────────────────────────────
  Integração Google Drive com múltiplas contas
  Integração Telegram como provider
  Indexação e metadata de ficheiros no banco
  Explorer de ficheiros — grelha e lista
  Upload com routing inteligente por tipo

fase 02 — Partilha e Fragmentação               planeada
──────────────────────────────────────────────────────────────
  Fragmentação automática de ficheiros grandes
  Reagrupamento no cliente com verificação SHA-256
  Sistema de partilha — link, código, QR Code
  Toggle público e protegido com expiração
  Lixeira com período de retenção configurável
  Collections e agrupamento de ficheiros

fase 03 — Automação e IA                        planeada
──────────────────────────────────────────────────────────────
  Motor de regras de automação personalizado
  Classificação automática por IA
  Pesquisa semântica por conteúdo
  Detecção de duplicados e sugestão de limpeza
  Scheduler com múltiplos modos de operação

fase 04 — Agent e Dispositivos                  futuro
──────────────────────────────────────────────────────────────
  CloudBase Agent para Windows, macOS, Linux
  Suporte a VPS como provider
  Redirecionamento de transferências entre dispositivos
  Transferência directa via WiFi na rede local

fase 05 — Troca e Ecossistema                   futuro
──────────────────────────────────────────────────────────────
  Sistema de troca de ficheiros entre utilizadores
  Verificação de integridade e scan em trocas
  Sistema de reputação e histórico
  Partilha agendada com confirmação progressiva
  CloudBase Public — espaço de download aberto
  Bot WhatsApp com linguagem natural
  API pública para integrações de terceiros
```

---

<div align="center">

**O espaço que precisas já existe.**

O CloudBase não inventa nada novo. Reúne o que já é teu, organiza o que já tens,
e dá-te o controlo que sempre devias ter tido.
Sem mensalidades. Sem limites artificiais. Sem complicação.

---

*CloudBase — Documentação Oficial v1.0*

</div>
