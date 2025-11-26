import React from "react";
import { Download, FileText, Clock } from "lucide-react";

const ShippingAndDelivery = () => {
  return (
    <div className="w-full">
      <div className="bg-gray-50 px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-white border border-gray-200 rounded-xl">
              <Download className="w-7 h-7 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Digital Delivery Policy
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                All internship-related services are delivered online only.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8">
            <div className="space-y-8 text-sm md:text-base text-gray-700 leading-relaxed">
              {/* Intro */}
              <section>
                <p>
                  GT Technovation provides internship programs and related
                  services entirely in a <strong>digital format</strong>. We do
                  not ship or deliver any physical items as part of our
                  standard offerings.
                </p>
              </section>

              {/* Cards */}
              <section className="grid md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <Download className="w-7 h-7 text-gray-900 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Online Access
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Access to the internship dashboard and tasks is provided
                    digitally after successful payment and onboarding.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <FileText className="w-7 h-7 text-gray-900 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Digital Documents
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Offer letters, guidelines, and certificates (if eligible)
                    are shared in digital document form.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <Clock className="w-7 h-7 text-gray-900 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Controlled Duration
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Access to resources and platforms may be limited to the
                    internship duration or as defined in program guidelines.
                  </p>
                </div>
              </section>

              {/* How you receive */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  How You Receive Internship Details
                </h2>
                <ul className="list-disc ml-5 space-y-1">
                  <li>
                    Login credentials and onboarding details are sent to your{" "}
                    <strong>registered email address</strong>.
                  </li>
                  <li>
                    Internship tasks, instructions, and resources are shared via
                    the dashboard or email.
                  </li>
                  <li>
                    Upon successful completion (if eligibility criteria are
                    met), a <strong>digital certificate</strong> is provided.
                  </li>
                </ul>
                <p className="mt-3">
                  If you do not receive communication within a reasonable
                  timeframe after payment, please check your spam/junk folders
                  and then contact our support team.
                </p>
              </section>

              {/* No physical shipping */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  No Physical Shipments
                </h2>
                <p>
                  GT Technovation does <strong>not</strong> issue physical
                  certificates, ID cards, or merchandise by default. If you
                  require a printed certificate, you may download the digital
                  copy provided and print it for your own use.
                </p>
              </section>

              {/* Support */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Support for Delivery Issues
                </h2>
                <p>
                  For any issues related to non-receipt of digital documents or
                  access, please write to us at{" "}
                  <span className="font-semibold">
                    support@gttechnovation.com
                  </span>{" "}
                  with your registered email and payment details.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndDelivery;