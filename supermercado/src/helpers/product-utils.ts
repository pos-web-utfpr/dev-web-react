import type { Product } from "../schemas/product-schema";

export type SortField = "nome" | "preco" | "quantidade";
export type SortDirection = "asc" | "desc";

/**
 * Ordena a lista de produtos com base no campo e direção especificados.
 */
export const sortProducts = (
  products: Product[],
  sortField: SortField | null,
  sortDirection: SortDirection
): Product[] => {
  if (!sortField) return products;

  return [...products].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    if (typeof valA === "string" && typeof valB === "string") {
      return sortDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }

    return 0;
  });
};

/**
 * Fatia o array de produtos para retornar apenas os itens da página atual.
 */
export const paginateProducts = (
  products: Product[],
  activePage: number,
  pageSize: number
): Product[] => {
  const start = (activePage - 1) * pageSize;
  return products.slice(start, start + pageSize);
};
