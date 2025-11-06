"use client";

import { useCart } from "@/contexts/CartContext";
import CartWizard from "@/components/cart/CartWizard";

export default function CartClient() {
  const { cartItems } = useCart();

  const itemsCount = cartItems.length;

  const passengerForms = cartItems.length
    ? cartItems.reduce((max, tour) => Math.max(max, Number(tour.cantidad || 0)), 0)
    : 0;

  const subtotalNum = cartItems.reduce(
    (acc, tour) => acc + Number(tour.cantidad || 0) * Number(tour.precio || 0),
    0
  );
  const impuestosNum = subtotalNum * 0.06;
  const totalNum = subtotalNum + impuestosNum;

  return (
    <div className="relative inset-1 w-full max-w-7xl mx-auto md:mt-48 mb-12 py-4">
      <CartWizard
        tours={cartItems}
        itemsCount={itemsCount}
        totalItems={passengerForms}
        subtotal={subtotalNum.toFixed(2)}
        impuestos={impuestosNum.toFixed(2)}
        totalPrice={totalNum.toFixed(2)}
      />
    </div>
  );
}