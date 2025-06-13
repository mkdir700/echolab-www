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

// 客户端获取版本信息的函数（直接从 GitHub API 获取）
// Client-side function to fetch release information (directly from GitHub API)
async function getLatestRelease(): Promise<ProcessedRelease | null> {
  try {
    // 直接从 GitHub API 获取最新版本信息
    // Fetch latest release directly from GitHub API
    const response = await fetch(
      "https://api.github.com/repos/echolab/echolab-app/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "EchoLab-Website",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch release data:", response.statusText);
      return null;
    }

    const release = await response.json();

    // 简单处理 GitHub 数据为我们需要的格式
    // Simple processing of GitHub data to our required format
    return {
      version: release.tag_name,
      name: release.name || release.tag_name,
      description: release.body || "",
      releaseType: release.prerelease ? "beta" : "stable",
      publishedAt: release.published_at,
      htmlUrl: release.html_url,
      platforms: {
        windows: [],
        macos: [],
        linux: [],
      },
    };
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
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
