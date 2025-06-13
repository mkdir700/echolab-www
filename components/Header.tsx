"use client";

import { Play, Github } from "lucide-react";
import { SimpleThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  // 平滑滚动到指定锚点的函数，带有缓动动画
  // Smooth scroll to specified anchor function with easing animation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Header的高度，用于偏移 / Header height for offset
      const elementPosition = element.offsetTop - headerHeight;
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = 800; // 动画持续时间 / Animation duration
      let start: number | null = null;

      // 缓动函数 - easeInOutCubic / Easing function - easeInOutCubic
      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      // 动画函数 / Animation function
      const animateScroll = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = timestamp - start;
        const progressPercentage = Math.min(progress / duration, 1);
        const easedProgress = easeInOutCubic(progressPercentage);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  // 处理锚点点击事件
  // Handle anchor click events
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  // 处理Logo点击回到顶部
  // Handle logo click to scroll to top
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 处理GitHub链接点击
  // Handle GitHub link click
  const handleGithubClick = () => {
    window.open(
      "https://github.com/mkdir700/echolab",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 group cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Play className="w-4 h-4 text-white fill-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-blue-600">
            EchoLab
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <nav className="hidden md:flex items-center space-x-2">
            <a
              href="#features"
              onClick={(e) => handleAnchorClick(e, "features")}
              className="group relative px-4 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 font-medium cursor-pointer backdrop-blur-xl border border-transparent hover:border-border/50"
            >
              功能
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="#download"
              onClick={(e) => handleAnchorClick(e, "download")}
              className="group relative px-4 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 font-medium cursor-pointer backdrop-blur-xl border border-transparent hover:border-border/50"
            >
              下载
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="#support"
              onClick={(e) => handleAnchorClick(e, "support")}
              className="group relative px-4 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 font-medium cursor-pointer backdrop-blur-xl border border-transparent hover:border-border/50"
            >
              支持
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
          </nav>

          {/* 主题切换按钮 / Theme toggle button */}
          <SimpleThemeToggle
            size="md"
            variant="ghost"
            disableFocus={true}
            className="p-2.5 rounded-xl border border-transparent hover:border-border/50 hover:bg-accent/50 backdrop-blur-xl"
          />

          {/* GitHub图标按钮 / GitHub icon button */}
          <button
            onClick={handleGithubClick}
            className="group relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 backdrop-blur-xl border border-transparent hover:border-border/50"
            aria-label="访问GitHub仓库 / Visit GitHub Repository"
          >
            <Github className="w-5 h-5 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      </div>
    </header>
  );
}
