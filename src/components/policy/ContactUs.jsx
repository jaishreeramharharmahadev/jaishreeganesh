// ===== File: src/pages/ContactUs.jsx =====
import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="mt-0 lg:mt-2">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 lg:p-8 pt-7">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-50 rounded-xl">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl text-gray-900">Contact Us</h1>
            <p className="text-gray-600 mt-1 text-sm">
              We're here to help with any questions or concerns
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-md text-gray-700 leading-relaxed mb-8">
            Have questions about our courses, need technical support, or want to
            learn more about GT Technovation? Our dedicated support team is
            ready to assist you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Email Support
                  </h3>
                  <p className="text-gray-700">support@gttechnovation.com</p>
                  <p className="text-gray-700">careers@gttechnovation.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Typically respond within 24 hours
                  </p>
                </div>
              </div>

              {/* <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Phone Support
                  </h3>
                  <p className="text-gray-700">+91 98765 43210</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Mon-Fri, 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Office Address
                  </h3>
                  <p className="text-gray-700">
                    GT Technovation
                    <br />
                    72A, Patel Marg
                    <br />
                    Jaipur, Rajasthan 302020
                    <br />
                    India
                  </p>
                </div>
              </div> */}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Before Contacting Us
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Check our FAQ section for quick answers</li>
                  <li>• Have your order number ready for faster service</li>
                  <li>• Describe your issue in detail for better assistance</li>
                </ul>
              </div>

            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">
                How Can We Help You?
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-300 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    Technical Support
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Issues with course access, platform functionality, or
                    technical problems
                  </p>
                </div>

                <div className="border-l-4 border-green-300 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    Billing & Payments
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Questions about payments, invoices, or payment-related
                    issues
                  </p>
                </div>

                <div className="border-l-4 border-purple-300 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    Course Content
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Questions about course materials, curriculum, or learning
                    resources
                  </p>
                </div>

                <div className="border-l-4 border-orange-300 pl-4">
                  <h4 className="font-semibold text-gray-900">Partnerships</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Business inquiries, collaboration opportunities, or
                    partnership requests
                  </p>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
