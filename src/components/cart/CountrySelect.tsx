"use client";
import Select from "react-select";
import dynamic from "next/dynamic";
import countries from "i18n-iso-countries";
import es from "i18n-iso-countries/langs/es.json";
countries.registerLocale(es);

// 👇 import dinámico para evitar problemas de SSR con ciertos bundlers
const ReactCountryFlag = dynamic(() => import("react-country-flag"), { ssr: false });

export default function CountrySelect({
  value = "PE",
  onChange,
  lang = "es",
  error = false,
}: {
  value?: string;
  onChange?: (code: string) => void;
  lang?: string;
  error?: boolean;
}) {
  const names = countries.getNames(lang, { select: "official" }) as Record<string, string>;
  const options = Object.entries(names).map(([code, label]) => ({ value: code, label }));
  const selected = options.find((o) => o.value === value) || null;

  const styles = {
    control: (base: any) => ({
      ...base,
      minHeight: 40,
      height: 40,
      borderRadius: 6,
      borderColor: error ? "#ef4444" : "#d1d5db",
      boxShadow: "none",
      overflow: "hidden",
      "&:hover": { borderColor: error ? "#ef4444" : "#9ca3af" },
    }),
    valueContainer: (b: any) => ({ ...b, paddingLeft: 12, paddingRight: 8, display: "flex", alignItems: "center" }),
    singleValue: (b: any) => ({ ...b, left: 12, margin: 0, maxWidth: "calc(100% - 56px)" }),
    indicatorsContainer: (b: any) => ({ ...b, height: 40 }),
    dropdownIndicator: (b: any) => ({ ...b, padding: "0 8px" }),
    clearIndicator: (b: any) => ({ ...b, padding: "0 8px" }),
    menu: (b: any) => ({ ...b, zIndex: 50 }),
  };

  const Option = ({ data, ...props }: any) => (
    <div {...props.innerProps} className="flex items-center gap-2 px-2 py-1">
      <ReactCountryFlag svg countryCode={data.value} style={{ width: 18, height: 18 }} />
      <span>{data.label}</span>
    </div>
  );

  const SingleValue = ({ data }: any) => (
    <div className="flex items-center gap-2">
      <ReactCountryFlag svg countryCode={data.value} style={{ width: 18, height: 18 }} />
      <span>{data.label}</span>
    </div>
  );

  return (
    <Select
      options={options}
      value={selected}
      onChange={(opt: any) => onChange?.(opt?.value || "")}
      isSearchable
      placeholder="Selecciona un país"
      components={{ Option, SingleValue, IndicatorSeparator: () => null }}
      styles={styles as any}
      menuPortalTarget={typeof document !== "undefined" ? document.body : null}
      menuPosition="fixed"
      menuPlacement="auto"
      className="w-full text-sm z-50"
    />
  );
}
