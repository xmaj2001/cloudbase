"use client";

import { Footer } from "@/components/footer";
import { Automation } from "@/components/landing/Automation";
import { Comparison } from "@/components/landing/Comparison";
import { CTA } from "@/components/landing/CTA";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Fragmentation } from "@/components/landing/Fragmentation";
import { Hero } from "@/components/landing/Hero";
import { Roadmap } from "@/components/landing/Roadmap";
import { Scheduled } from "@/components/landing/Scheduled";
import { ShareSystem } from "@/components/landing/ShareSystem";
import { Unified } from "@/components/landing/Unified";
import { Whatsapp } from "@/components/landing/Whatsapp";
import { NavBar } from "@/components/navbar";

export default function PageIndex() {
  return (
    <div className="bg-background text-foreground">
      <NavBar />
      <main>
        <Hero />
        <Unified />
        <Fragmentation />
        <Automation />
        <ShareSystem />
        <Scheduled />
        <FeatureGrid />
        <Whatsapp />
        <Comparison />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
