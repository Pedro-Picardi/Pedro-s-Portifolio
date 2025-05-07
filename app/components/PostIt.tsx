'use client'
import React, { useState } from 'react'

type PostItProps = {
  className?: string;
}

export const PostIt = ({ className = '' }: PostItProps) => {
  // Replace individual states with a single active post-it state
  const [activePostIt, setActivePostIt] = useState<number | null>(null);

  const togglePostIt = (index: number) => {
    // If clicking the currently active post-it, deactivate it
    if (activePostIt === index) {
      setActivePostIt(null);
    } else {
      setActivePostIt(index);
    }
  };

  return (
    <div className={`${className}`}>
      {/* First Post-it */}
      <div className={`md:max-w-min group bg-grey relative md:-translate-x-20 transition-all ${activePostIt === 0 ? 'z-30' : 'z-10 hover:z-20'}`}>
        <div 
          className={`w-full md:w-[240px] min-h-[240px] p-4 bg-grey border border-highlight/20 rounded-lg text-highlight font-serif italic transform transition-all duration-300 ease-in-out cursor-pointer
          ${activePostIt === 0 
            ? "-rotate-12 scale-105 shadow-[12px_12px_30px_rgba(0,0,0,0.8)]" 
            : "-rotate-0 hover:-rotate-12 hover:scale-105 shadow-[0px_4px_30px_rgba(0,0,0,0.70)] hover:shadow-[12px_12px_30px_rgba(0,0,0,0.8)]"
          }`}
          onClick={() => togglePostIt(0)}
        >
          <div className="relative text-sm leading-snug">
            <p className="font-medium">
              Specialized in crafting digital 
              products like ur{' '}
              <Highlight isClicked={activePostIt === 0}>mobile apps</Highlight> and{' '}
              <Highlight isClicked={activePostIt === 0}>websites</Highlight>
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-5 pointer-events-none mix-blend-multiply"></div>
      </div>

      {/* Second Post-it - placed below and slightly askew */}
      <div className={`md:max-w-min group relative -translate-y-30 md:-translate-y-20 md:translate-x-0 transition-all ${activePostIt === 1 ? 'z-30' : 'z-10 hover:z-20'}`}>
        <div 
          className={`w-full md:w-[240px] min-h-[240px] p-4 bg-grey border border-highlight/20 rounded-lg text-highlight font-serif italic transform transition-all duration-300 ease-in-out cursor-pointer
          ${activePostIt === 1 
            ? "-rotate-12 scale-105 shadow-[12px_12px_30px_rgba(0,0,0,0.8)]" 
            : "rotate-0 hover:-rotate-12 hover:scale-105 shadow-[4px_-8px_30px_rgba(0,0,0,0.70)] hover:shadow-[12px_12px_30px_rgba(0,0,0,0.8)]"
          }`}
          onClick={() => togglePostIt(1)}
        >
          <div className="relative text-sm leading-snug">
            <p className="font-medium">
              Designing digital product 
              experiences in last{' '}
              <Highlight isClicked={activePostIt === 1}>4 years</Highlight>
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-5 pointer-events-none mix-blend-multiply"></div>
      </div>
    </div>
  )
}

// Highlight component to wrap text that should be highlighted on hover
// Define explicit props type including children
type HighlightProps = { 
  className?: string; 
  children: React.ReactNode;
  isClicked?: boolean;
}

export const Highlight = ({ className = '', children, isClicked = false }: HighlightProps) => (
  <span className={`inline-block px-1 bg-transparent transition-colors duration-300 ${isClicked ? 'bg-white text-black' : 'group-hover:bg-white group-hover:text-black'} ${className}`}>
    {children}
  </span>
)