"use client";

import { Play, Github } from "lucide-react";
import { SimpleThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
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
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative px-4 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 font-medium cursor-pointer backdrop-blur-xl border border-transparent hover:border-border/50"
            >
              功能
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="#download"
              onClick={() =>
                document
                  .getElementById("download")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative px-4 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 font-medium cursor-pointer backdrop-blur-xl border border-transparent hover:border-border/50"
            >
              下载
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="#support"
              onClick={() =>
                document
                  .getElementById("support")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
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
