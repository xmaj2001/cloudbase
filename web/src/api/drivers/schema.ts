import { z } from "zod";

export const connectDriverSchema = z.object({
  type: z.enum(["GOOGLE_DRIVE", "ONEDRIVE", "TELEGRAM", "MEGA", "VPS", "CLOUDINARY"], {
    message: "Selecione um provedor de armazenamento válido.",
  }),
  displayName: z.string().min(3, "O nome de exibição deve ter pelo menos 3 caracteres.").max(50),
  priority: z.number().int().nonnegative().optional().default(0),
  credentials: z.record(z.string(), z.any()).refine(
    (creds) => Object.keys(creds).length > 0,
    { message: "As credenciais do provedor são obrigatórias." }
  ),
});

export const updateDriverSchema = z.object({
  displayName: z.string().min(3, "O nome de exibição deve ter pelo menos 3 caracteres.").max(50).optional(),
  priority: z.number().int().nonnegative().optional(),
});