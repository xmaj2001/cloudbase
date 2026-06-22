import { NextRequest } from 'next/server';
import { getAdminAuth } from './firebaseAdmin';

export async function getAuthUser(request: NextRequest) {
  try {
    // Procura o token no Header de Autorização: "Bearer T0K3N..."
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split('Bearer ')[1];
    const auth = getAdminAuth();
    
    // Valida o token com o Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken; // Retorna os dados do utilizador (uid, email, etc.)
  } catch (error) {
    return null;
  }
}