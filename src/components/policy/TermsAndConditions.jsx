// ===== File: src/pages/TermsAndConditions.jsx =====
import React from "react";
import { FileText, AlertCircle, BookOpen, CreditCard, Shield, UserCheck, Scale } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="mt-0 lg:mt-2">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-50 rounded-xl">
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Terms & Conditions</h1>
            <p className="text-gray-600 mt-1 text-sm">Last updated: 24 October 2025</p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-800">
              <strong>Important:</strong> By accessing or using GT Technovation's services, you agree to be bound by these Terms and Conditions. Please read them carefully.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using this website ("GT Technovation"), you accept and agree to be bound 
                by the following terms and conditions. The content of this Website is for general information 
                and educational purposes only. It is subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Registration & Security</h2>
              <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg mb-4">
                <UserCheck className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">User Eligibility & Responsibilities</h4>
                  <p className="text-gray-700 mb-3">
                    You must be at least 18 years old or have the consent of a parent or legal guardian to use this platform. 
                    You are responsible for maintaining the confidentiality of your account and password and for restricting 
                    access to your computer or device to prevent unauthorized access to your account.
                  </p>
                  <p className="text-gray-700">
                    You must provide accurate and complete information when creating an account or making a purchase on this platform.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
              <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg mb-4">
                <CreditCard className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Secure Payment Processing</h4>
                  <p className="text-gray-700">
                    All payments are processed securely through Razorpay. By completing a purchase, 
                    you authorize GT Technovation to charge the selected payment method for the total 
                    amount due. All fees are non-refundable unless otherwise stated in our Refund Policy.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property Rights</h2>
              <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Content Ownership & Usage</h4>
                  <p className="text-gray-700">
                    All content available on this platform, including but not limited to Course materials, 
                    videos, text, graphics, logos, and images, are the intellectual property of GT Technovation 
                    or its content providers and are protected by copyright, trademark, and other intellectual 
                    property laws.
                  </p>
                </div>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-800 font-semibold mb-2">Prohibited Activities:</p>
                <ul className="list-disc ml-6 space-y-1 text-red-700">
                  <li>Sharing, selling, or distributing any Course materials without explicit permission</li>
                  <li>Using automated scripts, bots, or unauthorized means to access the platform</li>
                  <li>Reverse engineering or modifying any platform components</li>
                  <li>Using content for commercial purposes without authorization</li>
                  <li>Violating any intellectual property rights or copyrights</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Conduct & Restrictions</h2>
              <p className="text-gray-700 mb-4">
                You agree not to use this platform for any illegal or unauthorized purpose, and you must 
                comply with all applicable laws and regulations. You will not engage in any activity that 
                may disrupt or interfere with the proper functioning of the platform.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Rules of Conduct</h4>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  <li>Respect other users and instructors on the platform</li>
                  <li>Do not share, distribute, or reproduce Course materials without permission</li>
                  <li>Do not engage in activities that may disrupt platform functioning</li>
                  <li>Do not violate any applicable laws or regulations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <div className="flex items-start gap-4 bg-orange-50 p-4 rounded-lg">
                <Scale className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    To the maximum extent permitted by law, GT Technovation shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages, including but not 
                    limited to loss of profits, data, or other intangible losses, resulting from your 
                    access to or use of our services.
                  </p>
                  <p className="text-gray-700 mt-2">
                    The platform and its content are provided "as is" and without any warranties of any kind, 
                    whether express or implied. GT Technovation disclaims all warranties, including but not 
                    limited to merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify and hold harmless GT Technovation, its affiliates, instructors, 
                and partners from any claims, damages, losses, liabilities, and expenses (including 
                attorneys' fees) arising out of your use of the platform or any violation of these 
                terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Consent to Data Usage</h2>
              <p className="text-gray-700">
                Students acknowledge that GT Technovation may collect and use their images and placement 
                details for inclusion in our marketing materials and online presence. We are committed to 
                safeguarding personal information and will handle all data in accordance with relevant 
                data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modification of Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. We will notify users of 
                significant changes through email or platform notifications. Continued use of our 
                services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law & Jurisdiction</h2>
              <p className="text-gray-700">
                These terms shall be governed by the laws of India. Any disputes shall be subject to 
                the exclusive jurisdiction of the courts in Bangalore, Karnataka.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Internship Program Terms</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Key Terms & Conditions:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700"><strong>Opportunity Offer:</strong> You will receive an offer letter for your opportunity before the start date.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700"><strong>Swag Eligibility:</strong> Eligibility for swag items is contingent on meeting specified requirements.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700"><strong>Stipend:</strong> This is an unpaid internship program for both students and experienced individuals.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700"><strong>Document Fees:</strong> Nominal expenses related to document processing may apply for offer letters, certificates, and swag delivery.</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
              <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
              <p className="text-gray-700">
                For questions about these Terms & Conditions, please contact our legal team at:{' '}
                <span className="font-semibold">legal@gttechnovation.com</span>
              </p>
              <p className="text-gray-700 mt-2">
                Phone: <span className="font-semibold">+91 98765 43210</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}