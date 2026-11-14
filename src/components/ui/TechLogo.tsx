import type { ReactNode } from "react";

export const BRAND: Record<string, { src: string; tint: string }> = {
  "Java 17/21": { src: "java", tint: "#E76F00" }, "Spring Boot": { src: "spring", tint: "#6DB33F" },
  "Spring Security": { src: "spring", tint: "#6DB33F" }, "Spring Data JPA": { src: "spring", tint: "#6DB33F" },
  "Spring AOP": { src: "spring", tint: "#6DB33F" }, Hibernate: { src: "hibernate", tint: "#59666C" },
  RabbitMQ: { src: "rabbitmq", tint: "#FF6600" }, MySQL: { src: "mysql", tint: "#00758F" }, Redis: { src: "redis", tint: "#DC382D" },
  Docker: { src: "docker", tint: "#2496ED" }, "Docker Compose": { src: "docker", tint: "#2496ED" },
  AWS: { src: "amazonwebservices", tint: "#FF9900" }, Git: { src: "git", tint: "#F05032" }, Maven: { src: "maven", tint: "#C71A36" },
  "IntelliJ IDEA": { src: "intellij", tint: "#FE315D" }, Postman: { src: "postman", tint: "#FF6C37" },
  "Swagger / OpenAPI": { src: "swagger", tint: "#85EA2D" },
};

const P: Record<string, ReactNode> = {
  db: <><ellipse cx="24" cy="12" rx="14" ry="5" /><path d="M10 12v24c0 3 6 5 14 5s14-2 14-5V12M10 24c0 3 6 5 14 5s14-2 14-5" /></>,
  key: <><circle cx="17" cy="24" r="7" /><path d="M24 24h18M36 24v6M42 24v4" /></>,
  api: <path d="M16 14 6 24l10 10M32 14l10 10-10 10M27 10l-6 28" />,
  grid: <><rect x="8" y="8" width="14" height="14" rx="3" /><rect x="26" y="8" width="14" height="14" rx="3" /><rect x="8" y="26" width="14" height="14" rx="3" /><rect x="26" y="26" width="14" height="14" rx="3" /></>,
  layers: <path d="m24 6 18 9-18 9-18-9zM6 24l18 9 18-9M6 33l18 9 18-9" />,
  table: <><rect x="8" y="10" width="32" height="28" rx="3" /><path d="M8 20h32M8 29h32M20 10v28" /></>,
  cube: <path d="m24 6 16 9v18l-16 9-16-9V15zM8 15l16 9 16-9M24 24v18" />,
  tree: <><circle cx="24" cy="10" r="4" /><circle cx="12" cy="36" r="4" /><circle cx="36" cy="36" r="4" /><path d="M24 14v8M24 22 12 32M24 22l12 10" /></>,
  stack: <><rect x="8" y="9" width="32" height="8" rx="3" /><rect x="8" y="20" width="32" height="8" rx="3" /><rect x="8" y="31" width="32" height="8" rx="3" /></>,
  warn: <path d="m24 7 18 32H6zM24 20v10M24 35h.01" />,
  threads: <><path d="M8 14h32M8 24h32M8 34h32" /><circle cx="16" cy="14" r="2.5" /><circle cx="30" cy="24" r="2.5" /><circle cx="22" cy="34" r="2.5" /></>,
  loop: <path d="M38 20a14 14 0 1 0 2 8M38 10v10H28" />,
  spark: <path d="m24 6 4 14 14 4-14 4-4 14-4-14-14-4 14-4z" />,
  chat: <path d="M8 12h32v20H20l-8 8v-8H8z" />,
  graph: <><circle cx="10" cy="14" r="4" /><circle cx="38" cy="12" r="4" /><circle cx="24" cy="38" r="4" /><circle cx="26" cy="22" r="3" /><path d="M13 16l10 5M35 14l-8 7M25 25v9" /></>,
  terminal: <><rect x="6" y="10" width="36" height="28" rx="4" /><path d="m14 20 6 5-6 5M24 31h10" /></>,
  branch: <><circle cx="14" cy="12" r="4" /><circle cx="14" cy="36" r="4" /><circle cx="34" cy="20" r="4" /><path d="M14 16v16M34 24c0 6-6 8-14 8" /></>,
};
export const CONCEPT: Record<string, keyof typeof P> = {
  JWT: "key", "REST APIs": "api", Microservices: "grid", SQL: "db", "IBM DB2": "db", SVN: "branch", "System Design (HLD)": "layers",
  "Schema Design": "table", OOP: "cube", "Data Structures": "tree", Collections: "stack", "Exception Handling": "warn",
  "Multithreading & Concurrency": "threads", "Agile/Scrum": "loop", Kiro: "spark", "Amazon Q Developer": "chat",
  "Knowledge Graphs": "graph", "Prompt Engineering": "terminal",
};
export const isBrand = (name: string) => name in BRAND;

export default function TechLogo({ name, size = 28, alt = "" }: { name: string; size?: number; alt?: string }) {
  const b = BRAND[name];
  if (b) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/logos/${b.src}.svg`} width={size} height={size} alt={alt} loading="lazy" decoding="async" />;
  }
  const k = CONCEPT[name] ?? "spark";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6}
      strokeLinecap="round" strokeLinejoin="round" role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
      {P[k]}
    </svg>
  );
}
