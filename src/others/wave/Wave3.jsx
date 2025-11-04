
// This code is in Use.

import React, { useMemo } from "react";

export default function Wave3({
  width = 1200,
  height = 260,
  waves = 10,
  amplitude = 16,
  frequency = 1.6,
  colors = ["#c4eafc", "#fcd6c4", "#c4eafc", "#fcd6c4", "#c4eafc", "#fcd6c4"],
  strokeWidth = 1,
  gap = 10,
  variant = "multi",
  rotate = 20,
  className = "",
}) {
  const multiSine = (nx, freq) => {
    return (
      Math.sin(nx * Math.PI * 2 * freq) * 0.6 +
      0.4 * Math.sin(nx * Math.PI * 4 * freq + 0.8) +
      0.2 * Math.sin(nx * Math.PI * 6 * freq + 1.5)
    );
  };

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
          waveVal = Math.sin(nx * Math.PI * 2 * frequency + seed * 0.5 + nx * 1.2);
          break;
        case "curvy":
          const gauss = Math.exp(-Math.pow((nx - 0.5) * 2, 2));
          waveVal =
            (Math.sin(nx * Math.PI * 2 * frequency * 0.9 + seed) +
              0.5 * Math.sin(nx * Math.PI * 4 * frequency + seed * 1.2)) *
            gauss;
          break;
        default:
          waveVal = Math.sin(nx * Math.PI * 2 * frequency + seed);
      }

      const y = height / 2 + waveVal * amplitude + yOffset;
      pts.push([x, y]);
    }

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
      const seed = i * 0.3;
      const yOffset = base + i * gap;
      const color = colors[i % colors.length];
      const opacity = 0.9 - (i / waves) * 0.45;
      arr.push({ d: generateWavePath(yOffset, seed), color, opacity, id: `wave-${i}` });
    }
    return arr;
  }, [width, height, waves, amplitude, frequency, gap, colors, variant]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className} -ml-72`}
      aria-hidden
      style={{ transform: `rotate(${rotate}deg)`, transformOrigin: "left" }}
    >
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-56 md:h-72 lg:h-80">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {paths.map((p) => (
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

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d={`M 0 ${height - 6} Q ${width / 2} ${height - 26} ${width} ${height - 6}`}
            stroke="#ffffff"
            strokeWidth={1}
            strokeOpacity={0.06}
            strokeDasharray="6 10"
          />
          <path
            d={`M 0 6 Q ${width / 2} 26 ${width} 6`}
            stroke="#ffffff"
            strokeWidth={1}
            strokeOpacity={0.06}
            strokeDasharray="6 10"
          />
        </g>
      </svg>
    </div>
  );
}