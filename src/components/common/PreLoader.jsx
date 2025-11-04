import React from "react";
import logo from "../../assets/GTTechnovationLogo.png";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-[9999] pointer-events-none">
      <div className="relative pointer-events-auto">
        <div className="w-20 h-20 p-1 bg-gradient-to-r from-green-800 to-green-900 rounded-full flex items-center justify-center animate-pulse">
          <img src={logo} alt="Logo" className="rounded-full object-contain" />
        </div>
        <div className="absolute top-0 left-0 w-20 h-20 border-2 border-green-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default PreLoader;