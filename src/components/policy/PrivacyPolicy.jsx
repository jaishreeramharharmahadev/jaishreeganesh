// ===== File: src/pages/PrivacyPolicy.jsx =====
import React from "react";
import { Shield, Lock, Eye, Server, Users, Cookie } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="mt-0 lg:mt-2">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8">
        <div className="flex items-center gap-4 mb-5">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 mt-1 text-sm">Last updated: 24 October 2025</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-md text-gray-700 leading-relaxed">
            At GT Technovation, we are committed to protecting your privacy and ensuring transparency 
            about how we handle your personal information. This Privacy Policy outlines our practices 
            regarding data collection, usage, and protection when you interact with our platform.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Information Collection</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Personal identification information</li>
                <li>• Payment and transaction data</li>
                <li>• Usage analytics and behavior</li>
                <li>• Technical information</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Server className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Data Usage</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Service delivery and improvement</li>
                <li>• Personalized learning experience</li>
                <li>• Secure payment processing</li>
                <li>• Legal compliance</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-blue-800 font-medium">We collect information to provide better services to our users.</p>
              </div>
              <p className="text-gray-700 mb-4">
                We may collect both personally identifiable information and non-personally identifiable information 
                from you when you use our platform. This information may include but is not limited to:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                    <p className="text-gray-700">
                      Your name, email address, and contact information provided during account registration. 
                      Information about your usage of the platform, including Courses taken, progress, quizzes, 
                      and assignments completed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cookie className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical & Usage Data</h4>
                    <p className="text-gray-700">
                      Browser information and other technical data collected automatically 
                      when you access the platform. Feedback, reviews, and comments you submit to us regarding 
                      Courses and the platform.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="space-y-2">
                  <p>• To create and manage your account on our platform</p>
                  <p>• To communicate about your account and Course updates</p>
                  <p>• To analyze and improve platform performance</p>
                  <p>• To personalize your learning experience</p>
                </div>
                <div className="space-y-2">
                  <p>• To respond to your inquiries and support requests</p>
                  <p>• To enforce our Terms and Conditions</p>
                  <p>• To protect the rights and safety of our platform</p>
                  <p>• To suggest relevant Courses</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Protect Your Information</h2>
              <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                <Lock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    We implement appropriate security measures to protect your personal information from 
                    unauthorized access, disclosure, alteration, or destruction. We use encryption, secure 
                    socket layer technology (SSL), and regular security reviews to safeguard your data. 
                    However, no method of transmission over the internet or electronic storage is 100% secure, 
                    and we cannot guarantee absolute security of your information.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sharing of Information</h2>
              <p className="text-gray-700 mb-4">
                We may share your personal information with trusted third-party service providers to help us 
                operate and improve our platform, as well as to process payments and provide customer support. 
                We do not sell, trade, or rent your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links and Services</h2>
              <p className="text-gray-700">
                Our platform may contain links to third-party websites or services that are not owned or 
                controlled by us. We are not responsible for the privacy practices of these third-party 
                websites or services. We encourage you to review the privacy policies of those third parties 
                before providing any information to them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our platform is not intended for use by individuals under the age of 13. If you are a parent 
                or guardian and believe that your child has provided us with personal information, please 
                contact us immediately, and we will take steps to remove that information from our records.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to the Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in our practices or 
                for other operational, legal, or regulatory reasons. We will notify you of any material changes 
                by posting the updated policy on this page, and the changes will be effective immediately upon posting.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}