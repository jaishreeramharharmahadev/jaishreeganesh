import React from "react";
import { Code2, Brain, Megaphone, Cpu, PenTool, Palette } from "lucide-react";

const programs = [
  {
    title: "Web Development",
    description:
      "Master the art of creating dynamic and responsive websites using HTML, CSS, JavaScript, React, and backend technologies. Build real-world projects and learn full-stack development.",
    icon: <Code2 className="w-10 h-10 text-blue-500" />,
  },
  {
    title: "Data Science",
    description:
      "Dive into data analytics, visualization, and machine learning using Python, Pandas, and Power BI. Learn how to make data-driven decisions and uncover insights from massive datasets.",
    icon: <Brain className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Digital Marketing",
    description:
      "Understand SEO, Google Ads, social media marketing, and content strategy. Learn how to boost online visibility and build a strong digital presence for brands and businesses.",
    icon: <Megaphone className="w-10 h-10 text-yellow-500" />,
  },
  {
    title: "Machine Learning",
    description:
      "Explore supervised and unsupervised learning, neural networks, and AI model deployment. Gain hands-on experience in building intelligent systems using Python and TensorFlow.",
    icon: <Cpu className="w-10 h-10 text-purple-500" />,
  },
  {
    title: "UI/UX Designer",
    description:
      "Learn to design user-friendly and aesthetic interfaces using Figma, Adobe XD, and modern UX principles. Understand design thinking and how to create seamless user experiences.",
    icon: <PenTool className="w-10 h-10 text-pink-500" />,
  },
  {
    title: "Graphic Design",
    description:
      "Develop creative visual content using Photoshop, Illustrator, and Canva. Learn typography, branding, and visual storytelling to bring ideas to life through design.",
    icon: <Palette className="w-10 h-10 text-red-500" />,
  },
];

const MostPopularPrograms = () => {
  return (
    <div className=" bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:px-10">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl text-gray-900 my-3">
            Most Popular <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Programs</span>
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
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-8 transition duration-300 border border-gray-100 hover:-translate-y-2"
          >
            <div className="flex items-center justify-center mb-6">
              {program.icon}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
              {program.title}
            </h2>
            <p className="text-gray-600 text-sm text-center leading-relaxed">
              {program.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularPrograms;