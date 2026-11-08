import type { ReactNode } from "react";
import { Tabs, type TabItem } from "./Tabs";

/* Illustrative mock-ups for the hero. Photos are stock images from Pexels (see README for credits). */

function Card({ children }: { children: ReactNode }) {
  return <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-xl shadow-ink/5">{children}</div>;
}

function QueryBar({ children, icon = "search" }: { children: ReactNode; icon?: "search" | "chat" }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink">
      <span className="shrink-0 text-muted">
        {icon === "search" ? (
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4 4" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 4h14v9H8l-5 3V4z" />
          </svg>
        )}
      </span>
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-strong">{children}</span>;
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-auto pt-4 text-xs text-muted">{children}</p>;
}

/* ---------- 1. Ask your data ---------- */

const growth = [
  { label: "Outdoor", value: 18 },
  { label: "Kitchen", value: 14 },
  { label: "Lighting", value: 9 },
  { label: "Textiles", value: 4 },
];

function AskYourData() {
  return (
    <Card>
      <QueryBar icon="chat">Which product categories grew fastest last quarter?</QueryBar>
      <pre
        className="mt-3 overflow-x-auto rounded-xl bg-ink p-4 text-[12px] leading-relaxed text-[#cfe0ff]"
        aria-label="Generated SQL query"
      >
        <code>
          <span className="text-[#7fa8ff]">SELECT</span> category, growth_pct{"\n"}
          <span className="text-[#7fa8ff]">FROM</span> quarterly_sales{"\n"}
          <span className="text-[#7fa8ff]">WHERE</span> quarter = &apos;Q3&apos;{"\n"}
          <span className="text-[#7fa8ff]">ORDER BY</span> growth_pct <span className="text-[#7fa8ff]">DESC LIMIT</span> 4;
        </code>
      </pre>
      <ul className="mt-4 space-y-2" aria-label="Growth versus previous quarter">
        {growth.map((g) => (
          <li key={g.label} className="flex items-center gap-3 text-xs">
            <span className="w-16 shrink-0 text-muted">{g.label}</span>
            <span className="h-2.5 flex-1 rounded-full bg-surface">
              <span className="block h-full rounded-full bg-accent" style={{ width: `${(g.value / 18) * 100}%` }} />
            </span>
            <span className="w-9 shrink-0 text-right font-semibold tabular-nums">+{g.value}%</span>
          </li>
        ))}
      </ul>
      <Note>Answer: outdoor and kitchen grew fastest, up 18% and 14% over the previous quarter.</Note>
    </Card>
  );
}

/* ---------- 2. Real estate ---------- */

const listings = [
  { img: "/examples/home-1.jpg", alt: "Bright open kitchen with large windows", title: "Corner unit, open kitchen", tags: ["natural light", "open plan", "garden view"], price: "$865,000" },
  { img: "/examples/home-2.jpg", alt: "Living area with floor-to-ceiling windows facing the water", title: "Waterfront, panoramic windows", tags: ["water view", "bright"], price: "$889,000" },
  { img: "/examples/home-3.jpg", alt: "Industrial loft with open kitchen and staircase", title: "Loft conversion", tags: ["open plan", "exposed concrete"], price: "$842,000" },
];

function RealEstate() {
  return (
    <Card>
      <QueryBar>bright open-plan kitchen with a view, under $900k</QueryBar>
      <ul className="mt-4 space-y-3">
        {listings.map((r) => (
          <li key={r.title} className="flex items-center gap-3 rounded-xl border border-line p-2.5 sm:gap-4 sm:p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.img} alt={r.alt} width={96} height={64} loading="lazy" className="h-14 w-[5.25rem] shrink-0 rounded-lg object-cover sm:w-24" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-snug">{r.title}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
            <p className="shrink-0 text-sm font-semibold tabular-nums">{r.price}</p>
          </li>
        ))}
      </ul>
      <Note>Matches found by analyzing listing photos and descriptions together.</Note>
    </Card>
  );
}

/* ---------- 3. Furniture ---------- */

const pieces = [
  { img: "/examples/sofa.jpg", alt: "Beige sofa", name: "Sofa", detail: "warm neutral", pos: "50% 60%" },
  { img: "/examples/armchair.jpg", alt: "Green armchair", name: "Armchair", detail: "accent green", pos: "50% 50%" },
  { img: "/examples/side-table.jpg", alt: "Wooden side table", name: "Side table", detail: "natural wood", pos: "5% 85%" },
  { img: "/examples/lamp.jpg", alt: "Floor lamp next to a sofa", name: "Floor lamp", detail: "warm light", pos: "70% 40%" },
];

function Furniture() {
  return (
    <Card>
      <QueryBar>complete the set: warm mid-century living room</QueryBar>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {pieces.map((p) => (
          <li key={p.name} className="overflow-hidden rounded-xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.alt} width={240} height={112} loading="lazy" className="h-24 w-full object-cover sm:h-[6.5rem]" style={{ objectPosition: p.pos }} />
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-[11px] text-muted">{p.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <Note>Pieces ranked by how well they match each other in style, color, and scale.</Note>
    </Card>
  );
}

/* ---------- 4. Metadata ---------- */

const attributes = [
  ["Type", "Armchair"],
  ["Color", "Lime green"],
  ["Style", "Modern"],
  ["Base", "Chrome, swivel"],
  ["Room", "Living room"],
];

function Metadata() {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">product-0412.jpg</span>
        <span className="text-xs text-muted">1 photo, 5 attributes</span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[0.9fr_1.1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/examples/armchair.jpg" alt="Green armchair on a white background" width={240} height={160} loading="lazy" className="h-36 w-full rounded-xl border border-line object-cover sm:h-full" />
        <dl className="space-y-2">
          {attributes.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2">
              <dt className="text-xs text-muted">{k}</dt>
              <dd>
                <Chip>{v}</Chip>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <Note>Attributes generated automatically, ready to search, filter, and export.</Note>
    </Card>
  );
}

/* ---------- Tabs ---------- */

const tabs: TabItem[] = [
  { id: "ask", label: "Ask your data", content: <AskYourData /> },
  { id: "homes", label: "Real estate", content: <RealEstate /> },
  { id: "furniture", label: "Furniture", content: <Furniture /> },
  { id: "metadata", label: "Metadata", content: <Metadata /> },
];

export function HeroExamples() {
  return (
    <figure className="relative min-w-0">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-soft via-white to-transparent" aria-hidden="true" />
      <Tabs tabs={tabs} label="Example use cases" autoAdvanceMs={7000} />
      <figcaption className="mt-3 text-center text-xs text-muted">Illustrative mock-ups, not real product screenshots</figcaption>
    </figure>
  );
}
