import React from "react";
import { CreditCard, AlertTriangle, CheckCircle } from "lucide-react";

const CancellationAndRefund = () => {
  return (
    <div className="w-full">
      <div className="bg-gray-50 px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-white border border-gray-200 rounded-xl">
              <CreditCard className="w-7 h-7 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Cancellation &amp; Refund Policy
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                Last updated: 26 November 2025
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8">
            <div className="space-y-8 text-sm md:text-base text-gray-700 leading-relaxed">
              {/* Summary */}
              <section>
                <p>
                  GT Technovation invests time, resources, and digital
                  infrastructure as soon as an intern is onboarded. For this
                  reason, the{" "}
                  <strong>registration/program fee is strictly non-refundable</strong>{" "}
                  once payment is successfully completed, except in very limited
                  cases described below.
                </p>
              </section>

              {/* What you receive vs non-refundable info */}
              <section className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                    <h3 className="font-semibold text-gray-900 text-sm">
                      What You Receive
                    </h3>
                  </div>
                  <ul className="text-xs md:text-sm space-y-1">
                    <li>• Access to internship tasks and learning resources</li>
                    <li>• Guidance or mentorship as per program structure</li>
                    <li>• Performance evaluation and feedback</li>
                    <li>
                      • Digital completion certificate (if program criteria are
                      met)
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-gray-900" />
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Non-Refundable in These Cases
                    </h3>
                  </div>
                  <ul className="text-xs md:text-sm space-y-1">
                    <li>• Change of mind or loss of interest</li>
                    <li>• Inability to allocate time for the internship</li>
                    <li>
                      • Not receiving a stipend due to not meeting performance
                      criteria
                    </li>
                    <li>
                      • Technical issues related to your device, internet, or
                      email access
                    </li>
                    <li>• Choosing to discontinue the internship midway</li>
                  </ul>
                </div>
              </section>

              {/* Strict no refund */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  1. Strict No-Refund Policy
                </h2>
                <p>
                  The internship registration/program fee charged by GT
                  Technovation is{" "}
                  <strong>strictly non-refundable and non-transferable</strong>{" "}
                  in all normal circumstances, including but not limited to:
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Failure to complete tasks or assignments</li>
                  <li>Unsatisfactory performance as evaluated by our team</li>
                  <li>
                    Not being awarded any stipend due to performance below the
                    required threshold
                  </li>
                  <li>
                    Personal issues, time constraints, exam schedules, or other
                    commitments
                  </li>
                  <li>
                    Delay in starting or joining the internship after payment
                  </li>
                </ul>
                <p className="mt-3">
                  The fee primarily supports onboarding, digital tools,
                  coordination, and resources allocated from the moment your
                  enrollment is confirmed.
                </p>
              </section>

              {/* Exceptions */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  2. Limited Exceptions (Technical or Billing Errors Only)
                </h2>
                <p>
                  Refunds will be considered <strong>only</strong> under the
                  following verified scenarios:
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>
                    <strong>Duplicate Payment:</strong> You are charged twice
                    for the same registration due to a technical issue.
                  </li>
                  <li>
                    <strong>Payment Deducted but Enrollment Not Activated:</strong>{" "}
                    The amount is successfully deducted, but due to a confirmed
                    system error on our side, your enrollment or access is not
                    activated and we are unable to provide services.
                  </li>
                </ul>
                <p className="mt-3">
                  In such cases, you must contact us within{" "}
                  <strong>7 days</strong> of the transaction, providing complete
                  details and proof of payment for our team to review.
                </p>
              </section>

              {/* Stipend clarification */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  3. Stipend Clarification
                </h2>
                <p>
                  Any stipend associated with the internship is{" "}
                  <strong>performance-based</strong>. Not receiving a stipend
                  because you did not meet the required performance or skill
                  criteria does <strong>not</strong> qualify as a valid reason
                  for a refund under any circumstance.
                </p>
              </section>

              {/* How to contact */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  4. How to Raise a Payment/Refund Query
                </h2>
                <p>
                  For any genuine billing or payment-related concerns, you can
                  reach us at:
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <span className="font-semibold">
                    support@gttechnovation.com
                  </span>
                </p>
                <p className="mt-2 text-sm">
                  Please include the following in your email:
                </p>
                <ul className="list-disc ml-5 mt-1 space-y-1 text-sm">
                  <li>Registered full name</li>
                  <li>Registered email address</li>
                  <li>Payment ID / Transaction reference</li>
                  <li>Screenshot of payment confirmation</li>
                  <li>Clear description of the issue</li>
                </ul>
              </section>

              {/* Final note */}
              <section>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-center">
                  <p className="text-sm font-medium text-gray-800">
                    By completing your payment, you acknowledge that you have
                    read, understood, and agree to this Cancellation &amp;
                    Refund Policy of GT Technovation.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationAndRefund;