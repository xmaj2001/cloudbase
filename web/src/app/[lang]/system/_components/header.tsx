"use client";
import { useDriversSummary } from "@/api/drivers/hooks/use-drivers";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";


export function HeaderStorage() {
  const { data, isLoading } = useDriversSummary()
  if (isLoading) {
    return <HeaderStorageSkeleton />
  }
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl tracking-[-0.03em] font-medium"
      >
        Bem-vindo de volta.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-1.5 text-muted-foreground text-sm"
      >
        {data?.driversCount} drivers conectados
      </motion.p>
    </div>
  );
}

function HeaderStorageSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-48 rounded-md bg-surface-2 animate-pulse" />
      <Skeleton className="mt-1.5 h-4 w-64 rounded-md bg-surface-2 animate-pulse" />
    </div>
  );
}
