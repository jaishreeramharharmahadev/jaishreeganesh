import React, { useState } from "react";
import {
  Award,
  CheckCircle,
} from "lucide-react";
import PreLoader from "../common/PreLoader";
import FeedbackSection from "./FeedbackSection";

function CertificateContent({
  applicant,
  downloadCertificate,
  manualGenerateCertificate,
  certificateLoading,
  isCertificateAvailable,
}) {
  const [actionLoading, setActionLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const canGenerateCertificate = () => {
    return (
      applicant.feedbackSubmitted === true &&
      applicant.projects &&
      applicant.projects.length > 0 &&
      isCertificateAvailable()
    );
  };

  const handleGenerateCertificate = async () => {
    if (actionLoading) return;
    setActionLoading(true);

    await manualGenerateCertificate(applicant.uniqueId);

    setActionLoading(false);
  };

  const handleDownloadCertificate = async () => {
    if (actionLoading) return;
    setActionLoading(true);

    await downloadCertificate(applicant.uniqueId);

    setActionLoading(false);
  };

  const handleFeedbackSubmitted = () => {
    if (window.fetchMe) window.fetchMe();
    else window.location.reload();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <div className="bg-white rounded-md shadow-sm border p-6 space-y-6">
        <h3 className="text-xl font-semibold text-[#0A444D]">
          Your Certificate
        </h3>

        <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-xl">
          <Award className="w-16 h-16 text-[#0A444D] mx-auto mb-4" />

          <h4 className="text-xl font-bold text-[#0A444D] mb-1">
            {applicant.certificateGenerated
              ? "Certificate Ready!"
              : "Certificate Pending"}
          </h4>

          <p className="text-gray-600 mb-4 text-sm">
            {applicant.certificateGenerated
              ? "Congratulations! Your certificate is ready for download."
              : "Your certificate will be available after internship completion."}
          </p>

          <div className="text-left bg-gray-50 p-4 rounded-md mb-4 space-y-2">
            <Req status={applicant.feedbackSubmitted} text="Feedback Submitted" />
            <Req status={applicant.projects?.length > 0} text="At least 1 project uploaded" />
            <Req status={isCertificateAvailable()} text="Internship Completed" />
          </div>

          {actionLoading ? (
            <div className="flex justify-center">
              <PreLoader text="Please wait..."/>
            </div>
          ) : applicant.certificateGenerated ? (
            <button
              onClick={handleDownloadCertificate}
              disabled={certificateLoading}
              className="px-6 py-3 bg-[#0A444D] text-white rounded-full hover:bg-[#08353c]"
            >
              Download Certificate
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={handleGenerateCertificate}
                disabled={!canGenerateCertificate()}
                className="px-6 py-3 bg-[#0A444D] text-white rounded-full disabled:opacity-40 hover:bg-[#08353c]"
              >
                Generate Certificate
              </button>
              <p className="text-xs text-gray-500">
                {canGenerateCertificate()
                  ? "Certificate will also auto-generate on end date."
                  : "Complete all requirements to generate certificate."}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3 text-sm text-[#0A444D] font-medium">
          <Info label="Internship ID" value={applicant.uniqueId} />
          <Info label="Domain" value={applicant.domain} />
          <Info label="Duration" value={applicant.duration} />
          <Info label="Projects Submitted" value={applicant.projects?.length || 0} />
          <Info label="Feedback" value={applicant.feedbackSubmitted ? "Submitted" : "Pending"} />
          <Info label="Status" value={isCertificateAvailable() ? "Completed" : "In Progress"} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-[#0A444D]">
            Internship Feedback
          </h3>
          {applicant.feedbackSubmitted && (
            <CheckCircle className="w-6 h-6 text-green-600" />
          )}
        </div>

        {applicant.feedbackSubmitted ? (
          <div className="text-center py-10">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="text-[#0A444D] font-semibold">
              Feedback Submitted ✔
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Thanks for sharing your experience!
            </p>
          </div>
        ) : (
          <FeedbackSection
            applicant={applicant}
            token={token}
            onSubmitted={handleFeedbackSubmitted}
          />
        )}
      </div>
    </div>
  );
}

export default CertificateContent;

const Info = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}:</span>
    <span className="font-semibold">{value}</span>
  </div>
);

const Req = ({ status, text }) => (
  <div className={`flex items-center gap-2 text-sm ${status ? "text-green-600" : "text-gray-400"}`}>
    <CheckCircle className="w-4 h-4" />
    <span>{text}</span>
  </div>
);