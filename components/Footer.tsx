import { Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
            <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Play className="w-5 h-5 text-white fill-white transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              EchoLab
            </span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-100">
              专业的语言学习视频播放器
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-gray-700 dark:hover:text-gray-200">
              © 2025 EchoLab. 开源项目，欢迎贡献代码
            </p>
          </div>
        </div>
        <Separator className="mb-8 bg-gray-200 dark:bg-gray-700" />
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 font-medium transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-100 hover:scale-105">
            开始您的高效语言学习之旅吧！🚀
          </p>
        </div>
      </div>
    </footer>
  );
}
