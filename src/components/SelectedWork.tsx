import { Tabs, type TabItem } from "./Tabs";

type Item = {
  id: string;
  tab: string;
  kicker: string;
  title: string;
  subtitle?: string;
  text: string;
  why?: string;
  link?: { href: string; label: string };
};

const items: Item[] = [
  {
    id: "book",
    tab: "Book",
    kicker: "Book",
    title: "Data Analysis with LLMs",
    subtitle: "Text, Tables, Images and Sound",
    text: "A practical guide to using large language models to analyze text, tables, images, and sound, published by Manning and available in five languages.",
    link: { href: "https://www.manning.com/books/llms-in-action", label: "View the book at Manning" },
  },
  {
    id: "nl",
    tab: "Natural-language queries",
    kicker: "Research theme",
    title: "Natural-language query interfaces",
    text: "Letting people query data in plain language: text-to-SQL, chatbots for data, and data agents.",
    why: "The foundation for tools your team can use without writing SQL.",
  },
  {
    id: "semantic",
    tab: "Semantic queries",
    kicker: "Research theme",
    title: "Semantic query processing",
    text: "SQL extended with AI operators, so one query can filter, join, and aggregate over photos, documents, and tables, with a focus on speed and cost-efficiency.",
    why: "Analyze multimodal data with familiar tools, at predictable cost.",
  },
  {
    id: "agents",
    tab: "Data agents",
    kicker: "Research theme",
    title: "Agentic data analysis",
    text: "From human database users to computational agents that analyze data on their own.",
    why: "Automated analyses that keep running, with guardrails.",
  },
  {
    id: "code",
    tab: "Code generation",
    kicker: "Research theme",
    title: "LLM-generated code for data processing",
    text: "Using LLMs to synthesize the code that processes your data, customized to each task.",
    why: "Pipelines tailored to your data instead of one-size-fits-all tools.",
  },
  {
    id: "facts",
    tab: "Fact checking",
    kicker: "Research theme",
    title: "Data-driven fact checking",
    text: "Verifying claims written in natural language against relational and web data at scale.",
    why: "Automatic checks of reports and statements against your numbers.",
  },
];

const tabs: TabItem[] = items.map((it) => ({
  id: it.id,
  label: it.tab,
  content: (
    <article className="rounded-2xl border border-line bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{it.kicker}</p>
      <h3 className="mt-2 text-xl font-semibold leading-snug">{it.title}</h3>
      {it.subtitle ? <p className="mt-0.5 text-[15px] font-medium text-muted">{it.subtitle}</p> : null}
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{it.text}</p>
      {it.why ? (
        <p className="mt-4 text-sm text-ink">
          <span className="font-semibold text-accent">Why it matters: </span>
          {it.why}
        </p>
      ) : null}
      {it.link ? (
        <a
          href={it.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong"
        >
          {it.link.label}
          <span aria-hidden="true">&rarr;</span>
        </a>
      ) : null}
    </article>
  ),
}));

export function SelectedWork() {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-ink">Selected work</p>
      <Tabs tabs={tabs} label="Selected work" />
    </div>
  );
}
