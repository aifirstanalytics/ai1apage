import { site } from "@/config/site";
import { Button, Container } from "./ui";

export function Contact() {
  return (
    <section id="contact" className="bg-accent py-20 text-white md:py-24">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Let&rsquo;s talk about your data.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          A 20-minute call is the easiest way to find out whether we can help. Tell us what you are trying to do and we
          will tell you honestly what is feasible.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button variant="light">Book a 20-minute call</Button>
          <Button variant="ghost-light" href={`mailto:${site.email}`}>
            {site.email}
          </Button>
        </div>
        {site.linkedinUrl ? (
          <p className="mt-6 text-sm text-white/85">
            or connect on{" "}
            <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              LinkedIn
            </a>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
