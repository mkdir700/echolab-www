"use client";

import { motion } from "framer-motion";
import { Download, CheckCircle, Zap, AlertCircle, Cpu } from "lucide-react";
import { ProcessedRelease } from "@/lib/api";

interface VersionHeaderProps {
  releaseData: ProcessedRelease;
}

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

export function VersionHeader({ releaseData }: VersionHeaderProps) {
  const releaseTypeInfo = getReleaseTypeInfo(releaseData.releaseType);

  return (
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 主标题 */}
      <motion.h2
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-[0.9]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-gray-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          立即下载
        </span>
        <br />
        <span className="text-foreground">EchoLab</span>
      </motion.h2>

      {/* 副标题 */}
      <motion.p
        className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        选择适合您系统的版本，开始高效的语言学习之旅
      </motion.p>

      {/* 版本信息卡片 */}
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 版本标签旗帜 */}
        <motion.div
          className={`absolute -top-3 -right-3 z-10 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg ${releaseTypeInfo.color} ${releaseTypeInfo.darkColor} transform rotate-12`}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 12 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: 0.8,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 15,
            transition: { duration: 0.2 },
          }}
        >
          <div className="flex items-center gap-1">
            {(() => {
              const IconComponent = releaseTypeInfo.icon;
              return <IconComponent className="w-3 h-3" />;
            })()}
            {releaseTypeInfo.label}
          </div>
        </motion.div>

        {/* 主版本信息容器 */}
        <div className="bg-card/90 dark:bg-card/90 backdrop-blur-2xl rounded-3xl px-8 py-6 shadow-2xl shadow-foreground/5 dark:shadow-foreground/10 border border-border/50 hover:shadow-2xl hover:shadow-foreground/10 dark:hover:shadow-foreground/20 transition-all duration-500">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground font-medium mb-1">
                  最新版本 / Latest Version
                </div>
                <div className="text-2xl font-bold text-foreground tracking-tight">
                  {releaseData.version}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
