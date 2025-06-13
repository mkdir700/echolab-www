"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useTheme, UseThemeReturn } from "@/lib/hooks/useTheme";

/**
 * 主题上下文类型定义
 * Theme context type definition
 */
type ThemeContextType = UseThemeReturn | undefined;

/**
 * 主题上下文
 * Theme context
 */
const ThemeContext = createContext<ThemeContextType>(undefined);

/**
 * 主题提供者组件的属性接口
 * Props interface for ThemeProvider component
 */
interface ThemeProviderProps {
  /** 子组件 / Child components */
  children: ReactNode;
  /** 默认主题 / Default theme */
  defaultTheme?: "light" | "dark" | "system";
  /** 是否启用系统主题检测 / Whether to enable system theme detection */
  enableSystem?: boolean;
  /** 自定义属性名称 / Custom attribute name */
  attribute?: string;
}

/**
 * 主题提供者组件
 * Theme provider component that manages theme state and provides context to child components
 */
export function ThemeProvider({
  children,
  defaultTheme = "system", // eslint-disable-line @typescript-eslint/no-unused-vars
  enableSystem = true, // eslint-disable-line @typescript-eslint/no-unused-vars
  attribute = "class", // eslint-disable-line @typescript-eslint/no-unused-vars
}: ThemeProviderProps) {
  const themeValue = useTheme();

  // 始终提供上下文，即使在挂载期间
  // Always provide context, even during mounting
  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}

/**
 * 使用主题上下文的Hook
 * Hook to use theme context
 */
export function useThemeContext(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeProvider. " +
        "Make sure to wrap your app with <ThemeProvider>."
    );
  }

  return context;
}

/**
 * 主题切换脚本，用于避免静态导出时的主题闪烁
 * Theme toggle script to prevent theme flashing during static export
 */
export function ThemeScript() {
  const script = `
    (function() {
      try {
        // 静态导出优化：更快的主题应用
        // Static export optimization: faster theme application
        var theme = localStorage.getItem('theme');
        var systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var resolvedTheme = theme === 'system' || !theme ? systemTheme : theme;

        // 确保主题类正确应用
        // Ensure theme classes are correctly applied
        var root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);

        // 设置CSS变量以支持更好的主题切换
        // Set CSS variables for better theme switching
        root.style.setProperty('--initial-theme', resolvedTheme);
      } catch (e) {
        // 静默处理错误，避免影响页面加载
        // Silently handle errors to avoid affecting page load
        console.warn('Failed to apply theme:', e);
        document.documentElement.classList.add('light'); // 默认回退到浅色主题
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}

/**
 * 主题状态显示组件（用于调试）
 * Theme status display component (for debugging)
 */
export function ThemeStatus() {
  const { theme, resolvedTheme, isMounted } = useThemeContext();

  if (!isMounted) {
    return <div>Loading theme...</div>;
  }

  return (
    <div className="fixed bottom-4 left-4 p-2 bg-card border rounded-lg text-xs font-mono z-50">
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
      <div>Mounted: {isMounted ? "Yes" : "No"}</div>
    </div>
  );
}

/**
 * 导出主题相关类型
 * Export theme-related types
 */
export type { ThemeProviderProps, ThemeContextType };
