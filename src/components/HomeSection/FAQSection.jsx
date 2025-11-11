import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Headphones,
  HelpCircle,
  Layers,
  Shield,
  Rocket,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';


const faqs = [
  {
    question: "What is GT Technovation?",
    answer:
      "GT Technovation is a full-scale IT solutions and consulting company helping businesses accelerate digital innovation through advanced software, AI-driven analytics, and cloud-native architectures. We partner with enterprises and startups to design, build, and scale impactful technology ecosystems.",
  },
  {
    question: "Which services does GT Technovation specialize in?",
    answer:
      "We offer a wide range of services including Web & Mobile App Development, Cloud Infrastructure Setup, AI/ML Integration, Cybersecurity, DevOps Automation, IoT Solutions, and Enterprise Software Consulting. Our goal is to deliver scalable and secure technology tailored to each client’s vision.",
  },
  {
    question: "How do I get started with a project?",
    answer:
      "Getting started is simple — schedule a free consultation via our website. Our experts will understand your goals, prepare a detailed proposal, and define a timeline and roadmap. Once approved, our agile team begins the development and keeps you updated with weekly sprints and demos.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Our team works with modern and proven stacks: React, Next.js, Angular, Node.js, Python (Django/FastAPI), Java, Spring Boot, .NET Core, Docker, Kubernetes, AWS, Azure, and Google Cloud. We also implement Machine Learning models, blockchain integrations, and real-time data pipelines.",
  },
  {
    question: "Do you provide post-launch maintenance?",
    answer:
      "Yes! We provide 24/7 technical support, system monitoring, and maintenance packages. Our services include regular security updates, performance optimization, and feature enhancements to keep your product running at its best — even after deployment.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "GT Technovation serves multiple industries including FinTech, HealthTech, EdTech, Retail, Logistics, Manufacturing, and E-commerce. Our domain experts ensure compliance, data protection, and workflow optimization specific to each sector.",
  },
  {
    question: "How does GT Technovation ensure quality and security?",
    answer:
      "We follow ISO-aligned quality standards and DevSecOps practices. Every project goes through code reviews, automated testing, and continuous integration pipelines. Security audits, vulnerability assessments, and data encryption are part of our delivery process.",
  },
  {
    question: "Do you collaborate with startups and SMEs?",
    answer:
      "Absolutely! We’ve built MVPs, SaaS platforms, and scalable prototypes for over 50 startups. We also help with product strategy, UI/UX design, and cloud deployment, ensuring startups can grow sustainably with solid tech foundations.",
  },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl text-gray-800 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about working with{" "}
            <span className="text-emerald-500 font-semibold">GT Technovation</span>
            . From services to technology stacks — we’ve got you covered.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center px-5 py-3 text-left text-gray-900 font-semibold focus:outline-none hover:bg-blue-50/40 rounded-2xl transition-colors"
              >
                <span className="text-md pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {/* Animated Answer Section */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100 p-6 pt-0"
                    : "max-h-0 opacity-0 p-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-md p-5 text-center text-white shadow-lg">
          <div className="flex justify-center mb-3">
            <HelpCircle className="w-7 h-7 text-white/90" />
          </div>
          <h3 className="text-2xl font-bold mb-1">
            Still have questions about GT Technovation?
          </h3>
          <p className="text-blue-100 mb-4 max-w-2xl mx-auto">
            Our support team is here to guide you — from consultation to project
            delivery. Get personalized assistance today.
          </p>

          <button onClick={() => navigate('/contact-us')} className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
            <Headphones className="w-5 h-5 mr-2" />
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}