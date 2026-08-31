"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadModal } from "@/lib/upload/UploadModal";

interface ExplorerActionsProps {
  userId: string;
  folderId?: string | null;
}

export function ExplorerActions({ userId, folderId }: ExplorerActionsProps) {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setUploadOpen(true)}
        className="gap-2 text-xs font-medium"
        size="sm"
      >
        <Upload className="size-4" />
        Upload
      </Button>

      <UploadModal
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        userId={userId}
        parentId={folderId ?? null}
      />
    </>
  );
}
