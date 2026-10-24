import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables static export compatibility for GitHub Pages or Vercel
  // Set images unoptimized so static exports or custom hosts don't break
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
