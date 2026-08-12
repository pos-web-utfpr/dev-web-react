import axios from "axios";
import { notifications } from "@mantine/notifications";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://serverest.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição: insere o token do localStorage nos cabeçalhos
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de resposta: tratamento de 401/403, extração global de mensagem de erro da ServeRest e notificação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Trata erro de autenticação/autorização (401/403)
    if (
      error?.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Extrai mensagem da ServeRest ou usa mensagem genérica em caso de falha de rede/offline
    const errorMessage =
      error?.response?.data?.message ||
      "Ocorreu um erro ao se comunicar com o servidor.";

    // Exibe notificação de erro amigável ao usuário
    notifications.show({
      title: "Erro na requisição",
      message: errorMessage,
      color: "red",
    });

    // Repassa o erro para permitir tratamento adicional nos componentes se necessário
    return Promise.reject(error);
  },
);
