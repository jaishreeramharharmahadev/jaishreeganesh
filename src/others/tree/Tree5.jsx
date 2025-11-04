import React, { useState, useEffect, useRef } from "react";

export default function Tree5() {
  const [hoveredLeaf, setHoveredLeaf] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const leaves = [
    { id: 1, x: 159, y: 20, r: 70, rotate: -80 },
    { id: 2, x: 265, y: 48, r: 58, rotate: -40 },
    { id: 3, x: 55, y: 50, r: 66, rotate: 45 },
    { id: 4, x: 280, y: 153, r: 60, rotate: -16 },
    { id: 5, x: 30, y: 135, r: 64, rotate: 20 },
  ];

  const labels = [
    "Internship",
    "About Us",
    "Courses",
    "Know Your CTC",
    "Create Resume",
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Branch paths (each starts at the trunk and goes outward) — mapping these makes
  // it easy to stagger the animation with different delays so the "watercolor"
  // flow looks organic.
  const branchPaths = [
    "M145 200 C 120 160, 110 180, 50 130",
    "M150 200 C 170 150, 320 180, 320 140",
    "M148 200 C 130 140, 100 120, 90 80",
    "M155 200 C 180 120, 210 100, 240 70",
    "M150 200 C 150 100, 140 160, 150 70",
  ];

  // refs to branch path elements so we can compute exact lengths and set dasharray
  const branchRefs = useRef([]);

  useEffect(() => {
    // compute path lengths and apply stroke-dasharray/dashoffset per element to ensure
    // the "draw" animation works regardless of actual path length
    branchRefs.current.forEach((el, i) => {
      if (!el) return;
      try {
        const len = el.getTotalLength();
        // set the dash to the exact length so animation reveals correctly
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
        el.style.animationName = 'flow';
        // stagger durations/delays slightly per branch for organic motion
        el.style.animationDuration = `${3.6 + i * 0.6}s`;
        el.style.animationDelay = `${i * 0.35}s`;
        el.style.animationTimingFunction = 'linear';
        el.style.animationIterationCount = 'infinite';
        el.style.strokeLinecap = 'round';
        el.style.strokeOpacity = '1';
      } catch (e) {
        // some browsers may throw if element isn't ready — ignore silently
      }
    });
  }, [branchPaths]);

  return (
    <div className="grid md:grid-cols-2 items-center justify-center p-6 md:p-10 bg-gradient-to-b from-green-50 to-amber-50">
      <div className={`text-center mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">Services</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover everything you need to accelerate your career with TechnoPhile's complete ecosystem
        </p>
      </div>

      <div className="w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-center">
            <svg viewBox="-20 0 350 320" className="h-[520px]" preserveAspectRatio="xMidYMid meet">

              {/* SVG defs: watercolor gradient, filters, and styles for the animated branches */}
              <defs>
                {/* watercolor linear gradient used as stroke for branches */}
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7ec8ff" stopOpacity="1" />
                  <stop offset="45%" stopColor="#60b8f8" stopOpacity="1" />
                  <stop offset="70%" stopColor="#4f7df7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#b89cfb" stopOpacity="1" />
                </linearGradient>

                {/* subtle watercolor blur + soft edges filter */}
                {/* <filter id="watercolorFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="blur" />
                  <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.95 0" result="soft" />
                  <feBlend in="soft" in2="SourceGraphic" mode="normal" />
                </filter> */}

                {/* glow used when hovering a leaf */}
                {/* <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter> */}

              </defs>

              {/* Inline SVG styles for animation. We animate stroke-dashoffset to create a "flow/draw" effect */}
              <style>{`
                @keyframes flow { to { stroke-dashoffset: 0; } }
                /* gentle hue shift — applied via CSS class */
                .water-shift { animation: hue 9s linear infinite; }
                @keyframes hue { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(25deg); } }
              `}</style>

              {/* Ellipse background and ground (drawn beneath branches) */}
              <ellipse cx="150" cy="150" rx="160" ry="160" className="fill-orange-200/40" />
              <ellipse cx="150" cy="300" rx="120" ry="14" className="fill-amber-900" />

              {/* Trunk (solid) */}
              <rect x="140" y="200" width="20" height="100" rx="5" className="fill-amber-900" />

              {/* Render branch paths from array so we can add staggered delays */}
              {branchPaths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  ref={(el) => (branchRefs.current[i] = el)}
                  stroke={`url(#waterGradient)`}
                  strokeWidth={i % 2 === 0 ? 5 : 6}
                  className={`water-shift`}
                  filter="url(#watercolorFilter)"
                />
              ))}

              {/* Leaves with enhanced animations */}
              {leaves.map((leaf, index) => (
                <g
                  key={leaf.id}
                  transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotate})`}
                  className={`cursor-pointer`}
                  onMouseEnter={() => setHoveredLeaf(leaf.id)}
                  onMouseLeave={() => setHoveredLeaf(null)}
                >
                  {/* Leaf with gradient and hover effects */}
                  <path
                    d={`M-${leaf.r * 0.8} 0 Q 0 -${leaf.r} ${leaf.r * 0.8} 0 Q 0 ${leaf.r * 0.7} -${leaf.r * 0.8} 0 Z`}
                    className={`fill-orange-600 drop-shadow-xl stroke-amber-800 stroke-[1]`}
                    filter={hoveredLeaf === leaf.id ? "url(#glow)" : "none"}
                  />

                  {/* Enhanced text with better visibility */}
                  <text
                    x="0"
                    y={leaf.r * 0.02}
                    textAnchor="middle"
                    fontSize={Math.max(10, Math.floor(leaf.r * 0.2))}
                    fontWeight="600"
                    fill="#ffffff"
                    pointerEvents="none"
                    className="transition-all duration-300"
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
