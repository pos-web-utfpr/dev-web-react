import CartContextProvider from "../contexts/CartContext";
import { Header } from "../components/Header";
import { ProductList } from "../components/ProductList";

export default function Home() {
  return (
    <CartContextProvider>
      <main>
        <Header />
        <ProductList />
      </main>
    </CartContextProvider>
  );
}
