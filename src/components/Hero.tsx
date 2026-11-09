import { site } from "@/config/site";
import { HeroExamples } from "./HeroExamples";
import { Button, Container } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, #eef0f4 1px, transparent 1px), linear-gradient(to bottom, #eef0f4 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 30% 20%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 20%, black, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-1 items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Custom AI software and consulting for businesses with valuable data
          </p>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Custom AI analytics software, built around <span className="text-accent">your data.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            We build natural-language data interfaces, multimodal analytics tools, and AI-powered data pipelines, and help
            teams cut the cost of running them.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button>Book a 20-minute call</Button>
            <Button variant="secondary" href={`mailto:${site.email}`}>
              Email us
            </Button>
          </div>
        </div>
        <HeroExamples />
      </Container>
    </section>
  );
}
