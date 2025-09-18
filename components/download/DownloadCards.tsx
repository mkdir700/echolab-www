"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download,
  ArrowRight,
  CheckCircle,
  Cpu,
  GitBranch,
  AlertCircle,
  Package,
  FileArchive,
} from "lucide-react";
import { ProcessedRelease } from "@/lib/api";
import { Platform, PlatformTab } from "./PlatformSelector";

interface DownloadCardsProps {
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

export function DownloadCards({
  releaseData,
  platforms,
  activeTab,
  detectedInfo,
  isMounted,
  onDownload,
}: DownloadCardsProps) {
  const currentPlatform = platforms.find((p) => p.id === activeTab);
  if (!currentPlatform) return null;

  const platformChannels =
    releaseData.platforms[activeTab as keyof typeof releaseData.platforms];

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
              The version for {currentPlatform.title} platform is being prepared
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
      {/* 平台信息卡片 */}
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

        {/* 下载渠道 */}
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
                  {channel.name.includes("Setup") || channel.name.includes("安装包") ? (
                    <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  ) : channel.name.includes("Portable") || channel.name.includes("便携版") ? (
                    <FileArchive className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <GitBranch className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  )}
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

              {/* 架构变体 */}
              <div className="grid gap-3">
                {channel.variants.map((variant, variantIdx) => {
                  // 只有当前平台和架构都匹配时才推荐
                  const isPlatformMatch =
                    isMounted &&
                    activeTab.toLowerCase() === detectedInfo.os.toLowerCase();
                  const isArchMatch =
                    isMounted &&
                    (variant.arch === detectedInfo.arch ||
                      variant.arch.startsWith(detectedInfo.arch + "-"));
                  const isRecommended = isPlatformMatch && isArchMatch;

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
                          {/* 根据包类型显示不同图标 */}
                          {variant.packageType === 'setup' ? (
                            <Package
                              className={`w-7 h-7 ${
                                isRecommended
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-600 dark:text-gray-300"
                              }`}
                            />
                          ) : variant.packageType === 'portable' ? (
                            <FileArchive
                              className={`w-7 h-7 ${
                                isRecommended
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-gray-600 dark:text-gray-300"
                              }`}
                            />
                          ) : (
                            <Cpu
                              className={`w-7 h-7 ${
                                isRecommended
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-600 dark:text-gray-300"
                              }`}
                            />
                          )}
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
                            {/* 只有当文件大小不是"未知大小"时才显示 */}
                            {variant.size !== "未知大小" && (
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                                文件大小：{variant.size}
                              </span>
                            )}

                            {/* 包类型标识 */}
                            {variant.packageType && (
                              <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                                variant.packageType === 'setup'
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                  : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                              }`}>
                                <span className="w-1 h-1 bg-current rounded-full"></span>
                                {variant.packageType === 'setup' ? '安装包' : '便携版'}
                              </span>
                            )}

                            {isMounted &&
                              isPlatformMatch &&
                              (variant.arch === detectedInfo.arch ||
                                variant.arch.startsWith(
                                  detectedInfo.arch + "-"
                                )) && (
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
                            onDownload(
                              variant.url,
                              `EchoLab-${releaseData.version}-${variant.arch}${currentPlatform.ext}`
                            )
                          }
                          className={`${
                            isRecommended
                              ? variant.packageType === 'setup'
                                ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                : "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                              : variant.packageType === 'portable'
                              ? "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
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
}
