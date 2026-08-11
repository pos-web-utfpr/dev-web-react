import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsyncData } from "./use-async-data";

describe("useAsyncData", () => {
  it("deve iniciar com o estado de carregamento inicial (loading: true, data: null, error: null)", () => {
    const asyncFn = vi.fn().mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useAsyncData(asyncFn));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("deve atualizar os estados para sucesso (loading: false, data com resultado e error: null)", async () => {
    const mockData = { id: 1, name: "Produto Teste", preco: 100 };
    const asyncFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useAsyncData(asyncFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it("deve capturar e tratar erro de Instância de Error (loading: false, data: null, error com mensagem)", async () => {
    const errorMessage = "Falha ao carregar dados";
    const asyncFn = vi.fn().mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAsyncData(asyncFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  it("deve atribuir mensagem de erro genérica quando o erro lançado não for uma instância de Error", async () => {
    const asyncFn = vi.fn().mockRejectedValue("Erro inesperado");

    const { result } = renderHook(() => useAsyncData(asyncFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Ocorreu um erro desconhecido ao carregar os dados.");
  });

  it("deve re-executar a função asyncFn ao chamar a função refetch", async () => {
    const asyncFn = vi
      .fn()
      .mockResolvedValueOnce("Primeira resposta")
      .mockResolvedValueOnce("Segunda resposta");

    const { result } = renderHook(() => useAsyncData(asyncFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toBe("Primeira resposta");
    expect(asyncFn).toHaveBeenCalledTimes(1);

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe("Segunda resposta");
    expect(asyncFn).toHaveBeenCalledTimes(2);
  });
});
