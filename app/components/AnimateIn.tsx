"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
};

export const AnimateIn = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
}: AnimateInProps) => {
  const directionMap = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  const initial = {
    opacity: 0,
    scale: 0.98,
    ...directionMap[direction],
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Improved easing for elegant motion
      }}
    >
      {children}
    </motion.div>
  );
}; 