import React from "react";
import { Link } from "react-router";
import { Table, Text, Badge, Group, Button } from "@mantine/core";
import { IconPackage, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import type { Product } from "../../schemas/product-schema";
import { formatCurrency, formatStock } from "../../helpers/formatters";

interface ProductsTableRowProps {
  product: Product;
  onDelete: (id: string, name: string) => void;
}

export const ProductsTableRow: React.FC<ProductsTableRowProps> = ({
  product,
  onDelete,
}) => {
  return (
    <Table.Tr key={product._id}>
      <Table.Td>
        <Text fw={600} size="sm">
          {product.nome}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color="blue" variant="light">
          {formatCurrency(product.preco)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed" lineClamp={1}>
          {product.descricao}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={6}>
          <IconPackage size={16} color="gray" />
          <Text size="sm">{formatStock(product.quantidade)}</Text>
        </Group>
      </Table.Td>
      <Table.Td style={{ textAlign: "right" }}>
        <Group gap="xs" justify="flex-end">
          <Button
            component={Link}
            to={`/app/produtos/${product._id}`}
            variant="subtle"
            size="xs"
            leftSection={<IconEye size={14} />}
          >
            Detalhes
          </Button>
          <Button
            component={Link}
            to={`/app/produtos/${product._id}/editar`}
            variant="subtle"
            color="orange"
            size="xs"
            leftSection={<IconPencil size={14} />}
          >
            Editar
          </Button>
          <Button
            variant="subtle"
            color="red"
            size="xs"
            leftSection={<IconTrash size={14} />}
            onClick={() => onDelete(product._id, product.nome)}
          >
            Excluir
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
