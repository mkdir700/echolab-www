"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeContext } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * 主题切换按钮组件的属性接口
 * Props interface for ThemeToggle component
 */
interface ThemeToggleProps {
  /** 按钮大小 / Button size */
  size?: "sm" | "md" | "lg";
  /** 是否显示标签 / Whether to show labels */
  showLabel?: boolean;
  /** 自定义类名 / Custom className */
  className?: string;
  /** 按钮变体 / Button variant */
  variant?: "default" | "outline" | "ghost";
  /** 是否禁用focus效果 / Whether to disable focus effects */
  disableFocus?: boolean;
}

/**
 * 主题图标组件
 * Theme icon component
 */
function ThemeIcon({
  theme,
  size = 20,
}: {
  theme: "light" | "dark" | "system";
  size?: number;
}) {
  const iconProps = {
    size,
    strokeWidth: 2,
    className: "transition-transform duration-200",
  };

  switch (theme) {
    case "light":
      return <Sun {...iconProps} />;
    case "dark":
      return <Moon {...iconProps} />;
    case "system":
      return <Monitor {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
}

/**
 * 简单的主题切换按钮（在light和dark之间切换）
 * Simple theme toggle button (toggles between light and dark)
 */
export function SimpleThemeToggle({
  size = "md",
  className,
  variant = "ghost",
  disableFocus = false,
}: Omit<ThemeToggleProps, "showLabel">) {
  const { resolvedTheme, toggleTheme, isMounted } = useThemeContext();

  if (!isMounted) {
    return (
      <div
        className={cn(
          "w-10 h-10 rounded-xl bg-muted animate-pulse",
          size === "sm" && "w-8 h-8",
          size === "lg" && "w-12 h-12",
          className
        )}
      />
    );
  }

  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-2.5",
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative rounded-xl transition-all duration-200 flex items-center justify-center",
        disableFocus
          ? "focus:outline-none"
          : "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "active:scale-95",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`切换到${resolvedTheme === "light" ? "暗色" : "亮色"}主题 / Switch to ${resolvedTheme === "light" ? "dark" : "light"} theme`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={resolvedTheme}
          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ThemeIcon
            theme={resolvedTheme}
            size={size === "sm" ? 16 : size === "lg" ? 24 : 20}
          />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * 完整的主题选择器（包含system选项）
 * Full theme selector (includes system option)
 */
export function ThemeSelector({
  size = "md",
  showLabel = false,
  className,
  variant = "outline", // eslint-disable-line @typescript-eslint/no-unused-vars
  disableFocus = false,
}: ThemeToggleProps) {
  const { theme, setTheme, isMounted } = useThemeContext();

  if (!isMounted) {
    return (
      <div
        className={cn(
          "flex gap-1 p-1 bg-muted rounded-xl animate-pulse",
          className
        )}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-lg bg-background",
              size === "sm" && "w-8 h-8",
              size === "md" && "w-10 h-10",
              size === "lg" && "w-12 h-12"
            )}
          />
        ))}
      </div>
    );
  }

  const themes: Array<{ value: "light" | "dark" | "system"; label: string }> = [
    { value: "light", label: "亮色 / Light" },
    { value: "dark", label: "暗色 / Dark" },
    { value: "system", label: "系统 / System" },
  ];

  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-2.5",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 bg-accent/30 hover:bg-accent/50 rounded-xl transition-all duration-300",
        className
      )}
    >
      {themes.map(({ value, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "relative rounded-lg transition-all duration-200 flex items-center justify-center",
            disableFocus
              ? "focus:outline-none"
              : "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            sizeClasses[size],
            theme === value
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={label}
          title={label}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${value}-${theme === value}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <ThemeIcon
                theme={value}
                size={size === "sm" ? 16 : size === "lg" ? 24 : 20}
              />
            </motion.div>
          </AnimatePresence>

          {/* 选中状态指示器 / Selected state indicator */}
          {theme === value && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-primary/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.button>
      ))}

      {showLabel && (
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          主题 / Theme
        </span>
      )}
    </div>
  );
}

/**
 * 默认导出简单主题切换按钮
 * Default export simple theme toggle button
 */
export default SimpleThemeToggle;
