import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { DashboardChartCard } from "./dashboard-chart-card";

vi.mock("@mantine/charts", () => ({
  AreaChart: () => <div data-testid="mock-area-chart">Gráfico de Vendas</div>,
}));

describe("DashboardChartCard", () => {
  it("deve renderizar o título do gráfico e mensagem de fallback quando não houver dados", () => {
    render(
      <MantineProvider>
        <DashboardChartCard
          dateValue={[null, null]}
          onDateChange={vi.fn()}
          chartData={[]}
        />
      </MantineProvider>
    );

    expect(screen.getByText("Faturamento Diário de Vendas")).toBeInTheDocument();
    expect(
      screen.getByText("Nenhuma venda encontrada para o período selecionado.")
    ).toBeInTheDocument();
  });

  it("deve renderizar o gráfico de área quando houver dados", () => {
    const mockData = [{ date: "25/07", faturamento: 500 }];

    render(
      <MantineProvider>
        <DashboardChartCard
          dateValue={[null, null]}
          onDateChange={vi.fn()}
          chartData={mockData}
        />
      </MantineProvider>
    );

    expect(screen.getByTestId("mock-area-chart")).toBeInTheDocument();
  });
});
