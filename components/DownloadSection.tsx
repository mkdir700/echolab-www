"use client";

import { Button } from "@/components/ui/button";
import {
  Download,
  Monitor,
  Apple,
  Smartphone,
  GitBranch,
  LucideIcon,
  Cpu,
  Zap,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProcessedRelease } from "@/lib/api";

// Tab状态类型
type PlatformTab = "windows" | "macos" | "linux";

// DownloadSection组件的Props类型
interface DownloadSectionProps {
  releaseData: ProcessedRelease | null;
}

// 检测用户操作系统和架构
const detectOSAndArch = () => {
  if (typeof window === "undefined") return { os: "Unknown", arch: "Unknown" };

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;

  let os = "Unknown";
  let arch = "Unknown";

  // 检测操作系统
  if (userAgent.indexOf("Win") !== -1) {
    os = "Windows";
    // Windows 架构检测
    if (userAgent.indexOf("Win64") !== -1 || userAgent.indexOf("x64") !== -1) {
      arch = "x64";
    } else if (userAgent.indexOf("AMD64") !== -1) {
      arch = "x64";
    } else if (userAgent.indexOf("ARM64") !== -1) {
      arch = "arm64";
    } else {
      arch = "x64"; // 默认假设是64位
    }
  } else if (userAgent.indexOf("Mac") !== -1) {
    os = "macOS";
    // macOS 架构检测
    if (userAgent.indexOf("Intel") !== -1) {
      arch = "intel";
    } else if (
      userAgent.indexOf("ARM64") !== -1 ||
      platform.indexOf("arm") !== -1
    ) {
      arch = "apple-silicon";
    } else {
      // 通过 navigator.userAgentData 进一步检测 (Chrome 90+)
      // @ts-expect-error - userAgentData 是实验性 API
      if (navigator.userAgentData?.platform === "macOS") {
        // 默认假设是 Apple Silicon (M1/M2/M3)，因为新设备更常见
        arch = "apple-silicon";
      } else {
        arch = "universal"; // 通用版本
      }
    }
  } else if (userAgent.indexOf("Linux") !== -1) {
    os = "Linux";
    if (platform.indexOf("x86_64") !== -1 || platform.indexOf("amd64") !== -1) {
      arch = "x64";
    } else if (platform.indexOf("arm") !== -1) {
      arch = "arm64";
    } else {
      arch = "x64";
    }
  }

  return { os, arch };
};

// 平台信息接口
interface Platform {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  ext: string;
}

// 版本类型标签映射 / Release type label mapping
const getReleaseTypeInfo = (type: ProcessedRelease["releaseType"]) => {
  switch (type) {
    case "stable":
      return {
        label: "正式版",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        darkColor:
          "dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30",
        icon: CheckCircle,
      };
    case "beta":
      return {
        label: "Beta 版",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        darkColor:
          "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30",
        icon: Zap,
      };
    case "alpha":
      return {
        label: "Alpha 版",
        color: "bg-orange-50 text-orange-700 border-orange-200",
        darkColor:
          "dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30",
        icon: AlertCircle,
      };
    case "rc":
      return {
        label: "RC 版",
        color: "bg-purple-50 text-purple-700 border-purple-200",
        darkColor:
          "dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30",
        icon: Cpu,
      };
    default:
      return {
        label: "未知版本",
        color: "bg-gray-50 text-gray-700 border-gray-200",
        darkColor:
          "dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/30",
        icon: AlertCircle,
      };
  }
};

// 后备数据，当 GitHub API 失败时使用
const fallbackRelease: ProcessedRelease = {
  version: "v1.0.0",
  name: "EchoLab v1.0.0",
  description: "首个稳定版本发布，包含完整的视频播放和字幕功能。",
  releaseType: "stable",
  publishedAt: new Date().toISOString(),
  htmlUrl: "#",
  platforms: {
    windows: [
      {
        name: "GitHub Release",
        primary: true,
        desc: "官方发布渠道",
        variants: [
          {
            arch: "x64",
            archName: "x64 (推荐)",
            size: "45.2 MB",
            url: "#",
            recommended: true,
            downloadCount: 1024,
          },
          {
            arch: "arm64",
            archName: "ARM64",
            size: "42.8 MB",
            url: "#",
            recommended: false,
            downloadCount: 256,
          },
        ],
      },
    ],
    macos: [
      {
        name: "GitHub Release",
        primary: true,
        desc: "官方发布渠道",
        variants: [
          {
            arch: "apple-silicon",
            archName: "Apple Silicon (M1/M2/M3)",
            size: "48.5 MB",
            url: "#",
            recommended: true,
            downloadCount: 512,
          },
          {
            arch: "intel",
            archName: "Intel x64",
            size: "52.8 MB",
            url: "#",
            recommended: false,
            downloadCount: 128,
          },
        ],
      },
    ],
    linux: [
      {
        name: "GitHub Release",
        primary: true,
        desc: "官方发布渠道",
        variants: [
          {
            arch: "x64",
            archName: "x64 (推荐)",
            size: "48.1 MB",
            url: "#",
            recommended: true,
            downloadCount: 256,
          },
          {
            arch: "arm64",
            archName: "ARM64",
            size: "45.3 MB",
            url: "#",
            recommended: false,
            downloadCount: 64,
          },
        ],
      },
    ],
  },
};

export default function DownloadSection({ releaseData }: DownloadSectionProps) {
  const [detectedInfo, setDetectedInfo] = useState<{
    os: string;
    arch: string;
  }>({ os: "Unknown", arch: "Unknown" });
  const [activeTab, setActiveTab] = useState<PlatformTab>("windows");
  const [isMounted, setIsMounted] = useState(false);

  // 使用服务端传递的数据或后备数据
  const currentRelease = releaseData || fallbackRelease;

  useEffect(() => {
    // 标记组件已挂载，避免水合错误
    // Mark component as mounted to avoid hydration errors
    setIsMounted(true);

    const info = detectOSAndArch();
    setDetectedInfo(info);

    // 根据检测到的系统自动设置activeTab
    if (info.os.toLowerCase() === "windows") {
      setActiveTab("windows");
    } else if (info.os.toLowerCase() === "macos") {
      setActiveTab("macos");
    } else if (info.os.toLowerCase() === "linux") {
      setActiveTab("linux");
    }
  }, []);

  // 平台配置
  const platforms: Platform[] = [
    {
      id: "windows",
      icon: Monitor,
      title: "Windows",
      desc: "Windows 10/11",
      ext: ".exe",
    },
    {
      id: "macos",
      icon: Apple,
      title: "macOS",
      desc: "macOS 10.15+",
      ext: ".dmg",
    },
    {
      id: "linux",
      icon: Smartphone,
      title: "Linux",
      desc: "Ubuntu 20.04+ 或其他主流发行版",
      ext: ".AppImage",
    },
  ];
  const handleDownload = (url: string, filename: string) => {
    // 这里可以添加下载统计或其他逻辑
    console.log(`Downloading ${filename}`);
    window.open(url, "_blank");
  };

  // 如果服务端数据获取失败，显示错误状态 / Show error state if server data fetch fails
  if (!releaseData) {
    return (
      <section
        id="download"
        className="py-20 lg:py-32 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30 overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-gray-100 dark:via-blue-300 dark:to-gray-100 bg-clip-text text-transparent">
              立即下载 EchoLab
            </h2>
            <div className="inline-flex items-center gap-3 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-6 py-4 rounded-2xl border border-orange-200 dark:border-orange-700 mb-8">
              <AlertCircle className="w-6 h-6" />
              <span className="font-semibold">
                版本信息暂时不可用，使用默认版本信息
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              我们正在使用备用的版本信息，部分下载链接可能暂时不可用
              <br />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                We are using backup version information, some download links may
                be temporarily unavailable
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  const finalReleaseData = currentRelease;

  const releaseTypeInfo = getReleaseTypeInfo(finalReleaseData.releaseType);

  return (
    <section
      id="download"
      className="py-20 lg:py-32 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        {/* 头部标题 / Header title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-gray-100 dark:via-blue-300 dark:to-gray-100 bg-clip-text text-transparent">
            立即下载 EchoLab
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            选择适合您系统的版本，开始高效的语言学习之旅
            <br />
            <span className="text-base text-gray-500 dark:text-gray-400">
              Choose the right version for your system and start your efficient
              language learning journey
            </span>
          </p>

          {/* 版本信息 / Version info */}
          <motion.div
            className="inline-flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                最新版本：
              </span>
              <span className="text-gray-900 dark:text-white font-bold text-lg">
                {finalReleaseData.version}
              </span>
            </div>
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${releaseTypeInfo.color} ${releaseTypeInfo.darkColor}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
            >
              {(() => {
                const IconComponent = releaseTypeInfo.icon;
                return <IconComponent className="w-4 h-4" />;
              })()}
              {releaseTypeInfo.label}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 平台选择Tab / Platform selection tabs */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-1.5 rounded-[1.25rem] shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-200/50 dark:border-gray-700/50">
              {/* 动画背景滑块 / Animated background slider */}
              <motion.div
                className="absolute bg-blue-600 dark:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20"
                layoutId="activeTab"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                style={{
                  width: `${100 / platforms.length}%`,
                  height: "calc(100% - 12px)",
                  top: "6px",
                  left: `${(platforms.findIndex((p) => p.id === activeTab) * 100) / platforms.length}%`,
                }}
              />

              {platforms.map((platform) => {
                const tabId = platform.id as PlatformTab;
                const isActive = activeTab === tabId;
                // 只有在客户端挂载后才显示检测到的系统指示器
                // Only show detected system indicator after client mount
                const isDetected =
                  isMounted &&
                  platform.id.toLowerCase() === detectedInfo.os.toLowerCase();

                return (
                  <motion.button
                    key={platform.id}
                    onClick={() => setActiveTab(tabId)}
                    className={`relative flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-semibold z-10 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <platform.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="whitespace-nowrap text-sm sm:text-base">
                      {platform.title}
                    </span>
                    {isDetected && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full shadow-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 当前选中平台的下载内容 */}
          <AnimatePresence mode="wait">
            {(() => {
              const currentPlatform = platforms.find((p) => p.id === activeTab);
              if (!currentPlatform) return null;

              const platformChannels =
                finalReleaseData.platforms[
                  activeTab as keyof typeof finalReleaseData.platforms
                ];
              if (!platformChannels || platformChannels.length === 0) {
                return (
                  <motion.div
                    key={activeTab}
                    className="max-w-4xl mx-auto text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-[2rem] p-12 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20">
                      <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        暂无下载文件
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {currentPlatform.title}{" "}
                        平台的版本正在准备中，请稍后再试或选择其他平台
                        <br />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          The version for {currentPlatform.title} platform is
                          being prepared
                        </span>
                      </p>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={activeTab}
                  className="max-w-5xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  {/* 平台信息卡片 / Platform info card */}
                  <motion.div
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-[2rem] p-8 lg:p-10 mb-8 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <motion.div
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          duration: 0.2,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <currentPlatform.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <div className="flex-1">
                        <motion.h3
                          className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          {currentPlatform.title}
                        </motion.h3>
                        <motion.p
                          className="text-gray-600 dark:text-gray-300 text-lg mb-1"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          {currentPlatform.desc}
                        </motion.p>
                        <motion.p
                          className="text-sm text-gray-500 dark:text-gray-400"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          文件格式：{currentPlatform.ext} / File format:{" "}
                          {currentPlatform.ext}
                        </motion.p>
                      </div>
                    </motion.div>

                    {/* 下载渠道 / Download channels */}
                    <motion.div
                      className="space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      {platformChannels.map((channel, channelIdx) => (
                        <motion.div
                          key={channelIdx}
                          className="bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-[1.5rem] p-6 lg:p-8"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1 + channelIdx * 0.1,
                          }}
                        >
                          <motion.div
                            className="flex items-center gap-4 mb-6"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.2 + channelIdx * 0.1,
                            }}
                          >
                            <motion.div
                              className="w-12 h-12 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center shadow-sm"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <GitBranch className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                {channel.name}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {channel.desc}
                              </p>
                            </div>
                            {channel.primary && (
                              <motion.span
                                className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl text-sm font-semibold"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  delay: 0.3 + channelIdx * 0.1,
                                }}
                              >
                                推荐渠道
                              </motion.span>
                            )}
                          </motion.div>
                          {/* 架构变体 / Architecture variants */}
                          <div className="grid gap-3">
                            {channel.variants.map((variant, variantIdx) => {
                              // 只有当前平台和架构都匹配时才推荐 / Only recommend when both platform and architecture match
                              // 只有在客户端挂载后才进行推荐计算，避免水合错误
                              // Only calculate recommendations after client mount to avoid hydration errors
                              const isPlatformMatch =
                                isMounted &&
                                activeTab.toLowerCase() ===
                                  detectedInfo.os.toLowerCase();
                              const isArchMatch =
                                isMounted && variant.arch === detectedInfo.arch;
                              const isRecommended =
                                isPlatformMatch && isArchMatch;

                              return (
                                <motion.div
                                  key={variantIdx}
                                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-[1.25rem] border transition-all duration-300 ${
                                    isRecommended
                                      ? "bg-blue-50/80 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 shadow-sm"
                                      : "bg-white/60 dark:bg-gray-700/40 border-gray-200/60 dark:border-gray-600/60 hover:bg-white/80 dark:hover:bg-gray-700/60 hover:border-gray-300/60 dark:hover:border-gray-500/60"
                                  }`}
                                  initial={{
                                    y: 20,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    y: 0,
                                    opacity: 1,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.1 + variantIdx * 0.05,
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                  whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.2 },
                                  }}
                                >
                                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    <motion.div
                                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                        isRecommended
                                          ? "bg-blue-100 dark:bg-blue-900/30 shadow-sm"
                                          : "bg-gray-100 dark:bg-gray-600"
                                      }`}
                                      whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 },
                                      }}
                                    >
                                      <Cpu
                                        className={`w-7 h-7 ${isRecommended ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`}
                                      />
                                    </motion.div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-gray-900 dark:text-white font-semibold text-lg">
                                          {variant.archName}
                                        </span>
                                        {isRecommended && (
                                          <motion.div
                                            className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-lg text-xs font-semibold"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                              type: "spring",
                                              delay: 0.2 + variantIdx * 0.05,
                                            }}
                                          >
                                            <CheckCircle className="w-3 h-3" />
                                            推荐
                                          </motion.div>
                                        )}
                                      </div>
                                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                        <span className="flex items-center gap-1">
                                          <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                                          文件大小：{variant.size}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                                          下载次数：
                                          {variant.downloadCount.toLocaleString()}
                                        </span>
                                        {isMounted &&
                                          isPlatformMatch &&
                                          variant.arch ===
                                            detectedInfo.arch && (
                                            <motion.span
                                              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium"
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{
                                                type: "spring",
                                                delay: 0.3 + variantIdx * 0.05,
                                              }}
                                            >
                                              <CheckCircle className="w-3 h-3" />
                                              匹配您的系统
                                            </motion.span>
                                          )}
                                      </div>
                                    </div>
                                  </div>

                                  <motion.div
                                    className="flex gap-2 sm:flex-col sm:gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Button
                                      onClick={() =>
                                        handleDownload(
                                          variant.url,
                                          `EchoLab-${currentRelease.version}-${variant.arch}${currentPlatform.ext}`
                                        )
                                      }
                                      className={`${
                                        isRecommended
                                          ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                          : "bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white"
                                      } rounded-[1rem] px-6 py-3 font-semibold transition-all duration-300 group border-0`}
                                    >
                                      <motion.div
                                        className="flex items-center gap-2"
                                        whileHover={{ x: 1 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Download className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                        立即下载
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                      </motion.div>
                                    </Button>
                                  </motion.div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
