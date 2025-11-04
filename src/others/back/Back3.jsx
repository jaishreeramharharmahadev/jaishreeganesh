export default function Back3() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e7eef7] to-[#6c8db5]">
      {/* Smooth Wave Lines */}
      <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-60" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
        {/* multiple parallel smooth waves */}
        <g stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" fill="none">
          <path d="M0 350 Q360 250 720 350 T1440 350" />
          <path d="M0 380 Q360 280 720 380 T1440 380" strokeOpacity="0.75" />
          <path d="M0 410 Q360 310 720 410 T1440 410" strokeOpacity="0.6" />
          <path d="M0 440 Q360 340 720 440 T1440 440" strokeOpacity="0.45" />
          <path d="M0 470 Q360 370 720 470 T1440 470" strokeOpacity="0.35" />
          <path d="M0 500 Q360 400 720 500 T1440 500" strokeOpacity="0.25" />
        </g>
      </svg>

      {/* Floating minimal shapes */}
      <div className="absolute top-20 right-24 w-4 h-4 border-2 border-white rounded-full opacity-70"></div>
      <div className="absolute top-40 right-56 w-4 h-4 border-2 border-white opacity-70"></div>
      <div className="absolute bottom-24 right-36 w-6 h-6 border-2 border-white rounded-full opacity-60"></div>

      {/* Content */}
      <h1 className="text-3xl font-semibold text-white drop-shadow-lg relative z-10">
        Wave Background Preview 🌊
      </h1>
    </div>
  );
}
