import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { MapPin, Camera, Trophy, Navigation, Eye, Filter, Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import trashMapperLogo from 'figma:asset/04fede240e8e6c3e33fe73fc0fcc77802c25ee96.png';

interface OnboardingTutorialProps {
  open: boolean;
  onClose: () => void;
}

export function OnboardingTutorial({ open, onClose }: OnboardingTutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const slides = [
    {
      icon: null, // Logo will be shown instead
      title: "Bienvenue sur Trash Mapper !",
      description: "Deviens un serial cleaner et aide à nettoyer la planète en géolocalisant et ramassant des déchets.",
      showLogo: true
    },
    {
      icon: <Plus className="h-20 w-20 mb-4 text-white" />,
      title: "Déclare un déchet",
      description: "Appuie sur le bouton + en bas à droite, prends une photo du déchet, sélectionne sa catégorie et valide pour gagner 10 points.",
      showLogo: false
    },
    {
      icon: <Trash2 className="h-20 w-20 mb-4 text-white" />,
      title: "Ramasse des déchets",
      description: "Clique sur un marqueur rouge sur la carte, va sur place, ramasse le déchet, prends une photo et gagne 20 points !",
      showLogo: false
    },
    {
      icon: <Trophy className="h-20 w-20 mb-4 text-white" />,
      title: "Système de points",
      description: "• Déclarer un déchet : 10 pts\n• Ramasser un déchet : 20 pts\n• Déclarer + ramasser : 40 pts\n\nCumule des points et deviens un héros de l'environnement !",
      showLogo: false
    },
    {
      icon: <Navigation className="h-20 w-20 mb-4 text-white" />,
      title: "Barre de navigation",
      description: "En bas de l'écran :\n• 📍 Me géolocaliser\n• 👁️ Voir tous les déchets\n• 🔍 Filtrer par catégorie\n• ➕ Déclarer un nouveau déchet",
      showLogo: false
    },
    {
      icon: <Eye className="h-20 w-20 mb-4 text-white" />,
      title: "Codes couleur",
      description: "• Marqueur rouge 🔴 : Déchet non ramassé\n• Marqueur vert 🟢 : Déchet déjà ramassé\n\nClique sur un marqueur pour voir les détails et agir !",
      showLogo: false
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
  };

  const handleTouchMove = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      if (distance > minSwipeDistance) {
        handleNext();
      } else if (distance < -minSwipeDistance) {
        handlePrevious();
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Detect swipe when touch ends
  useEffect(() => {
    if (touchStart !== null && touchEnd !== null) {
      handleTouchMove();
    }
  }, [touchEnd]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0">
        {/* Custom white close button */}
        <style>{`
          [data-slot="dialog-content"] button[data-slot="dialog-close"] {
            color: white !important;
            opacity: 1 !important;
          }
          [data-slot="dialog-content"] button[data-slot="dialog-close"]:hover {
            opacity: 0.8 !important;
          }
          [data-slot="dialog-content"] button[data-slot="dialog-close"] svg {
            width: 24px !important;
            height: 24px !important;
            stroke-width: 3 !important;
          }
        `}</style>
        
        {/* Hidden title for accessibility */}
        <DialogTitle className="sr-only">
          {slides[currentSlide].title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {slides[currentSlide].description}
        </DialogDescription>
        
        <div 
          className="relative p-8 text-center min-h-[550px] flex flex-col select-none" 
          style={{ backgroundColor: '#53fab5' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Skip Button - positioned to not overlap with X button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 left-4 text-white hover:text-white/80 text-sm font-semibold transition-colors z-10"
          >
            Passer
          </button>

          {/* Slide Content */}
          <div className="flex-1 flex flex-col items-center justify-center mt-8">
            {slides[currentSlide].showLogo ? (
              <img src={trashMapperLogo} alt="Trash Mapper Logo" className="h-28 w-auto mb-6" />
            ) : (
              slides[currentSlide].icon
            )}
            <h2 className="text-2xl font-bold text-white mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-white/95 font-bold leading-relaxed whitespace-pre-line max-w-sm text-base">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8'
                    : 'w-2'
                }`}
                style={{
                  backgroundColor: index === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'
                }}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className={`border-2 border-white text-white font-bold hover:bg-white hover:text-[#53fab5] bg-transparent ${currentSlide === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-white hover:bg-white/90 font-bold"
              style={{ color: '#53fab5' }}
            >
              {currentSlide === slides.length - 1 ? 'Commencer' : 'Suivant'}
              {currentSlide < slides.length - 1 && (
                <ChevronRight className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}