import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fmtBytes = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 ** 2) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1024 ** 3) return `${(b / 1024 ** 2).toFixed(1)} MB`;
  return `${(b / 1024 ** 3).toFixed(2)} GB`;
};

export const providers = [
  { name: "Google Drive", space: "15 GB / conta", best: "Documentos, qualquer formato" },
  { name: "OneDrive", space: "5 GB / conta", best: "Documentos, Office" },
  { name: "Telegram", space: "Ilimitado", best: "Ficheiros grandes, arquivos" },
  { name: "Cloudinary", space: "25 GB", best: "Imagens, vídeo optimizado" },
  { name: "MEGA", space: "20 GB", best: "Ficheiros encriptados" },
  { name: "Dropbox", space: "2 GB", best: "Colaboração" },
  { name: "Box", space: "10 GB", best: "Empresarial" },
  { name: "pCloud", space: "10 GB", best: "Media" },
  { name: "Yandex Disk", space: "10 GB", best: "Backup" },
  { name: "VPS própria", space: "Configurável", best: "Tudo, $5/mês" },
];

export const driveStack = [
  { name: "Google Drive A", val: 14.2, of: 15 },
  { name: "Google Drive B", val: 12.8, of: 15 },
  { name: "Google Drive C", val: 15.0, of: 15 },
  { name: "OneDrive", val: 4.9, of: 5 },
  { name: "MEGA", val: 19.7, of: 20 },
  { name: "Telegram", val: 999, of: 999, label: "ilimitado" },
  { name: "VPS Hetzner", val: 178, of: 200 },
];
