import type { ReactNode } from "react";
import { Container, Eyebrow } from "./ui";

const iconProps = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const services: { title: string; text: string; example: string; icon: ReactNode }[] = [
  {
    title: "Natural-language data interfaces",
    text: "Let people ask questions in plain English and get answers straight from your databases: text-to-SQL, chatbots for data, and data agents that run multi-step analyses. Designed to be reliable and auditable on your own schema.",
    example: "A chat interface on your warehouse that answers with a query, a chart, and an explanation.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 5h16v11H9l-5 4V5z" />
        <path d="M8 9.5h8M8 12.5h5" />
      </svg>
    ),
  },
  {
    title: "Multimodal analytics",
    text: "Ask questions across photos, documents, and tables in one place. We build a working prototype on your own data, so you can judge the value before committing to a full build.",
    example: "Search property listings by what is in the photos and what is in the description.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m4 17 5-4 4 3 3-2 4 3" />
      </svg>
    ),
  },
  {
    title: "Metadata enrichment and discovery",
    text: "Turn unstructured images, PDFs, and product catalogs into clean, structured data with tags and attributes generated at scale. Then build search and matching interfaces on top, designed around how your customers actually look for things.",
    example: "Extract style and material attributes, then help customers find furniture pieces that go together.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 5h16M4 12h10M4 19h7" />
        <circle cx="17" cy="16" r="3" />
        <path d="m19.2 18.2 2.3 2.3" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="build" className="bg-surface py-20 md:py-28">
      <Container>
        <Eyebrow>What we build</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          AI tools built around your data and your customers.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Every project starts from a concrete business question. Our tools work on real, messy data and are built to
          keep AI costs under control.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="flex flex-col rounded-2xl border border-line bg-white p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">{s.icon}</div>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
              <p className="mt-auto pt-6 text-sm text-ink">
                <span className="font-semibold text-accent">For example: </span>
                {s.example}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
