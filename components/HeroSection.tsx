"use client";

import { Button } from "@/components/ui/button";
import { Play, Download, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// 主内容组件 / Main content component
function MainContent({
  currentFeature,
  features,
  isAnimated = false,
}: {
  currentFeature: number;
  features: string[];
  isAnimated?: boolean;
}) {
  return (
    <>
      {/* 主标题 / Main headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
        重新定义
        <br />
        <span className="text-blue-600">语言学习</span>
      </h1>

      {/* 动态副标题 / Dynamic subtitle */}
      <div className="mb-8">
        <p className="text-xl md:text-xl text-gray-600 mb-4 leading-relaxed">
          通过{" "}
          <span className="relative inline-block font-semibold text-blue-600 h-6 min-w-[120px] md:min-w-[140px]">
            <span
              key={isAnimated ? currentFeature : 0}
              className={`absolute left-0 top-0 whitespace-nowrap ${
                isAnimated
                  ? "animate-in fade-in-0 slide-in-from-bottom-1 duration-700 ease-out"
                  : ""
              }`}
            >
              {features[currentFeature]}
            </span>
          </span>
          ，让每一次学习都更加高效专业
        </p>
        <p className="text-lg md:text-lg text-gray-500 leading-relaxed">
          专为语言学习者打造的智能视频播放器， 结合AI技术提供沉浸式学习体验
        </p>
      </div>

      {/* CTA 按钮组 / CTA button group */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
        <Button
          size="lg"
          className={`bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base ${
            isAnimated ? "hover:scale-105 hover:shadow-xl group" : ""
          }`}
          onClick={() =>
            document
              .getElementById("demo")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Download
            className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${
              isAnimated
                ? "transition-transform duration-300 group-hover:scale-110"
                : ""
            }`}
          />
          立即下载
          <ArrowRight
            className={`w-3 h-3 sm:w-4 sm:h-4 ml-2 ${
              isAnimated
                ? "transition-transform duration-300 group-hover:translate-x-1"
                : ""
            }`}
          />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold border-2 border-gray-200 transition-all duration-300 text-sm sm:text-base ${
            isAnimated
              ? "hover:border-gray-300 hover:scale-105 hover:shadow-lg group"
              : ""
          }`}
        >
          <Play
            className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${
              isAnimated
                ? "transition-transform duration-300 group-hover:scale-110"
                : ""
            }`}
          />
          快速入门
        </Button>
      </div>

      {/* 信任指标 / Trust indicators */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
        <div className="h-3 sm:h-4 w-px bg-gray-300"></div>
        <span>✓ 开源免费</span>
        <div className="h-3 sm:h-4 w-px bg-gray-300"></div>
        <span>✓ 无广告</span>
      </div>
    </>
  );
}

// 产品演示组件 / Product demo component
function ProductDemo({ isAnimated = false }: { isAnimated?: boolean }) {
  return (
    <div className="relative">
      {/* 主设备框架 / Main device frame */}
      <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div
          className={`bg-white rounded-2xl md:rounded-3xl shadow-2xl p-2 md:p-3 ${
            isAnimated
              ? "transform hover:rotate-0 transition-transform duration-500 rotate-1 md:rotate-2"
              : ""
          }`}
        >
          {/* 软件截图展示 / Software screenshot display */}
          <div className="h-64 sm:h-72 md:h-80 lg:h-96 bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
            <img
              src="/images/hero/echolab-screenshot.png"
              alt="EchoLab 软件界面截图"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 浮动特性卡片 / Floating feature cards */}
        <div
          className={`absolute -left-4 md:-left-8 top-8 md:top-16 bg-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4 hidden sm:block ${
            isAnimated
              ? "transform -rotate-3 md:-rotate-6 hover:rotate-0 transition-transform duration-300"
              : ""
          }`}
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-6 h-6 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm md:text-lg">🎯</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs md:text-sm">
                精准控制
              </p>
              <p className="text-gray-500 text-xs">逐句播放</p>
            </div>
          </div>
        </div>

        <div
          className={`absolute -right-4 md:-right-8 bottom-8 md:bottom-16 bg-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4 hidden sm:block ${
            isAnimated
              ? "transform rotate-3 md:rotate-6 hover:rotate-0 transition-transform duration-300"
              : ""
          }`}
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-6 h-6 md:w-10 md:h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm md:text-lg">🤖</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs md:text-sm">
                AI 助手
              </p>
              <p className="text-gray-500 text-xs">智能分析</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // 轮播功能特性 / Rotating feature highlights
  const features = [
    "智能字幕同步",
    "逐句精听训练",
    "多语言支持",
    "AI 发音纠正",
  ];

  useEffect(() => {
    // 设置组件已挂载标识 / Set component mounted flag
    setMounted(true);

    // 延迟显示动画，确保 DOM 已准备好 / Delay animation to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // 自动轮播特性 / Auto-rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted, features.length]);

  // 防止 SSR 水合错误，在客户端挂载前显示静态版本 / Prevent SSR hydration errors by showing static version before client mount
  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 pt-16 md:pt-0">
        {/* 背景装饰 / Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="opacity-100">
              <MainContent
                currentFeature={currentFeature}
                features={features}
                isAnimated={false}
              />
            </div>

            <div className="opacity-100 mt-8 lg:mt-0">
              <ProductDemo isAnimated={false} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 pt-16 md:pt-0">
      {/* 背景装饰 / Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 左侧内容 / Left content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <MainContent
              currentFeature={currentFeature}
              features={features}
              isAnimated={true}
            />
          </div>

          {/* 右侧产品演示 / Right side product demo */}
          <div
            className={`transition-all duration-1000 delay-300 mt-8 lg:mt-0 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <ProductDemo isAnimated={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
