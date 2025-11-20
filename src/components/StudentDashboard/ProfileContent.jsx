import React from "react";

function ProfileContent({ applicant }) {
  const progressPercent = Math.round(
    (applicant.learningPath?.filter((w) => w.completed).length /
      (applicant.learningPath?.length || 1)) *
      100
  );

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-md shadow-sm border p-6 space-y-8">
        <h3 className="text-2xl font-semibold text-[#0A444D]">
          Profile Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField label="Full Name" value={applicant.fullName} />
          <ProfileField label="Email Address" value={applicant.email} />
          <ProfileField
            label="Mobile Number"
            value={applicant.phone || "Not Provided"}
          />
          <ProfileField
            label="Internship ID"
            value={applicant.uniqueId}
            mono
          />
          <ProfileField label="Domain" value={applicant.domain} />
          <ProfileField label="Duration" value={applicant.duration} />
        </div>

        <div className="pt-6 border-t">
          <h4 className="text-lg font-semibold text-[#0A444D] mb-4">
            Additional Information
          </h4>

          <div className="space-y-3 text-sm">
            <InfoRow label="College" value={applicant.college || "N/A"} />
            <InfoRow
              label="Start Date"
              value={
                applicant.startDate
                  ? new Date(applicant.startDate).toLocaleDateString()
                  : "N/A"
              }
            />
            <InfoRow label="Progress" value={`${progressPercent}%`} />
            <InfoRow
              label="End Date"
              value={
                applicant.endDate
                  ? new Date(applicant.endDate).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>
        </div>

        <div className="p-3 bg-[#0A444D]/10 border border-[#0A444D]/20 rounded-lg">
          <p className="text-xs text-red-600">
            <strong>Note:</strong> Profile information cannot be edited. Please
            contact support in case of any updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;

const ProfileField = ({ label, value, mono }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">
      {label}
    </label>
    <p
      className={`text-lg font-semibold text-[#0A444D] ${
        mono ? "font-mono" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-[#0A444D] font-medium">
    <span className="text-gray-600">{label}:</span>
    <span>{value}</span>
  </div>
);