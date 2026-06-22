"use client";

import { PieChart, Activity, HardDrive, Smartphone, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalyticsBotPage() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-5xl mx-auto animate-fade-in h-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics & Integrations</h1>
        <p className="text-sm text-surface-300">Insights into your workspace and WhatsApp Bot setup.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Storage Analytics Mock */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PieChart size={18}/> Storage Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="h-48 w-48 rounded-full border-[16px] border-surface-100 border-t-primary-500 border-r-sky-500 border-b-blue-500 relative flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-bold">145</span>
                <span className="block text-xs text-surface-400">GB Total</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8 text-sm">
              <div className="flex items-center gap-2"><div className="h-3 w-3 bg-primary-500 rounded-full"/> Images</div>
              <div className="flex items-center gap-2"><div className="h-3 w-3 bg-sky-500 rounded-full"/> Video</div>
              <div className="flex items-center gap-2"><div className="h-3 w-3 bg-blue-500 rounded-full"/> Docs</div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Analytics Mock */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity size={18}/> Activity (30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-end justify-between gap-2 pt-8">
            {[40, 70, 45, 90, 65, 85, 100, 60, 40, 80].map((h, i) => (
              <div key={i} className="w-full bg-primary-100 rounded-t-sm relative group cursor-pointer hover:bg-primary-200" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h} Files
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* WhatsApp Bot Setup */}
        <Card className="md:col-span-2 border-primary-200 bg-primary-50/10">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="h-40 w-40 shrink-0 bg-white border border-surface-200 p-2 flex flex-col items-center justify-center gap-2 rounded-lg shadow-sm">
              <div className="h-24 w-24 bg-foreground/10 flex items-center justify-center text-xs text-surface-400">QR Code</div>
              <span className="text-xs font-mono font-medium">Scan to connect</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600"><MessageCircle size={24}/></div>
                <h3 className="text-xl font-bold tracking-tight">WhatsApp Bot is Active</h3>
              </div>
              <p className="text-surface-500 text-sm max-w-md">
                Your workspace is connected to WhatsApp. You can upload files, search, and manage your storage directly through chat.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-background border border-surface-200 text-xs font-mono rounded">/search invoice</span>
                <span className="px-3 py-1 bg-background border border-surface-200 text-xs font-mono rounded">/storage</span>
                <span className="px-3 py-1 bg-background border border-surface-200 text-xs font-mono rounded">/share logo.png</span>
              </div>
              <Button className="w-fit mt-2">View Command Reference</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
