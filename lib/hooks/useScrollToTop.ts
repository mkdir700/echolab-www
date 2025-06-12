'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * 返回顶部功能的自定义 Hook
 * Custom hook for scroll-to-top functionality
 */
export function useScrollToTop(threshold: number = 300) {
  // 是否显示返回顶部按钮的状态
  // State for showing/hiding the scroll-to-top button
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件，控制按钮显示状态
  // Listen to scroll events to control button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      // 当滚动距离超过阈值时显示按钮
      // Show button when scroll distance exceeds threshold
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 添加滚动事件监听器
    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // 清理函数：移除事件监听器
    // Cleanup function: remove event listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold]);

  // 平滑滚动到页面顶部的函数
  // Function to smoothly scroll to top of page
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 使用平滑滚动动画 / Use smooth scroll animation
    });
  }, []);

  return {
    isVisible, // 按钮是否可见 / Whether button is visible
    scrollToTop, // 滚动到顶部的函数 / Function to scroll to top
  };
}

/**
 * Hook 返回值的类型定义
 * Type definition for hook return value
 */
export type UseScrollToTopReturn = ReturnType<typeof useScrollToTop>;
