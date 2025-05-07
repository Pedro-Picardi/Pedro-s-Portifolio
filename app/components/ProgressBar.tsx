"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";

interface ProgressBarItemProps {
  label: string;
  percent: number;
  color: string;
  inView: boolean;
}

const SEGMENTS = 44;
const SEGMENT_ARRAY = Array.from({ length: SEGMENTS });

// Individual progress bar item
const ProgressBarItem: React.FC<ProgressBarItemProps> = ({
  label,
  percent,
  color,
  inView,
}) => {
  const filled = useMemo(
    () => (inView ? Math.round((percent / 100) * SEGMENTS) : 0),
    [percent, inView]
  );

  return (
    <div className="my-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-[var(--color-text-highlight)]">
          {label}
        </span>
        <span className="text-xs font-semibold text-[var(--color-text-subtle)]">
          {percent}%
        </span>
      </div>
      <div className="flex gap-[4px] h-4 items-end">
        {SEGMENT_ARRAY.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-700"
            style={{
              width: 5,
              height: inView
                ? `${Math.min(100, 40 + (i < filled ? 60 : 0))}%`
                : "40%",
              borderRadius: 2,
              background: i < filled ? color : "var(--color-divider)",
              opacity: i < filled ? 1 : 0.3,
              transitionDelay: inView ? `${i * 15}ms` : "0ms",
              transform:
                inView && i < filled ? "translateY(0)" : "translateY(3px)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Main container component that doesn't require props
const ProgressBar: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Set up intersection observer to trigger animations when component is in view
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  // Predefined skills
  const skills = [
    {
      label: "JavaScript, TypeScript, React, Next.js, Tailwind",
      percent: 89,
      color: "#78a081",
    },
    {
      label: "Flutter, Dart, iOS/Android Mobile Deployment",
      percent: 72,
      color: "#2f7a40",
    },
    {
      label: "Node.js, PostgreSQL, Supabase, Firebase",
      percent: 75,
      color: "#65743a",
    },
  ];

  return (
    <div
      ref={ref}
      className=" w-full md:max-w-md max-w-min bg-foreground/90 backdrop-blur-md border border-highlight/20 rounded-xl p-4"
      style={{
        transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
        transform: isHovering
          ? "translateY(-6px) scale(1) rotateX(1deg)"
          : "translateY(0) scale(1) rotateX(0)",
        boxShadow: isHovering
          ? "0 22px 35px rgba(0,0,0,0.9), 0 12px 15px rgba(0,0,0,0.15)"
          : "8px 8px 20px rgba(0,0,0,0.50)",
        perspective: "1000px",
        zIndex: isHovering ? 50 : 10,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h3 className="text-xl font-medium text-highlight">My Skills</h3>
      {skills.map((skill) => (
        <ProgressBarItem key={skill.label} {...skill} inView={inView} />
      ))}
    </div>
  );
};

export default ProgressBar;
