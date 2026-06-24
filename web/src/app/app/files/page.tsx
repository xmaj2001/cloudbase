"use client"
import { useNodes } from "@/hooks/use-nodes";
import { useState } from "react";
import FileToolBar from "./_components/FileToolBar";
import CardItemNode from "./_components/CardItemNode";
import { ItemNode } from "./_components/ItemNode";
import NodeDetailPanel from "./_components/NodeDetailPanel";
import { ApiNode } from "@/lib/api/node/types";

export default function FilesPage() {
  const { data: nodes, isLoading, error } = useNodes("e0edb4d6-8c2c-4178-94d1-35d4d7b9a782", null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<ApiNode | null>(null);
  return (
    <div className="flex h-full w-full bg-background animate-fade-in relative">
      <div className={`flex-1 flex flex-col p-4 md:p-8 transition-all duration-300 ${activeFile ? 'md:pr-[320px]' : ''}`}>
        {/* Toolbar */}
        <FileToolBar viewMode={viewMode} setViewMode={setViewMode} />

        {/* Content Area */}
        {
          isLoading ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div>
              <p>Error: {error.message}</p>
            </div>
          ) : nodes?.data && nodes.data.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {nodes.data.map((node) => {
                  const isSelected = selectedFiles.includes(node.id);
                  return <CardItemNode key={node.id} node={node} isSelected={isSelected} onNodeClick={setActiveFile} />
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
                {nodes.data.map((node) => {
                  const isSelected = selectedFiles.includes(node.id);
                  return <ItemNode
                    key={node.id}
                    node={node}
                    isSelected={isSelected}
                    onNodeClick={setActiveFile}
                  />
                })}
              </div>
            )
          ) : (
            <div>
              <p>No files found</p>
            </div>
          )
        }
      </div>

      {activeFile && <NodeDetailPanel node={activeFile} setActiveNode={setActiveFile} />}
    </div>
  );
}
