"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

const css = `
.hero{position:relative;min-height:100svh;padding-top:70px;overflow:hidden}
.hgrid{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:clamp(8px,2vw,32px);max-width:calc(1320px + 2*var(--gutter));margin:0 auto;padding-inline:var(--gutter);min-height:calc(100svh - 70px)}
.ghost{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-size:clamp(56px,17vw,290px);font-weight:800;letter-spacing:-.06em;line-height:1;color:transparent;-webkit-text-stroke:1.5px rgba(13,13,13,.14);white-space:nowrap;user-select:none;pointer-events:none}
.vid{position:relative;height:min(96svh,1040px);aspect-ratio:768/960;mix-blend-mode:multiply;align-self:end}
.vid video{width:100%;height:100%;object-fit:cover;display:block}
.hl{padding-bottom:clamp(24px,6vh,72px);position:relative;z-index:2}
.hl h1{font-size:clamp(44px,5.6vw,92px);font-weight:700;letter-spacing:-.045em;line-height:1}
.hl h1 em{font-family:var(--font-instrument),serif;font-style:italic;font-weight:400;color:var(--mute)}
.ctas{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.hr{padding-bottom:clamp(24px,6vh,72px);display:flex;flex-direction:column;align-items:flex-end;gap:18px;position:relative;z-index:2;text-align:right}
.hr p{font-family:var(--font-jb),monospace;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);line-height:1.8}
.snd{position:absolute;z-index:3;left:100%;bottom:42%;margin-left:14px;height:48px;padding:0 20px 0 16px;border-radius:999px;background:var(--ink);color:#fff;display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:600;letter-spacing:-.01em;white-space:nowrap;cursor:pointer;box-shadow:0 10px 24px -10px rgba(0,0,0,.35);transition:transform .4s var(--ease)}
.snd:hover{transform:scale(1.06)}
.snd.ping::after{content:"";position:absolute;inset:0;border-radius:999px;box-shadow:0 0 0 1.5px var(--ink);animation:ping 1.8s var(--ease) infinite}
@keyframes ping{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.3);opacity:0}}
@media(max-width:860px){
 .hgrid{grid-template-columns:minmax(0,1fr);justify-items:center;min-height:0}
 .vid{height:auto;width:min(100%,calc(62svh * .8));order:1;margin-top:10px}.hl{order:2;text-align:center;padding-bottom:12px}.hl h1{font-size:clamp(40px,12vw,64px)}.ctas{justify-content:center}
 .hr{order:3;align-items:center;text-align:center;padding-bottom:48px;flex-direction:row;gap:16px}.hr>div{text-align:left}
 .ghost{top:34%}
 .snd{left:auto;right:8px;bottom:12px;margin-left:0}
}
`;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const vref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const onRef = useRef(false);

  // The video always starts muted. Sound only ever changes when the user clicks the button.
  useEffect(() => {
    const v = vref.current; if (!v) return;
    v.muted = true;
    if (v.readyState >= 2) setReady(true);
    v.play().catch(() => {});
  }, []);

  // Pause off-screen only while muted. With sound on, it keeps playing until the user clicks the button.
  useEffect(() => {
    const el = ref.current; const v = vref.current; if (!el || !v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {}); else if (!onRef.current) v.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = vref.current; if (!v) return;
    setClicked(true);
    if (on) { v.muted = true; onRef.current = false; setOn(false); }
    else {
      v.muted = false; v.currentTime = 0;
      v.play().then(() => { onRef.current = true; setOn(true); }).catch(() => { v.muted = true; });
    }
  };

  return (
    <section id="hero" ref={ref} className="hero" aria-label="Introduction">
      <style>{css}</style>
      <div className="ghost" aria-hidden="true">{PROFILE.first.toUpperCase()}</div>
      <div className="hgrid">
        <div className="hl">
          <h1><span className="rv" style={{ display: "block" }}>Java Backend <em>Developer.</em></span></h1>
          <div className="ctas rv" style={{ ["--i" as string]: 2 }}>
            <a className="btn btn-primary" href="#work" onClick={(e) => { e.preventDefault(); scrollToTarget("#work"); }}>Explore work</a>
            <a className="btn btn-ghost" href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget("#contact"); }}>Let&apos;s talk</a>
            <a className="btn btn-ghost" href={PROFILE.resume} download>Résumé ↓</a>
          </div>
        </div>
        <div className="vid">
          <video ref={vref} loop muted playsInline preload="auto" onLoadedData={() => setReady(true)} style={{ opacity: ready ? 1 : 0, transition: "opacity .35s ease" }} aria-label={`${PROFILE.name} introducing himself`}>
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
          <button className={`snd ${clicked ? "" : "ping"}`} onClick={toggle} aria-label={on ? "Mute the intro" : "Play the intro with sound"} aria-pressed={on}>
            {on ? (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></svg>)
              : (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="m22 9-6 6" /><path d="m16 9 6 6" /></svg>)}
            <span>{on ? "Mute" : "Hear my intro"}</span>
          </button>
        </div>
        <div className="hr">
          <div><p>Software Engineer · Infor</p><p>{PROFILE.location}</p></div>
        </div>
      </div>
    </section>
  );
}
