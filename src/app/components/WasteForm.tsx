import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Camera, MapPin, Trash2, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface WasteFormProps {
  open: boolean;
  onClose: () => void;
  position: { lat: number; lng: number } | null;
  onSuccess: () => void;
  accessToken: string;
  projectId: string;
  publicAnonKey: string;
  isDemoMode?: boolean;
}

const categories = [
  'Plastique',
  'Métal',
  'Verre',
  'Papier',
  'Électronique',
  'Dangereux',
  'Déchets multiples',
  'Autre'
];

export function WasteForm({ open, onClose, position, onSuccess, accessToken, projectId, publicAnonKey, isDemoMode }: WasteFormProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [category, setCategory] = useState('Plastique');
  const [address, setAddress] = useState('');
  const [collected, setCollected] = useState(false);
  const [useGeolocation, setUseGeolocation] = useState(true);
  const [loading, setLoading] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const triggerCamera = () => {
    // Créer dynamiquement l'input pour forcer la caméra arrière sur Android
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.setAttribute('capture', 'environment');
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
      }
    };
    
    input.click();
  };

  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.error('Error getting address:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  const handleSubmit = async () => {
    if (!photo) {
      toast.error('Veuillez prendre une photo du déchet');
      return;
    }

    if (!position) {
      toast.error('Position non disponible');
      return;
    }

    setLoading(true);

    try {
      // Mode démo : simuler la déclaration sans backend
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai
        
        const pointsAdded = collected ? 40 : 10;
        toast.success(`Déchet déclaré en mode démo ! +${pointsAdded} points`);
        onSuccess();
        handleClose();
        return;
      }

      const formData = new FormData();
      formData.append('lat', position.lat.toString());
      formData.append('lng', position.lng.toString());
      formData.append('category', category);
      formData.append('collected', collected.toString());
      formData.append('declaredPhoto', photo);
      
      if (collected) {
        formData.append('photo', photo);
      }

      let finalAddress = address;
      if (useGeolocation && !address) {
        finalAddress = await getAddressFromCoords(position.lat, position.lng);
      }
      formData.append('address', finalAddress);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-07dde686/waste`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la déclaration');
      }

      toast.success(`Déchet déclaré ! +${data.pointsAdded} points`);
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error submitting waste:', error);
      toast.error('Erreur lors de la déclaration du déchet');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setCategory('Plastique');
    setAddress('');
    setCollected(false);
    setUseGeolocation(true);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[80vh] flex flex-col p-0">
        <div className="p-3 sm:p-4 border-b flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
              Déclarer un déchet
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Prenez une photo du déchet et remplissez les informations ci-dessous.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label className="text-sm">Photo du déchet *</Label>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                💡 Si la caméra s'ouvre en mode selfie, utilisez l'icône 🔄 pour basculer vers la caméra arrière
              </p>
              <div className="mt-2 space-y-2">
                {!photoPreview && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={triggerCamera}
                      className="flex-1 text-xs sm:text-sm"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Prendre une photo
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => galleryInputRef.current?.click()}
                      className="flex-1 text-xs sm:text-sm"
                    >
                      Choisir un fichier
                    </Button>
                  </div>
                )}
                
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  className="hidden"
                />

                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleGallerySelect}
                  className="hidden"
                />

                {photoPreview && (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full rounded-lg max-h-[200px] object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setPhoto(null);
                        setPhotoPreview(null);
                      }}
                      className="absolute top-2 right-2 text-xs"
                    >
                      Supprimer
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-sm">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Adresse</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={useGeolocation}
                  onChange={(e) => setUseGeolocation(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-xs sm:text-sm">Utiliser la géolocalisation</span>
              </div>
              {!useGeolocation && (
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Entrer l'adresse manuellement"
                  className="mt-2 text-sm"
                />
              )}
            </div>

            <div className="flex items-center gap-2 pb-2">
              <input
                type="checkbox"
                checked={collected}
                onChange={(e) => setCollected(e.target.checked)}
                className="w-4 h-4"
              />
              <Label className="cursor-pointer text-xs sm:text-sm">J'ai ramassé ce déchet</Label>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 border-t flex-shrink-0 bg-white shadow-lg">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 text-sm"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 text-sm"
              disabled={loading || !photo}
              style={{ backgroundColor: '#53fab5' }}
            >
              {loading ? 'Envoi...' : 'Déclarer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}