"use client";

import React, { useEffect, useRef, useState } from "react";

interface Card3DEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function Card3DEffect({ children, className = "" }: Card3DEffectProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;

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
        y: Math.max(0, Math.min(1, sectionY)),
      });

      // Calculate rotation based on mouse position relative to the center of the screen
      // Limit rotation to a reasonable range (-7 to 7 degrees)
      const rotateY = 7 * (normalizedX - 0.5) * 2;
      const rotateX = -7 * (normalizedY - 0.5) * 2;

      // Apply the transformation
      section.style.transform = `
        perspective(6000px) 
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
      section.style.transition = "transform 0.5s ease-out";
      setMousePosition({ x: 0.5, y: 0.5 }); // Center the light
    };

    // Ensure smooth movement when mouse enters
    const handleMouseEnter = () => {
      section.style.transition = "transform 0.1s ease-out";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile]);

  // Calculate dynamic lighting angles based on mouse position
  const lightingStyles = {
    "--light-position-x": `${mousePosition.x * 100}%`,
    "--light-position-y": `${mousePosition.y * 100}%`,
    "--light-distance": "300px", // Much shorter distance for falloff
    "--light-opacity": isMobile ? "0" : "0.05", // Disable lighting effect on mobile
  } as React.CSSProperties;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`w-[95%] md:w-[75%] max-w-[1500px] max-h-[880px] h-full md:h-[100%] border border-divider bg-background/80 backdrop-blur-3xl rounded-xl
        ${!isMobile ? `shadow-[0_20px_50px_rgba(0,0,0,0.7)]
        transition-transform duration-100 ease-out
        relative
        before:absolute before:inset-0 before:rounded-xl before:pointer-events-none
        before:bg-[radial-gradient(circle_50px_at_var(--light-position-x)_var(--light-position-y),rgba(255,255,255,var(--light-opacity))_0%,transparent_var(--light-distance))]
        before:blur-[8px]` : 'shadow-lg'}
        ${className}`}
      style={lightingStyles}
    >
      <div className="w-full h-full p-4 md:p-7 relative z-10">{children}</div>
    </section>
  );
}
