"use client";

import { motion } from "framer-motion";
import { Monitor, Apple, Smartphone, LucideIcon } from "lucide-react";

export type PlatformTab = "windows" | "macos" | "linux";

export interface Platform {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  ext: string;
}

interface PlatformSelectorProps {
  platforms: Platform[];
  activeTab: PlatformTab;
  detectedOS: string;
  isMounted: boolean;
  onTabChange: (tab: PlatformTab) => void;
}

// 预定义的平台配置
export const defaultPlatforms: Platform[] = [
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

export function PlatformSelector({
  platforms,
  activeTab,
  detectedOS,
  isMounted,
  onTabChange,
}: PlatformSelectorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative inline-flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-1 rounded-[1.25rem] shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-200/50 dark:border-gray-700/50">
        {/* 动画背景滑块 */}
        <motion.div
          className="absolute bg-blue-600 dark:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20"
          layoutId="activeTab"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{
            width: `calc(${100 / platforms.length}% - 4px)`,
            height: "calc(100% - 8px)",
            top: "4px",
            left: `calc(${(platforms.findIndex((p) => p.id === activeTab) * 100) / platforms.length}% + 2px)`,
          }}
        />

        {platforms.map((platform) => {
          const tabId = platform.id as PlatformTab;
          const isActive = activeTab === tabId;
          // 只有在客户端挂载后才显示检测到的系统指示器
          const isDetected =
            isMounted && platform.id.toLowerCase() === detectedOS.toLowerCase();

          return (
            <motion.button
              key={platform.id}
              onClick={() => onTabChange(tabId)}
              className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-300 font-semibold z-10 min-w-0 flex-1 justify-center ${
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
                <platform.icon className="w-5 h-5 flex-shrink-0" />
              </motion.div>
              <span className="whitespace-nowrap text-sm sm:text-base font-medium">
                {platform.title}
              </span>
              {isDetected && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
