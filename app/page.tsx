import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CoreFeatures from "@/components/CoreFeatures";
import DownloadSection from "@/components/DownloadSection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ProcessedRelease } from "@/lib/api";

// 使用 ISR（增量静态再生），每5分钟重新生成页面以获取最新版本信息
// Use ISR (Incremental Static Regeneration) to regenerate page every 5 minutes for latest release data
export const revalidate = 300; // 5分钟 / 5 minutes

// 服务器端获取版本信息的函数
// Server-side function to fetch release information
async function getLatestRelease(): Promise<ProcessedRelease | null> {
  try {
    // 在构建时直接请求 GitHub API，运行时使用我们的 API 路由
    // During build time, fetch directly from GitHub API; at runtime, use our API route
    const isBuilding =
      typeof window === "undefined" &&
      !process.env.VERCEL_URL &&
      !process.env.VERCEL;

    if (isBuilding) {
      // 构建时直接请求 GitHub API
      // During build, fetch directly from GitHub API
      const { getLatestReleaseFromGitHub } = await import("@/lib/github-api");
      return await getLatestReleaseFromGitHub();
    } else {
      // 运行时使用我们的 API 路由
      // At runtime, use our API route
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://echolab-www.vercel.app";

      const response = await fetch(`${baseUrl}/api/releases/latest`, {
        // 在服务器端缓存 5 分钟
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        console.error(
          "Failed to fetch release data from API:",
          response.statusText
        );
        return null;
      }

      const releaseData = await response.json();
      return releaseData;
    }
  } catch (error) {
    console.error("Error fetching release data:", error);
    return null;
  }
}

// 服务器端组件 - 在构建时或请求时获取数据
// Server component - fetch data at build time or request time
export default async function HomePage() {
  // 在服务器端获取版本信息
  // Fetch release information on the server side
  const releaseData = await getLatestRelease();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <HeroSection />
      <CoreFeatures />
      <DownloadSection releaseData={releaseData} />
      <SupportSection />
      <Footer />

      {/* 返回顶部按钮 / Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
}
