import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ReleaseInfo from "@/components/ReleaseInfo";
import CoreFeatures from "@/components/CoreFeatures";
import DownloadSection from "@/components/DownloadSection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";
import { ProcessedRelease } from "@/lib/api";

// 服务端获取版本信息
async function getLatestRelease(): Promise<ProcessedRelease | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/releases/latest`, {
      next: { revalidate: 300 }, // 5分钟缓存
    });
    
    if (!response.ok) {
      console.error('Failed to fetch release data:', response.statusText);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching release data:', error);
    return null;
  }
}

export default async function HomePage() {
  // 在服务端获取版本信息
  const releaseData = await getLatestRelease();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ReleaseInfo />
      <CoreFeatures />
      <DownloadSection releaseData={releaseData} />
      <SupportSection />
      <Footer />
    </div>
  );
}
