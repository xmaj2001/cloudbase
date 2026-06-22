"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cloud, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { loginNaPlataforma } from "@/lib/firebase/firebaseClient";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginNaPlataforma();
      alert(`Bem-vindo, ${res.user.displayName}! Entraste no CloudBridge. 🔥`);
      // Aqui podes redirecionar o utilizador para a dashboard: router.push('/dashboard')
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500 text-white">
          <Cloud size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-surface-300">
          Enter your details to sign in to your workspace
        </p>
      </div>

      <form onSubmit={handleSignIn} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            required
          />
          <div className="flex flex-col gap-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
            />
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-base">
          Sign In
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-surface-300">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="primary" className="w-full h-12" onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Connecting..." : "Sign in with Google"}
      </Button>

      <p className="text-center text-sm text-surface-300">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="font-medium text-primary-600 hover:text-primary-700"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
