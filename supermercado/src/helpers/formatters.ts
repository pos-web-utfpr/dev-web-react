/**
 * Utilitários para formatação de valores na aplicação.
 */

/**
 * Formata um valor numérico para o padrão de moeda brasileira (BRL).
 * Exemplo: 12.5 -> "R$ 12,50"
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Formata a quantidade em estoque com unidade de medida.
 * Exemplo: 10 -> "10 un."
 */
export const formatStock = (quantity: number): string => {
  return `${quantity} un.`;
};
