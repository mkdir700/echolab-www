"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950 pt-20 pb-32">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="block md:inline">重新定义</span>
              <span className="text-blue-500 dark:text-blue-400">语言学习</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              专为语言学习者打造的智能视频播放器
              <br />
              结合 AI 技术提供沉浸式学习体验
            </p>

            <div className="flex flex-row gap-3 justify-center items-center">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-medium rounded-lg flex-1 sm:flex-initial"
                onClick={() =>
                  document
                    .getElementById("download")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                立即下载
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex-1 sm:flex-initial"
                onClick={() =>
                  window.open(
                    "https://docs.echoplayer.cc",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                快速入门
              </Button>
            </div>

            <div className="mt-16 relative max-w-4xl mx-auto hidden md:block">
              <div className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 rounded-3xl p-8 shadow-2xl">
                <img
                  src="/images/hero/player.png"
                  alt="EchoPlayer 软件界面截图"
                  className="w-full h-auto rounded-2xl shadow-xl dark:hidden"
                />
                <img
                  src="/images/hero/player-dark.png"
                  alt="EchoPlayer 软件界面截图"
                  className="w-full h-auto rounded-2xl shadow-xl hidden dark:block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950 pt-20 pb-32">
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center space-y-8 animate-in fade-in duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            <span className="block md:inline">重新定义</span>
            <span className="text-blue-500 dark:text-blue-400">语言学习</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            专为语言学习者打造的智能视频播放器
            <br />
            结合 AI 技术提供沉浸式学习体验
          </p>

          <div className="flex flex-row gap-3 justify-center items-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 flex-1 sm:flex-initial"
              onClick={() =>
                document
                  .getElementById("download")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              立即下载
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex-1 sm:flex-initial"
              onClick={() =>
                window.open(
                  "https://docs.echoplayer.cc",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              快速入门
            </Button>
          </div>

          <div className="mt-16 relative max-w-4xl mx-auto hidden md:block">
            <div className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 rounded-3xl p-8 shadow-2xl">
              <img
                src="/images/hero/player.png"
                alt="EchoPlayer 软件界面截图"
                className="w-full h-auto rounded-2xl shadow-xl dark:hidden"
              />
              <img
                src="/images/hero/player-dark.png"
                alt="EchoPlayer 软件界面截图"
                className="w-full h-auto rounded-2xl shadow-xl hidden dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
