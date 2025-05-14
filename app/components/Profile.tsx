'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import confetti from 'canvas-confetti'
import { useMediaQuery } from '@/app/hooks/useMediaQuery'

// Text data configuration
const TEXT_ELEMENTS = [
  { 
    text: "Pedro Picardi", 
    delay: 0, 
    className: "text-[1.75rem] font-black text-white", 
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

// CSS for marquee animation
const marqueeCSS = `
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - 0px)); }
}

@keyframes marquee-mobile {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - 0px)); }
}

.language-marquee {
  position: relative;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent 100%);
  overflow: hidden;
}

.language-track {
  display: flex;
  will-change: transform;
  animation: marquee 35s linear infinite;
  width: max-content;
}

@media (max-width: 768px) {
  .language-track {
    animation: marquee-mobile 25s linear infinite;
  }
}

.language-track:hover {
  animation-play-state: paused;
}

.language-item {
  flex-shrink: 0;
  padding: 0 16px;
}
`;

// MarqueeLanguages component for cleaner implementation
const MarqueeLanguages = ({ languages }: { languages: typeof TEXT_ELEMENTS }) => {
  return (
    <div className="w-full max-w-[280px] mt-3 language-marquee">
      <div className="language-track">
        {/* First set of languages */}
        {languages.map((item, index) => (
          <div 
            key={`lang-1-${index}`}
            className={`${item.className} font-medium language-item`}
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            {item.text}
          </div>
        ))}
        
        {/* Duplicate set for continuous scrolling */}
        {languages.map((item, index) => (
          <div 
            key={`lang-2-${index}`}
            className={`${item.className} font-medium language-item`}
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            {item.text}
          </div>
        ))}
        
        {/* Third set to ensure smooth looping */}
        {languages.map((item, index) => (
          <div 
            key={`lang-3-${index}`}
            className={`${item.className} font-medium language-item`}
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  // Media query for responsive behavior
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [orbitAngles, setOrbitAngles] = useState({ email: 45, whatsapp: 25 });
  const [hoveredSphere, setHoveredSphere] = useState<string | null>(null);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Shadow style for the glass sphere
  const sphereShadow = isHovering
    ? `0 22px 35px rgba(0,0,0,0.9), 0 12px 15px rgba(0,0,0,0.15)`
    : `8px 8px 20px rgba(0,0,0,0.50)`;
  
  // Handle mouse tracking with requestAnimationFrame for smoother updates
  useEffect(() => {
    if ((!isHovering && !isDragging) || !containerRef.current) return;
    
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        setSliderPosition(Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100)));
      });
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !isDragging) return;
      
      // Prevent scrolling when dragging
      e.preventDefault();
      
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        setSliderPosition(Math.max(0, Math.min(100, ((touch.clientX - left) / width) * 100)));
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering, isDragging]);
  
  // Handle touch end event to stop dragging
  useEffect(() => {
    const handleTouchEnd = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  // Reset animation state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), ANIMATION_RESET_DELAY);
    return () => clearTimeout(timer);
  }, [isHovering]);

  // Orbit animation - only run when no sphere is hovered
  useEffect(() => {
    if (hoveredSphere || (!isHovering && !isMobile)) return;
    
    const orbitInterval = setInterval(() => {
      setOrbitAngles(prev => ({
        email: (prev.email + 1) % 360,
        whatsapp: (prev.whatsapp + 1) % 360
      }));
    }, 50);
    
    return () => clearInterval(orbitInterval);
  }, [hoveredSphere, isHovering, isMobile]);

  // Handler for mouse events
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
      setIsAnimating(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setSliderPosition(0);
      setIsHovering(false);
      setIsAnimating(true);
    }
  };
  
  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      setIsDragging(true);
      const { left, width } = containerRef.current!.getBoundingClientRect();
      const touch = e.touches[0];
      setSliderPosition(Math.max(0, Math.min(100, ((touch.clientX - left) / width) * 100)));
    }
  };

  // Handler for copy email to clipboard
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("pduayer@gmail.com");
    setIsEmailCopied(true);
    setIsTooltipOpen(true);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setIsEmailCopied(false);
      setIsTooltipOpen(false);
    }, 2000);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Handler for WhatsApp redirect
  const redirectToWhatsApp = () => {
    window.open("https://wa.me/5561985451997", "_blank");
  };

  // Render an orbiting sphere
  const renderOrbitingSphere = (type: 'email' | 'whatsapp') => {
    const radius = 136; // Distance from center of main sphere
    const angleInRadians = (orbitAngles[type] * Math.PI) / 180;
    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians);
    const isHovered = hoveredSphere === type;
    
    const commonStyles = {
      width: '36px',
      height: '36px',
      top: '50%',
      left: '50%',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isHovered ? 1.2 : 1})`,
      boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.3)',
      zIndex: 20,
      transition: 'transform 200ms ease, box-shadow 300ms ease',
    };

    if (type === 'email') {
      return (
        <TooltipProvider key="email-sphere">
          <Tooltip 
            delayDuration={200} 
            open={isEmailCopied || (isTooltipOpen && hoveredSphere === 'email')}
            onOpenChange={(open) => {
              // Only allow closing tooltip if email is not copied
              if (!isEmailCopied) {
                setIsTooltipOpen(open);
              }
            }}
          >
            <TooltipTrigger asChild>
              <div 
                className="absolute rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center border border-highlight/20 hover:border-highlight/60 cursor-pointer"
                style={commonStyles}
                onMouseEnter={() => {
                  setHoveredSphere('email');
                  if (!isEmailCopied) {
                    setIsTooltipOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredSphere(null);
                  if (!isEmailCopied) {
                    setIsTooltipOpen(false);
                  }
                }}
                onClick={copyEmailToClipboard}
              >
                <Mail size={20} className="text-white/90" />
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side="top"
              className="bg-background/30 backdrop-blur-3xl border border-highlight/20 text-white text-xs px-3 py-1.5 rounded-md"
            >
              {isEmailCopied ? (
                <span className="flex items-center gap-1">
                  <span className="text-green-400">✓</span> Email copied!
                </span>
              ) : (
                <>Click to copy e-mail <span className="font-silkamono text-accent tracking-[-1px] font-bold">pduayer@gmail.com</span></>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else {
      return (
        <TooltipProvider key="whatsapp-sphere">
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div 
                className="absolute rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center border border-highlight/20 hover:border-highlight/60 cursor-pointer"
                style={commonStyles}
                onMouseEnter={() => setHoveredSphere('whatsapp')}
                onMouseLeave={() => setHoveredSphere(null)}
                onClick={redirectToWhatsApp}
              >
                <Phone size={20} className="text-white/90" />
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side="top"
              className="bg-background/30 backdrop-blur-3xl border border-highlight/20 text-white text-xs px-3 py-1.5 rounded-md"
            >
              Click to chat on WhatsApp
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  };

  // Render the sphere component with comparison slider
  const renderSphere = () => (
    <div 
      ref={containerRef}
      className="relative w-[280px] h-[280px] mx-auto md:mx-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      style={{ touchAction: isDragging ? 'none' : 'auto' }}
    >
      <div 
        id='sphere' 
        className="absolute inset-0 rounded-full bg-gradient-to-br border-1 border-highlight/20 from-gray-900/30 to-black/20 backdrop-blur-xl overflow-hidden"
        style={{
          boxShadow: sphereShadow,
          transition: `all 400ms ${CUBIC_BEZIER}`,
          transform: isHovering && !isMobile
            ? 'translateY(-6px) scale(1) rotateX(1deg)' 
            : 'translateY(0) scale(1) rotateX(0)',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          willChange: 'transform, box-shadow',
          perspective: '1000px',
          zIndex: 10,
        }}
      >
        <div data-name="sphere-base"
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
          
          {/* Comparison effect (only when hovering on desktop or after touch on mobile) */}
          {(isHovering || isDragging || isMobile) && (
            <>
              {/* Regular image with dynamic clip path - on mobile, only show when dragging */}
              <div 
                className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                style={{
                  clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                  transition: 'none',
                  opacity: isMobile && !isDragging ? 0 : 1 // Hide on mobile when not dragging
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
              
              {/* Divider line - only show when actually comparing images */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-white/40 z-10 will-change-[left]"
                style={{ 
                  left: `${sliderPosition}%`,
                  transition: 'none',
                  boxShadow: '0 0 8px 1px rgba(255,255,255,0.7)',
                  opacity: isMobile && !isDragging ? 0 : 1 // Hide on mobile when not dragging
                }}
              />
            </>
          )}
        </div>
      </div>
      {renderOrbitingSphere('email')}
      {renderOrbitingSphere('whatsapp')}
      
      {isMobile && (
        <div className="absolute w-fit -bottom-10 left-0 right-0 mx-auto p-1 px-2 text-subtle text-xs text-center bg-background/20 backdrop-blur-sm rounded-full border border-highlight/20 opacity-80">
          Drag left/right to reveal photo
        </div>
      )}
    </div>
  );

  // Render the text elements that emerge from behind the sphere on desktop
  // or display in a flex container below the sphere on mobile
  const renderTextElements = () => {
    if (isMobile) {
      // Extract main elements and language elements
      const mainElements = TEXT_ELEMENTS.slice(0, 2); // Name and job title
      const languageElements = TEXT_ELEMENTS.slice(2); // Languages
      
      return (
        <div className="flex flex-col items-center md:mt-12 mt-6 space-y-3 w-full">
          {/* Main elements (name and title) */}
          {mainElements.map((item, index) => (
            <div 
              key={index}
              className={`${item.className} font-medium text-center`}
              style={{ 
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: index === 0 ? '1.3' : '1.2'
              }}
            >
              {item.text}
            </div>
          ))}
          
          {/* Languages with marquee effect */}
          <MarqueeLanguages languages={languageElements} />
        </div>
      );
    }
    
    // Desktop layout remains unchanged
    return (
      <div className="absolute top-0 left-0 h-full w-full gap-0" style={{ zIndex: 1 }}>
        {TEXT_ELEMENTS.map((item, index) => (
          <div 
            key={index}
            className="absolute whitespace-nowrap"
            style={{
              ...item.style,
              left: '130px', 
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
  };
  
  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{ __html: marqueeCSS }} />
      <div className={`relative ${isMobile ? 'flex flex-col items-center' : ''}`}>
        <div className={`${isMobile ? 'pt-6 pb-8 relative' : ''}`}>
          {renderSphere()}
        </div>
        {renderTextElements()}
      </div>
    </div>
  );
};

export default Profile