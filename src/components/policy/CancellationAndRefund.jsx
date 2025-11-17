// ===== File: src/pages/CancellationAndRefund.jsx =====
import React from "react";
import { CreditCard, AlertTriangle, CheckCircle, XCircle, HelpCircle } from "lucide-react";

export default function CancellationAndRefund() {
  return (
    <div className="mt-0 lg:mt-2">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 lg:p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-50 rounded-xl">
            <CreditCard className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl text-gray-900">Cancellation & Refund Policy</h1>
            <p className="text-gray-600 mt-1">Last updated: 24 October 2025</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold text-gray-900">What We Guarantee</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Course access after payment</li>
                <li>• High-quality educational content</li>
                <li>• Technical support for access issues</li>
                <li>• Secure payment processing</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-6 h-6 text-red-500" />
                <h3 className="font-semibold text-gray-900">No Refund Circumstances</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Change of mind or personal circumstances</li>
                {/* <li>• Dissatisfaction with course content</li> */}
                <li>• Inability to complete the course</li>
                <li>• Technical issues on user's device</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl text-gray-900 mb-1">Our No Refund Policy</h2>
              <p className="text-gray-700">
                GT Technovation operates under a strict <strong>No Refund Policy</strong> for all course 
                enrollments and digital product purchases. This policy is designed to maintain the 
                integrity of our educational offerings and ensure fair access for all students.
              </p>
              
              <div className="p-3 rounded-lg mt-2">
                <h4 className="text-gray-900 mb-2">Why We Have This Policy</h4>
                <p className="text-gray-700">
                  As a digital education provider, once you gain access to our course materials, 
                  the value of the content cannot be reclaimed. This policy protects our intellectual 
                  property and ensures we can continue providing high-quality educational resources.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl text-gray-900 mb-2">Before You Purchase</h2>
              <div className="flex items-start gap-4 p-3 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Make an Informed Decision</h4>
                  <p className="text-gray-700">
                    We encourage you to thoroughly review course descriptions, preview available materials, 
                    and ensure the course meets your learning objectives before purchasing. Our support 
                    team is available to answer any pre-purchase questions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl text-gray-900 mb-2">Payment Disputes & Unauthorized Charges</h2>
              <p className="text-gray-700">
                If you believe a charge was made fraudulently or without your authorization, please 
                contact us immediately at <span className="font-semibold">support@gttechnovation.com</span>. 
                We will cooperate with payment processors and financial institutions to investigate 
                and resolve legitimate disputes.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-gray-900 mb-2">Technical Support & Access Issues</h2>
              <p className="text-gray-700">
                While we don't offer refunds, we are committed to ensuring you can access your purchased 
                courses. If you experience technical difficulties, our support team is available to help 
                resolve access issues promptly.
              </p>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <p className="text-gray-700 font-semibold">
                By completing your purchase, you acknowledge that you have read, understood, 
                and agree to this Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}