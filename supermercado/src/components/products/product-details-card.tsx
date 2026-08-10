import React from "react";
import { Link } from "react-router";
import {
  Card,
  Group,
  Title,
  Text,
  Badge,
  Box,
  SimpleGrid,
  Paper,
  Button,
} from "@mantine/core";
import {
  IconBarcode,
  IconPackage,
  IconArrowLeft,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import type { Product } from "../../schemas/product-schema";
import { formatCurrency, formatStock } from "../../helpers/formatters";

interface ProductDetailsCardProps {
  product: Product;
  onDelete: () => void;
  onNavigateBack: () => void;
}

export const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  product,
  onDelete,
  onNavigateBack,
}) => {
  return (
    <Card>
      <Group justify="space-between" align="flex-start">
        <div>
          <Badge variant="light" color="blue" mb="xs">
            Detalhes do Produto
          </Badge>
          <Title order={2}>{product.nome}</Title>
        </div>
        <Badge color="blue" size="xl" variant="filled">
          {formatCurrency(product.preco)}
        </Badge>
      </Group>

      <Box mt="md">
        <Text size="sm" fw={700} c="dimmed">
          Descrição:
        </Text>
        <Text size="md" mt={4}>
          {product.descricao}
        </Text>
      </Box>

      <SimpleGrid cols={2} spacing="md" mt="md">
        <Paper
          p="sm"
          bg="gray.0"
          style={{ borderRadius: "var(--mantine-radius-md)" }}
        >
          <Group gap="xs">
            <IconBarcode size={18} color="var(--mantine-color-blue-6)" />
            <Text size="xs" c="dimmed">
              ID do Produto
            </Text>
          </Group>
          <Text size="sm" fw={600} mt={4}>
            {product._id}
          </Text>
        </Paper>

        <Paper
          p="sm"
          bg="gray.0"
          style={{ borderRadius: "var(--mantine-radius-md)" }}
        >
          <Group gap="xs">
            <IconPackage size={18} color="var(--mantine-color-blue-6)" />
            <Text size="xs" c="dimmed">
              Quantidade em Estoque
            </Text>
          </Group>
          <Text size="sm" fw={600} mt={4}>
            {formatStock(product.quantidade)}
          </Text>
        </Paper>
      </SimpleGrid>

      <Group justify="space-between" mt="md">
        <Button
          variant="outline"
          leftSection={<IconArrowLeft size={18} />}
          onClick={onNavigateBack}
        >
          Voltar
        </Button>
        <Group gap="xs">
          <Button
            component={Link}
            to={`/app/produtos/${product._id}/editar`}
            color="orange"
            variant="filled"
            leftSection={<IconPencil size={18} />}
          >
            Editar Produto
          </Button>
          <Button
            color="red"
            variant="filled"
            leftSection={<IconTrash size={18} />}
            onClick={onDelete}
          >
            Excluir Produto
          </Button>
        </Group>
      </Group>
    </Card>
  );
};
