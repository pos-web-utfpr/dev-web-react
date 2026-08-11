import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCreateProduct } from "./use-create-product";
import { api } from "../services/api";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../services/api", () => ({
  api: {
    post: vi.fn(),
  },
}));

vi.mock("@mantine/notifications", () => ({
  notifications: {
    show: vi.fn(),
  },
}));

describe("useCreateProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve inicializar o formulário com os valores padrão zerados/vazios", () => {
    const { result } = renderHook(() => useCreateProduct());

    expect(result.current.form.values).toEqual({
      nome: "",
      preco: 0,
      descricao: "",
      quantidade: 0,
    });
    expect(result.current.loading).toBe(false);
  });

  it("deve cadastrar produto via API e redirecionar para a lista de produtos", async () => {
    vi.mocked(api.post).mockResolvedValueOnce({
      data: { message: "Produto cadastrado com sucesso" },
    });

    const { result } = renderHook(() => useCreateProduct());

    await act(async () => {
      await result.current.handleCreateProduct({
        nome: "Teclado RGB",
        preco: 250,
        descricao: "Teclado mecânico",
        quantidade: 10,
      });
    });

    expect(api.post).toHaveBeenCalledWith("/produtos", {
      nome: "Teclado RGB",
      preco: 250,
      descricao: "Teclado mecânico",
      quantidade: 10,
    });
    expect(mockNavigate).toHaveBeenCalledWith("/app/produtos");
  });

  it("deve redirecionar ao cancelar o cadastro", () => {
    const { result } = renderHook(() => useCreateProduct());

    act(() => {
      result.current.handleCancel();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/app/produtos");
  });
});
