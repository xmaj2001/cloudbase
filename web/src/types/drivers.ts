import { ApiDriver } from "@/lib/api/drivers/types";
export type DriverDto = ApiDriver;

// ProviderType — espelho do enum do backend
export enum ProviderType {
  GOOGLE_DRIVE = "GOOGLE_DRIVE",
  ONEDRIVE = "ONEDRIVE",
  TELEGRAM = "TELEGRAM",
  CLOUDINARY = "CLOUDINARY",
  MEGA = "MEGA",
  DROPBOX = "DROPBOX",
  BOX = "BOX",
  PCLOUD = "PCLOUD",
  YANDEX = "YANDEX",
  VPS = "VPS",
  LOCAL_MACHINE = "LOCAL_MACHINE",
}

// Mapa de ícones/emojis por provider (usado nas cards de seleção)
export const PROVIDER_ICONS: Record<string, string> = {
  GOOGLE_DRIVE: "📁",
  ONEDRIVE: "☁️",
  TELEGRAM: "✈️",
  CLOUDINARY: "🌤️",
  MEGA: "🔷",
  DROPBOX: "📦",
  BOX: "🗃️",
  PCLOUD: "🌥️",
  YANDEX: "🔴",
  VPS: "🖥️",
  LOCAL_MACHINE: "💻",
};

export const PROVIDER_LABELS: Record<string, string> = {
  GOOGLE_DRIVE: "Google Drive",
  ONEDRIVE: "OneDrive",
  TELEGRAM: "Telegram",
  CLOUDINARY: "Cloudinary",
  MEGA: "MEGA",
  DROPBOX: "Dropbox",
  BOX: "Box",
  PCLOUD: "pCloud",
  YANDEX: "Yandex Disk",
  VPS: "VPS",
  LOCAL_MACHINE: "Máquina Local",
};
