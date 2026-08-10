import React from "react";
import { Table, UnstyledButton, Group, Text } from "@mantine/core";
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
} from "@tabler/icons-react";
import type { SortField, SortDirection } from "../../helpers/product-utils";

interface ProductsTableHeaderProps {
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export const ProductsTableHeader: React.FC<ProductsTableHeaderProps> = ({
  sortField,
  sortDirection,
  onSort,
}) => {
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <IconSelector size={16} />;
    return sortDirection === "asc" ? (
      <IconChevronUp size={16} />
    ) : (
      <IconChevronDown size={16} />
    );
  };

  return (
    <Table.Thead bg="gray.1">
      <Table.Tr>
        <Table.Th>
          <UnstyledButton onClick={() => onSort("nome")}>
            <Group gap={4}>
              <Text fw={700} size="sm">
                Nome
              </Text>
              {renderSortIcon("nome")}
            </Group>
          </UnstyledButton>
        </Table.Th>
        <Table.Th style={{ width: 140 }}>
          <UnstyledButton onClick={() => onSort("preco")}>
            <Group gap={4}>
              <Text fw={700} size="sm">
                Preço
              </Text>
              {renderSortIcon("preco")}
            </Group>
          </UnstyledButton>
        </Table.Th>
        <Table.Th>
          <Text fw={700} size="sm">
            Descrição
          </Text>
        </Table.Th>
        <Table.Th style={{ width: 130 }}>
          <UnstyledButton onClick={() => onSort("quantidade")}>
            <Group gap={4}>
              <Text fw={700} size="sm">
                Estoque
              </Text>
              {renderSortIcon("quantidade")}
            </Group>
          </UnstyledButton>
        </Table.Th>
        <Table.Th style={{ width: 180, textAlign: "right" }}>
          <Text fw={700} size="sm">
            Ações
          </Text>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};
