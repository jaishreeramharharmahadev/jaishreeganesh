export default function Back1() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f7e4d3] to-[#f1dfcd] flex items-center justify-center overflow-hidden">
      {/* Dots Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.9)_2px,transparent_2px)] bg-[length:24px_24px] opacity-70"></div>

      {/* Fade effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 pointer-events-none"></div>

      {/* Content */}
      <h1 className="text-3xl font-semibold text-black/70 relative z-10">
        Dotted Background Preview ✨
      </h1>
    </div>
  );
}
