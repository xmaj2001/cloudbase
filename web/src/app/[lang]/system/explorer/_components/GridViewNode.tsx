"use client";

import { ApiNode } from "@/lib/features/nodes";
import GridItemNode from "./GridItemNode";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface GridViewNodeProps {
  nodes: ApiNode[];
  dict: {
    folders: string;
    files: string;
    noFiles: string;
  };
}

export default function GridViewNode({ nodes, dict }: GridViewNodeProps) {
  const folders = nodes.filter((n) => n.type === "FOLDER");
  const files = nodes.filter((n) => n.type === "FILE");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigate = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("folderId", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col space-y-8">
      {folders.length > 0 && (
        <section>
          <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
            {dict.folders}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {folders.map((n) => (
              <GridItemNode key={n.id} n={n} onNavigate={handleNavigate} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          {dict.files}
        </h2>
        {files.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {files.map((n) => (
              <GridItemNode key={n.id} n={n} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">{dict.noFiles}</p>
          </div>
        )}
      </section>
    </div>
  );
}

function GridViewNodeSession({ nodes, dict }: GridViewNodeProps) {
  return;
}
