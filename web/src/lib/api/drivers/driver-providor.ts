import { LucideIcon, Cloud, MessageSquare, HardDrive, Server, Box } from "lucide-react";
import { DriverCredentials } from "./types";

export type DriverType = DriverCredentials['type'];

export interface FieldSpec {
  name: string;
  label: string;
  helper?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'number';
  required: boolean;
}

export interface ProviderSpec {
  type: DriverType;
  name: string;
  tagline: string;
  authKind: 'OAUTH' | 'CREDENTIALS';
  icon: LucideIcon;
  color: string;
  freeQuotaGb: string | number;
  docs?: {
    excerpt: string[];
    url: string;
  };
  video?: {
    title: string;
    url: string;
  };
  fields: FieldSpec[];
}

export const providers: ProviderSpec[] = [
  {
    type: 'GOOGLE_DRIVE',
    name: 'Google Drive',
    tagline: 'Armazenamento cloud pessoal ou business.',
    authKind: 'OAUTH',
    icon: Cloud,
    color: 'from-blue-500/10 to-green-500/10',
    freeQuotaGb: 15,
    docs: {
      excerpt: ['Clica em autorizar.', 'Faz login com a tua conta Google.', 'Concede permissão de acesso ao CloudBase.'],
      url: 'https://docs.cloudbase.com/drivers/google-drive'
    },
    fields: []
  },
  {
    type: 'ONEDRIVE',
    name: 'Microsoft OneDrive',
    tagline: 'Armazenamento integrado com o ecossistema Microsoft.',
    authKind: 'OAUTH',
    icon: Cloud,
    color: 'from-blue-600/10 to-sky-500/10',
    freeQuotaGb: 5,
    fields: []
  },
  {
    type: 'TELEGRAM',
    name: 'Telegram Bot Storage',
    tagline: 'Usa canais ou chats do Telegram como storage ilimitado.',
    authKind: 'CREDENTIALS',
    icon: MessageSquare,
    color: 'from-sky-400/10 to-blue-500/10',
    freeQuotaGb: 'unlimited',
    fields: [
      { name: 'botToken', label: 'Bot Token', placeholder: '123456:ABC-DEF...', type: 'password', required: true, helper: 'Obtido via @BotFather no Telegram.' },
      { name: 'chatId', label: 'Chat ID ou Channel ID', placeholder: '-100xxxxxxxxx', required: true, helper: 'ID do canal privado onde os ficheiros serão guardados.' }
    ]
  },
  {
    type: 'CLOUDINARY',
    name: 'Cloudinary',
    tagline: 'Otimização e storage de imagens e vídeos.',
    authKind: 'CREDENTIALS',
    icon: Box,
    color: 'from-orange-500/10 to-yellow-500/10',
    freeQuotaGb: 25,
    fields: [
      { name: 'cloudName', label: 'Cloud Name', placeholder: 'meu-cloud-name', required: true },
      { name: 'apiKey', label: 'API Key', placeholder: '872xxxxxxxxxxx', required: true },
      { name: 'apiSecret', label: 'API Secret', placeholder: 'xxxx-xxxxx...', type: 'password', required: true }
    ]
  },
  {
    type: 'MEGA',
    name: 'MEGA',
    tagline: 'Armazenamento encriptado end-to-end com boa quota gratuita.',
    authKind: 'CREDENTIALS',
    icon: HardDrive,
    color: 'from-red-500/10 to-pink-500/10',
    freeQuotaGb: 20,
    fields: [
      { name: 'accountEmail', label: 'E-mail da Conta', placeholder: 'user@example.com', required: true },
      { name: 'sessionToken', label: 'Session Token / Password', type: 'password', required: true }
    ]
  },
  {
    type: 'VPS',
    name: 'Servidor VPS Privado',
    tagline: 'Conecta o teu próprio servidor linux via CloudBase Agent.',
    authKind: 'CREDENTIALS',
    icon: Server,
    color: 'from-slate-500/10 to-zinc-500/10',
    freeQuotaGb: 'self-hosted',
    fields: [
      { name: 'agentToken', label: 'Agent Token', type: 'password', required: true, helper: 'Gerado durante a instalação do cloudbase-agent na máquina.' },
      { name: 'host', label: 'Host (IP ou Domínio)', placeholder: '192.168.1.X', required: false },
      { name: 'port', label: 'Porta do Agente', placeholder: '8080', type: 'number', required: false }
    ]
  }
];

export function findProvider(type: DriverType): ProviderSpec | undefined {
  return providers.find((p) => p.type === type);
}