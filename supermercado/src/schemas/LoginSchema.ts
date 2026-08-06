import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .email("Insira um e-mail válido")
    .min(1, "O e-mail é obrigatório"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(4, "A senha deve ter pelo menos 4 caracteres"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
