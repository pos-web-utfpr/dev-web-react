import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLogin } from "./use-login";
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

describe("useLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("deve inicializar o formulário com os valores padrão de login", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.form.values).toEqual({
      email: "fulano@qa.com",
      password: "teste",
    });
    expect(result.current.loading).toBe(false);
  });

  it("deve realizar o login com sucesso, salvar o token no localStorage e redirecionar", async () => {
    vi.mocked(api.post).mockResolvedValueOnce({
      data: {
        authorization: "Bearer mock-token-123",
        message: "Login realizado com sucesso",
      },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin({
        email: "admin@teste.com",
        password: "123",
      });
    });

    expect(api.post).toHaveBeenCalledWith("/login", {
      email: "admin@teste.com",
      password: "123",
    });
    expect(localStorage.getItem("token")).toBe("Bearer mock-token-123");
    expect(mockNavigate).toHaveBeenCalledWith("/app");
  });

  it("deve navegar para a página inicial ao chamar handleNavigateHome", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.handleNavigateHome();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
