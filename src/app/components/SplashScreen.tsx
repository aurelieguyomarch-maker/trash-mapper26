import { useEffect, useState } from 'react';
import trashMapperLogo from 'figma:asset/04fede240e8e6c3e33fe73fc0fcc77802c25ee96.png';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 2000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation before complete removal
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    // Complete removal after animation
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #53fab5 0%, #76f9d2 100%)'
      }}
    >
      <div className="text-center animate-pulse">
        <img 
          src={trashMapperLogo} 
          alt="Trash Mapper" 
          className="h-32 md:h-40 mx-auto mb-6 drop-shadow-2xl" 
        />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
          Trash Mapper
        </h1>
        <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
          Deviens un serial cleaner
        </p>
        
        {/* Loading animation */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}