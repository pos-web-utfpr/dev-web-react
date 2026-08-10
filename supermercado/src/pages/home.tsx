import React from "react";
import { Link } from "react-router";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
} from "@mantine/core";
import { IconBuildingStore, IconLogin } from "@tabler/icons-react";

export const Home: React.FC = () => {
  return (
    <Container size="sm" py="xl">
      <Card radius="md" p="xl" withBorder>
        <Stack align="center" gap="md">
          <IconBuildingStore size={48} color="var(--mantine-color-blue-6)" />

          <Title order={1} ta="center">
            Sistema ServeRest ERP
          </Title>

          <Text c="dimmed" ta="center" size="lg">
            Plataforma de gestão integrada de catálogo de produtos, controle de
            estoque e relatórios de vendas.
          </Text>

          <Group justify="center" mt="md">
            <Button
              component={Link}
              to="/login"
              size="md"
              leftSection={<IconLogin size={20} />}
            >
              Acessar o Painel
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
};
