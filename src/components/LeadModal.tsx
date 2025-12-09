"use client";

import { useEffect, useRef, useState } from "react";
import { useLeadModal } from "@/components/useLeadModal";
import { apiPost } from "@/lib/api";
import PhoneField from "@/components/PhoneField";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type LeadForm = {
  nombres: string;
  phone: string;
  country_code?: string | null;
  dial_code?: string | null;
  correo: string;
  fechaViaje?: string | null;
  paxs?: number | null;
  dias?: number | null;
  fechaVuelo?: string | null;
  company?: string; // honeypot
};

export default function LeadModal() {
  const router = useRouter();                   // ✅ dentro del componente
  const { isOpen, close } = useLeadModal();

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sinceOpenMs, setSinceOpenMs] = useState(0);
  const openedAtRef = useRef<number | null>(null);

  // RHF
  const methods = useForm<LeadForm>({
    defaultValues: {
      nombres: "",
      phone: "",
      country_code: "PE",
      dial_code: "+51",
      correo: "",
      fechaViaje: null,
      paxs: null,
      dias: null,
      fechaVuelo: null,
      company: "",
    },
    mode: "onSubmit",
  });

  // anti-spam timer + enfoque
  useEffect(() => {
    if (!isOpen) return;
    openedAtRef.current = Date.now();
    const t = setInterval(() => {
      if (openedAtRef.current) setSinceOpenMs(Date.now() - openedAtRef.current);
    }, 250);
    setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => clearInterval(t);
  }, [isOpen]);

  // cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // focus trap básico
  useEffect(() => {
    if (!isOpen) return;
    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
        ) || []
      );
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = focusable();
      if (nodes?.length === 0) return;
      const first = nodes[0], last = nodes[nodes?.length - 1];
      const active = document.activeElement as HTMLElement;
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    };
    dialogRef.current?.addEventListener("keydown", onKeyDown as any);
    return () => dialogRef.current?.removeEventListener("keydown", onKeyDown as any);
  }, [isOpen]);

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  // submit
  const onSubmit = async (data: LeadForm) => {
  setSubmitting(true);
  setError(null);
  try {
    const {
      nombres,
      phone: celular,
      correo,
      fechaViaje,
      paxs,
      dias,
      fechaVuelo,
      country_code,
      dial_code,
      company,
    } = data;

    if (!nombres || nombres.trim().length < 2) throw new Error("Ingresa tus nombres.");
    if (!celular) throw new Error("Ingresa tu celular.");
    if (!/^\S+@\S+\.\S+$/.test(correo)) throw new Error("Correo inválido.");
    if ((company ?? "").length > 0) throw new Error("Bloqueado por honeypot.");
    if (sinceOpenMs < 4000) throw new Error("Formulario enviado demasiado rápido.");

    // UTM
    let utm: Record<string, string | null> = {};
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      utm = {
        utm_source: p.get("utm_source"),
        utm_medium: p.get("utm_medium"),
        utm_campaign: p.get("utm_campaign"),
        utm_term: p.get("utm_term"),
        utm_content: p.get("utm_content"),
      };
    }

    // ⚠️ Fallbacks seguros (evitan "" -> null)
    const cc = (country_code && country_code.trim()) 
      ? country_code.toUpperCase() 
      : ((methods.getValues("country_code") as string) || "PE").toUpperCase();

    const dc = (dial_code && dial_code.trim())
      ? dial_code
      : ((methods.getValues("dial_code") as string) || "+51");

    await apiPost<any>("/leads", {
      nombres,
      celular,
      correo,
      fechaViaje: fechaViaje || null,
      paxs: paxs ?? null,
      dias: dias ?? null,
      fechaVuelo: fechaVuelo || null,
      country_code: cc,
      dial_code: dc,
      source: "modal",
      page: typeof window !== "undefined" ? window.location.pathname : "",
      ...utm,
    });

    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "lead_submit", lead_source: "modal" });
    }
    close();
    router.push("/gracias");
    return;
  } catch (err: any) {
    const status = err?.status;
    const payload = err?.payload;
    if (status === 422) {
      const firstMsg =
        payload?.message ||
        (payload?.errors ? (Object.values(payload.errors)[0] as string[])[0] : null) ||
        "Revisa los datos ingresados.";
      setError(firstMsg);
    } else {
      setError(payload?.message || err?.message || "Error inesperado. Intenta de nuevo.");
    }
  } finally {
    setSubmitting(false);
  }
};


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-title"
      onClick={onOverlayClick}
    >
      <div ref={dialogRef} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="flex items-start justify-between gap-4">
              <h2 id="lead-title" className="text-xl font-semibold tracking-tight">¡Cotiza tu viaje!</h2>
              <button type="button" onClick={() => close()} aria-label="Cerrar" className="rounded-full p-1.5 hover:bg-gray-100">
                <span aria-hidden>✕</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 -mt-1">Déjanos tus datos y te contactamos hoy.</p>

            {/* Honeypot */}
            <input type="text" {...methods.register("company")} tabIndex={-1} className="hidden" autoComplete="off" />

            <div className="grid gap-3">
              {/* Nombres */}
              <div className="grid gap-2">
                <label htmlFor="nombres" className="text-sm font-medium">Nombres *</label>
                <input
                  ref={firstFieldRef}
                  id="nombres"
                  placeholder="Tu nombre completo"
                  className="h-10 w-full rounded-xl border border-gray-400 px-3 outline-none focus:ring-2 focus:ring-sky-400"
                  {...methods.register("nombres", { required: true, minLength: 2 })}
                />
              </div>

              {/* Celular */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Celular *</label>
                <PhoneField
                  name="phone"
                  nameCountry="country_code"
                  nameDial="dial_code"
                  defaultCountry="pe"
                  requiredMessage="El teléfono es obligatorio"
                />
              </div>

              {/* Correo */}
              <div className="grid gap-2">
                <label htmlFor="correo" className="text-sm font-medium">Correo *</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="h-10 w-full rounded-xl border border-gray-400 px-3 outline-none focus:ring-2 focus:ring-sky-400"
                  {...methods.register("correo", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                />
              </div>

              {/* Opcionales */}
              <div className="grid gap-2">
                <label htmlFor="fechaViaje" className="text-sm font-medium">Fecha de viaje (opcional)</label>
                <input id="fechaViaje" type="date" className="h-10 w-full rounded-xl border border-gray-400 px-3 outline-none focus:ring-2 focus:ring-sky-400" {...methods.register("fechaViaje")} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <label htmlFor="paxs" className="text-sm font-medium">PAXS (opcional)</label>
                  <input id="paxs" type="number" min={1} placeholder="2" className="h-10 w-full rounded-xl border border-gray-400 px-3 outline-none focus:ring-2 focus:ring-sky-400" {...methods.register("paxs", { valueAsNumber: true })} />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="dias" className="text-sm font-medium">Días (opcional)</label>
                  <input id="dias" type="number" min={1} placeholder="5" className="h-10 w-full rounded-xl border border-gray-400 px-3 outline-none focus:ring-2 focus:ring-sky-400" {...methods.register("dias", { valueAsNumber: true })} />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="fechaVuelo" className="text-sm font-medium">Fecha de vuelo (opcional)</label>
                <input id="fechaVuelo" type="date" className="h-10 w-full rounded-xl border border-gray-400 px-3 outline-none focus:ring-2 focus:ring-sky-400" {...methods.register("fechaVuelo")} />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" disabled={submitting} className={cx("w-full rounded-xl px-4 py-2 text-white font-medium", submitting ? "bg-JisaGris" : "bg-JisaCyan hover:bg-JisaGris")}>
              {submitting ? "Enviando…" : "Solicitar cotización"}
            </button>

            <p className="text-[11px] text-gray-500 text-center">
              Protegido por reCAPTCHA/medidas anti-spam. Al enviar aceptas nuestra política de privacidad.
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
