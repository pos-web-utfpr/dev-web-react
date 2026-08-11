import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { ProductsTable } from "./products-table";
import type { Product } from "../../schemas/product-schema";

const mockProducts: Product[] = [
  { _id: "101", nome: "Sabão em Pó", preco: 18.9, descricao: "1kg", quantidade: 30 },
];

describe("ProductsTable", () => {
  it("deve exibir a mensagem de nenhum produto encontrado quando a lista estiver vazia", () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <ProductsTable
            products={[]}
            loading={false}
            sortField={null}
            sortDirection="asc"
            onSort={vi.fn()}
            onDelete={vi.fn()}
          />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText("Nenhum produto encontrado.")).toBeInTheDocument();
  });

  it("deve renderizar a tabela com os produtos fornecidos", () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <ProductsTable
            products={mockProducts}
            loading={false}
            sortField="nome"
            sortDirection="asc"
            onSort={vi.fn()}
            onDelete={vi.fn()}
          />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText("Sabão em Pó")).toBeInTheDocument();
  });
});
