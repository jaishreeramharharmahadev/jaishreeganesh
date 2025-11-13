

import React, { useState } from "react";
import {
  Briefcase,
  Info,
  BookOpen,
  FileText,
  Code2,
  Rocket,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Offerings() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: "internship",
      title: "Internships",
      description:
        "Gain real-world exposure with hands-on internships and live industry projects guided by experts.",
      Icon: Briefcase,
      href: "/internships",
      stats: "500+ Placements",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "corporateTraining",
      title: "Corporate Training",
      description:
        "Empower your workforce with tailored corporate upskilling programs designed for modern business challenges.",
      Icon: Info,
      href: "/corporate-training",
      stats: "30+ Companies",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "courses",
      title: "Courses",
      description:
        "Level up your skills with our mentor-led courses, blending deep learning with practical applications.",
      Icon: BookOpen,
      href: "/courses",
      stats: "10+ Courses",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "masterClass",
      title: "Master Classes",
      description:
        "Join our interactive live master classes conducted by industry leaders and global experts.",
      Icon: FileText,
      href: "/classes",
      stats: "Industry Experts",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "projects",
      title: "Live Projects",
      description:
        "Work on industry-grade projects that help you apply your knowledge and build strong portfolios.",
      Icon: Code2,
      href: "/projects",
      stats: "50+ Projects",
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "community",
      title: "Tech Community",
      description:
        "Be part of a growing tech community that inspires collaboration, networking, and innovation.",
      Icon: Users,
      href: "/community",
      stats: "10K+ Members",
      gradient: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">

          <h2 className="text-4xl text-gray-900 mb-2">
            Our Offerings
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore GT Technovation's ecosystem — designed to empower learners,
            professionals, and organizations through technology and skill growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="group"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <button
                type="button"
                className="w-full p-5 bg-white rounded-xl border border-gray-200 shadow-sm text-left transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
                aria-label={`Learn more about ${service.title}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${service.gradient} shadow`}
                  >
                    <service.Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                    {service?.stats}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}