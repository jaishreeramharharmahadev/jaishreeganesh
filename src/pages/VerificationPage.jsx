import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Shield,
  FileText,
  ArrowRight,
  Award,
  Users,
} from "lucide-react";

export default function VerificationPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = (input || "").toString().trim();
    if (!trimmed) return;

    setIsLoading(true);

    setTimeout(() => {
      navigate(`/verify/${encodeURIComponent(trimmed)}`);
      // Navigation occurs; loading spinner stops after navigation
    }, 400);
  }

  // Convert input to uppercase and limit length
  function handleInputChange(e) {
    const upper = (e.target.value || "").toUpperCase().slice(0, 18);
    setInput(upper);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-blue-50 -mt-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
          Certificate Verification
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed text-center">
          Enter your certificate number to verify authenticity
        </p>
        {/* Centered Card */}
        <div className="mx-auto max-w-xl mt-5">
          <div className="bg-white rounded-md shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-700">
                  Verify Certificate
                </h2>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="certificateNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Certificate Number *
                </label>

                <div className="relative">
                  <input
                    id="certificateNumber"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="e.g., CERT-12345678-X0X1"
                    style={{ textTransform: "uppercase" }}
                    maxLength={18}
                    className="w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition md:text-base text-lg font-medium"
                    autoFocus
                    required
                    autoComplete="off"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <p>
                    This number is shown at the top-right corner on the
                    certificate.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-blue-500 hover:to-sky-500 text-white px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-3 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed justify-center"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Verify
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  ISO Certified
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  SSL Secured
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  GDPR Compliant
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Having trouble verifying your certificate?{" "}
              <a
                href="mailto:support@gttechnovation.com"
                className="text-blue-600 hover:underline font-medium"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}