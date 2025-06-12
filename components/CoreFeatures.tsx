import {
  Target,
  Film,
  Subtitles,
  CheckCircle,
  Play,
  Pause,
  Repeat,
} from "lucide-react";

export default function CoreFeatures() {
  return (
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
  );
}
