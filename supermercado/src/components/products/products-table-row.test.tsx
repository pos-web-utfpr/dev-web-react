import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { MantineProvider, Table } from "@mantine/core";
import { ProductsTableRow } from "./products-table-row";
import type { Product } from "../../schemas/product-schema";

const mockProduct: Product = {
  _id: "prod-77",
  nome: "Leite Desnatado",
  preco: 4.5,
  descricao: "Caixa 1L",
  quantidade: 100,
};

describe("ProductsTableRow", () => {
  it("deve renderizar os dados da linha do produto e botões de ação", async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();

    render(
      <MantineProvider>
        <MemoryRouter>
          <Table>
            <Table.Tbody>
              <ProductsTableRow product={mockProduct} onDelete={mockOnDelete} />
            </Table.Tbody>
          </Table>
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText("Leite Desnatado")).toBeInTheDocument();
    expect(screen.getByText("Caixa 1L")).toBeInTheDocument();
    expect(screen.getByText("100 un.")).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /Excluir/i });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("prod-77", "Leite Desnatado");
  });
});
