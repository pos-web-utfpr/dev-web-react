import { describe, it, expect } from "vitest";
import { ProductSchema, ProductFormSchema } from "./product-schema";

describe("ProductSchema", () => {
  it("deve validar com sucesso um produto válido", () => {
    const validProduct = {
      _id: "prod-1",
      nome: "Feijão Preto 1kg",
      preco: 8.9,
      descricao: "Feijão tipo 1",
      quantidade: 30,
    };

    const result = ProductSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it("deve rejeitar se o nome estiver vazio", () => {
    const invalidProduct = {
      _id: "prod-1",
      nome: "",
      preco: 10,
      descricao: "Descrição",
      quantidade: 5,
    };

    const result = ProductSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("O nome do produto é obrigatório");
    }
  });

  it("deve rejeitar preço menor ou igual a zero", () => {
    const invalidProduct = {
      _id: "prod-1",
      nome: "Arroz",
      preco: 0,
      descricao: "Descrição",
      quantidade: 5,
    };

    const result = ProductSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("O preço deve ser maior que zero");
    }
  });

  it("deve rejeitar quantidade negativa", () => {
    const invalidProduct = {
      _id: "prod-1",
      nome: "Arroz",
      preco: 10,
      descricao: "Descrição",
      quantidade: -1,
    };

    const result = ProductSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("A quantidade não pode ser negativa");
    }
  });
});

describe("ProductFormSchema", () => {
  it("deve validar o formulário sem necessitar de _id", () => {
    const validForm = {
      nome: "Óleo de Soja",
      preco: 7.5,
      descricao: "Garrafa 900ml",
      quantidade: 100,
    };

    const result = ProductFormSchema.safeParse(validForm);
    expect(result.success).toBe(true);
  });
});
