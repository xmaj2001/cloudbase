"use client";

import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useDrivers } from "@/hooks/use-drivers";
import { driverIcon } from "@/lib/utils/driver";

import { DriversKpis } from "./_components/drivers-kpis";
import { DriverCard } from "./_components/driver-card";
import { ConnectDriverFab } from "./_components/connect-driver-fab";
import { TopbarStorage } from "@/components/dashboad/Topbar";
import { useRouter } from "next/navigation";

function bytesToGb(bytes: string | number | bigint | null | undefined): number {
  if (!bytes) return 0;
  return Number(bytes) / 1024 / 1024 / 1024;
}

export default function DriversPage() {
  const { userId, isLoading: isUserLoading } = useUser();
  const { data: drivers = [], isLoading: isDriversLoading } = useDrivers(
    userId ?? "",
  );
  const router = useRouter();
  if (isUserLoading || isDriversLoading) {
    return (
      <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono">
          A carregar infraestrutura...
        </span>
      </div>
    );
  }
  // 
  const handleConnectDriver = () => {
    router.push("/storage/drivers/connect");
  }

  // Cálculos consolidados para os KPIs
  const totalGb = drivers
    .map((d) => bytesToGb(d.space.totalSpace))
    .reduce((a, b) => a + b, 0);
  const usedGb = drivers
    .map((d) => bytesToGb(d.space.usedSpace))
    .reduce((a, b) => a + b, 0);
  const activeCount = drivers.filter(
    (d) => d.status === "ACTIVE" || d.status === "SYNCING",
  ).length;

  return (
    <main className="p-8 space-y-8 max-w-350 m-auto">
      {/* 📊 KPIs Modulares */}
      <DriversKpis
        totalGb={totalGb}
        usedGb={usedGb}
        driversCount={drivers.length}
        activeCount={activeCount}
      />

      {/* 🗂️ Renderização da Grid de Drivers */}
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
              icon={driverIcon(d)}
              driverTotal={bytesToGb(d.space.totalSpace)}
              driverUsed={bytesToGb(d.space.usedSpace)}
            />
          ))}
        </div>
      )}

      <ConnectDriverFab onClick={handleConnectDriver} />
    </main>
  );
}
