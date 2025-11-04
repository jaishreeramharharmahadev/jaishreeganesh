import React from 'react';

const Loader6 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Morphing container */}
        <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center animate-pulse">
          <span className="text-2xl font-bold text-white">G</span>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  );
};

export default Loader6;