"use client";

import { motion } from "framer-motion";
import { Search, ArrowLeft, HashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* ---------------------------------- ui ---------------------------------- */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-24 border-t border-hairline pt-12 first:border-0 first:pt-0"
    >
      {eyebrow && (
        <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h2 className="group mt-2 flex items-center gap-2 font-display text-3xl tracking-tight">
        <a
          href={`#${id}`}
          className="hover:underline underline-offset-8 decoration-hairline"
        >
          {title}
        </a>
        <HashIcon className="size-4 opacity-0 transition-opacity group-hover:opacity-40" />
      </h2>
      <div className="mt-5 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </motion.section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mono overflow-x-auto rounded-xl border border-hairline bg-surface-2 p-4 text-[12.5px] leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-hairline">
      <table className="w-full text-left text-[13.5px]">
        <thead className="bg-surface-2">
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-medium text-foreground whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-hairline">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${j === 0 ? "text-foreground" : ""}`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface px-4 py-3 text-[13.5px]">
      <span className="mono mr-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Nota
      </span>
      {children}
    </div>
  );
}

/* --------------------------------- nav ---------------------------------- */

const toc = [
  {
    group: "Introdução",
    items: [{ id: "o-que-e", label: "O que é o CloudBase" }],
  },
  {
    group: "Para utilizadores",
    items: [
      { id: "unificado", label: "Armazenamento unificado" },
      { id: "fragmentacao", label: "Fragmentação e distribuição" },
      { id: "visualizacao", label: "Visualização de ficheiros" },
      { id: "partilha", label: "Sistema de partilha" },
      { id: "agendada", label: "Partilha agendada" },
      { id: "troca", label: "Troca de ficheiros" },
      { id: "pools", label: "Space Pools" },
      { id: "automacao", label: "Motor de automação" },
      { id: "gestao", label: "Gestão avançada" },
      { id: "publico", label: "Espaço público" },
      { id: "bots", label: "WhatsApp e Telegram" },
    ],
  },
  {
    group: "Aplicação",
    items: [{ id: "app", label: "CloudBase App" }],
  },
  {
    group: "Developers",
    items: [
      { id: "sdk", label: "SDK e API REST" },
      { id: "hls", label: "HLS Streaming" },
      { id: "pools-dev", label: "Space Pools (dev)" },
    ],
  },
  {
    group: "Infraestrutura",
    items: [
      { id: "agent", label: "CloudBase Agent" },
      { id: "pastas", label: "Estrutura de pastas" },
      { id: "planos", label: "Monetização e planos" },
      { id: "futuro", label: "Visão futura" },
      { id: "contribuir", label: "Contribuir" },
    ],
  },
];

/* --------------------------------- page --------------------------------- */

export default function DocsPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState("o-que-e");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return toc;
    return toc
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => i.label.toLowerCase().includes(s)),
      }))
      .filter((g) => g.items.length);
  }, [q]);

  useEffect(() => {
    const ids = toc.flatMap((g) => g.items.map((i) => i.id));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <img src={"/logo.png"} alt="CloudBase" className="h-7 w-7" />
            <span className="text-[15px] font-medium tracking-tight">
              CloudBase
            </span>
          </Link>
          <span className="mono hidden rounded-full border border-hairline px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            Docs v1.0
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-hairline px-3 py-2 md:flex">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Procurar na documentação..."
                className="w-56 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Link
              href="/storage"
              className="rounded-full bg-foreground px-4 py-2 text-[13px] text-background transition-opacity hover:opacity-90"
            >
              Abrir app
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Voltar ao site
            </Link>
            {filtered.map((g) => (
              <div key={g.group}>
                <div className="mono mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {g.group}
                </div>
                <ul className="space-y-0.5 border-l border-hairline">
                  {g.items.map((i) => (
                    <li key={i.id}>
                      <a
                        href={`#${i.id}`}
                        className={`-ml-px block border-l py-1.5 pl-3 text-[13px] transition-colors ${
                          active === i.id
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {i.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* content */}
        <main className="min-w-0 space-y-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Documentação
            </div>
            <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
              CloudBase
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              O que acontece quando pegas todo o espaço de armazenamento que já
              tens espalhado pelo mundo — Google Drive, Telegram, MEGA,
              Cloudinary e dezenas de outros — e os transformas num único
              sistema inteligente que pensa, organiza, protege e distribui os
              teus dados automaticamente? Acontece o CloudBase.
            </p>
          </motion.div>

          <Section
            id="o-que-e"
            eyebrow="Introdução"
            title="O que é o CloudBase?"
          >
            <p>
              O CloudBase começou como uma ideia simples: unir o espaço de
              armazenamento que já existe em múltiplas plataformas num único
              lugar. Mas à medida que foi sendo pensado e construído, tornou-se
              algo muito maior.
            </p>
            <p>
              O CloudBase é hoje uma{" "}
              <strong>infraestrutura de dados pessoais e profissionais</strong>{" "}
              — uma plataforma que não apenas armazena ficheiros, mas que os
              distribui de forma inteligente entre múltiplos serviços, os
              organiza automaticamente, permite partilhá-los com segurança,
              trocá-los com outros utilizadores, transmiti-los em streaming,
              agendá-los para o futuro, e muito mais.
            </p>
            <p>
              Tem dois públicos distintos com experiências desenhadas
              especificamente para cada um:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-hairline bg-surface p-5">
                <h3 className="text-foreground font-medium">Utilizadores</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Querem um espaço unificado, organizado e fácil de usar, sem se
                  preocupar com onde cada ficheiro está guardado.
                </p>
              </div>
              <div className="rounded-xl border border-hairline bg-surface p-5">
                <h3 className="text-foreground font-medium">Developers</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Querem uma API e um SDK simples para integrar armazenamento
                  inteligente nas suas aplicações, sem configurar cada provider
                  separadamente.
                </p>
              </div>
            </div>
            <p>
              Ambos partilham a mesma infraestrutura. A experiência é
              completamente diferente.
            </p>
          </Section>

          <Section
            id="unificado"
            eyebrow="Para utilizadores"
            title="Armazenamento unificado"
          >
            <p>
              O CloudBase conecta-se a múltiplos providers de armazenamento e
              apresenta todo o espaço disponível como se fosse um único disco. O
              utilizador não precisa de saber onde cada ficheiro está. O
              CloudBase sabe.
            </p>
            <Table
              head={["Provider", "Espaço gratuito", "Notas"]}
              rows={[
                [
                  "Google Drive",
                  "15 GB por conta",
                  "Múltiplas contas suportadas",
                ],
                ["OneDrive", "5 GB por conta", "Múltiplas contas suportadas"],
                ["Telegram", "Ilimitado", "Ideal para ficheiros grandes"],
                ["MEGA", "20 GB", "Encriptação end-to-end"],
                ["Dropbox", "2 GB", "—"],
                ["Box", "10 GB", "—"],
                ["pCloud", "10 GB", "—"],
                ["Yandex Disk", "10 GB", "—"],
                ["VPS própria", "Configurável", "Via CloudBase Agent"],
              ]}
            />
            <Note>
              Com múltiplas contas por provider, o espaço total disponível pode
              facilmente ultrapassar os 200 GB — completamente gratuito.
            </Note>
            <h3 className="pt-2 text-foreground font-medium text-lg">
              Como o routing funciona
            </h3>
            <p>Quando um ficheiro entra na plataforma, o CloudBase:</p>
            <List
              items={[
                "Analisa tipo, tamanho, e extensão",
                "Verifica as regras de automação definidas pelo utilizador",
                "Consulta o espaço disponível em tempo real em cada provider",
                "Escolhe o destino óptimo",
                "Faz o upload directamente do browser para o provider — o servidor do CloudBase nunca toca nos dados",
                "Regista o ficheiro na base de dados com todos os metadados",
              ]}
            />
          </Section>

          <Section
            id="fragmentacao"
            eyebrow="Para utilizadores"
            title="Fragmentação e distribuição inteligente"
          >
            <p>
              Quando nenhum provider tem espaço suficiente individualmente, o
              CloudBase tem dois mecanismos:
              <strong> distribuição</strong> e <strong>fragmentação</strong>.
            </p>

            <h3 className="text-foreground font-medium text-lg">
              Distribuição
            </h3>
            <p>
              Múltiplos ficheiros distribuídos pelos providers disponíveis, cada
              um indo para onde cabe:
            </p>
            <Code>{`2 ficheiros de 6 GB + 3 providers de 10 GB cada

Ficheiro A (6 GB) → Provider 1
Ficheiro B (6 GB) → Provider 2
Sem fragmentação necessária.`}</Code>

            <h3 className="text-foreground font-medium text-lg">
              Fragmentação
            </h3>
            <p>
              Um ficheiro único maior do que qualquer provider, dividido pelos
              providers disponíveis:
            </p>
            <Code>{`1 ficheiro de 25 GB + 3 providers de 10 GB cada

Fragmento 0 (10 GB) → Provider 1  [CloudBase/_fragments/]
Fragmento 1 (10 GB) → Provider 2  [CloudBase/_fragments/]
Fragmento 2 ( 5 GB) → Provider 3  [CloudBase/_fragments/]

Para o utilizador: um único ficheiro de 25 GB.`}</Code>

            <h3 className="pt-2 text-foreground font-medium text-lg">
              Integridade garantida por criptografia
            </h3>
            <p>
              Cada fragmento recebe uma assinatura SHA-256 (
              <em>
                algoritmo que gera uma impressão digital única de cada bloco de
                dados
              </em>
              ). No download:
            </p>
            <List
              items={[
                "Os fragmentos são descarregados em paralelo directamente no browser",
                "A assinatura de cada fragmento é verificada individualmente",
                "Os fragmentos são reunidos localmente",
                "A assinatura do ficheiro completo é verificada contra o original",
                "Só após verificação o download é disponibilizado",
              ]}
            />
            <p>
              Se algum fragmento estiver corrompido ou em falta, o sistema
              identifica exactamente qual e informa com precisão.
            </p>

            <h3 className="pt-2 text-foreground font-medium text-lg">
              Regras de fragmentação por tipo de ficheiro
            </h3>
            <Table
              head={["Tipo", "Fragmentação", "Notas"]}
              rows={[
                [
                  "Imagem",
                  "Nunca",
                  "Imagens têm de ser sempre acedidas como um todo — URL directa obrigatória",
                ],
                [
                  "Vídeo / Áudio",
                  "Sim — via HLS",
                  "Segmentos distribuídos por múltiplos drivers; reprodução directa na plataforma; download reúne automaticamente",
                ],
                [
                  "Documento / PDF",
                  "Opcional",
                  "Desactivado por padrão — utilizador confirma explicitamente",
                ],
                [
                  "ZIP / ISO / RAR / APK",
                  "Opcional",
                  "Mesmo fragmentado, o preview do conteúdo interno está sempre disponível",
                ],
                [
                  "Qualquer tipo",
                  "Sim, quando necessário",
                  "Tamanho mínimo recomendado: 100 MB",
                ],
              ]}
            />

            <h3 className="pt-2 text-foreground font-medium text-lg">
              HLS para vídeo e áudio — fragmentação no modo utilizador
            </h3>
            <p>
              Vídeos e áudios grandes que não cabem num único driver são
              fragmentados automaticamente via HLS (
              <em>
                HTTP Live Streaming — tecnologia usada pelo Netflix e YouTube
                para entrega progressiva de media
              </em>
              ). Os segmentos são distribuídos pelos drivers disponíveis do
              utilizador.
            </p>
            <Code>{`Vídeo de 8 GB + 3 drivers de 3 GB cada

Segmentos 0–30  (3 GB) → Driver 1  [CloudBase/_fragments/]
Segmentos 31–60 (3 GB) → Driver 2  [CloudBase/_fragments/]
Segmentos 61–90 (2 GB) → Driver 3  [CloudBase/_fragments/]

Na plataforma:
→ Player pede segmentos sequencialmente
→ Reprodução começa imediatamente
→ Utilizador não percebe a fragmentação

No download:
→ Segmentos reunidos automaticamente
→ Ficheiro original devolvido completo e íntegro`}</Code>
          </Section>

          <Section
            id="visualizacao"
            eyebrow="Para utilizadores"
            title="Visualização de ficheiros"
          >
            <p>
              O CloudBase permite visualizar o conteúdo dos ficheiros
              directamente na plataforma, sem necessidade de os descarregar.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              O que é possível visualizar
            </h3>
            <List
              items={[
                "Imagens — visualização directa, zoom, navegação em galeria",
                "Vídeos — reprodução directa no browser, sem download",
                "Áudio — reprodução directa com player integrado",
                "PDFs — leitura completa no browser",
                "Documentos — visualização de texto e formatação",
                "Arquivos comprimidos — listagem do conteúdo interno (ficheiros e pastas dentro de ZIPs, RARs, etc.) sem necessidade de extrair",
              ]}
            />
            <h3 className="pt-2 text-foreground font-medium text-lg">
              Preview de ficheiros compactados — mesmo quando fragmentados
            </h3>
            <p>
              O CloudBase mantém no banco de dados o{" "}
              <strong>índice do conteúdo interno</strong> de qualquer ficheiro
              compactado (ZIP, ISO, RAR, APK, etc.) — a lista completa de
              ficheiros e pastas que existem dentro do arquivo.
            </p>
            <p>
              Isto significa que, mesmo que o ficheiro esteja fragmentado por
              múltiplos drivers, o utilizador consegue ver o que está lá dentro{" "}
              <strong>sem descarregar nada</strong> e sem precisar de reunir os
              fragmentos primeiro.
            </p>
            <Code>{`backup_projecto.zip  (fragmentado em 3 drivers)

Preview disponível imediatamente:
├── /src
│   ├── index.ts          (12 KB)
│   ├── app.ts            (8 KB)
│   └── utils/
│       └── helpers.ts    (4 KB)
├── /docs
│   └── README.md         (2 KB)
├── package.json          (1 KB)
└── docker-compose.yml    (3 KB)

Total: 47 ficheiros  —  2.3 GB
Fragmentos: 3 drivers  —  integridade: verificada ✓`}</Code>
            <p>
              No download, os fragmentos são reunidos automaticamente e o
              utilizador recebe o ficheiro
            </p>

            <h3 className="pt-2 text-foreground font-medium text-lg">
              Visualização de conteúdo partilhado
            </h3>
            <p>
              Se outro utilizador do CloudBase partilhar uma pasta ou ficheiro
              contigo, podes:
            </p>
            <List
              items={[
                "Visualizar imagens, vídeos, áudios, e documentos directamente",
                "Ver o conteúdo interno de arquivos comprimidos",
                "Tudo isto sem fazer download — o conteúdo é apresentado na interface do CloudBase",
              ]}
            />
            <p>
              A visualização de conteúdo de outros utilizadores só é possível
              quando o utilizador proprietário concede permissão explícita.
            </p>
          </Section>

          <Section
            id="partilha"
            eyebrow="Para utilizadores"
            title="Sistema de partilha"
          >
            <h3 className="text-foreground font-medium text-lg">
              Partilha protegida com código
            </h3>
            <Code>{`Link:    cloudbase.app/s/xK9mZ2aB
Código:  CB-7X9K2M
QR Code: gerado automaticamente

→ Destinatário acede ao link
→ Insere o código
→ Faz download
→ Link e código invalidados automaticamente`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              Partilha pública directa
            </h3>
            <Code>{`Expiração:          24h / 7 dias / 30 dias / permanente
Limite de downloads: N vezes ou ilimitado
Protecção por senha: opcional
Partilha via WhatsApp ou Telegram: com um clique`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              Transferência temporária
            </h3>
            <Code>{`→ Destinatário faz download
→ Ficheiro eliminado automaticamente do CloudBase
→ Espaço libertado imediatamente
→ Confirmação de entrega notificada ao remetente`}</Code>
          </Section>

          <Section
            id="agendada"
            eyebrow="Para utilizadores"
            title="Partilha agendada — Dead Man's Switch"
          >
            <p>
              <em>
                Dead Man's Switch: mecanismo que executa uma acção
                automaticamente se o utilizador deixar de confirmar durante um
                período de tempo.
              </em>
            </p>
            <p>
              Permite agendar a partilha de ficheiros para uma data futura. O
              sistema confirma periodicamente se o utilizador ainda quer
              prosseguir, usando um algoritmo de divisão progressiva do tempo
              restante:
            </p>
            <Code>{`Data definida: 365 dias no futuro

Confirmação 1:  faltam 365 dias  →  confirmas?
Confirmação 2:  faltam 182 dias  →  confirmas?
Confirmação 3:  faltam  91 dias  →  confirmas?
Confirmação 4:  faltam  45 dias  →  confirmas?
Confirmação 5:  faltam  22 dias  →  confirmas?
Confirmação 6:  faltam  11 dias  →  confirmas?
Confirmação 7:  faltam   5 dias  →  confirmas?
Confirmação 8:  faltam   2 dias  →  ÚLTIMA CONFIRMAÇÃO

Sem resposta em 48h  →  partilha executada automaticamente`}</Code>
            <p>
              <strong>Destinos disponíveis:</strong>
            </p>
            <List
              items={[
                "Múltiplos endereços de email",
                "Números WhatsApp ou Telegram seleccionados",
                "Utilizadores CloudBase",
                "Espaço público do CloudBase",
              ]}
            />
          </Section>

          <Section
            id="troca"
            eyebrow="Para utilizadores"
            title="Troca de ficheiros"
          >
            <p>
              O CloudBase permite trocas de ficheiros directas entre
              utilizadores, com verificação completa de integridade antes de
              qualquer transferência.
            </p>
            <p>Antes de aceitar, ambos os utilizadores vêem:</p>
            <List
              items={[
                "Nome, tamanho, e tipo do ficheiro",
                "Conteúdo interno no caso de arquivos comprimidos",
                "Assinatura SHA-256 verificada independentemente",
                "Resultado do scan de segurança",
                "Perfil de reputação do outro utilizador",
              ]}
            />
            <p>
              <strong>Sistema de reputação:</strong> após cada troca, ambos
              avaliam a experiência. O histórico é público e afecta a confiança
              que outros depositam em cada perfil.
            </p>
          </Section>

          <Section
            id="pools"
            eyebrow="Para utilizadores"
            title="Space Pools — Espaço Partilhado"
          >
            <p>
              O Space Pool permite que um grupo de utilizadores una o seu espaço
              disponível e o use colectivamente, com regras definidas pelo
              administrador.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Configuração pelo administrador
            </h3>
            <Code>{`Espaço contribuído:   cada membro define quanto contribui
Quota de uso:         % máxima do pool que cada membro pode ocupar
Fragmentação cruzada:
  LOCKED  →  membro não pode sair enquanto tiver fragmentos de outros nos seus drives
  FREE    →  membro pode sair a qualquer momento, com aviso de possível perda de dados`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              Entrada no grupo
            </h3>
            <p>
              Cada membro convidado vê as regras completas antes de entrar. A
              aceitação é explícita e consciente.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Sistema de reputação do pool
            </h3>
            <p>Se um membro sair causando perda de dados de outros:</p>
            <Code>{`→ Outros membros avaliam o comportamento
→ Avaliações negativas ficam no histórico público do utilizador
→ Utilizadores com histórico negativo têm mais dificuldade
   em ser aceites em novos grupos`}</Code>
          </Section>

          <Section
            id="automacao"
            eyebrow="Para utilizadores"
            title="Motor de automação"
          >
            <Note>
              Esta funcionalidade está em avaliação. O sistema de automação
              abaixo descrito está definido e será implementado, mas pode ser
              ajustado antes do lançamento.
            </Note>
            <p>
              O motor de automação organiza ficheiros automaticamente com base
              em regras definidas pelo utilizador.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Três formas de criar regras
            </h3>
            <p>
              <strong>1. Builder visual</strong> — arrastar e largar condições e
              acções, sem código.
            </p>
            <p>
              <strong>2. YAML manual</strong> — para utilizadores técnicos:
            </p>
            <Code>{`routing:
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
      driver: telegram`}</Code>
            <p>
              <strong>3. Linguagem natural com IA</strong> — descreves o que
              queres em linguagem normal, a IA gera a regra correspondente.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Modos de operação
            </h3>
            <Table
              head={["Modo", "Comportamento"]}
              rows={[
                [
                  "Manual",
                  "O utilizador organiza quando quiser, com um clique",
                ],
                [
                  "Automático",
                  "Cada ficheiro organizado no momento em que entra",
                ],
                ["Agendado", "Organização acontece num horário definido"],
                [
                  "Híbrido",
                  "Automático com relatório semanal do que foi feito",
                ],
              ]}
            />
          </Section>

          <Section
            id="gestao"
            eyebrow="Para utilizadores"
            title="Gestão avançada"
          >
            <h3 className="text-foreground font-medium text-lg">
              Lixeira com retenção configurável
            </h3>
            <p>
              Ficheiros eliminados vão para a lixeira por 30 dias (configurável)
              antes de serem apagados permanentemente. O dashboard mostra o
              espaço que a lixeira está a ocupar em tempo real. Restauração
              disponível com um clique.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Validade de ficheiros
            </h3>
            <p>
              Define a data de expiração de qualquer ficheiro. O sistema
              notifica antes da data e permite renovar. A expiração move o
              ficheiro para a lixeira — nunca elimina directamente.
            </p>
            <h3 className="text-foreground font-medium text-lg">Collections</h3>
            <p>
              Agrupa ficheiros de diferentes pastas e providers sob um mesmo
              nome, sem os mover. Funciona como uma playlist — os ficheiros
              ficam onde estão, aparecem juntos quando abres a collection. Ideal
              para projectos, clientes, ou qualquer conjunto de ficheiros
              relacionados.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Sincronização com providers
            </h3>
            <p>
              O CloudBase detecta alterações feitas directamente nos providers
              (ficheiros eliminados, movidos, ou renomeados fora da plataforma)
              e notifica o utilizador com mensagens claras sobre as
              discrepâncias encontradas.
            </p>
          </Section>

          <Section
            id="publico"
            eyebrow="Para utilizadores"
            title="Espaço público"
          >
            <p>
              Área da plataforma onde utilizadores disponibilizam ficheiros para
              acesso público, sem necessidade de conta.
            </p>
            <p>
              Cada ficheiro passa por scan de segurança antes de ficar
              disponível. O publisher controla:
            </p>
            <List
              items={[
                "Número máximo de downloads (ou ilimitado)",
                "Data de expiração do link público",
              ]}
            />
            <p>
              Se o publisher eliminar o ficheiro ou cancelar a conta, o ficheiro
              sai do espaço público automaticamente.
            </p>
          </Section>

          <Section
            id="bots"
            eyebrow="Para utilizadores"
            title="Controlo via WhatsApp e Telegram"
          >
            <p>
              O bot do CloudBase está disponível no WhatsApp e no Telegram,
              permitindo controlar a plataforma sem abrir o browser. O bot
              interpreta linguagem natural.
            </p>
            <Code>{`[envia ficheiro]            →  guardado automaticamente, link devolvido
"partilhar relatorio.pdf"   →  link + código gerados na hora
"buscar contrato do João"   →  ficheiro encontrado por IA
"espaço usado"              →  relatório detalhado por provider
"organizar"                 →  automação executada imediatamente
"trocar backup.zip"         →  proposta de troca criada
"listar pasta Trabalho"     →  conteúdo da pasta devolvido`}</Code>
          </Section>

          <Section
            id="app"
            eyebrow="Aplicação"
            title="CloudBase App — Explorador Universal"
          >
            <p>
              A aplicação CloudBase pode ser instalada no computador (Windows,
              macOS, Linux) e no telemóvel (iOS, Android). Não é apenas um
              cliente da plataforma — é um explorador de ficheiros completo que
              une o teu dispositivo local com o ecossistema CloudBase.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              O que a aplicação permite fazer
            </h3>
            <p>
              <strong>Exploração de ficheiros locais e remotos</strong>
            </p>
            <p>
              A aplicação apresenta numa única interface os ficheiros do teu
              dispositivo e os ficheiros que tens no CloudBase. Podes navegar
              entre ambos sem distinção.
            </p>
            <p>
              <strong>Transferência via WiFi (rede local)</strong>
            </p>
            <p>
              Dispositivos na mesma rede WiFi detectam-se automaticamente via
              mDNS (
              <em>
                protocolo de descoberta local, o mesmo usado pelo AirDrop da
                Apple
              </em>
              ). A transferência é directa entre dispositivos, sem passar pela
              internet, com velocidades até 100 MB/s.
            </p>
            <p>
              <strong>Transferência via Bluetooth</strong>
            </p>
            <p>
              Suportado para ficheiros até 50 MB. Para ficheiros maiores, a
              aplicação recomenda automaticamente a transferência via WiFi.
            </p>
            <p>
              <strong>Redirecionamento de transferências recebidas</strong>
            </p>
            <p>
              Quando outro utilizador do CloudBase te envia um ficheiro, podes
              escolher para onde ele vai:
            </p>
            <Code>{`Opção A — Sistema automático do CloudBase
  O CloudBase decide o driver e pasta de destino
  com base nas tuas regras de automação

Opção B — Driver específico
  Tu escolhes qual dos teus drivers conectados
  vai receber o ficheiro

Opção C — Dispositivo local
  O ficheiro vai directamente para o teu computador
  ou telemóvel, sem passar pelos drivers cloud`}</Code>
            <p>
              <strong>Visualização de ficheiros do CloudBase</strong>
            </p>
            <p>
              Através da aplicação, podes visualizar imagens, reproduzir vídeos
              e áudios, ler PDFs, e ver o conteúdo de arquivos comprimidos
              directamente — sem download, sem abrir o browser.
            </p>
          </Section>

          <Section
            id="sdk"
            eyebrow="Developers"
            title="CloudBase para Developers"
          >
            <p>
              O CloudBase oferece um SDK e uma API REST para developers
              integrarem armazenamento inteligente nas suas aplicações, sem
              configurar cada provider separadamente.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Providers disponíveis no modo Developer
            </h3>
            <p>
              Além dos providers do modo utilizador, o modo developer acrescenta
              providers com <strong>URL pública directa</strong> — essencial
              para servir imagens, vídeos, e documentos em aplicações web:
            </p>
            <Table
              head={[
                "Provider",
                "Espaço gratuito",
                "URL pública directa",
                "Melhor para",
              ]}
              rows={[
                [
                  "Cloudinary",
                  "25 GB",
                  "Sim",
                  "Imagens e vídeo com transformações",
                ],
                [
                  "Supabase Storage",
                  "1 GB por projecto",
                  "Sim",
                  "Documentos e ficheiros gerais",
                ],
                [
                  "Firebase Storage",
                  "5 GB por projecto",
                  "Sim",
                  "Ficheiros estáticos",
                ],
                [
                  "ImageKit",
                  "20 GB",
                  "Sim",
                  "Imagens com optimização automática",
                ],
                [
                  "Backblaze B2",
                  "10 GB",
                  "Sim (via Cloudflare CDN)",
                  "Qualquer ficheiro, bandwidth gratuito",
                ],
              ]}
            />
            <Note>
              Múltiplos projectos por provider são suportados — cada projecto
              adicional aumenta o espaço total disponível.
            </Note>
            <h3 className="pt-2 text-foreground font-medium text-lg">
              Instalação
            </h3>
            <Code>{`npm install @cloudbase/sdk`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              Configuração
            </h3>
            <Code>{`import { CloudBase } from '@cloudbase/sdk'

const cb = new CloudBase({
  apiKey: 'cb_live_xxx',

  routing: {
    images:    { primary: 'imagekit',   fallback: 'cloudinary' },
    videos:    { primary: 'cloudinary', fallback: 'firebase'   },
    documents: { primary: 'supabase',   fallback: 'backblaze'  },
    generic:   { primary: 'backblaze',  fallback: 'firebase'   },
  },

  alerts: {
    bandwidthWarningAt: 80,   // alerta quando bandwidth atingir 80%
    webhookUrl: 'https://minha-app.com/webhooks/cloudbase',
  },
})`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              Operações principais
            </h3>
            <Code>{`// Upload — sistema escolhe provider automaticamente
const file = await cb.upload(myFile, { folder: 'produtos/imagens' })

// URL com expiração (para conteúdo privado)
const tempUrl = await cb.getSignedUrl(file.id, { expiresIn: '2h' })

// Eliminar
await cb.delete(file.id)

// Renomear
await cb.rename(file.id, 'novo-nome.jpg')

// Listar ficheiros numa pasta
const files = await cb.list({ folder: 'produtos/imagens' })

// Mover para outro provider
await cb.move(file.id, { toProvider: 'supabase' })`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              API REST (qualquer linguagem)
            </h3>
            <Code>{`# Upload
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
GET    https://api.cloudbase.app/v1/storage?folder=produtos`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              Routing inteligente — critérios em tempo real
            </h3>
            <Table
              head={["Factor", "Como afecta a decisão"]}
              rows={[
                [
                  "Tipo de ficheiro",
                  "Imagens e vídeos vão para providers com URL pública; ficheiros genéricos para providers com maior espaço",
                ],
                [
                  "Espaço disponível",
                  "Verificado em tempo real antes de cada upload",
                ],
                [
                  "Bandwidth restante",
                  "Providers próximos do limite mensal são evitados automaticamente",
                ],
                [
                  "Custo de acesso",
                  "Cloudinary cobra bandwidth por acesso — evitado para ficheiros de acesso intensivo",
                ],
                [
                  "Prioridade configurada",
                  "O developer define a ordem de preferência",
                ],
              ]}
            />
            <h3 className="pt-2 text-foreground font-medium text-lg">
              Regras por tipo de ficheiro no SDK
            </h3>
            <Table
              head={["Tipo", "Comportamento"]}
              rows={[
                [
                  "Imagem",
                  "Distribuição apenas — nunca fragmentada — URL directa obrigatória",
                ],
                ["Vídeo", "HLS se activado; URL directa se desactivado"],
                ["Áudio", "HLS se activado; URL directa se desactivado"],
                [
                  "Documento / PDF",
                  "Sem fragmentação por padrão; download directo",
                ],
                [
                  "ZIP / Arquivo",
                  "Fragmentação opcional com aviso explícito ao developer",
                ],
              ]}
            />
          </Section>

          <Section id="hls" eyebrow="Developers" title="HLS Streaming">
            <p>
              <em>
                HLS (HTTP Live Streaming) é a tecnologia usada pelo Netflix e
                pelo YouTube para entregar vídeo e áudio de forma progressiva —
                o utilizador começa a ver ou ouvir imediatamente, sem esperar
                que o ficheiro completo carregue.
              </em>
            </p>
            <p>
              <strong>
                Esta funcionalidade existe exclusivamente no modo developer.
              </strong>{" "}
              Os utilizadores comuns do CloudBase reproduzem vídeos directamente
              — o CloudBase trata da optimização internamente, sem necessidade
              de configuração.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Como funciona
            </h3>
            <p>Quando um vídeo ou áudio é enviado com HLS activado:</p>
            <List
              items={[
                "O CloudBase divide o ficheiro em segmentos de N segundos (padrão: 10s)",
                "Cada segmento é enviado para o provider com mais espaço disponível",
                "Se os segmentos não cabem num único provider, são distribuídos automaticamente por múltiplos providers",
                "É gerado um ficheiro de índice .m3u8 (playlist que indica ao player a URL de cada segmento, na ordem correcta)",
                "O player de vídeo pede os segmentos sequencialmente — o utilizador começa a reproduzir com apenas os primeiros segundos carregados",
              ]}
            />
            <Code>{`Resultado devolvido ao developer:
{
  id:          "abc123",
  type:        "hls",
  playlistUrl: "https://api.cloudbase.app/hls/abc123/playlist.m3u8"
}`}</Code>
            <h3 className="text-foreground font-medium text-lg">Activação</h3>
            <Code>{`// Por upload
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
const job = await cb.convertToHls(file.id)`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              Vantagem vs usar Cloudinary directamente
            </h3>
            <p>
              Ao usar Cloudinary directamente, a geração de HLS tem custos de
              processamento por transformação. No CloudBase, a segmentação é
              feita antes do upload — os segmentos chegam ao provider já
              prontos, sem custo adicional de processamento.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Quando usar HLS
            </h3>
            <Table
              head={["Situação", "Recomendação"]}
              rows={[
                ["Vídeos acima de 5 MB numa plataforma web", "Activar HLS"],
                ["Plataforma de streaming de áudio", "Activar HLS"],
                ["Vídeos pequenos para download directo", "HLS desnecessário"],
                ["Ficheiros de vídeo para uso interno", "HLS opcional"],
              ]}
            />
          </Section>

          <Section
            id="pools-dev"
            eyebrow="Developers"
            title="Space Pools para Developers"
          >
            <p>
              A funcionalidade de Space Pool está disponível no modo developer
              com uma diferença fundamental: os pools têm{" "}
              <strong>duração definida</strong>, alinhada com o ciclo de vida de
              um projecto.
            </p>
            <Code>{`Developer cria pool para um projecto:
  Nome:        "Projecto X — Fase de Desenvolvimento"
  Duração:     3 meses
  Membros:     equipa de desenvolvimento
  Contribuição: cada membro contribui com espaço próprio

Após 3 meses:
  → Notificação enviada a todos os membros com antecedência
  → Pool encerrado automaticamente na data definida
  → Todos os ficheiros removidos
  → Espaço de cada membro libertado`}</Code>
          </Section>

          <Section id="agent" eyebrow="Infraestrutura" title="CloudBase Agent">
            <p>
              O CloudBase Agent é uma aplicação leve que, quando instalada num
              servidor ou computador, o transforma num provider de armazenamento
              adicional dentro do CloudBase.
            </p>
            <h3 className="text-foreground font-medium text-lg">
              Onde pode ser instalado
            </h3>
            <List
              items={[
                "VPS (Virtual Private Server — servidor virtual na nuvem) — qualquer provider: Hetzner, DigitalOcean, Vultr, e outros",
                "Servidor dedicado — máquinas com centenas de GB disponíveis",
                "PC ou Mac — computador pessoal",
              ]}
            />
            <Note>
              Computadores pessoais e telemóveis não são recomendados para uso
              em Space Pools nem no modo developer, devido à instabilidade de
              conexão e latência variável. O Agent em dispositivos pessoais
              destina-se ao uso individual — receber transferências, ter um
              local de armazenamento pessoal adicional, e integrar o dispositivo
              na rede CloudBase pessoal do utilizador.
            </Note>
            <h3 className="pt-2 text-foreground font-medium text-lg">
              Instalação
            </h3>
            <Code>{`curl -sSL https://cloudbase.app/agent/install.sh | bash
cloudbase-agent connect --token SEU_TOKEN`}</Code>
            <h3 className="text-foreground font-medium text-lg">
              Redirecionamento de transferências
            </h3>
            <p>
              Quando recebes um ficheiro pelo CloudBase, podes escolher para
              qual dos teus dispositivos conectados ele vai — mesmo que estejas
              a usar um dispositivo diferente:
            </p>
            <Code>{`Estás no PC do escritório.
Recebes um ficheiro de 20 GB pelo CloudBase.

→ Seleccionas "Receber no PC em casa"
→ O Agent no PC em casa recebe o ficheiro directamente
→ O servidor do CloudBase nunca tocou nos dados
→ Quando chegares a casa, o ficheiro já está lá`}</Code>
          </Section>

          <Section
            id="pastas"
            eyebrow="Infraestrutura"
            title="Estrutura de Pastas nos Providers"
          >
            <p>
              Quando um provider é conectado ao CloudBase, a seguinte estrutura
              é criada automaticamente:
            </p>
            <Code>{`CloudBase/
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
    └── conteúdo normal organizado pelo utilizador ou pela automação`}</Code>
            <p>
              O utilizador é notificado sobre a importância destas pastas no
              momento de conectar cada provider, e novamente se o sistema
              detectar que foram eliminadas.
            </p>
          </Section>

          <Section
            id="planos"
            eyebrow="Infraestrutura"
            title="Monetização e Planos"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "Gratuito",
                  items: [
                    "Até 3 providers conectados",
                    "Motor de automação com regras padrão",
                    "Partilha com expiração de 24h",
                    "1 Space Pool com até 2 membros",
                    "Bot WhatsApp e Telegram básico",
                    "Visualização de ficheiros na plataforma",
                  ],
                },
                {
                  name: "Pro",
                  items: [
                    "Providers ilimitados",
                    "Motor de automação com regras personalizadas e criação por IA",
                    "Partilha permanente, com código, e QR Code",
                    "Space Pools ilimitados com configuração avançada",
                    "Dead Man's Switch",
                    "CloudBase Agent (VPS e PC)",
                    "CloudBase App com transferência WiFi e Bluetooth",
                    "IA completa (pesquisa semântica, resumo, classificação)",
                    "Prioridade no suporte",
                  ],
                },
                {
                  name: "Developer",
                  items: [
                    "Tudo do Plano Pro",
                    "API Keys e SDK npm (@cloudbase/sdk)",
                    "Providers com URL pública (Cloudinary, Supabase, Firebase, ImageKit, Backblaze B2)",
                    "HLS Streaming activável",
                    "Space Pools com duração definida para equipas",
                    "Dashboard de uso de bandwidth e storage por provider",
                    "Webhooks para eventos de upload, delete, e bandwidth",
                  ],
                },
              ].map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-hairline bg-surface p-5"
                >
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Plano
                  </div>
                  <h3 className="mt-1 font-display text-2xl text-foreground">
                    {p.name}
                  </h3>
                  <ul className="mt-4 space-y-2 text-[13.5px]">
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <h3 className="pt-2 text-foreground font-medium text-lg">
              Funcionalidades que serão sempre pagas
            </h3>
            <Table
              head={["Funcionalidade", "Razão"]}
              rows={[
                [
                  "CloudBase Agent",
                  "Infraestrutura de relay e coordenação entre dispositivos",
                ],
                [
                  "HLS Streaming",
                  "Processamento de segmentação de vídeo no momento do upload",
                ],
                [
                  "Dead Man's Switch",
                  "Sistema de notificações e agendamento de longo prazo",
                ],
                [
                  "SDK Developer com volume alto",
                  "Custo de requests à API e coordenação de providers",
                ],
                [
                  "Space Pools acima de 5 membros",
                  "Complexidade de coordenação e sistema de reputação",
                ],
              ]}
            />
          </Section>

          <Section id="futuro" eyebrow="Infraestrutura" title="Visão Futura">
            <p>
              <strong>Marketplace de Space</strong> — utilizadores com espaço
              excedente disponibilizam-no a outros dentro da plataforma, com o
              CloudBase a gerir a transacção e a garantir as regras de
              integridade.
            </p>
            <p>
              <strong>CloudBase Identity</strong> — sistema de identidade onde
              os dados do utilizador estão sempre nos seus próprios drives,
              independentemente de quantas plataformas usa. Os dados pertencem
              ao utilizador — não à plataforma.
            </p>
            <p>
              <strong>Integrações de terceiros como backup</strong> — API para
              plataformas externas usarem o CloudBase como camada de backup
              automático dos dados dos seus utilizadores. Se a plataforma
              encerrar, os dados continuam acessíveis ao utilizador no
              CloudBase.
            </p>
            <p>
              <strong>IA de análise de conteúdo</strong> — transcrição
              automática de áudios, OCR em imagens (
              <em>tecnologia que extrai texto de imagens</em>), indexação
              completa do conteúdo de PDFs, e pesquisa dentro do conteúdo dos
              ficheiros.
            </p>
          </Section>

          <Section id="contribuir" eyebrow="Infraestrutura" title="Contribuir">
            <p>
              O CloudBase é um projecto ambicioso. Se acreditas que o
              armazenamento pessoal e profissional pode ser radicalmente melhor
              do que o que existe hoje, e queres ajudar a construir algo que
              nunca foi feito desta forma, estás no sítio certo.
            </p>
            <p>
              <strong>Áreas onde a contribuição é mais necessária:</strong>
            </p>
            <List
              items={[
                "Adaptadores para novos providers de armazenamento",
                "CloudBase Agent (idealmente em Go ou Rust)",
                "SDK para linguagens além de JavaScript (Python, PHP, Go)",
                "Algoritmos de routing e fragmentação",
                "CloudBase App (mobile e desktop)",
                "Documentação técnica e testes",
              ]}
            />
            <div className="mt-8 rounded-xl border border-hairline bg-surface p-6 text-center space-y-2">
              <p className="font-display text-2xl text-foreground">
                O CloudBase já não é uma ferramenta de armazenamento.
              </p>
              <p className="text-sm text-muted-foreground">
                É a infraestrutura de dados que devias sempre ter tido.
              </p>
              <p className="text-sm font-medium text-foreground">
                Os teus ficheiros. Nos teus espaços. Sob o teu controlo.
              </p>
              <p className="mono pt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                CloudBase — Documentação v1.0
              </p>
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
