// ===== File: src/pages/Courses.jsx =====
import React from "react";
import { BookOpen, Clock, Users, Star, ArrowRight, Video, Download, Award } from "lucide-react";

export default function Courses() {
  const upcomingCategories = [
    {
      title: "Web Development",
      description: "Full-stack development with modern technologies",
      icon: "💻",
      features: ["HTML/CSS/JS", "React.js", "Node.js", "MongoDB"],
      status: "Coming Soon"
    },
    {
      title: "Data Science",
      description: "Machine Learning & AI with Python",
      icon: "📊",
      features: ["Python", "TensorFlow", "Data Analysis", "ML Algorithms"],
      status: "Coming Soon"
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile app development",
      icon: "📱",
      features: ["React Native", "Flutter", "Firebase", "App Store Deployment"],
      status: "Coming Soon"
    },
    {
      title: "Cloud Computing",
      description: "AWS, Azure and Google Cloud platforms",
      icon: "☁️",
      features: ["AWS Services", "DevOps", "Containerization", "Serverless"],
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Transforming Education Through Technology
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Launch Your Tech Career
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master in-demand skills with our industry-relevant courses. Get ready for comprehensive 
            learning experiences designed by industry experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
              <Video className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Video Lectures</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
              <Download className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Resources</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-700">Certification</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Mentor Support</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Courses Coming Soon
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're working hard to launch comprehensive courses that will equip you with 
              industry-ready skills. Be the first to know when we launch!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {upcomingCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                    {category.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2 mb-6">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2">
                  Notify Me
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-Paced Learning</h3>
              <p className="text-gray-600">Learn at your own convenience with lifetime access to course materials</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with real-world experience</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Project-Based</h3>
              <p className="text-gray-600">Build portfolio-worthy projects that demonstrate your skills</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are upgrading their skills and advancing their careers with our courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Get Notified at Launch
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              View Sample Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}