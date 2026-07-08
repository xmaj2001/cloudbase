import { HeaderStorage } from "./_components/header";
import { Main } from "./_components/main";
import { StorageBar } from "./_components/StorageBar";

export default async function StoragePage() {
  return (
    <div className="p-8 space-y-8 max-w-350 m-auto">
      <HeaderStorage />
      <StorageBar />
      <Main />
    </div>
  );
}
