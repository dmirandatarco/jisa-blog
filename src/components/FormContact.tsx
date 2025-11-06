"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneField from "@/components/PhoneField"; // tu componente

type FormValues = {
  phone: string;
  country_code: string; // ISO-2
  dial_code: string;    // +NN
  name: string;
  email: string;
  message: string;
};

export default function FormContact() {
  const { t } = useTranslation();

  const methods = useForm<FormValues>({
    defaultValues: {
      phone: "",
      country_code: "PE",
      dial_code: "+51",
      name: "",
      email: "",
      message: "",
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    // Lógica real (API) aquí:
    console.log("Datos enviados:", data);
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })
  };

  return (
    <div className="w-full rounded-xl">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
          {/* Teléfono + Nombre */}
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            <div className="md:col-span-4 col-span-12">
              <label className="sr-only" htmlFor="phone-input">
                {t("contact_section.form.telefono", "Teléfono")}
              </label>
              <PhoneField
                id="phone-input"
                name="phone"
                nameCountry="country_code"
                nameDial="dial_code"
                defaultCountry="pe"
                requiredMessage={t("contact_section.form.telefono_req", "El teléfono es obligatorio")}
                variant="underline"
              />
            </div>

            <div className="md:col-span-8 col-span-12">
              <label htmlFor="name-input" className="sr-only">
                {t("contact_section.form.nombre", "Nombre")}
              </label>
              <input
                id="name-input"
                type="text"
                placeholder={t("contact_section.form.nombre", "Nombre")}
                {...register("name", { required: t("validations.nombre_req", "El nombre es obligatorio") })}
                aria-invalid={!!errors.name}
                className="w-full px-1 py-2 border-b-2 border-JisaCyan focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email-input" className="sr-only">
              {t("contact_section.form.email", "Correo electrónico")}
            </label>
            <input
              id="email-input"
              type="email"
              placeholder={t("contact_section.form.email", "Correo electrónico")}
              {...register("email", {
                required: t("validations.email_req", "El email es obligatorio"),
                pattern: { value: /^\S+@\S+\.\S+$/, message: t("validations.email_invalid", "Correo inválido") },
              })}
              aria-invalid={!!errors.email}
              className="w-full px-1 py-2 border-b-2 border-JisaCyan focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
            )}
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="message-input" className="sr-only">
              {t("contact_section.form.informacion_adicional", "Mensaje")}
            </label>
            <textarea
              id="message-input"
              placeholder={t("contact_section.form.informacion_adicional", "Cuéntanos más…")}
              {...register("message", {
                required: t("validations.msg_req", "El mensaje es obligatorio"),
                minLength: { value: 10, message: t("validations.msg_min", "Mínimo 10 caracteres") },
              })}
              rows={4}
              aria-invalid={!!errors.message}
              className="w-full px-1 py-2 border-b-2 border-JisaCyan focus:outline-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors.message.message)}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex md:justify-start justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 md:px-16 py-2 bg-JisaCyan text-white font-semibold rounded-lg shadow-md hover:opacity-90 disabled:opacity-60"
            >
              {t("contact_section.form.enviar", "Enviar")}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}