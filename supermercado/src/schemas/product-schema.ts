import { z } from "zod";

export const ProductSchema = z.object({
  _id: z.string(),
  nome: z.string().min(1, "O nome do produto é obrigatório"),
  preco: z.number().positive("O preço deve ser maior que zero"),
  descricao: z.string().min(1, "A descrição do produto é obrigatória"),
  quantidade: z.number().min(0, "A quantidade não pode ser negativa"),
});

export const ProductFormSchema = ProductSchema.omit({ _id: true });

export type Product = z.infer<typeof ProductSchema>;
export type ProductFormValues = z.infer<typeof ProductFormSchema>;
