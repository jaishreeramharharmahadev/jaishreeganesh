import React, { useState, useEffect } from "react";
import { 
  Code2, 
  Cpu, 
  Zap, 
  Search, 
  Rocket, 
  Smartphone, 
  Globe, 
  Database,
  Users,
  Target,
  TrendingUp,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const stats = [
    { number: "500+", label: "Successful Interns", color: "text-green-600", icon: Users },
    { number: "100+", label: "Students Placed", color: "text-blue-600", icon: Target },
    { number: "50+", label: "Partner Companies", color: "text-orange-600", icon: TrendingUp },
  ];

  // Tech-focused user avatars with Lucide icons
  const users = [
    { 
      icon: Code2, 
      size: "w-12 h-12", 
      color: "bg-blue-100 border-blue-400",
      iconColor: "text-blue-600"
    },
    { 
      icon: Cpu, 
      size: "w-11 h-11", 
      color: "bg-green-100 border-green-400",
      iconColor: "text-green-600"
    },
    { 
      icon: Zap, 
      size: "w-14 h-14", 
      color: "bg-purple-100 border-purple-400",
      iconColor: "text-purple-600"
    },
    { 
      icon: Search, 
      size: "w-10 h-10", 
      color: "bg-red-100 border-red-400",
      iconColor: "text-red-600"
    },
    { 
      icon: Rocket, 
      size: "w-12 h-12", 
      color: "bg-yellow-100 border-yellow-400",
      iconColor: "text-yellow-600"
    },
    { 
      icon: Smartphone, 
      size: "w-11 h-11", 
      color: "bg-indigo-100 border-indigo-400",
      iconColor: "text-indigo-600"
    },
    { 
      icon: Globe, 
      size: "w-14 h-14", 
      color: "bg-pink-100 border-pink-400",
      iconColor: "text-pink-600"
    },
    { 
      icon: Database, 
      size: "w-10 h-10", 
      color: "bg-teal-100 border-teal-400",
      iconColor: "text-teal-600"
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-gray-50 to-blue-50 py-4 px-4 md:px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Same as before */}
          <div>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white rounded-lg px-2 py-1 mt-5 shadow-sm border border-gray-200">
              <div className="flex -space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-xs font-medium text-gray-700">
                Trusted by 1,000+ students
              </span>
            </div>

            {/* Main Heading */}
            <div className="text-xl lg:text-2xl text-center mt-4 font-bold text-gray-900">
              <div>Empowering You Through</div>
              <span className="text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Internships <br/> &amp; <br/> Learning
              </span>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mt-6">
                Get real-world experience through curated internships, build
                in-demand skills, and connect with top companies. Start your
                professional journey today.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/internships")}
                className="bg-gradient-to-r from-gray-800 to-blue-700 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <span>Find Internships</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Rotating Globe with Static Users */}
          <div className="p-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Global Tech Community</h3>
              </div>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Join 1,248+ developers worldwide</span>
              </p>
            </div>

            {/* Globe Container */}
            <div className="relative w-full h-80 flex items-center justify-center">
              {/* Rotating Globe */}
              <div 
                className="relative w-56 h-56 transition-transform duration-100">
                {/* Enhanced Globe Core */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-green-400 to-cyan-400 rounded-full shadow-2xl border-4 border-sky-300">
                  {/* Tech-themed globe details */}
                  <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-green-300/40 rounded-full blur-sm"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-blue-300/50 rounded-full blur-sm"></div>
                  <div className="absolute top-1/3 right-1/4 w-12 h-6 bg-cyan-200/60 rounded-full blur-sm"></div>
                  
                  {/* Enhanced Center Hub */}
                  <div className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-xl border-2 border-blue-300">
                    <div className="absolute inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Connection Lines - Increased thickness */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Lines from center to users - Increased thickness */}
                  {users.map((_, index) => {
                    const angle = (index * (360 / users.length)) * Math.PI / 180;
                    const radius = 160;
                    const x = Math.cos(angle) * (radius / 3);
                    const y = Math.sin(angle) * (radius / 3);
                    
                    return (
                      <line
                        key={`center-${index}`}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + (x / 3)}%`}
                        y2={`${50 + (y / 3)}%`}
                        stroke="rgba(34, 197, 94, 0.3)"
                        strokeWidth="2" // Increased from 1.5 to 3
                      />
                    );
                  })}

                  {/* User-to-user connection lines - All connections with increased thickness */}
                  {users.map((_, i) => {
                    const angle1 = (i * (360 / users.length)) * Math.PI / 180;
                    const radius = 160;
                    const x1 = Math.cos(angle1) * radius;
                    const y1 = Math.sin(angle1) * radius;
                    
                    return users.map((_, j) => {
                      if (i >= j) return null;
                      
                      const angle2 = (j * (360 / users.length)) * Math.PI / 180;
                      const x2 = Math.cos(angle2) * radius;
                      const y2 = Math.sin(angle2) * radius;
                      
                      return (
                        <line
                          key={`user-${i}-${j}`}
                          x1={`${50 + (x1 / 3)}%`}
                          y1={`${50 + (y1 / 3)}%`}
                          x2={`${50 + (x2 / 3)}%`}
                          y2={`${50 + (y2 / 3)}%`}
                          stroke="rgba(59, 130, 246, 0.25)"
                          strokeWidth="1" // Increased from 1 to 2.5
                        />
                      );
                    });
                  })}
                </svg>

                {/* Static Users - positioned around the rotating globe */}
                {users.map((user, index) => {
                  const angle = (index * (360 / users.length)) * Math.PI / 180;
                  const radius = 160;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const IconComponent = user.icon;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute ${user.size} ${user.color} rounded-full border-3 shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 hover:z-10 hover:shadow-2xl cursor-pointer group`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      title="Tech Professional"
                    >
                      <IconComponent 
                        className={`w-6 h-6 ${user.iconColor} group-hover:scale-110 transition-transform`} 
                      />
                    </div>
                  );
                })}
              </div>

              {/* Background Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-30 blur-lg"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-green-100 rounded-full opacity-40 blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}