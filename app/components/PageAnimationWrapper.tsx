"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type PageAnimationWrapperProps = {
  children: ReactNode;
};

export const PageAnimationWrapper = ({ children }: PageAnimationWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth entrance
      }}
      className="w-full h-full items-center justify-center flex"
    >
      {children}
    </motion.div>
  );
}; 