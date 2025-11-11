import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/GTT1.png";

export default function Footer() {
  const linkSections = [
    {
      title: "Quick Links",
      items: [
        { name: "Home", link: "/" },
        { name: "Internships", link: "/internships" },
        { name: "Job Portal", link: "/job-portal" },
        { name: "Mentorship", link: "/mentorship" },
        { name: "Jobs", link: "/jobs" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "Careers", link: "/careers" },
        { name: "Partners", link: "/partners" },
        { name: "Press Kit", link: "/press-kit" },
        { name: "Help & Support", link: "/support" },
        { name: "Blog", link: "/blog" },
        { name: "Success Stories", link: "/success-stories" },
      ],
    },
    {
      title: "Policies",
      items: [
        { name: "Privacy Policy", link: "/privacy-policy" },
        { name: "Terms of Conditions", link: "/terms-and-conditions" },
        { name: "Refund Policy", link: "/refund-policy" },
        { name: "Shipping and Delivery", link: "/shipping-delivery" },
        { name: "Contact Us", link: "/contact-us" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, color: "hover:text-blue-500", label: "Facebook", href: "https://facebook.com" },
    { icon: Instagram, color: "hover:text-pink-500", label: "Instagram", href: "https://instagram.com" },
    { icon: Linkedin, color: "hover:text-blue-400", label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Twitter, color: "hover:text-sky-400", label: "Twitter", href: "https://twitter.com" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+91 7891922459", href: "tel:+15551234567" },
    {
      icon: Mail,
      text: "support@gttechnovation.com",
      href: "mailto:support@gttechnovation.com",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5">
        <div className="grid lg:grid-cols-2 gap-8 mb-4">
          {/* Left column - Brand and contact */}
          <div className="space-y-4">
            {/* Brand section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={Logo} alt="GT Technovation Logo" className="h-14" />
                </div>
              </div>
              <p className="text-md leading-relaxed max-w-2xl text-gray-400">
                Transforming careers through industry-relevant training,
                hands-on projects, and personalized mentorship. Join 10,000+
                students who've accelerated their tech journey with us.
              </p>
            </div>

            {/* Contact information */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, text, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <Icon className="w-5 h-5 text-orange-500" />
                  <span className="group-hover:text-white transition-colors">
                    {text}
                  </span>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-3">
              {socialLinks.map(({ icon: Icon, color, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${color} hover:scale-110 transition-all border border-gray-700 hover:border-orange-500/30`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right column - Links */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {linkSections.map(({ title, items }, i) => (
                <div key={i}>
                  <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-orange-500" />
                    {title}
                  </h3>
                  <ul>
                    {items.map(({ name, link }, j) => (
                      <li key={j}>
                        <Link
                          to={link}
                          className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition group py-1"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition" />
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-3 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <span>
            © {new Date().getFullYear()} GT Technovation. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            - Design and Developed by GT Technovation team
          </div>
        </div>
      </div>
    </footer>
  );
}