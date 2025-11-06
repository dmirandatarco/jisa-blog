"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const RealSearch = dynamic(() => import("./SearchBar.client"), {
  ssr: false,
  loading: () => (
    <input
      className="w-full h-12 rounded-full px-5 outline-none bg-white/90"
      placeholder="Buscar tour"
      readOnly
    />
  ),
});

export default function SearchBarIsland() {
  const [load, setLoad] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = () => setLoad(true);
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(start, { timeout: 2000 });
        } else {
          setTimeout(start, 1200);
        }
        io.disconnect();
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!load) {
    return (
      <input
        ref={ref}
        className="w-full h-12 rounded-full px-5 outline-none bg-white/90"
        placeholder="Buscar tour"
        onFocus={() => setLoad(true)}
      />
    );
  }
  return <RealSearch />;
}
