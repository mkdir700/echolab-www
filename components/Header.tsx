"use client";

import { Play } from "lucide-react";

export default function Header() {
  return (
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
  );
}
