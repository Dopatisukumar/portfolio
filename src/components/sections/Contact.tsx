"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTop } from "@/lib/scroll";

const css = `
.ct{padding-bottom:40px}
.big{font-size:clamp(44px,9.4vw,150px);font-weight:700;letter-spacing:-.05em;line-height:.98}
.big .ln{display:block}.ch{display:inline-block;white-space:pre}
.ch:hover{animation:hop .55s var(--ease)}
.big em{font-family:var(--font-instrument),serif;font-style:italic;font-weight:400;color:var(--mute)}
@keyframes hop{0%,100%{transform:none}40%{transform:translateY(-.18em)}}
.cr2{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:32px;align-items:end;margin-top:clamp(40px,6vw,80px)}
.em2{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.mail{font-size:clamp(22px,4.2vw,64px);font-weight:600;letter-spacing:-.04em;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.12em;overflow-wrap:anywhere}
.cp2{height:36px;padding:0 16px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--ink);font-size:13px;font-weight:600;transition:background .3s,color .3s}
.cp2:hover{background:var(--ink);color:#fff}
.lks{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.badge{position:relative;width:132px;height:132px;flex:none}
.badge svg{width:100%;height:100%;animation:spin 18s linear infinite}
.badge text{font-family:var(--font-jb),monospace;font-size:11.2px;letter-spacing:.2em;text-transform:uppercase;fill:var(--ink)}
.badge b{position:absolute;inset:0;display:grid;place-items:center;font-size:26px;font-weight:400}
@keyframes spin{to{transform:rotate(360deg)}}
.ft2{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:clamp(64px,10vw,140px);padding-top:24px;border-top:1px solid var(--line);font-size:13px;color:var(--mute)}
.ft2 button:hover,.ft2 a:hover{color:var(--ink)}
@media(max-width:700px){.cr2{grid-template-columns:1fr}.badge{display:none}}
`;

const Letters = ({ t }: { t: string }) => <>{Array.from(t).map((c, i) => <span key={i} className="ch" aria-hidden="true">{c}</span>)}</>;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); } catch { /* clipboard unavailable */ }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" className="sec ct" aria-labelledby="contact-h">
      <style>{css}</style>
      <div className="wrap">
        <p className="tag rv">07 — Contact</p>
        <h2 id="contact-h" className="big" aria-label="Let's build something together.">
          <span className="ln"><Letters t="Let's build" /></span>
          <span className="ln"><Letters t="something " /><em><Letters t="together." /></em></span>
        </h2>
        <div className="cr2">
          <div>
            <div className="em2 rv">
              <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <button className="cp2" onClick={copy} aria-label="Copy email address"><span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span></button>
            </div>
            <div className="lks rv" style={{ ["--i" as string]: 1 }}>
              <a className="btn btn-primary" href={PROFILE.phoneHref}>{PROFILE.phone}</a>
              <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <div className="badge" aria-hidden="true">
            <svg viewBox="0 0 120 120"><defs><path id="cc" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs><text><textPath href="#cc">say hello · say hello · say hello · </textPath></text></svg>
            <b>↗</b>
          </div>
        </div>
        <footer className="ft2">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <button onClick={scrollToTop}>Back to top ↑</button>
          <span>Designed and built by {PROFILE.first}</span>
        </footer>
      </div>
    </section>
  );
}
