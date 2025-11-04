// components/InternshipForm/Step2PersonalDetails.jsx
import React from 'react';

const Step2PersonalDetails = ({ formData, errors, handleChange, handleNext, handleBack }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-gray-800">
        Personal Information
      </h3>
      <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
        Please provide your details for the internship application
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Phone */}
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

          {/* Date of Birth */}
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

          {/* College */}
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

          {/* Domain */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Internship Domain
            </label>
            <input
              type="text"
              name="domain"
              value={formData.domain}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-600 text-sm md:text-base"
            />
          </div>

          {/* Address */}
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

          {/* LinkedIn */}
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

          {/* GitHub */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              GitHub Profile{" "}
              {/* <span className="text-gray-500">(Optional)</span> */}
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
            className="px-4 md:px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base"
          >
            Continue to Account Setup →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2PersonalDetails;