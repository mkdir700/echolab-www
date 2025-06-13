import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 启用静态导出 / Enable static export
  output: 'export',

  // 禁用图片优化（静态导出不支持）/ Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
    domains: [], // Add domains for external images as needed
    formats: ["image/webp", "image/avif"],
  },

  // 禁用服务端功能 / Disable server-side features
  trailingSlash: true,

  env: {
    // Custom environment variables can be added here
  },

  // 暂时禁用实验性功能以避免构建问题
  // Temporarily disable experimental features to avoid build issues
  // experimental: {
  //   optimizeCss: true,
  // },
};

export default nextConfig;
