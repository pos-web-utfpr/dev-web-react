import React from "react";
import {
  Stack,
  TextInput,
  NumberInput,
  Textarea,
  Group,
  Button,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import {
  IconPackage,
  IconCurrencyDollar,
  IconFileText,
  IconHash,
} from "@tabler/icons-react";
import type { ProductFormValues } from "../../schemas/product-schema";

interface ProductFormProps {
  form: UseFormReturnType<ProductFormValues>;
  loading: boolean;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
  submitLabel: string;
  submitIcon: React.ReactNode;
  submitColor?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  form,
  loading,
  onSubmit,
  onCancel,
  submitLabel,
  submitIcon,
  submitColor = "blue",
}) => {
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Nome do Produto"
          placeholder="Ex: Teclado Mecânico"
          leftSection={<IconPackage size={18} />}
          withAsterisk
          {...form.getInputProps("nome")}
        />

        <NumberInput
          label="Preço (R$)"
          placeholder="0.00"
          decimalScale={2}
          fixedDecimalScale
          min={0}
          leftSection={<IconCurrencyDollar size={18} />}
          withAsterisk
          {...form.getInputProps("preco")}
        />

        <Textarea
          label="Descrição"
          placeholder="Descrição detalhada do produto"
          rows={4}
          leftSection={<IconFileText size={18} />}
          withAsterisk
          {...form.getInputProps("descricao")}
        />

        <NumberInput
          label="Quantidade em Estoque"
          placeholder="0"
          min={0}
          allowDecimal={false}
          leftSection={<IconHash size={18} />}
          withAsterisk
          {...form.getInputProps("quantidade")}
        />

        <Group justify="flex-end" mt="lg">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="filled"
            color={submitColor}
            loading={loading}
            leftSection={submitIcon}
          >
            {submitLabel}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
