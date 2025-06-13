import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Vercel 部署时不使用静态导出 / Don't use static export for Vercel deployment
  // output: 'export', // 注释掉静态导出，让 Vercel 使用标准 Next.js 部署

  // 图片优化配置 / Image optimization configuration
  images: {
    // Vercel 支持图片优化，可以启用 / Vercel supports image optimization, can be enabled
    unoptimized: false,
    domains: [], // Add domains for external images as needed
    formats: ["image/webp", "image/avif"],
  },

  // 服务端功能配置 / Server-side features configuration
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
