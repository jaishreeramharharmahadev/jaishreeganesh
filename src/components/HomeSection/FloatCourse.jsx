

import React from "react";
import { TrendingUp, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatCourse({ speed = 20 }) {
  const courses = [
    { name: "Web Development", students: "12.5K", duration: "3 months", trend: "+15%" },
    { name: "Data Science", students: "8.2K", duration: "6 months", trend: "+25%" },
    { name: "Digital Marketing", students: "15.3K", duration: "4 months", trend: "+18%" },
    { name: "Machine Learning", students: "6.7K", duration: "5 months", trend: "+30%" },
    { name: "UI/UX Design", students: "11.8K", duration: "3 months", trend: "+22%" },
    { name: "Graphic Design", students: "9.4K", duration: "4 months", trend: "+12%" },
  ];

  const track = [...courses, ...courses]; // duplicate for loop effect

  return (
    <motion.section
      className="w-full py-10 bg-gradient-to-r from-blue-50 to-white overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="overflow-hidden w-full rounded-sm border border-gray-200 bg-white shadow-sm"
        >
          <div
            className="marquee flex items-center whitespace-nowrap py-6"
            style={{ animationDuration: `${speed}s` }}
          >
            {track.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mx-4 flex-shrink-0 hover:scale-105 transition-transform duration-300"
              >
                <div className="px-6 py-4 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 text-white shadow-md cursor-pointer min-w-[240px] h-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      <TrendingUp className="w-3 h-3" />
                      {course.trend}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scrolling Animation CSS */}
      <style jsx>{`
        .marquee {
          display: inline-flex;
          align-items: center;
          will-change: transform;
          animation-name: marquee-anim;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-anim {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
}