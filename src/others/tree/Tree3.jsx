import React from "react";

export default function Tree3() {
  const leaves = [
    { id: 1, x: 159, y: 20, r: 70, rotate: -80 },
    { id: 2, x: 265, y: 48, r: 58, rotate: -40 },
    { id: 3, x: 55, y: 50, r: 66, rotate: 45 },
    { id: 4, x: 280, y: 153, r: 60, rotate: -16 },
    { id: 5, x: 30, y: 135, r: 64, rotate: 20 },
    // { id: 6, x: 210, y: 210, r: 38, rotate: 25 },
    // { id: 7, x: 150, y: 250, r: 42, rotate: 0 },
    // { id: 8, x: 150, y: 250, r: 42, rotate: 0 },
  ];

  const labels = [
      "Internship",
      "About Us",
      "Courses",
      "Know Your CTC",
      "Create Resume",
  ];
  

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="p-6">

          <div className="flex justify-center">
            <svg viewBox="-20 0 350 320" className="h-[520px]">
              {/* Ground */}
              <ellipse cx="150" cy="300" rx="120" ry="14" className="fill-orange-300" />

              {/* Trunk */}
              <rect x="140" y="200" width="20" height="100" rx="5" className="fill-amber-900" />

              {/* Branches */}
              <path d="M145 200 C 120 160, 110 180, 50 130" stroke="#7c4a1d" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M150 200 C 170 150, 320 180, 320 140" stroke="#7c4a1d" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M148 200 C 130 140, 100 120, 90 80" stroke="#7c4a1d" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M155 200 C 180 120, 210 100, 240 70" stroke="#7c4a1d" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M150 200 C 150 100, 140 160, 150 70" stroke="#7c4a1d" strokeWidth="5" strokeLinecap="round" fill="none" />

              {/* Leaves with labels */}
              {leaves.map((leaf) => (
                <g
                  key={leaf.id}
                  transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotate})`}
                  className="cursor-pointer"
                >
                  <path
                    d={`M-${leaf.r * 0.8} 0 Q 0 -${leaf.r} ${leaf.r * 0.8} 0 Q 0 ${leaf.r * 0.7} -${leaf.r * 0.8} 0 Z`}
                    className="fill-green-600 stroke-green-800 stroke-[1] shadow-lg"
                  />

                  <text
                    x="0"
                    y={leaf.r * 0.02}
                    textAnchor="middle"
                    fontSize={Math.max(10, Math.floor(leaf.r * 0.2))}
                    fontWeight="600"
                    fill="#ffffff"
                    pointerEvents="none"
                  >
                    {labels[leaf.id - 1]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
