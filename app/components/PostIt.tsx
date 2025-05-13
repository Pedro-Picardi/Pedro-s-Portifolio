"use client";
import React, { useState } from "react";
import { Quote } from "lucide-react";

type PostItProps = {
  className?: string;
};

export const PostIt = ({ className = "" }: PostItProps) => {
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
      <div
        className={`md:max-w-min group bg-grey relative md:-translate-x-20 transition-all ${
          activePostIt === 0 ? "z-30" : "z-11 hover:z-20"
        }`}
      >
        <div
          className={`w-full md:w-[240px] min-h-[240px] p-4 bg-grey border border-highlight/20 rounded-lg transition-all duration-300 ease-in-out cursor-pointer
          ${
            activePostIt === 0
              ? "text-highlight -rotate-12 scale-105 shadow-[12px_12px_30px_rgba(0,0,0,0.8)]"
              : "text-highlight/20 -rotate-0 hover:-rotate-12 hover:scale-105 shadow-[0px_4px_30px_rgba(0,0,0,0.70)] hover:shadow-[12px_12px_30px_rgba(0,0,0,0.8)] group-hover:text-highlight"
          } transform font-serif`}
          onClick={() => togglePostIt(0)}
        >
          <div className="relative text-xl">
            <p className="font-medium transition-colors duration-200">
              Hey there! Since 2018 I&apos;ve been architecting, building and shipping software.
              As a detail-oriented, fast-paced and full-stack developer,
              I can build top-tier{" "}
              <Highlight isClicked={activePostIt === 0}>
                Native Mobile
              </Highlight>{" "}
              and <Highlight isClicked={activePostIt === 0}>Web Apps</Highlight>
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-5 pointer-events-none mix-blend-multiply"></div>
      </div>

      {/* Second Post-it - placed below and slightly askew */}
      <div
        className={`md:max-w-min group relative -translate-y-30 md:-translate-y-40 md:translate-x-0 transition-all ${
          activePostIt === 1 ? "z-30" : "z-10 hover:z-20"
        }`}
      >
        <div
          className={`w-full md:w-[240px] min-h-[240px] p-4 bg-grey border border-highlight/20 rounded-lg transition-all duration-300 ease-in-out cursor-pointer
          ${
            activePostIt === 1
              ? "text-highlight -rotate-12 scale-105 shadow-[12px_12px_30px_rgba(0,0,0,0.8)]"
              : "text-highlight/20 rotate-0 hover:-rotate-12 hover:scale-105 shadow-[4px_-8px_30px_rgba(0,0,0,0.70)] hover:shadow-[12px_12px_30px_rgba(0,0,0,0.8)] group-hover:text-highlight"
          } transform font-serif`}
          onClick={() => togglePostIt(1)}
        >
          <div className="relative text-md">
            <p className="font-medium transition-colors duration-200">
              <Quote className="inline-block h-6 w-6 mb-1 -ml-1 mr-2 rotate-180 transition-colors duration-200" />
              Between the Client and the Server, side by side, An engineer
              stands, a balance with steady stride. Shifting the weight of
              endless data&apos;s flow, Guiding it through the Web where secrets go.
              Coding is math, a logic firm and clear, But programming? It&apos;s art,
              {" "}
              <Highlight isClicked={activePostIt === 1}>where visions appear.</Highlight>
              <Quote className="inline-block h-6 w-6 mb-1 ml-1 transition-colors duration-200" />
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-5 pointer-events-none mix-blend-multiply"></div>
      </div>
    </div>
  );
};

// Highlight component to wrap text that should be highlighted on hover
// Define explicit props type including children
type HighlightProps = {
  className?: string;
  children: React.ReactNode;
  isClicked?: boolean;
};

export const Highlight = ({
  className = "",
  children,
  isClicked = false,
}: HighlightProps) => (
  <span
    className={`inline-block px-1 bg-transparent transition-colors duration-200 ${
      isClicked
        ? "bg-white text-black"
        : "group-hover:bg-white group-hover:text-black"
    } ${className}`}
  >
    {children}
  </span>
);
