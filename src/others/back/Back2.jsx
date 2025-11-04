export default function Back2() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e7eef7] to-[#6c8db5]">
      {/* Smooth Wave Lines */}
      <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-60" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          d="M0,96 C240,200 360,0 600,96 C840,192 960,64 1200,128 C1320,160 1440,96 1440,96"
        />
        <path
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          d="M0,160 C240,256 360,64 600,160 C840,256 960,128 1200,192 C1320,224 1440,160 1440,160"
        />
        <path
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          d="M0,224 C240,320 360,128 600,224 C840,320 960,192 1200,256 C1320,288 1440,224 1440,224"
        />
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
