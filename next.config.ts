import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out
  output: "export",
  // No image optimization server on GitHub Pages
  images: { unoptimized: true },
  // Serve /privacy/ as privacy/index.html, which GitHub Pages handles cleanly
  trailingSlash: true,
};

export default nextConfig;
