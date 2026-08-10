import React from "react";
import { Card, Group, Title, Text, Box } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { AreaChart } from "@mantine/charts";
import { IconTrendingUp, IconCalendar } from "@tabler/icons-react";
import { formatCurrency } from "../../helpers/formatters";

interface DashboardChartCardProps {
  dateValue: [Date | null, Date | null];
  onDateChange: (val: [Date | null, Date | null]) => void;
  chartData: Array<{ date: string; faturamento: number }>;
}

export const DashboardChartCard: React.FC<DashboardChartCardProps> = ({
  dateValue,
  onDateChange,
  chartData,
}) => {
  return (
    <Card mt="lg">
      <Group justify="space-between" align="flex-end" mb="lg">
        <div>
          <Group gap="xs" mb={4}>
            <IconTrendingUp size={22} color="var(--mantine-color-blue-6)" />
            <Title order={2}>Faturamento Diário de Vendas</Title>
          </Group>
          <Text c="dimmed" size="sm">
            Relatório de vendas interativo filtrado por período.
          </Text>
        </div>

        <DatePickerInput
          type="range"
          label="Período das Vendas"
          placeholder="Selecione o intervalo de datas"
          leftSection={<IconCalendar size={18} />}
          value={dateValue}
          onChange={(val) => {
            if (!val) {
              onDateChange([null, null]);
            } else {
              const d0 = val[0] ? new Date(val[0]) : null;
              const d1 = val[1] ? new Date(val[1]) : null;
              onDateChange([d0, d1]);
            }
          }}
          clearable
          w={{ base: "100%", sm: 300 }}
        />
      </Group>

      {chartData.length > 0 ? (
        <Box h={320}>
          <AreaChart
            h={300}
            data={chartData}
            dataKey="date"
            series={[
              {
                name: "faturamento",
                label: "Faturamento (R$)",
                color: "blue.6",
              },
            ]}
            curveType="monotone"
            valueFormatter={(val) => formatCurrency(val)}
            gridAxis="xy"
          />
        </Box>
      ) : (
        <Text c="dimmed" ta="center" py="xl">
          Nenhuma venda encontrada para o período selecionado.
        </Text>
      )}
    </Card>
  );
};
