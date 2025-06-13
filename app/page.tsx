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
    console.log("Starting release data fetch...");

    // 检测运行环境
    // Detect runtime environment
    const isVercel = !!process.env.VERCEL;
    const isBuilding = typeof window === "undefined" && !isVercel;

    console.log(`Environment: isVercel=${isVercel}, isBuilding=${isBuilding}`);

    // 在所有环境下都直接调用 GitHub API，避免自引用问题
    // Always call GitHub API directly to avoid self-reference issues
    const { getLatestReleaseFromGitHub } = await import("../lib/github-api");
    const releaseData = await getLatestReleaseFromGitHub();

    if (releaseData) {
      console.log(`Successfully fetched release data: ${releaseData.version}`);
    } else {
      console.error("Failed to fetch release data - returned null");
    }

    return releaseData;
  } catch (error) {
    console.error("Error in getLatestRelease:", error);
    // 提供更详细的错误信息
    // Provide more detailed error information
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
    }
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
