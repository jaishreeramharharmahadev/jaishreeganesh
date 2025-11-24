import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Shield,
  FileText,
  ArrowRight,
  Award,
  Users,
} from "lucide-react";
import { apiUrl } from "../utils/api";

export default function VerificationPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setIsLoading(true);

    try {
      await axios.get(
        apiUrl(`/certificates/verify/${encodeURIComponent(trimmed)}`)
      );
    } catch (err) {
      console.warn("Backend warming / certificate may not exist yet");
    }

    navigate(`/verify/${encodeURIComponent(trimmed)}`);
  }

  function handleInputChange(e) {
    const value = e.target.value.toUpperCase().slice(0, 18);
    setInput(value);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F5F6]">
      <div className="w-full max-w-3xl p-4">
        
        <h1 className="text-3xl font-extrabold text-center text-[#0A444D]">
          Certificate Verification
        </h1>
        <p className="text-sm text-gray-600 text-center mt-1">
          Enter your certificate number to verify authenticity
        </p>

        <div className="mx-auto max-w-xl mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-[#0A8A92]" />
              <h2 className="text-lg font-semibold text-[#0A444D]">
                Verify Certificate
              </h2>
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
                    placeholder="CERT-XXXXXXXXXX"
                    maxLength={18}
                    style={{ textTransform: "uppercase" }}
                    className="w-full border rounded-md px-3 py-2 text-base font-medium focus:ring-2 focus:ring-[#0A8A92] focus:outline-none"
                    required
                    autoFocus
                    autoComplete="off"
                  />
                  <FileText className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Printed at the top-right corner of your certificate.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#0A444D] hover:bg-[#08606B] text-white py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
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

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-5 h-5 text-[#0A8A92]" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-[#0A8A92]" />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm mt-6">
            <p className="text-gray-600">
              Need help?{" "}
              <a
                href="mailto:support@gttechnovation.com"
                className="text-[#0A8A92] font-medium underline"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}