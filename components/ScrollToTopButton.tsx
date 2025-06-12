'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useScrollToTop } from '@/lib/hooks/useScrollToTop';

/**
 * 返回顶部按钮组件的属性接口
 * Props interface for ScrollToTopButton component
 */
interface ScrollToTopButtonProps {
  /** 显示按钮的滚动阈值（像素）/ Scroll threshold in pixels to show button */
  threshold?: number;
  /** 按钮的自定义类名 / Custom className for the button */
  className?: string;
}

/**
 * 返回顶部按钮组件
 * Scroll to top button component with Apple-style design
 */
export default function ScrollToTopButton({ 
  threshold = 300, 
  className = '' 
}: ScrollToTopButtonProps) {
  const { isVisible, scrollToTop } = useScrollToTop(threshold);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          // 进入动画配置 / Enter animation configuration
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            y: 20 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0 
          }}
          // 退出动画配置 / Exit animation configuration
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            y: 20 
          }}
          // 动画过渡配置 / Animation transition configuration
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1], // Apple 风格的缓动曲线 / Apple-style easing curve
          }}
          // 悬停动画效果 / Hover animation effects
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          }}
          // 点击动画效果 / Tap animation effects
          whileTap={{ 
            scale: 0.95 
          }}
          onClick={scrollToTop}
          className={`
            fixed bottom-6 right-6 z-50
            w-12 h-12 
            bg-blue-500 hover:bg-blue-600 
            text-white 
            rounded-full 
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            active:bg-blue-700
            backdrop-blur-sm
            ${className}
          `}
          // 无障碍属性 / Accessibility attributes
          aria-label="返回顶部 / Scroll to top"
          title="返回顶部 / Scroll to top"
        >
          {/* 向上箭头图标 / Up arrow icon */}
          <ChevronUp 
            size={20} 
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-y-[-1px]"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * 移动端优化的返回顶部按钮组件
 * Mobile-optimized scroll to top button component
 */
export function MobileScrollToTopButton({ 
  threshold = 300, 
  className = '' 
}: ScrollToTopButtonProps) {
  const { isVisible, scrollToTop } = useScrollToTop(threshold);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={`
            fixed bottom-4 right-4 z-50
            w-11 h-11 sm:w-12 sm:h-12
            bg-blue-500 hover:bg-blue-600 
            text-white 
            rounded-full 
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            active:bg-blue-700
            backdrop-blur-sm
            ${className}
          `}
          aria-label="返回顶部 / Scroll to top"
          title="返回顶部 / Scroll to top"
        >
          <ChevronUp 
            size={18} 
            strokeWidth={2.5}
            className="sm:w-5 sm:h-5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
