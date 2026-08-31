import { z } from "zod";

/**
 * Schema de validação para criar/conectar um novo provider.
 * Validação client-side com Zod + react-hook-form.
 */
export const createProviderSchema = z.object({
  type: z.enum(
    [
      "GOOGLE_DRIVE",
      "ONEDRIVE",
      "TELEGRAM",
      "MEGA",
      "VPS",
      "CLOUDINARY",
      "DROPBOX",
      "BOX",
      "PCLOUD",
      "YANDEX",
      "LOCAL_MACHINE",
    ],
    { message: "Selecione um tipo de provedor válido." },
  ),
  displayName: z
    .string()
    .min(3, "O nome de exibição deve ter pelo menos 3 caracteres.")
    .max(50, "O nome de exibição não pode exceder 50 caracteres."),
  priority: z.number().int().nonnegative().optional().default(0),
  credentials: z
    .record(z.string(), z.unknown())
    .refine((creds) => Object.keys(creds).length > 0, {
      message: "As credenciais do provedor são obrigatórias.",
    }),
});

export type CreateProviderFormValues = z.infer<typeof createProviderSchema>;
