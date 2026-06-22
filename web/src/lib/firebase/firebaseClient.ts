import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializa no cliente (browser) apenas uma vez
const firebaseClientApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const clientAuth = getAuth(firebaseClientApp);
export const googleProvider = new GoogleAuthProvider();

// 🔥 CRUCIAL PARA O CLOUDBRIDGE: Pedir acesso ao Google Drive do utilizador
googleProvider.addScope('https://www.googleapis.com/auth/drive');

// Força a Google a devolver o "refresh_token" para podermos usar em background (offline)
googleProvider.setCustomParameters({
  access_type: "offline",
  prompt: "consent",
});

// ==========================================
// 1. FUNÇÃO APENAS PARA LOGIN NA PLATAFORMA
// ==========================================
export async function loginNaPlataforma() {
  const provider = new GoogleAuthProvider();
  // Não pede permissão de Drive aqui, apenas entra na app
  const result = await signInWithPopup(clientAuth, provider);
  const firebaseIdToken = await result.user.getIdToken();
  return { firebaseIdToken, user: result.user };
}

// ==========================================
// 2. FUNÇÃO PARA CONECTAR O GOOGLE DRIVE
// ==========================================
export async function conectarGoogleDrive() {
  const provider = new GoogleAuthProvider();

  // 🔥 Escopo específico para gerir ficheiros do Drive
  provider.addScope("https://www.googleapis.com/auth/drive");

  // Força o prompt a pedir autorização offline para gerar o token de acesso duradouro
  provider.setCustomParameters({
    access_type: "offline",
    prompt: "consent",
  });

  const result = await signInWithPopup(clientAuth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const googleAccessToken = credential?.accessToken;
  const firebaseIdToken = await result.user.getIdToken();

  return { googleAccessToken, firebaseIdToken };
}
