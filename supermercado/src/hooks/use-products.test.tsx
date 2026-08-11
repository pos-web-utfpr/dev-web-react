import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useProducts } from "./use-products";
import { api } from "../services/api";

vi.mock("../services/api", () => ({
  api: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve carregar produtos e calcular os produtos paginados e em destaque", async () => {
    const mockList = [
      { _id: "1", nome: "Maçã", preco: 5, descricao: "Fruta", quantidade: 10 },
      { _id: "2", nome: "Uva", preco: 8, descricao: "Fruta", quantidade: 20 },
    ];
    vi.mocked(api.get).mockResolvedValueOnce({ data: { produtos: mockList } });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.featuredProducts).toHaveLength(2);
    expect(result.current.paginatedProducts).toHaveLength(2);
  });

  it("deve alterar a ordenação ao chamar handleSort", async () => {
    const mockList = [
      { _id: "1", nome: "Maçã", preco: 5, descricao: "Fruta", quantidade: 10 },
      { _id: "2", nome: "Uva", preco: 8, descricao: "Fruta", quantidade: 20 },
    ];
    vi.mocked(api.get).mockResolvedValueOnce({ data: { produtos: mockList } });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.handleSort("nome");
    });

    expect(result.current.sortField).toBe("nome");
    expect(result.current.sortDirection).toBe("asc");

    act(() => {
      result.current.handleSort("nome");
    });

    expect(result.current.sortDirection).toBe("desc");
  });

  it("deve alterar a página e tamanho de página", async () => {
    vi.mocked(api.get).mockResolvedValueOnce({ data: { produtos: [] } });

    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.handlePageChange(2);
    });
    expect(result.current.activePage).toBe(2);

    act(() => {
      result.current.handlePageSizeChange("20");
    });
    expect(result.current.pageSize).toBe(20);
    expect(result.current.activePage).toBe(1);
  });
});
