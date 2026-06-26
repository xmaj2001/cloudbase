"use client";

import { useState } from "react";
import {
  Folder as FolderIcon, FileText, Image as ImageIcon, Video, Archive,
  LayoutGrid, List as ListIcon, Plus, UploadCloud, ChevronRight,
  Filter, ArrowDownUp, MoreVertical, X, Share2, Download, Trash2, ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock data
const mockFiles = [
  { id: "1", name: "Design_Assets", type: "folder", size: "2.4 GB", date: "Oct 12, 2026", provider: "gdrive", providerColor: "bg-blue-500" },
  { id: "2", name: "Q4_Financials.xlsx", type: "doc", size: "1.2 MB", date: "Today, 09:41", provider: "onedrive", providerColor: "bg-blue-600" },
  { id: "3", name: "Hero_Video_Final.mp4", type: "video", size: "245 MB", date: "Yesterday", provider: "telegram", providerColor: "bg-sky-500" },
  { id: "4", name: "Brand_Guidelines.pdf", type: "doc", size: "4.5 MB", date: "Oct 10, 2026", provider: "gdrive", providerColor: "bg-blue-500" },
  { id: "5", name: "Product_Shots.zip", type: "archive", size: "1.8 GB", date: "Oct 08, 2026", provider: "cloudinary", providerColor: "bg-indigo-500" },
  { id: "6", name: "Logo_Pack", type: "folder", size: "45 MB", date: "Sep 28, 2026", provider: "onedrive", providerColor: "bg-blue-600" },
];

export default function FilesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<any | null>(null);

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFiles(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "folder": return <FolderIcon size={24} className="text-surface-400" />;
      case "video": return <Video size={24} className="text-surface-400" />;
      case "archive": return <Archive size={24} className="text-surface-400" />;
      case "img": return <ImageIcon size={24} className="text-surface-400" />;
      default: return <FileText size={24} className="text-surface-400" />;
    }
  };

  return (
    <div className="flex h-full w-full bg-background animate-fade-in relative">
      <div className={`flex-1 flex flex-col p-4 md:p-8 transition-all duration-300 ${activeFile ? 'md:pr-[320px]' : ''}`}>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center text-sm font-medium text-surface-300">
            <span className="hover:text-foreground cursor-pointer transition-colors">My Files</span>
            <ChevronRight size={16} className="mx-1" />
            <span className="text-foreground">Current Folder</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <div className="flex bg-surface-50 border border-surface-200 rounded-[3px] p-0.5">
              <Button variant={viewMode === "grid" ? "primary" : "ghost"} size="icon" className="h-7 w-7" onClick={() => setViewMode("grid")}>
                <LayoutGrid size={14} />
              </Button>
              <Button variant={viewMode === "list" ? "primary" : "ghost"} size="icon" className="h-7 w-7" onClick={() => setViewMode("list")}>
                <ListIcon size={14} />
              </Button>
            </div>
            <div className="h-6 w-px bg-surface-200 mx-1 hidden md:block" />
            <Button variant="secondary" size="sm" className="hidden md:flex gap-2">
              <Filter size={14} /> Filter
            </Button>
            <Button variant="secondary" size="sm" className="hidden md:flex gap-2">
              <ArrowDownUp size={14} /> Sort
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <Plus size={14} /> New Folder
            </Button>
            <Button size="sm" className="gap-2 shrink-0">
              <UploadCloud size={14} /> Upload
            </Button>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockFiles.map((file) => {
              const isSelected = selectedFiles.includes(file.id);
              return (
                <Card
                  key={file.id}
                  className={`cursor-pointer transition-colors group relative ${isSelected ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : 'hover:border-surface-300'}`}
                  onClick={() => setActiveFile(file)}
                >
                  {/* Selection Checkbox overlay */}
                  <div
                    className={`absolute top-2 left-2 z-10 h-5 w-5 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-primary-500 border-primary-500 text-white' : 'border-surface-300 bg-background opacity-0 group-hover:opacity-100'}`}
                    onClick={(e) => toggleSelection(file.id, e)}
                  >
                    {isSelected && <CheckCircle2 size={12} />}
                  </div>

                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-surface-50">
                        {getIcon(file.type)}
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-mono text-surface-300">{file.size}</span>
                        <div className={`h-2 w-2 rounded-full ${file.providerColor}`} title={file.provider} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-surface-300 border-b border-surface-100 hidden md:grid">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-3">Modified</div>
              <div className="col-span-1 text-right">Provider</div>
            </div>
            {mockFiles.map((file) => {
              const isSelected = selectedFiles.includes(file.id);
              return (
                <div
                  key={file.id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-3 items-center rounded-[3px] cursor-pointer transition-colors border border-transparent ${isSelected ? 'bg-primary-50/50 border-primary-200 dark:bg-primary-900/10' : 'hover:bg-surface-50'}`}
                  onClick={() => setActiveFile(file)}
                >
                  <div className="col-span-1 md:col-span-6 flex items-center gap-3">
                    <div
                      className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all ${isSelected ? 'bg-primary-500 border-primary-500 text-white' : 'border-surface-300 bg-background'}`}
                      onClick={(e) => toggleSelection(file.id, e)}
                    >
                      {isSelected && <CheckCircle2 size={10} />}
                    </div>
                    {getIcon(file.type)}
                    <span className="text-sm font-medium truncate">{file.name}</span>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-xs font-mono text-surface-400 hidden md:block">{file.size}</div>
                  <div className="col-span-1 md:col-span-3 text-xs text-surface-400 hidden md:block">{file.date}</div>
                  <div className="col-span-1 md:col-span-1 flex justify-end hidden md:flex">
                    <div className={`h-2 w-2 rounded-full ${file.providerColor}`} title={file.provider} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Panel (Desktop Right Side, Mobile Bottom Sheet) */}
      {activeFile && (
        <div className="fixed inset-y-0 right-0 w-full max-w-[320px] border-l border-surface-200 bg-background shadow-2xl z-40 transform transition-transform animate-fade-in md:static md:shadow-none flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-surface-200">
            <h3 className="font-semibold tracking-tight">Details</h3>
            <Button variant="ghost" size="icon" onClick={() => setActiveFile(null)}>
              <X size={16} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center text-center mb-8 gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-surface-50 border border-surface-200">
                {getIcon(activeFile.type)}
              </div>
              <div>
                <h4 className="font-semibold break-all">{activeFile.name}</h4>
                <p className="text-xs text-surface-300 mt-1">{activeFile.size} • {activeFile.type.toUpperCase()}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm mb-8">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-surface-300">Provider</span>
                <span className="col-span-2 flex items-center gap-2 font-medium capitalize">
                  <div className={`h-2 w-2 rounded-full ${activeFile.providerColor}`} />
                  {activeFile.provider}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-surface-300">Modified</span>
                <span className="col-span-2">{activeFile.date}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-surface-300">Hash</span>
                <span className="col-span-2 font-mono text-xs text-surface-400 break-all">a8f4c2...9b1</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" className="gap-2"><Share2 size={14} /> Share</Button>
              <Button variant="secondary" className="gap-2"><Download size={14} /> Download</Button>
              <Button variant="secondary" className="gap-2 col-span-2"><ShieldCheck size={14} /> Verify Trade</Button>
              <Button variant="destructive" className="gap-2 col-span-2"><Trash2 size={14} /> Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Selection Bottom Bar */}
      {selectedFiles.length > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-[3px] bg-foreground px-6 py-4 text-background shadow-xl md:bottom-8 animate-fade-in">
          <div className="flex items-center gap-2 border-r border-surface-300/30 pr-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
              {selectedFiles.length}
            </span>
            <span className="text-sm font-medium">Selected</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-background hover:bg-surface-300/20 hover:text-white">Move</Button>
            <Button variant="ghost" size="sm" className="text-background hover:bg-surface-300/20 hover:text-white">Share</Button>
            <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/20 hover:text-red-300">Delete</Button>
          </div>
          <Button variant="ghost" size="icon" className="text-surface-300 hover:text-white ml-2" onClick={() => setSelectedFiles([])}>
            <X size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
