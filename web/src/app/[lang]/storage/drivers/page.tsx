"use client";

import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";

import { DriversKpis } from "./_components/drivers-kpis";
import { DriverCard } from "./_components/driver-card";
import { ConnectDriverFab } from "./_components/connect-driver-fab";
import { useRouter } from "next/navigation";
import { useDrivers, useDriversSummary } from "@/api/drivers";

function bytesToGb(bytes: string | number | bigint | null | undefined): number {
  if (!bytes) return 0;
  return Number(bytes) / 1024 / 1024 / 1024;
}

export default function DriversPage() {
  const { data: drivers = [], isLoading: isDriversLoading } = useDrivers();
  const { data: driversSummary, isLoading: isDriversSummaryLoading } =
    useDriversSummary();
  const router = useRouter();
  if (isDriversLoading || isDriversSummaryLoading) {
    return (
      <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono">
          A carregar infraestrutura...
        </span>
      </div>
    );
  }
  const handleConnectDriver = () => {
    router.push("/storage/drivers/connect");
  };

  return (
    <main className="p-8 space-y-8 max-w-350 m-auto">
      <DriversKpis
        totalGb={bytesToGb(driversSummary?.totalGb)}
        usedGb={bytesToGb(driversSummary?.usedGb)}
        driversCount={driversSummary?.driversCount || 0}
        activeCount={driversSummary?.activeCount || 0}
      />

      {drivers.length === 0 ? (
        <div className="border border-dashed border-hairline rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <div className="text-sm font-medium">
            Nenhum driver ativo no teu cluster
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Conecta a tua Cloudinary, Google Drive ou Dropbox para começar.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {drivers.map((d, i) => (
            <DriverCard
              key={d.id}
              driver={d}
              index={i}
              driverTotal={d.space.totalSpace ?? 0}
              driverUsed={d.space.usedSpace ?? 0}
            />
          ))}
        </div>
      )}

      <ConnectDriverFab onClick={handleConnectDriver} />
    </main>
  );
}
