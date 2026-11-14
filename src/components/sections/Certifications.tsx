import { CERTIFICATIONS } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";

const css = `
.cb{background:#fff;border-block:1px solid var(--line)}
.cg{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,5vw,80px);align-items:start}
.cs{position:sticky;top:110px}
.cs .sh{margin-bottom:24px}
.cnt{font-family:var(--font-jb),monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.cl{margin:0;padding:0;list-style:none;border-top:1px solid var(--line)}
.cr{position:relative;display:grid;grid-template-columns:56px minmax(0,1fr) auto;gap:16px;align-items:center;padding:30px 20px;border-bottom:1px solid var(--line);overflow:hidden;isolation:isolate;transition:color .4s var(--ease)}
.cr::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease);z-index:-1}
.cr:hover,.cr:focus-visible{color:#fff}.cr:hover::before,.cr:focus-visible::before{transform:scaleX(1)}
.cn{font-family:var(--font-jb),monospace;font-size:12px;opacity:.6}
.ct{font-size:clamp(18px,1.9vw,26px);font-weight:600;letter-spacing:-.03em;line-height:1.2}
.ci{font-size:13px;opacity:.65;margin-top:6px}
.ca{font-size:22px;opacity:0;transform:translate(-10px,10px);transition:all .5s var(--ease)}
.cr:hover .ca,.cr:focus-visible .ca{opacity:1;transform:none}
@media(max-width:900px){.cg{grid-template-columns:1fr}.cs{position:static}.cr{grid-template-columns:36px minmax(0,1fr) auto;padding:24px 12px}}
`;

export default function Certifications() {
  return (
    <section id="certs" className="sec cb" aria-labelledby="certs-h">
      <style>{css}</style>
      <div className="wrap cg">
        <div className="cs">
          <SectionHead id="certs-h" n="04" label="Certifications" title="Always" em="learning." />
          <p className="cnt rv">{String(CERTIFICATIONS.length).padStart(2, "0")} certifications</p>
        </div>
        <ul className="cl">
          {CERTIFICATIONS.map((c, i) => {
            const inner = (<>
              <span className="cn">{String(i + 1).padStart(2, "0")}</span>
              <span><span className="ct" style={{ display: "block" }}>{c.title}</span><span className="ci" style={{ display: "block" }}>{c.issuer} · {c.date}</span></span>
              <span className="ca" aria-hidden="true">↗</span></>);
            return (
              <li key={c.title} className="rv" style={{ ["--i" as string]: i }}>
                {c.link ? <a className="cr" href={c.link} target="_blank" rel="noopener noreferrer" aria-label={`${c.title}, ${c.issuer} — view certificate`}>{inner}</a>
                  : <div className="cr" tabIndex={0}>{inner}</div>}
              </li>);
          })}
        </ul>
      </div>
    </section>
  );
}
