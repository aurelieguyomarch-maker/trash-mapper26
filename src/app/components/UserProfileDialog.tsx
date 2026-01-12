import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Trophy, MapPin, Calendar, Camera, LogOut, Trash2, Settings, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Waste {
  id: string;
  lat: number;
  lng: number;
  address: string;
  category: string;
  collected: boolean;
  declaredPhoto?: string;
  collectedPhoto?: string;
  userId: string;
  collectedBy?: string;
  createdAt: string;
  collectedAt?: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  points: number;
}

interface UserProfileDialogProps {
  open: boolean;
  onClose: () => void;
  user: UserData;
  accessToken: string;
  projectId: string;
  isDemoMode?: boolean;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export function UserProfileDialog({ 
  open, 
  onClose, 
  user, 
  accessToken, 
  projectId,
  isDemoMode = false,
  onLogout,
  onDeleteAccount
}: UserProfileDialogProps) {
  const [contributions, setContributions] = useState<Waste[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'participations' | 'settings'>('participations');

  useEffect(() => {
    if (open && !isDemoMode) {
      loadContributions();
    } else if (open && isDemoMode) {
      // Demo data
      setContributions([
        {
          id: 'demo-1',
          lat: 48.8566,
          lng: 2.3522,
          address: 'Tour Eiffel, Paris',
          category: 'Plastique',
          collected: false,
          userId: 'demo-user',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'demo-2',
          lat: 48.8606,
          lng: 2.3376,
          address: 'Louvre, Paris',
          category: 'Métal',
          collected: true,
          userId: 'demo-user',
          collectedBy: 'demo-user',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          collectedAt: new Date().toISOString(),
        },
      ]);
    }
  }, [open, isDemoMode, user.id, accessToken, projectId]);

  const loadContributions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-07dde686/user/${user.id}/contributions`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContributions(data.contributions || []);
      } else {
        toast.error('Erreur lors du chargement des contributions');
      }
    } catch (error) {
      console.error('Error loading contributions:', error);
      toast.error('Erreur lors du chargement des contributions');
    } finally {
      setLoading(false);
    }
  };

  const declaredWastes = contributions.filter(w => w.userId === user.id);
  const collectedWastes = contributions.filter(w => w.collectedBy === user.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-2xl">Mon Profil</DialogTitle>
          </DialogHeader>
        </div>

        <div className="overflow-y-auto flex-1 px-6 pb-6">
          {/* User Info */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 mb-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{user.email}</p>
              </div>
              <div className="bg-[#53fab5] px-4 py-3 rounded-full">
                <div className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-white" />
                  <span className="font-bold text-white text-xl">
                    {user.points} pts
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {declaredWastes.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Déchets déclarés
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {collectedWastes.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Déchets ramassés
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b mb-4">
            <button
              onClick={() => setActiveTab('participations')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'participations'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Participations ({declaredWastes.length + collectedWastes.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-gray-600 border-b-2 border-gray-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Paramètres
            </button>
          </div>

          {/* Contributions List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement...</p>
            </div>
          ) : (
            <div className="space-y-3 pb-4">
              {activeTab === 'settings' && (
                <div className="space-y-4 py-4">
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Settings className="h-5 w-5" style={{ color: '#53fab5' }} />
                      Paramètres du compte
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="border-b pb-4">
                        <p className="text-sm text-gray-600 mb-3">
                          Vous souhaitez vous déconnecter de votre compte ?
                        </p>
                        <Button 
                          onClick={onLogout} 
                          variant="outline" 
                          className="w-full justify-start"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Déconnexion
                        </Button>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm text-gray-600 mb-3">
                          ⚠️ Supprimer définitivement votre compte et toutes vos données. Cette action est irréversible.
                        </p>
                        <Button 
                          onClick={onDeleteAccount} 
                          variant="destructive" 
                          className="w-full justify-start"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer mon compte
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'participations' && declaredWastes.length === 0 && collectedWastes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Aucune participation pour le moment</p>
                </div>
              )}

              {activeTab === 'participations' &&
                declaredWastes.map((waste) => (
                  <div
                    key={waste.id}
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                            {waste.category}
                          </span>
                          {waste.collected && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                              ✓ Ramassé
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                          <MapPin className="h-3 w-3" />
                          {waste.address}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Déclaré le {formatDate(waste.createdAt)}
                        </p>
                      </div>
                      {waste.declaredPhoto && (
                        <div className="ml-4">
                          <Camera className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {activeTab === 'participations' &&
                collectedWastes.map((waste) => (
                  <div
                    key={waste.id}
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            {waste.category}
                          </span>
                          <span className="text-green-600 text-sm font-semibold">
                            +20 pts
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                          <MapPin className="h-3 w-3" />
                          {waste.address}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Ramassé le {formatDate(waste.collectedAt || waste.createdAt)}
                        </p>
                      </div>
                      {waste.collectedPhoto && (
                        <div className="ml-4">
                          <Camera className="h-4 w-4 text-blue-400" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Button inside scrollable area */}
          <div className="sticky bottom-0 left-0 right-0 bg-white pt-4 pb-2 border-t mt-4">
            <Button 
              onClick={onClose} 
              className="w-full hover:opacity-90"
              style={{ backgroundColor: '#53fab5', color: 'white' }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la carte
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}