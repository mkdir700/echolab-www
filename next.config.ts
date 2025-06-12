import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [], // Add domains for external images as needed
    formats: ["image/webp", "image/avif"],
  },
  env: {
    // Custom environment variables can be added here
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
