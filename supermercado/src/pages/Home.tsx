import React from 'react';
import { Link } from 'react-router';
import { Container, Title, Text, SimpleGrid, Card, Group, Button, Badge } from '@mantine/core';
import { IconShoppingBag, IconShieldCheck, IconRocket, IconLogin, IconDashboard } from '@tabler/icons-react';

export const Home: React.FC = () => {
  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" align="center" mb="xl">
        <div>
          <Badge variant="light" color="blue" size="lg" mb="xs">
            ServeRest UI ERP
          </Badge>
          <Title order={1}>Sistema de Gestão ERP - ServeRest</Title>
          <Text c="dimmed" mt="xs">
            Plataforma moderna de gestão e e-commerce de supermercado.
          </Text>
        </div>

        <Group>
          <Button component={Link} to="/login" variant="outline" leftSection={<IconLogin size={18} />}>
            Acessar Login
          </Button>
          <Button component={Link} to="/app" variant="filled" leftSection={<IconDashboard size={18} />}>
            Ir para o Painel
          </Button>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card>
          <Group gap="xs">
            <IconShoppingBag size={24} color="var(--mantine-color-blue-6)" />
            <Title order={3}>Gestão de Produtos</Title>
          </Group>
          <Text c="dimmed">
            Cadastre, controle estoque e gerencie a vitrine de produtos do supermercado em tempo real.
          </Text>
          <Button component={Link} to="/app/produtos" variant="light" mt="auto">
            Ver Produtos
          </Button>
        </Card>

        <Card>
          <Group gap="xs">
            <IconShieldCheck size={24} color="var(--mantine-color-blue-6)" />
            <Title order={3}>Autenticação & Controle</Title>
          </Group>
          <Text c="dimmed">
            Ambiente seguro com níveis de acesso de usuário e gerenciamento simplificado.
          </Text>
          <Button component={Link} to="/login" variant="light" mt="auto">
            Fazer Login
          </Button>
        </Card>

        <Card>
          <Group gap="xs">
            <IconRocket size={24} color="var(--mantine-color-blue-6)" />
            <Title order={3}>Painel Administrativo</Title>
          </Group>
          <Text c="dimmed">
            Acompanhe atalhos rápidos e indicadores essenciais diretamente do seu dashboard.
          </Text>
          <Button component={Link} to="/app" variant="light" mt="auto">
            Acessar Dashboard
          </Button>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

