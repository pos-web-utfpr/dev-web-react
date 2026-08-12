import React from "react";
import { NavLink as RouterNavLink, Outlet, useNavigate } from "react-router";
import {
  AppShell,
  Burger,
  Container,
  Group,
  Title,
  Button,
  Stack,
  NavLink as MantineNavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconDashboard,
  IconShoppingBag,
  IconLogout,
  IconBuildingStore,
} from "@tabler/icons-react";

export const RootLayout: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    notifications.show({
      title: "Sessão encerrada",
      message: "Você saiu do sistema com sucesso.",
      color: "blue",
    });
    navigate("/login");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      bg="gray.0"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group
              gap="xs"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/app")}
            >
              <IconBuildingStore
                size={26}
                color="var(--mantine-color-blue-6)"
              />
              <Title order={3}>ServeRest ERP</Title>
            </Group>
          </Group>

          <Button
            variant="outline"
            color="red"
            size="xs"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <RouterNavLink
            to="/app"
            end
            style={{ textDecoration: "none" }}
            onClick={close}
          >
            {({ isActive }) => (
              <MantineNavLink
                component="div"
                label="Dashboard"
                leftSection={<IconDashboard size={20} />}
                active={isActive}
                variant="filled"
                style={{ borderRadius: "var(--mantine-radius-md)" }}
              />
            )}
          </RouterNavLink>

          <RouterNavLink
            to="/app/produtos"
            style={{ textDecoration: "none" }}
            onClick={close}
          >
            {({ isActive }) => (
              <MantineNavLink
                component="div"
                label="Produtos"
                leftSection={<IconShoppingBag size={20} />}
                active={isActive}
                variant="filled"
                style={{ borderRadius: "var(--mantine-radius-md)" }}
              />
            )}
          </RouterNavLink>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg" py="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
