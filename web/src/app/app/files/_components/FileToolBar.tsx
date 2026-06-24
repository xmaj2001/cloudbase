import { Button } from "@/components/ui/button";
import { ArrowDownUp, ChevronRight, Filter, LayoutGrid, ListIcon, Plus, UploadCloud } from "lucide-react";

interface FileToolBarProps {
    viewMode: "grid" | "list";
    setViewMode: (viewMode: "grid" | "list") => void;
}

export default function FileToolBar({ viewMode, setViewMode }: FileToolBarProps) {
    return (
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
    )
}