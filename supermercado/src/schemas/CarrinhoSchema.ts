import { z } from "zod";

export const CarrinhoItemSchema = z.object({
  idProduto: z.string(),
  quantidade: z.number().min(1),
  precoUnitario: z.number().gt(0),
});

export type CarrinhoItem = z.infer<typeof CarrinhoItemSchema>;

export const CarrinhoSchema = z.object({
  _id: z.string(),
  produtos: z.array(CarrinhoItemSchema),
  precoTotal: z.number(),
  idUsuario: z.string(),
  data: z.string(), // 'YYYY-MM-DD'
});

export type Carrinho = z.infer<typeof CarrinhoSchema>;
