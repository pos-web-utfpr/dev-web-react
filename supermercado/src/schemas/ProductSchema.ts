import { z } from "zod";

export const ProductSchema = z.object({
  _id: z.string(),
  nome: z
    .string()
    .min(1, "O nome do produto é obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  preco: z
    .number()
    .gt(0, "O preço deve ser maior que zero"),
  descricao: z
    .string()
    .min(1, "A descrição é obrigatória"),
  quantidade: z
    .number()
    .min(0, "A quantidade não pode ser negativa"),
});

export type ProductSchema = z.infer<typeof ProductSchema>;
export type Produto = ProductSchema;

export const ProductFormSchema = ProductSchema.omit({ _id: true });
export type ProductFormSchema = z.infer<typeof ProductFormSchema>;
