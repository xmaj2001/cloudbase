"use client";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export function OneTapProvider() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const initialized = useRef(false); // guarda contra dupla inicialização

  useEffect(() => {
    const init = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setIsLoggedIn(true);
        return;
      }
      setIsLoggedIn(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (isLoggedIn === false && buttonRef.current && !initialized.current) {
      initialized.current = true; // só inicializa UMA vez

      authClient.oneTap({
        button: {
          container: buttonRef.current,
          config: {
            theme: "outline",
            size: "large",
            type: "standard",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 300,
          },
        },
        fetchOptions: {
          onSuccess: () => router.push("/storage"),
        },
        onPromptNotification: (notification) => {
          console.warn("Prompt notification:", notification);
        },
      });
    }
  }, [isLoggedIn]);

  if (isLoggedIn !== false) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div ref={buttonRef} />
    </div>
  );
}