import { useState, useMemo } from "react";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { api } from "../services/api";
import { useAsyncData } from "./use-async-data";
import { z } from "zod";
import { ProductSchema, type Product } from "../schemas/product-schema";
import {
  type SortField,
  type SortDirection,
  sortProducts,
  paginateProducts,
} from "../helpers/product-utils";

export function useProducts() {
  const [localProducts, setLocalProducts] = useState<Product[] | null>(null);
  const [errorDismissed, setErrorDismissed] = useState(false);

  // Busca inicial de produtos via API
  const {
    data: fetchedProducts,
    loading,
    error,
    refetch,
  } = useAsyncData(async () => {
    const response = await api.get("/produtos");
    return z.array(ProductSchema).parse(response.data.produtos);
  }, []);

  const products = useMemo(() => {
    return localProducts ?? fetchedProducts ?? [];
  }, [localProducts, fetchedProducts]);

  // Estado da Paginação e Ordenação
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

  const handleDelete = (id: string, name: string) => {
    modals.openConfirmModal({
      title: "Confirmar exclusão de produto",
      children: (
        <Text size="sm">
          Tem certeza de que deseja excluir o produto <strong>{name}</strong>?
          Esta ação não pode ser desfeita.
        </Text>
      ),
      labels: { confirm: "Excluir produto", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          const response = await api.delete(`/produtos/${id}`);
          setLocalProducts((prev) =>
            (prev ?? fetchedProducts ?? []).filter((p) => p._id !== id)
          );
          refetch();
          notifications.show({
            title: "Produto excluído",
            message:
              response.data.message ||
              `O produto "${name}" foi removido do catálogo com sucesso.`,
            color: "red",
          });
        } catch {
          // Notificação tratada no interceptor do Axios
        }
      },
    });
  };

  // Produtos ordenados
  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortField, sortDirection);
  }, [products, sortField, sortDirection]);

  // Paginação e totais
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const paginatedProducts = useMemo(() => {
    return paginateProducts(sortedProducts, activePage, pageSize);
  }, [sortedProducts, activePage, pageSize]);

  // Produtos em destaque (primeiros 4)
  const featuredProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  return {
    products,
    sortedProducts,
    paginatedProducts,
    featuredProducts,
    loading,
    error,
    errorDismissed,
    dismissError: () => setErrorDismissed(true),
    activePage,
    pageSize,
    totalPages,
    sortField,
    sortDirection,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleDelete,
  };
}
