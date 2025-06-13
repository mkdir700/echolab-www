import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 基本配置 / Basic configuration
  reactStrictMode: true,
  poweredByHeader: false,

  // 图片优化配置 / Image optimization configuration
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },

  // 编译器选项 / Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
