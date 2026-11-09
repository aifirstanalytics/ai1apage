// Single place for the facts that appear across the site.
// Edit this file to change contact details; no other file needs to change.

export const site = {
  name: "AI-First Analytics",
  legalName: "AI-First Analytics, Inc.",
  url: "https://aifirstanalytics.com",
  tagline: "Custom AI analytics software, built around your data.",
  description:
    "AI-First Analytics, Inc. builds custom AI analytics software: natural-language data interfaces, multimodal analytics, and AI-powered data pipelines. We also advise teams on cutting the cost of LLM-powered data systems.",

  // Contact. Paste your Calendly event link below (e.g. "https://calendly.com/your-name/intro").
  // While it is empty, every "Book a call" button falls back to an email link, so nothing is broken.
  email: "aifirstanalytics@gmail.com",
  calendlyUrl: "https://calendly.com/immanuel-trummer/intro",
  // Optional: full LinkedIn URL. The link is hidden while this is empty.
  linkedinUrl: "",

  founder: {
    name: "Immanuel Trummer",
    title: "Associate Professor of Computer Science, Cornell University",
    website: "https://itrummer.org",
  },
} as const;

/** Where the primary call-to-action points: Calendly if configured, otherwise email. */
export const bookingHref: string = site.calendlyUrl
  ? site.calendlyUrl
  : `mailto:${site.email}?subject=${encodeURIComponent("Intro call")}`;

export const bookingIsExternal: boolean = Boolean(site.calendlyUrl);
