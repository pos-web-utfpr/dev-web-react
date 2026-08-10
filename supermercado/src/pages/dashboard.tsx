import React from "react";
import { Container, Stack } from "@mantine/core";
import { useDashboard } from "../hooks/use-dashboard";
import { DashboardHeader } from "../components/dashboard/dashboard-header";
import { DashboardMetricsGrid } from "../components/dashboard/dashboard-metrics-grid";
import { DashboardChartCard } from "../components/dashboard/dashboard-chart-card";
import { DashboardQuickShortcuts } from "../components/dashboard/dashboard-quick-shortcuts";

export const Dashboard: React.FC = () => {
  const {
    totalProducts,
    totalRevenue,
    totalSales,
    dateValue,
    setDateValue,
    chartData,
  } = useDashboard();

  return (
    <Container size="lg" py="xl">
      <Stack>
        <DashboardHeader />

        <DashboardMetricsGrid
          totalProducts={totalProducts}
          totalRevenue={totalRevenue}
          totalSales={totalSales}
        />

        <DashboardChartCard
          dateValue={dateValue}
          onDateChange={setDateValue}
          chartData={chartData}
        />

        <DashboardQuickShortcuts />
      </Stack>
    </Container>
  );
};
