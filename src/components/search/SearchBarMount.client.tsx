"use client";

import * as React from "react";
import dynamic from "next/dynamic";

type Tour = { /* tu tipo */ };
type IslandProps = { id: any; data?: Tour[] };

const SearchBarIsland = dynamic<IslandProps>(
  () => import("@/components/search/SearchBar.client"),
  { ssr: false, loading: () => null }
);

function loadCss(href: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[data-href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  l.setAttribute("data-href", href);
  document.head.appendChild(l);
}

function useSmartMount(setMounted: (v: boolean) => void) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    let done = false;
    const mount = () => {
      if (done) return;
      done = true;
      loadCss("/css/deferred.css");
      setMounted(true);
      window.removeEventListener("scroll", onUser);
      window.removeEventListener("pointerdown", onUser);
      window.removeEventListener("keydown", onUser);
      if (io) io.disconnect();
      if (idleT && "cancelIdleCallback" in window) (window as any).cancelIdleCallback(idleT);
      clearTimeout(fallbackT);
    };
    const onUser = () => mount();

    window.addEventListener("scroll", onUser, { passive: true });
    window.addEventListener("pointerdown", onUser, { passive: true });
    window.addEventListener("keydown", onUser);

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && ref.current) {
      io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) mount();
      }, { rootMargin: "150px" });
      io.observe(ref.current);
    }

    let idleT: number | null = null;
    if ("requestIdleCallback" in window) {
      idleT = (window as any).requestIdleCallback(mount, { timeout: 1500 });
    }
    const fallbackT = setTimeout(mount, 4000);

    return () => {
      window.removeEventListener("scroll", onUser);
      window.removeEventListener("pointerdown", onUser);
      window.removeEventListener("keydown", onUser);
      if (io) io.disconnect();
      if (idleT && "cancelIdleCallback" in window) (window as any).cancelIdleCallback(idleT);
      clearTimeout(fallbackT);
    };
  }, [setMounted]);
  return ref;
}

export default function SearchBarMount(props: IslandProps) {
  const [mounted, setMounted] = React.useState(false);
  const holderRef = useSmartMount(setMounted);
  return (
    <div ref={holderRef}>
      {mounted ? <SearchBarIsland {...props} /> : null}
    </div>
  );
}
