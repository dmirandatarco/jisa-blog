"use client";

import TarjetasMetodos from "@/components/cart/TarjetasMetodos";
import CartIcon from "@/assets/icons/CartIcon";
import ListCartTour from "@/components/cart/ListCartTour";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

function normId(x: any) {
  return String(x?.slug ?? x?.id ?? x?.tour_id ?? x?.codigo ?? "");
}

export default function Step1Cart({
  handleNext,
}: {
  handleNext: () => void;
}) {
  const { cartItems, setCartItems, removeFromCart } = useCart();

  const isEmpty = cartItems.length === 0;

  const totalItems = cartItems.reduce((acc, it) => acc + Number(it.cantidad ?? 1), 0);
  const subtotalNum = cartItems.reduce(
    (acc, it) => acc + Number(it.precio ?? 0) * Number(it.cantidad ?? 1),
    0
  );
  const subtotal = subtotalNum.toFixed(2);

  const handleCantidadChange = (id: number | string, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) return;
    setCartItems(prev =>
      prev.map(it =>
        normId(it) === String(id) ? { ...it, cantidad: nuevaCantidad } : it
      )
    );
  };

  const handleRemove = (id: number | string) => {
    // si tu removeFromCart ya hace el filtro por id, genial;
    // si no, aquí tienes cómo hacerlo con setCartItems:
    // setCartItems(prev => prev.filter(it => normId(it) !== String(id)));
    removeFromCart(id);
  };

  return (
    <div className="Step1 w-full max-w-7xl mx-auto mb-12">
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-8 col-span-12 flex flex-col bg-JisaGris/5 rounded-xl p-6">
          <h5 className="text-JisaVerde font-semibold text-2xl">Carrito</h5>
          <span className="text-JisaGris font-medium text-base">Items({totalItems})</span>

          {isEmpty ? (
            <div className="mt-6 p-6 rounded-md bg-white text-center border border-dashed border-JisaGris/30">
              <p className="text-JisaGris font-medium">Tu carrito está vacío.</p>
              <p className="text-JisaGrisTextGray text-sm">Agrega un tour para continuar.</p>
            </div>
          ) : (
            <div className="flex-col flex gap-y-8">
              <ListCartTour
                tours={cartItems}
                onCantidadChange={handleCantidadChange}
                onRemove={handleRemove}
              />
            </div>
          )}
        </div>

        <div className="md:col-span-4 col-span-12 flex flex-col">
          <div className="bg-JisaGris/5 p-4 flex justify-center items-center flex-col rounded-md">
            <h5 className="text-JisaVerde font-semibold text-2xl">Resumen de la orden</h5>
            <div className="mt-2 w-[80%] self-center border-t border-JisaGris/20"></div>

            <div className="mt-8 px-6 flex flex-col gap-y-1 w-full">
              <div className="flex justify-between w-full">
                <span className="font-medium text-sm text-JisaGris">Subtotal</span>
                <span className="font-semibold text-base text-JisaGris">USD $ {subtotal}</span>
              </div>

              <div className="mt-2 w-full self-center border-t border-JisaGris/20"></div>

              <div className="flex justify-between w-full">
                <span className="font-medium text-sm text-JisaGris">Total</span>
                <span className="font-bold text-xl text-JisaGris">USD $ {subtotal}</span>
              </div>

              <div className="flex justify-center mt-4">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isEmpty) handleNext();
                  }}
                  href="#"
                  className={`rounded-xl text-center items-center flex px-6 md:font-medium font-bold md:text-base text-xl py-1 ${
                    isEmpty
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                      : "bg-JisaCyan text-white"
                  }`}
                >
                  Continuar el pago
                </a>
              </div>

              <Link href="/" className="cart-form text-JisaCyan flex gap-x-4 justify-center py-4">
                <CartIcon size={20} />
                <span className="font-bold text-sm">Continuar comprando</span>
              </Link>

              <TarjetasMetodos />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
