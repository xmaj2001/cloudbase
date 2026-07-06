import {
  IStorageDriver,
  DriverUploadParams,
  DriverUploadResult,
} from "../driver.interface";

export class GoogleDriveDriver implements IStorageDriver {
  async upload({
    file,
    folder = "cloudbase_teste",
    onProgress,
  }: DriverUploadParams): Promise<DriverUploadResult> {
    return new Promise((resolve, reject) => {
      // ⚠️ NOTA: Em produção, o teu NestJS vai gerar/renovar este Token OAuth2 dinamicamente.
      // O utilizador precisa de estar autenticado com a Google na tua app.
      const accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYzNjE5MTM3MWM4YzRmZmQxNjI4NDZjZGU5MWE5Y2I0YzJiZWJhZTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDQzNzc5ODA4ODk5LWYzbWE3MDFmcGw2cXRmN3JubGJpMzRpbnZxZzg2cGdvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA0Mzc3OTgwODg5OS1mM21hNzAxZnBsNnF0ZjdybmxiaTM0aW52cWc4NnBnby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMDU2NTcyNjA0ODM4ODcxNjYyMCIsImVtYWlsIjoia3dhbmRhemF2aWVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3ODMzNTg1ODcsIm5hbWUiOiJLd2FuZGEgWmF2aWVyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0txNF9wenRjcGMyNWpaTXo5X0Z2SVFudERaS2c5RUhzT0hZd1VvVGI3LU16ZGtUUkE9czk2LWMiLCJnaXZlbl9uYW1lIjoiS3dhbmRhIiwiZmFtaWx5X25hbWUiOiJaYXZpZXIiLCJpYXQiOjE3ODMzNTg4ODcsImV4cCI6MTc4MzM2MjQ4NywianRpIjoiN2NjNDE0MDc0YmE5NDAzMWIwNGNiYTNkYmNjMjJkZWY4YTI0MzNkNSJ9.eZVgK5UUhJEVI8V3gfnDQuDQO-qMEk2XlSi49YVX6l4CPH5ffjwPjSXEHMxFM5SP_G3nd6MOMbuzf0_oX3QN6pdtSTPtDKUxkzKZk6kjZKaioMDgAk_FVP7wJuKGEK8ywQnWsA2E4PnUytSv4_6j6wfDVLdUxyXGzHAU7y4f7Z4Xo3Bb6nuGkLYcn7JXaxf-KNimlay-EVucmR_DDCGX7kTNZFG9C0Jsk26T8MPwsGaIQsJQFL2J-fEiRtxvOa46hQRsBHJMU_o9B7PBkuGb8oNzDyJXGhFSZZlVzcWAO8TGY0j_4cg7N6uDZo7px8CFyglMzT_cLNvAC5UIwbYtwg"; 

      if (!accessToken) {
        return reject(new Error("Token de Acesso do Google Drive não configurado ou inválido."));
      }

      const googleUploadUrl = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";

      // 1. Definir os metadados do ficheiro (Formato JSON exigido pela Google)
      const metadata = {
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        // 'parents' recebe um array com o ID da pasta do Google Drive onde queres salvar
        // Se 'folder' for um ID real do Drive, ele coloca lá dentro, caso contrário remove esta linha para salvar na raiz.
        parents: folder && folder !== "cloudbase_production" ? [folder] : undefined,
      };

      // 2. Construir o Multipart Body manualmente em formato Blob (Padrão exigido para uploads de Clientes)
      // Usamos delimitadores (boundary) para separar o JSON dos metadados dos bytes reais do arquivo.
      const boundary = "-------314159265358979323846";
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelim = `\r\n--${boundary}--`;

      const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}`;
      const mediaPartHeader = `\r\n${delimiter}Content-Type: ${metadata.mimeType}\r\n\r\n`;

      // Juntamos todas as partes num único Blob contínuo
      const multipartBlob = new Blob([
        metadataPart,
        mediaPartHeader,
        file, // Bytes binários reais do arquivo nativo
        closeDelim
      ], { type: `multipart/related; boundary=${boundary}` });

      // 3. Inicializar a ligação XMLHttpRequest para capturar o Progresso Real
      const xhr = new XMLHttpRequest();
      xhr.open("POST", googleUploadUrl, true);
      
      // Cabeçalhos Obrigatórios da Google API
      xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);

      // Escutar o progresso real dos bytes a subir
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          onProgress(percentage);
        }
      };

      xhr.onload = () => {
        const responseData = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && !responseData.error) {
          // A Google devolve o 'id' único do ficheiro no ecossistema deles
          resolve({
            providerFileId: responseData.id,
            // Construímos o path virtual/estrutural para guardares no teu PostgreSQL
            providerPath: `https://drive.google.com/file/d/${responseData.id}/view`,
          });
        } else {
          reject(new Error(responseData.error?.message || "Erro ao fazer upload para o Google Drive"));
        }
      };

      xhr.onerror = () => reject(new Error("Erro de rede ao conectar à API da Google"));
      
      // Disparar o Blob unificado para os servidores da Google
      xhr.send(multipartBlob);
    });
  }
}