import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  User,
  Bell,
  Menu,
  X,
  Trophy,
  Briefcase,
  Users,
  Code,
  Home,
  Sparkles,
  BookOpen,
  Video,
} from "lucide-react";
import Logo from "../../assets/GTT1.png";

export default function Header() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [offerVisible, setOfferVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Timed offer: show after 3s, auto-hide after 8s
  useEffect(() => {
    let showTimer = null;
    let hideTimer = null;

    showTimer = setTimeout(() => {
      setOfferVisible(true);
      // hide 8 seconds after it becomes visible
      hideTimer = setTimeout(() => setOfferVisible(false), 8000);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Internships", icon: Briefcase, path: "/internships" },
    { name: "Jobs", icon: Briefcase, path: "/jobs" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Partners", icon: Code, path: "/partners" },
  ];

  const moreItems = [
    // { name: "Webinars", icon: Video, path: "/webinars" },
    { name: "About Us", icon: Users, path: "/about-us" },
    { name: "Contact", icon: null, path: "/contact-us" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 px-3 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-2xl backdrop-blur-md"
            : "bg-white shadow-md"
        }`}
      >
        <div className="container mx-auto sm:px-5">
          <div className="flex items-center justify-between py-2 sm:py-3">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center space-x-3 flex-shrink-0 min-w-0 group"
            >
              <div className="relative mt-1">
                <img
                  src={Logo}
                  alt="TechnoPhile Logo"
                  className="h-12"
                />
              </div>

            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-1 mx-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-3 py-1 text-md text-gray-700 font-medium rounded-md hover:bg-sky-50 hover:text-sky-400 transition-all duration-200 group"
                  >
                    {Icon && (
                      <Icon className="w-4 h-4 mr-1.5 text-slate-950 group-hover:text-sky-400 transition-colors" />
                    )}
                    {item.name}
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <button className="flex items-center px-3 py-1.5 text-sm text-gray-700 font-medium rounded-lg hover:bg-sky-50 hover:text-sky-400 transition-all duration-200 group">
                  <Sparkles className="w-4 h-4 mr-1.5 text-slate-950 group-hover:text-sky-400 transition-colors" />
                  More
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isMoreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMoreOpen && (
                  <div className="absolute top-8 left-0 bg-white border border-gray-100 shadow-2xl rounded-xl w-48 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="p-1">
                      {moreItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-green-50 hover:text-sky-400 transition-all duration-200 group"
                          >
                            {Icon && (
                              <Icon className="w-4 h-4 mr-2.5 text-slate-950 group-hover:text-sky-400 transition-colors" />
                            )}
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right-side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 bg-gray-50 hover:border-green-300 hover:bg-white transition-all duration-200 focus-within:border-blue-700 focus-within:shadow-lg focus-within:shadow-green-100">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search internships..."
                    className="outline-none px-2 text-sm bg-transparent w-32 sm:w-40 placeholder-gray-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Login Button */}
              <Link
                to="/login"
                className="hidden md:flex items-center bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-sky-200 hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105"
              >
                <User className="w-4 h-4 mr-1.5" />
                Login
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 bg-gradient-to-br from-slate-200 to-slate-300 text-gray-900 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-3 py-2">
              {/* Mobile Search */}
              <div className="mb-2">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
                  <Search className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search internships..."
                    className="outline-none flex-1 bg-transparent text-sm placeholder-gray-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="mb-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-sky-50 hover:text-sky-400 transition-all duration-200 border border-transparent hover:border-green-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {Icon && (
                        <Icon className="w-4 h-4 mr-3 text-blue-700" />
                      )}
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* More Items Section */}
              <div className="border-t border-gray-200 pt-2">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  More
                </h3>
                <nav className="">
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-sky-50 hover:text-sky-400 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {Icon && (
                          <Icon className="w-4 h-4 mr-3 text-blue-700" />
                        )}
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Login Button */}
              <div className="pt-2 border-t border-gray-200">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-800 to-green-700 text-white px-6 py-3 rounded-full hover:from-sky-400 hover:to-sky-700 transition-all duration-200 text-sm font-semibold shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Login to Your Account</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Left Offer Popup */}
      {offerVisible && (
        <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-left duration-500">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-2xl shadow-2xl p-4 max-w-xs border border-white/20 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm mb-1">Special Offer! 🚀</h3>
                <p className="text-xs text-white/90 mb-2">
                  Get 30% off on all premium internships. Limited time offer!
                </p>
                <div className="flex space-x-2">
                  <Link
                    to="/internships"
                    className="flex-1 bg-white text-sky-400 text-xs font-semibold px-3 py-1.5 rounded-lg text-center hover:bg-gray-100 transition-colors"
                    onClick={() => setOfferVisible(false)}
                  >
                    Explore
                  </Link>
                  <button
                    onClick={() => setOfferVisible(false)}
                    className="px-3 py-1.5 text-xs text-white/80 hover:text-white transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button
                onClick={() => setOfferVisible(false)}
                className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}