import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import {
  Card,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Anchor,
} from "@mantine/core";
import {
  IconMail,
  IconLock,
  IconLogin,
  IconBuildingStore,
} from "@tabler/icons-react";
import { api } from "../services/api";
import { LoginSchema } from "../schemas/LoginSchema";

export const Login: React.FC = () => {
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

  const handleSubmit = async (values: typeof form.values) => {
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
      // A notificação visual de erro é tratada globalmente pelo interceptor do Axios em api.ts
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Group justify="center" gap="xs" mb="xs">
        <IconBuildingStore size={32} color="var(--mantine-color-blue-6)" />
        <Title order={2}>ServeRest ERP</Title>
      </Group>

      <Text c="dimmed" size="sm" ta="center" mb="lg">
        Digite suas credenciais para acessar o painel
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="E-mail"
            placeholder="seu.email@exemplo.com"
            leftSection={<IconMail size={18} />}
            type="email"
            autoComplete="email"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            leftSection={<IconLock size={18} />}
            autoComplete="current-password"
            {...form.getInputProps("password")}
          />

          <Button
            type="submit"
            variant="filled"
            fullWidth
            loading={loading}
            leftSection={<IconLogin size={18} />}
            mt="sm"
          >
            Entrar no Sistema
          </Button>

          <Group justify="center">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => navigate("/")}
            >
              Voltar para a página inicial
            </Anchor>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};
