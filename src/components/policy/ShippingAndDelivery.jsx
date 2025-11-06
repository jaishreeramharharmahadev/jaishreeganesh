// ===== File: src/pages/ShippingAndDelivery.jsx =====
import React from "react";
import { Download, Clock, FileText, CheckCircle, Mail, Shield } from "lucide-react";

export default function ShippingAndDelivery() {
  return (
    <div className="mt-0 lg:mt-2">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Download className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Digital Delivery Policy</h1>
            <p className="text-gray-600 mt-1 text-sm">Instant access to all your learning materials</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            GT Technovation provides exclusively digital educational content. All our courses, 
            certificates, and learning materials are delivered electronically through our secure 
            online platform. No physical products or materials are shipped.
          </p>

          {/* Important Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-8">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-semibold">Digital Products Only</p>
                <p className="text-blue-700 mt-1">
                  Please note: We do not ship any physical items, books, equipment, or merchandise. 
                  All course materials, certificates, and documents are provided in digital format only.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <Download className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Access</h3>
              <p className="text-sm text-gray-600">Immediate delivery after payment confirmation</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Digital Documents</h3>
              <p className="text-sm text-gray-600">Certificates & materials in PDF format</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Content Access</h3>
              <p className="text-sm text-gray-600">Accessed only purchased content</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Digital Delivery Process</h2>
              <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-semibold">Instant Access Guaranteed</p>
                  <p className="text-green-700 mt-1">
                    All digital courses, learning materials, and certificates are delivered immediately 
                    upon successful payment verification. You'll receive instant access through your 
                    account dashboard and a confirmation email with login instructions.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">What You'll Receive Digitally:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <div className="space-y-2">
                    <p>• Complete course videos and lectures</p>
                    <p>• Downloadable PDF study materials</p>
                    <p>• Assignment and project files</p>
                  </div>
                  <div className="space-y-2">
                    <p>• Digital completion certificates</p>
                    <p>• Code templates and resources</p>
                    <p>• Lifetime platform access</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessing Your Digital Content</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 1: Account Creation & Login</h4>
                  <p className="text-gray-700">
                    After payment confirmation, you'll receive an email with login credentials. 
                    Use these to access your personalized learning dashboard.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 2: Course Access</h4>
                  <p className="text-gray-700">
                    All purchased courses will be available in your dashboard. Click on any course 
                    to start learning immediately.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 3: Download Materials</h4>
                  <p className="text-gray-700">
                    Download supplementary materials, assignments, and resources from the course section. 
                    Certificates are available for download upon course completion.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Certificate Delivery</h2>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-3">Digital Certificates</h4>
                <p className="text-gray-700 mb-3">
                  Upon successful completion of your course, you will receive a digital certificate in PDF format. 
                  This certificate can be:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Downloaded from your student dashboard</li>
                  <li>Shared digitally with employers or on professional networks</li>
                  <li>Printed locally if you require a physical copy</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Note:</strong> We do not mail physical certificates. All certificates are provided 
                  in high-quality digital format that you can print at your convenience.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Requirements</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">To Access Your Digital Content:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <p className="font-medium mb-2">Device Requirements:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Computer, tablet, or smartphone</li>
                      <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                      <li>Stable internet connection</li>
                      <li>PDF reader for downloadable materials</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Recommended:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>4GB RAM or higher</li>
                      <li>Headphones or speakers for video content</li>
                      <li>Google Chrome for optimal performance</li>
                      <li>Adobe Acrobat Reader for PDF files</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Issues & Support</h2>
              <p className="text-gray-700 mb-4">
                If you experience any issues accessing your digital content after purchase, our support 
                team is available to help you get started immediately.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-800">
                  <strong>Immediate Assistance:</strong> If you haven't received access within 15 minutes 
                  of payment confirmation, please check your spam folder or contact us immediately at{' '}
                  <span className="font-semibold">support@gttechnovation.com</span>
                </p>
              </div>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-semibold">Need Help With Digital Access?</p>
                  <p className="text-blue-700 mt-1">
                    Contact our support team at <span className="font-semibold">support@gttechnovation.com</span> 
                    or call <span className="font-semibold">+91 78919 22459</span> for immediate assistance with 
                    any digital delivery issues.
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