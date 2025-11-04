import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Partners = () => {
  const partners = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" },
    { name: "Microsoft", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
    { name: "Amazon", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
    { name: "Meta", logo: "https://i.pinimg.com/736x/b7/06/fa/b706fa17832e8854ee125404a655f0df.jpg" },
    { name: "Netflix", logo: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg" },
    { name: "Uber", logo: "https://cdn.worldvectorlogo.com/logos/uber-2.svg" },
    { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
    { name: "Airbnb", logo: "https://cdn.worldvectorlogo.com/logos/airbnb-1.svg" }
  ];

  const loopItems = [...partners, ...partners];

  return (
    <section className="py-12 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-semibold text-gray-700">Trusted by</h3>

          <div className="hidden md:flex gap-2 items-center">
            <button className="bg-white/90 text-gray-700 w-10 h-10 rounded-full shadow-sm border border-gray-200 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="bg-white/90 text-gray-700 w-10 h-10 rounded-full shadow-sm border border-gray-200 flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="ticker-track" aria-hidden="false">
            {loopItems.map((p, i) => (
              <div
                key={i}
                className="ticker-item flex-shrink-0 flex items-center justify-center p-6"
                title={p.name}
              >
                <div className="logo-wrap w-40 h-18 flex items-center justify-center">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-12 max-w-full object-contain transition-transform duration-300 logo-img"
                    draggable="false"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* container for the scrolling track */
        .ticker-track {
          display: flex;
          align-items: center;
          width: 200%; /* duplicated items occupy full 200% */
          animation: scroll-left 20s linear infinite;
          will-change: transform;
        }

        /* Pause on hover */
        .ticker-track:hover {
          animation-play-state: paused;
        }

        /* Each item is auto-sized so the loop is seamless */
        .ticker-item {
          flex: 0 0 auto;
        }

        /* scale on hover for an item */
        .ticker-item:hover .logo-img {
          transform: scale(1.06);
        }

        /* ensure logos remain in full color (some SVGs may have inline fills) */
        .logo-img {
          filter: none !important;
        }

        /* keyframes: move left by 50% of the duplicated width so the second half continues seamlessly */
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* responsive tweaks */
        @media (max-width: 640px) {
          .logo-wrap { width: 28vw; }
          .ticker-track { animation-duration: 28s; } /* slower on small screens */
        }
        @media (min-width: 1280px) {
          .ticker-track { animation-duration: 16s; } /* faster on wide screens */
        }
      `}</style>
    </section>
  );
};

export default Partners;