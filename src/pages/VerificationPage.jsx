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
    }, 400);
  }

  function handleInputChange(e) {
    const upper = (e.target.value || "").toUpperCase().slice(0, 18);
    setInput(upper);
  }

  return (
    <div className="pt-7 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-3xl">
        <div className="mx-auto max-w-xl">
          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Certificate Verification
                </h2>
                <p className="text-gray-600 text-sm">
                  Enter your certificate number to verify authenticity
                </p>
              </div>
            </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-lg font-medium"
                    autoFocus
                    required
                    autoComplete="off"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <p>This number is shown at the top-right corner on the certificate.</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-full bg-gradient-to-r from-sky-600 to-green-900 text-white py-3 px-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Verify Certificate
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

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