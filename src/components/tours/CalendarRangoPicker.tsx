"use client";

import { DayPicker } from "react-day-picker";
import { useEffect } from "react";
import {
  addDays,
  isAfter,
  isBefore,
  isSameDay,
  startOfDay,
} from "date-fns";
import { useTranslation } from "react-i18next";

// === helpers sin problemas de zona horaria ===
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const toStrLocal = (d?: Date) =>
  d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : "";
const toDateLocal = (s?: string) =>
  s ? new Date(Number(s.slice(0, 4)), Number(s.slice(5, 7)) - 1, Number(s.slice(8, 10))) : undefined;

type Props = {
  fixedDays?: number;                         // p.ej. 2, 3, 4...
  value: { start: string; end: string };     // YYYY-MM-DD
  onChange?: (v: { start: string; end: string }) => void;
  minOffsetDays?: number;                    // 1 = desde mañana (default)
};

export default function DateRangePicker({
  fixedDays = 2,
  value,
  onChange,
  minOffsetDays = 1, // cambia a 2 si quieres “desde pasado mañana”
}: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    void import("react-day-picker/dist/style.css");
    void import("./daypicker-overrides.css");
  }, []);

  // Fecha mínima seleccionable
  const todayStart = startOfDay(new Date());
  const minStart = startOfDay(addDays(todayStart, Math.max(0, minOffsetDays)));

  const start = value?.start ? toDateLocal(value.start) : undefined;
  const end = start
    ? addDays(start, Math.max(1, fixedDays) - 1)
    : undefined;

  // Modificadores visuales
  const modifiers = {
    startDay: (day: Date) => (start ? isSameDay(day, start) : false),
    inRange: (day: Date) => {
      if (!start || !end) return false;
      const d = startOfDay(day);
      // sombrear desde el inicio hasta el final (incluye final), excepto el propio inicio que va sólido
      const within =
        (isAfter(d, start) || isSameDay(d, start)) &&
        (isBefore(d, end) || isSameDay(d, end));
      return within && !isSameDay(d, start);
    },
    disabled: (day: Date) => isBefore(startOfDay(day), minStart),
  };

  return (
    <div className="p-4 flex flex-col items-center pt-4">
      <span className="font-semibold text-lg text-JisaCyan">
        {t("tours_detail.fecha_visita")}
      </span>

      <DayPicker
        mode="single"               // solo marcamos el INICIO
        selected={start}
        onSelect={(day) => {
          if (!day) {
            onChange?.({ start: "", end: "" });
            return;
          }
          const d0 = startOfDay(day);
          if (isBefore(d0, minStart)) return; // respeta mínimo
          const s = d0;
          const e = addDays(s, Math.max(1, fixedDays) - 1);
          onChange?.({ start: toStrLocal(s), end: toStrLocal(e) });
        }}
        showOutsideDays
        weekStartsOn={1}
        disabled={modifiers.disabled}
        modifiers={modifiers}
        modifiersClassNames={{
          startDay: "is-start",   // inicio sólido
          inRange: "as-middle",   // franja intermedia
        }}
        className="rdp mx-auto text-sm"
      />
    </div>
  );
}
