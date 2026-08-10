import React from "react";
import { Link } from "react-router";
import { Container, Title, Text, Card, Group, Button, Box } from "@mantine/core";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useCreateProduct } from "../hooks/use-create-product";
import { ProductForm } from "../components/products/product-form";

export const ProductCreate: React.FC = () => {
  const { form, loading, handleCreateProduct, handleCancel } =
    useCreateProduct();

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

      <Card withBorder padding="lg" radius="md">
        <Group justify="space-between" align="flex-start" mb="md">
          <Box>
            <Title order={2}>Cadastrar Produto</Title>
            <Text c="dimmed" size="sm" mt={4}>
              Preencha os campos abaixo para adicionar um novo produto ao
              catálogo.
            </Text>
          </Box>
        </Group>

        <ProductForm
          form={form}
          loading={loading}
          onSubmit={handleCreateProduct}
          onCancel={handleCancel}
          submitLabel="Cadastrar Produto"
          submitIcon={<IconPlus size={18} />}
        />
      </Card>
    </Container>
  );
};
