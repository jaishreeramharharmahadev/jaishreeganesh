import React, { useEffect, useState } from 'react';
import {
  Users,
  Briefcase,
  Projector,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Wave3 from '../../others/wave/Wave3';
import { apiUrl } from '../../utils/api';
import axios from 'axios';

// map iconName from API to actual lucide component
const ICON_MAP = {
  Users: Users,
  Briefcase: Briefcase,
  Projector: Projector,
  Award: Award,
  TrendingUp: TrendingUp,
  Clock: Clock,
  CheckCircle: CheckCircle,
};

export default function WhyChooseUs() {
  const [reasons, setReasons] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchReasons = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Increased timeout to 60 seconds (60000 ms)
        const res = await axios.get(apiUrl('/whychooseus'), { 
          timeout: 60000 
        });
        
        if (!mounted) return;
        
        if (res.status >= 200 && res.status < 300) {
          const data = Array.isArray(res.data) ? res.data : [];

          // transform to include actual Icon component and defaults
          const mapped = data.map((r, idx) => ({
            ...r,
            icon: ICON_MAP[r.iconName] ? 
              React.createElement(ICON_MAP[r.iconName], { className: 'w-8 h-8' }) : 
              React.createElement(Users, { className: 'w-8 h-8' }),
          }));

          setReasons(mapped);

          // build simple stats from reasons (optional)
          setStats([
            { number: '1,000+', label: 'Students Trained', icon: React.createElement(Users, { className: 'w-6 h-6' }) },
            { number: '50+', label: 'Partner Companies', icon: React.createElement(Briefcase, { className: 'w-6 h-6' }) },
            { number: '94%', label: 'Success Rate', icon: React.createElement(TrendingUp, { className: 'w-6 h-6' }) },
            { number: '30+', label: 'Industry Experts', icon: React.createElement(Award, { className: 'w-6 h-6' }) },
          ]);
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } catch (err) {
        console.error('Failed to load WhyChooseUs data', err);
        if (mounted) {
          if (err.code === 'ECONNABORTED') {
            setError('Request timeout. Please check your connection and try again.');
          } else if (err.response) {
            setError(`Server error: ${err.response.status}`);
          } else if (err.request) {
            setError('Network error. Please check your connection.');
          } else {
            setError('Failed to load content.');
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchReasons();
    return () => (mounted = false);
  }, []);

  // Show loading state with card skeletons
  if (loading) {
    return (
      <section className="pt-10 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
        <Wave3 />
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-300 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Stats Loading Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-md border border-orange-100 animate-pulse"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-gray-300 rounded-lg w-12 h-12"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded mb-2 mx-auto w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </div>
            ))}
          </div>

          {/* Reasons Loading Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 lg:mb-10">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="relative p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gray-300 w-14 h-14"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                      <div className="h-5 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>

                  <div className="h-4 bg-gray-300 rounded mb-3 w-full"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>

                  <div className="space-y-2">
                    {[1, 2, 3].map((feature) => (
                      <div key={feature} className="flex items-center">
                        <div className="w-5 h-5 bg-gray-300 rounded mr-3"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
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
      <section className="pt-10 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
        <Wave3 />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Why Choose Us</h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-center max-w-md">
              <div className="bg-red-100 text-red-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Content</h3>
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

  return (
    <section className="pt-10 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
      <Wave3 />
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Why Choose Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're not just another learning platform - we're your career growth partner with proven results
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-md border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">{stat.icon}</div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 lg:mb-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              style={{ animationDelay: `${reason.delay}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r opacity-0`}></div>

              <div className="relative p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-sky-400 to-purple-500 text-white`}>{reason.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                      <Clock className="w-3 h-3 mr-1" />
                      {reason.stat}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4 text-md">{reason.desc}</p>

                <div className="space-y-2">
                  {reason.features && reason.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}