"use client";
import { useMemo, useState } from "react";
import { PROJECTS, SKILL_GROUPS } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import TechLogo, { BRAND, isBrand } from "@/components/ui/TechLogo";

const css = `
.sk{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:clamp(20px,3vw,48px);align-items:start}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
.chip{height:38px;padding:0 16px;border-radius:999px;font-size:13.5px;font-weight:500;box-shadow:inset 0 0 0 1px var(--line);background:rgba(255,255,255,.6);transition:all .35s var(--ease)}
.chip:hover{box-shadow:inset 0 0 0 1px var(--ink)}
.chip[aria-pressed=true]{background:var(--ink);color:#fff}
.tg{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px}
.tile{position:relative;min-width:0;overflow:hidden;aspect-ratio:1;border-radius:14px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);padding:8px 9px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;
 opacity:0;transform:translateY(14px) scale(.96);transition:opacity .7s var(--ease),transform .7s var(--ease),box-shadow .3s var(--ease),filter .4s;transition-delay:var(--d8)}
.tg.in .tile{opacity:1;transform:none}
.tg.in .tile.dim{opacity:.22;filter:grayscale(1);transition-delay:0s}
.tile:hover,.tile:focus-visible{transform:translateY(-4px)!important;box-shadow:inset 0 0 0 1.5px var(--ink),0 14px 30px -14px rgba(0,0,0,.25);transition-delay:0s}
.tn{font-family:var(--font-jb),monospace;font-size:9.5px;color:var(--faint)}
.ts{font-size:clamp(20px,2.4vw,32px);font-weight:700;letter-spacing:-.04em;line-height:1}
.tm{display:block;font-size:10.5px;line-height:1.15;color:var(--ink-2);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.tf{font-family:var(--font-jb),monospace;font-size:8px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.insp{position:sticky;top:96px;padding:26px;min-height:420px}
.stage{position:relative;height:190px;display:grid;place-items:center}
.glow{position:absolute;width:200px;height:200px;border-radius:50%;filter:blur(14px)}
.logo{position:relative;width:150px;height:150px;display:grid;place-items:center;animation:pop .6s var(--ease)}
.logo svg,.logo img{width:150px;height:150px}
@keyframes pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
.insp h3{font-size:26px;font-weight:700;letter-spacing:-.035em;margin-top:8px}
.insp .fam{font-family:var(--font-jb),monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);margin-top:4px}
.insp .nt{font-size:13px;color:var(--ink-2);margin-top:10px;line-height:1.5}
.insp h4{margin:18px 0 8px;font-family:var(--font-jb),monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);font-weight:400}
.insp li{list-style:none;font-size:14px;padding:7px 0;border-top:1px solid var(--line)}.insp ul{margin:0;padding:0}
@media(max-width:1000px){.sk{grid-template-columns:1fr}.insp{position:static;order:2;min-height:0}}
@media(max-width:700px){.tg{grid-template-columns:repeat(4,minmax(0,1fr))}.tile{transition-delay:var(--d4)}.ts{font-size:22px}.tm{font-size:9.5px}}
`;

export default function Skills() {
  const flat = useMemo(() => SKILL_GROUPS.flatMap((g) => g.skills.map((s) => ({ ...s, family: g.family }))), []);
  const [fam, setFam] = useState("All");
  const [sel, setSel] = useState(flat[0]);
  const [seen, setSeen] = useState(false);
  const uses = PROJECTS.filter((p) => p.skills.includes(sel.name));
  const tint = BRAND[sel.name]?.tint;

  return (
    <section id="skills" className="sec" aria-labelledby="skills-h">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="skills-h" n="02" label="Skills" title="The periodic table of my" em="stack." />
        <div className="chips rv" role="group" aria-label="Filter by family">
          {["All", ...SKILL_GROUPS.map((g) => g.family)].map((f) => (
            <button key={f} className="chip" aria-pressed={fam === f} onClick={() => setFam(f)}>{f}</button>
          ))}
        </div>
        <div className="sk">
          <div className={`tg ${seen ? "in" : ""}`} ref={(el) => {
            if (!el || seen) return;
            const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.1 });
            io.observe(el);
          }}>
            {flat.map((s, i) => (
              <button key={s.name} className={`tile ${fam !== "All" && s.family !== fam ? "dim" : ""}`}
                style={{ ["--d8" as string]: `${((i % 8) + Math.floor(i / 8)) * 40}ms`, ["--d4" as string]: `${((i % 4) + Math.floor(i / 4)) * 40}ms` }}
                onMouseEnter={() => setSel(s)} onFocus={() => setSel(s)} onClick={() => setSel(s)} aria-label={`${s.name}, ${s.family}`}>
                <span className="tn">{String(i + 1).padStart(2, "0")}</span>
                <span className="ts">{s.sym}</span>
                <span><span className="tm">{s.name}</span><span className="tf">{s.family}</span></span>
              </button>
            ))}
          </div>
          <aside className="insp card" aria-live="polite" aria-label="Skill inspector">
            <div className="stage">
              {tint && <span className="glow" style={{ background: `radial-gradient(circle, ${tint}38, transparent 68%)` }} aria-hidden="true" />}
              <div className="logo" key={sel.name}><TechLogo name={sel.name} size={150} alt={`${sel.name}${isBrand(sel.name) ? " logo" : " icon"}`} /></div>
            </div>
            <h3>{sel.name}</h3>
            <p className="fam">{sel.family}</p>
            {sel.note && <p className="nt">{sel.note}</p>}
            <h4>Used in</h4>
            {uses.length ? <ul>{uses.map((p) => <li key={p.id}>{p.title}</li>)}</ul> : <p style={{ fontSize: 14, color: "var(--mute)" }}>Listed in technical skills.</p>}
          </aside>
        </div>
      </div>
    </section>
  );
}
