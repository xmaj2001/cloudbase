import {
  Archive,
  Code2,
  FileText,
  File,
  Film,
  ImageIcon,
  Music,
} from "lucide-react";

export const fmtSize = (b?: number | null) => {
  if (!b) return "—";
  const u = ["B", "KB", "MB", "GB", "TB"];
  let i = 0,
    n = b;
  while (n >= 1024 && i < u.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n >= 10 ? 0 : 1)} ${u[i]}`;
};

export const iconFor = (m?: string | null, type?: string) => {
  if (type === "FOLDER") return null;
  if (!m) return File;
  if (m.includes("pdf") || m.includes("text")) return FileText;
  if (m.startsWith("image")) return ImageIcon;
  if (m.startsWith("video")) return Film;
  if (m.startsWith("audio")) return Music;
  if (m.includes("zip") || m.includes("gzip")) return Archive;
  if (m.includes("typescript") || m.includes("javascript")) return Code2;
  return File;
};
