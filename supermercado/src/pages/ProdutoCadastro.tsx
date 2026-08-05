import React from 'react';
import { Link, useNavigate } from 'react-router';
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
  IconPlus,
} from '@tabler/icons-react';

export const ProdutoCadastro: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      nome: '',
      preco: 0,
      descricao: '',
      quantidade: 0,
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

  const handleSubmit = (values: typeof form.values) => {
    // Fake / Pronta para integração com a API no futuro
    console.log('Criar produto (payload para API):', values);

    notifications.show({
      title: 'Produto cadastrado',
      message: `O produto "${values.nome}" foi cadastrado com sucesso!`,
      color: 'green',
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
            <Title order={2}>Cadastrar Produto</Title>
            <Text c="dimmed" size="sm" mt={4}>
              Preencha os campos abaixo para adicionar um novo produto ao catálogo.
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
                leftSection={<IconPlus size={18} />}
              >
                Cadastrar Produto
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};
