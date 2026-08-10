import React from "react";
import { Link } from "react-router";
import { Title, SimpleGrid, Card, Group, Text, Button } from "@mantine/core";
import { IconShoppingBag, IconArrowRight } from "@tabler/icons-react";

export const DashboardQuickShortcuts: React.FC = () => {
  return (
    <>
      <Title order={2} mt="lg">
        Atalhos Rápidos
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Card style={{ justifyContent: "space-between" }}>
          <div>
            <Group gap="xs" mb="xs">
              <IconShoppingBag size={22} color="var(--mantine-color-blue-6)" />
              <Title order={3}>Gerenciar Produtos</Title>
            </Group>
            <Text c="dimmed" size="sm">
              Acesse a lista completa de produtos, visualize os detalhes e o
              estoque disponível.
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
    </>
  );
};
