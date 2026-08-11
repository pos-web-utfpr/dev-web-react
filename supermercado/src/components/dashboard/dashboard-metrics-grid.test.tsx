import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { DashboardMetricsGrid } from "./dashboard-metrics-grid";

const renderComponent = (props = { totalProducts: 42, totalRevenue: 1500.5, totalSales: 15 }) => {
  return render(
    <MantineProvider>
      <DashboardMetricsGrid {...props} />
    </MantineProvider>
  );
};

describe("DashboardMetricsGrid", () => {
  it("deve renderizar o título e os rótulos dos cards de métricas", () => {
    renderComponent();

    expect(screen.getByText("Resumo e Métricas")).toBeInTheDocument();
    expect(screen.getByText("Total de Produtos")).toBeInTheDocument();
    expect(screen.getByText("Faturamento no Período")).toBeInTheDocument();
    expect(screen.getByText("Usuários Ativos")).toBeInTheDocument();
  });

  it("deve exibir o total de produtos cadastrados corretamente", () => {
    renderComponent({ totalProducts: 42, totalRevenue: 100, totalSales: 5 });

    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("deve exibir o faturamento formatado e a quantidade de vendas", () => {
    renderComponent({ totalProducts: 10, totalRevenue: 1500.5, totalSales: 15 });

    expect(screen.getByText(/R\$\s?1\.500,50/)).toBeInTheDocument();
    expect(screen.getByText("Total de 15 vendas no filtro selecionado")).toBeInTheDocument();
  });
});
