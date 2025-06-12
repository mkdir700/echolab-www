"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Download, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
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
  );
}
