import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryDriver {
    constructor(credentials: { cloudName: string; apiKey: string; apiSecret: string }) {
        cloudinary.config({
            cloud_name: credentials.cloudName,
            api_key: credentials.apiKey,
            api_secret: credentials.apiSecret,
        });
    }

    /**
     * 1. Gera uma assinatura segura para o Client fazer o upload direto
     */
    generateUploadSignature(folder: string, timestamp: number) {
        const signature = cloudinary.utils.api_sign_request(
            { folder, timestamp },
            cloudinary.config().api_secret!
        );

        return {
            signature,
            apiKey: cloudinary.config().api_key,
            cloudName: cloudinary.config().cloud_name,
        };
    }

    /**
     * 2. Deleta um arquivo (Leve - Apenas requisição HTTP do servidor)
     */
    async delete(fileId: string): Promise<boolean> {
        const result = await cloudinary.uploader.destroy(fileId);
        return result.result === 'ok';
    }

    /**
     * 3. Renomeia um arquivo (Leve)
     */
    async rename(fileId: string, newName: string) {
        const segments = fileId.split('/');
        segments[segments.length - 1] = newName;
        const newPublicId = segments.join('/');

        return await cloudinary.uploader.rename(fileId, newPublicId, { overwrite: true });
    }

    /**
     * 4. Move um arquivo de pasta (Leve)
     */
    async move(fileId: string, targetFolder: string) {
        const fileName = fileId.split('/').pop();
        const newPublicId = `${targetFolder.replace(/\/$/, '')}/${fileName}`;

        return await cloudinary.uploader.rename(fileId, newPublicId, { overwrite: true });
    }
}