import React from "react";
import { Container, Stack, Box, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useProducts } from "../hooks/use-products";
import { ProductsHeader } from "../components/products/products-header";
import { FeaturedProducts } from "../components/products/featured-products";
import { ProductsTableControl } from "../components/products/products-table-control";
import { ProductsTable } from "../components/products/products-table";
import { ProductsPagination } from "../components/products/products-pagination";

export const Products: React.FC = () => {
  const {
    products,
    sortedProducts,
    paginatedProducts,
    featuredProducts,
    loading,
    error,
    errorDismissed,
    dismissError,
    activePage,
    pageSize,
    totalPages,
    sortField,
    sortDirection,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleDelete,
  } = useProducts();

  return (
    <Container size="lg" py="xl">
      <Stack>
        <ProductsHeader totalProducts={products.length} />

        {error && !errorDismissed && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Erro ao carregar produtos"
            color="red"
            withCloseButton
            onClose={dismissError}
          >
            {error}
          </Alert>
        )}

        <FeaturedProducts products={featuredProducts} />

        <Box mt="xl">
          <ProductsTableControl
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />

          <ProductsTable
            products={paginatedProducts}
            loading={loading}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onDelete={handleDelete}
          />

          <ProductsPagination
            activePage={activePage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={sortedProducts.length}
            onPageChange={handlePageChange}
          />
        </Box>
      </Stack>
    </Container>
  );
};
