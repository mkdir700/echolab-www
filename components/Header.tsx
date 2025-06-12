"use client";

import { Play, GithubIcon } from "lucide-react";

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
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 group cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Play className="w-4 h-4 text-white fill-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
            EchoLab
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              onClick={(e) => handleAnchorClick(e, "features")}
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group cursor-pointer"
            >
              功能
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#download"
              onClick={(e) => handleAnchorClick(e, "download")}
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group cursor-pointer"
            >
              下载
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#support"
              onClick={(e) => handleAnchorClick(e, "support")}
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group cursor-pointer"
            >
              支持
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* GitHub图标按钮 / GitHub icon button */}
          <button
            onClick={handleGithubClick}
            className="group relative p-3 rounded-xl bg-white/80 hover:bg-white border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/5 backdrop-blur-xl"
            aria-label="访问GitHub仓库 / Visit GitHub Repository"
          >
            <GithubIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      </div>
    </header>
  );
}
