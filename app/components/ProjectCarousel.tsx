'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
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
        className="px-3 py-1text-sm rounded-lg bg-[var(--color-background)] text-[var(--color-text-highlight)] border border-[var(--color-divider)]"
      >
        {tag}
      </span>
    ))}
  </div>
);

const ToggleButton: React.FC<{ isExpanded: boolean; onClick: () => void }> = ({ isExpanded, onClick }) => (
  <button
    onClick={onClick}
    className="absolute cursor-pointer left-[50%] bottom-[-0px] translate-x-[-50%] p-1 rounded-full bg-[var(--color-background)] border border-[var(--color-divider)] hover:bg-[var(--color-background)]/80 transition-colors z-10 w-10 h-10 flex items-center justify-center"
    aria-label={isExpanded ? 'Collapse projects' : 'Expand projects'}
  >
    {isExpanded ? (
      <ChevronUp className="w-6 h-6 text-[var(--color-text-highlight)]" />
    ) : (
      <ChevronDown className="w-6 h-6 text-[var(--color-text-highlight)]" />
    )}
  </button>
);

const ProjectCard: React.FC<{ project: Project; isExpanded: boolean }> = ({ project, isExpanded }) => (
  <div 
    className={`rounded-lg mb-6 overflow-hidden border border-[var(--color-divider)] bg-[var(--color-foreground)] hover:border-[var(--color-text-highlight)] transition-all duration-${TRANSITION_DURATION} ease-in-out ${isExpanded ? CARD_HEIGHTS.expanded : CARD_HEIGHTS.collapsed} flex flex-col`}
  >
    <div 
      className={`relative transition-all duration-${TRANSITION_DURATION} ease-in-out ${isExpanded ? IMAGE_HEIGHTS.expanded : IMAGE_HEIGHTS.collapsed} w-full flex-shrink-0`}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-contain"
        priority={true}
      />
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
      <div className="p-6 pt-0 flex flex-col flex-grow">
        <p className="text-[var(--color-text-subtle)] mb-4 line-clamp-3">
          {project.description}
        </p>
        <ProjectTags tags={project.tags} />
      </div>
    </div>
  </div>
);

// Main Component
const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="swiper-fade-mask">
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <ProjectCard project={project} isExpanded={isExpanded} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <ToggleButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />

        <div className="swiper-button-prev !left-[-60px] !top-[50%] !translate-y-[-50%]"></div>
        <div className="swiper-button-next !right-[-60px] !top-[50%] !translate-y-[-50%]"></div>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--color-text-highlight) !important;
          background: var(--color-background);
          border: 1px solid var(--color-divider);
          width: 40px !important;
          height: 40px !important;
          border-radius: 50%;
          opacity: 1 !important;
        }
        .swiper-button-next.swiper-button-disabled,
        .swiper-button-prev.swiper-button-disabled {
          background: var(--color-foreground) !important;
          cursor: not-allowed;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }

        .swiper-fade-mask {
          position: relative;
          overflow: hidden;
          padding: 0 100px;
        }
        .swiper-fade-mask::before,
        .swiper-fade-mask::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        .swiper-fade-mask::before {
          left: 0;
          background: linear-gradient(to right, var(--color-background) 0%, transparent 100%);
        }
        .swiper-fade-mask::after {
          right: 0;
          background: linear-gradient(to left, var(--color-background) 0%, transparent 100%);
        }
        .swiper {
          overflow: visible !important;
          margin: 0 -100px !important;
        }
        .swiper-wrapper {
          overflow: visible !important;
        }
        .swiper-slide {
          opacity: 1 !important;
        }
        .swiper-slide:first-child {
          padding-left: 20px !important;
        }
      `}</style>
    </div>
  );
};

export default ProjectCarousel; 