// Generates the logo files from Inter (outlined text, so no font dependency).
//
//   node scripts/make-logo.mjs
//
// Outputs:
//   public/logo/ai1st-wordmark.svg       light backgrounds (ink text, blue "1")
//   public/logo/ai1st-wordmark-dark.svg  dark backgrounds (white text, lighter blue "1")
//   src/app/icon.svg                     favicon (dots turning from chaos into a grid, on an ink rounded square)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = join(root, "node_modules/@fontsource/inter/files");

function loadFont(file) {
  const buf = readFileSync(join(fontDir, file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const heavy = loadFont("inter-latin-800-normal.woff");
const medium = loadFont("inter-latin-500-normal.woff");

// Brand colours
const INK = "#0B1220";
const BLUE = "#0057FF";
const BLUE_ON_DARK = "#4D8DFF";

// Manual glyph layout (the library's shaper cannot handle Inter's GSUB tables).
// Returns one opentype.Path per character, positioned along the baseline at y = 0.
function layout(font, text, size, trackingEm, x0 = 0, y0 = 0) {
  const scale = size / font.unitsPerEm;
  let x = x0;
  const out = [];
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  glyphs.forEach((g, i) => {
    out.push(g.getPath(x, y0, size));
    let adv = g.advanceWidth * scale + trackingEm * size;
    if (i < glyphs.length - 1) adv += (font.getKerningValue(g, glyphs[i + 1]) || 0) * scale;
    x += adv;
  });
  return out;
}

function boxOf(paths) {
  return paths.reduce(
    (b, p) => {
      const q = p.getBoundingBox();
      return { x1: Math.min(b.x1, q.x1), x2: Math.max(b.x2, q.x2), y1: Math.min(b.y1, q.y1), y2: Math.max(b.y2, q.y2) };
    },
    { x1: Infinity, x2: -Infinity, y1: Infinity, y2: -Infinity },
  );
}

// Geometry (SVG units; S = font size of the top line)
const S = 100;
const TOP_TRACKING = -0.04; // em
const BOT_SIZE = S * 0.232;
const GAP = S * 0.25; // baseline of top line -> cap top of bottom line
const PAD = 2;

const topText = "AI1st";
const botText = "ANALYTICS";

const topBox = boxOf(layout(heavy, topText, S, TOP_TRACKING));
const topWidth = topBox.x2 - topBox.x1;

// Solve for the letter-spacing that makes "ANALYTICS" exactly as wide as "AI1st".
const widthAt = (ls) => {
  const b = boxOf(layout(medium, botText, BOT_SIZE, ls));
  return b.x2 - b.x1;
};
const w0 = widthAt(0);
const slope = (widthAt(0.1) - w0) / 0.1;
const botTracking = (topWidth - w0) / slope;

// Place both lines: left edge at PAD, top of the top line at PAD.
const topBaseline = PAD - topBox.y1;
const topPaths = layout(heavy, topText, S, TOP_TRACKING, PAD - topBox.x1, topBaseline);

const botProbe = boxOf(layout(medium, botText, BOT_SIZE, botTracking));
const botBaseline = topBaseline + GAP - botProbe.y1; // y1 is negative (cap height above baseline)
const botPaths = layout(medium, botText, BOT_SIZE, botTracking, PAD - botProbe.x1, botBaseline);

const width = Math.ceil(topWidth + PAD * 2);
const height = Math.ceil(botBaseline + PAD);

function wordmark(inkColor, blueColor) {
  const top = topPaths
    .map((p, i) => `<path fill="${topText[i] === "1" ? blueColor : inkColor}" d="${p.toPathData(2)}"/>`)
    .join("\n  ");
  const bot = botPaths.map((p) => p.toPathData(2)).join(" ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="AI-First Analytics">
  ${top}
  <path fill="${inkColor}" d="${bot}"/>
</svg>
`;
}

mkdirSync(join(root, "public/logo"), { recursive: true });
writeFileSync(join(root, "public/logo/ai1st-wordmark.svg"), wordmark(INK, BLUE));
writeFileSync(join(root, "public/logo/ai1st-wordmark-dark.svg"), wordmark("#FFFFFF", BLUE_ON_DARK));

// Favicon: "structure from chaos". A 4x4 grid of dots on an ink rounded square. The left column is
// disordered (varying sizes, jittered positions, some dots missing) and the disorder fades column by
// column until the right column is a perfectly regular, blue column of equal dots.
// Deterministic (seeded), so re-running the script always produces the same icon.
function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function faviconDots({ cols = 4, rows = 4, radius = 2.4, size = 0.55, jitter = 0.28, drop = 0.25, seed = 7 } = {}) {
  const rand = seededRandom(seed);
  const span = 24; // usable area, centred in the 32x32 tile
  const px = span / cols;
  const py = span / rows;
  const dots = [];
  for (let c = 0; c < cols; c++) {
    const progress = c / (cols - 1);
    const disorder = 1 - progress; // 1 in the left column, exactly 0 in the right column
    for (let k = 0; k < rows; k++) {
      const r = [rand(), rand(), rand(), rand(), rand()];
      if (c === 0 && r[4] < drop) continue; // only the leftmost column may lose dots
      dots.push({
        fixed: disorder === 0,
        progress,
        x: 4 + px * (c + 0.5) + (r[0] * 2 - 1) * disorder * jitter * px,
        y: 4 + py * (k + 0.5) + (r[1] * 2 - 1) * disorder * jitter * py,
        r: radius * (1 + (r[2] * 2 - 1) * disorder * size),
      });
    }
  }
  // Push overlapping dots apart; the (perfect) right column never moves.
  const gap = 0.55;
  for (let it = 0; it < 120; it++) {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const p = dots[i];
        const q = dots[j];
        if (p.fixed && q.fixed) continue;
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const need = p.r + q.r + gap;
        if (dist >= need) continue;
        const push = (need - dist) / 2;
        const ux = dx / dist;
        const uy = dy / dist;
        if (p.fixed) {
          q.x += ux * push * 2;
          q.y += uy * push * 2;
        } else if (q.fixed) {
          p.x -= ux * push * 2;
          p.y -= uy * push * 2;
        } else {
          p.x -= ux * push;
          p.y -= uy * push;
          q.x += ux * push;
          q.y += uy * push;
        }
      }
    }
    for (const p of dots) {
      if (p.fixed) continue;
      p.x = Math.max(3 + p.r, Math.min(29 - p.r, p.x));
      p.y = Math.max(3 + p.r, Math.min(29 - p.r, p.y));
    }
  }
  // White on the left, shifting to the lighter blue from about the middle onwards.
  const WHITE_RGB = [255, 255, 255];
  const BLUE_RGB = [77, 141, 255]; // BLUE_ON_DARK
  const colour = (t) => {
    const u = Math.max(0, Math.min(1, (t - 0.25) / 0.75));
    return `rgb(${WHITE_RGB.map((w, i) => Math.round(w + (BLUE_RGB[i] - w) * u)).join(",")})`;
  };
  const n = (v) => Number(v.toFixed(2));
  return dots
    .map((p) => `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="${n(p.r)}" fill="${colour(p.progress)}"/>`)
    .join("\n  ");
}

mkdirSync(join(root, "src/app"), { recursive: true });
writeFileSync(
  join(root, "src/app/icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="${INK}"/>
  ${faviconDots()}
</svg>
`,
);

console.log(`Wordmark ${width}x${height}, "ANALYTICS" tracking ${botTracking.toFixed(3)}em`);
