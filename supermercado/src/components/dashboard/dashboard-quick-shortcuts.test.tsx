import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { DashboardQuickShortcuts } from "./dashboard-quick-shortcuts";

describe("DashboardQuickShortcuts", () => {
  it("deve renderizar os atalhos rápidos e o botão de navegação para produtos", () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <DashboardQuickShortcuts />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText("Atalhos Rápidos")).toBeInTheDocument();
    expect(screen.getByText("Gerenciar Produtos")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Ir para Produtos/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/app/produtos");
  });
});
