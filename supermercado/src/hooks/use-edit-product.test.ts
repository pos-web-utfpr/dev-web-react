import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useEditProduct } from "./use-edit-product";
import { api } from "../services/api";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "prod-99" }),
}));

vi.mock("../services/api", () => ({
  api: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

vi.mock("@mantine/notifications", () => ({
  notifications: {
    show: vi.fn(),
  },
}));

describe("useEditProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve carregar os dados do produto pelo ID e preencher o formulário", async () => {
    const mockProduct = {
      _id: "prod-99",
      nome: "Monitor 4K",
      preco: 1800,
      descricao: "Monitor 27 polegadas",
      quantidade: 5,
    };

    vi.mocked(api.get).mockResolvedValueOnce({ data: mockProduct });

    const { result } = renderHook(() => useEditProduct());

    await waitFor(() => {
      expect(result.current.fetchingProduct).toBe(false);
    });

    expect(result.current.form.values).toEqual({
      nome: "Monitor 4K",
      preco: 1800,
      descricao: "Monitor 27 polegadas",
      quantidade: 5,
    });
  });

  it("deve atualizar o produto via PUT e navegar para a listagem", async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: { _id: "prod-99", nome: "M1", preco: 10, descricao: "D1", quantidade: 1 },
    });

    vi.mocked(api.put).mockResolvedValueOnce({
      data: { message: "Produto atualizado com sucesso" },
    });

    const { result } = renderHook(() => useEditProduct());

    await waitFor(() => {
      expect(result.current.fetchingProduct).toBe(false);
    });

    await act(async () => {
      await result.current.handleUpdateProduct({
        nome: "Monitor 4K Curved",
        preco: 2000,
        descricao: "Monitor 32 polegadas",
        quantidade: 8,
      });
    });

    expect(api.put).toHaveBeenCalledWith("/produtos/prod-99", {
      nome: "Monitor 4K Curved",
      preco: 2000,
      descricao: "Monitor 32 polegadas",
      quantidade: 8,
    });
    expect(mockNavigate).toHaveBeenCalledWith("/app/produtos");
  });

  it("deve cancelar a edição e navegar de volta", () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: { _id: "prod-99", nome: "M1", preco: 10, descricao: "D1", quantidade: 1 },
    });

    const { result } = renderHook(() => useEditProduct());

    act(() => {
      result.current.handleCancel();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/app/produtos");
  });
});
