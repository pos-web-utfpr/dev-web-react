import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import type { Product } from "../mocks/products";

// 1. Define your context props
export interface CartContextProps {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  totalPrice: number;
}

// 2. Create a new empty (undefined) context (you don't need to export it if using only the custom hook)
export const CartContext = createContext<CartContextProps | undefined>(
  undefined,
);

// 3. Create a custom context provider, so all context data will be self-contained
export default function CartContextProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setItems((prevItems) => [...prevItems, product]);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  const value: CartContextProps = {
    items,
    addItem,
    removeItem,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

// 4. Create a custom consumer hook (check Timeline.tsx for usage)
export function useCartContext() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartContext must be used inside CartContextProvider!");
  }

  return context;
}
