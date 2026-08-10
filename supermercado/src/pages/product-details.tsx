import React from "react";
import { Link } from "react-router";
import { Container, Button, Alert, LoadingOverlay } from "@mantine/core";
import { IconArrowLeft, IconAlertCircle } from "@tabler/icons-react";
import { useProductDetails } from "../hooks/use-product-details";
import { ProductDetailsCard } from "../components/products/product-details-card";

export const ProductDetails: React.FC = () => {
  const { id, product, loading, error, handleDelete, handleNavigateBack } =
    useProductDetails();

  if (loading) {
    return (
      <Container size="sm" py="xl" pos="relative" style={{ minHeight: 200 }}>
        <LoadingOverlay
          visible
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "blue", type: "dots" }}
        />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container size="sm" py="xl">
        <Alert
          color="red"
          title="Produto não encontrado"
          icon={<IconAlertCircle size={20} />}
          mb="lg"
        >
          {error || `Nenhum produto foi encontrado no sistema com o ID "${id}".`}
        </Alert>
        <Button
          component={Link}
          to="/app/produtos"
          variant="outline"
          leftSection={<IconArrowLeft size={18} />}
        >
          Voltar para a lista de produtos
        </Button>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Button
        component={Link}
        to="/app/produtos"
        variant="subtle"
        leftSection={<IconArrowLeft size={18} />}
        mb="md"
      >
        Voltar para a lista de produtos
      </Button>

      <ProductDetailsCard
        product={product}
        onDelete={handleDelete}
        onNavigateBack={handleNavigateBack}
      />
    </Container>
  );
};
