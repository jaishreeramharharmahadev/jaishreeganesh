// import React from "react";

// export default function FloatCourse({ speed = 20 }) {
//   // speed controls duration (seconds) — higher = slower. Default 20s.
//   const courses = [
//     "Web Development",
//     "Data Science",
//     "Digital Marketing",
//     "Machine Learning",
//     "UI/UX Designer",
//     "Graphic Design",
//   ];

//   const track = [...courses, ...courses];

//   return (
//     <section className="w-full py-8 bg-gradient-to-r from-sky-100 to-white">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="overflow-hidden w-full rounded-xl border border-gray-200 bg-white/60 shadow-sm">
//           <div
//             className="marquee relative whitespace-nowrap flex items-center"
//             style={{
//               animationDuration: `${speed}s`,
//             }}
//             aria-hidden="false"
//             role="region"
//             aria-label="Floating course categories"
//           >
//             {track.map((label, idx) => (
//               <div
//                 key={`${label}-${idx}`}
//                 className="mx-6 md:mx-8 flex-shrink-0 px-4 py-3 md:px-6 md:py-4 rounded-lg bg-gradient-to-br from-orange-400 to-blue-500 text-white font-semibold shadow-md transform-gpu hover:scale-105 transition-transform"
//                 tabIndex={0}
//                 aria-label={label}
//               >
//                 {label}
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//       <style>{`
//         /* marquee: translateX from 0 -> -50% so duplicated content loops seamlessly */
//         .marquee {
//           display: inline-flex;
//           align-items: center;
//           will-change: transform;
//           animation-name: marquee-anim;
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//           animation-play-state: running;
//         }

//         /* pause on hover and focus within */
//         .marquee:hover,
//         .marquee:focus-within {
//           animation-play-state: paused;
//         }

//         @keyframes marquee-anim {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }

//         /* Respect user preference for reduced motion */
//         @media (prefers-reduced-motion: reduce) {
//           .marquee { animation: none !important; }
//         }

//         /* make sure duplicated track width is at least 200% so -50% moves one full copy */
//         .marquee > * { /* children are the pill items */ }
//       `}</style>
//     </section>
//   );
// }

import React, { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Zap,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

export default function FloatCourse({ speed = 20 }) {
  const [activeCourse, setActiveCourse] = useState(null);

  const courses = [
    {
      name: "Web Development",
      students: "12.5K",
      duration: "3 months",
      level: "Beginner",
      trend: "+15%",
    },
    {
      name: "Data Science",
      students: "8.2K",
      duration: "6 months",
      level: "Advanced",
      trend: "+25%",
    },
    {
      name: "Digital Marketing",
      students: "15.3K",
      duration: "4 months",
      level: "Intermediate",
      trend: "+18%",
    },
    {
      name: "Machine Learning",
      students: "6.7K",
      duration: "5 months",
      level: "Advanced",
      trend: "+30%",
    },
    {
      name: "UI/UX Design",
      students: "11.8K",
      duration: "3 months",
      level: "Beginner",
      trend: "+22%",
    },
    {
      name: "Graphic Design",
      students: "9.4K",
      duration: "4 months",
      level: "Intermediate",
      trend: "+12%",
    },
  ];

  const track = [...courses, ...courses];

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "from-green-400 to-green-500";
      case "Intermediate":
        return "from-blue-400 to-blue-500";
      case "Advanced":
        return "from-purple-400 to-purple-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2000ms" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Marquee Container */}
        <div className="relative">
          <div className="overflow-hidden w-full rounded-2xl border border-gray-200/80 bg-white/60 backdrop-blur-sm shadow-lg">
            <div
              className="marquee relative whitespace-nowrap flex items-center py-6"
              style={{
                animationDuration: `${speed}s`,
              }}
              aria-hidden="false"
              role="region"
              aria-label="Popular course categories"
            >
              {track.map((course, idx) => (
                <div
                  key={`${course.name}-${idx}`}
                  className="mx-4 flex-shrink-0 transform-gpu transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setActiveCourse(course.name)}
                  onMouseLeave={() => setActiveCourse(null)}
                  onFocus={() => setActiveCourse(course.name)}
                  onBlur={() => setActiveCourse(null)}
                >
                  <div
                    className={`px-6 py-4 rounded-xl bg-gradient-to-br ${getLevelColor(
                      course.level
                    )} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-w-[280px] cursor-pointer border-2 border-white/20 ${
                      activeCourse === course.name
                        ? "ring-4 ring-white/50 scale-105"
                        : ""
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Explore ${course.name} course with ${course.students} students`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">{course.name}</h3>
                      <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-semibold">
                          {course.trend}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-50 via-blue-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-50 via-blue-50 to-transparent pointer-events-none"></div>
        </div>
      </div>

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
    </section>
  );
}