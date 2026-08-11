import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useDashboard } from "./use-dashboard";
import { api } from "../services/api";

vi.mock("../services/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("useDashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve carregar produtos e carrinhos e calcular métricas de faturamento e total de vendas", async () => {
    vi.mocked(api.get).mockImplementation((url) => {
      if (url === "/produtos") {
        return Promise.resolve({
          data: {
            produtos: [
              { _id: "1", nome: "P1", preco: 10, descricao: "D1", quantidade: 5 },
              { _id: "2", nome: "P2", preco: 20, descricao: "D2", quantidade: 10 },
            ],
          },
        });
      }
      if (url === "/carrinhos") {
        return Promise.resolve({
          data: {
            carrinhos: [
              {
                _id: "c1",
                idUsuario: "u1",
                precoTotal: 150.5,
                produtos: [],
                data: "2026-07-25",
              },
              {
                _id: "c2",
                idUsuario: "u2",
                precoTotal: 200,
                produtos: [],
                data: "2026-07-26",
              },
            ],
          },
        });
      }
      return Promise.reject(new Error("Not Found"));
    });

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.totalProducts).toBe(2);
    });

    act(() => {
      result.current.setDateValue([
        new Date(2026, 0, 1),
        new Date(2026, 11, 31),
      ]);
    });

    expect(result.current.totalRevenue).toBe(350.5);
    expect(result.current.totalSales).toBe(2);
    expect(result.current.chartData).toHaveLength(2);
  });
});
