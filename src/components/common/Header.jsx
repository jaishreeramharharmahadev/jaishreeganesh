import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ChevronDown,
  User,
  Menu,
  X,
  Briefcase,
  Users,
  Code,
  Home,
  Sparkles,
  BookOpen,
  Trophy,
  Zap,
} from "lucide-react";
import Logo from "../../assets/GTT1-r.png";
import PreLoader from "./PreLoader";

export default function Header() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hiringAlertVisible, setHiringAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const navTimerRef = useRef(null);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setHiringAlertVisible(true);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleNav = (path) => {
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
    }

    setIsLoading(true);
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    setIsUserMenuOpen(false);

    navTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      navigate(path);
    }, 300);
  };

  const handleLogin = () => {
    setUser({
      name: "John Doe",
      email: "john@example.com",
    });
    handleNav("/dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
    handleNav("/");
  };

  const handleApplyNow = () => {
    setHiringAlertVisible(false);
    handleNav("/internships");
  };

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Internships", icon: Briefcase, path: "/internships", badge: "Hiring" },
    { name: "Jobs", icon: Briefcase, path: "/jobs" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Partners", icon: Code, path: "/partners" },
  ];

  const moreItems = [
    { name: "About Us", icon: Users, path: "/about-us" },
    { name: "Contact", icon: null, path: "/contact-us" },
    { name: "Verify Certificate", icon: Trophy, path: "/verify" },
  ];

  const userMenuItems = [
    { name: "Dashboard", icon: User, path: "/dashboard" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <>
      {isLoading && <PreLoader text="Loading..." />}

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md border-b border-gray-100"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center">
              <button
                onClick={() => handleNav("/")}
                className="flex items-center group"
                aria-label="Go to home"
              >
                <img 
                  src={Logo} 
                  alt="TechnoPhile Logo" 
                  className="h-8 sm:h-10 transition-transform group-hover:scale-105" 
                />
              </button>
            </div>

            <nav className="hidden lg:flex items-center space-x-1 mx-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.path)}
                    className={`relative flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {Icon && (
                      <Icon className={`w-4 h-4 mr-2 ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`} />
                    )}
                    {item.name}
                  </button>
                );
              })}

              <div className="relative" ref={moreMenuRef}>
                <button 
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isMoreOpen 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  More
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isMoreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMoreOpen && (
                  <div 
                    className="absolute top-08 left-0 bg-white border border-gray-200 shadow-xl rounded-lg w-48 overflow-hidden z-50"
                    onMouseEnter={() => setIsMoreOpen(true)}
                    onMouseLeave={() => setIsMoreOpen(false)}
                  >
                    <div className="py-1">
                      {moreItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.name}
                            onClick={() => handleNav(item.path)}
                            className="w-full text-left flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                          >
                            {Icon && (
                              <Icon className="w-4 h-4 mr-3 text-gray-400" />
                            )}
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative hidden sm:block" ref={searchRef}>
                <div className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 ${
                  isSearchFocused 
                    ? "border-blue-400 bg-white shadow-sm" 
                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
                }`}>
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="outline-none px-2 text-sm bg-transparent w-32 placeholder-gray-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.name.charAt(0)}
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-12 right-0 bg-white border border-gray-200 shadow-xl rounded-lg w-48 overflow-hidden z-50">
                      <div className="p-3 border-b border-gray-100 bg-gray-50">
                        <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        {userMenuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.name}
                              onClick={() => handleNav(item.path)}
                              className="w-full text-left flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            >
                              <Icon className="w-4 h-4 mr-3 text-gray-400" />
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <X className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:block">Login</span>
                </button>
              )}

              <button
                className="lg:hidden p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-3 py-3">
              <div className="mb-3">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                  <Search className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="outline-none flex-1 bg-transparent text-sm placeholder-gray-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <nav className="mb-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNav(item.path)}
                      className={`w-full flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 mb-1 ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4 mr-3" />}
                      {item.name}
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 text-xs bg-red-500 text-white rounded-full animate-pulse">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="border-t border-gray-200 pt-3 mb-3">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">More</h3>
                <nav>
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNav(item.path)}
                        className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 mb-1"
                      >
                        {Icon && <Icon className="w-4 h-4 mr-3" />}
                        {item.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {!user && (
                <div className="border-t border-gray-200 pt-3">
                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login to Your Account
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {hiringAlertVisible && (
        <div className="fixed bottom-4 left-4 z-50 animate-in fade-in slide-in-from-left duration-500">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg shadow-xl p-4 max-w-xs border border-white/20">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <h3 className="font-bold text-sm mr-2">🚀 We're Hiring!</h3>
                  <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                    Limited Seats
                  </span>
                </div>
                <p className="text-xs text-white/90 mb-3 leading-relaxed">
                  Exciting internship opportunities available! Limited seats remaining. Apply now to kickstart your career.
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleApplyNow}
                    className="flex-1 bg-white text-green-700 text-xs font-bold px-3 py-2 rounded text-center hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => setHiringAlertVisible(false)}
                    className="px-3 py-2 text-xs text-white/80 hover:text-white transition-colors font-medium"
                  >
                    Later
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setHiringAlertVisible(false)}
                className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}