'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}

export function TextShimmer({
  children,
  as: Component = 'p',
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) {
  // Use a simpler approach with motion.custom
  const MotionComponent = Component === 'p' ? motion.p :
                         Component === 'span' ? motion.span :
                         Component === 'div' ? motion.div :
                         Component === 'h1' ? motion.h1 :
                         Component === 'h2' ? motion.h2 :
                         Component === 'h3' ? motion.h3 :
                         Component === 'h4' ? motion.h4 : motion.p;

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text font-bold',
        'text-transparent [--base-color:#0284c7] [--base-gradient-color:#38bdf8]',
        '[--bg:linear-gradient(90deg,rgba(0,0,0,0)_calc(50%-var(--spread)),rgba(56,189,248,0.3)_calc(50%-var(--spread)*0.6),var(--base-gradient-color)_50%,rgba(56,189,248,0.3)_calc(50%+var(--spread)*0.6),rgba(0,0,0,0)_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
        'dark:[--base-color:#0ea5e9] dark:[--base-gradient-color:#7dd3fc] dark:[--bg:linear-gradient(90deg,rgba(0,0,0,0)_calc(50%-var(--spread)),rgba(125,211,252,0.3)_calc(50%-var(--spread)*0.6),var(--base-gradient-color)_50%,rgba(125,211,252,0.3)_calc(50%+var(--spread)*0.6),rgba(0,0,0,0)_calc(50%+var(--spread)))]',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
}
