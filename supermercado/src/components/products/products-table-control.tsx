import React from "react";
import { Group, Title, Text, Select } from "@mantine/core";

interface ProductsTableControlProps {
  pageSize: number;
  onPageSizeChange: (val: string | null) => void;
}

export const ProductsTableControl: React.FC<ProductsTableControlProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <Group justify="space-between" align="center" mb="md">
      <Title order={2}>Catálogo Completo</Title>
      <Group gap="xs">
        <Text size="sm" c="dimmed">
          Exibir por página:
        </Text>
        <Select
          value={String(pageSize)}
          onChange={onPageSizeChange}
          data={["5", "10", "20", "50"]}
          w={80}
        />
      </Group>
    </Group>
  );
};
