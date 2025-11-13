import React, { useState, useEffect, useRef } from "react";
import { Users, Briefcase, Award, Code, Cloud, Rocket, Building, Globe } from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  { 
    number: 500, 
    label: "Projects Completed", 
    icon: Rocket,
    suffix: "+",
    description: "Successful deliveries across various industries"
  },
  { 
    number: 50, 
    label: "Partner Companies", 
    icon: Users,
    suffix: "+",
    description: "Satisfied businesses worldwide"
  },
  { 
    number: 4.7, 
    label: "Student Rating", 
    icon: Award,
    suffix: '/5',
    description: "Over a decade of excellence"
  },
  { 
    number: 100, 
    label: "Students Placed", 
    icon: Code,
    suffix: "+",
    description: "Skilled technology professionals"
  },
  { 
    number: 25, 
    label: "Technologies", 
    icon: Cloud,
    suffix: "+",
    description: "Modern tools and frameworks"
  },
  { 
    number: 15, 
    label: "Countries Served", 
    icon: Globe,
    suffix: "+",
    description: "Global client base"
  },
  { 
    number: 30, 
    label: "Industry Experts", 
    icon: Building,
    suffix: "+",
    description: "Strategic partnerships"
  },
  { 
    number: 94, 
    label: "Success Rate", 
    suffix: "%",
    icon: Briefcase,
    description: "Project success rate"
  }
];

export default function JoinNetwork() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of businesses that have transformed their operations 
            with GT Technovation's cutting-edge technology solutions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="bg-sky-50 backdrop-blur-md rounded-md p-4 border border-gray-200 hover:border-blue-400/80 hover:bg-white/15 transition-all duration-500 hover:transform hover:scale-105">
                  {/* Icon Container */}
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Animated Number */}
                  <h3 className="text-3xl font-bold mb-1 flex items-center justify-center">
                    <AnimatedCounter 
                      end={item.number} 
                      duration={2500} 
                      suffix={item.suffix || ""}
                    />
                  </h3>
                  
                  {/* Label */}
                  <p className="text-md font-semibold text-gray-700 mb-1">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}