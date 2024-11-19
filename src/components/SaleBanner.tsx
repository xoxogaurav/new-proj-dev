import React from 'react';
import { Gift } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SaleBanner: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

  if (email) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-red-500 to-red-600 h-12 flex items-center justify-center overflow-hidden px-4 shadow-lg border-b border-white/20">
      {/* Snow/Ice Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]" />
      
      {/* Santa Hat Decoration - Left */}
      <div className="absolute -left-2 -top-2 w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rotate-45 transform origin-bottom-left">
        <div className="absolute -right-1 -top-1 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full" />
      </div>
      
      {/* Content */}
      <div className="relative flex items-center gap-2 text-white w-full justify-center">
        <Gift className="hidden sm:block w-4 h-4 animate-bounce text-white drop-shadow-lg flex-shrink-0" />
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base">
          <span className="text-shadow font-bold whitespace-nowrap">50% OFF</span>
          <span className="font-mono bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-sm whitespace-nowrap">
            WINTER50
          </span>
        </div>
      </div>
      
      {/* Santa Hat Decoration - Right */}
      <div className="absolute -right-2 -top-2 w-12 h-12 sm:w-16 sm:h-16 bg-red-600 -rotate-45 transform origin-bottom-right">
        <div className="absolute -left-1 -top-1 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full" />
      </div>
    </div>
  );
};

export default SaleBanner;