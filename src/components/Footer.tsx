import { site } from "@/config/site";
import { Container } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink py-12 text-white/70">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/ai1st-wordmark-dark.svg" alt="AI1st Analytics" width={230} height={119} className="h-12 w-auto" />
            <p className="mt-5 text-sm leading-relaxed">
              {site.name} is a trade name of {site.legalName}, a Delaware corporation.
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {site.name} is an independent company and is not affiliated with Cornell University.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm md:items-end">
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
            {site.linkedinUrl ? (
              <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            ) : null}
            <a href="/privacy/" className="hover:text-white">
              Privacy
            </a>
          </nav>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          &copy; {year} {site.legalName} All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
