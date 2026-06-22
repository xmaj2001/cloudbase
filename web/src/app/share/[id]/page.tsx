"use client";

import { useState } from "react";
import { Cloud, Lock, Download, ShieldCheck, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PublicSharePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // This page simulates `/share/[id]` public access.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 animate-fade-in">
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-500 text-white">
          <Cloud size={18} />
        </div>
        <span className="font-bold tracking-tight">CloudBase</span>
      </div>

      <div className="w-full max-w-md">
        <Card className="shadow-xl border-surface-200">
          <CardContent className="p-8 flex flex-col items-center text-center gap-6">
            
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-50 border border-surface-200 shadow-sm">
              <ShieldCheck size={36} className="text-primary-500" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">Q3_Financials.xlsx</h1>
              <p className="text-sm text-surface-400 mt-1">1.2 MB • Expires after 1 download</p>
            </div>

            {!isUnlocked ? (
              <div className="w-full flex flex-col gap-4 mt-2">
                <p className="text-sm font-medium">This is a Secure Transfer.</p>
                <div className="flex gap-2 justify-center">
                  {[1,2,3,4,5,6].map(i => (
                    <Input key={i} className="w-12 h-14 text-center text-xl font-bold rounded-lg border-surface-300" maxLength={1} placeholder="•" />
                  ))}
                </div>
                <Button className="w-full h-12 mt-2" onClick={() => setIsUnlocked(true)}>
                  Unlock File
                </Button>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4 mt-2 animate-fade-in">
                <div className="bg-green-50 text-green-700 border border-green-200 rounded p-3 text-sm">
                  Access granted. Transfer complete after download.
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <Button className="col-span-3 h-12 gap-2 text-base"><Download size={18} /> Download Now</Button>
                  <Button variant="secondary" className="col-span-1 h-12" size="icon"><QrCode size={18} /></Button>
                </div>
              </div>
            )}
            
          </CardContent>
        </Card>
      </div>
      
      <p className="mt-8 text-xs text-surface-300">
        Powered by CloudBase Secure Sharing
      </p>
    </div>
  );
}
