'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const Profile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Animation and style constants
  const cubicBezier = 'cubic-bezier(0.33, 1, 0.68, 1)';
  
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
  
  // Handle mouse events
  const handleMouseEvents = {
    onMouseEnter: () => {
      setIsHovering(true);
      setIsAnimating(true);
    },
    onMouseLeave: () => {
      setSliderPosition(0);
      setIsHovering(false);
      setIsAnimating(true);
    }
  };
  
  // Reset animation state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [isHovering]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute top-4/9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px]"
      {...handleMouseEvents}
    >
      {/* Glass sphere container */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br border-1 border-highlight/20 from-gray-900/30 to-black/20 backdrop-blur-xl overflow-hidden"
        style={{
          boxShadow: `${sphereShadow}`,
          transition: `all 400ms ${cubicBezier}`,
          transform: isHovering 
            ? 'translateY(-6px) scale(1) rotateX(1deg)' 
            : 'translateY(0) scale(1) rotateX(0)',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          willChange: 'transform, box-shadow',
          perspective: '1000px',
        }}
      >

        {/* Image container */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden rounded-full"
          style={{
            transition: `transform 500ms ${cubicBezier}, opacity 500ms ${cubicBezier}`,
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
  )
}

export default Profile