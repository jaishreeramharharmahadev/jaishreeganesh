// components/SuccessStories.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Star,
  Quote,
  MapPin,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import axios from "axios";
import { apiUrl } from "../../utils/api";

export default function SuccessStories() {
  const CARD_WIDTH = 384; // w-96
  const GAP = 32; // gap-8
  const STEP = CARD_WIDTH + GAP;
  const AUTOPLAY_DELAY = 3000; // ms

  const containerRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isJumpingRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(apiUrl("/testimonials"), { timeout: 60000 });
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : [];
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        if (mounted) {
          if (err.code === 'ECONNABORTED') {
            setError('Request timeout. Please check your connection and try again.');
          } else if (err.response) {
            setError(`Server error: ${err.response.status}`);
          } else if (err.request) {
            setError('Network error. Please check your connection.');
          } else {
            setError('Failed to load testimonials.');
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTestimonials();
    return () => (mounted = false);
  }, []);

  const loopItems = [...testimonials, ...testimonials];

  useEffect(() => {
    if (!isAutoPlaying || loading) return;
    const id = setInterval(() => setCurrentIndex((prev) => prev + 1), AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [isAutoPlaying, testimonials.length, loading]);

  useEffect(() => {
    if (loading || testimonials.length === 0) return;
    
    const container = containerRef.current;
    if (!container) return;

    const originalCount = testimonials.length;
    const virtualIndex = currentIndex % (originalCount * 2);
    const scrollTarget = virtualIndex * STEP;
    const landedAtCloneStart = virtualIndex === originalCount;

    container.scrollTo({ left: scrollTarget, behavior: "smooth" });

    if (landedAtCloneStart) {
      isJumpingRef.current = true;
      const t = setTimeout(() => {
        container.scrollTo({ left: 0, behavior: "auto" });
        setCurrentIndex(0);
        isJumpingRef.current = false;
      }, 500);
      return () => clearTimeout(t);
    }
  }, [currentIndex, testimonials, loading]);

  const nextTestimonial = () => {
    if (loading) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const prevTestimonial = () => {
    if (loading || testimonials.length === 0) return;

    const originalCount = testimonials.length;
    const container = containerRef.current;
    if (!container) return;

    if (currentIndex % originalCount === 0) {
      isJumpingRef.current = true;
      const instantIndex = originalCount;
      container.scrollTo({ left: instantIndex * STEP, behavior: "auto" });
      setCurrentIndex(instantIndex - 1);
      setTimeout(() => {
        isJumpingRef.current = false;
      }, 50);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToTestimonial = (index) => {
    if (loading) return;
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    if (loading) return;
    setIsAutoPlaying((s) => !s);
  };

  useEffect(() => {
    if (loading) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextTestimonial();
      if (e.key === "ArrowLeft") prevTestimonial();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, testimonials, loading]);

  // Loading State
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Loading Skeleton */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4 animate-pulse">
              <div className="w-4 h-4 bg-orange-300 rounded mr-2"></div>
              <div className="h-4 bg-orange-300 rounded w-32"></div>
            </div>
            <div className="h-12 bg-gray-300 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-80 mx-auto animate-pulse"></div>
          </div>

          {/* Carousel Loading Skeleton */}
          <div className="relative">
            {/* Navigation Buttons Loading */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 w-12 h-12 rounded-full shadow border border-gray-200 animate-pulse"></div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 w-12 h-12 rounded-full shadow border border-gray-200 animate-pulse"></div>
            <div className="absolute top-4 right-4 z-20 bg-white/90 w-10 h-10 rounded-full shadow border border-gray-200 animate-pulse"></div>

            {/* Testimonial Cards Loading */}
            <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex-shrink-0 w-96 snap-center">
                  <div className="relative bg-white rounded-3xl shadow overflow-hidden animate-pulse">
                    {/* Quote Icon Skeleton */}
                    <div className="absolute top-6 right-6">
                      <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    </div>

                    <div className="p-6">
                      {/* User Info Skeleton */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl bg-gray-300 border-2 border-gray-100"></div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
                          <div className="h-4 bg-gray-300 rounded mb-1 w-1/2"></div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-gray-300 rounded mr-1"></div>
                            <div className="h-3 bg-gray-300 rounded w-20"></div>
                          </div>
                        </div>
                      </div>

                      {/* Rating Skeleton */}
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="w-4 h-4 bg-gray-300 rounded"></div>
                        ))}
                        <div className="h-4 bg-gray-300 rounded w-8 ml-2"></div>
                      </div>

                      {/* Domain and Duration Skeleton */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-6 bg-gray-300 rounded w-20"></div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-gray-300 rounded mr-1"></div>
                          <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>

                      {/* Feedback Text Skeleton */}
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                      </div>

                      {/* Company Skeleton */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots Loading */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {[1, 2, 3].map((dot) => (
                <div key={dot} className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-center max-w-md">
              <div className="bg-red-100 text-red-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Stories</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0)
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Success Stories Yet</h3>
          <p className="text-gray-600 mb-6">Check back later for inspiring stories from our students.</p>
        </div>
      </section>
    );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
            <Award className="w-4 h-4 mr-2" />
            Trusted by 10,000+ Students
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories from{" "}
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Our Interns
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hear what our talented students have to say about their transformative journey with TechnoPhile
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-gray-700 w-12 h-12 rounded-full shadow border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
            disabled={loading}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-gray-700 w-12 h-12 rounded-full shadow border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
            disabled={loading}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 z-20 bg-white/90 text-gray-700 w-10 h-10 rounded-full shadow border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
            disabled={loading}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8"
            style={{ scrollBehavior: "smooth" }}
          >
            {loopItems.map((t, idx) => {
              const active = (idx % testimonials.length) === (currentIndex % testimonials.length);
              return (
                <div key={idx} className="flex-shrink-0 w-96 snap-center">
                  <div
                    className={`relative bg-white rounded-3xl shadow transition-transform duration-300 overflow-hidden ${
                      active ? "scale-105 z-10" : "scale-100"
                    }`}
                    aria-hidden={!active}
                  >
                    <div className="absolute top-6 right-6 text-orange-100">
                      <Quote className="w-8 h-8" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80";
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">{t.name}</h3>
                          <p className="text-sm text-gray-600">{t.role}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="truncate">{t.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(t.rating || 0)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-orange-500" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{(t.rating || 0)}.0</span>
                      </div>

                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                          {t.domain}
                        </span>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {t.duration}
                        </div>
                      </div>

                      <blockquote className="text-gray-600 leading-relaxed mb-4 italic">"{t.feedback}"</blockquote>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">Placed at</div>
                        <div className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-full">{t.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-3 mt-8">
            {testimonials.map((_, idx) => {
              const active = idx === (currentIndex % testimonials.length);
              return (
                <button
                  key={idx}
                  onClick={() => goToTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${active ? "bg-orange-500 scale-125" : "bg-gray-300"}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  disabled={loading}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}