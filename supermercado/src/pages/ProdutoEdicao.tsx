import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Button,
  Stack,
  TextInput,
  NumberInput,
  Textarea,
  Alert,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  IconArrowLeft,
  IconPackage,
  IconCurrencyDollar,
  IconFileText,
  IconHash,
  IconDeviceFloppy,
  IconAlertCircle,
} from '@tabler/icons-react';
import { mockProdutos } from '../mocks/serveRestMocks';

export const ProdutoEdicao: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const produto = mockProdutos.find((item) => item._id === id);

  const form = useForm({
    initialValues: {
      nome: produto?.nome ?? '',
      preco: produto?.preco ?? 0,
      descricao: produto?.descricao ?? '',
      quantidade: produto?.quantidade ?? 0,
    },

    validateInputOnBlur: true,

    validate: {
      nome: (value) => {
        if (!value.trim()) return 'O nome do produto é obrigatório';
        if (value.trim().length < 2) return 'O nome deve ter pelo menos 2 caracteres';
        return null;
      },
      preco: (value) => {
        if (value === undefined || value === null || typeof value !== 'number' || isNaN(value)) {
          return 'O preço é obrigatório';
        }
        if (value <= 0) return 'O preço deve ser maior que zero';
        return null;
      },
      descricao: (value) => {
        if (!value.trim()) return 'A descrição é obrigatória';
        if (value.trim().length < 3) return 'A descrição deve ter pelo menos 3 caracteres';
        return null;
      },
      quantidade: (value) => {
        if (value === undefined || value === null || typeof value !== 'number' || isNaN(value)) {
          return 'A quantidade é obrigatória';
        }
        if (value < 0) return 'A quantidade não pode ser negativa';
        return null;
      },
    },
  });

  if (!id || !produto) {
    return (
      <Container size="sm" py="xl">
        <Alert
          color="red"
          title="Produto não encontrado"
          icon={<IconAlertCircle size={20} />}
          mb="lg"
        >
          Nenhum produto foi encontrado para edição com o ID "{id}".
        </Alert>
        <Button
          component={Link}
          to="/app/produtos"
          variant="outline"
          leftSection={<IconArrowLeft size={18} />}
        >
          Voltar para a lista de produtos
        </Button>
      </Container>
    );
  }

  const handleSubmit = (values: typeof form.values) => {
    // Fake / Pronta para integração com a API no futuro
    console.log('Editar produto (payload para API):', { id, ...values });

    notifications.show({
      title: 'Produto atualizado',
      message: `O produto "${values.nome}" foi atualizado com sucesso!`,
      color: 'blue',
    });
    navigate('/app/produtos');
  };

  return (
    <Container size="sm" py="xl">
      <Button
        component={Link}
        to="/app/produtos"
        variant="subtle"
        leftSection={<IconArrowLeft size={18} />}
        mb="md"
      >
        Voltar para a lista de produtos
      </Button>

      <Card withBorder padding="lg" radius="md">
        <Group justify="space-between" align="flex-start" mb="md">
          <Box>
            <Title order={2}>Editar Produto</Title>
            <Text c="dimmed" size="sm" mt={4}>
              Alterando os dados do produto ID: <strong>{id}</strong>
            </Text>
          </Box>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Nome do Produto"
              placeholder="Ex: Teclado Mecânico"
              leftSection={<IconPackage size={18} />}
              withAsterisk
              {...form.getInputProps('nome')}
            />

            <NumberInput
              label="Preço (R$)"
              placeholder="0.00"
              decimalScale={2}
              fixedDecimalScale
              min={0}
              leftSection={<IconCurrencyDollar size={18} />}
              withAsterisk
              {...form.getInputProps('preco')}
            />

            <Textarea
              label="Descrição"
              placeholder="Descrição detalhada do produto"
              rows={4}
              leftSection={<IconFileText size={18} />}
              withAsterisk
              {...form.getInputProps('descricao')}
            />

            <NumberInput
              label="Quantidade em Estoque"
              placeholder="0"
              min={0}
              allowDecimal={false}
              leftSection={<IconHash size={18} />}
              withAsterisk
              {...form.getInputProps('quantidade')}
            />

            <Group justify="flex-end" mt="lg">
              <Button
                variant="outline"
                component={Link}
                to="/app/produtos"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="filled"
                color="blue"
                leftSection={<IconDeviceFloppy size={18} />}
              >
                Salvar Alterações
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};
