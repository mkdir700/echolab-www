"use client";

import { useEffect } from "react";
import { useThemeContext } from "./ThemeProvider";

/**
 * 客户端主题初始化器组件
 * Client-side theme initializer component
 * 
 * 这个组件专门用于在客户端初始化主题，避免SSR水合不匹配问题
 * This component is specifically for initializing theme on client-side to avoid SSR hydration mismatch
 */
export function ClientThemeInitializer() {
  const { theme, setTheme, isMounted } = useThemeContext();

  useEffect(() => {
    // 只有在客户端挂载后才执行主题初始化
    // Only initialize theme after client-side mounting
    if (!isMounted) return;

    // 如果当前主题是auto，确保立即应用正确的主题
    // If current theme is auto, ensure correct theme is applied immediately
    if (theme === "auto") {
      // 触发主题重新解析和应用
      // Trigger theme re-resolution and application
      setTheme("auto");
    }
  }, [isMounted, theme, setTheme]);

  // 这个组件不渲染任何内容
  // This component renders nothing
  return null;
}
