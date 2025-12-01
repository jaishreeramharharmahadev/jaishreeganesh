import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  IndianRupee,
  Star,
  Users,
  Code2,
  CheckCircle2,
  Rocket,
  Target,
  BookOpen,
  Building2,
} from "lucide-react";
import { apiUrl } from "../utils/api";
import PreLoader from "../components/common/PreLoader";

export default function InternshipDetail() {
  const { subDomain } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl(`/internships/${subDomain}`));
        if (!res.data.success) throw new Error("Invalid response");
        setInternship(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subDomain]);

  const handleApplyNow = (domain) => {
    navigate("/apply", { state: { selectedDomain: domain } });
    setTimeout(() => window.scrollTo(0, 0), 30);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <PreLoader text="Loading internship details..." />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-xl shadow-xl text-center">
          <h2 className="text-xl font-bold mb-2 text-green-700">⚠ Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        <div className="lg:order-2 flex justify-center">
          <img
            src={internship?.image2}
            alt="Internship Banner"
            className="w-full max-w-md object-cover"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/500x350?text=No+Image")
            }
          />
        </div>

        <div className="lg:order-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-700 leading-tight">
            {internship?.domain}
          </h1>
          <p className="text-md md:text-lg text-gray-600 leading-relaxed">
            {internship?.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Stat
              label="Stipend"
              icon={<IndianRupee />}
              value={internship?.stipend || "Not Mentioned"}
              note="(Performance Based)"
            />
            <Stat
              label="Location"
              icon={<MapPin />}
              value={internship?.location || "Remote"}
            />
            <Stat
              label="Rating"
              icon={<Star />}
              value={internship?.rating || "4.8/5"}
              note="Student Rated"
            />
            <Stat
              label="Spots Left"
              icon={<Users />}
              value={internship?.spots || "Limited"}
              note="Fast Filling"
            />
          </div>

          <div className="bg-sky-50 border border-blue-300 p-4 rounded-xl flex gap-3 items-start">
            <div className="text-sky-500">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-700">Work From Office Opportunity!</h3>
              <p className="text-sm text-gray-700 leading-snug">
                If your performance is excellent during the first & second week of remote internship,
                we will invite you to work from office in <strong>Jaipur, Rajasthan</strong> —
                only if you wish to! 🚀
              </p>
            </div>
          </div>

          <button
            onClick={() => handleApplyNow(internship.domain)}
            className="bg-gradient-to-r from-sky-500 to-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-sky-500 w-fit transition"
          >
            Apply Now — Limited Seats
          </button>
        </div>
      </div>

      <Section title="Skills You'll Learn" icon={<Code2 className="text-gray-700" />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {internship?.skills?.map((skill, i) => (
            <div
              key={i}
              className="bg-white border border-green-200 rounded-lg p-3 text-sm font-semibold text-gray-700 shadow-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Learning Roadmap" icon={<Rocket className="text-gray-700" />}>
        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-4 md:left-7 top-0 bottom-0 w-[3px] bg-gray-700 rounded-full"></div>
          <div className="space-y-8">
            {internship?.projectRoadmap?.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 group">
                <div className="absolute -left-2 md:-left-[10px] top-1.5">
                  <svg width="28" height="28" viewBox="0 0 24 24"
                    className="fill-green-600 transition-transform group-hover:scale-110 drop-shadow-md">
                    <path d="M12 2C8 2 5 5 5 9c0 2 .5 3 .5 3s-2.5 3-2.5 6c0 4 3 6 7 6s7-2 7-6c0-3-2.5-6-2.5-6S19 11 19 9c0-4-3-7-7-7z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-green-700 text-white flex items-center justify-center rounded-full text-sm font-bold shadow-md group-hover:scale-110 transition">
                  {step.stepNumber}
                </div>
                <div className="bg-white border border-green-200 rounded-xl shadow-sm p-4 hover:shadow-md transition w-full">
                  <h4 className="font-bold text-gray-800">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Program Benefits" icon={<CheckCircle2 className="text-gray-700" />}>
        <ul className="space-y-3">
          {internship?.additionalInfo?.whatYouGet?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 bg-white border border-green-200 p-3 rounded-lg shadow-sm">
              <CheckCircle2 className="text-green-600 mt-1" />
              <span className="text-sm text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="max-w-6xl mx-auto px-4 pb-12 grid md:grid-cols-2 gap-6">
        <SubSection
          title="Prerequisites"
          icon={<Target className="text-green-700" />}
          items={internship?.additionalInfo?.prerequisites}
        />
        <SubSection
          title="Tools & Technologies"
          icon={<BookOpen className="text-green-700" />}
          items={internship?.additionalInfo?.toolsYouWillUse}
        />
      </div>

      <div className="bg-gradient-to-r from-gray-100 to-teal-50 text-gray-800 text-center py-8">
        <h2 className="text-2xl font-bold mb-2">Kickstart Your Career 🚀</h2>
        <p className="opacity-90 mb-3">Secure your internship position today!</p>
        <button
          onClick={() => handleApplyNow(internship.domain)}
          className="bg-white text-green-700 font-bold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100"
        >
          Apply Today
        </button>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, note }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 py-3 shadow-sm hover:shadow-md transition flex items-start gap-3">
      <span className="text-teal-500 w-4 h-4 flex-shrink-0 mt-0.5">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-gray-900">
          {label}: <span className="text-green-700 font-bold">{value}</span>
        </p>
        {note && (
          <p className="text-[11px] text-gray-600 font-medium mt-0.5">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-extrabold text-gray-800">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SubSection({ title, icon, items }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-green-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-bold text-green-800">{title}</h3>
      </div>
      <ul className="space-y-2 text-sm text-gray-700">
        {items?.map((item, i) => (
          <li key={i} className="flex gap-2">
            <div className="w-2 h-2 bg-green-700 mt-2 rounded-full"></div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}