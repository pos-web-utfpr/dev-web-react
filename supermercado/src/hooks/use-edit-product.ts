import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import { api } from "../services/api";
import { useAsyncData } from "./use-async-data";
import {
  ProductSchema,
  ProductFormSchema,
  type ProductFormValues,
} from "../schemas/product-schema";

export function useEditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const {
    data: product,
    loading: fetchingProduct,
    error,
  } = useAsyncData(async () => {
    if (!id) throw new Error("ID do produto não informado.");
    const response = await api.get(`/produtos/${id}`);
    return ProductSchema.parse(response.data);
  }, [id]);

  const form = useForm<ProductFormValues>({
    initialValues: {
      nome: "",
      preco: 0,
      descricao: "",
      quantidade: 0,
    },
    validateInputOnBlur: true,
    validate: zodResolver(ProductFormSchema),
  });

  useEffect(() => {
    if (product) {
      form.setValues({
        nome: product.nome,
        preco: product.preco,
        descricao: product.descricao,
        quantidade: product.quantidade,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleUpdateProduct = async (values: ProductFormValues) => {
    if (!id) return;
    setSaving(true);
    try {
      const response = await api.put(`/produtos/${id}`, {
        nome: values.nome,
        preco: values.preco,
        descricao: values.descricao,
        quantidade: values.quantidade,
      });

      notifications.show({
        title: "Produto atualizado",
        message:
          response.data.message ||
          `O produto "${values.nome}" foi atualizado com sucesso!`,
        color: "blue",
      });

      navigate("/app/produtos");
    } catch {
      // Notificação de erro é tratada pelo interceptor do Axios
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/app/produtos");
  };

  return {
    id,
    form,
    saving,
    fetchingProduct,
    error,
    handleUpdateProduct,
    handleCancel,
  };
}
