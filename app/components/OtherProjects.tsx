"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { CSSProperties } from "react";
import ProjectCarousel from './ProjectCarousel';

// Project type definition
type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
};

// API Project type (matches the structure in the API)
type ApiProject = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
};

const OtherProjects = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      if (isModalOpen && projects.length === 0) {
        setIsLoading(true);
        try {
          const response = await fetch('/api/projects');
          const data = await response.json() as ApiProject[];
          
          // Debug log
          console.log('Original projects data:', data);
          
          // Use projects directly since image paths are now correctly formatted in the API
          setProjects(data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();
  }, [isModalOpen, projects.length]);

  // Handle window resize and set mobile state
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleModal = (open: boolean) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsModalOpen(open);
    if (open) setIsHovering(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [isModalOpen]);

  // Animation and style constants
  const cubicBezier = 'cubic-bezier(0.33, 1, 0.68, 1)';
  
  // Dynamic style objects
  const styles = {
    backdrop: {
      transition: `all 500ms ${cubicBezier}`,
      opacity: isModalOpen ? 1 : 0,
      pointerEvents: isModalOpen ? 'auto' : 'none' as 'auto' | 'none'
    },
    
    card: {
      transition: `all 500ms ${cubicBezier}`,
      transform: isModalOpen && !isMobile
        ? 'translate(-50%, -50%) scale(1.02)'
        : isHovering && !isModalOpen
          ? 'translateY(-6px) scale(1.01) rotateX(1deg)'
          : isModalOpen && isMobile
            ? 'scale(1)'
            : 'translateY(0) scale(1) rotateX(0)',
      boxShadow: isModalOpen
        ? '0 40px 80px rgba(0,0,0,0.4), 0 25px 30px rgba(0,0,0,0.3)'
        : isHovering
          ? '0 22px 35px rgba(0,0,0,0.9), 0 12px 15px rgba(0,0,0,0.15)'
          : '8px 8px 20px rgba(0,0,0,0.50)',
      transformOrigin: 'center center',
      backfaceVisibility: 'hidden',
      willChange: 'transform, box-shadow, opacity',
      perspective: '1000px',
      zIndex: isModalOpen ? 50 : isHovering ? 20 : 10,
    } satisfies CSSProperties,
    
    animated: (delay = 0) => ({
      transitionProperty: 'transform, opacity',
      transitionDuration: '600ms',
      transitionTimingFunction: cubicBezier,
      transitionDelay: `${delay}ms`,
      opacity: isAnimating ? 0.5 : 1,
      transform: isAnimating ? 'translateY(8px)' : 'translateY(0)'
    }),
    
    description: {
      transitionProperty: 'transform, opacity',
      transitionDuration: '600ms',
      transitionTimingFunction: cubicBezier,
      transitionDelay: '100ms',
      opacity: isModalOpen ? 1 : 0,
      transform: isModalOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)'
    }
  };

  const cardClasses = `
    ${isModalOpen 
      ? isMobile
        ? 'sticky top-5 left-0 right-0 mx-auto z-50 w-[90%] max-h-[90vh] overflow-y-auto'
        : 'fixed top-1/2 left-1/2 z-50 max-w-3xl max-h-[90vh] overflow-y-auto'
      : 'static md:absolute md:bottom-0 md:left-0 w-full'
    } 
    flex flex-col items-center justify-center
    bg-foreground backdrop-blur-md border border-highlight/20 rounded-xl p-4 gap-4 
    ${!isModalOpen ? 'cursor-pointer' : ''} 
    overflow-hidden
    ${isModalOpen ? 'shadow-2xl' : ''}
  `;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-md z-40 overflow-hidden"
        onClick={() => toggleModal(false)}
        style={styles.backdrop}
      />
      
      {/* Other Projects card */}
      <div 
        className={cardClasses}
        style={styles.card}
        onMouseEnter={() => !isModalOpen && !isAnimating && setIsHovering(true)}
        onMouseLeave={() => !isModalOpen && !isAnimating && setIsHovering(false)}
        onClick={() => !isModalOpen && toggleModal(true)}
      >
        {/* Header */}
        <div 
          className="flex justify-between items-center w-full"
          style={styles.animated(150)}
        >
          <h1 className="text-2xl font-bold text-highlight">Other Projects</h1>
          {isModalOpen && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleModal(false);
              }}
              className="text-highlight cursor-pointer hover:text-highlight/80 transition-colors p-1.5 hover:bg-highlight/10 rounded-full"
              aria-label="Close modal"
            >
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </div>
        
        {/* Modal description content - only shown when modal is open */}
        {isModalOpen && (
          <div 
            className="w-full mt-4 space-y-6"
            style={styles.description}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-highlight"></div>
              </div>
            ) : projects.length > 0 ? (
              <ProjectCarousel projects={projects} />
            ) : (
              <p className="text-highlight/80 text-lg text-center py-6">No projects found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OtherProjects;