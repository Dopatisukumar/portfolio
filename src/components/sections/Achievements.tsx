"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import CountUp from "@/components/ui/CountUp";

const css = `
.ach{position:relative}
.pin{position:sticky;top:0;height:100svh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:clamp(20px,4vh,48px)}
.ahd{display:flex;align-items:flex-end;justify-content:space-between;gap:24px}
.ahd .sh{margin:0}.ahd .h2{font-size:clamp(36px,6vw,88px)}
.prg{width:clamp(80px,14vw,200px);height:2px;background:var(--line);border-radius:2px;overflow:hidden;margin-bottom:14px;flex:none}
.prg i{display:block;height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(var(--p,0))}
.trk{display:flex;gap:clamp(16px,2vw,28px);padding-inline:var(--gutter);width:max-content;will-change:transform;padding-block:24px}
.ac{position:relative;flex:none;width:clamp(340px,40vw,540px);height:clamp(260px,36vh,310px);background:#fff;border-radius:28px;box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -22px rgba(0,0,0,.2);padding:24px 26px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
.ac.mid{transform:translateY(-12px);box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -30px rgba(0,0,0,.32)}
.at{display:flex;justify-content:space-between;align-items:flex-start}
.lt{position:relative;width:72px;height:72px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);display:grid;place-items:center;font-weight:700;font-size:24px;letter-spacing:-.04em}
.lt::before{content:"";position:absolute;inset:-18px;border-radius:50%;background:radial-gradient(closest-side,rgba(13,13,13,.07),transparent);opacity:.5;transition:opacity .7s;z-index:-1}
.ac.mid .lt::before{opacity:1}
.ix{font-family:var(--font-jb),monospace;font-size:12px;color:var(--mute)}
.ab2{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}
.lb{font-size:clamp(17px,1.6vw,21px);font-weight:600;letter-spacing:-.025em}
.cp{font-size:13px;color:var(--ink-2);margin-top:4px}.dt{font-size:12px;color:var(--mute);margin-top:2px}
.nmb{font-size:clamp(56px,7vw,96px);font-weight:700;letter-spacing:-.06em;line-height:.85;font-variant-numeric:tabular-nums}
.cnt2{flex:none;align-self:center;font-family:var(--font-instrument),serif;font-style:italic;font-size:clamp(32px,4vw,56px);color:var(--mute);padding-right:var(--gutter);white-space:nowrap}
`;

export default function Achievements() {
  const sec = useRef<HTMLElement>(null);
  const trk = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [H, setH] = useState<number | undefined>();
  const [mid, setMid] = useState(0);
  const [p, setP] = useState(0);
  const travel = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (!trk.current) return;
      travel.current = Math.max(0, trk.current.scrollWidth - window.innerWidth);
      setH(window.innerHeight + travel.current);
      update();
    };
    const update = () => {
      const s = sec.current; if (!s) return;
      const r = s.getBoundingClientRect();
      const prog = travel.current > 0 ? Math.max(0, Math.min(1, -r.top / travel.current)) : 0;
      setP(prog);
      if (trk.current) trk.current.style.transform = `translate3d(${-prog * travel.current}px,0,0)`;
      let best = 0, bd = Infinity; const c = window.innerWidth / 2;
      cards.current.forEach((el, i) => { if (!el) return; const b = el.getBoundingClientRect(); const d = Math.abs(b.left + b.width / 2 - c); if (d < bd) { bd = d; best = i; } });
      setMid(best);
    };
    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", measure); clearTimeout(t); };
  }, []);

  return (
    <section id="achievements" ref={sec} className="ach" style={{ height: H }} aria-labelledby="ach-h">
      <style>{css}</style>
      <div className="pin">
        <div className="wrap" style={{ width: "100%" }}>
          <div className="ahd">
            <SectionHead id="ach-h" n="06" label="Achievements" title="Moments that" em="counted." />
            <div className="prg" style={{ ["--p" as string]: p }} role="presentation"><i /></div>
          </div>
        </div>
        <div className="trk" ref={trk}>
          {ACHIEVEMENTS.map((a, i) => (
            <article key={a.id} className={`ac ${mid === i ? "mid" : ""}`} ref={(el) => { cards.current[i] = el; }}>
              <div className="at"><span className="lt" aria-hidden="true">{a.tile}</span><span className="ix">{String(i + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}</span></div>
              <div className="ab2">
                <div><h3 className="lb">{a.label}</h3><p className="cp">{a.caption}</p><p className="dt">{a.detail}</p></div>
                <p className="nmb"><CountUp to={a.value} suffix={a.suffix} /></p>
              </div>
            </article>
          ))}
          <p className="cnt2">and counting →</p>
        </div>
      </div>
    </section>
  );
}
