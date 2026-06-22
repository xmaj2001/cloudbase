import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
// Importa outros serviços aqui se precisares no futuro, ex: import { getFirestore } from 'firebase-admin/firestore';

// Guardamos a instância ativa aqui para exportar com segurança
let firebaseAdminApp: App;

export function initFirebaseAdmin(): App {
  const apps = getApps();

  // Se já existe uma app inicializada, reaproveitamos
  if (apps.length > 0) {
    firebaseAdminApp = apps[0];
    return firebaseAdminApp;
  }

  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    throw new Error(
      '⚠️ Erro: Falta configurar as variáveis de ambiente do Firebase Admin no .env.local'
    );
  }

  try {
    firebaseAdminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Corrige o formato das quebras de linha da chave privada
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });

    console.log('✅ Firebase Admin inicializado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar o Firebase Admin:', error);
    throw error;
  }

  return firebaseAdminApp;
}

// 🔥 A forma correta e modular de exportar os serviços que vais usar nas rotas:
export const getAdminAuth = (): Auth => {
  initFirebaseAdmin(); // Garante que está inicializado antes de expor
  return getAuth(firebaseAdminApp);
};
// 🔥 ADICIONADO: Exportar o serviço de base de dados pronto a usar
export const getAdminDb = (): Firestore => {
  initFirebaseAdmin();
  return getFirestore(firebaseAdminApp);
};