"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget, scrollToTop } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

const SECTION_IDS = ["about", "skills", "work", "certs", "experience", "achievements", "contact"];
const css = `
.nav{position:fixed;inset:0 0 auto 0;z-index:50;padding:14px var(--gutter);display:flex;align-items:center;justify-content:space-between;pointer-events:none}
.nav>*{pointer-events:auto}
.bar{position:fixed;top:0;left:0;right:0;height:2px;z-index:60;background:var(--ink);transform-origin:0 50%}
.brand{display:flex;align-items:center;gap:12px;font-weight:600;letter-spacing:-.02em}
.mark{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:14px;box-shadow:inset 0 0 0 1.5px var(--ink);transition:background .4s var(--ease),color .4s var(--ease),transform .8s var(--ease)}
.mark.solid{background:var(--ink);color:#fff}.brand:hover .mark{transform:rotate(360deg)}
.bname{transition:opacity .4s var(--ease),transform .4s var(--ease)}.bname.hide{opacity:0;transform:translateX(-8px)}
.pill{position:relative;display:flex;gap:2px;padding:5px;border-radius:999px;transition:background .4s var(--ease),box-shadow .4s var(--ease),backdrop-filter .4s}
.pill.glass{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -12px rgba(0,0,0,.15)}
.nl{position:relative;z-index:1;padding:9px 18px;border-radius:999px;font-size:14px;font-weight:500;transition:color .35s var(--ease)}
.nl.on{color:#fff}
.ind{position:absolute;top:5px;bottom:5px;border-radius:999px;background:var(--ink);transition:transform .5s var(--ease),width .5s var(--ease),opacity .3s}
.menu{display:none;height:42px;padding:0 20px;border-radius:999px;font-weight:600;font-size:14px;background:rgba(255,255,255,.8);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line)}
.ov{position:fixed;inset:0;z-index:70;background:var(--paper);clip-path:circle(0 at calc(100% - 60px) 36px);visibility:hidden;transition:clip-path .8s var(--ease),visibility 0s .8s;padding:90px var(--gutter) 40px;display:flex;flex-direction:column;justify-content:center;gap:6px}
.ov.open{clip-path:circle(150% at calc(100% - 60px) 36px);visibility:visible;transition:clip-path .8s var(--ease),visibility 0s}
.ovl{display:flex;align-items:baseline;gap:14px;font-size:clamp(38px,11vw,72px);font-weight:700;letter-spacing:-.045em;line-height:1.1;opacity:0;transform:translateY(30px);transition:opacity .6s var(--ease),transform .6s var(--ease)}
.ov.open .ovl{opacity:1;transform:none;transition-delay:calc(.15s + var(--i)*70ms)}
.ovl small{font-family:var(--font-jb),monospace;font-size:12px;font-weight:400;color:var(--mute);letter-spacing:.05em}
.ovx{position:absolute;top:14px;right:var(--gutter);height:42px;padding:0 20px;border-radius:999px;background:var(--ink);color:#fff;font-weight:600;font-size:14px}
@media(max-width:900px){.pill{display:none}.menu{display:block}}
`;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState({ x: 0, w: 0, show: false });
  const p = useScrollProgress();
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id === "certs" ? "work" : e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("hero");
    const ioh = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(""); }, { rootMargin: "-45% 0px -50% 0px" });
    if (hero) ioh.observe(hero);
    return () => { io.disconnect(); ioh.disconnect(); };
  }, []);

  useEffect(() => {
    const m = () => {
      const el = pillRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      setInd(el ? { x: el.offsetLeft, w: el.offsetWidth, show: true } : (s) => ({ ...s, show: false }));
    };
    m(); window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, [active, scrolled]);

  useEffect(() => {
    lockScroll(open);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); lockScroll(false); };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToTarget("#" + id), open ? 50 : 0); };

  return (
    <>
      <style>{css}</style>
      <div className="bar" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
      <header className="nav">
        <a className="brand" href="#hero" aria-label={`${PROFILE.name} — back to top`} onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
          <span className={`mark ${scrolled ? "solid" : ""}`}>{PROFILE.initials}</span>
          <span className={`bname ${scrolled ? "hide" : ""}`}>{PROFILE.name}</span>
        </a>
        <nav aria-label="Primary">
          <div className={`pill ${scrolled ? "glass" : ""}`} ref={pillRef}>
            <span className="ind" aria-hidden="true" style={{ width: ind.w, transform: `translateX(${ind.x - 5}px)`, opacity: ind.show ? 1 : 0, left: 5 }} />
            {NAV.map((n) => (
              <a key={n.id} data-id={n.id} href={`#${n.id}`} className={`nl ${active === n.id ? "on" : ""}`} onClick={go(n.id)} aria-current={active === n.id ? "true" : undefined}>{n.label}</a>
            ))}
          </div>
        </nav>
        <button className="menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="overlay">Menu</button>
      </header>
      <div id="overlay" className={`ov ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <button className="ovx" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Close</button>
        {NAV.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} className="ovl" style={{ ["--i" as string]: i }} onClick={go(n.id)} tabIndex={open ? 0 : -1}><small>0{i + 1}</small>{n.label}</a>
        ))}
      </div>
    </>
  );
}
