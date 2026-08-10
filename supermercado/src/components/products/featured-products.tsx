import React from "react";
import { Link } from "react-router";
import {
  Group,
  Title,
  Text,
  SimpleGrid,
  Card,
  Badge,
  Button,
} from "@mantine/core";
import { IconStar, IconPackage, IconEye } from "@tabler/icons-react";
import type { Product } from "../../schemas/product-schema";
import { formatCurrency, formatStock } from "../../helpers/formatters";

interface FeaturedProductsProps {
  products: Product[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
}) => {
  if (products.length === 0) return null;

  return (
    <div>
      <Group gap="xs" mb="md">
        <IconStar size={20} color="var(--mantine-color-orange-5)" />
        <Title order={2}>Produtos em Destaque</Title>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {products.map((product) => (
          <Card
            key={`destaque-${product._id}`}
            style={{ justifyContent: "space-between" }}
          >
            <div>
              <Group justify="space-between" align="flex-start" mb="xs">
                <Title order={3} lineClamp={1}>
                  {product.nome}
                </Title>
                <Badge color="blue" variant="filled">
                  {formatCurrency(product.preco)}
                </Badge>
              </Group>
              <Text c="dimmed" size="sm" lineClamp={2} mb="md">
                {product.descricao}
              </Text>
            </div>
            <div>
              <Group gap="xs" mb="md">
                <IconPackage size={16} color="gray" />
                <Text size="xs" c="dimmed">
                  Estoque: {formatStock(product.quantidade)}
                </Text>
              </Group>
              <Button
                component={Link}
                to={`/app/produtos/${product._id}`}
                variant="light"
                fullWidth
                leftSection={<IconEye size={18} />}
              >
                Detalhes
              </Button>
            </div>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};
