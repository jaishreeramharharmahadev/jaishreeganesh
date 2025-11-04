// components/InternshipForm/ProgressSteps.jsx
import React from 'react';

const ProgressSteps = ({ step, steps }) => {
  return (
    <div className="px-4 pt-2 flex justify-center">
      <div className="flex items-center py-3 mb-6">
        {steps.map((stepItem, index) => (
          <div key={stepItem.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 font-semibold text-sm md:text-base ${
                  step === stepItem.number
                    ? "bg-blue-600 text-white border-blue-600"
                    : step > stepItem.number
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-500 border-gray-300"
                }`}
              >
                {step > stepItem.number ? "✓" : stepItem.number}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm font-medium ${
                  step >= stepItem.number
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {stepItem.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-8 md:w-16 mx-2 md:mx-4 ${
                  step > stepItem.number ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;