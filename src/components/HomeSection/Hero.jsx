import React, { useState, useEffect } from "react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const codeLines = [
    "// Find your dream internship",
    "const opportunities = await findInternships({",
    "  role: 'Software Developer',",
    "  location: 'Remote',",
    "  duration: '3 months',",
    "  skills: ['React', 'Node.js', 'Python']",
    "});",
    "",
    "// Launch your career today",
    "const success = await applyForInternship({",
    "  profile: studentProfile,",
    "  motivation: 'Ready to learn and grow',",
    "  availability: 'Immediate'",
    "});",
    "",
    "console.log('Career journey started! 🚀');",
  ];

  useEffect(() => {
    const currentText = codeLines[currentLine];

    if (!isDeleting) {
      if (typedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentText.slice(0, typedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typedText.length > 0) {
        const timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentLine((prev) => (prev + 1) % codeLines.length);
      }
    }
  }, [typedText, currentLine, isDeleting, codeLines]);

  const stats = [
    { number: "50+", label: "Active Students", color: "text-green-600" },
    { number: "5K+", label: "Students Placed", color: "text-blue-600" },
    { number: "50+", label: "Partner Companies", color: "text-orange-600" },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-gray-50 to-blue-50 py-4 px-4 md:px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white rounded-lg px-2 py-1 shadow-sm border border-gray-200">
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
            <div className="mt-6">
              <button className="bg-gradient-to-r from-gray-800 to-blue-700 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
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

          {/* Right Content - Code Editor Style */}
          <div className="bg-gray-900 md:mt-8 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-400 font-mono">
                Internship.js
              </div>
              <div className="w-20"></div>
            </div>

            {/* Code Content */}
            <div className="p-4 px-6 font-mono text-sm">
              <div className="text-gray-400 mb-2">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-green-400">careerPlatform</span>{" "}
                <span className="text-gray-400">=</span> {"{"}
              </div>

              <div className="text-gray-400 ml-4 mb-2">
                <span className="text-blue-400">name</span>
                <span className="text-gray-400">:</span>{" "}
                <span className="text-yellow-400">"InternConnect"</span>,
              </div>

              <div className="text-gray-400 ml-4 mb-2">
                <span className="text-blue-400">studentsPlaced</span>
                <span className="text-gray-400">:</span>{" "}
                <span className="text-cyan-400">10000</span>,
              </div>

              <div className="text-gray-400 ml-4 mb-2">
                <span className="text-blue-400">internships</span>
                <span className="text-gray-400">:</span>{" "}
                <span className="text-cyan-400">500</span>,
              </div>

              <div className="text-gray-400 ml-4 mb-2">
                <span className="text-blue-400">successRate</span>
                <span className="text-gray-400">:</span>{" "}
                <span className="text-cyan-400">95.7</span>
              </div>

              <div className="text-gray-400 mb-5">{"};"}</div>

              {/* Animated Code */}
              <div className="border-l-2 border-green-500 pl-4 mb-4">
                <div className="text-gray-300 whitespace-pre">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </div>
              </div>

              {/* Function Call */}
              <div className="text-gray-400">
                <span className="text-blue-400">await</span>{" "}
                <span className="text-yellow-400">startCareerJourney</span>
                <span className="text-gray-400">(</span>
                <span className="text-green-400">careerPlatform</span>
                <span className="text-gray-400">);</span>
              </div>

              {/* Output */}
              <div className="mt-4 p-4 bg-gray-800 rounded-lg border-l-4 border-green-500">
                <div className="text-green-400 font-semibold mb-2">Output:</div>
                <div className="text-gray-300 text-sm">
                  ✅ Profile created successfully
                  <br />
                  🎯 Matched with 15+ internships
                  <br />
                  📧 Applications sent: 3<br />
                  🚀 Career launch in progress...
                </div>
              </div>
            </div>

            {/* Editor Footer */}
            <div className="px-6 py-3 bg-gray-800 border-t border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>🌐 JavaScript</span>
                  <span>⚡ Live</span>
                </div>
                <div>Ready to code your future</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
