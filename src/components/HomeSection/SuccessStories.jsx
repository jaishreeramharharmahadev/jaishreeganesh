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
      try {
        const res = await axios.get(apiUrl("/testimonials"), { timeout: 10000 });
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : [];
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        if (mounted) setError("Failed to load testimonials.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTestimonials();
    return () => (mounted = false);
  }, []);

  const loopItems = [...testimonials, ...testimonials];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => setCurrentIndex((prev) => prev + 1), AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [isAutoPlaying, testimonials.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || testimonials.length === 0) return;

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
  }, [currentIndex, testimonials]);

  const nextTestimonial = () => setCurrentIndex((prev) => prev + 1);

  const prevTestimonial = () => {
    const originalCount = testimonials.length;
    const container = containerRef.current;
    if (!container || originalCount === 0) return;

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

  const goToTestimonial = (index) => setCurrentIndex(index);

  const toggleAutoPlay = () => setIsAutoPlaying((s) => !s);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextTestimonial();
      if (e.key === "ArrowLeft") prevTestimonial();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, testimonials]);

  if (loading) return <div className="p-6 text-center">Loading testimonials...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (testimonials.length === 0)
    return <div className="p-6 text-center">No testimonials available at the moment.</div>;

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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-gray-700 w-12 h-12 rounded-full shadow border border-gray-200 flex items-center justify-center transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-gray-700 w-12 h-12 rounded-full shadow border border-gray-200 flex items-center justify-center transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 z-20 bg-white/90 text-gray-700 w-10 h-10 rounded-full shadow border border-gray-200 flex items-center justify-center transition-all duration-300"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
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