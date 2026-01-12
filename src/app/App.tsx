import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Locate, Plus, Trophy, LogOut, Eye, EyeOff, User, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import trashMapperLogo from 'figma:asset/04fede240e8e6c3e33fe73fc0fcc77802c25ee96.png';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { getSupabaseClient } from '/utils/supabase/client';
import { WasteForm } from './components/WasteForm';
import { CollectWasteDialog } from './components/CollectWasteDialog';
import { CategoryFilter } from './components/CategoryFilter';
import { SplashScreen } from './components/SplashScreen';
import { UserProfileDialog } from './components/UserProfileDialog';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { IconGenerator } from './components/IconGenerator';

// Get the singleton Supabase client
const supabase = getSupabaseClient();

// Fix Leaflet icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icons
const redIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDEwLjYgMTIuNSAyOC41IDEyLjUgMjguNVMyNSAyMy4xIDI1IDEyLjVDMjUgNS42IDE5LjQgMCAxMi41IDB6IiBmaWxsPSIjZWYzMzM4Ii8+PGNpcmNsZSBjeD0iMTIuNSIgY3k9IjEyLjUiIHI9IjciIGZpbGw9IndoaXRlIi8+PC9zdmc+',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const greenIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDEwLjYgMTIuNSAyOC41IDEyLjUgMjguNVMyNSAyMy4xIDI1IDEyLjVDMjUgNS42IDE5LjQgMCAxMi41IDB6IiBmaWxsPSIjMTZhMzRhIi8+PGNpcmNsZSBjeD0iMTIuNSIgY3k9IjEyLjUiIHI9IjciIGZpbGw9IndoaXRlIi8+PC9zdmc+',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const blueIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxMCIgZmlsbD0iIzM4NzZiZiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+PC9zdmc+',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

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

export default function App() {
  // Check if we should show the icon generator
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('icon-generator') === 'true') {
    return <IconGenerator />;
  }

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const isInitializing = useRef(false);
  const hasInitialized = useRef(false);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const wasteMarkersRef = useRef<L.Marker[]>([]);

  const [isMapReady, setIsMapReady] = useState(false);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [manualPosition, setManualPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  
  // Auth & User
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Auth Forms
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Demo mode
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // Wastes
  const [wastes, setWastes] = useState<Waste[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [statusFilter, setStatusFilter] = useState<'Tous' | 'Ramassés' | 'Non ramassés'>('Tous');
  
  // Dialogs
  const [showWasteForm, setShowWasteForm] = useState(false);
  const [showCollectDialog, setShowCollectDialog] = useState(false);
  const [selectedWaste, setSelectedWaste] = useState<Waste | null>(null);

  // Splash screen
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  // User profile dialog
  const [showUserProfile, setShowUserProfile] = useState(false);

  // Welcome screen
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  
  // Filter dialog state
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  // Onboarding tutorial
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Initialize map ONLY when authenticated
  useEffect(() => {
    // Don't initialize if not authenticated or already initialized
    if (!isAuthenticated && !isDemoMode) return;
    if (isInitializing.current || !mapRef.current || mapInstanceRef.current) return;
    if (hasInitialized.current) return;

    hasInitialized.current = true;
    isInitializing.current = true;
    const container = mapRef.current;
    
    if ((container as any)._leaflet_id) {
      delete (container as any)._leaflet_id;
    }
    container.innerHTML = '';

    try {
      const map = L.map(container, {
        center: [48.8566, 2.3522],
        zoom: 13,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      setIsMapReady(true);
      
      console.log('Map initialized successfully!');

      setTimeout(() => {
        map.invalidateSize();
      }, 100);

    } catch (error: any) {
      console.error('Map initialization error:', error.message);
      toast.error('Erreur: ' + error.message);
      isInitializing.current = false;
      hasInitialized.current = false;
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.error('Error removing map:', e);
        }
        mapInstanceRef.current = null;
      }
      isInitializing.current = false;
      hasInitialized.current = false;
      setIsMapReady(false);
    };
  }, [isAuthenticated, isDemoMode]);

  // Get user location
  useEffect(() => {
    if (!isMapReady) return;

    if (navigator.geolocation) {
      // Détection iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const timeout = isIOS ? 30000 : 10000; // 30s pour iOS, 10s pour Android
      
      console.log(`Tentative de géolocalisation (${isIOS ? 'iOS' : 'Android'})...`);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Géolocalisation réussie:', position.coords);
          const pos: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setUserPosition(pos);
          setCurrentPosition({ lat: pos[0], lng: pos[1] });
          
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView(pos, 15);
            
            if (userMarkerRef.current) {
              userMarkerRef.current.setLatLng(pos);
            } else {
              userMarkerRef.current = L.marker(pos, { icon: blueIcon })
                .addTo(mapInstanceRef.current)
                .bindPopup('📍 Vous êtes ici');
            }
          }
          
          toast.success('Position détectée !');
        },
        (error) => {
          console.log('Géolocalisation non disponible, utilisation de Paris par défaut');
          
          // Use Paris as default position
          const defaultPos: [number, number] = [48.8566, 2.3522];
          setUserPosition(defaultPos);
          setCurrentPosition({ lat: defaultPos[0], lng: defaultPos[1] });
          
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView(defaultPos, 13);
            
            if (userMarkerRef.current) {
              userMarkerRef.current.setLatLng(defaultPos);
            } else {
              userMarkerRef.current = L.marker(defaultPos, { icon: blueIcon })
                .addTo(mapInstanceRef.current)
                .bindPopup('📍 Position par défaut (Paris)');
            }
          }
          
          // Only show a gentle toast message
          if (error.code === 1 && error.message.includes('permissions policy')) {
            toast.info('📍 Position par défaut : Paris');
          } else {
            let errorMessage = '📍 Position par défaut : Paris';
            
            switch(error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = '📍 Géolocalisation désactivée. Position : Paris';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = '📍 Position indisponible. Utilisation de Paris';
                break;
              case error.TIMEOUT:
                errorMessage = '📍 Délai dépassé. Utilisation de Paris';
                break;
            }
            
            toast.info(errorMessage);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: timeout,
          maximumAge: 0
        }
      );
    } else {
      // Geolocation not supported - use Paris
      const defaultPos: [number, number] = [48.8566, 2.3522];
      setUserPosition(defaultPos);
      setCurrentPosition({ lat: defaultPos[0], lng: defaultPos[1] });
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView(defaultPos, 13);
        userMarkerRef.current = L.marker(defaultPos, { icon: blueIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup('📍 Position par défaut (Paris)');
      }
      
      toast.info('📍 Position par défaut : Paris');
    }
  }, [isMapReady]);

  // Check existing session
  useEffect(() => {
    checkSession();
  }, []);

  // Show onboarding tutorial when map is ready for first time
  useEffect(() => {
    if (!isMapReady) return;
    
    const hasSeenOnboarding = localStorage.getItem('trash-mapper-seen-onboarding');
    if (hasSeenOnboarding !== 'true') {
      // Wait a bit for map to fully render, then show onboarding
      setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
    }
  }, [isMapReady]);

  const checkSession = async () => {
    try {
      // Check if demo mode is active in localStorage
      const savedDemoMode = localStorage.getItem('trash-mapper-demo-mode');
      if (savedDemoMode === 'true') {
        setIsDemoMode(true);
        setIsAuthenticated(true);
        setAccessToken('demo-token');
        setUser({
          id: 'demo-user',
          email: 'demo@example.com',
          name: 'Utilisateur Démo',
          points: parseInt(localStorage.getItem('trash-mapper-demo-points') || '0', 10)
        });
        setIsLoading(false);
        
        // Check if user has seen welcome screen
        const hasSeenWelcome = localStorage.getItem('trash-mapper-seen-welcome');
        if (hasSeenWelcome === 'true') {
          setShowWelcomeScreen(false);
        }
        
        // User has already seen splash screen if they're in demo mode
        setShowSplashScreen(false);
        
        // Load demo wastes from localStorage
        const savedWastes = localStorage.getItem('trash-mapper-demo-wastes');
        if (savedWastes) {
          setWastes(JSON.parse(savedWastes));
        }
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        setAccessToken(session.access_token);
        setIsAuthenticated(true);
        // User has logged in, don't show welcome screen
        setShowWelcomeScreen(false);
        // User has already seen splash screen if they have a session
        setShowSplashScreen(false);
        await fetchUserData(session.user.id);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setIsLoading(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-07dde686/user/${userId}`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-07dde686/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password, name })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success('Compte créé avec succès !');
      await handleLogin(email, password);
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Erreur lors de l\'inscription');
    }
  };

  const handleLogin = async (loginEmail?: string, loginPassword?: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail || email,
        password: loginPassword || password,
      });

      if (error) throw error;

      if (data.session) {
        setAccessToken(data.session.access_token);
        setIsAuthenticated(true);
        setShowAuthForm(false);
        await fetchUserData(data.user.id);
        toast.success('Connexion réussie !');
        loadWastes();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Erreur lors de la connexion');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setAccessToken('');
    setUser(null);
    setIsDemoMode(false);
    setWastes([]);
    setShowWelcomeScreen(true); // Reset welcome screen
    setShowUserProfile(false); // Close the profile dialog
    
    // Clear demo mode from localStorage
    localStorage.removeItem('trash-mapper-demo-mode');
    localStorage.removeItem('trash-mapper-demo-points');
    localStorage.removeItem('trash-mapper-demo-wastes');
    localStorage.removeItem('trash-mapper-seen-welcome');
    
    toast.success('Déconnexion réussie');
  };

  const handleDeleteAccount = async () => {
    // Confirmation dialog
    if (!window.confirm('⚠️ ATTENTION : Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible et supprimera toutes vos données.')) {
      return;
    }

    try {
      if (isDemoMode) {
        // Demo mode: just clear data
        handleLogout();
        toast.success('Compte démo supprimé');
        return;
      }

      // Call backend to delete account
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-07dde686/user/${user?.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la suppression du compte');
      }

      // Logout after successful deletion
      await handleLogout();
      toast.success('Compte supprimé avec succès');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast.error(error.message || 'Erreur lors de la suppression du compte');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // IMPORTANT: You must complete setup at https://supabase.com/docs/guides/auth/social-login/auth-google
      // Otherwise there will be a "provider is not enabled" error
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        throw error;
      }

      // OAuth will redirect, so we don't need to do anything else here
    } catch (error: any) {
      console.error('Google login error:', error);
      
      if (error.message?.includes('not enabled')) {
        toast.error(
          'La connexion Google n\'est pas encore configurée. Veuillez consulter la documentation Supabase.',
          { duration: 5000 }
        );
      } else {
        toast.error(error.message || 'Erreur lors de la connexion avec Google');
      }
    }
  };

  const handleDemoMode = () => {
    setIsDemoMode(true);
    setIsAuthenticated(true);
    setAccessToken('demo-token');
    setUser({
      id: 'demo-user',
      email: 'demo@example.com',
      name: 'Utilisateur Démo',
      points: 0
    });
    setShowAuthForm(false);
    
    // Persist demo mode in localStorage
    localStorage.setItem('trash-mapper-demo-mode', 'true');
    localStorage.setItem('trash-mapper-demo-points', '0');
    
    // User has seen the welcome screen if they're clicking demo mode
    localStorage.setItem('trash-mapper-seen-welcome', 'true');
    
    toast.success('Mode démo activé !');
    
    // Add demo wastes
    const demoWastes: Waste[] = [
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
        createdAt: new Date().toISOString(),
        collectedAt: new Date().toISOString(),
      },
    ];
    setWastes(demoWastes);
  };

  // Load wastes from server
  const loadWastes = async () => {
    if (!currentPosition && !userPosition) return;

    try {
      const pos = currentPosition || (userPosition ? { lat: userPosition[0], lng: userPosition[1] } : null);
      if (!pos) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-07dde686/wastes/nearby?lat=${pos.lat}&lng=${pos.lng}&radius=50`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWastes(data.wastes || []);
      }
    } catch (error) {
      console.error('Error loading wastes:', error);
    }
  };

  // Update markers when wastes change
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    // Clear existing markers
    wasteMarkersRef.current.forEach(marker => marker.remove());
    wasteMarkersRef.current = [];

    // Filter wastes
    const filteredWastes = wastes.filter(waste => {
      const categoryMatch = selectedCategory === 'Tous' || waste.category === selectedCategory;
      const statusMatch = statusFilter === 'Tous' || (statusFilter === 'Ramassés' ? waste.collected : !waste.collected);
      return categoryMatch && statusMatch;
    });

    // Add new markers
    filteredWastes.forEach(waste => {
      const icon = waste.collected ? greenIcon : redIcon;
      const marker = L.marker([waste.lat, waste.lng], { icon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div class="p-2">
            <p class="font-bold text-sm">${waste.category}</p>
            <p class="text-xs text-gray-600 mt-1">${waste.address}</p>
            <p class="text-xs mt-2">${waste.collected ? '✅ Ramassé' : '⚠️ Non ramassé'}</p>
            ${!waste.collected ? '<button class="mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700" onclick="window.collectWaste(\'' + waste.id + '\')">Ramasser</button>' : ''}
          </div>
        `);
      
      wasteMarkersRef.current.push(marker);
    });

  }, [wastes, selectedCategory, statusFilter, isMapReady]);

  // Global function for collect button in popup
  useEffect(() => {
    (window as any).collectWaste = (wasteId: string) => {
      const waste = wastes.find(w => w.id === wasteId);
      if (waste) {
        setSelectedWaste(waste);
        setShowCollectDialog(true);
      }
    };
  }, [wastes]);

  const handleWasteSuccess = () => {
    if (isDemoMode) {
      toast.info('Mode démo : les données ne sont pas sauvegardées');
    } else {
      loadWastes();
      if (user) {
        fetchUserData(user.id);
      }
    }
  };

  const centerOnUserLocation = () => {
    if (userPosition && mapInstanceRef.current) {
      mapInstanceRef.current.setView(userPosition, 15);
      toast.success('Centré sur votre position');
    } else {
      toast.error('Position non disponible');
    }
  };

  // Auth UI
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center relative" style={{
        background: 'linear-gradient(135deg, #36a99d 10%, #53fab5 100%)'
      }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="text-center relative z-10">
          <img src={trashMapperLogo} alt="Trash Mapper" className="h-24 md:h-32 mx-auto mb-4 animate-pulse" />
          <p className="text-white font-semibold drop-shadow-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  // Show Welcome Screen first
  if (!isAuthenticated && !isDemoMode && showWelcomeScreen) {
    return (
      <>
        <Toaster position="top-center" />
        <WelcomeScreen onStart={() => {
          setShowWelcomeScreen(false);
          setShowSplashScreen(true);
        }} />
      </>
    );
  }

  if (!isAuthenticated && !isDemoMode) {
    return (
      <div className="h-screen flex items-center justify-center p-4 relative" style={{
        background: 'linear-gradient(135deg, #36a99d 10%, #53fab5 100%)'
      }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <Toaster position="top-center" />
        
        <Card className="w-full max-w-md p-6 relative z-10">
          <div className="text-center mb-6">
            <img src={trashMapperLogo} alt="Trash Mapper" className="h-20 md:h-24 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#53fab5' }}>Bienvenue sur Trash Mapper</h1>
            <p className="text-gray-600">Participez au nettoyage de notre planète 🌍</p>
          </div>

          {!showAuthForm ? (
            <div className="space-y-3">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full border-2 hover:bg-gray-50"
                size="lg"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuer avec Google
              </Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>
              
              <Button
                onClick={() => { setShowAuthForm(true); setIsSignup(false); }}
                style={{ backgroundColor: '#53fab5' }}
                className="w-full hover:opacity-90"
                size="lg"
              >
                <User className="h-4 w-4 mr-2" />
                Se connecter
              </Button>
              
              <Button
                onClick={() => { setShowAuthForm(true); setIsSignup(true); }}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Créer un compte
              </Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>
              
              <Button
                onClick={handleDemoMode}
                variant="secondary"
                className="w-full"
                size="lg"
              >
                🎮 Mode Démo
              </Button>
            </div>
          ) : (
            <form onSubmit={isSignup ? handleSignup : (e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
              <div className="flex items-center mb-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthForm(false)}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-bold">
                  {isSignup ? 'Créer un compte' : 'Connexion'}
                </h2>
              </div>
              
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAuthForm(false)}
                  className="flex-1"
                >
                  Retour
                </Button>
                <Button
                  type="submit"
                  className="flex-1 hover:opacity-90"
                  style={{ backgroundColor: '#53fab5' }}
                >
                  {isSignup ? 'S\'inscrire' : 'Se connecter'}
                </Button>
              </div>
              
              <p className="text-center text-sm text-gray-600">
                {isSignup ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
                {' '}
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  style={{ color: '#53fab5' }}
                  className="hover:underline"
                >
                  {isSignup ? 'Se connecter' : 'S\'inscrire'}
                </button>
              </p>
            </form>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Splash Screen */}
      {showSplashScreen && (
        <SplashScreen 
          onComplete={() => setShowSplashScreen(false)}
          duration={2000}
        />
      )}
      
      {/* Header */}
      <div 
        className="fixed top-0 left-0 right-0 bg-white shadow-sm p-3 md:p-4 flex items-center justify-between flex-shrink-0 z-[9999]"
        style={{
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0
        }}
      >
        {/* Left side */}
        <div className="flex items-center gap-2 md:gap-3 flex-1">
          <button 
            onClick={() => setShowUserProfile(true)}
            className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg transition-colors"
          >
            <User className="h-4 w-4 md:h-5 md:w-5" style={{ color: '#53fab5' }} />
            <span className="font-bold text-sm md:text-base" style={{ color: '#53fab5' }}>
              Profil
            </span>
          </button>
          
          {isDemoMode && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
              DÉMO
            </span>
          )}
        </div>
        
        {/* Center - Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={trashMapperLogo} alt="Trash Mapper" className="h-8 md:h-10 w-auto" />
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
          <div className="flex items-center gap-2 bg-[#53fab5] px-2 md:px-3 py-1 rounded-full">
            <Trophy className="h-3 w-3 md:h-4 md:w-4 text-white" />
            <span className="font-bold text-white text-xs md:text-sm">
              {user?.points || 0} pts
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="h-8 w-8 md:h-9 md:w-9 p-0"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-200" style={{ paddingBottom: '72px' }}>
        <div ref={mapRef} className="absolute inset-0" style={{ top: '64px', bottom: '72px' }} />
        
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-[9999]">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-xl text-gray-600 font-semibold">Chargement de la carte...</p>
              <div className="mt-4 animate-pulse">
                <div className="h-2 w-48 bg-green-300 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-[9998] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-gray-200" 
          style={{ 
            paddingBottom: 'env(safe-area-inset-bottom)',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <div className="flex items-center justify-around px-4 py-3">
            {/* Localisation */}
            <button
              onClick={centerOnUserLocation}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[60px]"
              title="Centrer sur ma position"
            >
              <Locate className="h-6 w-6" style={{ color: '#53fab5' }} />
              <span className="text-xs text-gray-600">Position</span>
            </button>
            
            {/* Œil (Afficher/Masquer) */}
            <button
              onClick={() => {
                // Toggle through: Tous -> Ramassés -> Non ramassés -> Tous
                if (statusFilter === 'Tous') setStatusFilter('Ramassés');
                else if (statusFilter === 'Ramassés') setStatusFilter('Non ramassés');
                else setStatusFilter('Tous');
              }}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[60px]"
              title={statusFilter === 'Tous' ? 'Afficher tous' : statusFilter === 'Ramassés' ? 'Ramassés seulement' : 'Non ramassés seulement'}
            >
              {statusFilter === 'Tous' ? (
                <Eye className="h-6 w-6" style={{ color: '#53fab5' }} />
              ) : statusFilter === 'Ramassés' ? (
                <Eye className="h-6 w-6 text-green-600" />
              ) : (
                <Eye className="h-6 w-6 text-red-600" />
              )}
              <span className="text-xs text-gray-600">Voir</span>
            </button>
            
            {/* Filtre */}
            <button
              onClick={() => setShowFilterDialog(!showFilterDialog)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[60px]"
              title="Filtrer par statut"
            >
              <svg className="h-6 w-6" fill="none" stroke="#53fab5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-xs text-gray-600">Filtre</span>
            </button>
            
            {/* Ajouter */}
            <button
              onClick={() => setShowWasteForm(true)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[60px]"
              style={{ backgroundColor: '#53fab5' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3e9da0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#53fab5'}
              title="Déclarer un déchet"
            >
              <Plus className="h-7 w-7 text-white" />
              <span className="text-xs text-white font-semibold">Ajouter</span>
            </button>
          </div>
        </div>

        {/* Filter Dialog Overlay */}
        {showFilterDialog && (
          <div 
            className="absolute inset-0 bg-black/50 z-[1100]" 
            onClick={() => setShowFilterDialog(false)}
          >
            <div 
              className="absolute bottom-[72px] left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold text-lg mb-3">Filtrer par statut</h3>
              <div className="flex flex-col gap-2">
                {['Tous', 'Ramassés', 'Non ramassés'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status as 'Tous' | 'Ramassés' | 'Non ramassés');
                      setShowFilterDialog(false);
                    }}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      statusFilter === status
                        ? 'text-white border-[#53fab5]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#53fab5]'
                    }`}
                    style={statusFilter === status ? { backgroundColor: '#53fab5' } : {}}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <WasteForm
        open={showWasteForm}
        onClose={() => setShowWasteForm(false)}
        position={currentPosition || { lat: 48.8566, lng: 2.3522 }}
        onSuccess={handleWasteSuccess}
        accessToken={accessToken}
        projectId={projectId}
        publicAnonKey={publicAnonKey}
        isDemoMode={isDemoMode}
      />

      {selectedWaste && (
        <CollectWasteDialog
          open={showCollectDialog}
          onClose={() => {
            setShowCollectDialog(false);
            setSelectedWaste(null);
          }}
          waste={selectedWaste}
          onSuccess={handleWasteSuccess}
          accessToken={accessToken}
          projectId={projectId}
        />
      )}

      <UserProfileDialog
        open={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        user={user}
        accessToken={accessToken}
        projectId={projectId}
        isDemoMode={isDemoMode}
        onLogout={handleLogout}
        onDeleteAccount={handleDeleteAccount}
      />
      
      {/* Onboarding Tutorial */}
      <OnboardingTutorial
        open={showOnboarding}
        onClose={() => {
          setShowOnboarding(false);
          localStorage.setItem('trash-mapper-seen-onboarding', 'true');
        }}
      />
    </div>
  );
}