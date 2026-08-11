import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { ProductsHeader } from "./products-header";

describe("ProductsHeader", () => {
  it("deve renderizar o título, o total de produtos e o link para cadastrar novo produto", () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <ProductsHeader totalProducts={15} />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText("Gestão de Produtos")).toBeInTheDocument();
    expect(screen.getByText("15 produtos cadastrados")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Novo Produto/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/app/produtos/novo");
  });
});
