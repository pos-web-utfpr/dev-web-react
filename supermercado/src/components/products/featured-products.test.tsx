import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { FeaturedProducts } from "./featured-products";
import type { Product } from "../../schemas/product-schema";

const mockProducts: Product[] = [
  { _id: "1", nome: "Café Especial", preco: 25, descricao: "Café 100% Arábica", quantidade: 15 },
];

describe("FeaturedProducts", () => {
  it("deve retornar nulo se a lista de produtos estiver vazia", () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <FeaturedProducts products={[]} />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.queryByText("Produtos em Destaque")).not.toBeInTheDocument();
  });

  it("deve renderizar os produtos em destaque quando fornecidos", () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <FeaturedProducts products={mockProducts} />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText("Produtos em Destaque")).toBeInTheDocument();
    expect(screen.getByText("Café Especial")).toBeInTheDocument();
    expect(screen.getByText("Café 100% Arábica")).toBeInTheDocument();
    expect(screen.getByText("Estoque: 15 un.")).toBeInTheDocument();
  });
});
