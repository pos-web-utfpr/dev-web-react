import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Button,
  Badge,
  Alert,
  SimpleGrid,
  Box,
  Paper,
  LoadingOverlay,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconArrowLeft,
  IconAlertCircle,
  IconPackage,
  IconBarcode,
  IconTrash,
  IconPencil,
} from "@tabler/icons-react";
import { api } from "../services/api";
import { useAsyncData } from "../hooks/useAsyncData";
import type { Produto } from "../schemas/produto";

export const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: produto,
    loading,
    error,
  } = useAsyncData(async () => {
    if (!id) throw new Error("ID do produto não informado.");
    const response = await api.get(`/produtos/${id}`);
    return response.data as Produto;
  }, [id]);

  const handleDelete = () => {
    if (!produto) return;
    modals.openConfirmModal({
      title: "Confirmar exclusão do produto",
      children: (
        <Text size="sm">
          Tem certeza de que deseja excluir o produto{" "}
          <strong>{produto.nome}</strong>? Esta ação não pode ser desfeita.
        </Text>
      ),
      labels: { confirm: "Excluir produto", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        notifications.show({
          title: "Produto excluído",
          message: `O produto ${produto.nome} foi removido com sucesso.`,
          color: "red",
        });
        navigate("/app/produtos");
      },
    });
  };

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

  if (error || !produto) {
    return (
      <Container size="sm" py="xl">
        <Alert
          color="red"
          title="Produto não encontrado"
          icon={<IconAlertCircle size={20} />}
          mb="lg"
        >
          {error ||
            `Nenhum produto foi encontrado no sistema com o ID "${id}".`}
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

      <Card>
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge variant="light" color="blue" mb="xs">
              Detalhes do Produto
            </Badge>
            <Title order={2}>{produto.nome}</Title>
          </div>
          <Badge color="blue" size="xl" variant="filled">
            R$ {produto.preco}
          </Badge>
        </Group>

        <Box mt="md">
          <Text size="sm" fw={700} c="dimmed">
            Descrição:
          </Text>
          <Text size="md" mt={4}>
            {produto.descricao}
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
              {produto._id}
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
              {produto.quantidade} unidades
            </Text>
          </Paper>
        </SimpleGrid>

        <Group justify="space-between" mt="md">
          <Button
            component={Link}
            to="/app/produtos"
            variant="outline"
            leftSection={<IconArrowLeft size={18} />}
          >
            Voltar
          </Button>
          <Group gap="xs">
            <Button
              component={Link}
              to={`/app/produtos/${produto._id}/editar`}
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
              onClick={handleDelete}
            >
              Excluir Produto
            </Button>
          </Group>
        </Group>
      </Card>
    </Container>
  );
};
