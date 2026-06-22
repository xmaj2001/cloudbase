import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/firebase/getAuthUser';
import { getAdminDb } from '@/lib/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { googleAccessToken } = await request.json();
    if (!googleAccessToken) {
      return NextResponse.json({ error: 'Token em falta' }, { status: 400 });
    }

    const db = getAdminDb();

    // Guardamos na coleção "users", usando o próprio UID do Firebase como ID do documento
    await db.collection('users').doc(user.uid).set({
      googleDrive: {
        accessToken: googleAccessToken,
        updatedAt: new Date().toISOString()
      }
    }, { merge: true }); // O merge garante que não apaga outros dados do user (ex: dados do Telegram)

    return NextResponse.json({ success: true, message: 'Token do Drive salvo no Firestore!' });

  } catch (error) {
    console.error('Erro no POST do Google Drive:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}