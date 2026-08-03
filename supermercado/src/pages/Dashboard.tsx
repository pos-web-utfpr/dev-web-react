import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Button,
  Badge,
  Stack,
  Box,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { AreaChart } from '@mantine/charts';
import {
  IconShoppingBag,
  IconArrowRight,
  IconPackage,
  IconUsers,
  IconCheck,
  IconCalendar,
  IconTrendingUp,
} from '@tabler/icons-react';
import { mockProdutos, mockCarrinhos } from '../mocks/serveRestMocks';

export const Dashboard: React.FC = () => {
  const totalProdutos = mockProdutos.length;

  // Default date range: last 14 days (2026-07-21 to 2026-08-03)
  const defaultStart = new Date(2026, 6, 21);
  const defaultEnd = new Date(2026, 7, 3);

  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([
    defaultStart,
    defaultEnd,
  ]);

  // Aggregate daily revenue filtered by date range
  const { chartData, totalFaturamento, totalVendas } = useMemo(() => {
    const [startDate, endDate] = dateValue;

    // Filter carrinhos within selected date range
    const carrinhosFiltrados = mockCarrinhos.filter((carrinho) => {
      const dataCarrinho = new Date(`${carrinho.data}T00:00:00`);

      if (startDate && dataCarrinho < new Date(startDate.setHours(0, 0, 0, 0))) {
        return false;
      }
      if (endDate && dataCarrinho > new Date(endDate.setHours(23, 59, 59, 999))) {
        return false;
      }
      return true;
    });

    // Group by date (YYYY-MM-DD -> DD/MM)
    const faturamentoPorData: Record<string, number> = {};

    carrinhosFiltrados.forEach((carrinho) => {
      const [, mes, dia] = carrinho.data.split('-');
      const dataFormatada = `${dia}/${mes}`;

      faturamentoPorData[dataFormatada] =
        (faturamentoPorData[dataFormatada] || 0) + carrinho.precoTotal;
    });

    const data = Object.entries(faturamentoPorData).map(([date, faturamento]) => ({
      date,
      faturamento: Number(faturamento.toFixed(2)),
    }));

    const totalFaturado = carrinhosFiltrados.reduce(
      (acc, cart) => acc + cart.precoTotal,
      0
    );

    return {
      chartData: data,
      totalFaturamento: totalFaturado,
      totalVendas: carrinhosFiltrados.length,
    };
  }, [dateValue]);

  return (
    <Container size="lg" py="xl">
      <Stack>
        {/* Page Header */}
        <Group justify="space-between" align="center">
          <div>
            <Title order={1}>Painel Administrativo</Title>
            <Text c="dimmed" mt="xs">
              Bem-vindo ao sistema de gestão do usuário autenticado.
            </Text>
          </div>
          <Badge color="green" variant="light" size="lg" leftSection={<IconCheck size={14} />}>
            Sistema Operacional
          </Badge>
        </Group>

        {/* Metrics Overview */}
        <Title order={2}>Resumo e Métricas</Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <Card>
            <Group justify="space-between" align="center">
              <Text c="dimmed" size="sm" fw={500}>
                Total de Produtos
              </Text>
              <IconPackage size={22} color="var(--mantine-color-blue-6)" />
            </Group>
            <Title order={2}>{totalProdutos}</Title>
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
            <Title order={2}>
              R$ {totalFaturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Title>
            <Text c="dimmed" size="xs">
              Total de {totalVendas} vendas no filtro selecionado
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

        {/* Interactive Chart Section */}
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
                  setDateValue([null, null]);
                } else {
                  const d0 = val[0] ? new Date(val[0]) : null;
                  const d1 = val[1] ? new Date(val[1]) : null;
                  setDateValue([d0, d1]);
                }
              }}
              clearable
              w={{ base: '100%', sm: 300 }}
            />
          </Group>

          {chartData.length > 0 ? (
            <Box h={320}>
              <AreaChart
                h={300}
                data={chartData}
                dataKey="date"
                series={[{ name: 'faturamento', label: 'Faturamento (R$)', color: 'blue.6' }]}
                curveType="monotone"
                valueFormatter={(val) =>
                  `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                }
                gridAxis="xy"
              />
            </Box>
          ) : (
            <Text c="dimmed" ta="center" py="xl">
              Nenhuma venda encontrada para o período selecionado.
            </Text>
          )}
        </Card>

        {/* Quick Shortcuts */}
        <Title order={2} mt="lg">
          Atalhos Rápidos
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          <Card style={{ justifyContent: 'space-between' }}>
            <div>
              <Group gap="xs" mb="xs">
                <IconShoppingBag size={22} color="var(--mantine-color-blue-6)" />
                <Title order={3}>Gerenciar Produtos</Title>
              </Group>
              <Text c="dimmed" size="sm">
                Acesse a lista completa de produtos, visualize os detalhes e o estoque disponível.
              </Text>
            </div>
            <Button
              component={Link}
              to="/app/produtos"
              variant="filled"
              rightSection={<IconArrowRight size={18} />}
              mt="md"
            >
              Ir para Produtos
            </Button>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
