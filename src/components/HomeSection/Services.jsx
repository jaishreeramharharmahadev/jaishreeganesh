import React, { useState } from "react";
import {
  Briefcase,
  Info,
  BookOpen,
  FileText,
  Code2,
  Users,
} from "lucide-react";

const HEX_CLIP = "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)";

function HexagonBg({ centerSize = 80, neighborSize = 46, color = "#9CA3AF" }) {
  const sc = centerSize;
  const sn = neighborSize;
  const distance = Math.sqrt(3) * (sc + sn) / 4;

  const neighbors = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 60) * (Math.PI / 180);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { x, y };
  });

  const commonStyle = {
    clipPath: HEX_CLIP,
    WebkitClipPath: HEX_CLIP,
    background: color,
    opacity: 0.08,
    pointerEvents: "none",
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        style={{
          position: "absolute",
          width: `${sc}px`,
          height: `${sc}px`,
          left: "calc(100% - 48px)",
          top: "calc(100% - 48px)",
          transform: "translate(-50%, -50%)",
          ...commonStyle,
        }}
      />

      {neighbors.map((n, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            width: `${sn}px`,
            height: `${sn}px`,
            left: `calc(100% - 48px + ${Math.round(n.x)}px)`,
            top: `calc(100% - 48px + ${Math.round(n.y)}px)`,
            transform: "translate(-50%, -50%)",
            ...commonStyle,
          }}
        />
      ))}
    </div>
  );
}

export default function Offerings() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: "internship",
      title: "Internships",
      description:
        "Gain real-world exposure with hands-on internship and industry projects guided by experts.",
      Icon: Briefcase,
      stats: "500+ Placements",
      gradient: "from-orange-400 to-orange-500",
    },
    {
      id: "corporateTraining",
      title: "Corporate Training",
      description:
        "Empower your workforce with upskilling programs crafted for modern technologies.",
      Icon: Info,
      stats: "30+ Companies",
      gradient: "from-blue-400 to-blue-500",
    },
    {
      id: "courses",
      title: "Courses",
      description:
        "Master latest tech skills with practical and mentor-led sessions.",
      Icon: BookOpen,
      stats: "10+ Courses",
      gradient: "from-green-400 to-green-500",
    },
    {
      id: "masterClass",
      title: "Master Classes",
      description: "Get industry expert knowledge through live tech sessions.",
      Icon: FileText,
      stats: "Industry Experts",
      gradient: "from-purple-400 to-purple-500",
    },
    {
      id: "projects",
      title: "Live Projects",
      description: "Work on real-world projects and strengthen your portfolio.",
      Icon: Code2,
      stats: "50+ Projects",
      gradient: "from-red-400 to-red-500",
    },
    {
      id: "community",
      title: "Tech Community",
      description:
        "Join a powerful developer community for collaboration and innovation.",
      Icon: Users,
      stats: "10K+ Members",
      gradient: "from-indigo-400 to-indigo-500",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-r from-gray-50 to-blue-50 min-h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl text-gray-900">Our Offerings</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Designed to empower learners and organizations through technology & innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div>
                <div className="relative p-6 bg-white rounded-md border border-gray-200 shadow-md overflow-hidden">

                  <HexagonBg centerSize={50} neighborSize={36} color="#aeb3bd" />

                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-full bg-gradient-to-br ${service.gradient}`}>
                      <service.Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                      {service.stats}
                    </div>
                  </div>

                  <h3 className="relative z-10 text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="relative z-10 text-gray-600 text-md leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}