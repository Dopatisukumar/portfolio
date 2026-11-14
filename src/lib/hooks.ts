"use client";
import { RefObject, useEffect, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useInView<T extends Element>(ref: RefObject<T | null>, opts: IntersectionObserverInit & { once?: boolean } = {}) {
  const [inView, set] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const { once, ...o } = opts;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { set(true); if (once) io.disconnect(); } else if (!once) set(false);
    }, o);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return inView;
}

export function useScrollProgress() {
  const [p, set] = useState(0);
  useEffect(() => {
    const f = () => { const h = document.documentElement.scrollHeight - window.innerHeight; set(h > 0 ? Math.min(1, window.scrollY / h) : 0); };
    f(); window.addEventListener("scroll", f, { passive: true }); window.addEventListener("resize", f);
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("resize", f); };
  }, []);
  return p;
}
