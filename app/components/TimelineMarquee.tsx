'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Code, Rocket, Smartphone, Library, Database, Play, Pause } from 'lucide-react';

const timelineNodes = [
  { year: '2018', text: 'First Job as Front-end Developer', poligon: 'Library' },
  { year: '2019', text: 'Enrolled in IT Institute of Brazil', poligon: 'Code' },
  { year: '2020', text: 'Started first back-end project', poligon: 'Database' },
  { year: '2022', text: 'Launched first Flutter Mobile App', poligon: 'Smartphone' },
  { year: '2025', text: 'Launching of Yinflow Life', poligon: 'Rocket' },
];

// Add Present as a virtual node for the divid
const timelineWithPresent = [...timelineNodes, { present: true }];
const marqueeData = [...timelineWithPresent, ...timelineWithPresent];

function getRandomColor(seed: number) {
  const hue = (seed * 137.508) % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

const ANIMATION_SPEED = 120; // px per second
const REWIND_DURATION = 1000; // ms
const PAUSE_AFTER_REWIND = 200; // ms

function renderNode(poligon: string, color: string) {
  const size = 18;
  const strokeWidth = 2.5;
  switch (poligon) {
    case 'Library':
      return <Library size={size} strokeWidth={strokeWidth} color={color} fill="none" />;
    case 'Code':
      return <Code size={size} strokeWidth={strokeWidth} color={color} fill="none" />;
    case 'Database':
      return <Database size={size} strokeWidth={strokeWidth} color={color} fill="none" />;
    case 'Smartphone':
      return <Smartphone size={size} strokeWidth={strokeWidth} color={color} fill="none" />;
    case 'Rocket':
    default:
      return <Rocket size={size} strokeWidth={strokeWidth} color={color} fill="none" />;
  }
}

const TimelineMarquee: React.FC = () => {
  const [isContainerHovering, setIsContainerHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [isRewinding, setIsRewinding] = useState(false);
  const animationFrame = useRef<number | null>(null);
  const xRef = useRef(0);
  const rewindAnimationFrame = useRef<number | null>(null);

  // Sync ref with state for animation smoothness
  useEffect(() => {
    xRef.current = x;
  }, [x]);

  // Measure the width of one set of nodes (5 nodes + Present)
  useEffect(() => {
    if (marqueeRef.current) {
      // Only measure the first 6 nodes (5 + Present)
      const children = marqueeRef.current.children;
      let totalWidth = 0;
      for (let i = 0; i < children.length / 2; i++) {
        totalWidth += (children[i] as HTMLElement).offsetWidth;
      }
      setWidth(totalWidth);
    }
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!width) return;
    
    let lastTime = performance.now();
    let running = true;
    
    function animate(now: number) {
      if (isRewinding || isPaused) {
        animationFrame.current = requestAnimationFrame(animate);
        return;
      }
      
      const delta = now - lastTime;
      lastTime = now;
      const nextX = xRef.current - (ANIMATION_SPEED * delta) / 1000;
      
      if (nextX <= -width) {
        // Trigger rewind
        setIsRewinding(true);
        return;
      }
      
      setX(nextX);
      
      if (running) animationFrame.current = requestAnimationFrame(animate);
    }
    
    animationFrame.current = requestAnimationFrame(animate);
    
    return () => {
      running = false;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };
  }, [width, isRewinding, isPaused]);

  // Rewind effect
  useEffect(() => {
    if (!isRewinding) return;
    
    // Clean up main animation frame if it's running
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
    
    const startX = xRef.current;
    const start = performance.now();
    let running = true;
    
    function animateRewind(now: number) {
      if (!running) return;
      
      const elapsed = now - start;
      const t = Math.min(elapsed / REWIND_DURATION, 1);
      // Cubic bezier: easeInCubic (t^3)
      const eased = 1 - Math.pow(1 - t, 3);
      const newX = startX + (0 - startX) * eased;
      
      setX(newX);
      
      if (t < 1) {
        rewindAnimationFrame.current = requestAnimationFrame(animateRewind);
      } else {
        setTimeout(() => {
          setIsRewinding(false);
          setX(0);
        }, PAUSE_AFTER_REWIND);
      }
    }
    
    rewindAnimationFrame.current = requestAnimationFrame(animateRewind);
    
    return () => {
      running = false;
      if (rewindAnimationFrame.current) {
        cancelAnimationFrame(rewindAnimationFrame.current);
        rewindAnimationFrame.current = null;
      }
    };
  }, [isRewinding]);

  // Reset x if width changes
  useEffect(() => {
    setX(0);
  }, [width]);

  return (
    <div 
      className=" w-full md:max-w-md max-h-[250px] mt-16 mb-4 md:mt-0 md:mb-0 bg-foreground/90 backdrop-blur-md border border-highlight/20 rounded-xl"
      style={{
        transition: 'all 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
        transform: isContainerHovering ? 'translateY(-6px) scale(1) rotateX(1deg)' : 'translateY(0) scale(1) rotateX(0)',
        boxShadow: isContainerHovering 
          ? '0 22px 35px rgba(0,0,0,0.9), 0 12px 15px rgba(0,0,0,0.15)'
          : '8px 8px 20px rgba(0,0,0,0.50)',
        perspective: '1000px',
        zIndex: isContainerHovering ? 50 : 10
      }}
      onMouseEnter={() => setIsContainerHovering(true)}
      onMouseLeave={() => setIsContainerHovering(false)}
    >
      <h3 className="text-xl p-4 font-medium text-highlight">My Career Timeline</h3>
      
      {/* Play/Pause Button */}
      <button 
        className="absolute top-3 right-3 bg-foreground/80 backdrop-blur-sm hover:bg-highlight/10 rounded-full p-1.5 transition-all z-30"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? "Play animation" : "Pause animation"}
      >
        {isPaused ? (
          <Play size={16} className="text-highlight cursor-pointer" />
        ) : (
          <Pause size={16} className="text-highlight cursor-pointer" />
        )}
      </button>

    <div
      className="overflow-hidden relative rounded-xl py-12"
      style={{ minHeight: 120 }}
    >
      {/* Fade overlays */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 z-30" style={{background: 'linear-gradient(to right, var(--color-foreground), transparent)'}} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 z-30" style={{background: 'linear-gradient(to left, var(--color-foreground), transparent)'}} />
      {/* Timeline line */}
      <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-highlight/20 z-0" style={{ transform: 'translateY(-50%)' }} />
      <div
        className="flex gap-16 w-max relative"
        ref={marqueeRef}
        style={{ transform: `translateX(${x}px)`, transition: 'none' }}
      >
        {marqueeData.map((item, idx) => {
          if ('present' in item) {
            return (
              <div key={"present-"+idx} className="flex flex-col items-center min-w-[180px] max-w-[200px] relative justify-center" style={{ height: 65 }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-text-highlight)] bg-[var(--color-background)] px-2 rounded shadow z-20">
                  Present
                </div>
              </div>
            );
          }
          const color = getRandomColor(idx % timelineNodes.length);
          return (
            <div key={idx} className="flex flex-col items-center min-w-[180px] max-w-[200px] relative" style={{ height: 65 }}>
              {/* Year above the line */}
              <div className="mb-2 text-sm font-medium z-10" style={{ marginBottom: 12 }}>{item.year}</div>
              {/* Node centered on the line using absolute positioning, geometric shape */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}>
                {renderNode(item.poligon || '', color)}
              </div>
              {/* Text below the line */}
              <div className="mt-auto text-xs text-[var(--color-text-subtle)] max-w-[140px] mx-auto text-center" style={{ marginTop: 18 }}>{item.text}</div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default TimelineMarquee;