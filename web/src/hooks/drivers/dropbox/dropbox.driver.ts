import {
  IStorageDriver,
  DriverUploadParams,
  DriverUploadResult,
} from "../driver.interface";

export class DropboxDriver implements IStorageDriver {
  async upload({
    file,
    folder = "cloudbase_production",
    onProgress,
  }: DriverUploadParams): Promise<DriverUploadResult> {
    return new Promise((resolve, reject) => {
      // ⚠️ NOTA: Tal como no Google Drive, em produção este Token OAuth2
      // deve ser gerado pelo teu NestJS após o login do utilizador com o Dropbox.
      const accessToken = "O_TEU_DROPBOX_OAUTH_ACCESS_TOKEN";

      if (!accessToken || accessToken === "O_TEU_DROPBOX_OAUTH_ACCESS_TOKEN") {
        return reject(
          new Error("Token de Acesso do Dropbox não configurado ou inválido."),
        );
      }

      // Endpoint oficial da API de Conteúdo do Dropbox para uploads de até 150MB
      const dropboxUploadUrl = "https://content.dropboxapi.com/2/files/upload";

      // Definir os argumentos da API (Metadados do ficheiro)
      const apiArgs = {
        // Caminho absoluto onde o ficheiro vai cair no Dropbox (Ex: /cloudbase/README.md)
        path: `/${folder}/${file.name}`,
        mode: "overwrite", // Substitui o ficheiro se ele já existir com o mesmo nome
        autorename: true,
        mute: false,
        strict_conflict: false,
      };

      const xhr = new XMLHttpRequest();
      xhr.open("POST", dropboxUploadUrl, true);

      // ── Cabeçalhos Obrigatórios do Dropbox ──────────────────────────────
      xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
      // Passa os metadados convertidos em JSON puro dentro deste Header customizado
      xhr.setRequestHeader("Dropbox-API-Arg", JSON.stringify(apiArgs));
      // Avisamos a API que estamos a enviar os bytes binários puros no Body
      xhr.setRequestHeader("Content-Type", "application/octet-stream");

      // Escutar o progresso real de upload vindo do browser
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          onProgress(percentage);
        }
      };

      xhr.onload = () => {
        const responseData = JSON.parse(xhr.responseText);

        if (xhr.status >= 200 && xhr.status < 300) {
          // O Dropbox devolve o 'id' único do ficheiro (ex: id:a4axxxxxxxxx)
          resolve({
            providerFileId: responseData.id,
            // Guardamos o path completo de exibição ou partilha do ecossistema deles
            providerPath: responseData.path_display,
          });
        } else {
          reject(
            new Error(
              responseData.error_summary ||
                "Erro ao fazer upload para o Dropbox",
            ),
          );
        }
      };

      xhr.onerror = () =>
        reject(new Error("Erro de rede ao conectar à API do Dropbox"));

      // 💥 Dispara o ficheiro cru (File/Blob) diretamente no corpo do pedido HTTP
      xhr.send(file);
    });
  }
}
