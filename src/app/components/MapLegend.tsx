import { Card } from './ui/card';
import { MapPin, Trash2 } from 'lucide-react';

export function MapLegend() {
  return (
    <Card className="absolute bottom-20 left-2 md:bottom-6 md:left-6 z-[1000] p-3 md:p-4 bg-white shadow-lg">
      <h3 className="font-semibold mb-2 text-xs md:text-sm">Légende</h3>
      <div className="space-y-1.5 md:space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500 border-2 border-white flex-shrink-0"></div>
          <span className="text-xs">Votre position</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 border-2 border-white flex-shrink-0"></div>
          <span className="text-xs">Non ramassé</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 border-2 border-white flex-shrink-0"></div>
          <span className="text-xs">Ramassé</span>
        </div>
      </div>
    </Card>
  );
}