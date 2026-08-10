import React from "react";
import { Flex, Text, Pagination } from "@mantine/core";

interface ProductsPaginationProps {
  activePage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const ProductsPagination: React.FC<ProductsPaginationProps> = ({
  activePage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  if (totalItems === 0) return null;

  const startItem = (activePage - 1) * pageSize + 1;
  const endItem = Math.min(activePage * pageSize, totalItems);

  return (
    <Flex justify="space-between" align="center" mt="md">
      <Text size="sm" c="dimmed">
        Exibindo {startItem} a {endItem} de {totalItems} produtos
      </Text>

      <Pagination
        value={activePage}
        onChange={onPageChange}
        total={totalPages}
        color="blue"
        radius="md"
      />
    </Flex>
  );
};
