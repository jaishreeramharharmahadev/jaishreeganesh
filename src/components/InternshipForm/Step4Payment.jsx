// components/InternshipForm/Step4Payment.jsx
import React from "react";

const Step4Payment = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleBack,
  internshipFee,
  isSubmitting,
}) => {
  const selectedFee = internshipFee.find(
    (option) => option.duration === formData.duration
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-gray-800">
        Payment Details
      </h3>
      <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
        Complete your internship application with payment
      </p>

      <form onSubmit={handleSubmit}>
        {/* Order Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 mb-6">
          <h4 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">
            Summary
          </h4>
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

        {/* Payment Policy Box */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <h5 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Important Payment Information
          </h5>
          <ul className="text-xs text-blue-700 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                This is the only fee required for the entire{" "}
                {formData.duration.toLowerCase()} internship program
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                No additional charges for certificate, mentorship, or learning
                materials
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">!</span>
              <span>
                <strong>Non-refundable:</strong> Registration fee cannot be
                refunded once paid
              </span>
            </li>
          </ul>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800 text-center">
            <strong>Note:</strong> By completing this payment, you acknowledge
            that you have read, understood, and agree to be bound by our{" "}
            <button
              type="button"
              className="text-amber-900 hover:text-amber-700 underline font-semibold"
              onClick={() => {
                /* Add terms modal or navigation */
              }}
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-amber-900 hover:text-amber-700 underline font-semibold"
              onClick={() => {
                /* Add refund policy modal or navigation */
              }}
            >
              Refund Policy
            </button>
          </p>
        </div>

        {/* Final Confirmations */}
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
                I verify that all information provided is accurate and I
                authorize this payment
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
                I agree to the Terms and Conditions
              </span>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                I have read and agree to the refund policy, program guidelines,
                and terms of service
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
              <>
                Pay ₹{selectedFee?.price} Now
                <span className="text-lg"></span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4Payment;