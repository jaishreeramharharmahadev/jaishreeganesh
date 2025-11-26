import React, { useState } from "react";
import TermsAndConditions from "../policy/TermsAndConditions";
import RefundPolicy from "../policy/CancellationAndRefund";

const Step4Payment = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleBack,
  internshipFee,
  isSubmitting,
}) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showRefund, setShowRefund] = useState(false);

  const selectedFee = internshipFee.find(
    (option) => option.duration === formData.duration
  );

  return (
    <div className="max-w-2xl mx-auto relative">
      <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-gray-800">
        Payment Details
      </h3>
      <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
        Complete your internship application with payment
      </p>

      {showTerms && (
        <>
          <style>{`body { overflow: hidden; }`}</style>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl 
            max-h-[85vh] overflow-hidden relative p-0 animate-scaleIn border border-gray-200">

              <div className="flex justify-between items-center px-5 py-3 border-b bg-gray-50 sticky top-0 z-50">
                <h2 className="text-lg font-semibold text-gray-800">Terms & Conditions</h2>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-gray-600 hover:text-red-600 text-2xl font-bold leading-none"
                >
                  &times;
                </button>
              </div>

              <div className="overflow-y-auto max-h-[75vh]">
                <TermsAndConditions />
              </div>
            </div>
          </div>
        </>
      )}

      {showRefund && (
        <>
          <style>{`body { overflow: hidden; }`}</style>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl 
            max-h-[85vh] overflow-hidden relative p-0 animate-scaleIn border border-gray-200">

              {/* Header */}
              <div className="flex justify-between items-center px-5 py-3 border-b bg-gray-50 sticky top-0 z-50">
                <h2 className="text-lg font-semibold text-gray-800">Refund Policy</h2>
                <button
                  onClick={() => setShowRefund(false)}
                  className="text-gray-600 hover:text-red-600 text-2xl font-bold leading-none"
                >
                  &times;
                </button>
              </div>

              <div className="overflow-y-auto max-h-[75vh]">
                <RefundPolicy />
              </div>
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 mb-6">
          <div className="space-y-3 text-sm md:text-base">
            <div className="flex justify-between">
              <span>Internship Program ({formData.duration})</span>
              <span className="font-semibold">₹0</span>
            </div>
            <div className="flex justify-between">
              <span>Registration Fee</span>
              <span className="font-semibold">₹{selectedFee?.price}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-base md:text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-blue-700">₹{selectedFee?.price}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800 text-center">
            <strong>Note:</strong> By completing this payment, you agree to our{" "}
            <button
              type="button"
              className="text-amber-900 hover:text-amber-700 underline font-semibold"
              onClick={() => setShowTerms(true)}
            >
              Terms & Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-amber-900 hover:text-amber-700 underline font-semibold"
              onClick={() => setShowRefund(true)}
            >
              Refund Policy
            </button>
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3 p-3 md:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <input
              type="checkbox"
              name="paymentChecked"
              checked={formData.paymentChecked}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-700 text-sm md:text-base">
                I understand the Payment
              </span>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                I verify that all information provided is accurate and I authorize this payment
              </p>
            </div>
          </label>
          {errors.paymentChecked && (
            <p className="text-red-600 text-sm">{errors.paymentChecked}</p>
          )}

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
                I agree to the Terms & Conditions
              </span>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                I have read and agree to the refund policy, program guidelines, and terms of service
              </p>
            </div>
          </label>
          {errors.agree && (
            <p className="text-red-600 text-sm">{errors.agree}</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 md:mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 md:px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors text-sm md:text-base"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 md:px-8 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>Pay ₹{selectedFee?.price} Now</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4Payment;