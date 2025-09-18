"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Smartphone, ArrowRight } from "lucide-react";

interface MobileWishlistPromptProps {
  isVisible: boolean;
}

export function MobileWishlistPrompt({ isVisible }: MobileWishlistPromptProps) {
  const handleWishlistClick = () => {
    // 跳转到腾讯问卷
    window.open("https://wj.qq.com/s2/22783147/bad0/", "_blank");
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-2xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1">
          <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
            EchoLab 目前专注于桌面端体验，移动端版本正在规划中。
          </p>
        </div>
      </div>

      <Button
        onClick={handleWishlistClick}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white rounded-xl py-4 font-semibold text-lg transition-all duration-300 group shadow-lg shadow-purple-600/25"
      >
        <motion.div
          className="flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            ❤️
          </motion.div>
          加入心愿单
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.div>
      </Button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
        点击将跳转到问卷页面，帮助我们了解您的需求
      </p>
    </motion.div>
  );
}
