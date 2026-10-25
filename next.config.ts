import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables static export compatibility for GitHub Pages, Cloudflare Pages, or Vercel
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
