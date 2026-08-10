import React from "react";
import { Link } from "react-router";
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Button,
  Alert,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useEditProduct } from "../hooks/use-edit-product";
import { ProductForm } from "../components/products/product-form";

export const ProductEdit: React.FC = () => {
  const {
    id,
    form,
    saving,
    fetchingProduct,
    error,
    handleUpdateProduct,
    handleCancel,
  } = useEditProduct();

  if (fetchingProduct) {
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

  if (error || !id) {
    return (
      <Container size="sm" py="xl">
        <Alert
          color="red"
          title="Produto não encontrado"
          icon={<IconAlertCircle size={20} />}
          mb="lg"
        >
          {error || `Nenhum produto foi encontrado para edição com o ID "${id}".`}
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

      <Card withBorder padding="lg" radius="md">
        <Group justify="space-between" align="flex-start" mb="md">
          <Box>
            <Title order={2}>Editar Produto</Title>
            <Text c="dimmed" size="sm" mt={4}>
              Alterando os dados do produto ID: <strong>{id}</strong>
            </Text>
          </Box>
        </Group>

        <ProductForm
          form={form}
          loading={saving}
          onSubmit={handleUpdateProduct}
          onCancel={handleCancel}
          submitLabel="Salvar Alterações"
          submitIcon={<IconDeviceFloppy size={18} />}
          submitColor="blue"
        />
      </Card>
    </Container>
  );
};
