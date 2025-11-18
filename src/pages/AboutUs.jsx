import React from "react";
import { Target, Users, Rocket, Award, Heart, Globe, BookOpen, GraduationCap } from "lucide-react";

export default function AboutUs() {
  const stats = [
    { number: "1000+", label: "Students Trained" },
    { number: "50+", label: "Projects Completed" },
    { number: "15+", label: "Industry Experts" },
    { number: "5+", label: "Countries Reached" }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Student First",
      description: "Every decision we make is centered around student success and learning outcomes."
    },
    {
      icon: <Rocket className="w-8 h-8 text-blue-500" />,
      title: "Innovation",
      description: "We constantly evolve our teaching methods and technology to stay ahead of the curve."
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Community",
      description: "Building a supportive network of learners, mentors, and industry professionals."
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Excellence",
      description: "Committed to delivering the highest quality education and learning experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 py-8 lg:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
            About{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">
              GT Technovation
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're on a mission to bridge the gap between academic education and industry requirements 
            through innovative technology and hands-on learning experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-1 mb-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 ml-2">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-md leading-relaxed">
              To democratize quality education by making industry-relevant skills accessible to everyone, 
              regardless of their background or location. We believe in empowering individuals with 
              practical knowledge that translates directly to career success.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-1 mb-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Rocket className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 ml-2">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-md leading-relaxed">
              To become the world's most trusted platform for career transformation, where learners 
              can acquire cutting-edge skills, build meaningful projects, and connect with global 
              opportunities in the technology sector.
            </p>
          </div>
        </div>

        <div className="bg-white/80 rounded-lg shadow-sm p-4 mb-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Our Story</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="text-md mb-3">
                GT Technovation was founded in 2024 by a group of passionate engineers and educators 
                who recognized the growing gap between traditional education and industry requirements. 
                We noticed that many graduates, despite having theoretical knowledge, lacked the practical 
                skills needed to excel in today's fast-paced tech industry.
              </p>
              <p className="text-md mb-3">
                What started as a small initiative to help college students gain practical experience 
                has now evolved into a comprehensive learning platform. We've helped thousands of students 
                transition from beginners to industry-ready professionals through our project-based 
                learning approach.
              </p>
              <p className="text-md mb-2">
                Today, we continue to innovate in the ed-tech space, combining the latest technologies 
                with proven teaching methodologies to create transformative learning experiences that 
                prepare students for the careers of tomorrow.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Project-Based Learning</h3>
              <p className="text-emerald-700">
                Learn by building real-world projects that showcase your skills to potential employers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mentor Support</h3>
              <p className="text-emerald-700">
                Get personalized guidance from industry experts throughout your learning journey.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Focused</h3>
              <p className="text-emerald-700">
                Curriculum designed in collaboration with industry leaders to ensure job relevance.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl text-gray-900 mb-2">Join Our Growing Community</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a student looking to launch your career, an expert wanting to mentor, 
            or an organization seeking talent, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-700 transition-colors duration-200">
              Explore Internships
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors duration-200">
              Join as Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}