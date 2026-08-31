import { NodeType } from "@/lib/features/nodes";
import {
  Archive,
  FileText,
  FolderIcon,
  GroupIcon,
  ImageIcon,
  LucideIcon,
  MoreVertical,
  Video,
} from "lucide-react";

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return <FolderIcon size={24} className="text-surface-400" />;
    case "video":
      return <Video size={24} className="text-surface-400" />;
    case "archive":
      return <Archive size={24} className="text-surface-400" />;
    case "img":
      return <ImageIcon size={24} className="text-surface-400" />;
    default:
      return <FileText size={24} className="text-surface-400" />;
  }
};

export const getNodeIcon = (type: NodeType) => {
  switch (type) {
    case "FOLDER":
      return FolderIcon;
    case "FILE":
      return Archive;
    default:
      return FileText;
  }
};

export const getProviderColor = (providerName: string) => {
  switch (providerName) {
    case "google-drive":
      return "bg-blue-500";
    case "dropbox":
      return "bg-green-500";
    case "onedrive":
      return "bg-red-500";
    case "icloud":
      return "bg-purple-500";
    case "box":
      return "bg-blue-500";
    case "pcloud":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};
