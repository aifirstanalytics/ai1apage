import { Button, Container } from "./ui";

const links = [
  { href: "#build", label: "What we build" },
  { href: "#consulting", label: "Consulting" },
  { href: "#process", label: "How we work" },
  { href: "#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="AI1st Analytics, home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/ai1st-wordmark.svg" alt="AI1st Analytics" width={230} height={119} className="h-9 w-auto" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <Button className="px-4 py-2.5">Book a call</Button>
      </Container>
    </header>
  );
}
