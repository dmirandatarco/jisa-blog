// src/components/SearchBar.client.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Tour = {
  titulo?: string;
  slug?: string;
  tipo?: number | string;          // 1 = paquetes, otro = tours
  foto_principal?: string;
};

export default function SearchBar({ id, data = [] as Tour[] }) {
  const tours = Array.isArray(data) ? data : [];
  const { t } = useTranslation();
  const router = useRouter();

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return tours.filter((tour) => tour.titulo?.toLowerCase().includes(q)).slice(0, 10);
  }, [tours, value]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const goTo = (tour: Tour) => {
    const href = `tours/${tour.slug}`;
    setOpen(false);
    setActiveIndex(-1);
    router.push(href);
  };

  const handleSearch = () => {
    const q = value.trim();
    if (!q) return;
    const match = tours.find((t) => t.titulo?.toLowerCase() === q.toLowerCase());
    if (match) {
      goTo(match);
    } else {
      router.push(`/buscar?q=${encodeURIComponent(q)}`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 >= suggestions.length ? 0 : prev + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 < 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      if (open && activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        goTo(suggestions[activeIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div id={id} className="relative z-[1300] w-full" ref={wrapperRef}>
      <div className="flex w-full items-center bg-white/95 backdrop-blur rounded-full shadow-2xl ring-1 ring-white/40 overflow-hidden">
        <div className="relative flex-1 min-w-0">
          <svg
            viewBox="0 0 24 24"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            className="bg-transparent w-full h-12 md:h-14 md:text-xl text-lg text-JisaGris/80 placeholder-JisaGris/30 pl-12 pr-4 outline-none"
            placeholder={t("header.buscar-tour", "buscar tour")}
            aria-label={t("header.buscar-tour", "buscar tour")}
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
              setActiveIndex(-1);
            }}
            onKeyDown={onKeyDown}
            onFocus={() => {
              if (suggestions.length) setOpen(true);
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="mx-2 md:mx-3 rounded-full px-5 md:px-7 h-10 md:h-11 bg-JisaCyan text-white font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {t("header.buscar", "buscar")}
        </button>
      </div>

      {/* Sugerencias */}
      {open && suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 mt-2 z-[1400] bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 overflow-auto max-h-80"
        >
          {suggestions.map((s, i) => {
            const href = `tours/${s.slug}`;
            const active = i === activeIndex;
            return (
              <li
                key={`${s.slug ?? s.titulo ?? "s"}-${i}`}
                role="option"
                aria-selected={active}
                className={[
                  "px-4 py-2 flex items-center gap-3 border-b last:border-0 cursor-pointer",
                  active ? "bg-slate-50" : "hover:bg-slate-50",
                ].join(" ")}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => e.preventDefault()} // evita blur del input
                onClick={() => goTo(s)}
              >
                {s.foto_principal ? (
                  <Image
                    src={s.foto_principal}
                    alt={s.titulo ?? ""}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-gray-200" />
                )}
                <Link href={href} className="truncate">{s.titulo}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
