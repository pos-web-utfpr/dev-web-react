import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider, Table } from "@mantine/core";
import { ProductsTableHeader } from "./products-table-header";

describe("ProductsTableHeader", () => {
  it("deve renderizar os cabeçalhos das colunas e disparar onSort ao clicar", async () => {
    const user = userEvent.setup();
    const mockOnSort = vi.fn();

    render(
      <MantineProvider>
        <Table>
          <ProductsTableHeader
            sortField="nome"
            sortDirection="asc"
            onSort={mockOnSort}
          />
        </Table>
      </MantineProvider>
    );

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Preço")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
    expect(screen.getByText("Estoque")).toBeInTheDocument();
    expect(screen.getByText("Ações")).toBeInTheDocument();

    const nameButton = screen.getByText("Nome");
    await user.click(nameButton);

    expect(mockOnSort).toHaveBeenCalledWith("nome");
  });
});
