import { describe, it, expect, vi } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ProductForm } from "./product-form";
import type { ProductFormValues } from "../../schemas/product-schema";
import { IconPlus } from "@tabler/icons-react";

const renderComponent = (props = {}) => {
  const { result } = renderHook(() =>
    useForm<ProductFormValues>({
      initialValues: {
        nome: "Teclado",
        preco: 100,
        descricao: "Descrição teste",
        quantidade: 5,
      },
    })
  );

  const defaultProps = {
    form: result.current,
    loading: false,
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
    submitLabel: "Salvar Produto",
    submitIcon: <IconPlus size={18} />,
    ...props,
  };

  return {
    ...render(
      <MantineProvider>
        <ProductForm {...defaultProps} />
      </MantineProvider>
    ),
    props: defaultProps,
  };
};

describe("ProductForm", () => {
  it("deve renderizar os campos do formulário de produto", () => {
    renderComponent();

    expect(screen.getByLabelText(/Nome do Produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço \(R\$\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantidade em Estoque/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Salvar Produto/i })).toBeInTheDocument();
  });

  it("deve disparar a função onCancel ao clicar no botão Cancelar", async () => {
    const user = userEvent.setup();
    const { props } = renderComponent();

    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    await user.click(cancelButton);

    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });
});
