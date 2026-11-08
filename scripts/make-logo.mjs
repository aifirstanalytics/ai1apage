// Generates the logo files from Inter (outlined text, so no font dependency).
//
//   node scripts/make-logo.mjs
//
// Outputs:
//   public/logo/ai1st-wordmark.svg       light backgrounds (ink text, blue "1")
//   public/logo/ai1st-wordmark-dark.svg  dark backgrounds (white text, lighter blue "1")
//   src/app/icon.svg                     favicon (white "1" on blue rounded square)
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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="AI1st Analytics">
  ${top}
  <path fill="${inkColor}" d="${bot}"/>
</svg>
`;
}

mkdirSync(join(root, "public/logo"), { recursive: true });
writeFileSync(join(root, "public/logo/ai1st-wordmark.svg"), wordmark(INK, BLUE));
writeFileSync(join(root, "public/logo/ai1st-wordmark-dark.svg"), wordmark("#FFFFFF", BLUE_ON_DARK));

// Favicon: white "1" on a blue rounded square, centred on its visible bounds.
const probe = layout(heavy, "1", 24, 0)[0].getBoundingBox();
const [oneGlyph] = layout(heavy, "1", 24, 0, 16 - (probe.x1 + probe.x2) / 2, 16 - (probe.y1 + probe.y2) / 2);
mkdirSync(join(root, "src/app"), { recursive: true });
writeFileSync(
  join(root, "src/app/icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="${BLUE}"/>
  <path fill="#FFFFFF" d="${oneGlyph.toPathData(2)}"/>
</svg>
`,
);

console.log(`Wordmark ${width}x${height}, "ANALYTICS" tracking ${botTracking.toFixed(3)}em`);
