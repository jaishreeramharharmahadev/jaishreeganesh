import React, { useState } from "react";
import axios from "axios";
import {
  Award,
  CheckCircle,
  FileText,
  Search,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import FeedbackSection from "./FeedbackSection"; // Adjust import path as needed

function CertificateContent({
  applicant,
  verifyCertificate,
  verifyResult,
  downloadCertificate,
  manualGenerateCertificate,
  certificateLoading,
  isCertificateAvailable,
}) {
  const [certNumber, setCertNumber] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const API = "http://localhost:5000";

  // Check if user can generate certificate
  const canGenerateCertificate = () => {
    return (
      applicant.feedbackSubmitted === true &&
      applicant.projects &&
      applicant.projects.length > 0 &&
      isCertificateAvailable()
    );
  };

  // Handle feedback submission callback
  const handleFeedbackSubmitted = () => {
    // This will trigger a refresh of applicant data
    if (window.fetchMe) {
      window.fetchMe();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side - Certificate Download */}
      <div className="space-y-6">
        <div className="bg-white rounded-md shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Your Certificate
          </h3>

          <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-md mb-6">
            <Award className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              {applicant.certificateGenerated ? "Certificate Ready!" : "Certificate Pending"}
            </h4>
            <p className="text-gray-600 mb-4">
              {applicant.certificateGenerated
                ? "Congratulations! Your certificate is ready for download."
                : "Your certificate will be available after internship completion."}
            </p>

            {/* Requirements Status */}
            <div className="space-y-3 mb-4 text-left bg-gray-50 p-4 rounded-md">
              <div className={`flex items-center space-x-2 ${applicant.feedbackSubmitted ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Feedback Submitted</span>
              </div>
              <div className={`flex items-center space-x-2 ${applicant.projects && applicant.projects.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">At Least 1 Project Submitted</span>
              </div>
              <div className={`flex items-center space-x-2 ${isCertificateAvailable() ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Internship Completed</span>
              </div>
            </div>

            {applicant.certificateGenerated ? (
              <button
                onClick={() => downloadCertificate(applicant.uniqueId)}
                disabled={certificateLoading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {certificateLoading ? "Downloading..." : "Download Certificate"}
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => manualGenerateCertificate(applicant.uniqueId)}
                  disabled={!canGenerateCertificate()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Generate Certificate
                </button>
                <div className="text-xs text-gray-500">
                  {!canGenerateCertificate() 
                    ? "Complete all requirements to generate certificate"
                    : "Certificate will be generated automatically on your end date"}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Internship ID:</span>
              <span className="font-mono font-medium">{applicant.uniqueId}</span>
            </div>
            <div className="flex justify-between">
              <span>Domain:</span>
              <span className="font-medium">{applicant.domain}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">{applicant.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Projects Submitted:</span>
              <span className="font-medium">{applicant.projects?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Feedback Status:</span>
              <span className={`font-medium ${applicant.feedbackSubmitted ? 'text-green-600' : 'text-yellow-600'}`}>
                {applicant.feedbackSubmitted ? 'Submitted' : 'Pending'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Internship Status:</span>
              <span className={`font-medium ${isCertificateAvailable() ? 'text-green-600' : 'text-yellow-600'}`}>
                {isCertificateAvailable() ? 'Completed' : 'In Progress'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Feedback and Verification */}
      <div className="space-y-6">
        {/* Feedback Section */}
        <div className="bg-white rounded-md shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Internship Feedback
            </h3>
            {applicant.feedbackSubmitted && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
          </div>

          {applicant.feedbackSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Feedback Submitted</p>
              <p className="text-sm text-gray-500 mt-1">
                Thank you for your valuable feedback!
              </p>
              <div className="mt-4 p-3 bg-green-50 rounded-md">
                <p className="text-xs text-green-700">
                  You can now generate your certificate if all other requirements are met.
                </p>
              </div>
            </div>
          ) : (
            <FeedbackSection
              applicant={applicant}
              token={token}
              apiBase={API}
              onSubmitted={handleFeedbackSubmitted}
            />
          )}
        </div>

        {/* Certificate Verification */}
        <div className="bg-white rounded-md shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Verify Certificate
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Number
              </label>
              <div className="flex space-x-3">
                <input
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  placeholder="Enter certificate number (e.g., CERT-2025...)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-indigo-500"
                />
                <button
                  onClick={() => verifyCertificate(certNumber)}
                  className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {verifyResult && (
              <div
                className={`p-4 rounded-md border ${
                  verifyResult.ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      verifyResult.ok ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {verifyResult.ok ? <CheckCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${verifyResult.ok ? "text-green-800" : "text-red-800"}`}>
                      {verifyResult.ok ? "Valid Certificate" : "Invalid Certificate"}
                    </h4>
                    {verifyResult.ok ? (
                      <div className="text-sm text-green-700 mt-1">
                        <p>Issued to: {verifyResult.data.fullName}</p>
                        <p>Domain: {verifyResult.data.domain}</p>
                        <p>
                          Issue Date:{" "}
                          {new Date(verifyResult.data.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-700 mt-1">{verifyResult.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-center space-x-2 text-blue-800 mb-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Verification Help</span>
              </div>
              <p className="text-xs text-blue-700">
                Enter the certificate number found at the bottom of your
                certificate PDF to verify its authenticity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateContent;