"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

interface ProjectProps {
  title: string;
  description: string;
  imageSrc: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const defaultProject: ProjectProps = {
  title: "Yinflow.Life",
  description: "A comprehensive productivity suite built with React, Node.js, and MongoDB. This application features real-time collaboration, task management, and integrated chat functionality.",
  imageSrc: "/assets/yinflow_app_cover.png",
  technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
  demoUrl: "https://example.com/project",
  githubUrl: "https://github.com/username/project"
};

const FeaturedProject = ({ 
  title = defaultProject.title,
  description = defaultProject.description,
  imageSrc = defaultProject.imageSrc,
  technologies = defaultProject.technologies,
  demoUrl = defaultProject.demoUrl,
  githubUrl = defaultProject.githubUrl
}: Partial<ProjectProps>) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      transition: `all 400ms ${cubicBezier}`,
      transform: isModalOpen && !isMobile
        ? 'translate(-50%, -50%)' 
        : isHovering && !isModalOpen
          ? 'translateY(-6px) scale(1) rotateX(1deg)'
          : isModalOpen && isMobile
            ? 'none'
            : 'translateY(0) scale(1) rotateX(0)',
      boxShadow: isModalOpen
        ? '0 30px 60px rgba(0,0,0,0.3), 0 15px 20px rgba(0,0,0,0.2)'
        : isHovering
          ? '0 22px 35px rgba(0,0,0,0.9), 0 12px 15px rgba(0,0,0,0.15)'
          : '8px 8px 20px rgba(0,0,0,0.50)',
      transformOrigin: 'center center',
      backfaceVisibility: 'hidden',
      willChange: 'transform, box-shadow, opacity',
      perspective: '1000px',
      zIndex: isModalOpen ? 50 : isHovering ? 50 : 10,
    } satisfies CSSProperties,
    
    animated: (delay = 0) => ({
      transition: `transform 500ms ${cubicBezier}, opacity 500ms ${cubicBezier}`,
      transitionDelay: `${delay}ms`,
      opacity: isAnimating ? 0.9 : 1,
      transform: isAnimating ? 'translateY(4px)' : 'translateY(0)'
    }),
    
    description: {
      transition: `transform 500ms ${cubicBezier}, opacity 500ms ${cubicBezier}`,
      transitionDelay: '200ms',
      opacity: isModalOpen ? 1 : 0,
      transform: isModalOpen ? 'translateY(0)' : 'translateY(10px)'
    }
  };

  const cardClasses = `
    ${isModalOpen 
      ? isMobile
        ? 'sticky top-5 left-0 right-0 mx-auto z-50 w-[90%] max-h-[90vh] overflow-y-auto'
        : 'fixed top-1/2 left-1/2 z-50 w-[80%] max-w-xl max-h-[90vh] overflow-y-auto'
      : 'static md:absolute md:top-5 md:left-5'
    } 
    flex flex-col items-left justify-center
    bg-foreground backdrop-blur-md border border-highlight/20 rounded-xl p-4 gap-4 
    ${!isModalOpen ? 'cursor-pointer' : ''} 
    overflow-hidden
  `;
  
  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-md z-40 overflow-hidden"
        onClick={() => toggleModal(false)}
        style={styles.backdrop}
      />
      
      {/* Featured project card */}
      <div 
        className={cardClasses}
        style={styles.card}
        onMouseEnter={() => !isModalOpen && !isAnimating && setIsHovering(true)}
        onMouseLeave={() => !isModalOpen && !isAnimating && setIsHovering(false)}
        onClick={() => !isModalOpen && toggleModal(true)}
      >
        {/* Header */}
        <div 
          className="flex justify-between items-center"
          style={styles.animated(150)}
        >
          <h3 className="text-xl font-medium text-highlight">Featured Project</h3>
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
        
        {/* Project Image */}
        <div 
          style={styles.animated(50)}
          onClick={(e) => {
            if (!isModalOpen) {
              e.stopPropagation();
              toggleModal(true);
            }
          }}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={350}
            height={400}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Project description - only shown in modal */}
        {isModalOpen && (
          <div 
            className="mt-4 space-y-4"
            style={styles.description}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-bold text-highlight">{title}</h4>
            <p className="text-highlight/80">{description}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs bg-highlight/10 text-highlight/90 text-semibold rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-start gap-4 pt-2">
              {demoUrl && (
                <Link 
                  href={demoUrl}
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-highlight hover:text-highlight/80 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </Link>
              )}
              
              {githubUrl && (
                <Link 
                  href={githubUrl}
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-highlight hover:text-highlight/80 transition-colors"
                >
                  <Github size={16} />
                  <span>Source Code</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturedProject;
