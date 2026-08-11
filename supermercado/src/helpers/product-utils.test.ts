import { describe, it, expect } from "vitest";
import { sortProducts, paginateProducts } from "./product-utils";
import type { Product } from "../schemas/product-schema";

const mockProducts: Product[] = [
  { _id: "1", nome: "Banana", preco: 5.0, descricao: "Fruta", quantidade: 100 },
  { _id: "2", nome: "Abacaxi", preco: 12.0, descricao: "Fruta", quantidade: 20 },
  { _id: "3", nome: "Carne Moída", preco: 35.0, descricao: "Açougue", quantidade: 50 },
];

describe("product-utils", () => {
  describe("sortProducts", () => {
    it("deve retornar o array original caso sortField seja nulo", () => {
      const result = sortProducts(mockProducts, null, "asc");
      expect(result).toEqual(mockProducts);
    });

    it("deve ordenar produtos por nome em ordem ascendente", () => {
      const result = sortProducts(mockProducts, "nome", "asc");
      expect(result.map((p) => p.nome)).toEqual(["Abacaxi", "Banana", "Carne Moída"]);
    });

    it("deve ordenar produtos por nome em ordem descendente", () => {
      const result = sortProducts(mockProducts, "nome", "desc");
      expect(result.map((p) => p.nome)).toEqual(["Carne Moída", "Banana", "Abacaxi"]);
    });

    it("deve ordenar produtos por preço em ordem ascendente", () => {
      const result = sortProducts(mockProducts, "preco", "asc");
      expect(result.map((p) => p.preco)).toEqual([5.0, 12.0, 35.0]);
    });

    it("deve ordenar produtos por preço em ordem descendente", () => {
      const result = sortProducts(mockProducts, "preco", "desc");
      expect(result.map((p) => p.preco)).toEqual([35.0, 12.0, 5.0]);
    });

    it("deve ordenar produtos por quantidade em estoque em ordem ascendente", () => {
      const result = sortProducts(mockProducts, "quantidade", "asc");
      expect(result.map((p) => p.quantidade)).toEqual([20, 50, 100]);
    });
  });

  describe("paginateProducts", () => {
    it("deve fatiar o array para a primeira página corretamente", () => {
      const result = paginateProducts(mockProducts, 1, 2);
      expect(result).toHaveLength(2);
      expect(result[0]._id).toBe("1");
      expect(result[1]._id).toBe("2");
    });

    it("deve fatiar o array para a segunda página corretamente", () => {
      const result = paginateProducts(mockProducts, 2, 2);
      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe("3");
    });

    it("deve retornar array vazio para página fora do limite", () => {
      const result = paginateProducts(mockProducts, 5, 2);
      expect(result).toEqual([]);
    });
  });
});
