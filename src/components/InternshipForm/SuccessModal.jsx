// components/InternshipForm/SuccessModal.jsx
import React from 'react';

const SuccessModal = ({ showSuccess, uniqueId, handleCloseSuccess, handleLoginRedirect }) => {
  if (!showSuccess) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-xl w-full mx-auto transform animate-scale-in">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Success Title */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Application Submitted Successfully!
          </h2>
          
          {/* Unique ID */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Internship ID</p>
            <p className="font-mono font-bold text-blue-700 bg-white py-2 px-3 md:px-4 rounded-lg border tracking-widest text-sm md:text-base">
              {uniqueId}
            </p>
          </div>
          
          {/* Instructions */}
          <div className="text-left bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
            <p className="text-xs md:text-sm text-gray-700 mb-3">
              <span className="font-semibold">📧 Email Confirmation:</span> This code has been sent to your registered email ID.
            </p>
            <p className="text-xs md:text-sm text-gray-700">
              <span className="font-semibold">🔐 Dashboard Access:</span> You can now login to access your internship dashboard.
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <button
              onClick={handleCloseSuccess}
              className="flex-1 px-4 md:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              Close
            </button>
            <button
              onClick={handleLoginRedirect}
              className="flex-1 px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;