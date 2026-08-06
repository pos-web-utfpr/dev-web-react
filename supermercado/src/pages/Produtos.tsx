import React, { useState, useMemo } from "react";
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
  Table,
  Pagination,
  LoadingOverlay,
  UnstyledButton,
  Box,
  Stack,
  Flex,
  Select,
  Alert,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconEye,
  IconPackage,
  IconPlus,
  IconTrash,
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconStar,
  IconPencil,
  IconAlertCircle,
} from "@tabler/icons-react";
import { api } from "../services/api";
import { useAsyncData } from "../hooks/useAsyncData";
import { z } from "zod";
import { ProductSchema, type Produto } from "../schemas/ProductSchema";

type SortField = "nome" | "preco" | "quantidade";
type SortDirection = "asc" | "desc";

export const Produtos: React.FC = () => {
  const [localProdutos, setLocalProdutos] = useState<Produto[] | null>(null);
  const [errorDismissed, setErrorDismissed] = useState(false);

  // Fetch products using useAsyncData hook
  const {
    data: fetchedProdutos,
    loading,
    error,
    refetch,
  } = useAsyncData(async () => {
    const response = await api.get("/produtos");
    return z.array(ProductSchema).parse(response.data.produtos);
  }, []);

  const produtos = useMemo(() => {
    return localProdutos ?? fetchedProdutos ?? [];
  }, [localProdutos, fetchedProdutos]);

  // Pagination & Sorting state
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    let nextDirection: SortDirection = "asc";
    if (sortField === field) {
      nextDirection = sortDirection === "asc" ? "desc" : "asc";
    }
    setSortField(field);
    setSortDirection(nextDirection);
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handlePageSizeChange = (val: string | null) => {
    if (val) {
      setPageSize(Number(val));
      setActivePage(1);
    }
  };

  const handleDelete = (id: string, nome: string) => {
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
      onConfirm: async () => {
        try {
          const response = await api.delete(`/produtos/${id}`);
          setLocalProdutos((prev) => (prev ?? fetchedProdutos ?? []).filter((p) => p._id !== id));
          refetch();
          notifications.show({
            title: "Produto excluído",
            message: response.data.message || `O produto "${nome}" foi removido do catálogo com sucesso.`,
            color: "red",
          });
        } catch {
          // Notificação tratada no interceptor do Axios em api.ts
        }
      },
    });
  };

  // Process sorted products
  const sortedProdutos = useMemo(() => {
    if (!sortField) return produtos;

    return [...produtos].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === "string" && typeof valB === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });
  }, [produtos, sortField, sortDirection]);

  // Paginated products
  const totalPages = Math.ceil(sortedProdutos.length / pageSize);
  const paginatedProdutos = useMemo(() => {
    const start = (activePage - 1) * pageSize;
    return sortedProdutos.slice(start, start + pageSize);
  }, [sortedProdutos, activePage, pageSize]);

  // Render sorting header icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <IconSelector size={16} />;
    return sortDirection === "asc" ? (
      <IconChevronUp size={16} />
    ) : (
      <IconChevronDown size={16} />
    );
  };

  // Top 4 featured products for the Grid section
  const produtosDestaque = produtos.slice(0, 4);

  return (
    <Container size="lg" py="xl">
      <Stack>
        {/* Header */}
        <Group justify="space-between" align="center">
          <div>
            <Title order={1}>Gestão de Produtos</Title>
            <Text c="dimmed" mt="xs">
              Catálogo completo de produtos com controle de estoque e ordenação.
            </Text>
          </div>
          <Group gap="sm">
            <Badge variant="light" color="blue" size="lg">
              {produtos.length} produtos cadastrados
            </Badge>
            <Button
              component={Link}
              to="/app/produtos/novo"
              variant="filled"
              leftSection={<IconPlus size={18} />}
            >
              Novo Produto
            </Button>
          </Group>
        </Group>

        {error && !errorDismissed && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Erro ao carregar produtos"
            color="red"
            withCloseButton
            onClose={() => setErrorDismissed(true)}
          >
            {error}
          </Alert>
        )}

        {/* Section: Produtos em Destaque (Cards in Grid) */}
        <div>
          <Group gap="xs" mb="md">
            <IconStar size={20} color="var(--mantine-color-orange-5)" />
            <Title order={2}>Produtos em Destaque</Title>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            {produtosDestaque.map((produto) => (
              <Card
                key={`destaque-${produto._id}`}
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <Group justify="space-between" align="flex-start" mb="xs">
                    <Title order={3} lineClamp={1}>
                      {produto.nome}
                    </Title>
                    <Badge color="blue" variant="filled">
                      R$ {produto.preco.toFixed(2)}
                    </Badge>
                  </Group>
                  <Text c="dimmed" size="sm" lineClamp={2} mb="md">
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
                  <Button
                    component={Link}
                    to={`/app/produtos/${produto._id}`}
                    variant="light"
                    fullWidth
                    leftSection={<IconEye size={18} />}
                  >
                    Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </SimpleGrid>
        </div>

        {/* Section: Catálogo Completo (Interactive Table) */}
        <Box mt="xl">
          <Group justify="space-between" align="center" mb="md">
            <Title order={2}>Catálogo Completo</Title>
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Exibir por página:
              </Text>
              <Select
                value={String(pageSize)}
                onChange={handlePageSizeChange}
                data={["5", "10", "20", "50"]}
                w={80}
              />
            </Group>
          </Group>

          <Card pos="relative" p={0} style={{ overflow: "hidden" }}>
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "blue", type: "dots" }}
            />

            <Table
              highlightOnHover
              striped
              verticalSpacing="sm"
              horizontalSpacing="md"
            >
              <Table.Thead bg="gray.1">
                <Table.Tr>
                  <Table.Th>
                    <UnstyledButton onClick={() => handleSort("nome")}>
                      <Group gap={4}>
                        <Text fw={700} size="sm">
                          Nome
                        </Text>
                        {renderSortIcon("nome")}
                      </Group>
                    </UnstyledButton>
                  </Table.Th>
                  <Table.Th style={{ width: 140 }}>
                    <UnstyledButton onClick={() => handleSort("preco")}>
                      <Group gap={4}>
                        <Text fw={700} size="sm">
                          Preço
                        </Text>
                        {renderSortIcon("preco")}
                      </Group>
                    </UnstyledButton>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} size="sm">
                      Descrição
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ width: 130 }}>
                    <UnstyledButton onClick={() => handleSort("quantidade")}>
                      <Group gap={4}>
                        <Text fw={700} size="sm">
                          Estoque
                        </Text>
                        {renderSortIcon("quantidade")}
                      </Group>
                    </UnstyledButton>
                  </Table.Th>
                  <Table.Th style={{ width: 180, textAlign: "right" }}>
                    <Text fw={700} size="sm">
                      Ações
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {paginatedProdutos.map((produto) => (
                  <Table.Tr key={produto._id}>
                    <Table.Td>
                      <Text fw={600} size="sm">
                        {produto.nome}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="blue" variant="light">
                        R$ {produto.preco.toFixed(2)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed" lineClamp={1}>
                        {produto.descricao}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={6}>
                        <IconPackage size={16} color="gray" />
                        <Text size="sm">{produto.quantidade} un.</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td style={{ textAlign: "right" }}>
                      <Group gap="xs" justify="flex-end">
                        <Button
                          component={Link}
                          to={`/app/produtos/${produto._id}`}
                          variant="subtle"
                          size="xs"
                          leftSection={<IconEye size={14} />}
                        >
                          Detalhes
                        </Button>
                        <Button
                          component={Link}
                          to={`/app/produtos/${produto._id}/editar`}
                          variant="subtle"
                          color="orange"
                          size="xs"
                          leftSection={<IconPencil size={14} />}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="subtle"
                          color="red"
                          size="xs"
                          leftSection={<IconTrash size={14} />}
                          onClick={() =>
                            handleDelete(produto._id, produto.nome)
                          }
                        >
                          Excluir
                        </Button>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>

          {/* Pagination Controls */}
          <Flex justify="space-between" align="center" mt="md">
            <Text size="sm" c="dimmed">
              Exibindo {(activePage - 1) * pageSize + 1} a{" "}
              {Math.min(activePage * pageSize, sortedProdutos.length)} de{" "}
              {sortedProdutos.length} produtos
            </Text>

            <Pagination
              value={activePage}
              onChange={handlePageChange}
              total={totalPages}
              color="blue"
              radius="md"
            />
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
};
