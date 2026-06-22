"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-8 text-center animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20">
          <CheckCircle2 size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="mt-2 text-sm text-surface-300">
            We sent a password reset link to your email address.
          </p>
        </div>
        <Link href="/auth/sign-in" className="w-full">
          <Button variant="secondary" className="w-full h-12">Return to sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/auth/sign-in" className="inline-flex items-center gap-2 text-sm text-surface-300 hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to login
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
        <p className="mt-2 text-sm text-surface-300">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleReset} className="flex flex-col gap-6">
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="name@example.com" 
          required 
        />
        <Button type="submit" className="w-full h-12 text-base">Reset password</Button>
      </form>
    </div>
  );
}
