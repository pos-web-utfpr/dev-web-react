import React from "react";
import { Group, Title, Text, Badge } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export const DashboardHeader: React.FC = () => {
  return (
    <Group justify="space-between" align="center">
      <div>
        <Title order={1}>Painel Administrativo</Title>
        <Text c="dimmed" mt="xs">
          Bem-vindo ao sistema de gestão do usuário autenticado.
        </Text>
      </div>
      <Badge
        color="green"
        variant="light"
        size="lg"
        leftSection={<IconCheck size={14} />}
      >
        Sistema Operacional
      </Badge>
    </Group>
  );
};
