import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import { api } from "../services/api";
import { LoginSchema } from "../schemas/login-schema";

export function useLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginSchema>({
    initialValues: {
      email: "fulano@qa.com",
      password: "teste",
    },
    validateInputOnBlur: true,
    validate: zodResolver(LoginSchema),
  });

  const handleLogin = async (values: LoginSchema) => {
    setLoading(true);
    try {
      const response = await api.post("/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.authorization) {
        localStorage.setItem("token", response.data.authorization);
      }

      notifications.show({
        title: "Login realizado",
        message:
          response.data.message ||
          `Bem-vindo ao sistema ServeRest ERP (${values.email})!`,
        color: "green",
      });
      navigate("/app");
    } catch {
      // Notificação de erro tratada no interceptor do Axios
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return {
    form,
    loading,
    handleLogin,
    handleNavigateHome,
  };
}

export type UseLoginFormType = UseFormReturnType<LoginSchema>;
