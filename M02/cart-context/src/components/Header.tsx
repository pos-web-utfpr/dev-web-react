import { useCartContext } from "../contexts/CartContext";
import { formatCurrency } from "../helpers/formatCurrency";

export function Header() {
  const { items, totalPrice } = useCartContext();

  return (
    <header>
      <h1>Loja de Produtos</h1>
      <p>
        <strong>Itens no Carrinho:</strong> {items.length}
      </p>
      <p>
        <strong>Total da Compra:</strong> {formatCurrency(totalPrice)}
      </p>
      <hr />
    </header>
  );
}
