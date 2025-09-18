"use client";

import { useState, useEffect } from "react";

export type DeviceType = "desktop" | "mobile" | "tablet";

export interface DetectedInfo {
  os: string;
  arch: string;
  deviceType: DeviceType;
  isMobile: boolean;
}

// 检测设备类型
const detectDeviceType = (): DeviceType => {
  if (typeof window === "undefined") return "desktop";

  const userAgent = window.navigator.userAgent;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const maxDimension = Math.max(screenWidth, screenHeight);
  const minDimension = Math.min(screenWidth, screenHeight);

  // 首先检测是否为桌面操作系统
  const isDesktopOS =
    /Windows|Mac|Linux/i.test(userAgent) &&
    !/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);

  // 如果是桌面操作系统且屏幕尺寸较大，直接返回桌面
  if (isDesktopOS && minDimension > 1024) {
    return "desktop";
  }

  // 检测真正的移动设备
  const isMobile =
    /Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  // 检测平板设备
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);

  // 基于屏幕尺寸的备用检测
  if (!isMobile && !isTablet && !isDesktopOS) {
    if (maxDimension <= 768) return "mobile";
    if (maxDimension <= 1024) return "tablet";
  }

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
};

// 简化的平台和架构检测
const detectOSAndArch = (): DetectedInfo => {
  if (typeof window === "undefined")
    return {
      os: "Unknown",
      arch: "Unknown",
      deviceType: "desktop",
      isMobile: false,
    };

  const userAgent = window.navigator.userAgent;
  const deviceType = detectDeviceType();
  const isMobile = deviceType === "mobile";

  let os = "Unknown";
  let arch = "Unknown";

  // 检测操作系统
  if (userAgent.indexOf("Win") !== -1) {
    os = "Windows";
    arch = userAgent.indexOf("ARM64") !== -1 ? "arm64" : "x64";
  } else if (userAgent.indexOf("Mac") !== -1) {
    os = "macOS";

    // 简化的 macOS 架构检测
    const cpuCores = navigator.hardwareConcurrency || 0;
    const currentYear = new Date().getFullYear();

    // 基于CPU核心数和年份的简单判断
    if (cpuCores >= 8 || currentYear >= 2021) {
      arch = "apple-silicon";
    } else {
      arch = "intel";
    }
  } else if (userAgent.indexOf("Linux") !== -1) {
    os = "Linux";
    arch = "x64"; // 默认x64，实际使用中可以更精确检测
  }

  return { os, arch, deviceType, isMobile };
};

// 设备检测Hook
export function useDeviceDetection() {
  const [detectedInfo, setDetectedInfo] = useState<DetectedInfo>({
    os: "Unknown",
    arch: "Unknown",
    deviceType: "desktop",
    isMobile: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const info = detectOSAndArch();
    setDetectedInfo(info);

    // 调试信息
    console.log("设备检测结果 / Device detection result:", {
      userAgent: navigator.userAgent,
      os: info.os,
      arch: info.arch,
      deviceType: info.deviceType,
      isMobile: info.isMobile,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      cpuCores: navigator.hardwareConcurrency,
    });
  }, []);

  return {
    detectedInfo,
    isMounted,
  };
}