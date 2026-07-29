import type { Product } from "../mocks/products";
import { useCartContext } from "../contexts/CartContext";
import { formatCurrency } from "../helpers/formatCurrency";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const { items, addItem, removeItem } = useCartContext();

  const quantityInCart = items.filter((item) => item.id === product.id).length;

  return (
    <li>
      <article>
        <img src={product.image} alt={product.name} width="120" />
        <h3>{product.name}</h3>
        <p><strong>Categoria:</strong> {product.category}</p>
        <p>{product.description}</p>
        <p><strong>Preço:</strong> {formatCurrency(product.price)}</p>
        <p><strong>No carrinho:</strong> {quantityInCart}</p>
        <div>
          <button onClick={() => addItem(product)}>
            Adicionar ao carrinho
          </button>
          {" "}
          <button
            onClick={() => removeItem(product.id)}
            disabled={quantityInCart === 0}
          >
            Remover do carrinho
          </button>
        </div>
      </article>
      <hr />
    </li>
  );
}
