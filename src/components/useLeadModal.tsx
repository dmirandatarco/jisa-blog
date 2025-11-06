"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

type LeadModalContextType = {
  open: (source?: string) => void;
  close: (persist?: boolean) => void;
  isOpen: boolean;
  source: string | null;
};

const STORAGE_KEY_HIDE = "lead_modal_hidden";
const SHOW_DELAY_MS = 12000;

const LeadModalContext = createContext<LeadModalContextType | null>(null);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const triggeredRef = useRef(false);
  const pathname = usePathname();

  const open = useCallback((src?: string) => {
    // si el usuario había marcado "no mostrar", respetamos y no abrimos automáticamente
    try {
      if (localStorage.getItem(STORAGE_KEY_HIDE) === "1" && !src) return;
    } catch {}
    setSource(src ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback((persist?: boolean) => {
    try {
      if (persist) localStorage.setItem(STORAGE_KEY_HIDE, "1");
    } catch {}
    setIsOpen(false);
  }, []);

  // 🔒 Cerrar el modal ante cualquier cambio de ruta
  useEffect(() => {
    if (isOpen) setIsOpen(false);
    // opcional: también podrías resetear la fuente
    // setSource(null);
    // y desactivar triggers en esta sesión:
    triggeredRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 🧊 Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // 🎯 Triggers (opcionales)
  useEffect(() => {
    // SSR/seguridad
    if (typeof window === "undefined") return;

    // no volver a mostrar si el usuario lo ocultó de forma persistente
    try {
      if (localStorage.getItem(STORAGE_KEY_HIDE) === "1") return;
    } catch {}

    if (triggeredRef.current) return;

    const t = setTimeout(() => {
      if (!triggeredRef.current) {
        triggeredRef.current = true;
        open("delay");
      }
    }, SHOW_DELAY_MS);

    const onScroll = () => {
      if (triggeredRef.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const half = document.documentElement.scrollHeight * 0.5;
      if (scrolled >= half) {
        triggeredRef.current = true;
        open("scroll-50");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouseOut = (e: MouseEvent) => {
      if (triggeredRef.current) return;
      if (e.clientY <= 0) {
        triggeredRef.current = true;
        open("exit-intent");
        document.removeEventListener("mouseout", onMouseOut);
      }
    };
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [open]);

  return (
    <LeadModalContext.Provider value={{ open, close, isOpen, source }}>
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal debe usarse dentro de <LeadModalProvider>");
  }
  return ctx;
}
