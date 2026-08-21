import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentação — CloudBase",
  description: "Documentação completa da plataforma CloudBase. Armazenamento unificado, fragmentação, automação, SDK, API REST, e mais.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
