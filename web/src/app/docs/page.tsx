"use client";

import { docSections } from "@/lib/docs-content";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Download, Check, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

export default function DocsPage() {
  const [activeId, setActiveId] = useState(docSections[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  /* ── Scroll spy ──────────────────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const el of sectionRefs.current.values()) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  /* ── Helpers ─────────────────────────────────────────────────── */
  const scrollTo = useCallback((id: string) => {
    const el = sectionRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenu(false);
    }
  }, []);

  const copyMarkdown = useCallback((id: string, markdown: string) => {
    navigator.clipboard.writeText(markdown);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const downloadMarkdown = useCallback((title: string, markdown: string) => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  /* ── Render markdown as styled HTML ─────────────────────────── */
  const renderMarkdown = useCallback((md: string) => {
    const lines = md.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        const lang = line.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        elements.push(
          <div key={key++} className="my-4 rounded-xl border border-hairline bg-foreground text-background overflow-hidden">
            {lang && (
              <div className="px-4 py-2 border-b border-background/10 text-[11px] uppercase tracking-widest opacity-50">
                {lang}
              </div>
            )}
            <pre className="p-4 mono text-[13px] leading-relaxed overflow-x-auto">
              <code>{codeLines.join("\n")}</code>
            </pre>
          </div>
        );
        continue;
      }

      // Tables
      if (line.includes("|") && line.trim().startsWith("|")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
          tableLines.push(lines[i]);
          i++;
        }
        if (tableLines.length >= 2) {
          const parseRow = (row: string) =>
            row.split("|").filter((_, ci) => ci > 0 && ci < row.split("|").length - 1).map((c) => c.trim());
          const headers = parseRow(tableLines[0]);
          const dataRows = tableLines.slice(2).map(parseRow);
          elements.push(
            <div key={key++} className="my-4 overflow-x-auto rounded-xl border border-hairline">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-hairline bg-surface-2/50">
                    {headers.map((h, hi) => (
                      <th key={hi} className="text-left py-3 px-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, ri) => (
                    <tr key={ri} className="border-b border-hairline/60 last:border-0">
                      {row.map((cell, ci) => (
                        <td key={ci} className="py-3 px-4">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(<h1 key={key++} className="text-3xl md:text-4xl font-medium tracking-tight mt-8 mb-4">{line.slice(2)}</h1>);
        i++;
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(<h2 key={key++} className="text-2xl font-medium tracking-tight mt-10 mb-3">{line.slice(3)}</h2>);
        i++;
        continue;
      }
      if (line.startsWith("### ")) {
        elements.push(<h3 key={key++} className="text-xl font-medium tracking-tight mt-8 mb-2">{line.slice(4)}</h3>);
        i++;
        continue;
      }

      // Unordered list items
      if (line.startsWith("- ")) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={key++} className="my-3 space-y-2">
            {listItems.map((item, li) => (
              <li key={li} className="flex items-start gap-2 text-sm leading-relaxed">
                <span className="mt-2 size-1 rounded-full bg-foreground/50 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered list items
      if (/^\d+\.\s/.test(line)) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          listItems.push(lines[i].replace(/^\d+\.\s/, ""));
          i++;
        }
        elements.push(
          <ol key={key++} className="my-3 space-y-2 list-decimal list-inside">
            {listItems.map((item, li) => (
              <li key={li} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            ))}
          </ol>
        );
        continue;
      }

      // Empty lines
      if (line.trim() === "") {
        i++;
        continue;
      }

      // Paragraphs
      elements.push(
        <p key={key++} className="my-3 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />
      );
      i++;
    }

    return elements;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ──────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-hairline h-16"
      >
        <div className="mx-auto max-w-[1400px] px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img src="/logo.png" alt="CloudBase" className="h-7 w-7" />
              <span className="text-[15px] font-medium tracking-tight">CloudBase</span>
            </Link>
            <span className="text-hairline">/</span>
            <span className="text-sm text-muted-foreground">Documentação</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/docs/developers"
              className="hidden md:inline-flex text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              SDK & API
            </Link>
            <ModeToggle />
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Voltar
            </Link>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-surface-2 transition-colors"
            >
              {mobileMenu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <div className="pt-16 flex">
        {/* ── Sidebar ────────────────────────────────────────────── */}
        <aside
          className={`fixed top-16 bottom-0 w-72 border-r border-hairline bg-background overflow-y-auto z-40 transition-transform duration-300 ${
            mobileMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-1">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3 px-3">
              Funcionalidades
            </div>
            {docSections.map((s) => {
              const isActive = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                  }`}
                >
                  <s.icon className="size-4 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">{s.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── Content ────────────────────────────────────────────── */}
        <main className="flex-1 md:ml-72 min-h-screen">
          <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
                Documentação
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Guia completo de todas as funcionalidades do CloudBase.
                Cada secção pode ser copiada ou descarregada como ficheiro Markdown.
              </p>
            </motion.div>

            {/* Sections */}
            {docSections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(section.id, el);
                }}
                className="scroll-mt-24 mb-20 pb-20 border-b border-hairline last:border-0"
              >
                {/* Section toolbar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <section.icon className="size-4" strokeWidth={1.5} />
                    <span className="uppercase tracking-widest">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyMarkdown(section.id, section.markdown)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all"
                      title="Copiar Markdown"
                    >
                      {copiedId === section.id ? (
                        <><Check className="size-3.5 text-success" /> Copiado</>
                      ) : (
                        <><Copy className="size-3.5" /> Copiar</>
                      )}
                    </button>
                    <button
                      onClick={() => downloadMarkdown(section.title, section.markdown)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all"
                      title="Baixar Markdown"
                    >
                      <Download className="size-3.5" />
                      .md
                    </button>
                  </div>
                </div>

                {/* Rendered content */}
                <div className="docs-content">
                  {renderMarkdown(section.markdown)}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}
    </div>
  );
}

/* ── Inline formatting ───────────────────────────────────────────────── */
function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-medium">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-muted-foreground italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="mono text-[12px] bg-surface-2 px-1.5 py-0.5 rounded">$1</code>');
}
