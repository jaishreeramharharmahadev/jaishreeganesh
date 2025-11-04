import React from "react";

// Single-file React component styled with Tailwind CSS
// Usage: import Tree from './Tree.jsx' and render <Tree /> in your app.

export default function Tree1() {
  const leaves = [
    { id: 1, x: 150, y: 70, r: 18, rotate: -20 },
    { id: 2, x: 190, y: 110, r: 22, rotate: 10 },
    { id: 3, x: 120, y: 120, r: 20, rotate: -40 },
    { id: 4, x: 160, y: 160, r: 24, rotate: 20 },
    { id: 5, x: 100, y: 190, r: 18, rotate: -10 },
    { id: 6, x: 200, y: 200, r: 20, rotate: 30 },
    { id: 7, x: 150, y: 230, r: 26, rotate: 0 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-emerald-50 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4 text-center">
            Tailwind + React — Tree (7 leaves)
          </h2>

          <div className="flex justify-center">
            <svg
              viewBox="0 0 300 360"
              className="w-80 h-[420px]"
              aria-label="Decorative tree with seven leaves"
            >
              {/* Ground */}
              <ellipse cx="150" cy="350" rx="120" ry="12" className="fill-emerald-200" />

              {/* Trunk */}
              <g className="transform-gpu">
                <rect
                  x="138"
                  y="200"
                  width="24"
                  height="130"
                  rx="10"
                  className="fill-amber-800"
                />

                {/* Slight branches using paths */}
                <path
                  d="M150 200 C 120 170, 90 150, 80 120"
                  stroke="#7c4a1d"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M150 180 C 170 150, 210 130, 230 100"
                  stroke="#7c4a1d"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M150 160 C 130 140, 100 120, 90 90"
                  stroke="#7c4a1d"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M150 140 C 180 120, 210 100, 240 80"
                  stroke="#7c4a1d"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Leaves */}
              <g>
                {leaves.map((leaf) => (
                  <g
                    key={leaf.id}
                    transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotate})`}
                    className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    {/* leaf shadow */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={leaf.r}
                      ry={leaf.r * 0.6}
                      transform="rotate(-15)"
                      className="fill-emerald-700 opacity-40"
                    />

                    {/* leaf body */}
                    <path
                      d={`M-${leaf.r * 0.6} 0 Q 0 -${leaf.r} ${leaf.r * 0.6} 0 Q 0 ${leaf.r * 0.6} -${leaf.r * 0.6} 0 Z`}
                      className="fill-emerald-500 stroke-emerald-800 stroke-[0.6]"
                    />

                    {/* leaf vein */}
                    <path
                      d={`M0 ${-leaf.r * 0.15} L0 ${leaf.r * 0.35}`}
                      stroke="#125f2b"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                  </g>
                ))}
              </g>

              {/* Subtle floating particles to look like foliage */}
              <g className="opacity-60">
                <circle cx="70" cy="60" r="4" className="fill-emerald-300" />
                <circle cx="230" cy="50" r="3" className="fill-emerald-300" />
                <circle cx="40" cy="150" r="3" className="fill-emerald-200" />
                <circle cx="270" cy="180" r="4" className="fill-emerald-200" />
              </g>
            </svg>
          </div>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Hover a leaf to see a gentle scale effect. Drop this component into any React
            + Tailwind project.
          </p>
        </div>
      </div>
    </div>
  );
}
