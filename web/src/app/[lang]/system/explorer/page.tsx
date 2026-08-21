import { nodeService } from "@/features/nodes";
import GridViewNode from "./_components/GridViewNode";

export default async function ExplorePage() {
  const nodes = await nodeService.listChildren();
  return (
    <div>
      <GridViewNode nodes={nodes} />
    </div>
  );
}
