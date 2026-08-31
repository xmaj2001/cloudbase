import { nodeService } from "@/lib/features/nodes";
import GridViewNode from "./_components/GridViewNode";
import { getDictionary, Locale } from "../../dictionaries";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { requireSession } from "@/lib/features/core/require-session";
import { ExplorerActions } from "./_components/ExplorerActions";

interface ExplorePageProps {
  params: Promise<{ lang: Locale }>;
  searchParams?: Promise<{ folderId?: string }>;
}

export default async function ExplorePage({ params, searchParams }: ExplorePageProps) {
  const { lang } = await params;
  const { folderId } = (await searchParams) || {};

  const dict = await getDictionary(lang);
  const session = await requireSession(`/${lang}/system/explorer`);
  const nodes = await nodeService.listChildren(folderId || null);

  let currentFolder = null;
  if (folderId) {
    try {
      currentFolder = await nodeService.getNode(folderId);
    } catch (e) {
      console.error("Folder not found");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${lang}/system/explorer`}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {currentFolder && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentFolder.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <ExplorerActions userId={session.user.id} folderId={folderId} />
      </div>

      <GridViewNode nodes={nodes} dict={dict.explorer} />
    </div>
  );
}
