import React from 'react';
import { Link } from 'react-router';
import { Container, Title, Text, Button, Card, Group } from '@mantine/core';
import { IconAlertTriangle, IconHome } from '@tabler/icons-react';

export const NotFound: React.FC = () => {
  return (
    <Container size="sm" py="xl">
      <Card style={{ textAlign: 'center' }}>
        <Group justify="center" mb="xs">
          <IconAlertTriangle size={48} color="var(--mantine-color-orange-6)" />
        </Group>
        <Title order={1}>404 - Página Não Encontrada</Title>
        <Text c="dimmed" mt="xs" mb="lg">
          A página que você procura não existe ou foi movida.
        </Text>
        <Group justify="center">
          <Button component={Link} to="/" variant="filled" leftSection={<IconHome size={18} />}>
            Voltar para a Página Inicial
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

