// ===== File: src/pages/Jobs.jsx =====
import React from "react";
import { Briefcase, MapPin, Clock, DollarSign, Users, Rocket, Target, Zap } from "lucide-react";

export default function Jobs() {
  const upcomingRoles = [
    {
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote",
      experience: "1-3 years",
      skills: ["React", "JavaScript", "CSS", "TypeScript"],
      status: "Coming Soon"
    },
    {
      title: "Backend Developer",
      type: "Full-time",
      location: "Bangalore",
      experience: "2-4 years",
      skills: ["Node.js", "Python", "MongoDB", "AWS"],
      status: "Coming Soon"
    },
    {
      title: "UI/UX Designer",
      type: "Contract",
      location: "Remote",
      experience: "2+ years",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      status: "Coming Soon"
    },
    {
      title: "Data Analyst",
      type: "Full-time",
      location: "Hyderabad",
      experience: "1-3 years",
      skills: ["Python", "SQL", "Tableau", "Statistics"],
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            Build Your Career With Us
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're building a team of passionate individuals who want to make a difference in education technology. 
            Explore upcoming opportunities to grow with us.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-gray-600">Team Members</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <Rocket className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">5+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">1000+</div>
            <div className="text-gray-600">Students Impacted</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
        </div>

        {/* Full-time Positions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Full-time Positions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're expanding our team! Check back soon for exciting full-time opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingRoles.map((job, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {job.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {job.experience}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                  Notify When Open
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Why Join Us */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Join GT Technovation?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast-Paced Growth</h3>
              <p className="text-gray-600 text-sm">Rapidly growing startup environment with huge learning opportunities</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Great Team Culture</h3>
              <p className="text-gray-600 text-sm">Collaborative environment with supportive teammates and mentors</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Impactful Work</h3>
              <p className="text-gray-600 text-sm">Directly contribute to transforming education for thousands of students</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Work</h3>
              <p className="text-gray-600 text-sm">Remote-friendly with flexible hours and work-life balance</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build the Future of Education?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join us in our mission to make quality education accessible to everyone through technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200">
              Get Job Alerts
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200">
              Submit Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}