import React from 'react'

function ProfileContent({ applicant }) {
  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-md shadow-sm border p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Profile Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {applicant.fullName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {applicant.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Mobile Number
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {applicant.phone || "Not provided"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Internship ID
              </label>
              <p className="text-lg font-semibold text-gray-900 font-mono">
                {applicant.uniqueId}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Domain
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {applicant.domain}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Duration
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {applicant.duration}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Additional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex">
              <span className="w-20 border-r text-gray-600">College:</span>
              <span className="font-medium ml-5">{applicant.college}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-20 border-r">Start Date:</span>
              <span className="font-medium ml-5">
                {applicant.startDate
                  ? new Date(applicant.startDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-20 border-r">Progress:</span>
              <span className="font-medium ml-5">
                {Math.round(
                  (applicant.learningPath?.filter((w) => w.completed).length /
                    (applicant.learningPath?.length || 1)) *
                    100
                )}
                %
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-20 border-r">End Date:</span>
              <span className="font-medium ml-5">
                {applicant.endDate
                  ? new Date(applicant.endDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-500">
            <strong>Note:</strong> Profile information cannot be edited. Please
            contact support for any updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
