import { Card } from './ui/card';
import { Trash2, CheckCircle, MapPin } from 'lucide-react';

interface MapStatsProps {
  totalWastes: number;
  collectedWastes: number;
  uncollectedWastes: number;
}

export function MapStats({ totalWastes, collectedWastes, uncollectedWastes }: MapStatsProps) {
  return (
    <Card className="absolute top-16 left-2 md:top-20 md:left-6 z-[1000] p-3 md:p-4 bg-white shadow-lg">
      <h3 className="font-semibold mb-2 text-xs md:text-sm">Stats</h3>
      <div className="space-y-1.5 md:space-y-2 text-xs">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 md:gap-2">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 text-gray-600 flex-shrink-0" />
            <span className="text-xs">Total</span>
          </div>
          <span className="font-bold text-xs">{totalWastes}</span>
        </div>
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Trash2 className="h-3 w-3 md:h-4 md:w-4 text-red-500 flex-shrink-0" />
            <span className="text-xs">À faire</span>
          </div>
          <span className="font-bold text-red-600 text-xs">{uncollectedWastes}</span>
        </div>
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 md:gap-2">
            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
            <span className="text-xs">Fait</span>
          </div>
          <span className="font-bold text-green-600 text-xs">{collectedWastes}</span>
        </div>
      </div>
    </Card>
  );
}