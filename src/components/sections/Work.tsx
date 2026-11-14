"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import TechLogo, { isBrand } from "@/components/ui/TechLogo";

const css = `
.wk{display:flex;gap:12px;height:min(92svh,800px)}
.pn{position:relative;flex:1 1 0;min-width:0;border-radius:28px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;cursor:pointer;transition:flex-grow .9s var(--ease),box-shadow .6s var(--ease);text-align:left;display:block}
.pn.open{flex-grow:8;cursor:default;box-shadow:inset 0 0 0 1px var(--line),0 40px 80px -40px rgba(0,0,0,.25)}
.spine{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:26px 0;transition:opacity .4s var(--ease)}
.pn.open .spine{opacity:0;pointer-events:none}
.sn{font-family:var(--font-jb),monospace;font-size:12px;color:var(--mute)}
.sv{writing-mode:vertical-rl;transform:rotate(180deg);font-size:22px;font-weight:700;letter-spacing:-.03em;white-space:nowrap}
.pl{width:36px;height:36px;border-radius:50%;box-shadow:inset 0 0 0 1px var(--line);display:grid;place-items:center;font-size:20px;transition:transform .6s var(--ease),background .3s,color .3s}
.pn:hover .pl{transform:rotate(90deg);background:var(--ink);color:#fff}
.body{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:28px;padding:clamp(20px,2.4vw,32px);min-width:min(880px,100%);opacity:0;transform:translateX(24px);transition:opacity .5s var(--ease),transform .8s var(--ease);pointer-events:none}
.pn.open .body{opacity:1;transform:none;pointer-events:auto;transition-delay:.25s}
.bl{display:flex;flex-direction:column;gap:10px;min-height:0;overflow:auto;scrollbar-width:none}
.kick{font-family:var(--font-jb),monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.bl h3{font-size:clamp(28px,3.2vw,46px);font-weight:700;letter-spacing:-.045em;line-height:1}
.bl p.d{font-size:14.5px;line-height:1.55;color:var(--ink-2)}
.ft{display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;margin:0;padding:0}
.ft li{list-style:none;font-size:13px;padding:6px 0;border-top:1px solid var(--line);text-wrap:balance}
.tc{display:flex;flex-wrap:wrap;gap:6px}
.tcx{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px 0 8px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);font-size:12px}
.lnk{display:flex;gap:8px;flex-wrap:wrap;margin-top:auto}
.ui{border-radius:20px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--line);padding:18px;position:relative;overflow:hidden;clip-path:inset(0 100% 0 0);transition:clip-path 1.1s var(--ease) .35s;display:flex;flex-direction:column;gap:10px;min-height:0}
.pn.open .ui{clip-path:inset(0 0 0 0)}
.ui small{font-family:var(--font-jb),monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);position:absolute;right:14px;bottom:10px}
.mrow{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);font-size:12px}
.mrow b{font-family:var(--font-jb),monospace;font-weight:500;font-size:10.5px;background:var(--ink);color:#fff;border-radius:6px;padding:2px 7px}
.mrow.g b{background:var(--soft);color:var(--ink)}
.arr{text-align:center;color:var(--faint);font-size:12px;line-height:1}
.tre{margin-left:var(--l,0)}
@media(max-width:860px){
 .wk{flex-direction:column;height:auto}
 .pn{flex:none;height:76px;transition:height .9s var(--ease)}.pn.open{height:auto;min-height:76px}
 .spine{flex-direction:row;padding:0 22px}.sv{writing-mode:horizontal-tb;transform:none;font-size:18px;flex:1;margin-left:14px}
 .body{position:relative;grid-template-columns:1fr;min-width:0;display:none;padding-top:84px}
 .pn.open .body{display:grid}.pn.open .spine{opacity:1;pointer-events:none;height:76px;inset:0 0 auto 0}
 .ui{min-height:240px}
}`;

const CHIP_LOGO: Record<string, string> = { "Spring Boot 4": "Spring Boot", "Java 21": "Java 17/21", Java: "Java 17/21", JPA: "Spring Data JPA", "Spring Security": "Spring Security", MySQL: "MySQL", Docker: "Docker" };
function JobUI() {
  return (<div className="ui" aria-hidden="true">
    <div style={{ display: "flex", gap: 8 }}>{["Job seeker", "Employer", "Admin"].map((r) => <span key={r} className="tcx" style={{ background: "#fff" }}>{r}</span>)}</div>
    <div className="mrow g"><b>REQUEST</b>Client → Vercel frontend</div><div className="arr">↓</div>
    <div className="mrow"><b>JWT</b>Token-validation filter</div><div className="arr">↓</div>
    <div className="mrow g"><b>API</b>32 endpoints · 7 controllers</div><div className="arr">↓</div>
    <div className="mrow"><b>JPA</b>7 repositories → MySQL</div>
    <small>Illustrative UI</small></div>);
}
function PackUI() {
  return (<div className="ui" aria-hidden="true">
    <div className="mrow"><b>PREVIEW</b>Unsaved edits · staged in memory</div>
    <div className="mrow g tre"><b>C-1</b>Container</div>
    <div className="mrow tre" style={{ ["--l" as string]: "22px" }}><b>C-1.1</b>Nested container</div>
    <div className="mrow g tre" style={{ ["--l" as string]: "44px" }}><b>L</b>Line item</div>
    <div className="arr">↓ user confirms</div>
    <div className="mrow"><b>DB2</b>Final package records only</div>
    <small>Illustrative UI</small></div>);
}

export default function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="sec" aria-labelledby="work-h">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="work-h" n="03" label="Selected work" title="Things I've" em="built." />
        <div className="wk rv">
          {PROJECTS.map((p, i) => (
            <article key={p.id} className={`pn ${open === i ? "open" : ""}`} onMouseEnter={() => setOpen(i)} onClick={() => setOpen(i)}
              onFocus={() => setOpen(i)} tabIndex={0} aria-label={`${p.title}${open === i ? "" : " — press to open"}`}>
              <div className="spine" aria-hidden="true"><span className="sn">{p.index}</span><span className="sv">{p.title}</span><span className="pl">+</span></div>
              <div className="body">
                <div className="bl">
                  <p className="kick">{p.index} — {p.kicker}</p>
                  <h3>{p.title}</h3>
                  <p className="d">{p.description}</p>
                  <ul className="ft">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <div className="tc">{p.tech.map((t) => <span key={t} className="tcx">{CHIP_LOGO[t] && isBrand(CHIP_LOGO[t]) ? <TechLogo name={CHIP_LOGO[t]} size={16} /> : null}{t}</span>)}</div>
                  {(p.github || p.live) && (
                    <div className="lnk">
                      {p.github && <a className="btn btn-primary" href={p.github} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>}
                      {p.live && <a className="btn btn-ghost" href={p.live} target="_blank" rel="noopener noreferrer">Live ↗</a>}
                    </div>)}
                </div>
                {p.id === "jobportal" ? <JobUI /> : <PackUI />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
