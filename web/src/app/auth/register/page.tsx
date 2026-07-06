"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthInput } from "@/components/auth/auth-input";
import { useAuthShell } from "@/components/auth/auth-shell-context";

function strengthOf(pw: string): { label: string; score: number } {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const label = ["Fraca", "Fraca", "Média", "Boa", "Forte"][s];
  return { label, score: s };
}

export default function RegisterPage() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const s = strengthOf(pw);
  const { setShellConfig } = useAuthShell();

  useEffect(() => {
    // Configura a casca exterior especificamente para o Login
    setShellConfig({
      eyebrow: "Criar conta",
      title: "Começa em segundos.",
      subtitle: "Sem custos. Usa o espaço que já é teu.",
    });
  }, []);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/auth/otp"), 700);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <AuthInput
        label="Nome"
        placeholder="Como te chamas?"
        icon={<User />}
        required
        autoFocus
      />
      <AuthInput
        label="Email"
        type="email"
        placeholder="tu@dominio.com"
        icon={<Mail />}
        required
      />
      <div>
        <AuthInput
          label="Palavra-passe"
          type="password"
          placeholder="Mínimo 8 caracteres"
          icon={<Lock />}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />
        <div className="mt-2 flex items-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full transition-all duration-300"
              style={{
                background:
                  i < s.score
                    ? "var(--color-foreground)"
                    : "var(--color-hairline)",
              }}
            />
          ))}
          <span className="mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground w-10 text-right">
            {pw ? s.label : "—"}
          </span>
        </div>
      </div>

      <label className="flex items-start gap-2 text-[12px] text-muted-foreground pt-1">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-3.5 w-3.5 rounded border-hairline accent-foreground"
        />
        <span>
          Aceito os{" "}
          <a href="#" className="text-foreground underline underline-offset-4">
            Termos
          </a>{" "}
          e a{" "}
          <a href="#" className="text-foreground underline underline-offset-4">
            Privacidade
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full h-11 rounded-md bg-foreground text-background text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? "A criar conta…" : "Criar conta"}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="text-[13px] text-muted-foreground text-center pt-4">
        Já tens conta?{" "}
        <Link
          href="/auth/login"
          className="text-foreground underline underline-offset-4 hover:opacity-70"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
