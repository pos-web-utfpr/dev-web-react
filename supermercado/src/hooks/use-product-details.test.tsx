import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useProductDetails } from "./use-product-details";
import { api } from "../services/api";
import { modals } from "@mantine/modals";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "prod-88" }),
}));

vi.mock("../services/api", () => ({
  api: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("@mantine/modals", () => ({
  modals: {
    openConfirmModal: vi.fn(),
  },
}));

describe("useProductDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve buscar o produto por ID com sucesso", async () => {
    const mockProduct = {
      _id: "prod-88",
      nome: "Teclado Wireless",
      preco: 150,
      descricao: "Teclado sem fio",
      quantidade: 12,
    };

    vi.mocked(api.get).mockResolvedValueOnce({ data: mockProduct });

    const { result } = renderHook(() => useProductDetails());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.product).toEqual(mockProduct);
    expect(api.get).toHaveBeenCalledWith("/produtos/prod-88");
  });

  it("deve abrir o modal de confirmação ao chamar handleDelete", async () => {
    const mockProduct = {
      _id: "prod-88",
      nome: "Teclado Wireless",
      preco: 150,
      descricao: "Teclado sem fio",
      quantidade: 12,
    };
    vi.mocked(api.get).mockResolvedValueOnce({ data: mockProduct });

    const { result } = renderHook(() => useProductDetails());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.handleDelete();
    });

    expect(modals.openConfirmModal).toHaveBeenCalledTimes(1);
  });

  it("deve navegar de volta ao chamar handleNavigateBack", () => {
    const { result } = renderHook(() => useProductDetails());

    act(() => {
      result.current.handleNavigateBack();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/app/produtos");
  });
});
