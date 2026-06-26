"use client";

import { useState } from "react";
import { Link2, Clock, Download, X, Copy, Share2, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SharesPage() {
  const [activeTab, setActiveTab] = useState<"active" | "expired" | "transferred">("active");

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-5xl mx-auto animate-fade-in h-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sharing Manager</h1>
          <p className="text-sm text-surface-300">Manage your active links, secure transfers, and history.</p>
        </div>
        <Button className="gap-2">
          <Share2 size={16} /> New Share
        </Button>
      </div>

      <div className="flex items-center border-b border-surface-200">
        {(["active", "expired", "transferred"] as const).map(tab => (
          <button 
            key={tab}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? "border-primary-500 text-foreground" : "border-transparent text-surface-300 hover:text-foreground"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "active" && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 mb-2">
              <Input placeholder="Search shares..." className="max-w-xs bg-surface-50" />
            </div>

            <div className="border border-surface-200 rounded-[3px] bg-background overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-surface-100 text-xs font-semibold text-surface-400 uppercase tracking-wider hidden md:grid">
                <div className="col-span-4">File Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Expires In</div>
                <div className="col-span-2">Downloads</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {[
                { name: "Project_Proposal_v2.pdf", type: "Direct Link", expires: "23h 45m", downloads: "2/Unlimited", secure: false },
                { name: "Q3_Financials.xlsx", type: "Secure Transfer", expires: "After 1 DL", downloads: "0/1", secure: true },
                { name: "Hero_Image_Final.png", type: "Direct Link", expires: "6 days", downloads: "14/Unlimited", secure: true },
              ].map((share, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-surface-50 text-sm items-center hover:bg-surface-50">
                  <div className="col-span-1 md:col-span-4 font-medium truncate flex items-center gap-2">
                    {share.secure ? <EyeOff size={14} className="text-surface-400" /> : <Link2 size={14} className="text-primary-500" />}
                    {share.name}
                  </div>
                  <div className="col-span-1 md:col-span-2 text-surface-400 hidden md:block">
                    <span className={`px-2 py-1 rounded text-xs ${share.type === 'Secure Transfer' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : 'bg-surface-100 text-surface-500'}`}>
                      {share.type}
                    </span>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center gap-1 text-surface-400 hidden md:flex">
                    <Clock size={14} /> {share.expires}
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center gap-1 text-surface-400 hidden md:flex">
                    <Download size={14} /> {share.downloads}
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
                    <Button variant="secondary" size="sm" className="h-8 gap-2"><Copy size={14}/> <span className="hidden xl:inline">Copy</span></Button>
                    <Button variant="ghost" size="sm" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Revoke</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "active" && (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-50 text-surface-300">
              <Archive size={24} />
            </div>
            <h3 className="font-semibold">No {activeTab} shares</h3>
            <p className="text-sm text-surface-400 mt-1 max-w-sm">
              Shares that have expired or completed secure transfers will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Just importing Archive at the bottom for the empty state since it was missing above.
import { Archive } from "lucide-react";
