export type PublicKind = "music" | "video" | "image" | "app" | "book" | "archive" | "game";

export type PublicFile = {
  id: string;
  title: string;
  author: string;
  kind: PublicKind;
  size: string;
  updatedAt: string;
  downloads: number;
  likes: number;
  cover?: string;
  description: string;
  tags: string[];
  driver: "GOOGLE_DRIVE" | "TELEGRAM" | "ONEDRIVE" | "MEGA" | "VPS";
  duration?: string; // music / video
  pages?: number; // book
  version?: string; // app / game
  platform?: string; // app / game
};

export const PUBLIC_FILTERS: { id: "all" | PublicKind; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "music", label: "Músicas" },
  { id: "video", label: "Vídeos" },
  { id: "image", label: "Imagens" },
  { id: "app", label: "Apps" },
  { id: "book", label: "Livros" },
  { id: "archive", label: "Arquivos" },
  { id: "game", label: "Jogos" },
];

export const PUBLIC_FILES: PublicFile[] = [
  {
    id: "mus-01",
    title: "Midnight Static",
    author: "Kaia Moreno",
    kind: "music",
    size: "8.2 MB",
    updatedAt: "2026-06-28",
    downloads: 1240,
    likes: 312,
    description: "Faixa ambiente lo-fi gravada em fita analógica. Ideal para foco profundo.",
    tags: ["lo-fi", "ambient", "instrumental"],
    driver: "TELEGRAM",
    duration: "3:42",
  },
  {
    id: "mus-02",
    title: "Anos de Ferro",
    author: "Trio Boreal",
    kind: "music",
    size: "12.6 MB",
    updatedAt: "2026-06-24",
    downloads: 820,
    likes: 190,
    description: "Álbum single acústico, mistura de folk português contemporâneo.",
    tags: ["folk", "acústico"],
    driver: "GOOGLE_DRIVE",
    duration: "5:11",
  },
  {
    id: "vid-01",
    title: "Fragmentos — Curta 4K",
    author: "Studio Norte",
    kind: "video",
    size: "412 MB",
    updatedAt: "2026-06-27",
    downloads: 502,
    likes: 178,
    description: "Curta-metragem sobre memória e cidade, filmada em Braga.",
    tags: ["curta", "4k", "português"],
    driver: "MEGA",
    duration: "12:04",
  },
  {
    id: "vid-02",
    title: "CloudBase — Demo pública",
    author: "Equipa CloudBase",
    kind: "video",
    size: "94 MB",
    updatedAt: "2026-06-30",
    downloads: 1902,
    likes: 640,
    description: "Passeio rápido pela arquitetura de fragmentação distribuída.",
    tags: ["demo", "produto"],
    driver: "GOOGLE_DRIVE",
    duration: "4:22",
  },
  {
    id: "img-01",
    title: "Costa Vicentina — Nascer do sol",
    author: "M. Freitas",
    kind: "image",
    size: "6.4 MB",
    updatedAt: "2026-06-20",
    downloads: 340,
    likes: 122,
    description: "Fotografia RAW convertida para JPEG. Licença CC-BY.",
    tags: ["fotografia", "paisagem", "cc-by"],
    driver: "ONEDRIVE",
  },
  {
    id: "img-02",
    title: "Ícones — Set monocromo",
    author: "Rita Alves",
    kind: "image",
    size: "1.1 MB",
    updatedAt: "2026-06-15",
    downloads: 2140,
    likes: 512,
    description: "Coleção de 120 ícones em SVG, grelha de 24px.",
    tags: ["svg", "design", "ui"],
    driver: "GOOGLE_DRIVE",
  },
  {
    id: "app-01",
    title: "Notas Mínimas",
    author: "Hugo Pinto",
    kind: "app",
    size: "28 MB",
    updatedAt: "2026-06-18",
    downloads: 1580,
    likes: 402,
    description: "App de notas offline, sem contas nem anúncios. Fonte aberta.",
    tags: ["notas", "offline", "open-source"],
    driver: "VPS",
    version: "1.4.2",
    platform: "macOS · Windows · Linux",
  },
  {
    id: "book-01",
    title: "Arquitetura de Sistemas Distribuídos",
    author: "Ana Coelho",
    kind: "book",
    size: "18 MB",
    updatedAt: "2026-06-12",
    downloads: 3120,
    likes: 902,
    description: "Manual prático sobre consistência, replicação e tolerância a falhas.",
    tags: ["engenharia", "pdf", "manual"],
    driver: "MEGA",
    pages: 342,
  },
  {
    id: "book-02",
    title: "Cartas do Norte",
    author: "J. Almeida",
    kind: "book",
    size: "3.4 MB",
    updatedAt: "2026-06-05",
    downloads: 780,
    likes: 210,
    description: "Romance epistolar ambientado em Trás-os-Montes.",
    tags: ["literatura", "ficção"],
    driver: "GOOGLE_DRIVE",
    pages: 218,
  },
  {
    id: "arc-01",
    title: "Preset Pack — Lightroom",
    author: "Estúdio Prisma",
    kind: "archive",
    size: "48 MB",
    updatedAt: "2026-06-08",
    downloads: 640,
    likes: 145,
    description: "40 presets para retrato e paisagem, formato XMP.",
    tags: ["presets", "lightroom", "zip"],
    driver: "TELEGRAM",
  },
  {
    id: "game-01",
    title: "Hex Runner",
    author: "Salt Studio",
    kind: "game",
    size: "142 MB",
    updatedAt: "2026-06-01",
    downloads: 4020,
    likes: 1240,
    description: "Jogo arcade minimalista de reflexos, controlo por dois botões.",
    tags: ["arcade", "indie"],
    driver: "MEGA",
    version: "2.0.1",
    platform: "Windows · Linux",
  },
];

export function getPublicFile(id: string) {
  return PUBLIC_FILES.find((f) => f.id === id);
}

export function relatedPublicFiles(file: PublicFile, limit = 4) {
  return PUBLIC_FILES.filter((f) => f.id !== file.id && f.kind === file.kind).slice(0, limit);
}
