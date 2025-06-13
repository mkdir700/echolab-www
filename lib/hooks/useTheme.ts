"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * 主题类型定义
 * Theme type definition
 */
export type Theme = "light" | "dark" | "system" | "auto";

/**
 * 主题Hook返回值类型
 * Theme hook return type
 */
export interface UseThemeReturn {
  /** 当前主题设置 / Current theme setting */
  theme: Theme;
  /** 实际应用的主题（解析system后的结果）/ Actual applied theme (resolved from system) */
  resolvedTheme: "light" | "dark";
  /** 设置主题的函数 / Function to set theme */
  setTheme: (theme: Theme) => void;
  /** 切换主题的函数 / Function to toggle theme */
  toggleTheme: () => void;
  /** 是否正在挂载中 / Whether component is mounting */
  isMounted: boolean;
}

/**
 * 获取系统主题偏好
 * Get system theme preference
 */
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/**
 * 从localStorage获取保存的主题设置
 * Get saved theme setting from localStorage
 */
const getSavedTheme = (): Theme => {
  if (typeof window === "undefined") return "auto";
  try {
    const saved = localStorage.getItem("theme") as Theme;
    return saved && ["light", "dark", "system", "auto"].includes(saved)
      ? saved
      : "auto";
  } catch {
    return "auto";
  }
};

/**
 * 主题管理自定义Hook
 * Custom hook for theme management with system preference detection and localStorage persistence
 */
export function useTheme(): UseThemeReturn {
  // 主题状态管理 / Theme state management
  const [theme, setThemeState] = useState<Theme>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  // 解析主题：将system转换为实际的light/dark，auto主题由ClientThemeInitializer处理
  // Resolve theme: convert system to actual light/dark, auto theme handled by ClientThemeInitializer
  const resolveTheme = useCallback((currentTheme: Theme): "light" | "dark" => {
    if (currentTheme === "system") {
      return getSystemTheme();
    }
    if (currentTheme === "auto") {
      // auto主题在客户端由ClientThemeInitializer处理，这里返回默认值
      // auto theme is handled by ClientThemeInitializer on client-side, return default here
      return "light";
    }
    return currentTheme;
  }, []);

  // 应用主题到DOM
  // Apply theme to DOM
  const applyTheme = useCallback((newResolvedTheme: "light" | "dark") => {
    const root = document.documentElement;

    // 移除之前的主题类 / Remove previous theme classes
    root.classList.remove("light", "dark");

    // 添加新的主题类 / Add new theme class
    root.classList.add(newResolvedTheme);

    // 更新状态 / Update state
    setResolvedTheme(newResolvedTheme);
  }, []);

  // 设置主题的函数
  // Function to set theme
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);

      // 保存到localStorage / Save to localStorage
      try {
        localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }

      // 解析并应用主题 / Resolve and apply theme
      const resolved = resolveTheme(newTheme);
      applyTheme(resolved);
    },
    [resolveTheme, applyTheme]
  );

  // 切换主题的函数（在light和dark之间切换）
  // Function to toggle theme (between light and dark)
  const toggleTheme = useCallback(() => {
    const currentResolved = resolveTheme(theme);
    const newTheme: Theme = currentResolved === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme, resolveTheme, setTheme]);

  // 监听系统主题变化
  // Listen to system theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      // 只有当前主题设置为system时才响应系统变化
      // Only respond to system changes when current theme is set to system
      if (theme === "system") {
        const newResolvedTheme = getSystemTheme();
        applyTheme(newResolvedTheme);
      }
    };

    // 添加监听器 / Add listener
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // 清理函数 / Cleanup function
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme, applyTheme]);

  // auto主题的时间监听现在由ClientThemeInitializer组件处理
  // Time listening for auto theme is now handled by ClientThemeInitializer component

  // 组件挂载时初始化主题
  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = getSavedTheme();

    // 设置主题状态但不立即解析，避免SSR不匹配
    // Set theme state but don't resolve immediately to avoid SSR mismatch
    setThemeState(savedTheme);

    // 延迟设置挂载状态，确保DOM已经准备好
    // Delay setting mounted state to ensure DOM is ready
    requestAnimationFrame(() => {
      setIsMounted(true);
      // 只有在客户端挂载后才解析和应用主题
      // Only resolve and apply theme after client-side mounting
      const resolved = resolveTheme(savedTheme);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    });
  }, [resolveTheme, applyTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isMounted,
  };
}

/**
 * 主题Hook的类型导出
 * Type export for theme hook
 */
