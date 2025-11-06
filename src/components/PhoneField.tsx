import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { PhoneInput, CountryData } from "react-international-phone";

export default function PhoneField({
  name = "phone",
  nameCountry = "country_code",
  nameDial = "dial_code",
  id,
  defaultCountry = "pe",
  requiredMessage = "El teléfono es obligatorio",
  className = "",
}: Props) {
  const { control, register, setValue, getValues } = useFormContext();

  useEffect(() => {
    void import("react-international-phone/style.css");
  }, []);

  // 👉 Al montar: si están vacíos, setear defaults (PE / +51)
  useEffect(() => {
    const cc = (getValues(nameCountry) as string) || "";
    const dc = (getValues(nameDial) as string) || "";
    if (!cc) setValue(nameCountry, defaultCountry.toUpperCase(), { shouldDirty: false });
    if (!dc) {
      // Si solo usarás Perú como default, deja +51; si no, puedes mapear otros.
      const defaultDial = defaultCountry.toLowerCase() === "pe" ? "+51" : "";
      if (defaultDial) setValue(nameDial, defaultDial, { shouldDirty: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCountry, nameCountry, nameDial, setValue]);

  return (
    <div className={className}>
      <input type="hidden" {...register(nameCountry)} />
      <input type="hidden" {...register(nameDial)} />
      <Controller
        name={name}
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <div className="w-full h-10 rounded-xl border border-gray-400 bg-white px-3 flex items-center focus-within:ring-2 focus-within:ring-sky-400 focus-within:border-sky-600">
            <PhoneInput
              id={id}
              defaultCountry={defaultCountry as any}
              value={field.value || ""}
              onChange={(val, country: CountryData) => {
                field.onChange(val);
                const iso = country?.iso2?.toUpperCase?.() ?? "";
                const dial = country?.dialCode ? `+${country.dialCode}` : "";
                if (iso) setValue(nameCountry, iso, { shouldValidate: false, shouldDirty: true });
                if (dial) setValue(nameDial, dial, { shouldValidate: false, shouldDirty: true });
              }}
              onBlur={field.onBlur}
              className="w-full"
              inputClassName="!w-full !h-8 !border-0 !outline-none !p-0 !m-0 bg-transparent focus:!ring-0"
              countrySelectorStyleProps={{
                buttonClassName:
                  "!border-0 !bg-transparent !shadow-none !outline-none !rounded-md !p-0 pr-2 mr-2 flex items-center !h-8 focus:!ring-0",
                dropdownClassName: "!rounded-xl",
              }}
            />
          </div>
        )}
      />
    </div>
  );
}
