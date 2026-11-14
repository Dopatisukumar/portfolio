"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => { lenis?.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis?.destroy(); lenis = null; };
  }, []);
  return null;
}

export function scrollToTarget(selector: string, offset = 0) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
}
export function scrollToTop() { if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0 }); }
export function lockScroll(lock: boolean) {
  if (lock) lenis?.stop(); else lenis?.start();
  document.body.style.overflow = lock ? "hidden" : "";
}
