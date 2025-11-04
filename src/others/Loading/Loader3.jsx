import React from 'react';
import logo from "../../assets/GTTechnovationLogo.png"; // place logo in same folder

const Loader3 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Background circle */}
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
          {/* G Logo */}
          <img src={logo}/>
        </div>
        
        {/* Pulsing ring effect */}
        <div className="absolute top-0 left-0 w-20 h-20 border-2 border-blue-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default Loader3;