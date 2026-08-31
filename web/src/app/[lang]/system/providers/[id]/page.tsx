import { getDictionary, Locale } from "../../../dictionaries";
import { providerService } from "@/lib/features/providers/provider.service";
import { ProviderHeroCard } from "../_components/provider-hero-card";
import { ProviderMetrics } from "../_components/provider-metrics";
import { ProviderActivity } from "../_components/provider-activity";
import { ProviderSidebarDetails } from "../_components/provider-sidebar-details";
import { ProviderActions } from "../_components/provider-actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProviderDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  const pDict = dict.providers;

  let provider = null;
  try {
    provider = await providerService.getProviderById(id);
  } catch (error) {
    // Se o provider não for encontrado (404), provider continuará null
    console.error("ProviderDetail: Erro ao buscar provider", error);
  }

  if (!provider) {
    return (
      <main className="flex-1 px-8 py-8">
        <div className="border border-dashed border-hairline rounded-2xl p-12 text-center">
          <div className="text-sm font-medium">{pDict?.notFound || "Provider não encontrado"}</div>
          <div className="text-xs text-muted-foreground mt-1 mb-4">
            {pDict?.notFoundDesc || "A infraestrutura com o ID especificado não existe ou foi removida."}
          </div>
          <Link
            href="/system/providers"
            className="inline-flex h-9 px-4 items-center rounded-full bg-foreground text-background text-[12px] font-medium"
          >
            {pDict?.backToProviders || "Voltar aos providers"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="w-full relative">
      {/* Header com os botões de controle direto */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-4">
        <div>
          <Link
            href="/system/providers"
            className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="size-3.5" /> {pDict?.allProviders || "Todos os providers"}
          </Link>
        </div>
        <ProviderActions providerId={provider.id} dict={pDict} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <ProviderHeroCard
            provider={provider}
            providerUsed={Number(provider.usedSpace ?? 0)}
            providerTotal={Number(provider.totalSpace ?? 0)}
            dict={pDict}
          />
          <ProviderMetrics dict={pDict} />
          <ProviderActivity dict={pDict} />
        </div>

        <ProviderSidebarDetails provider={provider} dict={pDict} />
      </div>
    </div>
  );
}
