import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { ProductDetailsCard } from "./product-details-card";
import type { Product } from "../../schemas/product-schema";

const mockProduct: Product = {
  _id: "prod-123",
  nome: "Arroz Integral 1kg",
  preco: 12.5,
  descricao: "Arroz tipo 1 orgânico",
  quantidade: 50,
};

const renderComponent = (
  props: Partial<React.ComponentProps<typeof ProductDetailsCard>> = {}
) => {
  const defaultProps = {
    product: mockProduct,
    onDelete: vi.fn(),
    onNavigateBack: vi.fn(),
    ...props,
  };

  return {
    ...render(
      <MantineProvider>
        <MemoryRouter>
          <ProductDetailsCard {...defaultProps} />
        </MemoryRouter>
      </MantineProvider>
    ),
    props: defaultProps,
  };
};

describe("ProductDetailsCard", () => {
  it("deve renderizar corretamente as informações e props do produto", () => {
    renderComponent();

    expect(screen.getByText("Arroz Integral 1kg")).toBeInTheDocument();
    expect(screen.getByText("Arroz tipo 1 orgânico")).toBeInTheDocument();
    expect(screen.getByText("prod-123")).toBeInTheDocument();
    expect(screen.getByText("50 un.")).toBeInTheDocument();
    expect(screen.getByText(/R\$\s?12,50/)).toBeInTheDocument();
  });

  it("deve disparar o evento onNavigateBack ao clicar no botão Voltar", async () => {
    const user = userEvent.setup();
    const { props } = renderComponent();

    const backButton = screen.getByRole("button", { name: /voltar/i });
    await user.click(backButton);

    expect(props.onNavigateBack).toHaveBeenCalledTimes(1);
  });

  it("deve disparar o evento onDelete ao clicar no botão Excluir Produto", async () => {
    const user = userEvent.setup();
    const { props } = renderComponent();

    const deleteButton = screen.getByRole("button", { name: /excluir produto/i });
    await user.click(deleteButton);

    expect(props.onDelete).toHaveBeenCalledTimes(1);
  });

  it("deve conter o link de navegação com URL correta para editar produto", () => {
    renderComponent();

    const editLink = screen.getByRole("link", { name: /editar produto/i });
    expect(editLink).toBeInTheDocument();
    expect(editLink).toHaveAttribute("href", "/app/produtos/prod-123/editar");
  });
});
