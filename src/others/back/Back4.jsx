export default function Back4() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2f3236] to-[#1a222c]">
      {/* All-direction waves */}

      {/* Bottom Left -> Center */}
      <svg className="absolute bottom-0 left-0 w-full h-full opacity-50" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 500 Q400 350 720 400" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" />
        <path d="M0 540 Q420 380 720 440" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Bottom Right -> Center */}
      <svg className="absolute bottom-0 right-0 w-full h-full opacity-50" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
        <path d="M1440 500 Q1040 350 720 400" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" />
        <path d="M1440 540 Q1020 380 720 440" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Top Left -> Center */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-40" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 100 Q400 250 720 200" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
        <path d="M0 60 Q420 220 720 160" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Top Right -> Center */}
      <svg className="absolute top-0 right-0 w-full h-full opacity-40" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
        <path d="M1440 100 Q1040 250 720 200" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
        <path d="M1440 60 Q1020 220 720 160" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Top -> Center */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
        <path d="M720 0 Q720 200 720 350" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Left -> Center */}
      <svg className="absolute left-0 top-0 w-full h-full opacity-30" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 300 Q350 300 720 300" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Right -> Center */}
      <svg className="absolute right-0 top-0 w-full h-full opacity-30" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
        <path d="M1440 300 Q1050 300 720 300" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
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
