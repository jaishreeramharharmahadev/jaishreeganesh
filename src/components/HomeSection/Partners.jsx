import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Partners = () => {
  const partners = [
    {
      name: "TCS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/1280px-Tata_Consultancy_Services_old_logo.svg.png",
    },
    {
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      name: "HCL",
      logo: "https://e7.pngegg.com/pngimages/685/961/png-clipart-logo-brand-trademark-product-design-hcl-technologies-design-blue-text.png",
    },
    {
      name: "Tech Mahindra",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Tech_Mahindra_New_Logo.svg/2560px-Tech_Mahindra_New_Logo.svg.png",
    },
    {
      name: "Accenture",
      logo: "https://www.clutch.com/wp-content/uploads/2018/04/Accenture-logo-no-background.png",
    },
    {
      name: "Cognizant",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cognizant_logo_2022.svg/2560px-Cognizant_logo_2022.svg.png",
    },
    {
      name: "Wipro",
      logo: "https://1000logos.net/wp-content/uploads/2021/05/Wipro-logo.png",
    },
    {
      name: "Honda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/2000px-Honda_Logo.svg.png",
    },
    { name: "Uber", logo: "https://cdn.worldvectorlogo.com/logos/uber-2.svg" },
    {
      name: "BYJU'S",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Byju%27s_logo.svg/2560px-Byju%27s_logo.svg.png",
    },
    {
      name: "Zomato",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
    },
  ];

  const loopItems = [...partners, ...partners];

  return (
    <section className="py-12 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-semibold text-gray-700"></h3>

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