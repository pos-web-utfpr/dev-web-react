import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Card, Title, Text, TextInput, PasswordInput, Button, Stack, Group, Anchor } from '@mantine/core';
import { IconMail, IconLock, IconLogin, IconBuildingStore } from '@tabler/icons-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Insira um e-mail válido'),
      password: (value) => (value.length >= 4 ? null : 'A palavra-passe deve ter pelo menos 4 caracteres'),
    },
  });

  const handleSubmit = () => {
    notifications.show({
      title: 'Login realizado',
      message: 'Bem-vindo ao sistema ServeRest UI ERP!',
      color: 'green',
    });
    navigate('/app');
  };


  return (
    <Card shadow="md">
      <Group justify="center" gap="xs" mb="xs">
        <IconBuildingStore size={32} color="var(--mantine-color-blue-6)" />
        <Title order={2}>ServeRest ERP</Title>
      </Group>

      <Text c="dimmed" size="sm" ta="center" mb="lg">
        Digite suas credenciais para acessar o painel
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="E-mail"
            placeholder="seu.email@exemplo.com"
            leftSection={<IconMail size={18} />}
            type="email"
            autoComplete="email"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Palavra-passe"
            placeholder="Sua senha"
            leftSection={<IconLock size={18} />}
            autoComplete="current-password"
            {...form.getInputProps('password')}
          />

          <Button type="submit" variant="filled" fullWidth leftSection={<IconLogin size={18} />} mt="sm">
            Entrar no Sistema
          </Button>

          <Group justify="center">
            <Anchor component="button" type="button" c="dimmed" size="xs" onClick={() => navigate('/')}>
              Voltar para a página inicial
            </Anchor>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};

