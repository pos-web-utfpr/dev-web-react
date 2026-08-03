import React from 'react';
import { Link } from 'react-router';
import { Container, Title, Text, SimpleGrid, Card, Group, Button, Badge } from '@mantine/core';
import { IconShoppingBag, IconArrowRight, IconPackage, IconUsers, IconCheck } from '@tabler/icons-react';
import { mockProdutos } from '../mocks/serveRestMocks';

export const Dashboard: React.FC = () => {
  const totalProdutos = mockProdutos.length;

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" align="center" mb="lg">
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

      <Title order={2} mb="md">
        Resumo e Métricas
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
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
              Usuários Ativos
            </Text>
            <IconUsers size={22} color="var(--mantine-color-teal-6)" />
          </Group>
          <Title order={2}>1</Title>
          <Text c="dimmed" size="xs">
            Administrador online
          </Text>
        </Card>

        <Card>
          <Group justify="space-between" align="center">
            <Text c="dimmed" size="sm" fw={500}>
              Status da API
            </Text>
            <IconCheck size={22} color="var(--mantine-color-green-6)" />
          </Group>
          <Title order={2}>Online</Title>
          <Text c="dimmed" size="xs">
            Mocks integrados
          </Text>
        </Card>
      </SimpleGrid>

      <Title order={2} mb="md">
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
    </Container>
  );
};

