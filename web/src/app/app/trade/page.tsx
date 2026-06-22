"use client";

import { useState } from "react";
import { Search, Repeat, Plus, Star, ArrowRight, ShieldCheck, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TradeHubPage() {
  const [activeTab, setActiveTab] = useState<"discover" | "my_offers" | "incoming" | "history">("discover");
  const [isCreatingTrade, setIsCreatingTrade] = useState(false);
  const [isViewingTrade, setIsViewingTrade] = useState(false);

  // Mocks
  const trades = [
    { id: 1, offer: "Design_System_UI_Kit.fig", wanted: "Framer Motion Templates", user: "alex_design", rep: 4.9, trades: 124 },
    { id: 2, offer: "React_Native_Boilerplate.zip", wanted: "Python Trading Bot Script", user: "dev_master", rep: 4.7, trades: 89 },
    { id: 3, offer: "High_Res_Nature_Photos.zip", wanted: "Cinematic LUTs pack", user: "photo_pro", rep: 5.0, trades: 12 },
  ];

  if (isCreatingTrade) {
    return (
      <div className="flex flex-col gap-6 p-6 md:p-8 max-w-3xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create Trade Offer</h1>
            <p className="text-sm text-surface-300">Offer a file in exchange for something you need.</p>
          </div>
          <Button variant="ghost" onClick={() => setIsCreatingTrade(false)}>Cancel</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">1. What you offer</h3>
            <Card className="border-primary-500 bg-primary-50/20">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <Plus size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-primary-700 dark:text-primary-400">Select File from Drive</h4>
                  <p className="text-xs text-surface-400 mt-1">Integrity card will be auto-generated</p>
                </div>
                <Button variant="secondary" size="sm" className="mt-2">Browse Files</Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">2. What you want</h3>
            <Card>
              <CardContent className="p-6 flex flex-col gap-4">
                <Input placeholder="Short title (e.g., Python Script)" />
                <textarea 
                  className="flex min-h-[100px] w-full border border-surface-200 bg-background px-3 py-2 text-sm text-foreground placeholder:text-surface-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-[3px]"
                  placeholder="Describe exactly what you are looking for in return..."
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-surface-200 mt-4">
          <Button className="gap-2 px-8" onClick={() => setIsCreatingTrade(false)}>Publish Offer <ArrowRight size={16}/></Button>
        </div>
      </div>
    );
  }

  if (isViewingTrade) {
    return (
      <div className="flex flex-col gap-6 p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" onClick={() => setIsViewingTrade(false)}>← Back</Button>
          <h1 className="text-xl font-bold tracking-tight">Trade Proposal</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Their Offer */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-surface-400">They are offering</h3>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">A</div>
                <span className="text-sm font-medium">alex_design</span>
                <span className="flex items-center text-xs text-amber-500"><Star size={12} className="fill-amber-500 mr-1"/> 4.9</span>
              </div>
            </div>
            
            {/* Integrity Card */}
            <Card className="border-surface-200 overflow-hidden">
              <div className="bg-surface-50 p-4 border-b border-surface-200 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-lg">Design_System_UI_Kit.fig</h4>
                  <p className="text-sm text-surface-400">Figma Document • 142 MB</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium border border-green-200">
                  <ShieldCheck size={14} /> Verified
                </div>
              </div>
              <CardContent className="p-4 flex flex-col gap-3 text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-surface-400">SHA256 Hash</span>
                  <span className="col-span-2 font-mono text-xs break-all">f8a9e...c4d</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-surface-400">Virus Scan</span>
                  <span className="col-span-2 text-green-600 flex items-center gap-1"><Check size={14}/> Clean (Kaspersky API)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-surface-400">Contents</span>
                  <span className="col-span-2">1 File</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What they want */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-surface-400">They want in exchange</h3>
            <Card className="h-full border-dashed border-2">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center gap-4">
                <h4 className="font-bold text-lg">Framer Motion Templates</h4>
                <p className="text-sm text-surface-400 max-w-xs">Looking for advanced page transition templates for Next.js app router.</p>
                <Button className="mt-4 gap-2"><Upload size={16} /> Propose File</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 pt-8">
          <Button variant="secondary" className="px-8 text-red-500 hover:text-red-600 hover:bg-red-50">Decline</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-5xl mx-auto animate-fade-in h-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trade Hub</h1>
          <p className="text-sm text-surface-300">Peer-to-peer file exchange with integrity verification.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreatingTrade(true)}>
          <Plus size={16} /> New Trade
        </Button>
      </div>

      <div className="flex items-center border-b border-surface-200 overflow-x-auto">
        {(["discover", "my_offers", "incoming", "history"] as const).map(tab => (
          <button 
            key={tab}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${activeTab === tab ? "border-primary-500 text-foreground" : "border-transparent text-surface-300 hover:text-foreground"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "discover" && (
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Design', 'Code', 'Assets', 'Audio', 'Documents'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-surface-100 text-xs font-medium text-surface-500 cursor-pointer hover:bg-surface-200">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trades.map((trade) => (
                <Card key={trade.id} className="hover:border-primary-500 transition-colors cursor-pointer" onClick={() => setIsViewingTrade(true)}>
                  <CardContent className="p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
                          {trade.user.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium">{trade.user}</span>
                      </div>
                      <span className="flex items-center text-xs text-amber-500 font-medium">
                        <Star size={12} className="fill-amber-500 mr-1"/> {trade.rep}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-surface-400 uppercase tracking-wider">Offering</span>
                      <p className="font-semibold truncate" title={trade.offer}>{trade.offer}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-surface-400 uppercase tracking-wider">Wanted</span>
                      <p className="text-sm text-surface-500">{trade.wanted}</p>
                    </div>

                    <Button variant="secondary" className="w-full mt-2" onClick={(e) => {e.stopPropagation(); setIsViewingTrade(true);}}>
                      View Trade
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Importing missing icons for view trade
import { Upload } from "lucide-react";
