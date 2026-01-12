import { Button } from './ui/button';
import { Leaf, MapPin, Trophy, Users } from 'lucide-react';
import trashMapperLogo from 'figma:asset/04fede240e8e6c3e33fe73fc0fcc77802c25ee96.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const handleStart = () => {
    // Save that user has seen the welcome screen
    localStorage.setItem('trash-mapper-seen-welcome', 'true');
    onStart();
  };

  return (
    <div className="min-h-screen w-screen flex flex-col overflow-y-auto overflow-x-hidden relative" style={{
      background: 'linear-gradient(135deg, #36a99d 10%, #53fab5 100%)'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 md:py-12">
        {/* Logo */}
        <div className="mb-4 md:mb-8 animate-bounce-subtle">
          <img 
            src={trashMapperLogo} 
            alt="Trash Mapper" 
            className="h-32 md:h-52 w-auto drop-shadow-2xl"
          />
        </div>

        {/* Main Title */}
        <div className="text-center mb-6 md:mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
            Trash Mapper
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-semibold italic drop-shadow">
            La 1ère app des Serial Cleaners
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-12 w-full max-w-2xl animate-fade-in-delay">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-6 text-center border-2 border-white/30">
            <div className="bg-white/30 rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <MapPin className="h-5 w-5 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xs md:text-lg mb-1">Géolocalise</h3>
            <p className="text-white/80 text-[10px] md:text-sm">Signale les déchets sur la carte</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-6 text-center border-2 border-white/30">
            <div className="bg-white/30 rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Leaf className="h-5 w-5 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xs md:text-lg mb-1">Nettoie</h3>
            <p className="text-white/80 text-[10px] md:text-sm">Ramasse et protège la planète</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-6 text-center border-2 border-white/30">
            <div className="bg-white/30 rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Trophy className="h-5 w-5 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xs md:text-lg mb-1">Gagne</h3>
            <p className="text-white/80 text-[10px] md:text-sm">Accumule des points</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-6 text-center border-2 border-white/30">
            <div className="bg-white/30 rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Users className="h-5 w-5 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xs md:text-lg mb-1">Partage</h3>
            <p className="text-white/80 text-[10px] md:text-sm">Rejoins la communauté</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-bounce-subtle mb-4 md:mb-0">
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-white hover:bg-white/90 font-bold text-base md:text-xl px-8 py-4 md:px-16 md:py-8 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            style={{ color: '#36a99d' }}
          >
            🚀 Commencer l'aventure
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-white font-bold text-xs md:text-base mt-4 md:mt-8 text-center max-w-md pb-4">
          Participe au mouvement mondial de nettoyage de la planète 🌍
        </p>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 md:h-32">
          <path 
            d="M0,0 C150,60 350,0 600,40 C850,80 1050,20 1200,60 L1200,120 L0,120 Z" 
            fill="white" 
            fillOpacity="0.2"
          />
        </svg>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.4s both;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s infinite;
        }
      `}</style>
    </div>
  );
}