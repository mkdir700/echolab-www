"use client";

import { Button } from "@/components/ui/button";
import {
  Download,
  Monitor,
  Apple,
  Smartphone,
  Github,
  ExternalLink,
  LucideIcon,
  Cpu,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProcessedRelease } from "@/lib/api";

// Tab状态类型
type PlatformTab = 'windows' | 'macos' | 'linux';

// DownloadSection组件的Props类型
interface DownloadSectionProps {
  releaseData: ProcessedRelease | null;
}

// 检测用户操作系统和架构
const detectOSAndArch = () => {
  if (typeof window === 'undefined') return { os: 'Unknown', arch: 'Unknown' };
  
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  
  let os = 'Unknown';
  let arch = 'Unknown';
  
  // 检测操作系统
  if (userAgent.indexOf('Win') !== -1) {
    os = 'Windows';
    // Windows 架构检测
    if (userAgent.indexOf('Win64') !== -1 || userAgent.indexOf('x64') !== -1) {
      arch = 'x64';
    } else if (userAgent.indexOf('AMD64') !== -1) {
      arch = 'x64';
    } else if (userAgent.indexOf('ARM64') !== -1) {
      arch = 'arm64';
    } else {
      arch = 'x64'; // 默认假设是64位
    }
  } else if (userAgent.indexOf('Mac') !== -1) {
    os = 'macOS';
    // macOS 架构检测
    if (userAgent.indexOf('Intel') !== -1) {
      arch = 'intel';
    } else if (userAgent.indexOf('ARM64') !== -1 || platform.indexOf('arm') !== -1) {
      arch = 'apple-silicon';
    } else {
      // 通过 navigator.userAgentData 进一步检测 (Chrome 90+)
      // @ts-expect-error - userAgentData 是实验性 API
      if (navigator.userAgentData?.platform === 'macOS') {
        // 默认假设是 Apple Silicon (M1/M2/M3)，因为新设备更常见
        arch = 'apple-silicon';
      } else {
        arch = 'universal'; // 通用版本
      }
    }
  } else if (userAgent.indexOf('Linux') !== -1) {
    os = 'Linux';
    if (platform.indexOf('x86_64') !== -1 || platform.indexOf('amd64') !== -1) {
      arch = 'x64';
    } else if (platform.indexOf('arm') !== -1) {
      arch = 'arm64';
    } else {
      arch = 'x64';
    }
  }
  
  return { os, arch };
};

// 平台信息接口
interface Platform {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  ext: string;
}

// 版本类型标签映射
const getReleaseTypeInfo = (type: ProcessedRelease['releaseType']) => {
  switch (type) {
    case 'stable':
      return { label: '正式版', color: 'bg-green-500/20 text-green-300 border-green-600/50' };
    case 'beta':
      return { label: 'Beta 版', color: 'bg-blue-500/20 text-blue-300 border-blue-600/50' };
    case 'alpha':
      return { label: 'Alpha 版', color: 'bg-orange-500/20 text-orange-300 border-orange-600/50' };
    case 'rc':
      return { label: 'RC 版', color: 'bg-purple-500/20 text-purple-300 border-purple-600/50' };
    default:
      return { label: '未知版本', color: 'bg-gray-500/20 text-gray-300 border-gray-600/50' };
  }
};

// 后备数据，当 GitHub API 失败时使用
const fallbackRelease: ProcessedRelease = {
  version: 'v1.0.0',
  name: 'EchoLab v1.0.0',
  description: '首个稳定版本发布，包含完整的视频播放和字幕功能。',
  releaseType: 'stable',
  publishedAt: new Date().toISOString(),
  htmlUrl: '#',
  platforms: {
    windows: [
      {
        name: 'GitHub Release',
        primary: true,
        desc: '官方发布渠道',
        variants: [
          {
            arch: 'x64',
            archName: 'x64 (推荐)',
            size: '45.2 MB',
            url: '#',
            recommended: true,
            downloadCount: 1024,
          },
          {
            arch: 'arm64',
            archName: 'ARM64',
            size: '42.8 MB',
            url: '#',
            recommended: false,
            downloadCount: 256,
          }
        ]
      }
    ],
    macos: [
      {
        name: 'GitHub Release',
        primary: true,
        desc: '官方发布渠道',
        variants: [
          {
            arch: 'apple-silicon',
            archName: 'Apple Silicon (M1/M2/M3)',
            size: '48.5 MB',
            url: '#',
            recommended: true,
            downloadCount: 512,
          },
          {
            arch: 'intel',
            archName: 'Intel x64',
            size: '52.8 MB',
            url: '#',
            recommended: false,
            downloadCount: 128,
          }
        ]
      }
    ],
    linux: [
      {
        name: 'GitHub Release',
        primary: true,
        desc: '官方发布渠道',
        variants: [
          {
            arch: 'x64',
            archName: 'x64 (推荐)',
            size: '48.1 MB',
            url: '#',
            recommended: true,
            downloadCount: 256,
          },
          {
            arch: 'arm64',
            archName: 'ARM64',
            size: '45.3 MB',
            url: '#',
            recommended: false,
            downloadCount: 64,
          }
        ]
      }
    ]
  }
};

export default function DownloadSection({ releaseData }: DownloadSectionProps) {
  const [detectedInfo, setDetectedInfo] = useState<{os: string, arch: string}>({os: 'Unknown', arch: 'Unknown'});
  const [activeTab, setActiveTab] = useState<PlatformTab>('windows');
  
  // 使用服务端传递的数据或后备数据
  const currentRelease = releaseData || fallbackRelease;

  useEffect(() => {
    const info = detectOSAndArch();
    setDetectedInfo(info);
    
    // 根据检测到的系统自动设置activeTab
    if (info.os.toLowerCase() === 'windows') {
      setActiveTab('windows');
    } else if (info.os.toLowerCase() === 'macos') {
      setActiveTab('macos');
    } else if (info.os.toLowerCase() === 'linux') {
      setActiveTab('linux');
    }
  }, []);

  // 平台配置
  const platforms: Platform[] = [
    {
      id: 'windows',
      icon: Monitor,
      title: "Windows",
      desc: "Windows 10/11",
      ext: ".exe",
    },
    {
      id: 'macos',
      icon: Apple,
      title: "macOS",
      desc: "macOS 10.15+",
      ext: ".dmg",
    },
    {
      id: 'linux',
      icon: Smartphone,
      title: "Linux",
      desc: "Ubuntu 20.04+ 或其他主流发行版",
      ext: ".AppImage",
    },
  ];  const handleDownload = (url: string, filename: string) => {
    // 这里可以添加下载统计或其他逻辑
    console.log(`Downloading ${filename}`);
    window.open(url, '_blank');
  };

  // 如果服务端数据获取失败，显示错误状态
  if (!releaseData) {
    return (
      <section
        id="download"
        className="py-32 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              立即下载 EchoLab
            </h2>
            <div className="flex items-center justify-center gap-3 text-xl text-red-300 mb-8">
              <AlertCircle className="w-6 h-6" />
              版本信息暂时不可用，使用默认版本信息
            </div>
            <p className="text-gray-400 mb-8">
              我们正在使用备用的版本信息，部分下载链接可能暂时不可用
            </p>
          </div>
        </div>
      </section>
    );
  }

  const finalReleaseData = currentRelease;

  const releaseTypeInfo = getReleaseTypeInfo(finalReleaseData.releaseType);

  return (
    <section
      id="download"
      className="py-32 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        {/* 头部标题 */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8 tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            立即下载 EchoLab
          </h2>
          <p className="text-xl mb-6 text-gray-300 max-w-2xl mx-auto">
            选择适合您系统的版本，开始高效的语言学习之旅
          </p>

          {/* 版本信息 */}
          <motion.div 
            className="inline-flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-400">最新版本：</span>
              <span className="text-white font-semibold">{finalReleaseData.version}</span>
            </div>
            <motion.div 
              className={`px-3 py-1 rounded-full text-sm font-medium border ${releaseTypeInfo.color}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              {releaseTypeInfo.label}
            </motion.div>
          </motion.div>
        </div>

        {/* 平台选择Tab */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex bg-gray-800/60 p-1 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-lg">
              {/* 动画背景滑块 */}
              <motion.div
                className="absolute bg-blue-600 rounded-xl shadow-lg shadow-blue-600/25"
                layoutId="activeTab"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                style={{
                  width: `${100 / platforms.length}%`,
                  height: 'calc(100% - 8px)',
                  top: '4px',
                  left: `${(platforms.findIndex(p => p.id === activeTab) * 100) / platforms.length}%`
                }}
              />
              
              {platforms.map((platform) => {
                const tabId = platform.id as PlatformTab;
                const isActive = activeTab === tabId;
                const isDetected = platform.id.toLowerCase() === detectedInfo.os.toLowerCase();
                
                return (
                  <motion.button
                    key={platform.id}
                    onClick={() => setActiveTab(tabId)}
                    className={`relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-medium z-10 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                        rotate: isActive ? [0, -10, 10, 0] : 0
                      }}
                      transition={{ 
                        duration: 0.3,
                        rotate: { duration: 0.6 }
                      }}
                    >
                      <platform.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="whitespace-nowrap">{platform.title}</span>
                    {isDetected && (
                      <motion.div 
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full shadow-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 当前选中平台的下载内容 */}
          <AnimatePresence mode="wait">
            {(() => {
              const currentPlatform = platforms.find(p => p.id === activeTab);
              if (!currentPlatform) return null;

              const platformChannels = finalReleaseData.platforms[activeTab as keyof typeof finalReleaseData.platforms];
              if (!platformChannels || platformChannels.length === 0) {
                return (
                  <motion.div 
                    key={activeTab}
                    className="max-w-4xl mx-auto text-center py-12"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gray-800/60 border border-gray-600/50 rounded-3xl p-8">
                      <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">暂无下载文件</h3>
                      <p className="text-gray-400">
                        {currentPlatform.title} 平台的版本正在准备中，请稍后再试或选择其他平台
                      </p>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div 
                  key={activeTab}
                  className="max-w-4xl mx-auto"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                >
                  {/* 平台信息卡片 */}
                  <motion.div 
                    className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm border border-gray-600/50 rounded-3xl p-8 mb-8"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <motion.div 
                      className="flex items-center gap-6 mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div 
                        className="w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center justify-center"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <currentPlatform.icon className="w-10 h-10 text-blue-400" />
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="text-3xl font-bold text-white mb-2"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          {currentPlatform.title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-300 text-lg"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          {currentPlatform.desc}
                        </motion.p>
                        <motion.p 
                          className="text-sm text-gray-400 mt-1"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          文件格式：{currentPlatform.ext}
                        </motion.p>
                      </div>
                    </motion.div>

                    {/* 下载渠道 */}
                    <motion.div 
                      className="space-y-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      {platformChannels.map((channel, channelIdx) => (
                        <motion.div
                          key={channelIdx}
                          className="bg-gray-800/40 border border-gray-600/30 rounded-2xl p-6"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.7 + channelIdx * 0.1 
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div 
                            className="flex items-center gap-3 mb-4"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.8 + channelIdx * 0.1 
                            }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Github className="w-6 h-6 text-gray-300" />
                            </motion.div>
                            <h4 className="text-xl font-semibold text-white">{channel.name}</h4>
                            {channel.primary && (
                              <motion.span 
                                className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                  type: "spring",
                                  stiffness: 500,
                                  delay: 0.9 + channelIdx * 0.1 
                                }}
                              >
                                推荐渠道
                              </motion.span>
                            )}
                          </motion.div>
                          <motion.p 
                            className="text-gray-400 mb-6"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 1 + channelIdx * 0.1 
                            }}
                          >
                            {channel.desc}
                          </motion.p>                          {/* 架构变体 */}
                          <div className="grid gap-4">                            {channel.variants.map((variant, variantIdx) => {
                              // 只有当前平台和架构都匹配时才推荐
                              const isPlatformMatch = activeTab.toLowerCase() === detectedInfo.os.toLowerCase();
                              const isArchMatch = variant.arch === detectedInfo.arch;
                              const isRecommended = isPlatformMatch && isArchMatch;
                              
                              return (
                                <motion.div
                                  key={variantIdx}
                                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                                    isRecommended
                                      ? 'bg-blue-900/20 border-blue-600/50 shadow-lg shadow-blue-600/10'
                                      : 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50'
                                  }`}
                                  initial={{ 
                                    y: 20, 
                                    opacity: 0,
                                    scale: 0.95
                                  }}
                                  animate={{ 
                                    y: 0, 
                                    opacity: 1,
                                    scale: 1
                                  }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: 1.1 + channelIdx * 0.1 + variantIdx * 0.05,
                                    type: "spring",
                                    stiffness: 300
                                  }}
                                  whileHover={{ 
                                    scale: 1.02,
                                    y: -2,
                                    transition: { duration: 0.2 }
                                  }}
                                >
                                  <div className="flex items-center gap-4">
                                    <motion.div 
                                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        isRecommended ? 'bg-blue-600/20' : 'bg-gray-600/30'
                                      }`}
                                      whileHover={{ 
                                        scale: 1.1,
                                        rotate: [0, -5, 5, 0],
                                        transition: { duration: 0.4 }
                                      }}
                                    >
                                      <Cpu className={`w-6 h-6 ${isRecommended ? 'text-blue-400' : 'text-gray-400'}`} />
                                    </motion.div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-white font-medium">{variant.archName}</span>
                                        {isRecommended && (
                                          <motion.div
                                            animate={{ 
                                              rotate: [0, 10, -10, 0],
                                              scale: [1, 1.1, 1]
                                            }}
                                            transition={{ 
                                              duration: 2,
                                              repeat: Infinity,
                                              ease: "easeInOut"
                                            }}
                                          >
                                            <Zap className="w-4 h-4 text-yellow-500" />
                                          </motion.div>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-3 text-sm text-gray-400">                                        <span>文件大小：{variant.size}</span>
                                        <span>下载次数：{variant.downloadCount}</span>
                                        {isPlatformMatch && variant.arch === detectedInfo.arch && (
                                          <motion.span 
                                            className="text-green-400 font-medium"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ 
                                              type: "spring",
                                              delay: 1.5 + channelIdx * 0.1 + variantIdx * 0.05
                                            }}
                                          >
                                            • 匹配您的系统
                                          </motion.span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      onClick={() => handleDownload(variant.url, `EchoLab-${currentRelease.version}-${variant.arch}${currentPlatform.ext}`)}
                                      className={`${
                                        isRecommended
                                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                          : 'bg-gray-600 hover:bg-gray-500 text-white'
                                      } rounded-xl px-6 py-3 font-medium transition-all duration-300 group`}
                                    >
                                      <motion.div
                                        className="flex items-center"
                                        whileHover={{ x: 2 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Download className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                        立即下载
                                        <ExternalLink className="w-4 h-4 ml-2 opacity-60" />
                                      </motion.div>
                                    </Button>
                                  </motion.div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
