import { describe, it, expect } from "vitest";
import { formatCurrency, formatStock } from "./formatters";

describe("formatters", () => {
  describe("formatCurrency", () => {
    it("deve formatar valor numérico para o padrão de moeda BRL (R$)", () => {
      const result = formatCurrency(12.5).replace(/\s/g, " ");
      expect(result).toBe("R$ 12,50");
    });

    it("deve formatar zero corretamente", () => {
      const result = formatCurrency(0).replace(/\s/g, " ");
      expect(result).toBe("R$ 0,00");
    });

    it("deve formatar números com milhares usando separador de milhar", () => {
      const result = formatCurrency(1250.75).replace(/\s/g, " ");
      expect(result).toBe("R$ 1.250,75");
    });

    it("deve formatar valores negativos corretamente", () => {
      const result = formatCurrency(-50).replace(/\s/g, " ");
      expect(result).toMatch(/-?\s?R\$\s?50,00/);
    });
  });

  describe("formatStock", () => {
    it('deve formatar a quantidade em estoque adicionando a unidade "un."', () => {
      expect(formatStock(10)).toBe("10 un.");
    });

    it("deve formatar estoque igual a zero", () => {
      expect(formatStock(0)).toBe("0 un.");
    });

    it("deve formatar estoque unitário", () => {
      expect(formatStock(1)).toBe("1 un.");
    });
  });
});
