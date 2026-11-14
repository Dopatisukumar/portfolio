"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion, useInView } from "@/lib/hooks";

const css = `
.ab{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,4vw,64px);align-items:stretch}
.ab h2{font-size:clamp(40px,5.4vw,84px)}
.abl{display:flex;flex-direction:column;gap:22px;padding-top:min(16vh,140px)}
.abl p{color:var(--ink-2);font-size:clamp(16px,1.25vw,19px);line-height:1.6}
.abb{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.abr{display:flex;flex-direction:column;justify-content:space-between;gap:28px;padding-top:min(16vh,140px)}
.facts{display:grid}
.fact{display:grid;grid-template-columns:110px 1fr;gap:12px;padding:16px 0;border-top:1px solid var(--line);font-size:15px}
.fact:last-child{border-bottom:1px solid var(--line)}
.fact dt{font-family:var(--font-jb),monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);padding-top:3px}
.fact dd{margin:0;overflow-wrap:anywhere}
.quote{font-family:var(--font-instrument),serif;font-style:italic;font-size:clamp(24px,2.2vw,32px);line-height:1.2;color:var(--ink-2)}
.lan{position:relative;display:flex;justify-content:center;min-height:620px;margin-top:calc(-1 * var(--secpad))}
.swing{transform-origin:50% 0;display:flex;flex-direction:column;align-items:center;will-change:transform}
.strap{width:30px;height:calc(var(--secpad) + 70px);background:var(--ink);overflow:hidden;position:relative;border-radius:0 0 3px 3px}
.strap span{position:absolute;left:50%;top:0;writing-mode:vertical-rl;color:#fff;font-family:var(--font-jb),monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;transform:translateX(-50%);animation:strap 14s linear infinite;padding-top:100%}
@keyframes strap{from{transform:translate(-50%,0)}to{transform:translate(-50%,-50%)}}
.clip{width:18px;height:34px;margin-top:-4px;border-radius:5px 5px 9px 9px;background:linear-gradient(90deg,#c9c9c9,#f2f2f2 45%,#9a9a9a);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25);position:relative;z-index:2}
.idc{width:300px;height:404px;perspective:1200px;margin-top:-10px;cursor:pointer;outline-offset:6px}
.idi{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .9s var(--ease)}
.idi.on{transform:rotateY(180deg)}
@media(hover:hover){.idc:hover .idi{transform:rotateY(180deg)}}
.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:24px;background:#fff;box-shadow:inset 0 0 0 1px var(--line),0 40px 80px -30px rgba(0,0,0,.28);overflow:hidden;display:flex;flex-direction:column}
.back{transform:rotateY(180deg);padding:26px 24px;gap:10px}
.band{background:var(--ink);color:#fff;height:44px;display:grid;place-items:center;font-family:var(--font-jb),monospace;font-size:11px;letter-spacing:.3em}
.ph{width:128px;height:156px;margin:18px auto 12px;border-radius:20px;padding:3px;background:linear-gradient(160deg,#e9e9e9,#8a8a8a);position:relative;flex:none}
.ph::before{content:"";position:absolute;inset:-14px;border-radius:30px;background:radial-gradient(closest-side,rgba(0,0,0,.08),transparent);z-index:0}
.ph img{position:relative;z-index:1;width:100%;height:100%;object-fit:cover;object-position:50% 20%;border-radius:17px;display:block;transition:transform .7s var(--ease)}
.ph{overflow:hidden}.idc:hover .ph img{transform:scale(1.06)}
.nm{text-align:center;font-weight:700;font-size:20px;letter-spacing:-.03em}
.rl{text-align:center;color:var(--mute);font-size:12.5px;margin-top:2px}
.rows{margin:12px 22px 0;display:grid;gap:3px}
.rows div{display:flex;justify-content:space-between;font-size:11.5px;padding:3px 0;border-top:1px solid var(--line)}
.rows b{font-family:var(--font-jb),monospace;font-weight:400;color:var(--mute);letter-spacing:.06em;text-transform:uppercase;font-size:10px}
.bot{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;padding:0 22px 18px}
.bcode{display:flex;align-items:flex-end;gap:1.5px;height:34px}.bcode i{display:block;background:var(--ink)}
.holo{width:38px;height:38px;border-radius:50%;background:conic-gradient(#eee,#999,#f7f7f7,#777,#ddd,#aaa,#eee);box-shadow:inset 0 0 0 1px rgba(0,0,0,.18)}
.back h3{font-family:var(--font-jb),monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);font-weight:400}
.back li{font-size:13.5px;line-height:1.4;list-style:none;padding:8px 0;border-top:1px solid var(--line)}
.back ul{margin:0;padding:0}
.sig{font-family:var(--font-instrument),serif;font-style:italic;font-size:28px;margin-top:auto}
.found{font-size:11px;color:var(--mute);overflow-wrap:anywhere}
@media(max-width:1000px){.ab{grid-template-columns:1fr}.lan{order:-1;margin-top:calc(-1 * var(--secpad));min-height:560px}.abl,.abr{padding-top:0}}
`;

export default function About() {
  const stage = useRef<HTMLDivElement>(null);
  const swing = useRef<HTMLDivElement>(null);
  const seen = useInView(stage, { threshold: 0 });
  const [flip, setFlip] = useState(false);
  const st = useRef({ a: 0, v: 0, last: 0 });

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;
    let raf = 0; const s = st.current; const t0 = performance.now();
    const loop = (t: number) => {
      const idle = Math.sin((t - t0) / 1100) * 1.6;
      s.v += -0.028 * (s.a - idle); s.v *= 0.965; s.a = Math.max(-20, Math.min(20, s.a + s.v));
      if (swing.current) swing.current.style.transform = `rotate(${s.a.toFixed(3)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [seen]);

  const move = (e: React.PointerEvent) => {
    const s = st.current; const x = e.clientX;
    if (s.last) s.v += Math.max(-30, Math.min(30, x - s.last)) * 0.035;
    s.last = x;
  };
  const bars = Array.from(PROFILE.name.padEnd(22, "x")).slice(0, 22).map((c, i) => 1 + ((c.charCodeAt(0) + i) % 3));
  const text = `${PROFILE.name} · ${PROFILE.role} · `.toUpperCase();

  return (
    <section id="about" className="sec" aria-labelledby="about-h">
      <style>{css}</style>
      <div className="wrap">
        <p className="tag rv">01 — About</p>
        <div className="ab" onPointerMove={move} onPointerLeave={() => (st.current.last = 0)}>
          <div className="abl">
            <h2 id="about-h" className="h2 rv-mask"><span>Hi, I&apos;m <em>{PROFILE.first}.</em></span></h2>
            <p className="rv">{PROFILE.resumeSummary}</p>
            <p className="rv" style={{ ["--i" as string]: 1 }}>{PROFILE.extraLine}</p>
            <div className="abb rv" style={{ ["--i" as string]: 2 }}>
              <a className="btn btn-primary" href={PROFILE.resume} download>Résumé</a>
              <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>

          <div className="lan" ref={stage}>
            <div className="swing" ref={swing}>
              <div className="strap" aria-hidden="true"><span>{text.repeat(8)}</span></div>
              <div className="clip" aria-hidden="true" />
              <div className="idc" tabIndex={0} role="button" aria-pressed={flip} aria-label="Developer ID card. Press to flip."
                onClick={() => setFlip((f) => !f)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlip((f) => !f); } }}>
                <div className={`idi ${flip ? "on" : ""}`}>
                  <div className="face">
                    <div className="band">DEVELOPER ID</div>
                    <div className="ph">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.name}`} width={480} height={600} /></div>
                    <p className="nm">{PROFILE.name}</p><p className="rl">{PROFILE.role}</p>
                    <div className="rows"><div><b>Dept.</b><span>{PROFILE.dept}</span></div><div><b>Joined</b><span>{PROFILE.gradYear}</span></div></div>
                    <div className="bot"><div className="bcode" aria-hidden="true">{bars.map((w, i) => <i key={i} style={{ width: w * 1.6, height: i % 5 === 0 ? "100%" : "82%" }} />)}</div><div className="holo" aria-hidden="true" /></div>
                  </div>
                  <div className="face back">
                    <h3>What I am</h3>
                    <ul>
                      <li>{PROFILE.role}, Infor XA ERP</li>
                      <li>B.Tech CSE · CGPA 8.7 / 10.0</li>
                      <li>Job Portal REST API · Packing (R11.1)</li>
                      <li>Three-time Best Employee · NPTEL Top 1%</li>
                    </ul>
                    <p className="sig">{PROFILE.name}</p>
                    <p className="found">If found, say hello · {PROFILE.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="abr">
            <div>
              <p className="tag rv">Quick facts</p>
              <dl className="facts rv" style={{ margin: 0 }}>
                <div className="fact"><dt>Location</dt><dd>{PROFILE.location}</dd></div>
                <div className="fact"><dt>Education</dt><dd>B.Tech CSE, Sri Venkateswara University College of Engineering · CGPA 8.7</dd></div>
                <div className="fact"><dt>Current</dt><dd>Software Engineer at Infor (India) Private Limited, since Jul 2023</dd></div>
                <div className="fact"><dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`} style={{ textDecoration: "underline" }}>{PROFILE.email}</a></dd></div>
              </dl>
            </div>
            <p className="quote rv">&ldquo;{PROFILE.quote}&rdquo;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
