import {
  Target,
  Film,
  Subtitles,
  CheckCircle,
  Play,
  Pause,
  Repeat,
  Brain,
  Sparkles,
  MessageCircle,
  BookOpen,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

export default function CoreFeatures() {
  return (
    <section id="features" className="py-16 md:py-32 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900 tracking-tight">
            核心功能
            {/* Core Features */}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            专为语言学习者量身定制的强大功能
            {/* Powerful features tailored for language learners */}
          </p>
        </div>

        {/* 逐句精听系统 - Sentence-by-sentence Listening System */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                逐句精听系统
                {/* Sentence-by-sentence Listening System */}
              </h3>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
                一键跳转到上一句或下一句字幕，每句结束后自动暂停，支持单句循环播放，
                让您能够深入理解每一个语言细节。
                {/* Jump to previous or next subtitle with one click, auto-pause after each sentence, support single sentence loop playback */}
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  "一键跳转上下句字幕", // One-click subtitle navigation
                  "句末自动暂停功能", // Auto-pause at sentence end
                  "单句循环重复播放", // Single sentence loop playback
                  "字幕与视频精确同步", // Precise subtitle-video synchronization
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 md:space-x-4 text-sm md:text-lg"
                  >
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 交互式控制面板 - Interactive Control Panel */}
          <div className="bg-gray-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden">
            <div className="bg-white rounded-[1.25rem] md:rounded-[2rem] shadow-2xl p-4 md:p-8 relative z-10">
              <div className="text-center mb-6 md:mb-8">
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  精听控制面板
                  {/* Listening Control Panel */}
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  智能播放控制 {/* Smart playback control */}
                </p>
              </div>

              <div className="flex justify-center items-center space-x-4 md:space-x-6 mb-6 md:mb-8">
                <button className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play className="w-4 h-4 md:w-6 md:h-6 text-gray-600 ml-0.5 md:ml-1" />
                </button>
                <button className="w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105">
                  <Pause className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </button>
                <button className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Repeat className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="bg-blue-50 rounded-xl md:rounded-2xl p-3 md:p-4">
                  <p className="text-blue-900 font-medium text-center text-sm md:text-base">
                    &ldquo;Hello, how are you today?&rdquo;
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl md:rounded-2xl p-3 md:p-4">
                  <p className="text-green-900 font-medium text-center text-sm md:text-base">
                    &ldquo;你好，今天过得怎么样？&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* 装饰性背景元素 - Decorative background elements */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-32 md:h-32 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-12 h-12 md:w-24 md:h-24 bg-green-100 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* 专业播放控制 - Professional Playback Control */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-32">
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
              <Film className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                专业播放控制
                {/* Professional Playback Control */}
              </h3>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
                支持 0.25x 到 2.0x 的多档变速播放，10秒精确跳转，
                快捷键音量控制，让您完全掌控学习节奏。
                {/* Support 0.25x to 2.0x variable speed playback, 10-second precise jumping, hotkey volume control */}
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  "0.25x - 2.0x 变速播放", // 0.25x - 2.0x variable speed playback
                  "10秒精确前进后退", // 10-second precise forward/backward
                  "快捷键音量控制", // Hotkey volume control
                  "播放进度自动记忆", // Auto-save playback progress
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 md:space-x-4 text-sm md:text-lg"
                  >
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden order-2 lg:order-1">
            <div className="bg-white rounded-[1.25rem] md:rounded-[2rem] shadow-2xl p-4 md:p-8 relative z-10">
              <div className="text-center mb-6 md:mb-8">
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  变速播放控制
                  {/* Variable Speed Control */}
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  精确控制学习节奏 {/* Precise learning pace control */}
                </p>
              </div>

              {/* 速度选择器 - Speed selector */}
              <div className="flex justify-center items-center space-x-1 md:space-x-2 mb-6 md:mb-8">
                {["0.5x", "0.75x", "1.0x", "1.25x", "1.5x", "2.0x"].map(
                  (speed, index) => (
                    <button
                      key={speed}
                      className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all ${
                        index === 2
                          ? "bg-purple-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {speed}
                    </button>
                  )
                )}
              </div>

              {/* 进度条 - Progress bar */}
              <div className="bg-gray-100 rounded-full h-2 mb-6">
                <div className="bg-purple-500 h-2 rounded-full w-1/3 relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full shadow-lg"></div>
                </div>
              </div>

              <div className="flex justify-between text-xs md:text-sm text-gray-500">
                <span>02:45</span>
                <span>08:30</span>
              </div>
            </div>

            {/* 装饰性背景元素 - Decorative background elements */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 w-14 h-14 md:w-28 md:h-28 bg-purple-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-20 md:h-20 bg-blue-100 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* 智能字幕系统 - Smart Subtitle System */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
              <Subtitles className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                智能字幕系统
                {/* Smart Subtitle System */}
              </h3>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
                支持多种字幕格式，自动检测同名字幕文件，提供原文、译文、双语三种显示模式，
                字幕位置可自由拖拽调整。
                {/* Support multiple subtitle formats, auto-detect subtitle files, provide original, translated, and bilingual display modes */}
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  "SRT、VTT、ASS、JSON 格式支持", // SRT, VTT, ASS, JSON format support
                  "自动检测字幕文件", // Auto-detect subtitle files
                  "双语显示模式", // Bilingual display mode
                  "字幕位置拖拽调整", // Draggable subtitle positioning
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 md:space-x-4 text-sm md:text-lg"
                  >
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden">
            <div className="bg-white rounded-[1.25rem] md:rounded-[2rem] shadow-2xl p-4 md:p-8 relative z-10">
              <div className="text-center mb-6 md:mb-8">
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  字幕显示模式
                  {/* Subtitle Display Modes */}
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  灵活的显示选项 {/* Flexible display options */}
                </p>
              </div>

              {/* 字幕模式切换 - Subtitle mode toggle */}
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="bg-gray-100 rounded-xl md:rounded-2xl p-1 flex">
                  <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium bg-white shadow-sm text-gray-900">
                    双语 {/* Bilingual */}
                  </button>
                  <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium text-gray-600">
                    原文 {/* Original */}
                  </button>
                  <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium text-gray-600">
                    译文 {/* Translation */}
                  </button>
                </div>
              </div>

              {/* 字幕示例 - Subtitle examples */}
              <div className="space-y-3 md:space-y-4">
                <div className="bg-blue-50 rounded-xl md:rounded-2xl p-3 md:p-4 border-l-2 md:border-l-4 border-blue-500">
                  <p className="text-blue-900 font-medium text-center text-sm md:text-base">
                    &ldquo;The weather is beautiful today.&rdquo;
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl md:rounded-2xl p-3 md:p-4 border-l-2 md:border-l-4 border-green-500">
                  <p className="text-green-900 font-medium text-center text-sm md:text-base">
                    &ldquo;今天天气很好。&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* 装饰性背景元素 - Decorative background elements */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-32 md:h-32 bg-green-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-12 h-12 md:w-24 md:h-24 bg-blue-100 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* AI 智能助手 - AI Smart Assistant (即将上线 - Coming Soon) */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-orange-100 text-orange-800 text-xs md:text-sm font-medium rounded-full">
                即将上线 {/* Coming Soon */}
              </span>
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                AI 智能助手
                {/* AI Smart Assistant */}
              </h3>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
                基于先进的人工智能技术，为每位用户提供个性化的学习体验。
                智能分析学习行为，主动提供帮助和建议。
                {/* Based on advanced AI technology, providing personalized learning experience for each user */}
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  "智能行为分析与主动提问", // Smart behavior analysis and proactive questioning
                  "基于收藏内容的个性化出题", // Personalized quiz generation based on favorites
                  "实时学习进度跟踪分析", // Real-time learning progress tracking
                  "自适应难度调节建议", // Adaptive difficulty adjustment suggestions
                  "语言学习路径规划", // Language learning path planning
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 md:space-x-4 text-sm md:text-lg"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden order-2 lg:order-1">
            <div className="bg-white rounded-[1.25rem] md:rounded-[2rem] shadow-2xl p-4 md:p-8 relative z-10">
              <div className="text-center mb-6 md:mb-8">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900">
                    AI 智能助手
                    {/* AI Smart Assistant */}
                  </h4>
                  <span className="ml-2 md:ml-3 px-2 md:px-3 py-0.5 md:py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    即将上线 {/* Coming Soon */}
                  </span>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  个性化学习体验 {/* Personalized learning experience */}
                </p>
              </div>

              {/* AI 对话示例 - AI conversation example */}
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl md:rounded-2xl p-3 md:p-4">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Brain className="w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0" />
                    <p className="text-gray-800 text-xs md:text-sm">
                      发现您在这个句子上重复了3次，需要解释语法吗？
                      {/* Noticed you repeated this sentence 3 times, need grammar explanation? */}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl md:rounded-2xl p-3 md:p-4">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-gray-800 text-xs md:text-sm">
                      根据您的收藏，为您生成了5道相关练习题
                      {/* Generated 5 related exercises based on your favorites */}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI 功能图标 - AI feature icons */}
              <div className="flex justify-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* 装饰性背景元素 - Decorative background elements */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 w-14 h-14 md:w-28 md:h-28 bg-orange-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-32 md:h-32 bg-red-200 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 right-1/4 w-10 h-10 md:w-20 md:h-20 bg-yellow-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
