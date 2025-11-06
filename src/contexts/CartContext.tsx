"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = any;
type Ctx = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (tour: any, cantidad?: number, start?: string, end?: string) => void;
  removeFromCart: (idOrSlug: string | number) => void;
  clearCart: () => void;
};

const CartContext = createContext<Ctx | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Evita tocar localStorage en el servidor
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setCartItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems, isHydrated]);

  const addToCart = (tour: any, cantidad = 1, start?: string, end?: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const fecha = tomorrow.toISOString().split("T")[0];

    setCartItems((prev) => {
      if (prev.some((i) => i.slug === tour.slug)) return prev;
      return [
        ...prev,
        {
          id: tour.id,
          slug: tour.slug,
          titulo: tour.titulo,
          imageUrl: tour.foto_principal,
          resumen: tour.resumen,
          precio: tour.precio,
          fecha,
          cantidad,
          title: tour.titulo,
          location: tour.ubicaciones?.[0]?.nombre || "Ubicación no disponible",
          duration: `${tour.itinerarios?.length || 1} días`,
          difficulty: tour.tipo_categoria?.nombre || "No especificado",
          groupSize: 12,
          transport: "Incluido",
          date_start: start,
          date_end: end,
        },
      ];
    });
  };

  const removeFromCart = (idOrSlug: string | number) =>
  setCartItems(prev =>
    prev.filter(i => String(i.slug ?? i.id ?? i.tour_id ?? i.codigo ?? "") !== String(idOrSlug))
  );

  const clearCart = () => setCartItems([]);

  const value = useMemo(
    () => ({ cartItems, setCartItems, addToCart, removeFromCart, clearCart }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
