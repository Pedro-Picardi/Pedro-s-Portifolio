'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ChevronDown, ChevronUp, ImageOff } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';

// Types
type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
};

type ProjectCarouselProps = {
  projects: Project[];
};

// Constants
const TRANSITION_DURATION = 500;
const IMAGE_HEIGHTS = {
  expanded: 'h-48',
  collapsed: 'h-32',
} as const;

const CARD_HEIGHTS = {
  expanded: 'h-[450px]',
  collapsed: 'h-[200px]',
} as const;

// Components
const ProjectLinks: React.FC<{ githubUrl?: string; liveUrl?: string }> = ({ githubUrl, liveUrl }) => (
  <div className="flex gap-2">
    {githubUrl && (
      <Link
        href={githubUrl}
        target="_blank"
        className="p-2 rounded-lg hover:bg-[var(--color-background)] transition-colors"
        aria-label="View on GitHub"
      >
        <Github className="w-5 h-5" />
      </Link>
    )}
    {liveUrl && (
      <Link
        href={liveUrl}
        target="_blank"
        className="p-2 rounded-lg hover:bg-[var(--color-background)] transition-colors"
        aria-label="View live project"
      >
        <ExternalLink className="w-5 h-5" />
      </Link>
    )}
  </div>
);

const ProjectTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mt-auto">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="px-2 py-1 text-xs rounded-lg bg-[var(--color-grey)] text-[var(--color-text-highlight)] border border-[var(--color-divider)]"
      >
        {tag}
      </span>
    ))}
  </div>
);

const ToggleButton: React.FC<{ isExpanded: boolean; onClick: () => void }> = ({ isExpanded, onClick }) => (
  <button
    onClick={onClick}
    className="absolute cursor-pointer left-[50%] bottom-[-0px] translate-x-[-50%] p-1 rounded-full bg-[var(--color-background)]/20 backdrop-blur-3xl transition-colors z-10 w-10 h-10 flex items-center justify-center"
    aria-label={isExpanded ? 'Collapse projects' : 'Expand projects'}
  >
    {isExpanded ? (
      <ChevronUp className="w-6 h-6 text-[var(--color-text-highlight)]" />
    ) : (
      <ChevronDown className="w-6 h-6 text-[var(--color-text-highlight)]" />
    )}
  </button>
);

const ProjectCard: React.FC<{ project: Project; isExpanded: boolean }> = ({ project, isExpanded }) => {
  const [imageError, setImageError] = useState(false);
  
  // Log the image path for debugging
  console.log(`Rendering image: ${project.title} - ${project.image}`);
  
  return (
    <div 
      className={`rounded-lg mb-6 overflow-hidden border border-highlight/20 bg-[var(--color-foreground)]/10 backdrop-blur-3xl hover:border-[var(--color-text-highlight)] transition-all duration-${TRANSITION_DURATION} ease-in-out ${isExpanded ? CARD_HEIGHTS.expanded : CARD_HEIGHTS.collapsed} flex flex-col`}
    >
      <div 
        className={`relative transition-all duration-${TRANSITION_DURATION} ease-in-out ${isExpanded ? IMAGE_HEIGHTS.expanded : IMAGE_HEIGHTS.collapsed} w-full flex-shrink-0 bg-transparent flex items-center justify-center`}
      >
        {imageError ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <ImageOff className="w-10 h-10 text-[var(--color-text-subtle)]" />
            <span className="text-xs text-[var(--color-text-subtle)] mt-2">Image not found</span>
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain p-6"
            priority={true}
            onError={() => {
              console.error(`Failed to load image: ${project.image}`);
              setImageError(true);
            }}
          />
        )}
      </div>

      <div className="p-4 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-[var(--color-text-highlight)]">
          {project.title}
        </h3>
        <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
      </div>

      <div 
        className={`transition-all duration-${TRANSITION_DURATION} ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
      >
        <div className="p-4 pt-0 flex flex-col flex-grow">
          <p className="text-sm text-[var(--color-text-subtle)] mb-4">
            {project.description}
          </p>
          <ProjectTags tags={project.tags} />
        </div>
      </div>
    </div>
  );
};

// Main Component
const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative w-full h-full">
        <Swiper
          modules={[A11y, Navigation]}
          spaceBetween={12}
          slidesPerView={1}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="!w-full !pb-6 project-carousel"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard project={project} isExpanded={isExpanded} />
            </SwiperSlide>
          ))}
        </Swiper>

        <ToggleButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />


      <style jsx global>{`
        .project-carousel {
          position: relative;
          width: 100%;
          overflow: visible !important;
        }
        .swiper-wrapper {

        }
        .swiper-slide {
        }
        
        .swiper-button-disabled {
          color: var(--color-highlight)/40 !important;
          cursor: not-allowed;
          background-color: var(--color-background)/80;
          backdrop-filter: blur(10px);
        }
        
        .swiper-button-prev{
          width: 44px !important;
          height: 44px !important;
          position: absolute;
          top: 50%;
          left: -44px;
          right: auto;
          border-radius: 50%;
          background-color: var(--color-background)/80;
          backdrop-filter: blur(10px);
          color: var(--color-highlight) !important;
          transition: all 0.3s ease;
        }
        .swiper-button-next {
          width: 44px !important;
          height: 44px !important;
          position: absolute;
          top: 50%;
          right: -44px;
          border-radius: 50%;
          background-color: var(--color-background)/80;
          backdrop-filter: blur(10px);
          color: var(--color-highlight) !important;
          transition: all 0.3s ease;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: var(--color-background)/80;
        }
        
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 18px !important;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ProjectCarousel; 