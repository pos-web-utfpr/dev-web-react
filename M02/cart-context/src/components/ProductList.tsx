import { products } from "../mocks/products";
import { ProductItem } from "./ProductItem";

export function ProductList() {
  return (
    <section>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}
