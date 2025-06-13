import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyVideoLearning from "../components/WhyVideoLearning";
import CoreFeatures from "@/components/CoreFeatures";
import DownloadSection from "@/components/DownloadSection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// 客户端组件 - 每次访问时动态获取数据
// Client component - fetch data dynamically on each visit
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <HeroSection />
      <WhyVideoLearning />
      <CoreFeatures />
      <DownloadSection />
      <SupportSection />
      <Footer />

      {/* 返回顶部按钮 / Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
}
