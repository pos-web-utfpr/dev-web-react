import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import { api } from "../services/api";
import {
  ProductFormSchema,
  type ProductFormValues,
} from "../schemas/product-schema";

export function useCreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const handleCreateProduct = async (values: ProductFormValues) => {
    setLoading(true);
    try {
      const response = await api.post("/produtos", {
        nome: values.nome,
        preco: values.preco,
        descricao: values.descricao,
        quantidade: values.quantidade,
      });

      notifications.show({
        title: "Produto cadastrado",
        message:
          response.data.message ||
          `O produto "${values.nome}" foi cadastrado com sucesso!`,
        color: "green",
      });

      navigate("/app/produtos");
    } catch {
      // Notificação tratada no interceptor do Axios
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/app/produtos");
  };

  return {
    form,
    loading,
    handleCreateProduct,
    handleCancel,
  };
}
