import { site } from "@/config/site";
import { SelectedWork } from "./SelectedWork";
import { Container, Eyebrow } from "./ui";

export function About() {
  return (
    <section id="about" className="bg-surface py-20 md:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0">
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Work directly with the expert.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {site.name} was founded by {site.founder.name}, Associate Professor of Computer Science at Cornell University.
            His work sits at the intersection of data analysis and large language models: natural-language interfaces to
            data, AI agents that analyze it, and efficient processing of text, tables, images, and sound.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            He received an NSF CAREER award and several &ldquo;Best of VLDB&rdquo; and &ldquo;Best of SIGMOD&rdquo;
            distinctions, and wrote <em>Data Analysis with LLMs</em>, now available in five languages. Clients work with
            him directly: senior, hands-on engineering, with no layers of account managers.
          </p>
          <a
            href={site.founder.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong"
          >
            Learn more about {site.founder.name}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="min-w-0">
          <SelectedWork />
        </div>
      </Container>
    </section>
  );
}
