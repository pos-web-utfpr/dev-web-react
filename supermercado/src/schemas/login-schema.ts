import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
