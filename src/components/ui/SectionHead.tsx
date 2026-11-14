export default function SectionHead({ n, label, title, em, id }: { n: string; label: string; title: string; em: string; id: string }) {
  return (
    <header className="sh">
      <p className="tag rv">{n} — {label}</p>
      <h2 id={id} className="h2 rv-mask"><span>{title} <em>{em}</em></span></h2>
    </header>
  );
}
