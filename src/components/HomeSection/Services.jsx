import React, { useState, useEffect } from "react";
import { Briefcase, Info, BookOpen, Calculator, FileText } from "lucide-react";

export default function Offerings() {
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

  const services = [
    {
      id: "internship",
      title: "Internship",
      description: "Apply to hands-on internships and live projects.",
      Icon: Briefcase,
      href: "/internship",
    },
    {
      id: "about",
      title: "About Us",
      description: "Learn what TechnoPhile stands for and our mission.",
      Icon: Info,
      href: "/about",
    },
    {
      id: "courses",
      title: "Courses",
      description: "Skill-up with curated courses from industry mentors.",
      Icon: BookOpen,
      href: "/courses",
    },
    {
      id: "resume",
      title: "Create Resume",
      description: "Build a professional resume and download as PDF.",
      Icon: FileText,
      href: "/create-resume",
    },
  ];

  const handleClick = (href, id) => {
    if (typeof onNavigate === "function") return onNavigate(href, id);
    // default behaviour: use location change (works in simple apps)
    if (typeof window !== "undefined") window.location.href = href;
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row p-6 items-center justify-center bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-center">
            <svg viewBox="-20 0 350 320" className="h-[340px] md:h-[550px]">
              <ellipse
                cx="150"
                cy="150"
                rx="160"
                ry="160"
                className="fill-orange-200/40"
              />

              {/* Ground with subtle animation */}
              <ellipse
                cx="150"
                cy="300"
                rx="120"
                ry="14"
                className="fill-amber-900"
              />

              {/* Trunk with hover effect */}
              <rect
                x="140"
                y="200"
                width="20"
                height="100"
                rx="5"
                className="fill-amber-900"
              />

              {/* Branches with stroke animation */}
              <path
                d="M145 200 C 120 160, 110 180, 50 130"
                stroke="#7c4a1d"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M150 200 C 170 150, 320 180, 320 140"
                stroke="#7c4a1d"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M148 200 C 130 140, 100 120, 90 80"
                stroke="#7c4a1d"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M155 200 C 180 120, 210 100, 240 70"
                stroke="#7c4a1d"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M150 200 C 150 100, 140 160, 150 70"
                stroke="#7c4a1d"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Leaves with enhanced animations */}
              {leaves.map((leaf, index) => (
                <g
                  key={leaf.id}
                  transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotate})`}
                  className={`cursor-pointer`}
                >
                  {/* Leaf with gradient and hover effects */}
                  <path
                    d={`M-${leaf.r * 0.8} 0 Q 0 -${leaf.r} ${
                      leaf.r * 0.8
                    } 0 Q 0 ${leaf.r * 0.7} -${leaf.r * 0.8} 0 Z`}
                    className={`fill-green-600 drop-shadow-xl stroke-amber-800 stroke-[1]`}
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
      <div>
        <div className="text-center lg:ml-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Our Services
            
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover everything you need to accelerate your career with
            TechnoPhile's complete ecosystem
          </p>
          <div className="lg:mt-0 lg:flex-1">
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {services.map(({ id, title, description, Icon, href }) => (
                <button
                  key={id}
                  onClick={() => handleClick(href, id)}
                  aria-label={title}
                  className="group w-full text-left p-4 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-orange-50 to-purple-50 ring-1 ring-transparent group-hover:ring-orange-100 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Explore →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
