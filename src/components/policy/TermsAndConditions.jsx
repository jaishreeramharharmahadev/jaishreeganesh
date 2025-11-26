import React from "react";
import { FileText, UserCheck, BookOpen, CreditCard, Scale } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="w-full">
      <div className="bg-gray-50 px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-white border border-gray-200 rounded-xl">
              <FileText className="w-7 h-7 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Terms &amp; Conditions
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
                  Welcome to <strong>GT Technovation</strong>. By accessing or
                  using our website or enrolling in any internship program
                  (collectively, the &quot;Platform&quot;), you agree to comply
                  with and be bound by these Terms &amp; Conditions. If you do
                  not agree with any part of these terms, you should not use the
                  Platform or proceed with registration.
                </p>
              </section>

              {/* Eligibility */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  1. Eligibility
                </h2>
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <p>
                      You must be at least 18 years old, or have valid consent
                      from a parent or legal guardian, to participate in our
                      internship programs.
                    </p>
                    <p>
                      You agree to provide accurate, complete and up-to-date
                      information during registration and to keep your account
                      details updated.
                    </p>
                    <p>
                      You are responsible for maintaining the confidentiality of
                      your login credentials and for all activities that occur
                      under your account.
                    </p>
                  </div>
                </div>
              </section>

              {/* Internship & Stipend */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  2. Internship Program &amp; Performance-Based Stipend
                </h2>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <p>
                      GT Technovation offers skill-based internship programs
                      designed to provide practical exposure and learning
                      opportunities.
                    </p>
                    <p>
                      Any stipend associated with an internship is{" "}
                      <strong>purely performance-based</strong>. This means that
                      payment of a stipend depends solely on:
                    </p>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Quality and timeliness of submitted tasks</li>
                      <li>Demonstrated skills and improvement</li>
                      <li>Overall evaluation by our team or mentors</li>
                    </ul>
                    <p>
                      <strong>No stipend is guaranteed.</strong> Paying a
                      registration fee or enrolling in an internship program
                      does not create any obligation on GT Technovation to pay a
                      stipend.
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  3. Registration Fee &amp; Payment Terms
                </h2>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <p>
                      To enroll in certain internship programs, you may be
                      required to pay a{" "}
                      <strong>one-time non-refundable registration fee</strong>.
                    </p>
                    <p>
                      All payments are processed securely through third-party
                      payment service providers. You agree to provide valid
                      payment information and authorize us or our payment
                      partners to charge your selected payment method.
                    </p>
                    <p>
                      Once payment is successfully completed, onboarding and
                      access to the internship program begin, and internal
                      resources are allocated to your participation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Digital Only */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  4. Digital-Only Services
                </h2>
                <p>
                  All services and deliverables provided by GT Technovation in
                  relation to the internship are{" "}
                  <strong>digital in nature</strong>. This includes tasks,
                  learning resources, communication, evaluations, and
                  certificates. We do not ship or deliver any physical products
                  or materials as part of our standard internship programs.
                </p>
              </section>

              {/* Conduct */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  5. Intern Conduct &amp; Responsibilities
                </h2>
                <p className="mb-2">
                  As an intern, you agree to maintain professional conduct at
                  all times. You must not:
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Submit plagiarized, copied, or fraudulent work</li>
                  <li>
                    Share internal tasks, code, or confidential materials
                    publicly
                  </li>
                  <li>
                    Engage in harassment, abusive behavior, or unprofessional
                    communication
                  </li>
                  <li>Misuse access to internal tools, data, or resources</li>
                </ul>
                <p className="mt-2">
                  GT Technovation reserves the right to suspend or terminate
                  your participation, without refund, if you are found in
                  violation of these terms or any other program guidelines.
                </p>
              </section>

              {/* IP */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  6. Intellectual Property
                </h2>
                <p>
                  All content provided through the Platform—including but not
                  limited to assignments, training material, designs, systems,
                  documentation, and branding—is the intellectual property of GT
                  Technovation or its licensors. You may not copy, reproduce,
                  distribute, modify, sell, or publicly display this content
                  without prior written consent.
                </p>
              </section>

              {/* Liability */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  7. Limitation of Liability
                </h2>
                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <p>
                      To the maximum extent permitted by law, GT Technovation is
                      not liable for any indirect, incidental, special,
                      consequential, or punitive damages, including loss of
                      opportunities, earnings, or data, arising out of or in
                      connection with your use of the Platform or participation
                      in any internship program.
                    </p>
                    <p>
                      The Platform and related services are provided on an
                      &quot;as is&quot; and &quot;as available&quot; basis
                      without any warranties of any kind, whether express or
                      implied, including but not limited to guarantees of job
                      placement, stipend, or specific career outcomes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  8. Privacy &amp; Data Usage
                </h2>
                <p>
                  By using the Platform, you consent to the collection and use
                  of your information in accordance with our{" "}
                  <strong>Privacy Policy</strong>. This includes the use of your
                  performance data, and where permitted, your success stories or
                  testimonials, for showcasing internship outcomes and improving
                  our programs.
                </p>
              </section>

              {/* Changes */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  9. Changes to These Terms
                </h2>
                <p>
                  GT Technovation may update these Terms &amp; Conditions from
                  time to time. Any material changes will be notified via email
                  or through the Platform. Your continued use of the Platform or
                  participation in any internship after such changes will
                  constitute your acceptance of the updated terms.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  10. Contact
                </h2>
                <p>
                  If you have any questions about these Terms &amp; Conditions,
                  please contact us at{" "}
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

export default TermsAndConditions;