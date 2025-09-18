"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { ProcessedRelease } from "@/lib/api";
import { Platform, PlatformTab } from "./PlatformSelector";

interface RecommendedDownloadProps {
  releaseData: ProcessedRelease;
  platforms: Platform[];
  activeTab: PlatformTab;
  detectedInfo: {
    os: string;
    arch: string;
    deviceType: string;
    isMobile: boolean;
  };
  isMounted: boolean;
  onDownload: (url: string, filename: string) => void;
}

export function RecommendedDownload({
  releaseData,
  platforms,
  activeTab,
  detectedInfo,
  isMounted,
  onDownload,
}: RecommendedDownloadProps) {
  // 获取推荐的下载选项
  const getRecommendedDownload = () => {
    if (!releaseData || !isMounted) return null;

    const platformKey = activeTab as keyof typeof releaseData.platforms;
    const platformChannels = releaseData.platforms[platformKey];

    if (!platformChannels || platformChannels.length === 0) return null;

    // 查找主要渠道
    const primaryChannel =
      platformChannels.find((channel) => channel.primary) ||
      platformChannels[0];

    // 查找匹配用户架构的变体
    const matchingVariant = primaryChannel.variants.find((variant) => {
      const isArchMatch =
        variant.arch === detectedInfo.arch ||
        variant.arch.startsWith(detectedInfo.arch + "-");
      return isArchMatch;
    });

    // 如果没有匹配的架构，返回第一个变体
    const recommendedVariant = matchingVariant || primaryChannel.variants[0];

    return {
      channel: primaryChannel,
      variant: recommendedVariant,
      platform: platforms.find((p) => p.id === activeTab)!,
    };
  };

  const recommendedDownload = getRecommendedDownload();

  if (!recommendedDownload || !isMounted || detectedInfo.isMobile) {
    return null;
  }

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          为您推荐
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          基于您的系统自动推荐最适合的版本
        </p>
      </div>

      <motion.div
        className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <recommendedDownload.platform.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                {recommendedDownload.platform.title} -{" "}
                {recommendedDownload.variant.archName}
              </h4>
            </div>
            {/* 只有当有有效的文件大小时才显示 */}
            {recommendedDownload.variant.size !== "未知大小" && (
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                文件大小：{recommendedDownload.variant.size}
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={() =>
            onDownload(
              recommendedDownload.variant.url,
              `EchoLab-${releaseData.version}-${recommendedDownload.variant.arch}${recommendedDownload.platform.ext}`
            )
          }
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl py-4 font-semibold text-lg transition-all duration-300 group shadow-lg shadow-blue-600/25"
        >
          <motion.div
            className="flex items-center justify-center gap-3"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <Download className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            立即下载
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  );
}
