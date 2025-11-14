// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Briefcase,
//   MapPin,
//   IndianRupee,
//   Star,
//   Users,
//   Rocket,
//   Code2,
//   CheckCircle2,
//   Shield,
// } from "lucide-react";
// import { apiUrl } from "../utils/api";
// import fswd_c from "../assets/good.png";

// export default function InternshipDetail() {
//   const { subDomain } = useParams();
//   const [internship, setInternship] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!subDomain) return;

//     const fetchInternship = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(apiUrl(`/internships/${subDomain}`));
//         if (res.data.success && res.data.data) {
//           setInternship(res.data.data);
//         } else {
//           throw new Error(res.data.message || "Invalid API response");
//         }
//       } catch (err) {
//         console.error("⚠️ Fetch error:", err);
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInternship();
//   }, [subDomain]);

//   const handleApplyNow = (domain) => {
//     navigate("/apply", { state: { selectedDomain: domain } });
//     setTimeout(() => {
//       window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//       requestAnimationFrame(() =>
//         window.scrollTo({ top: 0, left: 0, behavior: "auto" })
//       );
//     }, 30);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading internship details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Something went wrong
//           </h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!internship) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-gray-400 text-6xl mb-4">🔍</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Internship Not Found
//           </h2>
//           <p className="text-gray-600">
//             The internship you're looking for doesn't exist.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-r from-gray-50 to-blue-50">
//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
//           {/* Image */}
//           <div className="w-full flex justify-center lg:justify-start">
//             <img
//               src={internship?.image2}
//               alt={internship?.domain || "Internship"}
//               className="w-[450px] sm:w-4/5 ml-3 -mt-10 h-auto object-cover"
//               onError={(e) => {
//                 e.target.src =
//                   "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Ctext x='300' y='200' font-family='Arial' font-size='18' fill='%236b7280' text-anchor='middle'%3EInternship Image%3C/text%3E%3C/svg%3E";
//               }}
//             />
//           </div>

//           {/* Content */}
//           <div className="space-y-6 sm:space-y-3">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
//               {internship?.domain || "Internship Program"}
//             </h1>
//             <p className="text-sm sm:text-md md:text-lg text-gray-600">
//               {internship?.description || ""}
//             </p>

//             {/* Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
//               <div className="bg-gradient-to-r from-purple-50 to-violet-100 rounded p-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <IndianRupee className="w-5 h-5" />
//                   <span className="font-semibold">Stipend:</span>
//                 </div>
//                 <p className="font-bold">{internship?.stipend || "Not specified"}</p>
//               </div>
//               <div className="bg-gradient-to-r from-purple-50 to-violet-100 rounded p-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <MapPin className="w-5 h-5" />
//                   <span className="font-semibold">Location:</span>
//                 </div>
//                 <p className="font-bold">{internship?.location || "Remote"}</p>
//               </div>
//               <div className="bg-gradient-to-r from-purple-50 to-violet-100 rounded p-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5" />
//                   <span className="font-semibold">Rating:</span>
//                 </div>
//                 <p className="font-bold">{internship?.rating?.split("·")[0]?.trim() || "N/A"}</p>
//               </div>
//               <div className="bg-gradient-to-r from-purple-50 to-violet-100 rounded p-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Users className="w-5 h-5" />
//                   <span className="font-semibold">Available Spots:</span>
//                 </div>
//                 <p className="font-bold">{internship?.spots || "Limited"}</p>
//               </div>
//             </div>

//             {/* Apply Button */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={() => handleApplyNow(internship.domain)}
//                 className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-sky-700 text-white px-4 py-1.5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg transform hover:scale-105"
//               >
//                 Apply Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Skills Section */}
//       <section className="p-6 sm:p-8 md:p-12">
//         <div className="flex items-center gap-3 mb-4">
//           <Code2 className="w-6 h-6 text-blue-600" />
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//             Skills You'll Master
//           </h2>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
//           {internship?.skills?.map((skill, index) => (
//             <div
//               key={index}
//               className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg px-2 sm:px-4 py-2 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
//             >
//               <span className="text-gray-800 font-semibold text-sm sm:text-md">
//                 {skill}
//               </span>
//             </div>
//           )) || (
//             <p className="text-gray-500 text-center col-span-6 py-8">
//               No skills information available.
//             </p>
//           )}
//         </div>
//       </section>

//       {/* Project Roadmap Section */}
//       <section className="p-6 sm:p-8 md:p-12">
//         <div className="flex items-center gap-3 mb-6">
//           <Rocket className="w-6 h-6 text-purple-600" />
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//             Learning Roadmap
//           </h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//           {internship?.projectRoadmap?.map((step) => (
//             <div
//               key={step._id}
//               className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-sm p-4 border border-purple-200 hover:shadow-lg transition-all"
//             >
//               <div className="flex flex-col items-center">
//                 <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xl shadow-lg">
//                   {step.stepNumber}
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-3 text-center">
//                   {step.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm sm:text-md mt-2 text-center">
//                   {step.description}
//                 </p>
//               </div>
//             </div>
//           )) || (
//             <p className="text-gray-500 text-center py-8 col-span-4">
//               No project roadmap available.
//             </p>
//           )}
//         </div>
//       </section>

//       {/* Additional Info Section */}
//       <section className="bg-white/40 p-6 sm:p-8 md:p-12 space-y-8">
//         {/* Program Benefits */}
//         <div>
//           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <CheckCircle2 className="w-6 h-6 text-green-600" />
//             Program Benefits
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
//             {internship?.additionalInfo?.whatYouGet?.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-2 p-3 bg-slate-50 border border-sky-50 rounded-md"
//               >
//                 <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
//                 <span className="text-gray-700 text-sm sm:text-md">{item}</span>
//               </div>
//             )) || (
//               <p className="text-gray-500 col-span-3 py-4">No benefits information available.</p>
//             )}
//           </div>
//         </div>

//         {/* Prerequisites */}
//         <div>
//           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <Shield className="w-6 h-6 text-blue-600" />
//             Prerequisites
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
//             {internship?.additionalInfo?.prerequisites?.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-2 p-3 bg-slate-50 border border-sky-50 rounded-md"
//               >
//                 <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
//                 <span className="text-gray-700 text-sm sm:text-md">{item}</span>
//               </div>
//             )) || (
//               <p className="text-gray-500 col-span-3 py-4">No prerequisites listed.</p>
//             )}
//           </div>
//         </div>

//         {/* Tools */}
//         <div>
//           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">
//             Tools & Technologies
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//             {internship?.additionalInfo?.toolsYouWillUse?.map((tool, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 p-2 bg-purple-50 rounded-md border border-purple-200"
//               >
//                 <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                 <span className="text-gray-700 font-semibold text-sm sm:text-md">{tool}</span>
//               </div>
//             )) || (
//               <p className="text-gray-500 col-span-2 py-4">No tools information available.</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="bg-gradient-to-r from-sky-600 to-sky-700 p-6 sm:p-12 text-center">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
//           Ready to Start Your Journey?
//         </h2>
//         <p className="text-blue-100 text-sm sm:text-md md:text-lg mb-6 max-w-2xl mx-auto">
//           Join thousands of students who have transformed their careers through this intensive internship program.
//         </p>
//         <button
//           onClick={() => handleApplyNow(internship.domain)}
//           className="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
//         >
//           Apply Now
//         </button>
//       </section>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Star,
  Users,
  Rocket,
  Code2,
  CheckCircle2,
  Shield,
  Clock,
  Calendar,
  Award,
  ChevronRight,
  PlayCircle,
  Target,
  BookOpen,
  Zap,
  HeartHandshake,
} from "lucide-react";
import { apiUrl } from "../utils/api";

export default function InternshipDetail() {
  const { subDomain } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!subDomain) return;

    const fetchInternship = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(apiUrl(`/internships/${subDomain}`));
        if (res.data.success && res.data.data) {
          setInternship(res.data.data);
        } else {
          throw new Error(res.data.message || "Invalid API response");
        }
      } catch (err) {
        console.error("⚠️ Fetch error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [subDomain]);

  const handleApplyNow = (domain) => {
    navigate("/apply", { state: { selectedDomain: domain } });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 30);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Rocket className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading internship details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-red-500 text-2xl">⚠️</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-gray-400 text-2xl">🔍</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Internship Not Found
          </h2>
          <p className="text-gray-600">
            The internship you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-9">
          {/* Mobile: Image First */}
          <div className="block lg:hidden">
            {/* Image */}
            <div className="relative mb-8">
              <div className="relative z-10">
                <img
                  src={internship?.image2}
                  alt={internship?.domain || "Internship"}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Ctext x='300' y='200' font-family='Arial' font-size='18' fill='%236b7280' text-anchor='middle'%3EInternship Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              {/* Floating Element for Mobile */}
              <div className="absolute -top-2 -right-2 bg-yellow-300 text-gray-900 px-3 py-1 rounded-full font-bold text-sm shadow-lg transform rotate-6">
                ⭐ Popular
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {internship?.domain || "Internship Program"}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                {internship?.description || "Transform your career with hands-on experience and industry-relevant skills."}
              </p>

              {/* Key Stats - Mobile */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Stipend</p>
                      <p className="text-sm font-bold text-gray-900">{internship?.stipend || "Performance Based"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="text-sm font-bold text-gray-900">{internship?.location || "Remote"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Rating</p>
                      <p className="text-sm font-bold text-gray-900">{internship?.rating?.split("·")[0]?.trim() || "4.8/5"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Spots Left</p>
                      <p className="text-sm font-bold text-gray-900">{internship?.spots || "Limited"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button - Mobile */}
              <button
                onClick={() => handleApplyNow(internship.domain)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
              >
                Apply Now - Limited Seats
              </button>
            </div>
          </div>

          {/* Desktop: Original Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-13 items-center">
            {/* Content */}
            <div className="relative z-10 space-y-5">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 ">
                {internship?.domain}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                {internship?.description}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 p-2 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-md flex items-center justify-center">
                      <IndianRupee className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stipend</p>
                      <p className="text-md font-bold text-gray-900">{internship?.stipend || "Performance Based"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 p-2 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-md font-bold text-gray-900">{internship?.location || "Remote"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 p-2 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="text-md font-bold text-gray-900">{internship?.rating?.split("·")[0]?.trim() || "4.8/5"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 p-2 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-md flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Spots Left</p>
                      <p className="text-md font-bold text-gray-900">{internship?.spots || "Limited"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleApplyNow(internship.domain)}
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="relative z-10">Apply Now - Limited Seats</span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform"></div>
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={internship?.image2}
                  alt={internship?.domain || "Internship"}
                  className="w-full max-w-lg mx-auto"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Ctext x='300' y='200' font-family='Arial' font-size='18' fill='%236b7280' text-anchor='middle'%3EInternship Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      
      </div>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-blue-200 shadow-sm mb-6">
              <Code2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Skills You'll Master
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Gain industry-relevant skills that employers are looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {internship?.skills?.map((skill, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-4 border-2 border-gray-200 hover:border-sky-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <span className="text-gray-800 font-semibold text-sm">
                  {skill}
                </span>
              </div>
            )) || (
              <div className="col-span-6 text-center py-12">
                <p className="text-gray-500 text-lg">No skills information available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Learning Roadmap Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 mb-1">
              <Rocket className="w-6 h-6" />
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Learning Roadmap
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow our step-by-step journey from beginner to industry-ready professional
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-x-1/2 hidden lg:block"></div>
            
            <div className="space-y-8">
              {internship?.projectRoadmap?.map((step, index) => (
                <div
                  key={step._id}
                  className={`relative flex flex-col lg:flex-row items-center gap-4 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                          {step.stepNumber}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-md leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Step Indicator */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 hidden lg:block">
                    <div className="w-7 h-7 bg-white border-4 border-purple-600 rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-purple-500 font-bold text-lg">{step.stepNumber}</span>
                    </div>
                  </div>

                  {/* Arrow Connector */}
                  {index < internship.projectRoadmap.length - 1 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 hidden lg:block">
                      <div className="w-5 h-5 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-bounce">
                        <ChevronRight className="w-4 h-4 text-white transform rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              )) || (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No project roadmap available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1  gap-12">
            {/* Benefits */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Program Benefits
                </h3>
              </div>
              
              <div className="space-y-4">
                {internship?.additionalInfo?.whatYouGet?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                )) || (
                  <p className="text-gray-500 py-4">No benefits information available.</p>
                )}
              </div>
            </div>

            {/* Prerequisites & Tools */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Prerequisites
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {internship?.additionalInfo?.prerequisites?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl"
                    >
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  )) || (
                    <p className="text-gray-500">No prerequisites listed.</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Tools & Technologies
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {internship?.additionalInfo?.toolsYouWillUse?.map((tool, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl border border-purple-200"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700 font-semibold text-sm">{tool}</span>
                    </div>
                  )) || (
                    <p className="text-gray-500 col-span-2">No tools information available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-sky-400"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* <Certificate className="w-20 h-20 text-white mx-auto mb-6" /> */}
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Launch Your Career?
          </h2>
          <p className="text-blue-100 text-xl lg:text-2xl mb-8 leading-relaxed">
            Join thousands of successful graduates who transformed their careers with our intensive internship program
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleApplyNow(internship.domain)}
              className="group bg-white text-blue-500 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              <span className="relative z-10">Apply Now - Limited Seats</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}