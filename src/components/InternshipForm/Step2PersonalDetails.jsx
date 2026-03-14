import React from 'react';
import { useNavigate } from 'react-router-dom';

const Step2PersonalDetails = ({ formData, errors, handleChange, handleNext, handleBack }) => {
  const navigate = useNavigate();
  
  const isDomainMissing = !formData.domain || formData.domain.trim() === '';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isDomainMissing) {
      return;
    }
    
    handleNext();
  };

  const handleSelectDomain = () => {
    navigate('/internships');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-gray-800">
        Personal Information
      </h3>
      <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
        Please provide your details for the internship application
      </p>

      {isDomainMissing && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-300 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-amber-800">
                Internship Domain Required
              </h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  You haven't selected an internship domain yet.{' '}
                  <button
                    onClick={handleSelectDomain}
                    className="font-medium text-amber-800 underline hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
                  >
                    Click here to browse available internships
                  </button>{' '}
                  and select your preferred domain before continuing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dob && (
              <p className="text-red-600 text-sm">{errors.dob}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              College/University <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="college"
              placeholder="Enter your college name"
              value={formData.college}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.college ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.college && (
              <p className="text-red-600 text-sm">{errors.college}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Internship Domain <span className="text-red-500">*</span>
            </label>
            {isDomainMissing ? (
              <div className="relative">
                <input
                  type="text"
                  value="No domain selected"
                  readOnly
                  className="w-full border border-red-300 rounded-lg p-3 bg-red-50 text-red-800 text-sm md:text-base pr-10"
                />
                <button
                  type="button"
                  onClick={handleSelectDomain}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Select
                </button>
              </div>
            ) : (
              <input
                type="text"
                name="domain"
                value={formData.domain}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-600 text-sm md:text-base"
              />
            )}
            {isDomainMissing && (
              <div className="text-red-600 text-sm mt-1">
                <span>Domain required. </span>
                <button
                  type="button"
                  onClick={handleSelectDomain}
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  Browse internships
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedin}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.linkedin ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.linkedin && (
              <p className="text-red-600 text-sm">{errors.linkedin}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              GitHub Profile{" "}
            </label>
            <input
              type="url"
              name="github"
              placeholder="https://github.com/yourusername"
              value={formData.github}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6 md:mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 md:px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors text-sm md:text-base"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={isDomainMissing}
            className={`px-4 md:px-6 py-2 rounded-lg font-semibold transition-colors text-sm md:text-base ${
              isDomainMissing
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Continue to Account Setup →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2PersonalDetails;