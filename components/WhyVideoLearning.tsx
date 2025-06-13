"use client";

import {
  Brain,
  Heart,
  Eye,
  Ear,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function WhyVideoLearning() {
  // 移动端轮播状态 / Mobile carousel state
  const [currentAdvantageSlide, setCurrentAdvantageSlide] = useState(0);
  const [currentMethodSlide, setCurrentMethodSlide] = useState(0);

  // 触摸滑动状态 / Touch swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAttemptingBoundarySwipe, setIsAttemptingBoundarySwipe] =
    useState(false);
  const [bounceDirection, setBounceDirection] = useState<
    "left" | "right" | null
  >(null);

  // 实时拖拽状态 / Real-time drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragStartTime, setDragStartTime] = useState<number | null>(null);
  const [activeCarousel, setActiveCarousel] = useState<
    "advantage" | "method" | null
  >(null);

  // 核心优势数据 / Core advantages data
  const advantages = [
    {
      icon: Users,
      color: "from-green-500 to-green-600",
      title: "真实语言环境",
      titleEn: "Authentic Language Environment",
      description:
        "接触母语者的自然发音、日常词汇、口语语法和俚语表达，学到教科书上学不到的真实语言",
    },
    {
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      title: "多感官学习",
      titleEn: "Multi-sensory Learning",
      description:
        "同时调动视觉、听觉和情感体验，大脑多个区域协同工作，显著提高记忆效果和学习效率",
    },
    {
      icon: Heart,
      color: "from-red-500 to-pink-500",
      title: "情感记忆增强",
      titleEn: "Emotional Memory Enhancement",
      description:
        "通过有趣的故事情节和角色互动，激发情感共鸣，让语言学习变得生动有趣，记忆更加深刻",
    },
    {
      icon: Eye,
      color: "from-blue-500 to-blue-600",
      title: "语境理解",
      titleEn: "Contextual Understanding",
      description:
        "在具体场景中学习语言，理解词汇和表达的真实用法，避免脱离上下文的死记硬背",
    },
    {
      icon: Ear,
      color: "from-orange-500 to-orange-600",
      title: "发音模仿",
      titleEn: "Pronunciation Imitation",
      description:
        "通过影子跟读法，模仿演员的发音、语调和情感状态，快速提升口语表达的自然度和流利度",
    },
    {
      icon: TrendingUp,
      color: "from-teal-500 to-teal-600",
      title: "学习动机",
      titleEn: "Learning Motivation",
      description:
        "娱乐性和教育性完美结合，让学习过程充满乐趣，保持长期学习的积极性和持续性",
    },
  ];

  // 学习方法数据 / Learning method data
  const learningSteps = [
    {
      day: "第1天",
      dayEn: "Day 1",
      title: "带字幕观看",
      titleEn: "Watch with Subtitles",
      description: "观看2-3分钟场景，带英文字幕，重复4-5次，熟悉内容",
      descriptionEn:
        "Watch 2-3 minute scenes with English subtitles, repeat 4-5 times",
      icon: Eye,
      color: "from-blue-500 to-blue-600",
    },
    {
      day: "第2天",
      dayEn: "Day 2",
      title: "无字幕理解",
      titleEn: "Watch without Subtitles",
      description: "观看同一场景，不带字幕，重复4-5次，测试理解程度",
      descriptionEn: "Watch the same scene without subtitles, repeat 4-5 times",
      icon: Ear,
      color: "from-green-500 to-green-600",
    },
    {
      day: "第3天",
      dayEn: "Day 3",
      title: "逐句跟读",
      titleEn: "Sentence-by-sentence Repetition",
      description: "逐句暂停，跟着演员重复，模仿发音和语调",
      descriptionEn:
        "Pause sentence by sentence, repeat after actors, imitate pronunciation",
      icon: MessageCircle,
      color: "from-purple-500 to-purple-600",
    },
    {
      day: "第4天",
      dayEn: "Day 4",
      title: "影子跟读",
      titleEn: "Shadow Reading",
      description: "与演员同步说话，必要时可看字幕，训练流利度",
      descriptionEn:
        "Speak simultaneously with actors, check subtitles when needed",
      icon: Users,
      color: "from-orange-500 to-orange-600",
    },
    {
      day: "第5天",
      dayEn: "Day 5",
      title: "无字幕跟读",
      titleEn: "Subtitle-free Following",
      description: "无字幕跟读，模仿演员的发音、情感和动作",
      descriptionEn:
        "Follow without subtitles, imitate pronunciation, emotion, and gestures",
      icon: Target,
      color: "from-red-500 to-red-600",
    },
    {
      day: "第6天",
      dayEn: "Day 6",
      title: "录音对比",
      titleEn: "Recording Comparison",
      description: "录下自己的声音与演员对比，发现并改进不足",
      descriptionEn:
        "Record yourself and compare with actors, identify areas for improvement",
      icon: TrendingUp,
      color: "from-teal-500 to-teal-600",
    },
  ];

  // 触摸滑动处理函数 / Touch swipe handlers
  const minSwipeDistance = 50; // 最小滑动距离 / Minimum swipe distance
  const maxDragResistance = 0.3; // 边界拖拽阻力 / Boundary drag resistance

  const onTouchStart = (e: React.TouchEvent, type: "advantage" | "method") => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setDragStartTime(Date.now());
    setIsDragging(true);
    setDragOffset(0);
    setActiveCarousel(type);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !isDragging || !activeCarousel) return;

    setTouchEnd(e.targetTouches[0].clientX);
    const currentX = e.targetTouches[0].clientX;
    const deltaX = currentX - touchStart;

    // 防止页面滚动 / Prevent page scrolling
    if (Math.abs(deltaX) > 10) {
      e.preventDefault();
    }

    // 计算当前轮播的边界 / Calculate current carousel boundaries
    const isAdvantage = activeCarousel === "advantage";
    const currentSlide = isAdvantage
      ? currentAdvantageSlide
      : currentMethodSlide;
    const maxSlides = isAdvantage ? maxAdvantageSlides : maxMethodSlides;
    const canGoLeft = currentSlide > 0;
    const canGoRight = currentSlide < maxSlides - 1;

    // 计算拖拽偏移量，在边界处添加阻力 / Calculate drag offset with resistance at boundaries
    let offset = deltaX;

    // 左边界阻力 / Left boundary resistance
    if (deltaX > 0 && !canGoLeft) {
      offset = deltaX * maxDragResistance;
    }
    // 右边界阻力 / Right boundary resistance
    else if (deltaX < 0 && !canGoRight) {
      offset = deltaX * maxDragResistance;
    }

    setDragOffset(offset);
  };

  const onTouchEnd = () => {
    if (
      !touchStart ||
      !touchEnd ||
      !isDragging ||
      !activeCarousel ||
      !dragStartTime
    ) {
      // 重置拖拽状态 / Reset drag state
      setIsDragging(false);
      setDragOffset(0);
      setActiveCarousel(null);
      return;
    }

    const distance = touchStart - touchEnd;
    const dragTime = Date.now() - dragStartTime;
    const velocity = Math.abs(distance) / dragTime; // 像素/毫秒 / pixels per millisecond

    // 判断是否应该翻页：基于距离和速度 / Determine if should flip page: based on distance and velocity
    const shouldFlip = Math.abs(distance) > minSwipeDistance || velocity > 0.5;
    const isLeftSwipe = distance > 0;
    const isRightSwipe = distance < 0;

    // 获取当前轮播的边界信息 / Get current carousel boundary info
    const isAdvantage = activeCarousel === "advantage";
    const currentSlide = isAdvantage
      ? currentAdvantageSlide
      : currentMethodSlide;
    const maxSlides = isAdvantage ? maxAdvantageSlides : maxMethodSlides;
    const canGoLeft = currentSlide > 0;
    const canGoRight = currentSlide < maxSlides - 1;

    if (shouldFlip) {
      if (isLeftSwipe && canGoRight) {
        // 向左滑动，显示下一页 / Swipe left, show next page
        if (isAdvantage) {
          nextAdvantageSlide();
        } else {
          nextMethodSlide();
        }
      } else if (isRightSwipe && canGoLeft) {
        // 向右滑动，显示上一页 / Swipe right, show previous page
        if (isAdvantage) {
          prevAdvantageSlide();
        } else {
          prevMethodSlide();
        }
      } else if ((isLeftSwipe && !canGoRight) || (isRightSwipe && !canGoLeft)) {
        // 边界反弹效果 / Boundary bounce effect
        setIsAttemptingBoundarySwipe(true);
        setBounceDirection(isLeftSwipe ? "left" : "right");
        setTimeout(() => {
          setIsAttemptingBoundarySwipe(false);
          setBounceDirection(null);
        }, 400);
      }
    }

    // 重置拖拽状态 / Reset drag state
    setIsDragging(false);
    setDragOffset(0);
    setActiveCarousel(null);
  };

  // 轮播控制函数 / Carousel control functions
  const maxAdvantageSlides = Math.ceil(advantages.length / 2);
  const maxMethodSlides = Math.ceil(learningSteps.length / 2);

  const nextAdvantageSlide = () => {
    setCurrentAdvantageSlide((prev) =>
      prev < maxAdvantageSlides - 1 ? prev + 1 : prev
    );
  };

  const prevAdvantageSlide = () => {
    setCurrentAdvantageSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextMethodSlide = () => {
    setCurrentMethodSlide((prev) =>
      prev < maxMethodSlides - 1 ? prev + 1 : prev
    );
  };

  const prevMethodSlide = () => {
    setCurrentMethodSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // 检查是否可以滑动 / Check if sliding is possible
  const canSlidePrevAdvantage = currentAdvantageSlide > 0;
  const canSlideNextAdvantage = currentAdvantageSlide < maxAdvantageSlides - 1;
  const canSlidePrevMethod = currentMethodSlide > 0;
  const canSlideNextMethod = currentMethodSlide < maxMethodSlides - 1;

  return (
    <section
      id="why-video-learning"
      className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-blue-50/50 via-background to-purple-50/30 dark:from-blue-950/30 dark:via-background dark:to-purple-950/20"
    >
      <div className="container mx-auto max-w-7xl">
        {/* 标题部分 / Title section */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            <span>科学学习方法 / Scientific Learning Method</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white tracking-tight">
            为什么通过视频学习外语
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              如此有效？
            </span>
            {/* Why is learning foreign languages through videos so effective? */}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
            基于语言学习研究和无数学习者的成功经验，视频学习法已被证明是最自然、最高效的语言习得方式之一
            {/* Based on language learning research and countless learners' success stories, video-based learning has proven to be one of the most natural and effective language acquisition methods */}
          </p>
        </div>

        {/* 桌面端：完整显示核心优势 / Desktop: Full advantages display */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {/* 真实语言环境 / Authentic Language Environment */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-[1.02]">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
              真实语言环境
              {/* Authentic Language Environment */}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              接触母语者的自然发音、日常词汇、口语语法和俚语表达，学到教科书上学不到的真实语言
              {/* Exposure to native speakers' natural pronunciation, everyday vocabulary, colloquial grammar, and slang expressions */}
            </p>
          </div>

          {/* 多感官学习 / Multi-sensory Learning */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-[1.02]">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
              多感官学习
              {/* Multi-sensory Learning */}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              同时调动视觉、听觉和情感体验，大脑多个区域协同工作，显著提高记忆效果和学习效率
              {/* Simultaneously engaging visual, auditory, and emotional experiences for enhanced memory and learning efficiency */}
            </p>
          </div>

          {/* 情感记忆增强 / Emotional Memory Enhancement */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-[1.02]">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
              情感记忆增强
              {/* Emotional Memory Enhancement */}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              通过有趣的故事情节和角色互动，激发情感共鸣，让语言学习变得生动有趣，记忆更加深刻
              {/* Through engaging storylines and character interactions, creating emotional connections for vivid and memorable learning */}
            </p>
          </div>

          {/* 语境理解 / Contextual Understanding */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-[1.02]">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
              语境理解
              {/* Contextual Understanding */}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              在具体场景中学习语言，理解词汇和表达的真实用法，避免脱离上下文的死记硬背
              {/* Learning language in specific contexts to understand real usage of vocabulary and expressions */}
            </p>
          </div>

          {/* 发音模仿 / Pronunciation Imitation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-[1.02]">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
              <Ear className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
              发音模仿
              {/* Pronunciation Imitation */}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              通过影子跟读法，模仿演员的发音、语调和情感状态，快速提升口语表达的自然度和流利度
              {/* Through shadowing techniques, imitating actors' pronunciation, intonation, and emotional states */}
            </p>
          </div>

          {/* 学习动机 / Learning Motivation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-[1.02]">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
              学习动机
              {/* Learning Motivation */}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              娱乐性和教育性完美结合，让学习过程充满乐趣，保持长期学习的积极性和持续性
              {/* Perfect combination of entertainment and education, maintaining long-term learning motivation */}
            </p>
          </div>
        </div>

        {/* 移动端：核心优势轮播 / Mobile: Advantages carousel */}
        <div className="md:hidden mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              核心优势
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Core Advantages
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              👉 左右滑动浏览 / Swipe left or right to browse
            </p>
          </div>

          <div className="relative">
            {/* 轮播容器 / Carousel container */}
            <div
              className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
              onTouchStart={(e) => onTouchStart(e, "advantage")}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ touchAction: "pan-y pinch-zoom" }}
            >
              <div
                className={`flex ${
                  isDragging && activeCarousel === "advantage"
                    ? "" // 拖拽时不使用过渡动画 / No transition during drag
                    : "transition-all duration-300 ease-out"
                } ${
                  isAttemptingBoundarySwipe
                    ? bounceDirection === "left"
                      ? "animate-bounce-left"
                      : "animate-bounce-right"
                    : ""
                }`}
                style={{
                  transform: `translateX(calc(-${currentAdvantageSlide * 100}% + ${
                    activeCarousel === "advantage" ? dragOffset : 0
                  }px))`,
                }}
              >
                {Array.from({ length: Math.ceil(advantages.length / 2) }).map(
                  (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                      <div className="space-y-4">
                        {advantages
                          .slice(slideIndex * 2, slideIndex * 2 + 2)
                          .map((advantage, index) => {
                            const IconComponent = advantage.icon;
                            return (
                              <div
                                key={slideIndex * 2 + index}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                              >
                                <div
                                  className={`w-12 h-12 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                                >
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                                  {advantage.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                  {advantage.titleEn}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                  {advantage.description}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* 轮播控制按钮 - 仅在桌面端显示 / Carousel control buttons - Desktop only */}
            <button
              onClick={prevAdvantageSlide}
              disabled={!canSlidePrevAdvantage}
              className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full shadow-lg items-center justify-center border transition-colors ${
                canSlidePrevAdvantage
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  : "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronLeft
                className={`w-5 h-5 ${canSlidePrevAdvantage ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}`}
              />
            </button>
            <button
              onClick={nextAdvantageSlide}
              disabled={!canSlideNextAdvantage}
              className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full shadow-lg items-center justify-center border transition-colors ${
                canSlideNextAdvantage
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  : "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronRight
                className={`w-5 h-5 ${canSlideNextAdvantage ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}`}
              />
            </button>

            {/* 轮播指示器 / Carousel indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(advantages.length / 2) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAdvantageSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentAdvantageSlide
                        ? "bg-blue-600 dark:bg-blue-400"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* 移动端：学习方法轮播 / Mobile: Learning method carousel */}
        <div className="md:hidden mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-3xl p-6 border border-blue-100 dark:border-blue-800/30">
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                <span>6天循环学习法</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                经过验证的系统学习方法
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Proven Systematic Learning Method
              </p>
            </div>

            <div className="relative">
              {/* 学习方法轮播容器 / Learning method carousel container */}
              <div
                className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
                onTouchStart={(e) => onTouchStart(e, "method")}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{ touchAction: "pan-y pinch-zoom" }}
              >
                <div
                  className={`flex ${
                    isDragging && activeCarousel === "method"
                      ? "" // 拖拽时不使用过渡动画 / No transition during drag
                      : "transition-all duration-300 ease-out"
                  } ${
                    isAttemptingBoundarySwipe
                      ? bounceDirection === "left"
                        ? "animate-bounce-left"
                        : "animate-bounce-right"
                      : ""
                  }`}
                  style={{
                    transform: `translateX(calc(-${currentMethodSlide * 100}% + ${
                      activeCarousel === "method" ? dragOffset : 0
                    }px))`,
                  }}
                >
                  {Array.from({
                    length: Math.ceil(learningSteps.length / 2),
                  }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                      <div className="space-y-4">
                        {learningSteps
                          .slice(slideIndex * 2, slideIndex * 2 + 2)
                          .map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                              <div
                                key={slideIndex * 2 + index}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700"
                              >
                                <div className="flex items-start space-x-4">
                                  <div
                                    className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                                  >
                                    <IconComponent className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <span className="text-base font-bold text-gray-900 dark:text-white">
                                        {step.day}
                                      </span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {step.dayEn}
                                      </span>
                                    </div>
                                    <h4 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">
                                      {step.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                      {step.titleEn}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                      {step.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 学习方法轮播控制按钮 - 仅在桌面端显示 / Learning method carousel control buttons - Desktop only */}
              <button
                onClick={prevMethodSlide}
                disabled={!canSlidePrevMethod}
                className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full shadow-lg items-center justify-center border transition-colors ${
                  canSlidePrevMethod
                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    : "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronLeft
                  className={`w-5 h-5 ${canSlidePrevMethod ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}`}
                />
              </button>
              <button
                onClick={nextMethodSlide}
                disabled={!canSlideNextMethod}
                className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full shadow-lg items-center justify-center border transition-colors ${
                  canSlideNextMethod
                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    : "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronRight
                  className={`w-5 h-5 ${canSlideNextMethod ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}`}
                />
              </button>

              {/* 学习方法轮播指示器 / Learning method carousel indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({
                  length: Math.ceil(learningSteps.length / 2),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMethodSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentMethodSlide
                        ? "bg-blue-600 dark:bg-blue-400"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 桌面端：科学学习法介绍 / Desktop: Scientific Learning Method Introduction */}
        <div className="hidden md:block bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 border border-blue-100 dark:border-blue-800/30">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              <span>6天循环学习法 / 6-Day Cycle Learning Method</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              经过验证的系统学习方法
              {/* Proven Systematic Learning Method */}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              基于语言学习研究开发的科学方法，让每一分钟的学习都更加高效
              {/* Scientific method developed based on language learning research */}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                day: "第1天",
                dayEn: "Day 1",
                title: "带字幕观看",
                titleEn: "Watch with Subtitles",
                description: "观看2-3分钟场景，带英文字幕，重复4-5次，熟悉内容",
                descriptionEn:
                  "Watch 2-3 minute scenes with English subtitles, repeat 4-5 times",
                icon: Eye,
                color: "from-blue-500 to-blue-600",
              },
              {
                day: "第2天",
                dayEn: "Day 2",
                title: "无字幕理解",
                titleEn: "Watch without Subtitles",
                description: "观看同一场景，不带字幕，重复4-5次，测试理解程度",
                descriptionEn:
                  "Watch the same scene without subtitles, repeat 4-5 times",
                icon: Ear,
                color: "from-green-500 to-green-600",
              },
              {
                day: "第3天",
                dayEn: "Day 3",
                title: "逐句跟读",
                titleEn: "Sentence-by-sentence Repetition",
                description: "逐句暂停，跟着演员重复，模仿发音和语调",
                descriptionEn:
                  "Pause sentence by sentence, repeat after actors, imitate pronunciation",
                icon: MessageCircle,
                color: "from-purple-500 to-purple-600",
              },
              {
                day: "第4天",
                dayEn: "Day 4",
                title: "影子跟读",
                titleEn: "Shadow Reading",
                description: "与演员同步说话，必要时可看字幕，训练流利度",
                descriptionEn:
                  "Speak simultaneously with actors, check subtitles when needed",
                icon: Users,
                color: "from-orange-500 to-orange-600",
              },
              {
                day: "第5天",
                dayEn: "Day 5",
                title: "无字幕跟读",
                titleEn: "Subtitle-free Following",
                description: "无字幕跟读，模仿演员的发音、情感和动作",
                descriptionEn:
                  "Follow without subtitles, imitate pronunciation, emotion, and gestures",
                icon: Target,
                color: "from-red-500 to-red-600",
              },
              {
                day: "第6天",
                dayEn: "Day 6",
                title: "录音对比",
                titleEn: "Recording Comparison",
                description: "录下自己的声音与演员对比，发现并改进不足",
                descriptionEn:
                  "Record yourself and compare with actors, identify areas for improvement",
                icon: TrendingUp,
                color: "from-teal-500 to-teal-600",
              },
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {step.day}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {step.dayEn}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {step.title}
                    <br />
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                      {step.titleEn}
                    </span>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {step.description}
                    <br />
                    <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                      {step.descriptionEn}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部总结 / Bottom summary */}
        <div className="text-center mt-12 md:mt-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>EchoLab 让这一切变得简单</span>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            我们的软件专为视频语言学习而设计，提供逐句精听、变速播放、智能字幕等功能，
            让您能够轻松实践这些科学有效的学习方法
            {/* Our software is designed specifically for video-based language learning, providing sentence-by-sentence listening, variable speed playback, smart subtitles, and more */}
          </p>
        </div>
      </div>
    </section>
  );
}
