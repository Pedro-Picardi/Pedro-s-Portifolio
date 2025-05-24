"use client";
import React, { useEffect, useRef, useState } from "react";
import { User, Briefcase, GraduationCap } from "lucide-react";

import Profile from "../components/Profile";
import Bio from "../components/Bio";
import Experience from "../components/Experience";
import Stack from "../components/Stack";
    // ===== Lighting & 3D Effect Config =====

const ROTATE_MAX_DEG = 1.2; // max degrees for 3D tilt, lower for subtler
const PERSPECTIVE = 1200; // px

const CVPage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  const [blocks, setBlocks] = useState<HTMLElement[]>([]);

  useEffect(() => {
    // Get all blocks on mount
    const blockElements = Array.from(
      document.querySelectorAll('[data-name="block"]')
    ) as HTMLElement[];
    setBlocks(blockElements);

    blockElements.forEach((block) => {
      // Add initial rotation transition
      block.style.transition = "transform 0.1s ease-out";
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate normalized mouse position (0-1 range)
      const normalizedX = clientX / innerWidth;
      const normalizedY = clientY / innerHeight;

      // Apply subtle 3D effect based on mouse position to each block
      blocks.forEach((element) => {
        const rotateY = ROTATE_MAX_DEG * (normalizedX - 0.5) * 2; // -ROTATE_MAX_DEG to ROTATE_MAX_DEG
        const rotateX = -ROTATE_MAX_DEG * (normalizedY - 0.5) * 2; // -ROTATE_MAX_DEG to ROTATE_MAX_DEG

        element.style.transform = `
          perspective(${PERSPECTIVE}px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
        `;
      });
    };

    const handleMouseLeave = () => {
      blocks.forEach((element) => {
        // Reset rotation with transition
        element.style.transition = "transform 0.5s ease-out";
        element.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`;
      });
    };

    const handleMouseEnter = () => {
      blocks.forEach((element) => {
        // Set smoother transition on enter
        element.style.transition = "transform 0.1s ease-out";
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [blocks]);

  return (
    <main
      ref={mainRef as React.RefObject<HTMLElement>}
      className="w-full h-full absolute bg-background"
      style={{
        backgroundImage: "url(/assets/bghero.webp)",
        backgroundSize: "contain",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
      }}
    >

      <section className="w-full md:w-[1280px] h-fit flex flex-col gap-7 my-24 mx-auto">
        <div
          data-name="block"
          className="w-full h-full flex items-center justify-center relative"
        >
          <div className="w-[24px] h-[24px] absolute -bottom-2 -right-2 shadow-black bg-white/20 rounded-sm z-10"></div>
          <div className="w-[24px] h-[24px] absolute -top-2 -left-2 shadow-black bg-black/20 border-1 border-dashed border-highlight/40 rounded-sm z-10"></div>
          <div className="w-full h-fit flex items-center backdrop-blur-2xl bg-transparent border-1 border-dashed rounded-lg border-highlight/10 overflow-hidden shadow-lg">
            <h1
              className="w-full text-[10vw] md:text-[8.0vw] font-halogrotesk font-bold text-center text-background whitespace-nowrap select-none"
              style={{
                WebkitTextStroke: "0.5px transparent",
                textShadow: `
              1px 1px 0 #202020,
              -1px -1px 0 #202020,
              1px -1px 0 #33333353,
              -1px 1px 0 #9f9f9f,
              0px 1px 0 #202020,
              1px 0px 0 #33333353,
              0px -1px 0 #9f9f9f,
              -1px 0px 0 #202020
            `,
              }}
            >
              Curriculum V
            </h1>
          </div>
        </div>
        <div className="w-full h-[480px] flex flex-col md:flex-row items-center justify-between gap-7 overflow-hidden">
          <div
            data-name="block"
            className="w-3/7 h-full flex flex-col items-start border-1 border-dashed rounded-lg border-highlight/10 p-10 justify-center overflow-hidden shadow-lg"
          >
            <Profile variant="cv" />
          </div>
          <div
            data-name="block"
            className="w-4/7 h-full flex flex-col items-start border-1 border-dashed rounded-lg border-highlight/10 p-8 justify-center overflow-hidden shadow-lg"
          >
            <div className="w-full h-full flex flex-col items-start justify-center gap-12">
              <div className="w-full h-full flex flex-row relative items-start gap-4 mt-6 ml-5 justify-start">
                <div
                  data-name="square"
                  className="w-[180px] min-w-[180px] mt-1.5 h-[60px] min-h-[60px] absolute -left-4 -top-4 border-l-1 border-t-1 rounded-tl-lg border-dashed border-accent"
                ></div>
                <div
                  data-name="square"
                  className="absolute -left-2 -top-9 text-sm font-halogrotesk leading-6 text-accent flex items-center gap-1"
                >
                  <User size={16} className="text-accent" />
                  <p>About me</p>
                </div>
                <p className="text-sm font-silkamono font-bold leading-6 text-highlight/70">
                  Detail Oriented, Problem-solver, Fullstack. <br /> I seek to
                  navigate through all the levels of abstraction of a project to
                  find the best solutions considering the whole line of business.
                </p>
              </div>
              <div className="w-full h-full flex flex-row relative items-start gap-4 mt-10 ml-5 justify-start">
                <div
                  data-name="square"
                  className="w-[180px] min-w-[180px] mt-1.5 h-[60px] min-h-[60px] absolute -left-4 -top-4 border-l-1 border-t-1 rounded-tl-lg border-dashed border-accent/70"
                ></div>
                <div
                  data-name="square"
                  className="absolute -left-2 -top-9 text-sm font-halogrotesk leading-6 text-accent/70 flex items-center gap-1"
                >
                  <Briefcase size={16} className="text-accent/70" />
                  <p>Experience</p>
                </div>
                <p className="text-sm font-silkamono font-bold leading-6 text-highlight/70">
                  +5 years experienced in JavaScript & Flutter ecosystems.
                  Currently enroled in a emergent health platform in Brazil.
                  <span className="text-md h-full text-highlight/40 line-clamp-2 hover:text-highlight/80 transition-all duration-300 ease-in-out">
                    <a href="https://yinflow.life" className="">
                      visit Yinflow.life
                    </a>
                  </span>
                </p>
              </div>
              <div className="w-full h-full flex flex-row relative items-start gap-4 mt-10 ml-5 justify-start">
                <div
                  data-name="square"
                  className="w-[180px] min-w-[180px] mt-1.5 h-[60px] min-h-[60px] absolute -left-4 -top-4 border-l-1 border-t-1 rounded-tl-lg border-dashed border-accent/50"
                ></div>
                <div
                  data-name="square"
                  className="absolute -left-2 -top-9 text-sm font-halogrotesk leading-6 text-accent/50 flex items-center gap-1"
                >
                  <GraduationCap size={16} className="text-accent/50" />
                  <p>Education</p>
                </div>
                <p className="text-sm font-silkamono font-bold leading-6 text-highlight/70">
                  Graduated in IT Engineering on Universidade de Brasília (UnB 2018-2022) &
                  Self-taught in Web Development
                </p>
              </div>
            </div>
          </div>
        </div>
        <Bio />
        <Stack />
        <div data-name="block" className="w-full h-full flex flex-col items-center mt-24 justify-center border-1 border-dashed rounded-lg border-highlight/10 shadow-lg">
          <Experience />
        </div>
      </section>
    </main>
  );
};

export default CVPage;
