"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  SkipForward,
  Repeat,
  Subtitles,
  Download,
  Github,
  Mail,
  MessageSquare,
  Zap,
  Target,
  Film,
  Monitor,
  Apple,
  Smartphone,
  CheckCircle,
  Calendar,
  Users,
  ArrowRight,
  ArrowDown,
  Pause,
  SkipBack,
  Volume2,
  Sun,
  Moon,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";

// 模拟字幕数据
const subtitleData = [
  { id: 1, start: 0, end: 3, en: "Welcome to EchoLab", zh: "欢迎使用 EchoLab" },
  {
    id: 2,
    start: 3,
    end: 7,
    en: "The professional language learning video player",
    zh: "专业的语言学习视频播放器",
  },
  {
    id: 3,
    start: 7,
    end: 11,
    en: "Experience sentence-by-sentence listening",
    zh: "体验逐句精听功能",
  },
  {
    id: 4,
    start: 11,
    end: 15,
    en: "Control playback speed easily",
    zh: "轻松控制播放速度",
  },
  {
    id: 5,
    start: 15,
    end: 19,
    en: "Switch between day and night modes",
    zh: "在白天和黑夜模式间切换",
  },
  {
    id: 6,
    start: 19,
    end: 23,
    en: "Use keyboard shortcuts for efficiency",
    zh: "使用快捷键提高效率",
  },
];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  // 交互式演示状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(80);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [subtitleMode, setSubtitleMode] = useState<"en" | "zh" | "both">(
    "both"
  );
  const [isLooping, setIsLooping] = useState(false);
  const [autoPause, setAutoPause] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  const totalDuration = 23;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 播放器逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1 * playbackSpeed;

          // 检查是否需要自动暂停
          if (autoPause) {
            const currentSub = subtitleData.find(
              (sub) => newTime >= sub.start && newTime < sub.end
            );
            const nextSub = subtitleData.find((sub) => sub.start > newTime);

            if (currentSub && nextSub && newTime >= currentSub.end - 0.1) {
              setIsPlaying(false);
              return currentSub.end;
            }
          }

          if (newTime >= totalDuration) {
            setIsPlaying(false);
            return isLooping ? 0 : totalDuration;
          }

          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, autoPause, isLooping]);

  // 更新当前字幕
  useEffect(() => {
    const current = subtitleData.findIndex(
      (sub) => currentTime >= sub.start && currentTime < sub.end
    );
    if (current !== -1) {
      setCurrentSubtitle(current);
    }
  }, [currentTime]);

  // 快捷键支持
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
        case "h":
          jumpToPreviousSubtitle();
          break;
        case "l":
          jumpToNextSubtitle();
          break;
        case "r":
          setIsLooping((prev) => !prev);
          break;
        case "p":
          setAutoPause((prev) => !prev);
          break;
        case "arrowleft":
          setCurrentTime((prev) => Math.max(0, prev - 10));
          break;
        case "arrowright":
          setCurrentTime((prev) => Math.min(totalDuration, prev + 10));
          break;
        case "arrowup":
          setVolume((prev) => Math.min(100, prev + 10));
          break;
        case "arrowdown":
          setVolume((prev) => Math.max(0, prev - 10));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const jumpToPreviousSubtitle = useCallback(() => {
    if (currentSubtitle > 0) {
      const prevSub = subtitleData[currentSubtitle - 1];
      setCurrentTime(prevSub.start);
    }
  }, [currentSubtitle]);

  const jumpToNextSubtitle = useCallback(() => {
    if (currentSubtitle < subtitleData.length - 1) {
      const nextSub = subtitleData[currentSubtitle + 1];
      setCurrentTime(nextSub.start);
    }
  }, [currentSubtitle]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getCurrentSubtitle = () => {
    return subtitleData.find(
      (sub) => currentTime >= sub.start && currentTime < sub.end
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play className="w-4 h-4 text-white fill-white transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
              EchoLab
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              功能
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#demo"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              在线体验
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#download"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              下载
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#support"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              支持
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Badge
              variant="secondary"
              className="mb-8 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 hover:bg-blue-100 transition-all duration-300 hover:scale-105"
            >
              🎉 Beta v0.1.0 现已发布
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight leading-none">
              <span className="inline-block transition-all duration-700 delay-200 hover:scale-105">
                专业的语言学习
              </span>
              <br />
              <span className="inline-block transition-all duration-700 delay-400 hover:scale-105">
                视频播放器
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-600">
              EchoLab
              让您的外语学习更加高效和专业。通过逐句精听、智能字幕和专业播放控制，
              打造沉浸式的语言学习体验。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 transition-all duration-700 delay-800">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                onClick={() =>
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Play className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                立即体验
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 rounded-xl font-medium border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-400 group"
              >
                <Download className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                免费下载
              </Button>
            </div>
          </div>

          {/* App Screenshot Placeholder - Day/Night Mode */}
          <div
            className={`relative transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="bg-gray-100 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                <div className="flex flex-col md:flex-row">
                  {/* Light Mode */}
                  <div className="w-full md:w-1/2 h-80 md:h-96 bg-gray-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 transition-all duration-300 group-hover:bg-gray-100 relative">
                    <div className="absolute top-4 left-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      白天模式
                    </div>
                    <div className="text-center transition-all duration-300 group-hover:scale-105">
                      <div className="w-64 h-48 mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3">
                          <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <div className="text-xs text-gray-500 mx-auto">
                            EchoLab - 白天模式
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="h-4 bg-gray-100 rounded mb-2 w-3/4"></div>
                          <div className="h-3 bg-gray-100 rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 rounded mb-2 w-5/6"></div>
                          <div className="h-8 bg-blue-100 rounded mb-2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          </div>
                          <div className="h-3 bg-gray-100 rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                        </div>
                      </div>
                      <p className="text-gray-500 font-medium mt-4 transition-colors duration-300 group-hover:text-gray-700">
                        明亮清晰的日间界面
                      </p>
                    </div>
                  </div>

                  {/* Dark Mode */}
                  <div className="w-full md:w-1/2 h-80 md:h-96 bg-gray-800 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-900 relative">
                    <div className="absolute top-4 left-4 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      黑夜模式
                    </div>
                    <div className="text-center transition-all duration-300 group-hover:scale-105">
                      <div className="w-64 h-48 mx-auto bg-gray-900 rounded-lg shadow-md border border-gray-700 overflow-hidden">
                        <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center px-3">
                          <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <div className="text-xs text-gray-400 mx-auto">
                            EchoLab - 黑夜模式
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
                          <div className="h-3 bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded mb-2 w-5/6"></div>
                          <div className="h-8 bg-blue-900 rounded mb-2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          </div>
                          <div className="h-3 bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-4/5"></div>
                        </div>
                      </div>
                      <p className="text-gray-300 font-medium mt-4 transition-colors duration-300 group-hover:text-gray-200">
                        护眼舒适的夜间模式
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mode Toggle Indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-gray-100">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-800 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-16">
            <div className="animate-bounce">
              <ArrowDown className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-green-100 text-green-800 border-green-200 px-4 py-2">
              🎮 交互式体验
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              立即体验 EchoLab
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              无需下载，直接在浏览器中体验 EchoLab
              的核心功能。使用鼠标点击或键盘快捷键进行操作。
            </p>
          </div>

          {/* Interactive Player */}
          <div
            className={`max-w-4xl mx-auto transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-white"} rounded-3xl shadow-2xl overflow-hidden`}
          >
            {/* Player Header */}
            <div
              className={`h-12 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"} border-b flex items-center px-6 justify-between`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span
                  className={`text-sm font-medium ml-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  EchoLab Demo - {isDarkMode ? "黑夜模式" : "白天模式"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Video Area */}
            <div
              className={`h-64 md:h-80 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} flex items-center justify-center relative`}
            >
              <div
                className={`text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">EchoLab 演示视频</p>
                <p className="text-sm opacity-75 mt-2">
                  体验逐句精听和智能字幕功能
                </p>
              </div>

              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-black/20 hover:bg-black/30 text-white border-2 border-white/50 backdrop-blur-sm"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className={`w-full h-1 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"} rounded-full overflow-hidden`}
                >
                  <div
                    className="h-full bg-blue-500 transition-all duration-100"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Subtitle Area */}
            <div
              className={`p-6 ${isDarkMode ? "bg-gray-850" : "bg-gray-50"} border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="text-center min-h-[80px] flex items-center justify-center">
                {getCurrentSubtitle() ? (
                  <div className="space-y-2">
                    {(subtitleMode === "en" || subtitleMode === "both") && (
                      <p
                        className={`text-lg ${isDarkMode ? "text-gray-200" : "text-gray-800"} font-medium`}
                      >
                        {getCurrentSubtitle()?.en}
                      </p>
                    )}
                    {(subtitleMode === "zh" || subtitleMode === "both") && (
                      <p
                        className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {getCurrentSubtitle()?.zh}
                      </p>
                    )}
                  </div>
                ) : (
                  <p
                    className={`${isDarkMode ? "text-gray-500" : "text-gray-400"} italic`}
                  >
                    字幕将在这里显示...
                  </p>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className={`p-6 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
              {/* Main Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={jumpToPreviousSubtitle}
                  className={`${isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300"}`}
                >
                  <SkipBack className="w-4 h-4" />
                </Button>

                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={jumpToNextSubtitle}
                  className={`${isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300"}`}
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress and Time */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} font-mono`}
                  >
                    {formatTime(currentTime)}
                  </span>
                  <Slider
                    value={[currentTime]}
                    onValueChange={([value]) => setCurrentTime(value)}
                    max={totalDuration}
                    step={0.1}
                    className="flex-1"
                  />
                  <span
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} font-mono`}
                  >
                    {formatTime(totalDuration)}
                  </span>
                </div>
              </div>

              {/* Advanced Controls */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Speed Control */}
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    播放速度: {playbackSpeed}x
                  </label>
                  <Slider
                    value={[playbackSpeed]}
                    onValueChange={([value]) => setPlaybackSpeed(value)}
                    min={0.25}
                    max={2}
                    step={0.25}
                  />
                </div>

                {/* Volume Control */}
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    音量: {volume}%
                  </label>
                  <div className="flex items-center space-x-2">
                    <Volume2
                      className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    />
                    <Slider
                      value={[volume]}
                      onValueChange={([value]) => setVolume(value)}
                      max={100}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Subtitle Mode */}
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    字幕模式
                  </label>
                  <select
                    value={subtitleMode}
                    onChange={(e) =>
                      setSubtitleMode(e.target.value as "en" | "zh" | "both")
                    }
                    className={`w-full p-2 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="both">双语</option>
                    <option value="en">英文</option>
                    <option value="zh">中文</option>
                  </select>
                </div>

                {/* Feature Toggles */}
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    功能开关
                  </label>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsLooping(!isLooping)}
                      className={`w-full justify-start text-xs ${
                        isLooping
                          ? "bg-blue-100 text-blue-700"
                          : isDarkMode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-600"
                      }`}
                    >
                      <Repeat className="w-3 h-3 mr-2" />
                      单句循环
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAutoPause(!autoPause)}
                      className={`w-full justify-start text-xs ${
                        autoPause
                          ? "bg-green-100 text-green-700"
                          : isDarkMode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-600"
                      }`}
                    >
                      <Pause className="w-3 h-3 mr-2" />
                      自动暂停
                    </Button>
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcuts Info */}
              <div
                className={`mt-6 p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}
              >
                <h4
                  className={`text-sm font-medium mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  快捷键提示：
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                      空格
                    </kbd>{" "}
                    播放/暂停
                  </div>
                  <div
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                      H/L
                    </kbd>{" "}
                    上/下一句
                  </div>
                  <div
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                      R
                    </kbd>{" "}
                    循环
                  </div>
                  <div
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                      P
                    </kbd>{" "}
                    自动暂停
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">逐句精听</h3>
                <p className="text-sm text-gray-600">
                  点击上一句/下一句按钮，或使用 H/L 键快速跳转
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">变速播放</h3>
                <p className="text-sm text-gray-600">
                  拖动速度滑块调整播放速度，支持 0.25x - 2x
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Subtitles className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">智能字幕</h3>
                <p className="text-sm text-gray-600">
                  切换字幕显示模式：双语、英文或中文
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Release Info */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: Calendar,
                color: "blue",
                title: "发布日期",
                desc: "2025年6月4日",
              },
              {
                icon: () => (
                  <div className="text-green-600 font-bold text-lg">β</div>
                ),
                color: "green",
                title: "版本状态",
                desc: "Beta 测试版",
              },
              {
                icon: Monitor,
                color: "purple",
                title: "支持平台",
                desc: "Windows/macOS/Linux",
              },
              {
                icon: Users,
                color: "orange",
                title: "目标用户",
                desc: "语言学习者",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`space-y-4 transition-all duration-500 delay-${index * 100} hover:scale-105 group`}
              >
                <div
                  className={`w-12 h-12 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-700">
                  {item.title}
                </h3>
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gray-900 tracking-tight transition-all duration-500 hover:scale-105">
              核心功能
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              专为语言学习者量身定制的强大功能
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 group">
            <div className="transition-all duration-700 hover:translate-x-2">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-3">
                <Target className="w-6 h-6 text-blue-600 transition-transform duration-300 hover:scale-110" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 transition-colors duration-300 hover:text-blue-600">
                逐句精听系统
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                一键跳转到上一句或下一句字幕，每句结束后自动暂停，支持单句循环播放，
                让您能够深入理解每一个语言细节。
              </p>
              <div className="space-y-4">
                {[
                  "一键跳转上下句字幕",
                  "句末自动暂停功能",
                  "单句循环重复播放",
                  "字幕与视频精确同步",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 transition-all duration-300 delay-${index * 100} hover:translate-x-2 group/item`}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 transition-all duration-300 group-hover/item:scale-110" />
                    <span className="text-gray-700 transition-colors duration-300 group-hover/item:text-gray-900">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group/card">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover/card:shadow-xl">
                <div className="flex flex-col">
                  {/* Light Mode */}
                  <div className="h-40 bg-gray-50 flex items-center justify-center border-b border-gray-200 transition-all duration-300 group-hover/card:bg-gray-100 relative">
                    <div className="absolute top-2 left-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      白天模式
                    </div>
                    <div className="text-center transition-all duration-300 group-hover/card:scale-105">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 text-gray-600 ml-0.5" />
                        </div>
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Pause className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <Repeat className="w-3 h-3 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        逐句精听 - 白天模式
                      </p>
                    </div>
                  </div>

                  {/* Dark Mode */}
                  <div className="h-40 bg-gray-800 flex items-center justify-center transition-all duration-300 group-hover/card:bg-gray-900 relative">
                    <div className="absolute top-2 left-2 bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium">
                      黑夜模式
                    </div>
                    <div className="text-center transition-all duration-300 group-hover/card:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 text-gray-400 ml-0.5" />
                        </div>
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <Pause className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                          <Repeat className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        逐句精听 - 黑夜模式
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="bg-gray-100 rounded-3xl p-8 lg:order-1 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group/card">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover/card:shadow-xl">
                <div className="flex flex-col">
                  {/* Light Mode */}
                  <div className="h-40 bg-gray-50 flex items-center justify-center border-b border-gray-200 transition-all duration-300 group-hover/card:bg-gray-100 relative">
                    <div className="absolute top-2 left-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      白天模式
                    </div>
                    <div className="text-center transition-all duration-300 group-hover/card:scale-105">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 text-gray-600 ml-0.5" />
                        </div>
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Pause className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <Repeat className="w-3 h-3 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        播放控制 - 白天模式
                      </p>
                    </div>
                  </div>

                  {/* Dark Mode */}
                  <div className="h-40 bg-gray-800 flex items-center justify-center transition-all duration-300 group-hover/card:bg-gray-900 relative">
                    <div className="absolute top-2 left-2 bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium">
                      黑夜模式
                    </div>
                    <div className="text-center transition-all duration-300 group-hover/card:scale-105">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 text-gray-400 ml-0.5" />
                        </div>
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <Pause className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                          <Repeat className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        播放控制 - 黑夜模式
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-2 transition-all duration-700 hover:translate-x-2">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-3">
                <Film className="w-6 h-6 text-purple-600 transition-transform duration-300 hover:scale-110" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 transition-colors duration-300 hover:text-purple-600">
                专业播放控制
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                支持 0.25x 到 2.0x 的多档变速播放，10秒精确跳转，
                快捷键音量控制，让您完全掌控学习节奏。
              </p>
              <div className="space-y-4">
                {[
                  "0.25x - 2.0x 变速播放",
                  "10秒精确前进后退",
                  "快捷键音量控制",
                  "播放进度自动记忆",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 transition-all duration-300 delay-${index * 100} hover:translate-x-2 group/item`}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 transition-all duration-300 group-hover/item:scale-110" />
                    <span className="text-gray-700 transition-colors duration-300 group-hover/item:text-gray-900">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="transition-all duration-700 hover:translate-x-2">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-3">
                <Subtitles className="w-6 h-6 text-green-600 transition-transform duration-300 hover:scale-110" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 transition-colors duration-300 hover:text-green-600">
                智能字幕系统
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                支持多种字幕格式，自动检测同名字幕文件，提供原文、译文、双语三种显示模式，
                字幕位置可自由拖拽调整。
              </p>
              <div className="space-y-4">
                {[
                  "SRT、VTT、ASS、JSON 格式支持",
                  "自动检测字幕文件",
                  "双语显示模式",
                  "字幕位置拖拽调整",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 transition-all duration-300 delay-${index * 100} hover:translate-x-2 group/item`}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 transition-all duration-300 group-hover/item:scale-110" />
                    <span className="text-gray-700 transition-colors duration-300 group-hover/item:text-gray-900">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group/card">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover/card:shadow-xl">
                <div className="flex flex-col">
                  {/* Light Mode */}
                  <div className="h-40 bg-gray-50 flex items-center justify-center border-b border-gray-200 transition-all duration-300 group-hover/card:bg-gray-100 relative">
                    <div className="absolute top-2 left-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      白天模式
                    </div>
                    <div className="text-center transition-all duration-300 group-hover/card:scale-105">
                      <div className="flex flex-col items-center">
                        <div className="bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200 text-xs text-gray-800 mb-1">
                          Hello, how are you today?
                        </div>
                        <div className="bg-green-50 px-3 py-1 rounded-lg shadow-sm border border-green-100 text-xs text-gray-800">
                          你好，今天过得怎么样？
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        智能字幕 - 白天模式
                      </p>
                    </div>
                  </div>

                  {/* Dark Mode */}
                  <div className="h-40 bg-gray-800 flex items-center justify-center transition-all duration-300 group-hover/card:bg-gray-900 relative">
                    <div className="absolute top-2 left-2 bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium">
                      黑夜模式
                    </div>
                    <div className="text-center transition-all duration-300 group-hover/card:scale-105">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-700 px-3 py-1 rounded-lg shadow-sm border border-gray-600 text-xs text-gray-200 mb-1">
                          Hello, how are you today?
                        </div>
                        <div className="bg-green-900 px-3 py-1 rounded-lg shadow-sm border border-green-800 text-xs text-gray-200">
                          你好，今天过得怎么样？
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        智能字幕 - 黑夜模式
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="py-32 px-6 bg-gray-900 text-white overflow-hidden"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold mb-8 tracking-tight transition-all duration-500 hover:scale-105">
            立即下载 EchoLab
          </h2>
          <p className="text-xl mb-16 text-gray-300 max-w-2xl mx-auto">
            选择适合您系统的版本，开始高效的语言学习之旅
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Monitor,
                title: "Windows",
                desc: "Windows 10/11 (64位)",
                ext: ".exe",
              },
              {
                icon: Apple,
                title: "macOS",
                desc: "macOS 10.15+ (Intel & Apple Silicon)",
                ext: ".dmg",
              },
              {
                icon: Smartphone,
                title: "Linux",
                desc: "Ubuntu 20.04+ 或其他主流发行版",
                ext: ".AppImage",
              },
            ].map((platform, index) => (
              <Card
                key={index}
                className={`bg-gray-800 border-gray-700 text-white transition-all duration-500 delay-${index * 100} hover:bg-gray-750 hover:scale-105 hover:-translate-y-2 group`}
              >
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-600">
                    <platform.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-xl transition-colors duration-300 group-hover:text-gray-200">
                    {platform.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                    {platform.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-xl py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn">
                    <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
                    下载 {platform.ext}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto transition-all duration-500 hover:bg-gray-750 hover:scale-105 group">
            <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-gray-200">
              系统要求
            </h3>
            <div className="text-gray-300 space-y-2">
              {[
                "至少 4GB 内存推荐",
                "支持硬件加速的显卡",
                "100MB 可用磁盘空间",
              ].map((req, index) => (
                <p
                  key={index}
                  className={`transition-all duration-300 delay-${index * 100} hover:translate-x-2 hover:text-gray-200`}
                >
                  • {req}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support & Feedback */}
      <section id="support" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 transition-all duration-500 hover:scale-105">
              反馈与支持
            </h2>
            <p className="text-lg text-gray-600">
              我们非常重视您的使用体验和反馈
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Github,
                title: "GitHub Issues",
                desc: "提交 Bug 报告和功能建议",
                color: "gray",
              },
              {
                icon: MessageSquare,
                title: "社区讨论",
                desc: "加入用户交流和讨论",
                color: "blue",
              },
              {
                icon: Mail,
                title: "邮件联系",
                desc: "直接联系开发者",
                color: "green",
              },
            ].map((support, index) => (
              <Card
                key={index}
                className={`text-center border-gray-200 transition-all duration-500 delay-${index * 100} hover:shadow-lg hover:scale-105 hover:-translate-y-2 group`}
              >
                <CardHeader className="pb-6">
                  <div
                    className={`w-16 h-16 bg-${support.color === "gray" ? "gray" : support.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <support.icon
                      className={`w-8 h-8 text-${support.color === "gray" ? "gray-700" : support.color + "-600"} transition-transform duration-300 group-hover:scale-110`}
                    />
                  </div>
                  <CardTitle className="text-xl transition-colors duration-300 group-hover:text-gray-700">
                    {support.title}
                  </CardTitle>
                  <CardDescription className="transition-colors duration-300 group-hover:text-gray-600">
                    {support.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-400 group/btn"
                  >
                    {support.title.includes("GitHub")
                      ? "前往 GitHub"
                      : support.title.includes("社区")
                        ? "参与讨论"
                        : "发送邮件"}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Play className="w-5 h-5 text-white fill-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-2xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                EchoLab
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 mb-2 font-medium transition-colors duration-300 hover:text-gray-800">
                专业的语言学习视频播放器
              </p>
              <p className="text-sm text-gray-500 transition-colors duration-300 hover:text-gray-700">
                © 2025 EchoLab. 开源项目，欢迎贡献代码
              </p>
            </div>
          </div>
          <Separator className="mb-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-gray-600 font-medium transition-all duration-300 hover:text-gray-800 hover:scale-105">
              开始您的高效语言学习之旅吧！🚀
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
