'use client';

import { useEffect, useRef, useState } from 'react';
import { GridBackground } from './components';

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (0-1 range)
      const normalizedX = clientX / innerWidth;
      const normalizedY = clientY / innerHeight;
      
      // Get section's bounding rectangle
      const rect = section.getBoundingClientRect();
      
      // Calculate mouse position relative to the section
      const sectionX = (clientX - rect.left) / rect.width;
      const sectionY = (clientY - rect.top) / rect.height;
      
      // Update mouse position for lighting effects - using exact section coordinates
      setMousePosition({ 
        x: Math.max(0, Math.min(1, sectionX)), 
        y: Math.max(0, Math.min(1, sectionY)) 
      });
      
      // Calculate rotation based on mouse position relative to the center of the screen
      // Limit rotation to a reasonable range (-7 to 7 degrees)
      const rotateY = 7 * (normalizedX - 0.5) * 2; 
      const rotateX = -7 * (normalizedY - 0.5) * 2;
      
      // Apply the transformation
      section.style.transform = `
        perspective(1200px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;
    };
    
    // Reset when mouse leaves
    const handleMouseLeave = () => {
      section.style.transform = `
        perspective(1200px) 
        rotateX(0deg) 
        rotateY(0deg)
      `;
      section.style.transition = 'transform 0.5s ease-out';
      setMousePosition({ x: 0.5, y: 0.5 }); // Center the light
    };
    
    // Ensure smooth movement when mouse enters
    const handleMouseEnter = () => {
      section.style.transition = 'transform 0.1s ease-out';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  // Calculate dynamic lighting angles based on mouse position
  const lightingStyles = {
    '--light-position-x': `${mousePosition.x * 100}%`,
    '--light-position-y': `${mousePosition.y * 100}%`,
    '--light-distance': '300px', // Much shorter distance for falloff
    '--light-opacity': '0.05', // Even more subtle opacity
  } as React.CSSProperties;
  
  return (
    <main 
      className="flex flex-col items-center justify-center h-screen bg-deep-background"
      style={{
        ...lightingStyles,
        backgroundImage: 'url(/assets/bghero.webp)',
        backgroundSize: 'contain',
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <section 
        ref={sectionRef}
        className="w-[90%] md:w-[75%] h-full md:h-[75%] border border-divider bg-foreground rounded-xl
          shadow-[0_20px_50px_rgba(0,0,0,0.7)]
          transition-transform duration-100 ease-out
          relative
          before:absolute before:inset-0 before:rounded-xl before:pointer-events-none
          before:bg-[radial-gradient(circle_50px_at_var(--light-position-x)_var(--light-position-y),rgba(255,255,255,var(--light-opacity))_0%,transparent_var(--light-distance))]
          before:blur-[8px]
        "
      >
        {/* Outer texture */}
        <div className="absolute inset-0 rounded-xl opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E\")",
            backgroundSize: '150px 150px',
          }}
        />
        
        <div className="w-full h-full p-10 relative z-10">
          <GridBackground>
            <div className="w-full h-full p-8">
              <h1 className="text-4xl font-bold text-white">Hello World</h1>
              {/* Add your content here */} 
            </div>
          </GridBackground>
        </div>
      </section>
    </main>
  );
}
