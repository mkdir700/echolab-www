"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CoreFeatures from "@/components/CoreFeatures";
import DownloadSection from "@/components/DownloadSection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ProcessedRelease } from "@/lib/api";

// 客户端获取版本信息的函数
// Client-side function to fetch release information
async function getLatestRelease(): Promise<ProcessedRelease | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/releases/latest`);

    if (!response.ok) {
      console.error("Failed to fetch release data:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching release data:", error);
    return null;
  }
}

export default function HomePage() {
  // 版本信息状态管理
  // State management for release information
  const [releaseData, setReleaseData] = useState<ProcessedRelease | null>(null);

  // 组件挂载时获取版本信息
  // Fetch release information when component mounts
  useEffect(() => {
    getLatestRelease().then(setReleaseData);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CoreFeatures />
      <DownloadSection releaseData={releaseData} />
      <SupportSection />
      <Footer />

      {/* 返回顶部按钮 / Scroll to top button */}
      <ScrollToTopButton threshold={300} />
    </div>
  );
}
