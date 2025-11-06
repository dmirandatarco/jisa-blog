"use client";

import React from "react";
import { apiFetch } from "@/lib/apiClient";
import TarjetasMetodos from "@/components/cart/TarjetasMetodos";
import InfoIcon from "@/assets/icons/InfoIcon";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function Step3Cart({
  totalUSD,
  contact,
  onBack,
  orderId: orderIdProp,
}: {
  totalUSD: number;
  contact: any;
  onBack: () => void;
  orderId?: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();
  const { clearCart } = useCart();

  const orderId = React.useMemo(
    () =>
      orderIdProp ||
      (typeof window !== "undefined" ? localStorage.getItem("order_id") : "") ||
      "",
    [orderIdProp]
  );

  // ENV "trimeadas" para evitar espacios invisibles:
  const OPENPAY_MERCHANT_ID = (process.env.NEXT_PUBLIC_OPENPAY_MERCHANT_ID || "").trim();
  const OPENPAY_PUBLIC_KEY  = (process.env.NEXT_PUBLIC_OPENPAY_PUBLIC_KEY  || "").trim();
  const IS_PROD             = (process.env.NEXT_PUBLIC_OPENPAY_PROD        || "").trim() === "true";

  // Esperar a que OpenPay (core + token + deviceData.setup) esté listo
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const ok = () => {
      const OP = (window as any).OpenPay;
      return !!(OP && OP.token && OP.deviceData && typeof OP.deviceData.setup === "function");
    };

    if (ok()) {
      setReady(true);
      return;
    }

    let tries = 0;
    const t = setInterval(() => {
      if (ok() || tries++ > 80) { // ~12s
        setReady(ok());
        clearInterval(t);
      }
    }, 150);

    return () => clearInterval(t);
  }, []);

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!orderId) {
      setError("No se encontró el código de reserva. Regresa al paso anterior para generarlo.");
      return;
    }

    if (!OPENPAY_MERCHANT_ID || !OPENPAY_PUBLIC_KEY) {
      setError("OpenPay no está configurado (merchant/public key vacíos).");
      return;
    }

    const OP = (typeof window !== "undefined" ? (window as any).OpenPay : undefined);
    if (!ready || !OP?.token || !OP?.deviceData?.setup) {
      setError("Cargando OpenPay… intenta nuevamente en unos segundos.");
      return;
    }

    try {
      setLoading(true);

      OP.setId(OPENPAY_MERCHANT_ID);
      OP.setApiKey(OPENPAY_PUBLIC_KEY);
      OP.setSandboxMode(!IS_PROD); // prod=true -> sandbox OFF

      // Antifraude: el name del input hidden debe coincidir EXACTO
      const deviceId = OP.deviceData.setup("payment-form", "deviceIdHiddenFieldName");

      const form = e.currentTarget;

      OP.token.extractFormAndCreate(
        form,
        async (success: any) => {
          try {
            const tokenId = success?.data?.id;
            if (!tokenId) throw new Error("Token no recibido");

            // ⚠️ El backend debe validar el total por order_id
            const data = await apiFetch<{ redirect_url?: string }>({
              endpoint: "payments/openpay/charge",
              method: "POST",
              body: {
                order_id: orderId,
                amount: Number(totalUSD),
                token_id: tokenId,
                device_session_id: deviceId,
                customer: {
                  name:        contact?.name || "",
                  last_name:   contact?.last_name || "",
                  email:       contact?.email || "",
                  phone_number:contact?.phone || "",
                  country_code:contact?.country_code || "PE",
                },
              },
            });

            // Si 3DS requiere redirección:
            if (data?.redirect_url) {
              window.location.href = data.redirect_url;
              return;
            }

            // Pago OK sin 3DS
            clearCart();
            localStorage.removeItem("order_id");
            router.replace("/gracias");
          } catch (err: any) {
            // Si tu API te devolvió un 401/1002 (keys inválidas), lo verás aquí
            setError(err?.message || "Error de pago");
          } finally {
            setLoading(false);
          }
        },
        (err: any) => {
          // Error al tokenizar
          setLoading(false);
          // Opcional: console.error("OpenPay token error:", err);
          setError(err?.description || err?.message || "Error al tokenizar la tarjeta");
        }
      );
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Error al iniciar el pago");
    }
  };

  
  return (
    <div className="Step3 w-full max-w-7xl mx-auto mb-6 px-4">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-6 bg-JisaGris/5 rounded-xl px-4 md:px-10 py-4 md:py-6">
          <h5 className="text-JisaCyan font-semibold text-xl md:text-2xl">
            Código de reserva:
            <span className="text-JisaGris px-2 md:px-4">{" "}JISA-{orderId || "—"}</span>
          </h5>
          {!orderId && (
            <p className="text-red-600 text-sm mt-2">
              No se encontró la reserva. Vuelve al paso anterior para generarla.
            </p>
          )}
        </div>

        <div className="col-span-12 md:col-span-6 bg-JisaGris/5 rounded-xl px-4 md:px-10 py-4 md:py-6">
          <div className="flex items-center text-JisaVerde mb-2">
            <InfoIcon />
            <span className="px-2 font-semibold text-xl md:text-2xl">Información de pago</span>
          </div>

          <form id="payment-form" onSubmit={handlePay} className="space-y-3">
            <input data-openpay-card="holder_name" placeholder="Titular" required className="h-10 w-full rounded-md px-3 bg-white" />
            <input
              data-openpay-card="card_number"
              placeholder="Número de tarjeta"
              required
              className="h-10 w-full rounded-md px-3 bg-white"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={19}
              onInput={(e: any) => (e.target.value = e.target.value.replace(/\D/g, ""))}
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                data-openpay-card="expiration_month"
                placeholder="MM"
                required
                className="h-10 w-full rounded-md px-3 bg-white"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                onInput={(e: any) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              />
              <input
                data-openpay-card="expiration_year"
                placeholder="YY"
                required
                className="h-10 w-full rounded-md px-3 bg-white"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                onInput={(e: any) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              />
              <input
                data-openpay-card="cvv2"
                placeholder="CVV"
                required
                className="h-10 w-full rounded-md px-3 bg-white"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                onInput={(e: any) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              />
            </div>

            {/* Debe coincidir EXACTO con el segundo argumento de deviceData.setup */}
            <input type="hidden" name="deviceIdHiddenFieldName" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-JisaGris">Total</span>
              <span className="font-bold text-JisaGris">US$ {Number(totalUSD).toFixed(2)}</span>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button type="button" onClick={onBack} className="bg-gray-200 text-gray-700 rounded-xl px-5 py-2">
                Atrás
              </button>
              <button
                type="submit"
                disabled={loading || !orderId || !ready}
                className={`rounded-xl px-6 py-2 font-bold text-white ${
                  loading || !orderId || !ready ? "bg-JisaCyan/60 cursor-not-allowed" : "bg-JisaCyan hover:opacity-95"
                }`}
              >
                {loading ? "Procesando…" : ready ? "Pagar ahora" : "Cargando…"}
              </button>
            </div>
          </form>

          <div className="mt-4">
            <TarjetasMetodos />
          </div>
        </div>
      </div>
    </div>
  );
}
