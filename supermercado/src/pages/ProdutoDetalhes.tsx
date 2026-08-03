import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Container, Title, Text, Card, Group, Button, Badge, Alert, SimpleGrid, Box, Paper } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconAlertCircle, IconPackage, IconBarcode, IconTrash } from '@tabler/icons-react';
import { mockProdutos } from '../mocks/serveRestMocks';

export const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const produto = mockProdutos.find((item) => item._id === id);

  const handleDelete = () => {
    if (!produto) return;
    modals.openConfirmModal({
      title: 'Confirmar exclusão do produto',
      children: (
        <Text size="sm">
          Tem certeza de que deseja excluir o produto <strong>{produto.nome}</strong>? Esta ação não pode ser desfeita.
        </Text>
      ),
      labels: { confirm: 'Excluir produto', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        notifications.show({
          title: 'Produto excluído',
          message: `O produto ${produto.nome} foi removido com sucesso.`,
          color: 'red',
        });
        navigate('/app/produtos');
      },
    });
  };

  if (!produto) {
    return (
      <Container size="sm" py="xl">
        <Alert
          color="red"
          title="Produto não encontrado"
          icon={<IconAlertCircle size={20} />}
          mb="lg"
        >
          Nenhum produto foi encontrado no sistema com o ID "{id}".
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

        <Box>
          <Text size="sm" fw={700} c="dimmed">
            Descrição:
          </Text>
          <Text size="md" mt={4}>
            {produto.descricao}
          </Text>
        </Box>

        <SimpleGrid cols={2} spacing="md">
          <Paper p="sm" bg="gray.0" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
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

          <Paper p="sm" bg="gray.0" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
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
          <Button
            color="red"
            variant="filled"
            leftSection={<IconTrash size={18} />}
            onClick={handleDelete}
          >
            Excluir Produto
          </Button>
        </Group>
      </Card>
    </Container>
  );
};


