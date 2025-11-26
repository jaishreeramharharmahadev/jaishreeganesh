import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="w-full">
      <div className="bg-gray-50 px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-white border border-gray-200 rounded-xl">
              <MessageCircle className="w-7 h-7 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Contact Us
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                Have questions about the internship or policies? We’re here to
                help.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base text-gray-700">
              {/* Left side: contact details */}
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <Mail className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Email Support
                    </h3>
                    <p>support@gttechnovation.com</p>
                    <p className="text-xs text-gray-500 mt-1">
                      For general queries, payment issues, access problems, or
                      internship support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <Phone className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Phone
                    </h3>
                    <p>+91 7877224655</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Mon–Fri, 9:00 AM – 6:00 PM IST (if phone support is
                      enabled).
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">
                    Before You Reach Out
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Check your spam/junk folder for missing emails.</li>
                    <li>• Confirm that you are using your registered email.</li>
                    <li>• Keep your payment ID or transaction reference ready.</li>
                    <li>• Mention your full name and internship domain.</li>
                  </ul>
                </div>
              </div>

              {/* Right side: what we help with */}
              <div className="space-y-4 text-sm">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Common Topics We Help With
                </h3>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Internship &amp; Tasks
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Queries related to internship structure, tasks, deadlines,
                    and evaluations.
                  </p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Payment &amp; Billing
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Issues such as payment not reflecting, duplicate transactions,
                    or invoice requests.
                  </p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Certificates &amp; Access
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Difficulty accessing your account, downloading certificates,
                    or viewing completion status.
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  We aim to respond to most queries within{" "}
                  <strong>24–48 business hours</strong>. Delays may occur during
                  weekends or peak periods, but we try to resolve all genuine
                  issues as quickly as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;