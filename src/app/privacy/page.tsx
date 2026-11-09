import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy information for ${site.name}.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-line bg-white">
        <Container className="flex h-16 items-center justify-between">
          <a href="/" aria-label="AI-First Analytics, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/ai1st-wordmark.svg" alt="AI-First Analytics" width={230} height={119} className="h-9 w-auto" />
          </a>
          <a href="/" className="text-sm font-medium text-muted hover:text-ink">
            &larr; Back to home
          </a>
        </Container>
      </header>
      <main className="bg-white py-16 md:py-20">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy</h1>
          <p className="mt-2 text-sm text-muted">Last updated: November 2026</p>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink/90">
            <p>
              This website is operated by {site.legalName}. We keep it deliberately simple and collect as little data as
              possible.
            </p>

            <section>
              <h2 className="text-lg font-semibold">What this site does not do</h2>
              <p className="mt-2">
                The site does not use cookies, advertising trackers, or analytics scripts, and it has no sign-up or contact
                form. Fonts are served from this site, not from a third party.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Hosting</h2>
              <p className="mt-2">
                The site is hosted on GitHub Pages. Like any web host, GitHub may process technical information such as IP
                addresses and request logs when you visit. See{" "}
                <a
                  className="font-medium text-accent hover:text-accent-strong"
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub&rsquo;s privacy statement
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Contacting us</h2>
              <p className="mt-2">
                If you email us, we use your message and address only to reply to you and to follow up on the conversation.
                We do not sell or share them. If you book a call through a scheduling link, the scheduling provider
                processes the details you enter under its own privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Questions</h2>
              <p className="mt-2">
                To ask about or request deletion of anything you have sent us, write to{" "}
                <a className="font-medium text-accent hover:text-accent-strong" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
