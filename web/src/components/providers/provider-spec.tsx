import type { DriverType } from "@/api/drivers/types";

export interface FieldSpec {
  name: string;
  label: string;
  helper?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  required: boolean;
}

export interface ProviderSpec {
  type: DriverType;
  name: string;
  tagline: string;
  authKind: "OAUTH" | "CREDENTIALS";
  freeQuotaGb: number | "unlimited" | "self-hosted";
  fields: FieldSpec[];
  video?: {
    url: string;
    title: string;
  };
  docs?: {
    excerpt: string[];
    url: string;
  };
}

export const providers: ProviderSpec[] = [
  {
    type: "GOOGLE_DRIVE",
    name: "Google Drive",
    tagline: "Armazenamento cloud pessoal ou de equipa.",
    authKind: "OAUTH",
    freeQuotaGb: 15,
    docs: {
      excerpt: [
        "Clica em autorizar.",
        "Faz login com a tua conta Google.",
        "Concede permissão de acesso ao CloudBase.",
      ],
      url: "https://docs.cloudbase.com/drivers/google-drive",
    },
    fields: [],
  },
  {
    type: "ONEDRIVE",
    name: "Microsoft OneDrive",
    tagline: "Armazenamento integrado com o ecossistema Microsoft Office.",
    authKind: "OAUTH",
    freeQuotaGb: 5,
    fields: [],
  },
  {
    type: "DROPBOX",
    name: "Dropbox",
    tagline: "Sincronização ágil e partilha de ficheiros profissionais.",
    authKind: "OAUTH",
    freeQuotaGb: 2,
    fields: [],
  },
  {
    type: "TELEGRAM",
    name: "Telegram Bot Storage",
    tagline: "Usa canais ou chats privados do Telegram como storage ilimitado.",
    authKind: "CREDENTIALS",
    freeQuotaGb: "unlimited",
    fields: [
      {
        name: "botToken",
        label: "Bot Token",
        placeholder: "123456:ABC-DEF...",
        type: "password",
        required: true,
        helper: "Obtido através do @BotFather no Telegram.",
      },
      {
        name: "chatId",
        label: "Chat ID ou Channel ID",
        placeholder: "-100xxxxxxxxx",
        required: true,
        helper: "ID do canal privado onde os ficheiros serão fragmentados.",
      },
    ],
  },
  {
    type: "CLOUDINARY",
    name: "Cloudinary",
    tagline: "Otimização, transformação e storage de imagens e vídeos.",
    authKind: "CREDENTIALS",
    freeQuotaGb: 25,
    fields: [
      {
        name: "cloudName",
        label: "Cloud Name",
        placeholder: "meu-cloud-name",
        required: true,
      },
      {
        name: "apiKey",
        label: "API Key",
        placeholder: "872xxxxxxxxxxx",
        required: true,
      },
      {
        name: "apiSecret",
        label: "API Secret",
        placeholder: "xxxx-xxxxx...",
        type: "password",
        required: true,
      },
    ],
  },
  {
    type: "MEGA",
    name: "MEGA NZ",
    tagline: "Armazenamento encriptado com zero-knowledge de fábrica.",
    authKind: "CREDENTIALS",
    freeQuotaGb: 20,
    fields: [
      {
        name: "accountEmail",
        label: "E-mail da Conta",
        placeholder: "user@example.com",
        required: true,
      },
      {
        name: "sessionToken",
        label: "Password / Session Token",
        type: "password",
        required: true,
      },
    ],
  },
  {
    type: "BOX",
    name: "Box.com",
    tagline: "Storage focado em governança de dados e segurança corporativa.",
    authKind: "OAUTH",
    freeQuotaGb: 10,
    fields: [],
  },
  {
    type: "PCLOUD",
    name: "pCloud",
    tagline: "Armazenamento seguro baseado na Suíça com criptografia forte.",
    authKind: "OAUTH",
    freeQuotaGb: 10,
    fields: [],
  },
  {
    type: "YANDEX",
    name: "Yandex Disk",
    tagline: "Cloud storage alternativo com sincronização rápida de fotos.",
    authKind: "OAUTH",
    freeQuotaGb: 10,
    fields: [],
  },
  {
    type: "VPS",
    name: "Servidor VPS Privado",
    tagline: "Conecta a tua VPS Linux usando o agente leve do CloudBase.",
    authKind: "CREDENTIALS",
    freeQuotaGb: "self-hosted",
    fields: [
      {
        name: "agentToken",
        label: "Agent Token",
        type: "password",
        required: true,
        helper: "Gerado ao rodar o script de instalação do agente na VPS.",
      },
      {
        name: "host",
        label: "IP ou Domínio (Host)",
        placeholder: "185.xxx.xx.x",
        required: false,
      },
      {
        name: "port",
        label: "Porta do Agente",
        placeholder: "8080",
        type: "number",
        required: false,
      },
    ],
  },
  {
    type: "LOCAL_MACHINE",
    name: "Máquina Local",
    tagline: "Usa o disco rígido sobressalente da tua própria máquina local.",
    authKind: "CREDENTIALS",
    freeQuotaGb: "self-hosted",
    fields: [
      {
        name: "agentToken",
        label: "Agent Token",
        type: "password",
        required: true,
      },
    ],
  },
];

export function findProvider(type: DriverType): ProviderSpec | undefined {
  return providers.find((p) => p.type === type);
}
