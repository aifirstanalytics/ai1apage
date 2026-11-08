import { Button, Container, Eyebrow } from "./ui";

const points = [
  {
    title: "Find where the money goes",
    text: "We trace which queries, prompts, and models drive your AI spend.",
  },
  {
    title: "Right-size every step",
    text: "Match models, prompts, and execution strategies to each task instead of using the biggest model everywhere.",
  },
  {
    title: "Keep the quality you need",
    text: "Savings are measured against a quality bar we agree on up front, using your own data.",
  },
];

export function CostConsulting() {
  return (
    <section id="consulting" className="bg-ink py-20 text-white md:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow onDark>Consulting</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Already running AI on your data? We help you cut the bill.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            LLM-powered SQL, chatbots, agents, and data pipelines can get expensive fast. We review your existing setup, on
            platforms such as Snowflake Cortex, BigQuery, or Databricks, and recommend concrete changes that reduce cost
            without sacrificing results.
          </p>
          <div className="mt-8">
            <Button variant="light">Talk to us about your workload</Button>
          </div>
        </div>
        <ul className="space-y-4">
          {points.map((p, i) => (
            <li key={p.title} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold">{i + 1}</span>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-white/65">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
