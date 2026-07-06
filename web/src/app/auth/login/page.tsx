"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthInput } from "@/components/auth/auth-input";
import { useAuthShell } from "@/components/auth/auth-shell-context";
import { authClient } from "@/lib/auth/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setShellConfig } = useAuthShell();

  useEffect(() => {
    // Configura a casca exterior especificamente para o Login
    setShellConfig({
      eyebrow: "Entrar",
      title: "Bem-vindo de volta.",
      subtitle: "Acede ao teu armazenamento unificado.",
    });
  }, []);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/auth/two-factor"), 700);
  }

  const handleGoogleLogin = () => {
    // Lógica para login com Google
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <AuthInput
        label="Email"
        type="email"
        placeholder="tu@dominio.com"
        icon={<Mail />}
        required
        autoFocus
      />
      <AuthInput
        label="Palavra-passe"
        type="password"
        placeholder="••••••••"
        icon={<Lock />}
        required
        hint={
          <Link
            href="/recover"
            className="hover:text-foreground transition-colors"
          >
            Esqueceste-te?
          </Link>
        }
      />

      <label className="flex items-center gap-2 text-[12px] text-muted-foreground pt-1">
        <input
          type="checkbox"
          className="h-3.5 w-3.5 rounded border-hairline accent-foreground"
        />
        Manter sessão iniciada
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full h-11 rounded-md bg-foreground text-background text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? "A validar…" : "Continuar"}
        <ArrowRight className="h-4 w-4" />
      </button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-hairline" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ou
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="h-11 rounded-md border border-hairline hover:border-foreground text-[13px] transition-colors"
        >
          Google
        </button>
        <button
          type="button"
          className="h-11 rounded-md border border-hairline hover:border-foreground text-[13px] transition-colors"
        >
          GitHub
        </button>
      </div>

      <p className="text-[13px] text-muted-foreground text-center pt-4">
        Ainda não tens conta?{" "}
        <Link
          href="/auth/register"
          className="text-foreground underline underline-offset-4 hover:opacity-70"
        >
          Cria uma
        </Link>
      </p>
    </form>
  );
}
