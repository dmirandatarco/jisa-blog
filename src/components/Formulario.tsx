"use client";

import { apiPost } from "@/lib/api";
import { useState, FormEvent } from "react";

export default function Formulario({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setCargando(true);

    try {
      const response = await apiPost<{ ok: boolean; message: string }>(
        "/subscribe",
        { email }
      );

      if (!response.ok) {
        throw new Error("Error en la suscripción");
      }

      setMensaje("✅ ¡Gracias por suscribirte! Revisa tu correo.");
      setEmail("");
    } catch (error) {
      console.error("Error en subscribe:", error);
      setMensaje("❌ Ocurrió un error, por favor inténtalo nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section
      id={id}
      aria-label="Promociones de Jisa Adventure"
      className="full-bleed bg-[#f9f9f9] text-center py-24 flex justify-center items-center"
    >
      <div className="w-full mx-auto">
        <p className="text-[15px] text-gray-700 mb-2 leading-relaxed">
          Un blog hecho para viajeros que quieren vivir la experiencia en Perú
        </p>

        <h2 className="text-[20px] md:text-[18px] font-extrabold text-black uppercase tracking-wide mb-6">
          SUSCRÍBETE
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-stretch max-w-[480px] mx-auto w-full sm:px-0 px-2"
        >
          <input
            type="email"
            name="email"
            placeholder="info.web@jisaadventure.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-[#d9d9d9] text-gray-700 text-[14px] rounded-l-lg px-4 py-3 outline-none placeholder-gray-500 focus:bg-gray-200 transition"
          />
          <button
            type="submit"
            disabled={cargando}
            className="bg-[#1B9C9E] text-white text-[14px] font-semibold rounded-r-lg px-6 py-3 hover:bg-[#00796b] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {cargando ? "Enviando..." : "Suscríbete"}
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-[14px] text-gray-700">
            {mensaje}
          </p>
        )}
      </div>
    </section>
  );
}
