import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { ProductsPagination } from "./products-pagination";

describe("ProductsPagination", () => {
  it("deve retornar nulo se totalItems for zero", () => {
    render(
      <MantineProvider>
        <ProductsPagination
          activePage={1}
          totalPages={0}
          pageSize={10}
          totalItems={0}
          onPageChange={vi.fn()}
        />
      </MantineProvider>
    );

    expect(screen.queryByText(/Exibindo/i)).not.toBeInTheDocument();
  });

  it("deve renderizar o texto de contagem de itens paginados", () => {
    render(
      <MantineProvider>
        <ProductsPagination
          activePage={1}
          totalPages={3}
          pageSize={10}
          totalItems={25}
          onPageChange={vi.fn()}
        />
      </MantineProvider>
    );

    expect(
      screen.getByText("Exibindo 1 a 10 de 25 produtos")
    ).toBeInTheDocument();
  });
});
