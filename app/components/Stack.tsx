'use client';

import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Stack.module.css';

// Tech stack data
const TECH_STACK = [
  {
    name: 'Next.js',
    logo: '/assets/logos/nextjs.svg',
    description: 'React framework for production'
  },
  {
    name: 'React',
    logo: '/assets/logos/react.svg',
    description: 'JavaScript library for building user interfaces'
  },
  {
    name: 'JavaScript',
    logo: '/assets/logos/javascript.svg',
    description: 'Programming language on the core technologies of the web'
  },
  {
    name: 'TypeScript',
    logo: '/assets/logos/typescript.svg',
    description: 'Superset of JavaScript that compiles to plain JavaScript'
  },
  {
    name: 'Shopify',
    logo: '/assets/logos/shopify_glyph.svg',
    description: 'Top 1 World Marketplace for building online stores'
  },
  {
    name: 'Flutter',
    logo: '/assets/logos/flutter.svg',
    description: 'UI toolkit for building natively compiled applications'
  },
  {
    name: 'PostgreSQL',
    logo: '/assets/logos/postgres.svg',
    description: 'Advanced open source relational database'
  },
  {
    name: 'Node.js',
    logo: '/assets/logos/nodejs.svg',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine'
  },
  {
    name: 'Supabase',
    logo: '/assets/logos/supabase.svg',
    description: 'Open source Firebase alternative with PostgreSQL'
  },
  {
    name: 'Firebase',
    logo: '/assets/logos/firebase.svg',
    description: 'Platform for app development with serverless backend'
  },
  {
    name: 'Webflow',
    logo: '/assets/logos/webflow.svg',
    description: 'Visual web design platform for responsive websites'
  },
  {
    name: 'N8N',
    logo: '/assets/logos/n8n.svg',
    description: 'Workflow automation tool for connecting various services'
  }
];

type TechItem = {
  name: string;
  logo: string;
  description: string;
};

// Memoized tech card component for better performance
const TechCard = memo(({ 
  tech, 
  onMouseEnter, 
  onMouseLeave,
  onTouchStart,
}: { 
  tech: TechItem; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void;
  onTouchStart: () => void;
}) => (
  <div 
    className="group h-16 w-16 relative flex items-center justify-center"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onTouchStart={onTouchStart}
  >
    <div className="h-16 w-16 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-gray-700 rounded-full transition-all duration-300 ease-in-out hover:border-[var(--color-text-highlight)] hover:shadow-[-8px_0px_36px_rgba(0,0,0,1)] hover:scale-110 shadow-[-8px_0px_20px_rgba(0,0,0,0.7)] active:border-[var(--color-text-highlight)] active:shadow-[-8px_0px_36px_rgba(0,0,0,1)] active:scale-110">
      <div className="w-8 h-8 relative">
        <Image 
          src={tech.logo}
          alt={`${tech.name} logo`}
          fill
          style={{ objectFit: 'contain' }}
          loading="lazy"
        />
      </div>
    </div>
  </div>
));

TechCard.displayName = 'TechCard';

const Stack = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // States
  const [activeTooltip, setActiveTooltip] = useState<{
    content: TechItem | null;
    state: 'inactive' | 'entering' | 'active' | 'leaving';
  }>({
    content: null,
    state: 'inactive'
  });
  
  // Derived state
  const isTooltipVisible = activeTooltip.state === 'entering' || activeTooltip.state === 'active';
  const isTooltipLeaving = activeTooltip.state === 'leaving';
  
  // Clear dismiss timeout on unmount
  useEffect(() => {
    return () => {
      if (dismissTimeoutRef.current) {
        clearTimeout(dismissTimeoutRef.current);
      }
    };
  }, []);
  
  // Check for wrapping of tech stack items
  useEffect(() => {
    if (!containerRef.current) return;
    
    const checkForWrapping = () => {
      const wrapper = containerRef.current?.querySelector(`.${styles.techStackWrapper}`);
      if (!wrapper) return;
      
      const items = Array.from(wrapper.children) as HTMLElement[];
      if (items.length < 2) return;
      
      const firstTop = items[0].getBoundingClientRect().top;
      const hasWrap = items.some(item => 
        Math.abs(item.getBoundingClientRect().top - firstTop) > 5
      );
      
      wrapper.classList.toggle('has-wrap', hasWrap);
    };

    const resizeObserver = new ResizeObserver(checkForWrapping);
    resizeObserver.observe(containerRef.current);
    
    checkForWrapping();
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  
  // Handle showing tooltip
  const showTooltip = useCallback((tech: TechItem) => {
    // Clear any dismiss timeout
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
      dismissTimeoutRef.current = null;
    }
    
    // Update active tooltip state based on current state
    setActiveTooltip(prev => {
      // If tooltip is not already visible, trigger enter animation
      if (prev.state === 'inactive' || prev.state === 'leaving') {
        return { content: tech, state: 'entering' };
      }
      
      // If tooltip is already visible, just update content
      // This prevents re-triggering the animation
      return { content: tech, state: 'active' };
    });
    
    // Transition from entering to active state after animation completes
    if (activeTooltip.state === 'entering') {
      const enterAnimationDuration = 300; // Match CSS animation duration
      setTimeout(() => {
        setActiveTooltip(prev => 
          prev.state === 'entering' ? { ...prev, state: 'active' } : prev
        );
      }, enterAnimationDuration);
    }
  }, [activeTooltip.state]);
  
  // Handle hiding tooltip
  const hideTooltip = useCallback(() => {
    // Only hide if tooltip is currently visible
    if (activeTooltip.state === 'entering' || activeTooltip.state === 'active') {
      setActiveTooltip(prev => ({ ...prev, state: 'leaving' }));
      
      // Reset to inactive after leaving animation completes
      const leaveAnimationDuration = 300; // Match CSS animation duration
      setTimeout(() => {
        setActiveTooltip(prev => 
          prev.state === 'leaving' ? { content: null, state: 'inactive' } : prev
        );
      }, leaveAnimationDuration);
    }
  }, [activeTooltip.state]);
  
  // Events for desktop
  const handleMouseEnter = useCallback((tech: TechItem) => {
    showTooltip(tech);
  }, [showTooltip]);
  
  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);
  
  // Events for mobile
  const handleTouchStart = useCallback((tech: TechItem) => {
    showTooltip(tech);
    
    // Set timeout to hide tooltip after 3 seconds
    dismissTimeoutRef.current = setTimeout(() => {
      hideTooltip();
      dismissTimeoutRef.current = null;
    }, 3000);
  }, [showTooltip, hideTooltip]);
  
  return (
    <section className="w-full flex flex-col items-center justify-center relative">
      <div className="w-full relative">
        <h3 className="text-lg font-extralight text-[var(--color-text-highlight)] mb-4 text-center">
          That&apos;s what I have on my toolbelt right now
        </h3>
        
        <div 
          className="relative w-full py-4 flex flex-col ml-2 items-center justify-center"
          ref={containerRef}
        >
          <ul className={styles.techStackWrapper}>
            {TECH_STACK.map((tech, index) => (
              <li 
                key={tech.name}
                style={{ zIndex: TECH_STACK.length - index + 10 }}
              >
                <TechCard 
                  tech={tech}
                  onMouseEnter={() => handleMouseEnter(tech)}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={() => handleTouchStart(tech)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {activeTooltip.content && (
        <div 
          className={`absolute w-full md:w-fit left-1/2 transform -translate-x-1/2 z-50 shadow-[-8px_-8px_24px_rgba(0,0,0,0.4)] ${isTooltipVisible ? styles.tooltipVisible : ''} ${isTooltipLeaving ? styles.tooltipHidden : ''}`}
          style={{ 
            bottom: '-5rem',
            pointerEvents: 'none', // Prevent tooltip from interfering with mouse events
          }}
        >
          <div className="bg-[var(--color-background)]/50 text-[var(--color-text-highlight)] text-sm rounded-xl backdrop-blur-xl shadow-lg p-2 border border-highlight/40">
            <div className="font-bold text-md mb-1">{activeTooltip.content.name}</div>
            <div className="text-xs text-[var(--color-text-subtle)]">{activeTooltip.content.description}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Stack;