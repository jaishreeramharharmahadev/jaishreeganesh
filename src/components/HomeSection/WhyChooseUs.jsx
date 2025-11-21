import React from 'react';
import {
  Users,
  Briefcase,
  Projector,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { motion } from "framer-motion";
import Wave3 from '../../others/wave/Wave3';

const ICON_MAP = {
  Users: Users,
  Briefcase: Briefcase,
  Projector: Projector,
  Award: Award,
  TrendingUp: TrendingUp,
  Clock: Clock,
  CheckCircle: CheckCircle,
};

const REASONS_DATA = [
  {
    "title": "Live Learning with Industry Experts",
    "desc": "Personalized mentorship and real-time guidance from professionals actively working in top tech companies.",
    "features": ["1:1 Mentorship Sessions", "Live Q&A Workshops", "Career Guidance"],
    "stat": "50+ Industry Mentors",
    "delay": 0,
    "iconName": "Users",
  },
  {
    "title": "Real-World Projects",
    "desc": "Hands-on experience building production-ready applications that you can proudly showcase in your portfolio.",
    "features": ["10+ Capstone Projects", "GitHub Portfolio", "Deployment Support"],
    "stat": "100+ Projects Completed",
    "delay": 150,
    "iconName": "Projector",
  },
  {
    "title": "Job Placements & Career Support",
    "desc": "Direct placement into top tech roles with comprehensive interview preparation and career guidance support.",
    "features": ["Interview Preparation", "Resume Building", "Salary Negotiation"],
    "stat": "85% Placement Rate",
    "delay": 250,
    "iconName": "Briefcase",
  }
];

const STATS_DATA = [
  { number: '1,000+', label: 'Students Trained', icon: Users },
  { number: '50+', label: 'Partner Companies', icon: Briefcase },
  { number: '94%', label: 'Success Rate', icon: TrendingUp },
  { number: '30+', label: 'Industry Experts', icon: Award },
];

export default function WhyChooseUs() {
  const reasons = REASONS_DATA.map((reason) => ({
    ...reason,
    icon: React.createElement(
      ICON_MAP[reason.iconName] || Users, 
      { className: 'w-8 h-8' }
    ),
  }));
  const stats = STATS_DATA.map((stat) => ({
    ...stat,
    icon: React.createElement(stat.icon, { className: 'w-6 h-6' })
  }));

  return (
    <section className="pt-10 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
      <Wave3 />
      <div className="absolute top-40 right-40 w-32 h-32 bg-orange-400 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-3">
            Why{" "}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Choose Us
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're not just another learning platform - we're your career growth partner with proven results
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              className="bg-white/85 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-gray-100 text-teal-700 rounded-lg">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Reasons Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 lg:mb-10">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="relative p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-purple-400 text-white">
                    {reason.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{reason.title}</h3>
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      <Clock className="w-3 h-3 mr-1" />
                      {reason.stat}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 text-md">{reason.desc}</p>

                <div className="space-y-2">
                  {reason.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}