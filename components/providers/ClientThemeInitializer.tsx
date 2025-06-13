"use client";

import { useEffect } from "react";
import { useThemeContext } from "./ThemeProvider";

/**
 * 客户端主题初始化器组件
 * Client-side theme initializer component
 *
 * 专门处理auto主题的客户端逻辑，完全避免SSR水合不匹配
 * Specifically handles auto theme client-side logic, completely avoiding SSR hydration mismatch
 */
export function ClientThemeInitializer() {
  const { theme, isMounted } = useThemeContext();

  useEffect(() => {
    // 只有在客户端挂载后且主题为auto时才处理
    // Only handle when client-side mounted and theme is auto
    if (!isMounted || theme !== "auto") return;

    // 计算基于时间的主题（纯客户端逻辑）
    // Calculate time-based theme (pure client-side logic)
    const calculateAutoTheme = (): "light" | "dark" => {
      const now = new Date();
      const hour = now.getHours();
      // 6:00-18:00 为白天（亮色主题），其他时间为夜晚（暗色主题）
      // 6:00-18:00 is daytime (light theme), other times are nighttime (dark theme)
      return hour >= 6 && hour < 18 ? "light" : "dark";
    };

    // 应用auto主题
    // Apply auto theme
    const applyAutoTheme = () => {
      const autoTheme = calculateAutoTheme();
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(autoTheme);
    };

    // 立即应用一次
    // Apply immediately
    applyAutoTheme();

    // 设置定时器，每分钟检查一次时间变化
    // Set timer to check time changes every minute
    const interval = setInterval(applyAutoTheme, 60000);

    // 清理函数
    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [isMounted, theme]);

  // 这个组件不渲染任何内容
  // This component renders nothing
  return null;
}
