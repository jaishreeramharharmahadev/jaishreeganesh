
// File: components/WhyChooseUs.jsx
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
  const [stats, setStats] = useState([]); // optional: can be seeded separately
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchReasons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiUrl('/whychooseus'), { timeout: 10000 });
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : [];

        // transform to include actual Icon component and defaults
        const mapped = data.map((r, idx) => ({
          ...r,
          icon: ICON_MAP[r.iconName] ? React.createElement(ICON_MAP[r.iconName], { className: 'w-8 h-8' }) : React.createElement(Users, { className: 'w-8 h-8' }),
        }));

        setReasons(mapped);

        // build simple stats from reasons (optional). You may prefer to fetch stats separately from an API.
        setStats([
          { number: '1,000+', label: 'Students Trained', icon: React.createElement(Users, { className: 'w-6 h-6' }) },
          { number: '50+', label: 'Partner Companies', icon: React.createElement(Briefcase, { className: 'w-6 h-6' }) },
          { number: '94%', label: 'Success Rate', icon: React.createElement(TrendingUp, { className: 'w-6 h-6' }) },
          { number: '30+', label: 'Industry Experts', icon: React.createElement(Award, { className: 'w-6 h-6' }) },
        ]);
      } catch (err) {
        console.error('Failed to load WhyChooseUs data', err);
        if (mounted) setError('Failed to load content.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchReasons();
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

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
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${reason.gradient} text-white`}>{reason.icon}</div>
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
                  {reason.features.map((feature, idx) => (
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