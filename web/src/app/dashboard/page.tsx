"use client";

import { useState } from "react";
import { Search, Bell, Upload, Share2, Zap, Repeat, MoreVertical, FileText, FileImage, FileCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  if (isEmpty) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 text-center animate-fade-in md:min-h-screen">
        <div className="mb-8 flex h-48 w-48 items-center justify-center rounded-full border border-dashed border-surface-200 bg-surface-50">
          <div className="h-24 w-24 rounded-full bg-surface-100" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your space is empty</h2>
        <p className="mt-2 mb-6 max-w-sm text-surface-300">
          Connect your first cloud provider to begin aggregating and automating your files.
        </p>
        <Button onClick={() => setIsEmpty(false)}>Connect Provider</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-surface-200">
            {/* Avatar placeholder */}
            <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-700 font-bold">JD</div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Good morning, John</h1>
            <p className="text-sm text-surface-300">Here&apos;s what&apos;s happening in your workspace.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-300" size={16} />
            <Input className="pl-9 bg-surface-50 border-transparent focus-visible:border-primary-500" placeholder="Search files, folders..." />
          </div>
          <Button variant="secondary" size="icon" className="relative shrink-0">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </Button>
        </div>
      </header>

      {/* Storage & Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Storage Ring Card */}
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full">
            <div className="relative flex h-40 w-40 items-center justify-center mb-4">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--surface-100)" strokeWidth="12" />
                {/* Google Drive Segment */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="150" className="transition-all duration-1000" />
                {/* Telegram Segment */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="210" className="transition-all duration-1000 origin-center rotate-[144deg]" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-mono text-foreground">42</span>
                <span className="text-xs text-surface-300 uppercase tracking-wider">GB Used</span>
              </div>
            </div>
            <div className="flex w-full justify-between text-sm px-4">
              <div className="flex flex-col">
                <span className="text-surface-300">Available</span>
                <span className="font-bold font-mono">103 GB</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-surface-300">Total</span>
                <span className="font-bold font-mono">145 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Automation Status */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Upload, label: "Upload" },
              { icon: Share2, label: "Share" },
              { icon: Zap, label: "Organize" },
              { icon: Repeat, label: "Trade" },
            ].map((action) => (
              <Button key={action.label} variant="secondary" className="flex-col h-20 gap-2 border-surface-200 hover:border-primary-500 hover:text-primary-600 bg-surface-50">
                <action.icon size={20} />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>

          <Card className="flex-1">
            <CardContent className="p-6 flex items-center justify-between h-full">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Automations active</h3>
                  <p className="text-sm text-surface-300">12 files sorted today. Next run in 45m.</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View logs</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Files */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Recent Files</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Project_Proposal_v2.pdf", size: "2.4 MB", type: "pdf", provider: "gdrive", color: "bg-red-500" },
            { name: "Hero_Image_Final.png", size: "8.1 MB", type: "img", provider: "cloudinary", color: "bg-blue-500" },
            { name: "Q3_Financials.xlsx", size: "1.2 MB", type: "doc", provider: "onedrive", color: "bg-green-500" },
            { name: "Archive_backup.zip", size: "45 MB", type: "zip", provider: "telegram", color: "bg-sky-500" },
          ].map((file, i) => (
            <Card key={i} className="group cursor-pointer hover:border-primary-500 transition-colors">
              <CardContent className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className={`flex h-10 w-10 items-center justify-center rounded bg-surface-100 ${file.color} bg-opacity-10 text-${file.color.replace('bg-', '')}`}>
                    <FileText size={20} />
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={14} />
                  </Button>
                </div>
                <div>
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono text-surface-300">{file.size}</span>
                    <span className={`h-2 w-2 rounded-full ${file.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dev toggle */}
      <div className="flex justify-center mt-8">
        <Button variant="ghost" size="sm" onClick={() => setIsEmpty(!isEmpty)} className="text-xs text-surface-300">
          Toggle Empty State
        </Button>
      </div>
    </div>
  );
}
