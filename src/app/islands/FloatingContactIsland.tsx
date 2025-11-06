"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FloatingContact = dynamic(() => import("@/components/FloatingContact.client"), {
  ssr: false,
  loading: () => null,
});

export default function FloatingContactIsland() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const start = () => setLoad(true);
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(start, { timeout: 2500 });
    } else {
      setTimeout(start, 1500);
    }
  }, []);
  return load ? <FloatingContact /> : null;
}
