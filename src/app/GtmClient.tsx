"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window { dataLayer?: Array<Record<string, any>>; }
}

export default function GtmClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !window.dataLayer) return;
    if (!pathname) return;

    const query = searchParams?.toString();
    const url = pathname + (query ? `?${query}` : "");
    const page_location = window.location.origin + url;
    const page_referrer = document.referrer || "(direct)";

    if (lastUrl.current === page_location) return;
    lastUrl.current = page_location;

    window.dataLayer.push({
      event: "spa_page_view",
      page_location,
      page_path: pathname,
      page_title: document.title,
      page_referrer,
    });
  }, [pathname, searchParams]);

  return null;
}
