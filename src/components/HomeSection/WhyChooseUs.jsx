import React from "react";
import {
  Users,
  Briefcase,
  Projector,
  Brain,
  Target,
  Zap,
  Shield,
  Award,
  Clock,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";
import Wave3 from "../../others/wave/Wave3";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Live Learning with Industry Experts",
      desc: "Personalized mentorship and real-time guidance from professionals actively working in top tech companies.",
      features: ["1:1 Mentorship Sessions", "Live Q&A Workshops", "Career Guidance"],
      stat: "50+ Industry Mentors",
      gradient: "from-purple-500 to-pink-500",
      delay: "0"
    },
    {
      icon: <Projector className="w-8 h-8" />,
      title: "Real-World Projects",
      desc: "Hands-on experience building production-ready applications that you can proudly showcase in your portfolio.",
      features: ["10+ Capstone Projects", "GitHub Portfolio", "Deployment Support"],
      stat: "100+ Projects Completed",
      gradient: "from-blue-500 to-cyan-500",
      delay: "100"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Job Placements & Career Support",
      desc: "Direct placement into top tech roles with comprehensive interview preparation and career guidance support.",
      features: ["Interview Preparation", "Resume Building", "Salary Negotiation"],
      stat: "85% Placement Rate",
      gradient: "from-green-500 to-emerald-500",
      delay: "200"
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Trained", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Partner Companies", icon: <Briefcase className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "50+", label: "Industry Experts", icon: <Award className="w-6 h-6" /> },
  ];

  return (
    <section className="pt-10 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
      <Wave3 />
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're not just another learning platform - we're your career growth partner with proven results
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 lg:mb-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              style={{ animationDelay: `${reason.delay}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r opacity-0`}></div>
              
              <div className="relative p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${reason.gradient} text-white`}>
                    {reason.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {reason.title}
                    </h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                      <Clock className="w-3 h-3 mr-1" />
                      {reason.stat}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4 text-md">
                  {reason.desc}
                </p>

                <div className="space-y-2">
                  {reason.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}