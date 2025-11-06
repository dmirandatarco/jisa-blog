"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const SwiperHero = dynamic(() => import("./SwiperHero"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  detalles: any[];
  dataSearch?: any[];
  className?: string;
  // parentId?: string; // <- Ya no apagaremos el base, así que no lo necesitamos
};

export default function LazySwiperMount({ detalles, dataSearch, className }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mountNow = () => setMounted(true);
    const onInteract = () => {
      mountNow();
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };

    window.addEventListener("scroll", onInteract, { passive: true });
    window.addEventListener("pointerdown", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);

    // Fallback solo si no hay interacción humana (laboratorio): 12 s
    const t = setTimeout(mountNow, 12000);

    return () => {
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={clsx(className, "transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}
      aria-hidden={!mounted}
      style={{ willChange: "opacity" }}
    >
      {mounted ? (
        <SwiperHero detalles={detalles} dataSearch={dataSearch} onReady={() => setReady(true)} />
      ) : null}
    </div>
  );
}
