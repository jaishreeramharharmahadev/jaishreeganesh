import React, { useMemo } from "react";

// WaveLineComponent.jsx
// Renders multiple thin, colorful wave lines with several visual styles (variants) and a light/pastel color palette.
// Props:
//  - width: SVG internal width (keeps responsiveness via viewBox)
//  - height: SVG internal height
//  - waves: number of parallel wave lines
//  - amplitude: base amplitude of the waves
//  - frequency: base number of wave cycles across the width
//  - colors: array of stroke colors for each wave (will repeat if shorter than waves)
//  - strokeWidth: stroke width in pixels (default 2)
//  - gap: vertical offset between parallel waves
//  - variant: visual style - 'sine' | 'multi' | 'phase' | 'curvy'
//  - className: extra tailwind classes for the wrapper

export default function Wave2({
  width = 1200,
  height = 260,
  waves = 10,
  amplitude = 16,
  frequency = 1.6,
  // light / pastel palette by default
  colors = [
    "#e6f7ff",
    "#f0f9ff",
    "#eef9f2",
    "#fff7ed",
    "#f8edff",
    "#fef3f3",
  ],
  strokeWidth = 2,
  gap = 10,
  variant = "multi",
  className = "",
}) {
  // helper: combine multiple sine terms for richer shapes
  const multiSine = (nx, freq) => {
    // mix of harmonics to create more organic curves
    return (
      Math.sin(nx * Math.PI * 2 * freq) * 0.6 +
      0.4 * Math.sin(nx * Math.PI * 4 * freq + 0.8) +
      0.2 * Math.sin(nx * Math.PI * 6 * freq + 1.5)
    );
  };

  // generate path according to selected variant
  const generateWavePath = (yOffset = 0, seed = 0) => {
    const points = 100;
    const step = width / (points - 1);
    const pts = [];

    for (let i = 0; i < points; i++) {
      const x = i * step;
      const nx = i / (points - 1);
      let waveVal = 0;

      switch (variant) {
        case "sine":
          waveVal = Math.sin(nx * Math.PI * 2 * frequency + seed);
          break;
        case "multi":
          waveVal = multiSine(nx, frequency + seed * 0.1);
          break;
        case "phase":
          // phase shifts across x produce a rhythmic set of curves
          waveVal = Math.sin(nx * Math.PI * 2 * frequency + seed * 0.5 + nx * 1.2);
          break;
        case "curvy":
          // cubic-like undulations using a combination of sines and a gaussian to vary amplitude across width
          const gauss = Math.exp(-Math.pow((nx - 0.5) * 2, 2));
          waveVal = (Math.sin(nx * Math.PI * 2 * frequency * 0.9 + seed) + 0.5 * Math.sin(nx * Math.PI * 4 * frequency + seed * 1.2)) * gauss;
          break;
        default:
          waveVal = Math.sin(nx * Math.PI * 2 * frequency + seed);
      }

      const y = height / 2 + waveVal * amplitude + yOffset;
      pts.push([x, y]);
    }

    // build smooth quadratic path
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

  const paths = useMemo(() => {
    const arr = [];
    const total = (waves - 1) * gap;
    const base = -total / 2;

    for (let i = 0; i < waves; i++) {
      // stagger seed slightly so each line is slightly different
      const seed = i * 0.3;
      const yOffset = base + i * gap;
      const color = colors[i % colors.length];
      // subtle stroke opacity to keep light feel
      const opacity = 0.9 - (i / waves) * 0.45;
      arr.push({ d: generateWavePath(yOffset, seed), color, opacity, id: `wave-${i}` });
    }
    return arr;
  }, [width, height, waves, amplitude, frequency, gap, colors, variant]);

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-56 md:h-72 lg:h-80">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {paths.map((p, idx) => (
            <path
              key={p.id}
              d={p.d}
              stroke={p.color}
              strokeWidth={strokeWidth}
              strokeOpacity={p.opacity}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* small decorative extras: dashed accent lines on top and bottom to add style */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M 0 ${height - 6} Q ${width / 2} ${height - 26} ${width} ${height - 6}`} stroke="#ffffff" strokeWidth={1} strokeOpacity={0.06} strokeDasharray="6 10" />
          <path d={`M 0 6 Q ${width / 2} 26 ${width} 6`} stroke="#ffffff" strokeWidth={1} strokeOpacity={0.06} strokeDasharray="6 10" />
        </g>
      </svg>
    </div>
  );
}

/*
USAGE
- Variants:
  - 'sine'  : clean single-frequency sine waves
  - 'multi' : richer, organic waves (recommended)
  - 'phase' : phase-shifted rhythmic waves
  - 'curvy' : smooth curvy shapes with gentle amplitude envelope

Example:
  <WaveLineComponent
    waves={12}
    amplitude={18}
    frequency={1.4}
    variant="multi"
    strokeWidth={2}
    gap={10}
    colors={["#e6f7ff","#f0f9ff","#eef9f2","#fff7ed","#f8edff","#fef3f3"]}
    className="bg-white"
  />

TIPS
- Use lighter strokes and the default pastel palette for subtle backgrounds.
- Increase `waves` and decrease `gap` for denser patterns.
- Try variant="curvy" or variant="multi" for the most attractive organic looks.
*/
