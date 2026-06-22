"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HardDrive, Send, Image as ImageIcon, Cloud, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Provider = {
  id: string;
  name: string;
  icon: React.ElementType;
  space: number; // in GB
  color: string;
  connected: boolean;
};

export default function ConnectProvidersPage() {
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([
    { id: "gdrive", name: "Google Drive", icon: HardDrive, space: 15, color: "text-blue-500", connected: false },
    { id: "telegram", name: "Telegram", icon: Send, space: 100, color: "text-sky-500", connected: false },
    { id: "onedrive", name: "OneDrive", icon: Cloud, space: 5, color: "text-blue-600", connected: false },
    { id: "cloudinary", name: "Cloudinary", icon: ImageIcon, space: 25, color: "text-indigo-500", connected: false },
  ]);

  const totalSpaceUnlocked = providers.reduce((acc, p) => (p.connected ? acc + p.space : acc), 0);
  const potentialSpace = providers.reduce((acc, p) => acc + p.space, 0);
  const progressPercent = (totalSpaceUnlocked / potentialSpace) * 100;

  const toggleConnect = (id: string) => {
    setProviders(providers.map((p) => (p.id === id ? { ...p, connected: !p.connected } : p)));
  };

  const handleContinue = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto">
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-bold tracking-tight">Connect your clouds</h1>
        <p className="mt-2 text-sm text-surface-300">
          Unlock free storage by connecting your accounts.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between text-sm">
          <span className="font-medium text-foreground">Storage Unlocked</span>
          <span className="text-primary-600 font-bold">{totalSpaceUnlocked} GB</span>
        </div>
        <div className="h-2 w-full rounded-full bg-surface-100 overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {providers.map((provider) => (
          <Card key={provider.id} className={`transition-colors ${provider.connected ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : ''}`}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md bg-surface-100 ${provider.color}`}>
                  <provider.icon size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{provider.name}</h3>
                  <p className="text-xs text-surface-300">{provider.space} GB Free Space</p>
                </div>
              </div>
              
              <Button 
                variant={provider.connected ? "secondary" : "primary"}
                size="sm"
                onClick={() => toggleConnect(provider.id)}
                className="w-24"
              >
                {provider.connected ? (
                  <>
                    <Check size={14} className="mr-1" />
                    Added
                  </>
                ) : (
                  "Connect"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4 border-t border-surface-100">
        <Button 
          onClick={handleContinue} 
          className="w-full h-12 text-base gap-2"
        >
          {totalSpaceUnlocked > 0 ? "Continue to Dashboard" : "Skip for now"}
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
