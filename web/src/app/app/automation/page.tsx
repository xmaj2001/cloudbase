"use client";

import { useState } from "react";
import { Zap, Clock, History, Plus, Settings2, Power, MoreVertical, Play, ArrowRight, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState<"rules" | "history" | "scheduler">("rules");
  const [engineActive, setEngineActive] = useState(true);
  const [isBuildingRule, setIsBuildingRule] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-5xl mx-auto animate-fade-in h-full">
      
      {/* Header & Global Toggle */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Automation Engine</h1>
          <p className="text-sm text-surface-300">Intelligent rules that organize your files automatically.</p>
        </div>
        <div className="flex items-center gap-3 bg-surface-50 p-2 rounded-lg border border-surface-200">
          <span className="text-sm font-medium ml-2 text-surface-400">Engine Status</span>
          <Button 
            variant={engineActive ? "primary" : "secondary"} 
            size="sm" 
            className={`gap-2 ${engineActive ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
            onClick={() => setEngineActive(!engineActive)}
          >
            <Power size={14} />
            {engineActive ? "Active" : "Paused"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-surface-200">
        <button 
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "rules" ? "border-primary-500 text-foreground" : "border-transparent text-surface-300 hover:text-foreground"}`}
          onClick={() => setActiveTab("rules")}
        >
          <div className="flex items-center gap-2"><Zap size={16}/> Rules</div>
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "history" ? "border-primary-500 text-foreground" : "border-transparent text-surface-300 hover:text-foreground"}`}
          onClick={() => setActiveTab("history")}
        >
          <div className="flex items-center gap-2"><History size={16}/> History</div>
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "scheduler" ? "border-primary-500 text-foreground" : "border-transparent text-surface-300 hover:text-foreground"}`}
          onClick={() => setActiveTab("scheduler")}
        >
          <div className="flex items-center gap-2"><Clock size={16}/> Scheduler</div>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-8">
        
        {/* Rules Tab */}
        {activeTab === "rules" && !isBuildingRule && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Active Rules</h2>
              <Button onClick={() => setIsBuildingRule(true)} className="gap-2">
                <Plus size={16} /> Create Rule
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Archive Old Videos", cond: "If FileType is Video AND Age > 30 days", dest: "Telegram / Archives", active: true },
                { name: "Receipts to Drive", cond: "If Name contains 'receipt' OR 'invoice'", dest: "Google Drive / Financials", active: true },
                { name: "Auto-tag Images", cond: "If FileType is Image", dest: "Add tag: 'Review'", active: false },
              ].map((rule, i) => (
                <Card key={i} className={`transition-colors ${rule.active ? 'border-primary-200' : 'opacity-70'}`}>
                  <CardContent className="p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-surface-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded bg-surface-100 ${rule.active ? 'text-primary-600' : 'text-surface-400'}`}>
                          <Settings2 size={18} />
                        </div>
                        <h3 className="font-semibold">{rule.name}</h3>
                      </div>
                      <div className={`h-3 w-8 rounded-full flex items-center p-0.5 cursor-pointer ${rule.active ? 'bg-primary-500 justify-end' : 'bg-surface-200 justify-start'}`}>
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex gap-2">
                        <span className="text-surface-300 w-16">Match:</span>
                        <span className="font-medium text-foreground">{rule.cond}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-surface-300 w-16">Action:</span>
                        <span className="font-medium text-foreground">{rule.dest}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-surface-400"><MoreVertical size={14}/></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Rule Builder Wizard */}
        {isBuildingRule && (
          <div className="flex flex-col gap-6 animate-fade-in max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Create Automation Rule</h2>
                <p className="text-sm text-surface-300">Step {builderStep} of 5</p>
              </div>
              <Button variant="ghost" onClick={() => {setIsBuildingRule(false); setBuilderStep(1);}}>Cancel</Button>
            </div>

            <div className="flex gap-2 mb-6">
              {[1,2,3,4,5].map(step => (
                <div key={step} className={`h-1.5 flex-1 rounded-full ${step <= builderStep ? 'bg-primary-500' : 'bg-surface-200'}`} />
              ))}
            </div>

            <Card>
              <CardContent className="p-6">
                {builderStep === 1 && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <h3 className="font-semibold text-lg">Name this rule</h3>
                    <Input placeholder="e.g., Move Old Receipts" autoFocus />
                  </div>
                )}
                {builderStep === 2 && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <h3 className="font-semibold text-lg">Conditions</h3>
                    <div className="flex items-center gap-4 bg-surface-50 p-4 rounded border border-surface-200">
                      <select className="bg-background border border-surface-200 rounded p-2 text-sm"><option>File Name</option></select>
                      <select className="bg-background border border-surface-200 rounded p-2 text-sm"><option>Contains</option></select>
                      <Input placeholder="receipt" className="h-9" />
                    </div>
                    <Button variant="secondary" className="w-fit gap-2"><Plus size={14}/> Add Condition</Button>
                  </div>
                )}
                {builderStep === 3 && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <h3 className="font-semibold text-lg">Destination</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="secondary" className="h-16 justify-start px-4 gap-3 border-primary-500 bg-primary-50/20 text-primary-700">
                        <div className="h-2 w-2 rounded-full bg-blue-500" /> Google Drive
                      </Button>
                      <Button variant="secondary" className="h-16 justify-start px-4 gap-3">
                        <div className="h-2 w-2 rounded-full bg-sky-500" /> Telegram
                      </Button>
                    </div>
                    <Input placeholder="Target folder path (e.g., /Financials/2026)" />
                  </div>
                )}
                {builderStep === 4 && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <h3 className="font-semibold text-lg">Extra Actions</h3>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 p-3 border border-surface-200 rounded cursor-pointer hover:bg-surface-50">
                        <input type="checkbox" className="accent-primary-500" /> Auto-rename with date
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-surface-200 rounded cursor-pointer hover:bg-surface-50">
                        <input type="checkbox" className="accent-primary-500" /> Notify me
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-surface-200 rounded cursor-pointer hover:bg-surface-50">
                        <input type="checkbox" className="accent-primary-500" /> Compress before moving
                      </label>
                    </div>
                  </div>
                )}
                {builderStep === 5 && (
                  <div className="flex flex-col gap-6 animate-fade-in text-center py-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Review & Save</h3>
                      <p className="text-surface-300 mt-2 max-w-sm mx-auto">
                        "Receipts to Drive" will move files matching 1 condition to Google Drive.
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      <Button variant="secondary" className="gap-2"><Play size={16}/> Test Run</Button>
                      <Button className="gap-2" onClick={() => {setIsBuildingRule(false); setBuilderStep(1);}}><Save size={16}/> Save Rule</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
              <Button variant="ghost" onClick={() => setBuilderStep(prev => Math.max(1, prev - 1))} disabled={builderStep === 1}>Back</Button>
              {builderStep < 5 && (
                <Button onClick={() => setBuilderStep(prev => Math.min(5, prev + 1))} className="gap-2">
                  Next <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && !isBuildingRule && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex gap-4 mb-4">
              <Input placeholder="Filter by rule..." className="max-w-xs bg-surface-50" />
              <Input type="date" className="max-w-xs bg-surface-50" />
            </div>
            <div className="border border-surface-200 rounded-[3px] bg-background overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 border-b border-surface-100 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                <div>Timestamp</div>
                <div>Rule Applied</div>
                <div>File Affected</div>
                <div>Action Taken</div>
              </div>
              <div className="flex flex-col">
                {[
                  { time: "10:42 AM", rule: "Receipts to Drive", file: "uber_receipt_oct.pdf", action: "Moved to Google Drive" },
                  { time: "09:15 AM", rule: "Archive Old Videos", file: "screen_recording_01.mp4", action: "Moved to Telegram" },
                  { time: "Yesterday", rule: "Auto-tag Images", file: "IMG_9921.jpg", action: "Tagged 'Review'" },
                ].map((log, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b border-surface-50 text-sm hover:bg-surface-50 cursor-pointer">
                    <div className="text-surface-400">{log.time}</div>
                    <div className="font-medium">{log.rule}</div>
                    <div className="truncate">{log.file}</div>
                    <div className="text-primary-600">{log.action}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scheduler Tab */}
        {activeTab === "scheduler" && !isBuildingRule && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Execution Mode</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {['Manual', 'Automatic', 'Scheduled', 'Hybrid'].map((mode, i) => (
                    <Button key={mode} variant={i === 1 ? "primary" : "secondary"} className={`h-16 ${i===1 ? 'bg-primary-50 border-primary-500 text-primary-700' : ''}`}>
                      {mode}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-surface-50 rounded border border-surface-200">
                  <h4 className="font-semibold text-sm mb-2">Automatic Mode</h4>
                  <p className="text-sm text-surface-400">Rules are evaluated continuously as new files are added or modified. The engine runs in real-time.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Runs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-surface-100">
                    <span className="font-medium">Continuous Mode</span>
                    <span className="text-green-500 flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"/> Active</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-surface-100">
                    <span className="text-surface-400">Nightly Cleanup</span>
                    <span>02:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-400">Weekly Archive</span>
                    <span>Sunday, 12:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
