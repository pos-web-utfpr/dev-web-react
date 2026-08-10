import React from "react";
import { Link } from "react-router";
import { Group, Title, Text, Badge, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface ProductsHeaderProps {
  totalProducts: number;
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  totalProducts,
}) => {
  return (
    <Group justify="space-between" align="center">
      <div>
        <Title order={1}>Gestão de Produtos</Title>
        <Text c="dimmed" mt="xs">
          Catálogo completo de produtos com controle de estoque e ordenação.
        </Text>
      </div>
      <Group gap="sm">
        <Badge variant="light" color="blue" size="lg">
          {totalProducts} produtos cadastrados
        </Badge>
        <Button
          component={Link}
          to="/app/produtos/novo"
          variant="filled"
          leftSection={<IconPlus size={18} />}
        >
          Novo Produto
        </Button>
      </Group>
    </Group>
  );
};
