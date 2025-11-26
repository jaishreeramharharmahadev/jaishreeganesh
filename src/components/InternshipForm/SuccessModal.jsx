import React, { useState } from "react";
import { CheckCircle, Copy, Check, LogIn, Mail, Lock } from "lucide-react";

const SuccessModal = ({ showSuccess, uniqueId, handleCloseSuccess, handleLoginRedirect }) => {
  const [copied, setCopied] = useState(false);

  if (!showSuccess) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(uniqueId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl border-t-4 border-[#0A444D] transform animate-scale-in">

        <div className="flex justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-700" strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center mb-3">
          Application Successful!
        </h2>

        <p className="text-center text-gray-600 text-sm mb-6">
          You're registered for the internship program.
        </p>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
          <p className="text-xs font-semibold text-gray-600 mb-2">
            Your Internship ID
          </p>
          <div className="flex gap-2 items-center">
            <p className="flex-1 font-mono font-bold text-lg text-center text-[#0A444D] bg-white py-2 px-3 rounded-lg border tracking-wider">
              {uniqueId}
            </p>

            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-teal-500 text-white rounded-lg text-xs font-medium hover:bg-teal-600 transition flex items-center gap-1"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : ""}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-2 mb-6">
          <p className="flex items-center gap-2 text-xs text-gray-700">
            <Mail className="w-4 h-4 text-[#0A444D]" /> This code has been sent to your registered email ID.
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-700">
            <Lock className="w-4 h-4 text-[#0A444D]" /> You can now login to access your internship dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCloseSuccess}
            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Close
          </button>

          <button
            onClick={handleLoginRedirect}
            className="flex-1 py-2 bg-[#0A444D] text-white rounded-lg font-semibold hover:bg-[#08363E] transition flex items-center justify-center gap-2 shadow-md"
          >
            <LogIn className="w-4 h-4" /> Login Dashboard
          </button>
        </div>

      </div>

      <style jsx>{`
        .animate-scale-in {
          animation: scaleIn 0.32s ease-out;
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;