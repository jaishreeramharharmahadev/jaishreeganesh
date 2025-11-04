// components/InternshipForm/Step3AccountSetup.jsx
import React from 'react';

const Step3AccountSetup = ({ formData, errors, handleChange, handleNext, handleBack }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-gray-800">
        Account Setup
      </h3>
      <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
        Create your account and confirm your details
      </p>

      {/* User Info Review */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mb-6">
        <h4 className="font-semibold text-blue-800 mb-3 text-sm md:text-base">
          Please verify your information:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
          <div>
            <span className="text-gray-600">Name:</span>
            <span className="font-semibold ml-2">
              {formData.fullName}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold ml-2">{formData.email}</span>
          </div>
          <div>
            <span className="text-gray-600">College:</span>
            <span className="font-semibold ml-2">
              {formData.college}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Domain:</span>
            <span className="font-semibold ml-2">
              {formData.domain}
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <div className="grid gap-4 md:gap-6">
          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password (min. 8 characters)"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
            <p className="text-xs text-gray-500">
              Must contain at least 8 characters with uppercase, lowercase letters and numbers
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-sky-300 transition text-sm md:text-base ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Email Confirmation */}
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-3 p-3 md:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <input
                type="checkbox"
                name="emailConfirmed"
                checked={formData.emailConfirmed}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-700 text-sm md:text-base">
                  I confirm that my email address{" "}
                  <span className="text-black">({formData.email})</span>{" "}
                  is correct
                </span>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  Important communications will be sent to this email
                </p>
              </div>
            </label>
            {errors.emailConfirmed && (
              <p className="text-red-600 text-sm">
                {errors.emailConfirmed}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-3 p-3 md:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-700 text-sm md:text-base">
                  I agree to the{" "}
                  <span className="text-blue-500 underline">
                    Terms and Conditions
                  </span>
                </span>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  By checking this, you agree to our internship program
                  terms, privacy policy, and code of conduct
                </p>
              </div>
            </label>
            {errors.agree && (
              <p className="text-red-600 text-sm">{errors.agree}</p>
            )}
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
            disabled={!formData.agree || !formData.emailConfirmed}
            className="px-4 md:px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            Continue to Payment →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3AccountSetup;