import React, { useState } from 'react';
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
import { zodResolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import {
  IconArrowLeft,
  IconPackage,
  IconCurrencyDollar,
  IconFileText,
  IconHash,
  IconPlus,
} from '@tabler/icons-react';
import { api } from '../services/api';
import { ProductFormSchema } from '../schemas/ProductSchema';

export const ProdutoCadastro: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormSchema>({
    initialValues: {
      nome: '',
      preco: 0,
      descricao: '',
      quantidade: 0,
    },

    validateInputOnBlur: true,
    validate: zodResolver(ProductFormSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const response = await api.post('/produtos', {
        nome: values.nome,
        preco: values.preco,
        descricao: values.descricao,
        quantidade: values.quantidade,
      });

      notifications.show({
        title: 'Produto cadastrado',
        message: response.data.message || `O produto "${values.nome}" foi cadastrado com sucesso!`,
        color: 'green',
      });

      navigate('/app/produtos');
    } catch {
      // Erro é notificado globalmente pelo interceptor do Axios
    } finally {
      setLoading(false);
    }
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
                loading={loading}
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

