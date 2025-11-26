import React from "react";
import { Shield, Users, Lock, Eye, Cookie } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="w-full">
      <div className="bg-gray-50 px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-white border border-gray-200 rounded-xl">
              <Shield className="w-7 h-7 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                Last updated: 26 November 2025
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8">
            <div className="space-y-8 text-sm md:text-base text-gray-700 leading-relaxed">
              {/* Intro */}
              <section>
                <p>
                  At <strong>GT Technovation</strong>, we are committed to
                  protecting your personal information and being transparent
                  about how we handle your data in connection with our
                  internship programs and Platform.
                </p>
              </section>

              {/* What we collect & how we use */}
              <section className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-gray-900" />
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Information We Collect
                    </h3>
                  </div>
                  <ul className="text-xs md:text-sm space-y-1">
                    <li>• Name and contact details (email, phone, etc.)</li>
                    <li>• Academic/educational information and preferences</li>
                    <li>• Internship domain and program selections</li>
                    <li>• Payment and transaction information (via gateway)</li>
                    <li>• Usage data such as logins, device, and browser type</li>
                    <li>• Performance metrics and submissions during internship</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-gray-900" />
                    <h3 className="font-semibold text-gray-900 text-sm">
                      How We Use Your Information
                    </h3>
                  </div>
                  <ul className="text-xs md:text-sm space-y-1">
                    <li>• To create and manage your account</li>
                    <li>• To deliver internship tasks and communications</li>
                    <li>• To evaluate your performance and progress</li>
                    <li>• To generate certificates and official documents</li>
                    <li>• To process payments via secure gateways</li>
                    <li>• To improve our programs and user experience</li>
                  </ul>
                </div>
              </section>

              {/* Data details */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  1. Personal &amp; Technical Data
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                    <p>
                      We collect personal information that you provide directly,
                      such as when you fill out forms, register for an
                      internship, submit assignments, or contact support. We
                      also collect performance-related information to evaluate
                      your internship progress.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cookie className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                    <p>
                      We may collect technical data, including IP addresses,
                      browser type, device identifiers, and usage patterns using
                      cookies or similar technologies. This helps us maintain
                      security, improve performance, and understand how the
                      Platform is used.
                    </p>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  2. Data Security
                </h2>
                <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <Lock className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <p>
                    We use reasonable technical and organizational measures to
                    protect your information from unauthorized access, misuse,
                    or loss. However, no system is completely secure. You are
                    also responsible for keeping your account credentials
                    confidential and logging out from shared devices.
                  </p>
                </div>
              </section>

              {/* Sharing */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  3. Sharing of Information
                </h2>
                <p>
                  We may share your data with trusted third-party service
                  providers only to the extent necessary to deliver our
                  services. This may include payment gateways, hosting providers
                  or email service platforms. We{" "}
                  <strong>do not sell your personal data</strong> to third
                  parties for marketing purposes.
                </p>
              </section>

              {/* Performance data */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  4. Use of Performance &amp; Outcome Data
                </h2>
                <p>
                  We may use anonymized or permission-based performance data,
                  such as successful internship completions, high performers, or
                  testimonials, to showcase outcomes, improve program quality,
                  or for analytical purposes. Any public use of your name,
                  image, or testimonial will be done with appropriate consent
                  where required.
                </p>
              </section>

              {/* Communications */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  5. Communication &amp; Notifications
                </h2>
                <p>
                  By registering with GT Technovation, you agree to receive
                  essential communications about your internship, including
                  onboarding details, task updates, deadline reminders, and
                  certificates. You may also receive program-related
                  announcements or important policy updates.
                </p>
              </section>

              {/* Updates */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  6. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or for legal, operational, or
                  regulatory reasons. Changes will be effective once posted on
                  this page. Your continued use of the Platform after such
                  changes constitutes your acceptance of the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  7. Contact Us
                </h2>
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy or how your data is handled, please contact us at{" "}
                  <span className="font-semibold">
                    support@gttechnovation.com
                  </span>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;