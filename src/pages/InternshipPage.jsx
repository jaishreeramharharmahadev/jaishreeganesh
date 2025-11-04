// InternshipPage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  DollarSign,
  ArrowRight,
  BookOpen,
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
  MapPin,
  Award,
  Users,
  Clock,
  Star,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Bookmark,
  Share2,
  Sparkles,
  Target,
  CheckCircle,
  Play,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Icon mapping for domains
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

// Domain colors for badges
const domainColors = {
  "Blockchain and Crypto": "bg-purple-100 text-purple-800 border-purple-200",
  "Cyber Security": "bg-red-100 text-red-800 border-red-200",
  "Data Science and Analytics": "bg-blue-100 text-blue-800 border-blue-200",
  "Full Stack Web Development": "bg-green-100 text-green-800 border-green-200",
  "Machine Learning": "bg-orange-100 text-orange-800 border-orange-200",
  "Prompt Engineering": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "UI-UX Design": "bg-pink-100 text-pink-800 border-pink-200",
  "Cloud Computing": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "AI & Neural Networks": "bg-amber-100 text-amber-800 border-amber-200",
  "Backend Development": "bg-teal-100 text-teal-800 border-teal-200",
  "DevOps Engineering": "bg-lime-100 text-lime-800 border-lime-200",
};

// Default icon for unknown domains
const defaultIcon = <Code className="w-6 h-6" />;

// Mock data for featured companies (in real app, this would come from API)
const featuredCompanies = [
  {
    name: "Google",
    logo: "https://via.placeholder.com/60x30/4285F4/FFFFFF?text=G",
  },
  {
    name: "Microsoft",
    logo: "https://via.placeholder.com/60x30/737373/FFFFFF?text=MS",
  },
  {
    name: "Amazon",
    logo: "https://via.placeholder.com/60x30/FF9900/000000?text=AMZ",
  },
  {
    name: "Meta",
    logo: "https://via.placeholder.com/60x30/1877F2/FFFFFF?text=META",
  },
  {
    name: "Netflix",
    logo: "https://via.placeholder.com/60x30/E50914/FFFFFF?text=NFLX",
  },
];

export default function InternshipPage() {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [viewedInternships, setViewedInternships] = useState(new Set());
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  // Fetch internships from API
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/internships");
        if (res.data) {
          const internshipsData = res.data.data.map((internship) => ({
            ...internship,
            postedDate: new Date(
              Date.now() - Math.floor(Math.random() * 20) * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[0],
            applicants: Math.floor(Math.random() * 500) + 50,
            rating: (Math.random() * 1 + 4).toFixed(1), // 4.0 - 5.0
          }));
          setInternships(internshipsData);
          setFilteredInternships(internshipsData);
        } else {
          setError("Invalid data format from server.");
        }
      } catch (err) {
        // Fallback to mock data if API fails
        console.log("API failed, using mock data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Filter and sort internships
  useEffect(() => {
    let result = [...internships];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (internship) =>
          internship.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by domain
    if (selectedDomain !== "All") {
      result = result.filter(
        (internship) => internship.domain === selectedDomain
      );
    }

    // Sort results
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === "applicants") {
      result.sort((a, b) => b.applicants - a.applicants);
    } else if (sortBy === "rating") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    setFilteredInternships(result);
  }, [searchTerm, selectedDomain, sortBy, internships]);

  // Track when internships are viewed
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const internshipId = entry.target.getAttribute("data-id");
            if (!viewedInternships.has(internshipId)) {
              setViewedInternships((prev) => new Set([...prev, internshipId]));
              // In a real app, you would send an API request to track the view
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [filteredInternships, viewedInternships]);

  // Get unique domains for filter
  const domains = [
    "All",
    ...new Set(internships.map((internship) => internship.domain)),
  ];

  // navigate then ensure top-of-page — robust approach:
  const handleApplyNow = (domain) => {
    navigate("/apply", { state: { selectedDomain: domain } });

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      );
    }, 30);
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <section className="py-10 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-gray-700 text-sm font-semibold mb-4 animate-pulse">
              <Zap className="w-4 h-4 mr-2" />
              Loading Internships...
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-pulse"
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
      <section className="py-10 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden min-h-screen">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 text-gray-700 text-sm font-semibold mb-4 shadow-sm">
            <Zap className="w-4 h-4 mr-2 text-orange-500" />
            Limited Spots Available - Apply Before They're Gone!
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Launch Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Tech Career
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of students who transformed their careers through our
            industry-focused internship programs
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">5,000+</div>
              <div className="text-gray-600 text-sm">Successful Interns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">200+</div>
              <div className="text-gray-600 text-sm">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">94%</div>
              <div className="text-gray-600 text-sm">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">4.8/5</div>
              <div className="text-gray-600 text-sm">Student Rating</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 p-4 mb-8 border border-sky-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search internships by domain or skills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-sky-300 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Domain Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full lg:w-48 pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-sky-300 transition-all bg-white"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredInternships.length}
            </span>{" "}
            internships
          </div>
        </div>

        {/* Internship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-12">
          {filteredInternships.map((internship, index) => (
            <div
              key={internship.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-id={internship.id}
              className="group bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:border-blue-300 hover:-translate-y-2 relative"
            >
              {/* Featured Badge */}
              {internship.isFeatured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}

              <div className="relative overflow-hidden">
                <img
                  src={internship.image}
                  alt={internship.domain}
                  className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Spots Left */}
                <div className="absolute bottom-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  {internship.spots || "Limited spots"}
                </div>

                {/* Domain Badge */}
                <div
                  className={`absolute bottom-4 left-4 border ${
                    domainColors[internship.domain] ||
                    "bg-gray-100 text-gray-800 border-gray-200"
                  } rounded-full px-3 py-1 text-xs font-medium`}
                >
                  {internship.domain.split(" ")[0]}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {internship.domain}
                  </h3>
                  {iconMap[internship.domain] || defaultIcon}
                </div>

                <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">
                  {internship.description}
                </p>

                {/* Internship Details */}
                <div className="space-y-3 mb-4">
                  {/* Stipend */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Stipend:</span>
                    </div>
                    <span className="font-semibold text-green-600 text-sm">
                      {internship.stipend}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">Location:</span>
                    </div>
                    <span className="font-semibold text-blue-600 text-sm">
                      {internship.location}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  {/* Posted Date */}
                  <div className="text-xs text-gray-400 mb-4">
                    Posted {getDaysAgo(internship.postedDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span>{internship.rating}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleApplyNow(internship.domain)}
                    className="flex-1 mr-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/apply flex items-center justify-center gap-2"
                  >
                    <Target className="w-4 h-4" />
                    Apply Now
                    <ArrowRight className="w-4 h-4 group-hover/apply:translate-x-1 transition-transform" />
                  </button>

                  <div className="">
                    <Link
                      to={`/internship/${internship.domain
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center p-2 border text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group/knowmore"
                      title="View Details"
                    >
                      <Play className="w-4 h-4 mr-2 group-hover/knowmore:scale-110 transition-transform" />{" "}
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No internships found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or browse all available
              internships
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDomain("All");
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Internships
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Tech Journey?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers
            through our internship programs. Get real-world experience,
            mentorship, and a chance to work with top companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Schedule a Consultation
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Trusted by students from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {featuredCompanies.map((company, index) => (
              <img
                key={index}
                src={company.logo}
                alt={company.name}
                className="h-8 grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
