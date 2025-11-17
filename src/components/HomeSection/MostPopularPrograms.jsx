import React from "react";
import { Code2, Brain, Megaphone, Cpu, PenTool, Palette } from "lucide-react";

const programs = [
  {
    title: "Web Development",
    description:
      "Master the art of creating dynamic and responsive websites using HTML, CSS, JavaScript, React, and backend technologies. Build real-world projects and learn full-stack development.",
    icon: <Code2 className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Data Science",
    description:
      "Dive into data analytics, visualization, and machine learning using Python, Pandas, and Power BI. Learn how to make data-driven decisions and uncover insights from massive datasets.",
    icon: <Brain className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Digital Marketing",
    description:
      "Understand SEO, Google Ads, social media marketing, and content strategy. Learn how to boost online visibility and build a strong digital presence for brands and businesses.",
    icon: <Megaphone className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Machine Learning",
    description:
      "Explore supervised and unsupervised learning, neural networks, and AI model deployment. Gain hands-on experience in building intelligent systems using Python and TensorFlow.",
    icon: <Cpu className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "UI/UX Designer",
    description:
      "Learn to design user-friendly and aesthetic interfaces using Figma, Adobe XD, and modern UX principles. Understand design thinking and how to create seamless user experiences.",
    icon: <PenTool className="w-8 h-8 text-pink-500" />,
  },
  {
    title: "Graphic Design",
    description:
      "Develop creative visual content using Photoshop, Illustrator, and Canva. Learn typography, branding, and visual storytelling to bring ideas to life through design.",
    icon: <Palette className="w-8 h-8 text-red-500" />,
  },
];

const MostPopularPrograms = () => {
  return (
    <div className=" bg-gradient-to-r from-gray-50 to-blue-50 py-6 px-3 md:px-10">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl text-gray-900 my-3">
          Most Popular{" "}
          <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Programs
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the most in-demand programs designed to boost your career and
          technical skills. Choose your path and start learning with expert-led
          guidance.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-white shadow-sm hover:shadow-md rounded-lg p-2 transition duration-300 border border-gray-300 hover:-translate-y-2"
          >
            <div
              key={index}
              className="relative bg-white shadow-sm hover:shadow-md p-6 border border-gray-300 overflow-hidden"
            >
              <svg
                className="absolute top-1 left-0 opacity-50"
                width="160"
                height="80"
              >
                {[
                  [0, 3, 20, 3],
                  [0, 8, 30, 8],
                  [0, 13, 40, 13],
                  [0, 18, 10, 18],
                ].map(([x1, y1, x2, y2], i) => (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#2fe0a6"
                      strokeWidth="1"
                    />
                    <circle cx={x2} cy={y2} r="2" fill="#2fe0a6" />
                  </g>
                ))}
              </svg>

              <svg
                className="absolute bottom-1 right-0 opacity-50"
                width="160"
                height="80"
              >
                {[
                  [170, 60, 140, 60],
                  [190, 65, 120, 65],
                  [190, 70, 130, 70],
                  [190, 75, 120, 75],
                ].map(([x1, y1, x2, y2], i) => (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#314bf5"
                      strokeWidth="1"
                    />
                    <circle cx={x2} cy={y2} r="2" fill="#314bf5" />
                  </g>
                ))}
              </svg>

              <div className="relative z-10 flex items-center justify-center mb-3">
                {program.icon}
              </div>

              <h2 className="relative z-10 text-lg font-bold text-gray-900 mb-1 text-center">
                {program.title}
              </h2>

              <p className="relative z-10 text-gray-700 leading-relaxed text-center text-md">
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularPrograms;