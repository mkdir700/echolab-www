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
    <div className="space-y-8">
      {/* 主标题 / Main headline */}
      <div className="space-y-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[0.9] tracking-tight">
          重新定义
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            语言学习
          </span>
        </h1>
      </div>

      {/* 动态副标题 / Dynamic subtitle */}
      <div className="space-y-6">
        <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-medium">
          通过{" "}
          <span className="relative inline-block font-bold h-10 min-w-[160px] md:min-w-[200px] overflow-hidden">
            {features[currentFeature].split("").map((char, index) => (
              <span
                key={`${currentFeature}-${index}`}
                className={`inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
                  isAnimated
                    ? "animate-in slide-in-from-bottom-2 fade-in-0 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    : ""
                }`}
                style={{
                  animationDelay: isAnimated ? `${index * 50}ms` : "0ms",
                  animationFillMode: "both",
                }}
              >
                {char}
              </span>
            ))}
          </span>
          <br />
          让每一次学习都更加高效专业
        </p>
        <p className="text-xl md:text-xl text-muted-foreground/80 leading-relaxed font-normal max-w-2xl">
          专为语言学习者打造的智能视频播放器，结合 AI 技术提供沉浸式学习体验
        </p>
      </div>

      {/* CTA 按钮组 / CTA button group */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Button
          size="lg"
          className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-3xl font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl shadow-blue-500/25 text-base sm:text-lg border-0 ${
            isAnimated
              ? "hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40 group active:scale-[0.98]"
              : ""
          }`}
          onClick={() =>
            document
              .getElementById("download")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Download
            className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 ${
              isAnimated
                ? "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                : ""
            }`}
          />
          立即下载
          <ArrowRight
            className={`w-4 h-4 sm:w-5 sm:h-5 ml-3 ${
              isAnimated
                ? "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                : ""
            }`}
          />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={`px-8 sm:px-10 py-4 sm:py-5 rounded-3xl font-semibold border-2 border-border bg-card/80 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-base sm:text-lg hover:bg-accent hover:border-border/80 ${
            isAnimated
              ? "hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/10 group active:scale-[0.98]"
              : ""
          }`}
        >
          <Play
            className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 ${
              isAnimated
                ? "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                : ""
            }`}
          />
          快速入门
        </Button>
      </div>

      {/* 信任指标 / Trust indicators */}
      <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm sm:text-base text-muted-foreground font-medium">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>开源免费</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>无广告</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>隐私保护</span>
        </div>
      </div>
    </div>
  );
}

// 产品演示组件 / Product demo component
function ProductDemo({ isAnimated = false }: { isAnimated?: boolean }) {
  return (
    <div className="relative">
      {/* 主设备框架 / Main device frame */}
      <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div
          className={`bg-card/90 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-foreground/10 p-3 md:p-4 border border-border/50 ${
            isAnimated
              ? "transform hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rotate-1 md:rotate-2 hover:shadow-2xl hover:shadow-foreground/20"
              : ""
          }`}
        >
          {/* 软件截图展示 / Software screenshot display */}
          <div className="h-64 sm:h-72 md:h-80 lg:h-96 bg-gradient-to-br from-muted/50 to-muted rounded-[2rem] md:rounded-[2.5rem] shadow-inner overflow-hidden ring-1 ring-border/50">
            <img
              src="/images/hero/echolab-screenshot.png"
              alt="EchoLab 软件界面截图"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 浮动特性卡片 / Floating feature cards */}
        <div
          className={`absolute -left-4 md:-left-8 top-8 md:top-16 bg-card/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-2xl shadow-foreground/10 p-3 md:p-5 hidden sm:block border border-border/50 ${
            isAnimated
              ? "transform -rotate-3 md:-rotate-6 hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-foreground/20 hover:scale-105"
              : ""
          }`}
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <span className="text-white text-lg md:text-2xl">🎯</span>
            </div>
            <div>
              <p className="font-bold text-card-foreground text-sm md:text-base">
                精准控制
              </p>
              <p className="text-muted-foreground text-xs md:text-sm font-medium">
                逐句播放
              </p>
            </div>
          </div>
        </div>

        <div
          className={`absolute -right-4 md:-right-8 bottom-8 md:bottom-16 bg-card/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-2xl shadow-foreground/10 p-3 md:p-5 hidden sm:block border border-border/50 ${
            isAnimated
              ? "transform rotate-3 md:rotate-6 hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-foreground/20 hover:scale-105"
              : ""
          }`}
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white text-lg md:text-2xl">🤖</span>
            </div>
            <div>
              <p className="font-bold text-card-foreground text-sm md:text-base">
                AI 助手
              </p>
              <p className="text-muted-foreground text-xs md:text-sm font-medium">
                智能分析
              </p>
            </div>
          </div>
        </div>

        {/* 额外的装饰元素 / Additional decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl opacity-60 blur-sm hidden lg:block"></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl opacity-40 blur-md hidden lg:block"></div>
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
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // 自动轮播特性 / Auto-rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted, features.length]);

  // 防止 SSR 水合错误，在客户端挂载前显示静态版本 / Prevent SSR hydration errors by showing static version before client mount
  if (!mounted) {
    return (
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/30 pt-16 md:pt-0"
      >
        {/* 背景装饰 / Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 主要渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-background to-purple-50/30 dark:from-blue-950/40 dark:to-purple-950/30"></div>

          {/* 动态光晕效果 */}
          <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/10 via-purple-400/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-400/10 via-pink-400/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-blue-300/8 to-transparent rounded-full blur-2xl"></div>

          {/* 网格背景 */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.1)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="opacity-100">
              <MainContent
                currentFeature={currentFeature}
                features={features}
                isAnimated={false}
              />
            </div>

            <div className="opacity-100 mt-12 lg:mt-0">
              <ProductDemo isAnimated={false} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/30 pt-16 md:pt-0"
    >
      {/* 背景装饰 / Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主要渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-background to-purple-50/30 dark:from-blue-950/40 dark:to-purple-950/30"></div>

        {/* 动态光晕效果 */}
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/10 via-purple-400/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-400/10 via-pink-400/5 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-blue-300/8 to-transparent rounded-full blur-2xl animate-pulse [animation-delay:4s]"></div>

        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.1)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 左侧内容 / Left content */}
          <div
            className={`transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
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
            className={`transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 mt-12 lg:mt-0 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <ProductDemo isAnimated={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
