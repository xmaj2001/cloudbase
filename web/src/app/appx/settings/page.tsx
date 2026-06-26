"use client";

import { useState } from "react";
import { User, HardDrive, Zap, Share2, Bell, Shield, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const sections = [
    { id: "account", icon: User, label: "Account" },
    { id: "providers", icon: HardDrive, label: "Storage Providers" },
    { id: "automation", icon: Zap, label: "Automation" },
    { id: "sharing", icon: Share2, label: "Sharing Defaults" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "privacy", icon: Shield, label: "Privacy" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-4xl mx-auto animate-fade-in h-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-surface-300">Manage your workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="hidden md:flex flex-col gap-1 col-span-1">
          {sections.map(section => (
            <a key={section.id} href={`#${section.id}`} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-surface-400 hover:text-foreground hover:bg-surface-50 transition-colors">
              <section.icon size={16} />
              {section.label}
            </a>
          ))}
        </div>

        {/* Settings Content */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-8 pb-12">
          
          <Card id="account" className="scroll-mt-6">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-2xl">
                  JD
                </div>
                <Button variant="secondary">Change Avatar</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue="John Doe" />
                <Input label="Email Address" defaultValue="john@example.com" type="email" />
              </div>
              <div className="pt-4 border-t border-surface-100 flex justify-between items-center">
                <span className="text-sm font-medium text-red-500">Danger Zone</span>
                <Button variant="destructive" size="sm">Delete Account</Button>
              </div>
            </CardContent>
          </Card>

          <Card id="providers" className="scroll-mt-6">
            <CardHeader>
              <CardTitle>Storage Providers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {[
                { name: "Google Drive", space: "45 GB / 100 GB", color: "bg-blue-500" },
                { name: "Telegram", space: "12 GB / Unlimited", color: "bg-sky-500" },
              ].map(provider => (
                <div key={provider.name} className="flex items-center justify-between p-4 border border-surface-200 rounded-[3px]">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded ${provider.color} opacity-20`} />
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-xs text-surface-400">{provider.space}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">Disconnect</Button>
                </div>
              ))}
              <Button variant="secondary" className="w-full mt-2 border-dashed">Add Provider</Button>
            </CardContent>
          </Card>

          <Card id="notifications" className="scroll-mt-6">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
              {[
                "Upload completed",
                "Share link accessed",
                "Share link expired",
                "Trade received",
                "Storage warning (80%)"
              ].map(notif => (
                <div key={notif} className="flex items-center justify-between py-2 border-b border-surface-50 last:border-0">
                  <span>{notif}</span>
                  <input type="checkbox" className="accent-primary-500 w-4 h-4 cursor-pointer" defaultChecked />
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-surface-100">
                <p className="font-medium mb-3">Delivery Channels</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="checkbox" className="accent-primary-500" defaultChecked/> Push</label>
                  <label className="flex items-center gap-2"><input type="checkbox" className="accent-primary-500" defaultChecked/> Email</label>
                  <label className="flex items-center gap-2"><input type="checkbox" className="accent-primary-500" /> WhatsApp Bot</label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end mt-4">
            <Button variant="ghost" className="text-red-500 gap-2"><LogOut size={16}/> Sign Out</Button>
          </div>

        </div>
      </div>
    </div>
  );
}
