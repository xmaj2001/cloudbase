"use client";
import { Button } from "@/components/app/bits";
import ConnectGoogleDriverBtn from "@/components/drivers/ConnectGoogleDriver";
import { clientAuth, loginNaPlataforma } from "@/lib/firebase/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth"; // 🔥 Adicionado o listener oficial
import { useEffect, useState } from "react";

export default function TestPage() {
  // 1. Criamos um estado para guardar o utilizador de forma reativa
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [driveData, setDriveData] = useState<any>(null);

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
  useEffect(() => {
    // 2. Escutar as mudanças de estado de autenticação do Firebase
    const unsubscribe = onAuthStateChanged(clientAuth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // 🔥 Agora sim, o user é real e podemos pedir o Token com segurança
          const token = await currentUser.getIdToken();

          const response = await fetch("/api/drive/google", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log("Response from API:", data);
          setDriveData(data);
        } catch (error) {
          console.error("Error fetching drive:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Se não houver utilizador logado, para o loading
        setLoading(false);
      }
    });

    // Limpa o listener quando o componente desmontar
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {user ? (
        <p className="text-lg font-semibold text-surface-100">
          Welcome, {user.displayName}!
        </p>
      ) : (
        <p className="text-lg font-semibold text-surface-100">
          You are not logged in.
        </p>
      )}
      <p className="mt-2 text-sm text-surface-300">
        This is a test page for development purposes.
      </p>
      <Button variant="primary" onClick={handleGoogleLogin} disabled={loading}>
        {user ? "Re-login with Google" : "Login with Google"}
      </Button>
      <div>
        <ConnectGoogleDriverBtn />
      </div>

      {/* Exibir o resultado da API no ecrã para veres o mambo a funcionar */}
      {driveData && (
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-[2px] text-xs font-mono text-white">
          <p className="font-bold text-sm mb-2 text-orange-500">
            Dados do Google Drive:
          </p>
          <pre>{JSON.stringify(driveData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
