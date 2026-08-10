import React from "react";
import { Card, LoadingOverlay, Table, Text } from "@mantine/core";
import type { Product } from "../../schemas/product-schema";
import type { SortField, SortDirection } from "../../helpers/product-utils";
import { ProductsTableHeader } from "./products-table-header";
import { ProductsTableRow } from "./products-table-row";

interface ProductsTableProps {
  products: Product[];
  loading: boolean;
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onDelete: (id: string, name: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  loading,
  sortField,
  sortDirection,
  onSort,
  onDelete,
}) => {
  return (
    <Card pos="relative" p={0} style={{ overflow: "hidden" }}>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "dots" }}
      />

      <Table highlightOnHover striped verticalSpacing="sm" horizontalSpacing="md">
        <ProductsTableHeader
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />

        <Table.Tbody>
          {products.length === 0 && !loading ? (
            <Table.Tr>
              <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                <Text c="dimmed" py="md">
                  Nenhum produto encontrado.
                </Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            products.map((product) => (
              <ProductsTableRow
                key={product._id}
                product={product}
                onDelete={onDelete}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Card>
  );
};
