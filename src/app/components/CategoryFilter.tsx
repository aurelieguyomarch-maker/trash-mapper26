import { Card } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { Filter, X } from 'lucide-react';

const categories = [
  { name: 'Tous', icon: '🗑️' },
  { name: 'Plastique', icon: '🥤' },
  { name: 'Métal', icon: '🥫' },
  { name: 'Verre', icon: '🍾' },
  { name: 'Papier', icon: '📄' },
  { name: 'Électronique', icon: '📱' },
  { name: 'Dangereux', icon: '⚠️' },
  { name: 'Déchets multiples', icon: '♻️' },
  { name: 'Autre', icon: '❓' },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile: Floating button */}
      <div className="md:hidden">
        <Button
          size="icon"
          variant={selectedCategory !== 'Tous' ? 'default' : 'secondary'}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-16 right-2 z-[500] h-12 w-12 rounded-full shadow-lg"
        >
          <Filter className="h-5 w-5" />
        </Button>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-[1100]" onClick={() => setIsOpen(false)}>
            <Card 
              className="absolute top-20 right-2 left-2 p-4 bg-white shadow-lg max-h-[60vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Filtres</h3>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.name}
                    variant={selectedCategory === cat.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      onCategoryChange(cat.name);
                      setIsOpen(false);
                    }}
                    className="text-xs px-3 py-2 h-auto"
                  >
                    <span className="mr-1.5">{cat.icon}</span>
                    {cat.name}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Desktop: Fixed card */}
      <Card className="hidden md:block absolute top-20 right-6 z-[400] p-3 bg-white shadow-lg max-w-[200px]">
        <h3 className="font-semibold mb-2 text-sm">Filtres</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.name}
              variant={selectedCategory === cat.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(cat.name)}
              className="text-xs px-2 py-1 h-auto"
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </Button>
          ))}
        </div>
      </Card>
    </>
  );
}