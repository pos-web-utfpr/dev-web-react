import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { ProductsTableControl } from "./products-table-control";

describe("ProductsTableControl", () => {
  it("deve renderizar o título do catálogo e o controle de itens por página", () => {
    render(
      <MantineProvider>
        <ProductsTableControl pageSize={10} onPageSizeChange={vi.fn()} />
      </MantineProvider>
    );

    expect(screen.getByText("Catálogo Completo")).toBeInTheDocument();
    expect(screen.getByText("Exibir por página:")).toBeInTheDocument();
  });
});
