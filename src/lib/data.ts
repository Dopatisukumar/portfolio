// Single source of truth. Every string below comes from Sukumar_Dopati_Java.pdf.
export const PROFILE = {
  name: "Sukumar Dopati", first: "Sukumar", initials: "SD", role: "Java Backend Developer",
  headline: "Java Backend Developer | Spring Boot | 3+ Years in Enterprise Product Development",
  email: "dopatisukumar@gmail.com", phone: "+91 93905 17887", phoneHref: "tel:+919390517887",
  location: "Hyderabad, India",
  resumeSummary:
    "I'm a Java backend developer with over three years at Infor, working on Infor XA, an ERP for manufacturers. I led the high-level design and data model of Packing, the core feature of the R11.1 release, and I now own it, including customer escalations. Outside work I built and deployed a 32-endpoint job portal API to practise the stack I want to work in: Spring Boot, Spring Security, and JPA. I'm a three-time Best Employee winner and open to relocating.",
  extraLine: "Core coursework: Advanced Data Structures, Database Systems.",
  quote: "Backend engineer for enterprise software: data models, business rules, and secure APIs, built with spec-driven AI tooling.",
  github: "https://github.com/Dopatisukumar", linkedin: "https://linkedin.com/in/dopati-sukumar",
  resume: "/Sukumar_Dopati_Resume.pdf", gradYear: "Jul 2023", dept: "Software Engineering",
};

export const NAV = [
  { id: "about", label: "About" }, { id: "skills", label: "Skills" }, { id: "work", label: "Work" },
  { id: "experience", label: "Experience" }, { id: "achievements", label: "Achievements" }, { id: "contact", label: "Contact" },
];

export type Skill = { name: string; sym: string; note?: string };
export type SkillGroup = { family: string; skills: Skill[] };
export const SKILL_GROUPS: SkillGroup[] = [
  { family: "Java & Spring", skills: [
    { name: "Java 17/21", sym: "Jv" }, { name: "Spring Boot", sym: "Sb" },
    { name: "Spring Security", sym: "Ss", note: "Stateless JWT filter, 3 roles, BCrypt hashing" },
    { name: "Spring Data JPA", sym: "Jp", note: "Removed N+1 queries with JOIN FETCH and batch fetching" },
    { name: "Hibernate", sym: "Hb" }, { name: "Spring AOP", sym: "Ao" },
    { name: "JWT", sym: "Jw" }, { name: "REST APIs", sym: "Rs" } ] },
  { family: "Architecture & Data", skills: [
    { name: "Microservices", sym: "Ms", note: "Learning" }, { name: "RabbitMQ", sym: "Rq", note: "Learning" },
    { name: "SQL", sym: "Sq" }, { name: "MySQL", sym: "My" },
    { name: "IBM DB2", sym: "Db", note: "Data model for Packing at Infor" },
    { name: "Redis", sym: "Re", note: "Learning" },
    { name: "System Design (HLD)", sym: "Sd", note: "Applied to Packing" },
    { name: "Schema Design", sym: "Sc" } ] },
  { family: "DevOps & Tools", skills: [
    { name: "Docker", sym: "Dk", note: "Multi-stage build, deployed on Render" },
    { name: "Docker Compose", sym: "Dc" }, { name: "AWS", sym: "Aw", note: "Learning" }, { name: "Git", sym: "Gt" },
    { name: "SVN", sym: "Sv" }, { name: "Maven", sym: "Mv" }, { name: "IntelliJ IDEA", sym: "Ij" }, { name: "Postman", sym: "Pm" },
    { name: "Swagger / OpenAPI", sym: "Sw" } ] },
  { family: "Core Concepts", skills: [
    { name: "OOP", sym: "Oo" }, { name: "Data Structures", sym: "Ds" }, { name: "Collections", sym: "Co" },
    { name: "Exception Handling", sym: "Ex" }, { name: "Multithreading & Concurrency", sym: "Mt", note: "Learning" },
    { name: "Agile/Scrum", sym: "Ag" } ] },
  { family: "AI Tools", skills: [
    { name: "Kiro", sym: "Ki", note: "Specs, Steering, Hooks, Skills, Custom Agents, MCP" }, { name: "Amazon Q Developer", sym: "Aq" },
    { name: "Knowledge Graphs", sym: "Kg", note: "Used on the Infor XA product code" }, { name: "Prompt Engineering", sym: "Pe" } ] },
];

export const PROJECTS = [
  { id: "jobportal", index: "01", title: "Job Portal REST API", kicker: "Personal project · Mar 2026 – Sep 2026",
    description: "A job portal backend built end to end: job seekers apply, employers post and review, and admins manage everything. Login is stateless JWT with three roles and breach-checked passwords. Containerized with Docker and deployed on Render behind a Vercel frontend.",
    features: ["Scope: 32 endpoints across 7 controllers", "Security: stateless JWT, 3 roles, BCrypt, breach-checked passwords",
      "Audit trail: Spring AOP aspects for logging, timing, and auditing", "Speed: N+1 queries removed with JOIN FETCH and batch fetching",
      "Consistency: multi-table writes stay atomic with @Transactional", "Caching: Caffeine caches with per-profile expiry",
      "Validation: Bean Validation and centralized error handling", "Logging: Logback rolling files kept for 30 days"],
    tech: ["Spring Boot 4", "Java 21", "Spring Security", "JPA", "MySQL", "Docker"],
    techLogos: ["Spring Boot", "Java 17/21", "Spring Security", "Spring Data JPA", "MySQL", "Docker"],
    skills: ["Java 17/21", "Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "Spring AOP", "JWT", "REST APIs", "MySQL", "Docker", "Docker Compose", "Git", "Maven"],
    github: "https://github.com/Dopatisukumar/jobportal-backend", live: "https://sk-jobportal.vercel.app/" },
  { id: "packing", index: "02", title: "Packing: Infor XA R11.1", kicker: "Infor · Core feature of the R11.1 major release",
    description: "The core feature of Infor XA R11.1, an ERP for manufacturers: it packs customer orders, pick lists, and scheduled issues into nested containers. I led its high-level design and data model, so a container's full contents load in one lookup. Edits stay in a staging layer until the user confirms, so nothing uncommitted reaches the database. Built with Kiro spec-driven development.",
    features: ["Data model: 5 parent-child and closure-style tables", "Fast lookup: a container's full contents load in one lookup",
      "Validation: 6 levels of eligibility rules, each with its own error message", "Safe edits: unsaved changes stay in a staging layer until confirmed",
      "Database safety: no uncommitted writes reach DB2", "Less contention: only final package records are saved, limiting DB2 record locks",
      "AI-built: 14 DB2 table definitions generated from Kiro specs", "Team standards: steering files, plus IBM i and Jira MCP servers for debugging"],
    tech: ["Java", "SQL", "IBM DB2", "Kiro", "MCP"],
    techLogos: ["Java 17/21", "SQL", "IBM DB2", "Kiro"],
    skills: ["Java 17/21", "SQL", "IBM DB2", "System Design (HLD)", "Schema Design", "Kiro", "OOP", "Data Structures", "Git", "SVN", "Agile/Scrum"],
    github: "", live: "" },
];

export const CERTIFICATIONS = [
  { title: "Master Spring 7, Spring Boot 4, REST, JPA, Security", issuer: "Udemy", date: "Oct 2026", link: "http://ude.my/UC-01294848-0ad3-4c5e-8b3c-ff154f658fe4" },
  { title: "Programming in Java — Elite + Gold, Top 1% (90% score)", issuer: "NPTEL", date: "May 2023", link: "" },
];

export const EDUCATION = [
  { when: "Aug 2019 – May 2023", title: "B.Tech, Computer Science and Engineering", place: "Sri Venkateswara University College of Engineering, Tirupati, India",
    points: ["CGPA 8.7 / 10.0", "Dean's Honor List (3rd & 5th semesters)", "Advanced Data Structures, Database Systems"] },
];
export const EXPERIENCE = [
  { when: "Jul 2023 – Present", title: "Infor (India) Private Limited", place: "Hyderabad, India",
    roles: ["Software Engineer · Oct 2026 – Present", "Associate Software Engineer · Jul 2023 – Sep 2026"],
    points: [
      "Led the high-level design and data model of Packing, the core feature of the R11.1 major release, and now own it. Nested containers sit in 5 parent-child and closure-style tables, so one lookup loads a full container.",
      "Wrote 6 levels of eligibility rules, warehouse down to scheduled issue, each returning its own error message. Unsaved edits and splits stay in a staging layer until the user confirms, so nothing uncommitted reaches DB2.",
      "Used Kiro spec-driven development, with steering files for team standards, and generated 14 DB2 table definitions from specs. Queried IBM i and Jira MCP servers to debug customer escalations.",
      "Fixed 70+ defects (40+ in Java) raised by enterprise users worldwide across R9.2, R10, and R11, tracing business-logic failures, data-mapping errors, and client-server synchronization issues to their root cause.",
      "Moved 2 warehouse vendor modules from 5250 green screens to IDF, with Java client components and a new DB2 structure. A calculation engine for 5 inventory quantity types and per-vendor splits replaced manual recalculation.",
      "Delivered 3 General Ledger (EGLi) enhancements: unit-based intercompany posting with automatic line balancing, 104 CSM macros, and 18 prorated macros that load customer order and financial transaction data.",
      "Interviewed 18 campus candidates on Core Java, data structures, and SQL schema design." ] },
];

export const ACHIEVEMENTS = [
  { id: "a1", tile: "IN", label: "Best Employee Award", caption: "Infor · Q2 2024, Q2 2025, Q1 2026", detail: "R11.0 delivery, defect resolution, CSM macros", value: 3, suffix: "×" },
  { id: "a2", tile: "IN", label: "Major releases", caption: "Infor XA · R11.0 and R11.1", detail: "R11.0 delivery and R11.1 Packing lead", value: 2, suffix: "" },
  { id: "a3", tile: "IN", label: "Defects fixed", caption: "Infor XA · R9.2, R10, R11", detail: "40+ of them in Java", value: 70, suffix: "+" },
  { id: "a4", tile: "IN", label: "Product enhancements", caption: "Infor XA", detail: "2 warehouse vendor and 3 general ledger (EGLi)", value: 5, suffix: "" },
  { id: "a5", tile: "DB", label: "DB2 tables created", caption: "Packing and product enhancements", detail: "14 of them generated with Kiro specs", value: 17, suffix: "" },
  { id: "a6", tile: "IN", label: "Campus interviews", caption: "Infor · Core Java, data structures, SQL", detail: "Technical rounds for campus hiring", value: 18, suffix: "" },
  { id: "a7", tile: "NP", label: "NPTEL · Top 1%", caption: "Programming in Java, Elite + Gold", detail: "90% score · May 2023", value: 90, suffix: "%" },
];
