import React, { useState, useEffect } from 'react';
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
  LoadingOverlay,
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
  IconDeviceFloppy,
  IconAlertCircle,
} from '@tabler/icons-react';
import { api } from '../services/api';
import { useAsyncData } from '../hooks/useAsyncData';
import { ProductSchema, ProductFormSchema } from '../schemas/ProductSchema';

export const ProdutoEdicao: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const {
    data: produto,
    loading: fetchingProduto,
    error,
  } = useAsyncData(async () => {
    if (!id) throw new Error('ID do produto não informado.');
    const response = await api.get(`/produtos/${id}`);
    return ProductSchema.parse(response.data);
  }, [id]);

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

  useEffect(() => {
    if (produto) {
      form.setValues({
        nome: produto.nome,
        preco: produto.preco,
        descricao: produto.descricao,
        quantidade: produto.quantidade,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produto]);

  const handleSubmit = async (values: typeof form.values) => {
    if (!id) return;
    setSaving(true);
    try {
      const response = await api.put(`/produtos/${id}`, {
        nome: values.nome,
        preco: values.preco,
        descricao: values.descricao,
        quantidade: values.quantidade,
      });

      notifications.show({
        title: 'Produto atualizado',
        message: response.data.message || `O produto "${values.nome}" foi atualizado com sucesso!`,
        color: 'blue',
      });

      navigate('/app/produtos');
    } catch {
      // Notificação de erro é tratada pelo interceptor do Axios
    } finally {
      setSaving(false);
    }
  };

  if (fetchingProduto) {
    return (
      <Container size="sm" py="xl" pos="relative" style={{ minHeight: 200 }}>
        <LoadingOverlay
          visible
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'blue', type: 'dots' }}
        />
      </Container>
    );
  }

  if (error || !id) {
    return (
      <Container size="sm" py="xl">
        <Alert
          color="red"
          title="Produto não encontrado"
          icon={<IconAlertCircle size={20} />}
          mb="lg"
        >
          {error || `Nenhum produto foi encontrado para edição com o ID "${id}".`}
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
                loading={saving}
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

