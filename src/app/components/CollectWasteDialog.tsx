import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Camera, Package } from 'lucide-react';
import { toast } from 'sonner';

interface Waste {
  id: string;
  category: string;
  address: string;
  declaredPhoto: string;
  collected: boolean;
  lat: number;
  lng: number;
}

interface CollectWasteDialogProps {
  open: boolean;
  onClose: () => void;
  waste: Waste | null;
  accessToken: string;
  projectId: string;
  onSuccess: () => void;
}

export function CollectWasteDialog({ 
  open, 
  onClose, 
  waste, 
  accessToken, 
  projectId,
  onSuccess 
}: CollectWasteDialogProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async () => {
    if (!photo || !waste) {
      toast.error('Veuillez prendre une photo du déchet ramassé');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('photo', photo);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-07dde686/waste/${waste.id}/collect`,
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
        throw new Error(data.error || 'Erreur lors de la collecte');
      }

      toast.success(`Déchet ramassé ! +${data.pointsAdded} points`);
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error collecting waste:', error);
      toast.error('Erreur lors de la collecte du déchet');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPhoto(null);
    setPhotoPreview(null);
    onClose();
  };

  if (!waste) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[80vh] flex flex-col p-0">
        <div className="p-3 sm:p-4 border-b flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Package className="h-4 w-4 sm:h-5 sm:w-5" />
              Ramasser ce déchet
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Prenez une photo du déchet ramassé pour confirmer sa collecte.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label className="text-sm">Déchet déclaré</Label>
              <div className="mt-2 p-2 sm:p-3 border rounded-lg space-y-2">
                <p className="text-xs sm:text-sm"><strong>Catégorie:</strong> {waste.category}</p>
                <p className="text-xs sm:text-sm"><strong>Adresse:</strong> {waste.address}</p>
                {waste.declaredPhoto && (
                  <img
                    src={waste.declaredPhoto}
                    alt="Déchet"
                    className="w-full rounded-lg mt-2 max-h-[200px] object-cover"
                  />
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm">Photo du déchet ramassé *</Label>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                💡 Si la caméra s'ouvre en mode selfie, utilisez l'icône 🔄 pour basculer vers la caméra arrière
              </p>
              <div className="mt-2 space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={triggerCamera}
                  className="w-full text-xs sm:text-sm"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Prendre une photo
                </Button>
                
                <input
                  id="collect-file-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
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
              {loading ? 'Envoi...' : 'Confirmer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}