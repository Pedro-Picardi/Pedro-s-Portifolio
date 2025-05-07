'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// Text data configuration
const TEXT_ELEMENTS = [
  { 
    text: "Pedro Picardi", 
    delay: 0, 
    className: "text-[1.75rem] font-bold text-white", 
    style: { top: "80px" } 
  },
  { 
    text: "Software Engineer", 
    delay: 100, 
    className: "text-base text-subtle", 
    style: { top: "115px" } 
  },
  { 
    text: "🇧🇷 Portuguese (native)", 
    delay: 200, 
    className: "text-sm text-white", 
    style: { top: "160px" } 
  },
  { 
    text: "🇺🇸 English (C2-Fluent)", 
    delay: 250, 
    className: "text-sm text-white", 
    style: { top: "190px" } 
  },
  { 
    text: "🇪🇸 Spanish (C1-Advanced)", 
    delay: 300, 
    className: "text-sm text-white", 
    style: { top: "220px" } 
  },
];

// Animation constants
const CUBIC_BEZIER = 'cubic-bezier(0.33, 1, 0.68, 1)';
const ANIMATION_RESET_DELAY = 400;

const Profile = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Shadow style for the glass sphere
  const sphereShadow = isHovering
    ? `0 22px 35px rgba(0,0,0,0.9), 0 12px 15px rgba(0,0,0,0.15)`
    : `8px 8px 20px rgba(0,0,0,0.50)`;
  
  // Handle mouse tracking with requestAnimationFrame for smoother updates
  useEffect(() => {
    if (!isHovering || !containerRef.current) return;
    
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        setSliderPosition(Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100)));
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering]);
  
  // Reset animation state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), ANIMATION_RESET_DELAY);
    return () => clearTimeout(timer);
  }, [isHovering]);

  // Handler for mouse events
  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsAnimating(true);
  };
  
  const handleMouseLeave = () => {
    setSliderPosition(0);
    setIsHovering(false);
    setIsAnimating(true);
  };

  // Render the sphere component with comparison slider
  const renderSphere = () => (
    <div 
      ref={containerRef}
      className="static w-[280px] h-[280px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        id='sphere' 
        className="absolute inset-0 rounded-full bg-gradient-to-br border-1 border-highlight/20 from-gray-900/30 to-black/20 backdrop-blur-xl overflow-hidden"
        style={{
          boxShadow: sphereShadow,
          transition: `all 400ms ${CUBIC_BEZIER}`,
          transform: isHovering 
            ? 'translateY(-6px) scale(1) rotateX(1deg)' 
            : 'translateY(0) scale(1) rotateX(0)',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          willChange: 'transform, box-shadow',
          perspective: '1000px',
          zIndex: 10,
        }}
      >
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden rounded-full"
          style={{
            transition: `transform 500ms ${CUBIC_BEZIER}, opacity 500ms ${CUBIC_BEZIER}`,
            opacity: isAnimating ? 0.9 : 1,
            transform: isAnimating ? 'translateY(4px)' : 'translateY(0)'
          }}
        >
          {/* ASCII image base layer */}
          <Image 
            src="/pedro-ascii.png" 
            alt="ASCII Profile" 
            width={300} 
            height={300}
            className="w-full h-full object-cover mix-blend-luminosity"
          />
          
          {/* Comparison effect (only when hovering) */}
          {isHovering && (
            <>
              {/* Regular image with dynamic clip path */}
              <div 
                className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                style={{
                  clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                  transition: 'none'
                }}
              >
                <Image 
                  src="/pedro.png" 
                  alt="Profile" 
                  width={300} 
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Divider line */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-white/40 z-10 will-change-[left]"
                style={{ 
                  left: `${sliderPosition}%`,
                  transition: 'none',
                  boxShadow: '0 0 8px 1px rgba(255,255,255,0.7)'
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Render the text elements that emerge from behind the sphere
  const renderTextElements = () => (
    <div className="absolute top-0 left-0 h-full w-full gap-0" style={{ zIndex: 1 }}>
      {TEXT_ELEMENTS.map((item, index) => (
        <div 
          key={index}
          className="absolute whitespace-nowrap"
          style={{
            ...item.style,
            left: '150px', 
            opacity: isHovering ? 1 : 0,
            transform: isHovering ? 'translateX(160px)' : 'translateX(0)',
            transition: `all 600ms ${CUBIC_BEZIER} ${item.delay}ms`,
          }}
        >
          <div 
            className={`${item.className} font-medium transform-gpu`}
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              lineHeight: '1.2',
            }}
          >
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
  
  return (
    <div className="relative">
      <div className="relative">
        {renderSphere()}
        {renderTextElements()}
      </div>
    </div>
  );
};

export default Profile