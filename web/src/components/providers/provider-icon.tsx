"use client";

import type { IconType } from "react-icons";
import {
  SiGoogledrive,
  SiTelegram,
  SiMega, // idem
  SiCloudinary,
  SiDropbox,
  SiBox,
  SiYandexcloud, // idem — pode ser SiYandexdisk
} from "react-icons/si";
import { DiOnedrive } from "react-icons/di";
import { SiUpcloud } from "react-icons/si";
import { Cloud, HardDrive, Laptop } from "lucide-react";
import type { DriverType } from "@/api/drivers/types";

const DRIVER_ICON_MAP: Record<DriverType, IconType> = {
  GOOGLE_DRIVE: SiGoogledrive,
  ONEDRIVE: DiOnedrive,
  TELEGRAM: SiTelegram,
  MEGA: SiMega,
  CLOUDINARY: SiCloudinary,
  DROPBOX: SiDropbox,
  BOX: SiBox,
  PCLOUD: SiUpcloud,
  YANDEX: SiYandexcloud,
  VPS: HardDrive,
  LOCAL_MACHINE: Laptop,
};

const DRIVER_COLOR_MAP: Partial<Record<DriverType, string>> = {
  GOOGLE_DRIVE: "#0F9D58",
  ONEDRIVE: "#0078D4",
  TELEGRAM: "#26A5E4",
  MEGA: "#D9272E",
  CLOUDINARY: "#3448C5",
  DROPBOX: "#0061FF",
  BOX: "#0061D5",
  PCLOUD: "#4998FF",
  YANDEX: "#FC3F1D",
};

export function ProviderIcon({
  type,
  className,
}: {
  type: DriverType;
  className?: string;
}) {
  const Icon = DRIVER_ICON_MAP[type];
  return (
    <Icon
      className={className}
      style={{ color: DRIVER_COLOR_MAP[type] ?? "currentColor" }}
    />
  );
}
