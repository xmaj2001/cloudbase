"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, RefreshCw, Pause, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useDriverMutations, useDrivers } from "@/hooks/use-drivers";
import { driverIcon } from "@/lib/utils/driver";

import { DriverHeroCard } from "../_components/driver-hero-card";
import { DriverMetrics } from "../_components/driver-metrics";
import { DriverActivity } from "../_components/driver-activity";
import { DriverSidebarDetails } from "../_components/driver-sidebar-details";
import { useState } from "react";

function bytesToGb(bytes: string | number | bigint | null | undefined): number {
  if (!bytes) return 0;
  return Number(bytes) / 1024 / 1024 / 1024;
}

export default function DriverDetailPage() {
  const params = useParams();
  const driverId = params.id as string;

  const { userId, isLoading: isUserLoading } = useUser();
  const { sync } = useDriverMutations(userId ?? "");
  const [isLoadingSync, setIsLoadingSync] = useState(false);
  const { data: drivers = [], isLoading: isDriversLoading } = useDrivers(
    userId ?? "",
  );

  const handleSyncDriver = async () => {
    if (!driverId) return;
    setIsLoadingSync(true);
    await sync.mutateAsync(driverId, {
      onSuccess: (updatedDriver) => {
        setIsLoadingSync(false);
        console.log("Driver sincronizado com sucesso:", updatedDriver);
      },
      onError: (error) => {
        setIsLoadingSync(false);
        console.error("Erro ao sincronizar o driver:", error);
      },
    });
    setIsLoadingSync(false);
  };
  const driver = drivers.find((d) => d.id === driverId);

  if (isUserLoading || isDriversLoading) {
    return (
      <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono">
          A carregar metadados do driver...
        </span>
      </div>
    );
  }

  if (!driver) {
    return (
      <main className="flex-1 px-8 py-8">
        <div className="border border-dashed border-hairline rounded-2xl p-12 text-center">
          <div className="text-sm font-medium">Driver não encontrado</div>
          <div className="text-xs text-muted-foreground mt-1 mb-4">
            A infraestrutura com o ID especificado não existe ou foi removida.
          </div>
          <Link
            href="/storage/drivers"
            className="inline-flex h-9 px-4 items-center rounded-full bg-foreground text-background text-[12px] font-medium"
          >
            Voltar aos drivers
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 space-y-8 max-w-350 m-auto">
      {/* Header com os botões de controle direto */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            href="/storage/drivers"
            className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="size-3.5" /> Todos os drivers
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncDriver}
            disabled={isLoadingSync}
            className={`inline-flex items-center gap-2 h-9 px-3 rounded-full border border-hairline text-[12px] hover:border-foreground transition font-medium bg-background ${isLoadingSync ? "invert" : ""}`}
          >
            <RefreshCw
              className={`size-3.5 ${isLoadingSync ? "animate-spin" : ""}`}
            />{" "}
            Sincronizar
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-hairline text-[12px] hover:border-foreground transition font-medium bg-background">
            <Pause className="size-3.5" /> Pausar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <DriverHeroCard
            driver={driver}
            icon={driverIcon(driver)}
            driverUsed={bytesToGb(driver.space?.usedSpace)}
            driverTotal={bytesToGb(driver.space?.totalSpace)}
          />
          <DriverMetrics />
          <DriverActivity />
        </div>

        <DriverSidebarDetails driver={driver} />
      </div>
    </main>
  );
}
