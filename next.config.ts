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

  // Vercel 部署优化 / Vercel deployment optimization
  distDir: '.next',

  // 基础路径配置（如果需要子路径部署）/ Base path configuration (if subdirectory deployment needed)
  // basePath: '',
  // assetPrefix: '',

  env: {
    // Custom environment variables can be added here
  },

  // 实验性功能 / Experimental features
  experimental: {
    // 启用优化的 CSS / Enable optimized CSS
    optimizeCss: false, // 暂时禁用以避免构建问题 / Temporarily disable to avoid build issues
  },

  // 编译器选项 / Compiler options
  compiler: {
    // 移除 console.log（生产环境）/ Remove console.log (production)
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 性能优化 / Performance optimization
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
