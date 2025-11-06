"use client";

import { useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import PhoneField from "@/components/PhoneField"; // si ya lo tenías, mantén tu ruta
import CountrySelect from "@/components/cart/CountrySelect";

const Chevron = ({ open }: { open: boolean }) => (
  <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 11.92 1.17l-4.2 3.33a.75.75 0 01-.92 0l-4.2-3.33a.75.75 0 01-.09-1.16z"
      clipRule="evenodd"
    />
  </svg>
);

const GENDER_OPTS = [
  { value: "", label: "Selecciona" },
  { value: "M", label: "MASCULINO" },
  { value: "F", label: "FEMENINO" },
];

const DOC_OPTS = [
  { value: "", label: "Selecciona" },
  { value: "DNI", label: "DNI" },
  { value: "PASAPORTE", label: "Pasaporte" },
  { value: "CARNET E.", label: "Carné de extranjería" },
];

const baseInput =
  "h-10 w-full rounded-md border border-gray-200 focus:border-JisaCyan focus:ring-1 focus:ring-JisaCyan/30";

export default function CardCartPasajero({
  index,
  open,
  onToggle,
  isContact,
  onMarkContact,
  errors,
}: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  const ctx = useFormContext?.();
  if (!ctx) return null;
  const { register, control, setValue } = ctx;

  useEffect(() => {
    if (open && ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [open]);

  useEffect(() => {
    setValue(`passengers.${index}.is_contact`, !!isContact, { shouldDirty: true });
  }, [isContact, index, setValue]);

  const err = (path: string) => {
    const e = errors?.passengers?.[index]?.[path];
    return e ? String(e.message || "Requerido") : null;
    };

  return (
    <div ref={ref} className="mb-3 card-cart-pasajero">
      <button type="button" onClick={onToggle} aria-expanded={open} className="w-full group">
        <div className={`flex items-center justify-between gap-4 rounded-xl border bg-JisaCyan px-4 py-3 transition`}>
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-JisaVerde text-black font-bold">
              {index + 1}
            </span>
            <div className="min-w-0">
              <div className="text-white font-semibold md:text-xl">Información del pasajero</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white">
            <Chevron open={open} />
            <label
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs bg-transparent hover:bg-white/20  backdrop-blur-sm ring-1 ring-white/30 cursor-pointer select-none`}
              title="Marcar como pasajero principal (contacto)"
            >
              <input type="radio" name="contact-radio" checked={isContact} onChange={onMarkContact} className="sr-only" />
              <span className={`h-4 w-4 rounded-full border ${isContact ? "border-JisaVerde bg-JisaVerde" : "border-white/70 bg-transparent"}`} />
              <span className={`font-semibold`}>Pasajero de Contacto</span>
            </label>
          </div>
        </div>
      </button>

      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">
                  Nombre <span className="text-red-500 font-bold">*</span>
                </label>
                <input className={baseInput} {...register(`passengers.${index}.first_name`, { required: "Requerido" })} />
                {err("first_name") && <p className="text-xs text-red-600 mt-1">{err("first_name")}</p>}
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">
                  Apellido Paterno <span className="text-red-500 font-bold">*</span>
                </label>
                <input className={baseInput} {...register(`passengers.${index}.last_name`, { required: "Requerido" })} />
                {err("last_name") && <p className="text-xs text-red-600 mt-1">{err("last_name")}</p>}
              </div>

              <div className="col-span-12 md:col-span-2">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">
                  Tipo de documento <span className="text-red-500 font-bold">*</span>
                </label>
                <select className={baseInput} {...register(`passengers.${index}.doc_type`, { required: "Requerido" })}>
                  {DOC_OPTS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {err("doc_type") && <p className="text-xs text-red-600 mt-1">{err("doc_type")}</p>}
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">
                  N° Documento <span className="text-red-500 font-bold">*</span>
                </label>
                <input className={baseInput} {...register(`passengers.${index}.doc_number`, { required: "Requerido" })} />
                {err("doc_number") && <p className="text-xs text-red-600 mt-1">{err("doc_number")}</p>}
              </div>

              <div className="col-span-12 md:col-span-2">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">Género<span className="text-red-500 font-bold">*</span></label>
                <select className={baseInput} {...register(`passengers.${index}.gender`, { required: "Requerido" })}>
                  {GENDER_OPTS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {err("gender") && <p className="text-xs text-red-600 mt-1">{err("gender")}</p>}
              </div>

              <div className="col-span-12 md:col-span-2">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">
                  Nacionalidad <span className="text-red-500 font-bold">*</span>
                </label>
                <Controller
                  name={`passengers.${index}.nationality`}
                  control={control}
                  rules={{ required: "Requerido" }}
                  render={({ field }) => (
                    <CountrySelect value={field.value || ""} onChange={(code) => field.onChange(code)} />
                  )}
                />
                {err("nationality") && <p className="text-xs text-red-600 mt-1">{err("nationality")}</p>}
              </div>

              {/* Teléfono (solo contacto) */}
              <div className="col-span-12 md:col-span-3">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">
                  Celular {isContact && <span className="text-red-500 font-bold">*</span>}
                </label>
                <PhoneField
                  name={`passengers.${index}.phone`}
                  nameCountry={`passengers.${index}.country_code`}
                  nameDial={`passengers.${index}.dial_code`}
                  defaultCountry="pe"
                  requiredMessage={isContact ? "El teléfono es obligatorio" : undefined}
                  disabled={!isContact}
                  variant="boxed"
                  size="md"
                />
              </div>

              {/* Email (solo contacto) */}
              <div className="col-span-12 md:col-span-3">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">
                  Email {isContact && <span className="text-red-500 font-bold">*</span>}
                </label>
                <input
                  type="email"
                  className={baseInput}
                  {...register(`passengers.${index}.email`, {
                    required: isContact ? "Requerido" : false,
                    pattern: isContact ? { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } : undefined,
                  })}
                  disabled={!isContact}
                />
                {err("email") && isContact && <p className="text-xs text-red-600 mt-1">{err("email")}</p>}
              </div>

              <div className="col-span-12 md:col-span-2">
                <label className="block text-xs md:text-sm text-JisaGris mb-1">
                  Fecha de nacimiento <span className="text-red-500 font-bold">*</span>
                </label>
                <input type="date" className={baseInput} {...register(`passengers.${index}.birthdate`, { required: "Requerido" })} />
                {err("birthdate") && <p className="text-xs text-red-600 mt-1">{err("birthdate")}</p>}
              </div>
            </div>

            <input type="hidden" {...register(`passengers.${index}.is_contact`)} />
            <div className="border-t border-gray-200 mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
