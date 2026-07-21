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
  { name: "Google Drive", space: "15 GB / conta", best: "Documentos, qualquer formato", publicUrl: false },
  { name: "OneDrive", space: "5 GB / conta", best: "Documentos, Office", publicUrl: false },
  { name: "Telegram", space: "Ilimitado", best: "Ficheiros grandes, arquivos", publicUrl: false },
  { name: "Cloudinary", space: "25 GB", best: "Imagens, vídeo optimizado", publicUrl: true },
  { name: "MEGA", space: "20 GB", best: "Encriptação end-to-end", publicUrl: false },
  { name: "Supabase Storage", space: "1 GB / projecto", best: "Apps web, APIs", publicUrl: true },
  { name: "Firebase Storage", space: "5 GB / projecto", best: "Apps mobile, realtime", publicUrl: true },
  { name: "ImageKit", space: "20 GB", best: "Imagens optimizadas", publicUrl: true },
  { name: "Backblaze B2", space: "10 GB", best: "Backup, CDN via Cloudflare", publicUrl: true },
  { name: "Dropbox", space: "2 GB", best: "Colaboração", publicUrl: false },
  { name: "Box", space: "10 GB", best: "Empresarial", publicUrl: false },
  { name: "pCloud", space: "10 GB", best: "Media", publicUrl: false },
  { name: "Yandex Disk", space: "10 GB", best: "Backup", publicUrl: false },
  { name: "VPS própria", space: "Configurável", best: "Tudo, via CloudBase Agent", publicUrl: true },
  { name: "Máquina local", space: "Espaço do disco", best: "Rede local, Agent", publicUrl: false },
];

export const driveStack = [
  { name: "Google Drive A", val: 14.2, of: 15 },
  { name: "Google Drive B", val: 12.8, of: 15 },
  { name: "Google Drive C", val: 15.0, of: 15 },
  { name: "OneDrive", val: 4.9, of: 5 },
  { name: "MEGA", val: 19.7, of: 20 },
  { name: "Cloudinary", val: 24.1, of: 25 },
  { name: "ImageKit", val: 18.5, of: 20 },
  { name: "Backblaze B2", val: 9.8, of: 10 },
  { name: "Telegram", val: 999, of: 999, label: "ilimitado" },
  { name: "VPS Hetzner", val: 178, of: 200 },
];
