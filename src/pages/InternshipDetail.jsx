// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Briefcase,
//   MapPin,
//   IndianRupee,
//   Star,
//   Users,
//   Calendar,
//   Target,
//   BookOpen,
//   Code2,
//   Rocket,
//   CheckCircle2,
//   // Tool,
//   Award,
//   Clock,
//   FileText,
//   Shield,
//   Zap,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { apiUrl } from "../utils/api";

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
//         const res = await axios.get(
//           apiUrl(`/internships/${subDomain}`)
//         );

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
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
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
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Hero Section */}
//       <div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//             {/* Left Content */}
//             <div className="space-y-5">
//               <div>
//                 <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
//                   {internship?.domain || "Internship Program"}
//                 </h1>
//                 <p className="text-md text-gray-600 leading-relaxed">
//                   {internship?.description || ""}
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-8">
//                 <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-sm p-2 shadow-xs">
//                   <div className="flex items-center mb-1">
//                     <IndianRupee className="w-4 h-4" />
//                     <span className="font-semibold">Stipend:</span>
//                     <p className="text-md font-bold ml-2">
//                       {" "}
//                       {internship?.stipend || "Not specified"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-sm p-2 shadow-xs">
//                   <div className="flex items-center space-x-1 mb-1">
//                     <MapPin className="w-4 h-4" />
//                     <span className="font-semibold">Location:</span>
//                     <p className="text-md font-bold ml-2">
//                       {internship?.location || "Remote"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-sm p-2 shadow-xs">
//                   <div className="flex items-center space-x-1">
//                     <Star className="w-4 h-4" />
//                     <span className="font-semibold">Rating:</span>
//                     <p className="text-md font-bold ml-2">
//                       {internship?.rating?.split("·")[0]?.trim() || "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-sm p-2 shadow-xs">
//                   <div className="flex items-center space-x-1">
//                     <Users className="w-4 h-4" />
//                     <span className="font-semibold">Available Spots:</span>
//                     <p className="text-md font-bold ml-2">
//                       {internship?.spots || "Limited"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <button
//                   onClick={() => handleApplyNow(internship.domain)}
//                   className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg transform hover:scale-105"
//                 >
//                   Apply Now
//                 </button>
//               </div>
//             </div>

//             <div className="lg:pl-8">
//               <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
//                 <img
//                   src={internship?.image || "/api/placeholder/600/400"}
//                   alt={internship?.domain || "Internship"}
//                   className="w-full h-96 object-cover"
//                   onError={(e) => {
//                     e.target.src =
//                       "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Ctext x='300' y='200' font-family='Arial' font-size='18' fill='%236b7280' text-anchor='middle'%3EInternship Image%3C/text%3E%3C/svg%3E";
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="">
//         {/* Skills Section */}
//         <section className="bg-white/40 p-8">
//           <div className="flex items-center space-x-3 mb-5">
//             <Code2 className="w-8 h-8 text-blue-600" />
//             <h2 className="text-2xl font-bold text-gray-900">
//               Skills You'll Master
//             </h2>
//           </div>
//           <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//             {internship?.skills?.map((skill, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg px-4 py-2 hover:shadow-lg transition-all transform hover:-translate-y-1"
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0"></div>
//                   <span className="text-gray-800 font-semibold text-md">
//                     {skill}
//                   </span>
//                 </div>
//               </div>
//             )) || (
//               <div className="col-span-3 text-center py-8">
//                 <p className="text-gray-500 text-xl">
//                   No skills information available.
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Project Roadmap Section */}
//         <section className="bg-white/50 p-8">
//           <div className="flex items-center space-x-3 mb-8">
//             <Rocket className="w-6 h-6 text-purple-600" />
//             <h2 className="text-2xl font-bold text-gray-900">
//               Learning Roadmap
//             </h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {internship?.projectRoadmap?.map((step) => (
//               <div
//                 key={step._id}
//                 className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-sm p-3 border border-purple-200 hover:shadow-lg transition-all"
//               >
//                 <div className="flex flex-col justify-center items-center space-x-6">
//                   <div className="flex flex-col items-center flex-shrink-0  mt-1">
//                     <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-2xl shadow-lg">
//                       {step.stepNumber}
//                     </div>
//                   </div>

//                   <div className="flex-1 mt-4 text-center">
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">
//                       {step.title}
//                     </h3>
//                     <p className="text-gray-600 text-md mb-2 leading-relaxed">
//                       {step.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )) || (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-xl">
//                   No project roadmap available.
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Additional Information Section */}
//         <section className="bg-white/40 p-8">
//           <div className="flex items-center space-x-3 mb-8">
//             <Briefcase className="w-6 h-6 text-orange-600" />
//             <h2 className="text-2xl font-bold text-gray-900">
//               What You'll Get
//             </h2>
//           </div>
//           <div className=" ml-2">
//             {/* Benefits */}
//             <div className="space-y-3">
//               <h3 className="text-xl font-bold text-gray-900 flex items-center">
//                 <CheckCircle2 className="w-6 h-6 mr-3 text-green-600" />
//                 Program Benefits
//               </h3>
//               <div className="space-y-2">
//                 {internship?.additionalInfo?.whatYouGet?.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start space-x-4 px-2 py-1 bg-slate-50 border border-sky-50"
//                   >
//                     <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
//                     <span className="text-gray-700 text-md">{item}</span>
//                   </div>
//                 )) || (
//                   <p className="text-gray-500 text-lg">
//                     No benefits information available.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Prerequisites */}
//             <div className="space-y-3 mt-5">
//               <h3 className="text-xl font-bold text-gray-900 flex items-center">
//                 <Shield className="w-6 h-6 mr-3 text-blue-600" />
//                 Prerequisites
//               </h3>
//               <div className="space-y-2">
//                 {internship?.additionalInfo?.prerequisites?.map(
//                   (item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-start space-x-4 px-2 py-1 bg-slate-50 border border-sky-50"
//                     >
//                       <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
//                       <span className="text-gray-700 text-md">{item}</span>
//                     </div>
//                   )
//                 ) || (
//                   <p className="text-gray-500 text-lg">
//                     No prerequisites listed.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Tools */}
//             <div className="space-y-3 mt-5">
//               <h3 className="text-xl font-bold text-gray-900 flex items-center">
//                 {/* <Tool className="w-6 h-6 mr-3 text-purple-600" /> */}
//                 Tools & Technologies
//               </h3>
//               <div className="grid grid-cols-5 gap-5">
//                 {internship?.additionalInfo?.toolsYouWillUse?.map(
//                   (tool, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center space-x-3 p-2 bg-purple-50 rounded-md border border-purple-200"
//                     >
//                       <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                       <span className="text-gray-700 font-semibold text-md">
//                         {tool}
//                       </span>
//                     </div>
//                   )
//                 ) || (
//                   <p className="text-gray-500 text-lg col-span-2">
//                     No tools information available.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Final CTA Section */}
//         <section className="bg-gradient-to-r from-sky-600 to-sky-700 p-8 text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Ready to Start Your Journey?
//           </h2>
//           <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
//             Join thousands of students who have transformed their careers
//             through this intensive internship program.
//           </p>
//           <div className="">
//             <button
//               onClick={() => handleApplyNow(internship.domain)}
//               className="bg-white text-blue-600 px-8 py-2 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
//             >
//               Apply Now
//             </button>
//           </div>
//         </section>
//       </div>
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
} from "lucide-react";
import { apiUrl } from "../utils/api";
import fswd_c from "../assets/good.png";

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
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      );
    }, 30);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading internship details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
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
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
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
    <div className="bg-gradient-to-r from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image */}
          <div className="w-full flex justify-center lg:justify-start">
            <img
              src={internship?.image}
              alt={internship?.domain || "Internship"}
              className="w-full sm:w-4/5 lg:w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Ctext x='300' y='200' font-family='Arial' font-size='18' fill='%236b7280' text-anchor='middle'%3EInternship Image%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              {internship?.domain || "Internship Program"}
            </h1>
            <p className="text-sm sm:text-md md:text-lg text-gray-600">
              {internship?.description || ""}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" />
                  <span className="font-semibold">Stipend:</span>
                </div>
                <p className="font-bold">{internship?.stipend || "Not specified"}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Location:</span>
                </div>
                <p className="font-bold">{internship?.location || "Remote"}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span className="font-semibold">Rating:</span>
                </div>
                <p className="font-bold">{internship?.rating?.split("·")[0]?.trim() || "N/A"}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Available Spots:</span>
                </div>
                <p className="font-bold">{internship?.spots || "Limited"}</p>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleApplyNow(internship.domain)}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg transform hover:scale-105"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <section className="p-6 sm:p-8 md:p-12">
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Skills You'll Master
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {internship?.skills?.map((skill, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg px-2 sm:px-4 py-2 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
            >
              <span className="text-gray-800 font-semibold text-sm sm:text-md">
                {skill}
              </span>
            </div>
          )) || (
            <p className="text-gray-500 text-center col-span-6 py-8">
              No skills information available.
            </p>
          )}
        </div>
      </section>

      {/* Project Roadmap Section */}
      <section className="p-6 sm:p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Learning Roadmap
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {internship?.projectRoadmap?.map((step) => (
            <div
              key={step._id}
              className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-sm p-4 border border-purple-200 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.stepNumber}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-md mt-2 text-center">
                  {step.description}
                </p>
              </div>
            </div>
          )) || (
            <p className="text-gray-500 text-center py-8 col-span-4">
              No project roadmap available.
            </p>
          )}
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="bg-white/40 p-6 sm:p-8 md:p-12 space-y-8">
        {/* Program Benefits */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            Program Benefits
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {internship?.additionalInfo?.whatYouGet?.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 bg-slate-50 border border-sky-50 rounded-md"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-md">{item}</span>
              </div>
            )) || (
              <p className="text-gray-500 col-span-3 py-4">No benefits information available.</p>
            )}
          </div>
        </div>

        {/* Prerequisites */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Prerequisites
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {internship?.additionalInfo?.prerequisites?.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 bg-slate-50 border border-sky-50 rounded-md"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-md">{item}</span>
              </div>
            )) || (
              <p className="text-gray-500 col-span-3 py-4">No prerequisites listed.</p>
            )}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Tools & Technologies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {internship?.additionalInfo?.toolsYouWillUse?.map((tool, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-purple-50 rounded-md border border-purple-200"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold text-sm sm:text-md">{tool}</span>
              </div>
            )) || (
              <p className="text-gray-500 col-span-2 py-4">No tools information available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-700 p-6 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-blue-100 text-sm sm:text-md md:text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of students who have transformed their careers through this intensive internship program.
        </p>
        <button
          onClick={() => handleApplyNow(internship.domain)}
          className="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
        >
          Apply Now
        </button>
      </section>
    </div>
  );
}