import { z } from "zod";

export const CartProductSchema = z.object({
  idProduto: z.string(),
  quantidade: z.number(),
  precoUnitario: z.number(),
});

export const CartSchema = z.object({
  _id: z.string(),
  idUsuario: z.string(),
  precoTotal: z.number(),
  produtos: z.array(CartProductSchema),
  data: z.string().optional(),
});

export type CartProduct = z.infer<typeof CartProductSchema>;
export type Cart = z.infer<typeof CartSchema>;
