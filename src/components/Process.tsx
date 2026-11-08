import { Container, Eyebrow } from "./ui";

const steps = [
  {
    n: "01",
    title: "Discovery call",
    text: "A 20-minute conversation about your data, your goals, and what a useful result would look like. No cost, no obligation.",
  },
  {
    n: "02",
    title: "Scoped prototype",
    text: "We agree on a clear scope and timeline, then deliver working software on your data, typically within weeks.",
  },
  {
    n: "03",
    title: "Iterate or hand over",
    text: "Extend the prototype toward production with us, or take the code and documentation and continue in-house.",
  },
];

const assurances = ["Your data stays in your environment", "You own the code", "NDA available on request"];

export function Process() {
  return (
    <section id="process" className="bg-white py-20 md:py-28">
      <Container>
        <Eyebrow>How we work</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">From first call to working prototype.</h2>
        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-2xl border border-line p-7">
              <span className="text-sm font-bold tracking-widest text-accent">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ink">
          {assurances.map((a) => (
            <li key={a} className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="#0057ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="10" cy="10" r="8" />
                <path d="m6.5 10.2 2.4 2.4 4.6-4.8" />
              </svg>
              {a}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
