"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop.client"), {
  ssr: false,
  loading: () => null,
});

export default function ScrollToTopIsland() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const start = () => setLoad(true);
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(start, { timeout: 2000 });
    } else {
      setTimeout(start, 1200);
    }
  }, []);
  return load ? <ScrollToTop /> : null;
}
