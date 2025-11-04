// components/InternshipForm/Step1Duration.jsx
import React from 'react';
import Button from "@/utils/Button";

const Step1Duration = ({ formData, errors, handleChange, handleNext, internshipFee }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-gray-800">
        Select Internship Duration
      </h3>
      <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
        Choose the duration that best fits your schedule and learning goals
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6">
        {internshipFee.map((option) => (
          <label
            key={option.duration}
            className={`relative border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 ${
              formData.duration === option.duration
                ? "border-sky-300 bg-blue-50 shadow-lg scale-105"
                : "border-gray-300 bg-white hover:border-blue-300 hover:shadow-md"
            }`}
          >
            <input
              type="radio"
              name="duration"
              value={option.duration}
              checked={formData.duration === option.duration}
              onChange={handleChange}
              className="hidden"
            />
            <div className="text-center">
              {option.popular && (
                <span className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                  Most Popular
                </span>
              )}
              <div className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                {option.duration}
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                Perfect for {option.duration.toLowerCase()} intensive learning
              </div>
            </div>
          </label>
        ))}
      </div>

      {errors.duration && (
        <div className="text-red-600 text-center mb-4 bg-red-50 py-2 rounded-lg text-sm">
          {errors.duration}
        </div>
      )}

      <div className="flex justify-end mt-6 md:mt-8">
        <button
          onClick={handleNext}
          disabled={!formData.duration}
          className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
        >
          Continue to Personal Details →
        </button>
        {/* <Button variant="outline" onClick={handleNext}
          disabled={!formData.duration}>Continue to Personal Details →
          </Button> */}
      </div>
    </div>
  );
};

export default Step1Duration;