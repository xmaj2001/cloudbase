import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/firebase/getAuthUser";
import { google } from "googleapis";
import { getAdminDb } from "@/lib/firebase/firebaseAdmin";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getAdminDb();

    // Ir ao Firestore buscar o documento deste utilizador
    const userDoc = await db.collection("users").doc(user.uid).get();
    const userData = userDoc.data();

    const userGoogleToken = userData?.googleDrive?.accessToken;

    if (!userGoogleToken) {
      return NextResponse.json(
        {
          error: "Google Drive não está conectado para este utilizador.",
        },
        { status: 404 },
      );
    }

    // Inicializar o cliente do Google Drive dinamicamente com o token do gajo
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
    oauth2Client.setCredentials({ access_token: userGoogleToken });
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // 1. Ver Quota de Espaço
    const aboutDrive = await drive.about.get({ fields: "storageQuota" });
    const quota = aboutDrive.data.storageQuota;

    // 2. Listar Itens da Raiz (Ajustado com tratamento de nulos robusto)
    const fileList = await drive.files.list({
      pageSize: 20,
      // Mantém os campos tipados corretamente
      fields: "files(id, name, mimeType, size)",
      q: "'root' in parents and trashed = false",
    });

    // Garante que mapeia apenas se a propriedade files existir de facto no objeto data
    const googleFiles = fileList.data.files ?? [];

    const items = googleFiles.map((file) => ({
      id: file.id ?? "",
      nome: file.name ?? "Sem nome",
      tamanho: file.size ?? "0",
      isPasta: file.mimeType === "application/vnd.google-apps.folder",
      tipo: file.mimeType ?? "",
    }));

    // const items = (fileList.data.files || []).map((file) => ({
    //   id: file.id,
    //   nome: file.name,
    //   tamanho: file.size || "0",
    //   isPasta: file.mimeType === "application/vnd.google-apps.folder",
    //   tipo: file.mimeType,
    // }));

    return NextResponse.json({
      armazenamento: {
        totalBytes: quota?.limit || "0",
        usadoBytes: quota?.usage || "0",
      },
      itens: items,
    });
  } catch (error: any) {
    console.error("Erro no GET do Google Drive:", error);
    return NextResponse.json(
      { error: "Falha ao comunicar com o Google Drive" },
      { status: 500 },
    );
  }
}
