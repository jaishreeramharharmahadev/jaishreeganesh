import React, { useState, useEffect } from "react";
import {
  Zap,
  TrendingUp,
  Shield,
  BarChart3,
  Code,
  Brain,
  MessageSquare,
  Palette,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  ArrowRight,
  Target,
  IndianRupee,
  MapPin,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../utils/api";

// Icon mapping
const iconMap = {
  "Blockchain and Crypto": <TrendingUp className="w-6 h-6" />,
  "Cyber Security": <Shield className="w-6 h-6" />,
  "Data Science and Analytics": <BarChart3 className="w-6 h-6" />,
  "Full Stack Web Development": <Code className="w-6 h-6" />,
  "Machine Learning": <Brain className="w-6 h-6" />,
  "Prompt Engineering": <MessageSquare className="w-6 h-6" />,
  "UI-UX Design": <Palette className="w-6 h-6" />,
  "Cloud Computing": <Cloud className="w-6 h-6" />,
  "AI & Neural Networks": <Cpu className="w-6 h-6" />,
  "Backend Development": <Database className="w-6 h-6" />,
  "DevOps Engineering": <GitBranch className="w-6 h-6" />,
};

const defaultIcon = <Code className="w-6 h-6" />;

export default function InternshipOffers() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiUrl("/internships"));
        const serverList = Array.isArray(res.data.data)
          ? res.data.data
          : res.data || [];

        const internshipsData = serverList.map((item) => ({
          ...item,
          postedDate: new Date(
            Date.now() - Math.floor(Math.random() * 20) * 86400000
          )
            .toISOString()
            .split("T")[0],
          rating: (Math.random() * 1 + 4).toFixed(1),
        }));

        setInternships(internshipsData);
      } catch (err) {
        console.error("API failed:", err);
        setError("Could not fetch internships.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.ceil((now - date) / (1000 * 60 * 60 * 24));
    return diff === 1 ? "1 day ago" : `${diff} days ago`;
  };

  const handleApply = (domain) => {
    navigate("/apply", { state: { selectedDomain: domain } });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 20);
  };

  if (loading) {
    return (
      <section className="py-10 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-gray-700 font-semibold animate-pulse">
              <Zap className="w-4 h-4 mr-2" />
              Loading Internships...
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl border shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 px-6 py-2 rounded-lg text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="py-10 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-orange-100 text-sm mb-4 shadow-sm">
            <Zap className="w-4 h-4 mr-2 text-green-500" />
            Limited Spots Available – Apply Now!
          </div>

          <h1 className="text-4xl md:text-4xl ">
            Launch Your{" "}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Tech Career
            </span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
            Join thousands of students who transformed their careers through our
            industry-focused internship programs.
          </p>
        </div>

        {/* INTERNSHIP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {internships.map((internship, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg border shadow-sm hover:shadow-xl transition duration-500 overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative p-2">
                <img
                  src={internship.image2}
                  alt={internship.domain}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {internship.domain}
                  </h3>
                  {iconMap[internship.domain] || defaultIcon}
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {internship.description}
                </p>

                {/* DETAILS */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      Stipend
                    </span>
                    <span className="font-semibold text-green-600">
                      {internship.stipend}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Location
                    </span>
                    <span className="font-semibold text-blue-600">
                      {internship.location}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 pt-1">
                    <span>Posted {getDaysAgo(internship.postedDate)}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500" />
                      {internship.rating}
                    </span>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center justify-between mt-4 border-t pt-3">
                  <button
                    onClick={() => handleApply(internship.domain)}
                    className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-sky-700 hover:to-sky-500 transition-all"
                  >
                    <Target className="w-4 h-4" />
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    to={`/internship/${internship.domain
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-gray-700 hover:text-blue-600 hover:underline"
                  >
                    Know More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}