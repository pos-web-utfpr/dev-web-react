import React from "react";
import { Link } from "react-router";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Button,
  Badge,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconEye, IconPackage, IconTrash } from "@tabler/icons-react";
import { mockProdutos } from "../mocks/serveRestMocks";

export const Produtos: React.FC = () => {
  const handleDelete = (nome: string) => {
    modals.openConfirmModal({
      title: "Confirmar exclusão de produto",
      children: (
        <Text size="sm">
          Tem certeza de que deseja excluir o produto <strong>{nome}</strong>?
          Esta ação não pode ser desfeita.
        </Text>
      ),
      labels: { confirm: "Excluir produto", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        notifications.show({
          title: "Produto excluído",
          message: `O produto ${nome} foi removido do catálogo com sucesso.`,
          color: "red",
        });
      },
    });
  };

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" align="center" mb="xl">
        <div>
          <Title order={1}>Lista de Produtos</Title>
          <Text c="dimmed" mt="xs">
            Produtos cadastrados no sistema de gestão de supermercado.
          </Text>
        </div>
        <Badge variant="light" color="blue" size="lg">
          {mockProdutos.length} produtos
        </Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {mockProdutos.map((produto) => (
          <Card key={produto._id} style={{ justifyContent: "space-between" }}>
            <div>
              <Group justify="space-between" align="flex-start" mb="xs">
                <Title order={3}>{produto.nome}</Title>
                <Badge color="blue" variant="filled">
                  R$ {produto.preco}
                </Badge>
              </Group>

              <Text c="dimmed" size="sm" mb="md">
                {produto.descricao}
              </Text>
            </div>

            <div>
              <Group gap="xs" mb="md">
                <IconPackage size={16} color="gray" />
                <Text size="xs" c="dimmed">
                  Estoque: {produto.quantidade} un.
                </Text>
              </Group>

              <Group gap="xs" grow>
                <Button
                  component={Link}
                  to={`/app/produtos/${produto._id}`}
                  variant="light"
                  leftSection={<IconEye size={18} />}
                >
                  Detalhes
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  leftSection={<IconTrash size={18} />}
                  onClick={() => handleDelete(produto.nome)}
                >
                  Excluir
                </Button>
              </Group>
            </div>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
