import React, { useMemo } from "react";

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
  glassOpacity?: number;
  blurStrength?: number;
  noiseOpacity?: number;
  gridOpacity?: number;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  children,
  className = "",
  glassOpacity = 0.6,
  blurStrength = 16,
  noiseOpacity = 0.14,
  gridOpacity = 0.9,
}) => {
  // Constants
  const COLORS = {
    background: "#000000",
    mainGrid: "#1a1a1a",
    subGrid: "var(--divider-light)",
    tertiaryGrid: "var(--divider-light)",
    highlight: "var(--highlight)",
    texture: "var(--accent)",
  } as const;

  const GRID = {
    mainSize: "clamp(28px, 4vw, 38px)",
    subDivision: 1,
    tertiaryDivision: 3,
  } as const;

  // Noise background SVG (data URL)
  const noiseSvgUrl = useMemo(() => {
    // This creates a subtle noise pattern as an SVG
    return `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${noiseOpacity}'/%3E%3C/svg%3E")`;
  }, [noiseOpacity]);

  // Computed styles using useMemo to prevent recalculation on re-renders
  const gridStyles = useMemo(
    () => ({
      backgroundColor: `color-mix(in srgb, ${COLORS.background}, transparent ${
        100 - glassOpacity * 100
      }%)`,
      backgroundImage: `
      /* Noise texture */
      ${noiseSvgUrl},
      
      /* Main grid lines */
      linear-gradient(to right, color-mix(in srgb, ${
        COLORS.mainGrid
      }, transparent ${100 - gridOpacity * 100}%) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, ${
        COLORS.mainGrid
      }, transparent ${100 - gridOpacity * 100}%) 1px, transparent 1px),
      
      /* Sub-grid lines */
      linear-gradient(to right, color-mix(in srgb, ${
        COLORS.subGrid
      }, transparent ${100 - gridOpacity * 100}%) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, ${
        COLORS.subGrid
      }, transparent ${100 - gridOpacity * 100}%) 1px, transparent 1px),
      
      /* Faint tertiary lines for extra detail */
      linear-gradient(to right, color-mix(in srgb, ${
        COLORS.tertiaryGrid
      }, transparent ${100 - gridOpacity * 100}%) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, ${
        COLORS.tertiaryGrid
      }, transparent ${100 - gridOpacity * 100}%) 1px, transparent 1px)
    `,
      backgroundSize: `
      /* Noise texture */
      200px 200px,
      
      /* Main grid */
      ${GRID.mainSize} ${GRID.mainSize},
      ${GRID.mainSize} ${GRID.mainSize},
      
      /* Sub-grid */
      calc(${GRID.mainSize} / ${GRID.subDivision}) calc(${GRID.mainSize} / ${GRID.subDivision}),
      calc(${GRID.mainSize} / ${GRID.subDivision}) calc(${GRID.mainSize} / ${GRID.subDivision}),
      
      /* Tertiary grid */
      calc(${GRID.mainSize} / ${GRID.tertiaryDivision}) calc(${GRID.mainSize} / ${GRID.tertiaryDivision}),
      calc(${GRID.mainSize} / ${GRID.tertiaryDivision}) calc(${GRID.mainSize} / ${GRID.tertiaryDivision})
    `,
      backgroundPosition: "center center",
      backgroundBlendMode:
        "overlay, normal, normal, normal, normal, normal, normal",
      backdropFilter: `blur(${blurStrength}px)`,
      WebkitBackdropFilter: `blur(${blurStrength}px)`,
    }),
    [
      COLORS.background,
      COLORS.mainGrid,
      COLORS.subGrid,
      COLORS.tertiaryGrid,
      GRID.mainSize,
      GRID.subDivision,
      GRID.tertiaryDivision,
      noiseSvgUrl,
      glassOpacity,
      blurStrength,
      gridOpacity,
    ]
  );

  return (
    <div
      className={`
        relative w-full h-full border border-grey/70 rounded-xl
        ${className}
      `}
      style={gridStyles}
    >
      {/* Content container */}
      <div className=" flex flex-col items-center justify-center relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
