import React, { useMemo } from "react";

// WaveLineComponent.jsx
// A responsive, configurable SVG wave-lines component using Tailwind CSS for layout.
// Props:
//  - width: SVG internal width (keeps responsiveness via viewBox)
//  - height: SVG internal height
//  - lines: number of parallel wave lines
//  - amplitude: height of the waves
//  - frequency: number of wave cycles across the width
//  - stroke: stroke color
//  - strokeWidth: width of the line
//  - gap: vertical spacing between each parallel line
//  - className: extra tailwind classes for the wrapper

export default function Wave1({
  width = 1200,
  height = 220,
  lines = 6,
  amplitude = 18,
  frequency = 2.2,
  stroke = "#c8e6f5",
  strokeWidth = 1.6,
  gap = 12,
  className = "",
}) {
  // generate a smooth 'sine-like' path using points and quadratic curves
  const generateWavePath = (yOffset = 0) => {
    const points = 60; // more points = smoother curve
    const step = width / (points - 1);
    const pts = [];
    for (let i = 0; i < points; i++) {
      const x = i * step;
      // normalized x (0..1)
      const nx = i / (points - 1);
      // sine with frequency and amplitude, plus offset
      const y = height / 2 + Math.sin(nx * Math.PI * 2 * frequency) * amplitude + yOffset;
      pts.push([x, y]);
    }

    // Build a smooth path using quadratic curves between midpoints
    let d = "";
    if (pts.length > 0) {
      d += `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const x1 = pts[i][0];
        const y1 = pts[i][1];
        const x2 = pts[i + 1][0];
        const y2 = pts[i + 1][1];
        const cx = ((x1 + x2) / 2).toFixed(2);
        const cy = ((y1 + y2) / 2).toFixed(2);
        d += ` Q ${x1.toFixed(2)} ${y1.toFixed(2)} ${cx} ${cy}`;
      }
    }
    return d;
  };

  // Use memo to avoid recomputing on each render
  const paths = useMemo(() => {
    const arr = [];
    // vertically center the bundle of lines around center
    const totalHeight = (lines - 1) * gap;
    const base = -totalHeight / 2;
    for (let i = 0; i < lines; i++) {
      const yOffset = base + i * gap;
      arr.push({
        d: generateWavePath(yOffset),
        opacity: 1 - (i / (lines + 1)) * 0.5, // slight fading for distant lines
      });
    }
    return arr;
  }, [width, height, lines, amplitude, frequency, gap]);

  return (
    <div className={`relative overflow-hidden ${className}`}> 
      {/* Responsive SVG: full width, height controlled by container */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-hidden
        className="w-full h-44 md:h-56 lg:h-64"
      >
        {/* Optional background rectangle to match your sample (white) */}
        <rect x="0" y="0" width={width} height={height} fill="transparent" />

        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {paths.map((p, idx) => (
            <path
              key={idx}
              d={p.d}
              stroke={stroke}
              strokeWidth={strokeWidth}
              opacity={p.opacity}
              className={`transform-gpu will-change-transform`}
            />
          ))}
        </g>

        {/* Tiny defs to allow simple per-path animation using CSS (see tailwind instructions below) */}
        <defs></defs>
      </svg>

      {/* Inline styles for small animations (you can move these to your globals.css) */}
      
    </div>
  );
}

/*
USAGE
import WaveLineComponent from './WaveLineComponent';

<WaveLineComponent
  lines={7}
  amplitude={20}
  frequency={2}
  stroke="#d9eef6"
  strokeWidth={1.4}
  gap={14}
  className="bg-white"
/>

NOTES
- The component is responsive because SVG uses viewBox and the outer svg has width:100%.
- You can adjust height by changing the svg container class (h-44, md:h-56, etc.) or by passing a different `height` prop.
- For production move the <style> rules into a CSS file (or Tailwind utilities) and tune animations.
*/