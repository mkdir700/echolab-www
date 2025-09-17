"use client";

import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProcessedRelease } from "@/lib/api";
import { VersionHeader } from "./download/VersionHeader";
import {
  PlatformSelector,
  defaultPlatforms,
  type PlatformTab,
} from "./download/PlatformSelector";
import { DownloadCards } from "./download/DownloadCards";
import { RecommendedDownload } from "./download/RecommendedDownload";
import { MobileWishlistPrompt } from "./download/MobileWishlistPrompt";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export default function DownloadSection() {
  // 使用设备检测Hook
  const { detectedInfo, isMounted } = useDeviceDetection();

  // 状态管理
  const [activeTab, setActiveTab] = useState<PlatformTab>("windows");
  const [releaseData, setReleaseData] = useState<ProcessedRelease | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  // 客户端获取版本信息的函数（支持地理位置感知）
  const fetchReleaseData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 使用地理位置感知的API端点
      const response = await fetch("/api/releases/latest-geo", {
        // 使用默认的缓存策略，允许浏览器缓存
        cache: "default",
        headers: {
          // 添加 Accept 头
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`获取版本信息失败: ${response.statusText}`);
      }

      const data = await response.json();
      setReleaseData(data);

      // 记录缓存状态和数据源（用于调试）
      const cacheStatus = response.headers.get("X-Cache");
      const geoSource = response.headers.get("X-Geo-Source");
      const geoCountry = response.headers.get("X-Geo-Country");

      console.log(`版本信息获取成功 / Release data fetched successfully:`, {
        version: data.version,
        cacheStatus: cacheStatus,
        dataSource: geoSource,
        detectedCountry: geoCountry,
      });

      // 如果使用的是中国API，在控制台显示提示
      if (geoSource === "china") {
        console.log(
          "🇨🇳 检测到中国用户，使用中国镜像源获取版本信息以提供更快的下载速度"
        );
        console.log(
          "🇨🇳 China user detected, using China mirror for faster download speeds"
        );
      }
    } catch (err) {
      console.error("Error fetching release data:", err);
      setError(
        err instanceof Error ? err.message : "获取版本信息时发生未知错误"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 根据检测到的系统自动设置activeTab
    if (isMounted) {
      if (detectedInfo.os.toLowerCase() === "windows") {
        setActiveTab("windows");
      } else if (detectedInfo.os.toLowerCase() === "macos") {
        setActiveTab("macos");
      } else if (detectedInfo.os.toLowerCase() === "linux") {
        setActiveTab("linux");
      }
    }

    // 获取版本信息
    fetchReleaseData();
  }, [isMounted, detectedInfo.os]);

  // 使用默认平台配置
  const platforms = defaultPlatforms;

  const handleDownload = (url: string, filename: string) => {
    // 这里可以添加下载统计或其他逻辑
    console.log(`Downloading ${filename}`);
    window.open(url, "_blank");
  };

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <section
        id="download"
        className="relative py-20 lg:py-32 px-6 overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/30"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-background to-purple-50/30 dark:from-blue-950/40 dark:to-purple-950/30"></div>
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/8 via-purple-400/4 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/8 via-pink-400/4 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:3s]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.08)_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight bg-gradient-to-r from-foreground via-blue-600 to-purple-600 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              立即下载 EchoLab
            </h2>
            <div className="inline-flex items-center gap-3 bg-card/90 dark:bg-card/90 backdrop-blur-xl text-blue-700 dark:text-blue-300 px-6 py-4 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 mb-8 shadow-lg">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="font-semibold">正在获取最新版本信息...</span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              请稍等，我们正在为您获取最新的版本信息
              <br />
              <span className="text-sm text-muted-foreground/70">
                Please wait while we fetch the latest version information for
                you
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 如果数据获取失败，显示错误状态
  if (error || !releaseData) {
    return (
      <section
        id="download"
        className="relative py-20 lg:py-32 px-6 overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/30"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-background to-purple-50/30 dark:from-blue-950/40 dark:to-purple-950/30"></div>
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/8 via-purple-400/4 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/8 via-pink-400/4 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:3s]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.08)_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight bg-gradient-to-r from-foreground via-blue-600 to-purple-600 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              立即下载 EchoLab
            </h2>
            <div className="inline-flex items-center gap-3 bg-card/90 dark:bg-card/90 backdrop-blur-xl text-orange-700 dark:text-orange-300 px-6 py-4 rounded-2xl border border-orange-200/50 dark:border-orange-700/50 mb-8 shadow-lg">
              <AlertCircle className="w-6 h-6" />
              <span className="font-semibold">
                {error || "版本信息暂时不可用，请稍后再试"}
              </span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              无法获取最新版本信息，请稍后刷新页面重试
              <br />
              <span className="text-sm text-muted-foreground/70">
                Unable to fetch the latest version information, please refresh
                the page and try again later
              </span>
            </p>
            <Button
              onClick={fetchReleaseData}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                重试获取
              </motion.div>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="download"
      className="relative py-20 lg:py-32 px-6 overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/30"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主要渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-background to-purple-50/30 dark:from-blue-950/40 dark:to-purple-950/30"></div>

        {/* 动态光晕效果 */}
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/8 via-purple-400/4 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/8 via-pink-400/4 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:3s]"></div>
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-gradient-to-bl from-blue-300/6 to-transparent rounded-full blur-2xl animate-pulse [animation-delay:5s]"></div>

        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.08)_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* 版本头部 */}
        <VersionHeader releaseData={releaseData} />

        {/* 移动端心愿单提示 */}
        <MobileWishlistPrompt isVisible={isMounted && detectedInfo.isMobile} />

        {/* 智能推荐下载区域 */}
        <RecommendedDownload
          releaseData={releaseData}
          platforms={platforms}
          activeTab={activeTab}
          detectedInfo={detectedInfo}
          isMounted={isMounted}
          onDownload={handleDownload}
        />

        {/* 其他平台选项 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <Button
              onClick={() => setShowAllPlatforms(!showAllPlatforms)}
              variant="outline"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/80 rounded-xl px-6 py-3 font-semibold transition-all duration-300"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {showAllPlatforms ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    收起其他平台选项
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    查看其他平台选项
                  </>
                )}
              </motion.div>
            </Button>

            {!showAllPlatforms && (
              <motion.p
                className="text-sm text-gray-500 dark:text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                支持 Windows、macOS 和 Linux 平台
              </motion.p>
            )}
          </div>

          <AnimatePresence>
            {showAllPlatforms && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* 平台选择器 */}
                <PlatformSelector
                  platforms={platforms}
                  activeTab={activeTab}
                  detectedOS={detectedInfo.os}
                  isMounted={isMounted}
                  onTabChange={setActiveTab}
                />

                {/* 当前选中平台的下载内容 */}
                <AnimatePresence mode="wait">
                  <DownloadCards
                    releaseData={releaseData}
                    platforms={platforms}
                    activeTab={activeTab}
                    detectedInfo={detectedInfo}
                    isMounted={isMounted}
                    onDownload={handleDownload}
                  />
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
