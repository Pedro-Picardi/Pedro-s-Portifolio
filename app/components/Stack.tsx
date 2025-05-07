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
  onMouseLeave
}: { 
  tech: TechItem; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void;
}) => (
  <div 
    className="group h-16 w-16 relative flex items-center justify-center"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="h-16 w-16 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-gray-700 rounded-full transition-all duration-300 ease-in-out hover:border-[var(--color-text-highlight)] hover:shadow-[-8px_0px_36px_rgba(0,0,0,1)] hover:scale-110 shadow-[-8px_0px_20px_rgba(0,0,0,0.7)]">
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
  const [tooltipContent, setTooltipContent] = useState<TechItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    
    return () => resizeObserver.disconnect();
  }, []);

  const handleTechHover = useCallback((tech: TechItem) => {
    setTooltipContent(tech);
  }, []);
  
  const handleTechLeave = useCallback(() => {
    setTooltipContent(null);
  }, []);
  
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
                  onMouseEnter={() => handleTechHover(tech)}
                  onMouseLeave={handleTechLeave}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {tooltipContent && (
        <div 
          className={`absolute w-fit left-1/2 transform -translate-x-1/2 z-50 shadow-[-8px_-8px_24px_rgba(0,0,0,0.4)] ${styles.tooltipVisible}`}
          style={{ 
            bottom: '-5rem'
          }}
        >
          <div className="bg-[var(--color-background)]/50 text-[var(--color-text-highlight)] text-sm rounded-xl backdrop-blur-xl shadow-lg p-4 border border-highlight/40">
            <div className="font-bold text-md mb-1">{tooltipContent.name}</div>
            <div className="text-xs text-[var(--color-text-subtle)]">{tooltipContent.description}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Stack;