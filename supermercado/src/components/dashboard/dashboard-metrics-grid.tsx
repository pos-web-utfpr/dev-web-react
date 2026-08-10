import React from "react";
import { SimpleGrid, Card, Group, Title, Text } from "@mantine/core";
import { IconPackage, IconTrendingUp, IconUsers } from "@tabler/icons-react";
import { formatCurrency } from "../../helpers/formatters";

interface DashboardMetricsGridProps {
  totalProducts: number;
  totalRevenue: number;
  totalSales: number;
}

export const DashboardMetricsGrid: React.FC<DashboardMetricsGridProps> = ({
  totalProducts,
  totalRevenue,
  totalSales,
}) => {
  return (
    <>
      <Title order={2}>Resumo e Métricas</Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card>
          <Group justify="space-between" align="center">
            <Text c="dimmed" size="sm" fw={500}>
              Total de Produtos
            </Text>
            <IconPackage size={22} color="var(--mantine-color-blue-6)" />
          </Group>
          <Title order={2}>{totalProducts}</Title>
          <Text c="dimmed" size="xs">
            Produtos cadastrados no catálogo
          </Text>
        </Card>

        <Card>
          <Group justify="space-between" align="center">
            <Text c="dimmed" size="sm" fw={500}>
              Faturamento no Período
            </Text>
            <IconTrendingUp size={22} color="var(--mantine-color-green-6)" />
          </Group>
          <Title order={2}>{formatCurrency(totalRevenue)}</Title>
          <Text c="dimmed" size="xs">
            Total de {totalSales} vendas no filtro selecionado
          </Text>
        </Card>

        <Card>
          <Group justify="space-between" align="center">
            <Text c="dimmed" size="sm" fw={500}>
              Usuários Ativos
            </Text>
            <IconUsers size={22} color="var(--mantine-color-teal-6)" />
          </Group>
          <Title order={2}>1</Title>
          <Text c="dimmed" size="xs">
            Administrador online
          </Text>
        </Card>
      </SimpleGrid>
    </>
  );
};
