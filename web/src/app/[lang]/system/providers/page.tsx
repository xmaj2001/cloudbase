import { ProvidersKpis } from "./_components/providers-kpis";
import { ProviderCard } from "./_components/provider-card";
import { ConnectProviderFab } from "./_components/connect-provider-fab";
import { providerService } from "@/lib/features/providers/provider.service";
import { getDictionary } from "../../dictionaries";

export default async function ProvidersPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  
  const providers = await providerService.getProviders();
  
  let totalBytes = 0;
  let usedBytes = 0;
  let activeCount = 0;

  providers.forEach(p => {
    totalBytes += Number(p.totalSpace ?? 0);
    usedBytes += Number(p.usedSpace ?? 0);
    if (p.isActive) activeCount++;
  });

  const totalGb = totalBytes / (1024 * 1024 * 1024);
  const usedGb = usedBytes / (1024 * 1024 * 1024);

  return (
    <div className="w-full relative">
      <div className="mb-6 mt-4">
        <h1 className="text-3xl font-bold tracking-tight">{dict.providers?.allProviders || "Todos os providers"}</h1>
      </div>

      <ProvidersKpis
        totalGb={totalGb}
        usedGb={usedGb}
        providersCount={providers.length}
        activeCount={activeCount}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {providers.map((p, index) => (
          <ProviderCard 
            key={p.id} 
            provider={p} 
            index={index} 
            providerTotal={Number(p.totalSpace ?? 0)} 
            providerUsed={Number(p.usedSpace ?? 0)} 
          />
        ))}
        {providers.length === 0 && (
          <div className="col-span-full py-12 text-center text-[13px] text-muted-foreground border border-dashed border-hairline rounded-2xl">
            Nenhum provider conectado.
          </div>
        )}
      </div>

      <ConnectProviderFab dict={dict.providers} />
    </div>
  );
}
