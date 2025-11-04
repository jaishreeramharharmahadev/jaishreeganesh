import React from 'react';

const Loader5 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        {/* Rotating gradient border */}
        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            {/* G Logo with gradient */}
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              G
            </span>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-gray-600 text-sm font-medium">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader5;