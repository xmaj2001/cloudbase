"use client";

import * as React from "react";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Search,
  Globe,
  Menu,
  X,
  HardDrive,
  Code2,
  Users,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

function NavbarContent() {
  const params = useParams();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Esquerda: Logo e Toggle Mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Abrir Menu de Navegação"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            href={``}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="CloudBase Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
            <span className="font-bold text-lg tracking-tight text-foreground">
              CloudBase
            </span>
          </Link>
        </div>

        {/* Centro: Links de Navegação Principal */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Dropdown: Funcionalidades / Para Utilizadores */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-medium bg-transparent">
                  Plataforma
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem
                      href={`/docs#unificado`}
                      title="Armazenamento Unificado"
                      icon={<HardDrive className="h-4 w-4 text-primary" />}
                    >
                      Conecte múltiplos providers como um único disco inteligente.
                    </ListItem>
                    <ListItem
                      href={`/docs#fragmentacao`}
                      title="Fragmentação Inteligente"
                      icon={<Layers className="h-4 w-4 text-primary" />}
                    >
                      Divida e proteja arquivos grandes com criptografia SHA-256.
                    </ListItem>
                    <ListItem
                      href={`/docs#pools`}
                      title="Space Pools"
                      icon={<Users className="h-4 w-4 text-primary" />}
                    >
                      Espaço partilhado e gerido em grupo entre utilizadores.
                    </ListItem>
                    <ListItem
                      href={`/docs#agendada`}
                      title="Dead Man's Switch"
                      icon={<ShieldCheck className="h-4 w-4 text-primary" />}
                    >
                      Agendamento seguro e partilha sob condições de tempo.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Dropdown: Para Developers */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-medium bg-transparent">
                  Developers
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[480px] lg:grid-cols-2">
                    <ListItem
                      href={`/docs#sdk`}
                      title="SDK & API REST"
                      icon={<Code2 className="h-4 w-4 text-primary" />}
                    >
                      Integração simples via `@cloudbase/sdk` ou requisições HTTP.
                    </ListItem>
                    <ListItem
                      href={`/docs#hls`}
                      title="HLS Streaming"
                      icon={<Sparkles className="h-4 w-4 text-primary" />}
                    >
                      Distribuição otimizada de áudio e vídeo em partes.
                    </ListItem>
                    <ListItem
                      href={`/docs#agent`}
                      title="CloudBase Agent"
                      icon={<Terminal className="h-4 w-4 text-primary" />}
                    >
                      Transforme qualquer VPS ou PC num provider adicional.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Links Diretos */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href={`/docs`}
                  className={`${navigationMenuTriggerStyle()} text-xs font-medium bg-transparent gap-1.5`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                  Documentação
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href={`/docs#planos`}
                  className={`${navigationMenuTriggerStyle()} text-xs font-medium bg-transparent`}
                >
                  Planos & Preços
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Direita: Modos, Idioma e Botão de Ação */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          {/* <LanguageToggle /> */}

          <Link
            href={`/docs`}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow transition-all hover:opacity-90 active:scale-95"
          >
            Ver Documentação
          </Link>
        </div>
      </div>

      {/* Menu Mobile (Drawer Side Nav) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-full max-w-xs bg-background border-r border-border p-6 shadow-xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between overflow-y-auto",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href={``}
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <Image src="/logo.png" alt="CloudBase" width={28} height={28} />
              <span className="font-bold text-lg text-foreground">CloudBase</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Plataforma
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/docs#unificado`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-md font-medium text-foreground hover:bg-muted"
                  >
                    Armazenamento Unificado
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/docs#fragmentacao`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-md font-medium text-foreground hover:bg-muted"
                  >
                    Fragmentação Inteligente
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/docs#pools`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-md font-medium text-foreground hover:bg-muted"
                  >
                    Space Pools
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Developers
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/docs#sdk`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-md font-medium text-foreground hover:bg-muted"
                  >
                    SDK & API REST
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/docs#agent`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-md font-medium text-foreground hover:bg-muted"
                  >
                    CloudBase Agent
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-3">
              <Link
                href={`/docs`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary hover:bg-muted rounded-md"
              >
                <BookOpen className="h-4 w-4" /> Aceder às Docs
              </Link>
            </div>
          </nav>
        </div>

        <div className="border-t border-border pt-4 text-xs text-muted-foreground">
          CloudBase v1.0 — Em Construção
        </div>
      </aside>
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 w-full bg-background" />}>
      <NavbarContent />
    </Suspense>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink
          href={href || "#"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent cursor-pointer",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-xs mt-1 text-muted-foreground leading-snug">
            {children}
          </p>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

function LanguageToggle() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "pt";

  const changeLanguage = (newLang: string) => {
    if (newLang === lang) return;

    const segments = pathname.split("/");
    if (segments[1] === "pt" || segments[1] === "en") {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }

    router.push(segments.join("/"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
          />
        }
      >
        <Globe className="h-4 w-4 text-foreground" />
        <span className="sr-only">Mudar Idioma</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeLanguage("pt")}
          className={lang === "pt" ? "font-bold text-primary" : ""}
        >
          Português (PT)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={lang === "en" ? "font-bold text-primary" : ""}
        >
          English (EN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}