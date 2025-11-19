import React, { useRef, useEffect } from "react";

const OtpInput = ({ otp, setOtp }) => {
  const inputs = useRef([]);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      pasteData.split('').forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      setOtp(newOtp);
      
      const nextIndex = Math.min(pasteData.length, 5);
      inputs.current[nextIndex].focus();
    }
  };

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          maxLength="1"
          ref={(el) => (inputs.current[idx] = el)}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleBackspace(e, idx)}
          onFocus={(e) => e.target.select()}
          className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
        />
      ))}
    </div>
  );
};

export default OtpInput;