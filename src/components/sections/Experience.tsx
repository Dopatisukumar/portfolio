"use client";
import { useEffect, useRef, useState } from "react";
import { EDUCATION, EXPERIENCE } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import { useInView } from "@/lib/hooks";

const css = `
.tl{position:relative;padding-left:clamp(28px,6vw,96px);max-width:980px}
.spn,.spf{position:absolute;left:6px;top:8px;bottom:8px;width:2px;border-radius:2px}
.spn{background:var(--line)}.spf{background:var(--ink);transform-origin:50% 0;transform:scaleY(var(--p,0))}
.stp{position:relative;padding-bottom:clamp(48px,8vw,96px);opacity:.35;transition:opacity .6s var(--ease)}
.stp.lit{opacity:1}
.dot{position:absolute;left:calc(-1 * clamp(28px,6vw,96px) + 0px);top:10px;width:14px;height:14px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--line);transition:all .5s var(--ease)}
.stp.lit .dot{background:var(--ink);box-shadow:0 0 0 5px rgba(13,13,13,.08)}
.yr{font-family:var(--font-jb),monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.stp h3{font-size:clamp(26px,3.6vw,50px);font-weight:700;letter-spacing:-.045em;line-height:1.05;margin-top:10px}
.pl2{color:var(--mute);margin-top:8px;font-size:15px}
.roles{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.roles span{height:32px;display:inline-flex;align-items:center;padding:0 14px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);font-size:13px}
.pts{margin:18px 0 0;padding:0;max-width:720px}.pts li{list-style:none;padding:10px 0;border-top:1px solid var(--line);font-size:15px;line-height:1.5;color:var(--ink-2);text-wrap:pretty}
.nx{border:1.5px dashed var(--faint);border-radius:26px;padding:clamp(24px,3vw,40px);margin-top:8px}
.nx h3{margin-top:6px}
`;

function Stop({ when, title, place, roles, points }: { when: string; title: string; place: string; roles?: string[]; points: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const lit = useInView(ref, { once: true, rootMargin: "0px 0px -45% 0px" });
  return (
    <div ref={ref} className={`stp ${lit ? "lit" : ""}`}>
      <span className="dot" aria-hidden="true" />
      <p className="yr">{when}</p><h3>{title}</h3><p className="pl2">{place}</p>
      {roles && <div className="roles">{roles.map((r) => <span key={r}>{r}</span>)}</div>}
      <ul className="pts">{points.map((p) => <li key={p}>{p}</li>)}</ul>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      setP(Math.max(0, Math.min(1, (window.innerHeight * 0.6 - r.top) / r.height)));
    };
    f(); window.addEventListener("scroll", f, { passive: true }); window.addEventListener("resize", f);
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("resize", f); };
  }, []);
  return (
    <section id="experience" className="sec" aria-labelledby="exp-h">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="exp-h" n="05" label="Education & experience" title="The road" em="so far." />
        <div className="tl" ref={ref} style={{ ["--p" as string]: p }}>
          <span className="spn" aria-hidden="true" /><span className="spf" aria-hidden="true" />
          {EDUCATION.map((e) => <Stop key={e.title} when={e.when} title={e.title} place={e.place} points={e.points} />)}
          {EXPERIENCE.map((e) => <Stop key={e.title} when={e.when} title={e.title} place={e.place} roles={e.roles} points={e.points} />)}
          <div className="nx rv"><p className="yr">Next</p><h3>Your team?</h3><p className="pl2">Open to relocation.</p></div>
        </div>
      </div>
    </section>
  );
}
