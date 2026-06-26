import { Button } from "@/components/ui/button";
import { ArrowDownUp, ChevronRight, Filter, LayoutGrid, ListIcon, Plus, UploadCloud } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

interface NodeToolBarProps {
    viewMode: "grid" | "list";
    setViewMode: (viewMode: "grid" | "list") => void;
    breadcrumb?: string[];
    onUploadClick?: () => void;
    onNewFolderClick?: () => void;
}

export default function NodeToolBar({ viewMode, setViewMode, breadcrumb, onUploadClick, onNewFolderClick }: NodeToolBarProps) {
    return (
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">

            {
                breadcrumb && breadcrumb.length > 0 && (
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumb.map((item, index) => (
                                <div key={index} className="flex items-center gap-1.5 sm:gap-2.5">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </div>
                            ))}
                            <BreadcrumbItem>
                                <BreadcrumbPage>{breadcrumb[breadcrumb.length - 1]}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                )
            }

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <div className="flex bg-surface-50 border border-surface-200 rounded-[3px] p-0.5">
                    <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" className="h-7 w-7" onClick={() => setViewMode("grid")}>
                        <LayoutGrid size={14} />
                    </Button>
                    <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" className="h-7 w-7" onClick={() => setViewMode("list")}>
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
                <Button variant="secondary" size="sm" className="gap-2" onClick={onNewFolderClick}>
                    <Plus size={14} /> New Folder
                </Button>
                <Button size="sm" className="gap-2 shrink-0" onClick={onUploadClick}>
                    <UploadCloud size={14} /> Upload
                </Button>
            </div>
        </div>
    )
}