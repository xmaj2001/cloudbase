import { nodeService } from "@/features/nodes";
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

interface ExplorePageProps {
  params: Promise<{ lang: Locale }>;
  searchParams?: Promise<{ folderId?: string }>;
}

export default async function ExplorePage({ params, searchParams }: ExplorePageProps) {
  const { lang } = await params;
  const { folderId } = (await searchParams) || {};
  
  const dict = await getDictionary(lang);
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
      <Breadcrumb className="mb-6">
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
      <GridViewNode nodes={nodes} dict={dict.explorer} />
    </div>
  );
}
