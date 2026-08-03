"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: string;
  specifications: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "sisteoffic-cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

function parsePrice(price: string): number {
  const numeric = price.replace(/[^0-9]/g, "");
  return numeric ? Number.parseInt(numeric, 10) : 0;
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readStoredCart());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0),
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}
