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
  defaultTheme?: "light" | "dark" | "system" | "auto";
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
  defaultTheme = "auto", // eslint-disable-line @typescript-eslint/no-unused-vars
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
 * 简化的主题脚本，仅处理基本主题，避免水合不匹配
 * Simplified theme script that only handles basic themes to avoid hydration mismatch
 */
export function ThemeScript() {
  const script = `
    (function() {
      try {
        // 只处理明确的主题设置，避免时间相关的计算
        // Only handle explicit theme settings, avoid time-related calculations
        var theme = localStorage.getItem('theme') || 'light';
        var resolvedTheme = 'light'; // 默认主题

        // 只处理明确的主题值，auto主题完全由客户端处理
        // Only handle explicit theme values, auto theme is handled entirely by client
        if (theme === 'dark') {
          resolvedTheme = 'dark';
        } else if (theme === 'light') {
          resolvedTheme = 'light';
        } else if (theme === 'system') {
          // 系统主题检测
          // System theme detection
          var systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          resolvedTheme = systemTheme;
        }
        // auto主题不在这里处理，完全由客户端组件处理
        // auto theme is not handled here, completely handled by client components

        // 应用主题
        // Apply theme
        var root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);
      } catch (e) {
        // 静默处理错误
        // Silently handle errors
        document.documentElement.classList.add('light');
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
