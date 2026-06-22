"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/connect-providers");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500 text-white">
          <Cloud size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="mt-2 text-sm text-surface-300">Start unifying your cloud storage today</p>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="name@example.com" 
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="Create a strong password" 
            required 
          />
        </div>

        <Button type="submit" className="w-full h-12 text-base">Create Account</Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-surface-300">Or continue with</span>
        </div>
      </div>

      <Button variant="secondary" className="w-full h-12">
        Google
      </Button>

      <p className="text-center text-sm text-surface-300">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-medium text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
