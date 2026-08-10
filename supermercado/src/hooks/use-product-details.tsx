import { useNavigate, useParams } from "react-router";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { api } from "../services/api";
import { useAsyncData } from "./use-async-data";
import { ProductSchema } from "../schemas/product-schema";

export function useProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: product,
    loading,
    error,
  } = useAsyncData(async () => {
    if (!id) throw new Error("ID do produto não informado.");
    const response = await api.get(`/produtos/${id}`);
    return ProductSchema.parse(response.data);
  }, [id]);

  const handleDelete = () => {
    if (!product) return;
    modals.openConfirmModal({
      title: "Confirmar exclusão do produto",
      children: (
        <Text size="sm">
          Tem certeza de que deseja excluir o produto{" "}
          <strong>{product.nome}</strong>? Esta ação não pode ser desfeita.
        </Text>
      ),
      labels: { confirm: "Excluir produto", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          const response = await api.delete(`/produtos/${product._id}`);
          notifications.show({
            title: "Produto excluído",
            message:
              response.data.message ||
              `O produto ${product.nome} foi removido com sucesso.`,
            color: "red",
          });
          navigate("/app/produtos");
        } catch {
          // Notificação de erro tratada pelo interceptor em api.ts
        }
      },
    });
  };

  const handleNavigateBack = () => {
    navigate("/app/produtos");
  };

  return {
    id,
    product,
    loading,
    error,
    handleDelete,
    handleNavigateBack,
  };
}
