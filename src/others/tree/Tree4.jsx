import React from 'react';

const Tree4 = () => {
  // Realistic Leaf component with gradient
  const Leaf = ({ position, delay, size = 'medium' }) => {
    const sizeClass = {
      small: 'w-8 h-8',
      medium: 'w-12 h-12',
      large: 'w-16 h-16'
    }[size];

    return (
      <div 
        className={`
          absolute rounded-full shadow-lg transform transition-all duration-700
          hover:scale-125 hover:shadow-2xl hover:z-10
          animate-float
          bg-gradient-to-br from-green-400 to-green-600
          border border-green-300
          ${sizeClass}
          ${position}
        `}
        style={{ 
          animationDelay: `${delay}ms`,
          animationDuration: '3s'
        }}
      />
    );
  };

  // Curved Branch component
  const Branch = ({ rotation, length, position, curvature = 0 }) => (
    <div 
      className={`
        absolute origin-bottom
        transition-all duration-500 hover:bg-brown-700
        ${position}
      `}
      style={{
        transform: `rotate(${rotation}deg)`,
        width: '3px',
        height: `${length}px`,
        background: `linear-gradient(to right, #8B4513, #A0522D)`,
        borderRadius: '2px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        transform: `rotate(${rotation}deg) skewX(${curvature}deg)`
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-300 flex items-center justify-center p-8">
      <div className="relative w-full max-w-2xl">
        
        {/* Tree Container */}
        <div className="relative flex flex-col items-center">
          
          {/* Tree Title */}
          <h1 className="text-4xl font-bold text-green-900 mb-12 text-center font-serif">
            🌳 Beautiful Tree Structure
          </h1>

          {/* Main Tree */}
          <div className="relative">
            
            {/* Leaves Container with layered effect */}
            <div className="relative h-48">
              
              {/* Layer 1 - Top Leaves */}
              <Leaf 
                position="top-2 left-1/2 transform -translate-x-1/2" 
                delay="0" 
                size="large"
              />
              
              {/* Layer 2 - Middle Left Leaves */}
              <Leaf 
                position="top-12 left-1/3 transform -translate-x-1/2" 
                delay="400" 
                size="medium"
              />
              <Leaf 
                position="top-20 left-1/4 transform -translate-x-1/2" 
                delay="800" 
                size="small"
              />
              
              {/* Layer 3 - Middle Right Leaves */}
              <Leaf 
                position="top-12 right-1/3 transform translate-x-1/2" 
                delay="600" 
                size="medium"
              />
              <Leaf 
                position="top-20 right-1/4 transform translate-x-1/2" 
                delay="1000" 
                size="small"
              />
              
              {/* Layer 4 - Bottom Leaves */}
              <Leaf 
                position="top-28 left-2/5 transform -translate-x-1/2" 
                delay="1200" 
                size="medium"
              />
              <Leaf 
                position="top-28 right-2/5 transform translate-x-1/2" 
                delay="1400" 
                size="medium"
              />

            </div>

            {/* Branches Container */}
            <div className="relative">
              
              {/* Main Trunk with gradient */}
              <div 
                className="w-5 h-48 mx-auto rounded-lg shadow-xl"
                style={{
                  background: 'linear-gradient(to right, #8B4513, #A0522D, #8B4513)'
                }}
              />
              
              {/* Left Branches with slight curvature */}
              <Branch rotation="-25" length="50" position="top-12 left-1/2 -translate-x-3" curvature="5" />
              <Branch rotation="-40" length="35" position="top-20 left-1/2 -translate-x-5" curvature="8" />
              <Branch rotation="-15" length="45" position="top-28 left-1/2 -translate-x-2" curvature="3" />
              
              {/* Right Branches with slight curvature */}
              <Branch rotation="25" length="50" position="top-12 right-1/2 translate-x-3" curvature="-5" />
              <Branch rotation="40" length="35" position="top-20 right-1/2 translate-x-5" curvature="-8" />
              <Branch rotation="15" length="45" position="top-28 right-1/2 translate-x-2" curvature="-3" />

            </div>

          </div>

          {/* Tree Base */}
          <div className="w-20 h-3 bg-brown-800 rounded-full mt-2 shadow-lg" />

          {/* Ground with texture */}
          <div 
            className="w-56 h-4 rounded-full mt-4 shadow-inner relative overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom, #2d5a27, #3a6b34)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-800/20 to-transparent animate-pulse" />
          </div>

          {/* Info Section */}
          <div className="mt-12 text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <p className="text-green-900 text-xl font-semibold mb-2">
              🌿 Realistic Tree with 7 Leaves
            </p>
            <p className="text-green-700">
              Hover over leaves and branches to see interactive effects!
            </p>
            <div className="flex justify-center space-x-4 mt-4 text-green-800">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                Animated Leaves
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-brown-600 rounded-full mr-1"></div>
                Curved Branches
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Tree4;