# 🎨 APERÇU DE L'APPLICATION - TRASH MAPPER

## 🌟 Vue d'ensemble

**Trash Mapper** est une application web mobile-first permettant aux citoyens de déclarer et ramasser des déchets pour rendre la planète plus propre, tout en gagnant des points dans un système gamifié.

---

## 📱 PARCOURS UTILISATEUR

### 1️⃣ **Splash Screen (2 secondes)**
```
┌─────────────────────────────┐
│                             │
│      🌍 TRASH MAPPER        │
│                             │
│  "Deviens un serial         │
│      cleaner"               │
│                             │
│  [Animation élégante]       │
│                             │
└─────────────────────────────┘
```

### 2️⃣ **Écran d'authentification**
```
┌─────────────────────────────┐
│    [Logo Trash Mapper]      │
│                             │
│  Bienvenue sur Trash Mapper │
│  Participez au nettoyage    │
│  de notre planète 🌍        │
│                             │
│  [🌐 Continuer avec Google] │
│                             │
│  ────── ou ──────           │
│                             │
│  [👤 Se connecter]          │
│  [Créer un compte]          │
│                             │
│  ────── ou ──────           │
│                             │
│  [🎮 Mode Démo]             │
└─────────────────────────────┘
```

### 3️⃣ **Carte principale**
```
┌─────────────────────────────┐
│ [Logo] DÉMO  🏆 120 pts [👤]│
├─────────────────────────────┤
│                             │
│   🗺️ [Carte Leaflet]        │
│                             │
│   📍 = Ma position (bleu)   │
│   🔴 = Déchet non ramassé   │
│   🟢 = Déchet ramassé       │
│                             │
│   [Zoom +/-]                │
│                             │
├─────────────────────────────┤
│ [Filtre: Tous ▼]            │
│ [✓ Afficher ramassés]       │
├─────────────────────────────┤
│                             │
│ [📍 Ma position]            │
│ [➕ Déclarer un déchet]     │
│                             │
└─────────────────────────────┘
```

### 4️⃣ **Formulaire de déclaration de déchet**
```
┌─────────────────────────────┐
│ [← Retour] Déclarer déchet  │
├─────────────────────────────┤
│                             │
│ 📸 Prenez une photo         │
│  ┌─────────────────────┐   │
│  │  [Photo prise]      │   │
│  └─────────────────────┘   │
│                             │
│ 📍 Position                 │
│  Lat: 48.8566               │
│  Lng: 2.3522                │
│  [📍 Utiliser ma position]  │
│                             │
│ 🗂️ Catégorie                │
│  [Plastique ▼]              │
│                             │
│ 📝 Adresse (auto)           │
│  Tour Eiffel, Paris         │
│                             │
│ ✅ [Déclarer et ramasser]   │
│    (+40 points)             │
│                             │
│ ou                          │
│                             │
│ [Déclarer seulement]        │
│ (+10 points)                │
│                             │
└─────────────────────────────┘
```

### 5️⃣ **Dialog de ramassage d'un déchet existant**
```
┌─────────────────────────────┐
│ Ramasser ce déchet          │
├─────────────────────────────┤
│                             │
│ 📸 Prenez une photo du      │
│    déchet ramassé           │
│                             │
│  ┌─────────────────────┐   │
│  │  [📷 Prendre photo] │   │
│  └─────────────────────┘   │
│                             │
│ Catégorie: Plastique        │
│ Déclaré le: 01/01/2025      │
│                             │
│ [Annuler] [Ramasser]        │
│           (+20 points)      │
│                             │
└─────────────────────────────┘
```

### 6️⃣ **Profil utilisateur**
```
┌─────────────────────────────┐
│ Mon profil                  │
├─────────────────────────────┤
│                             │
│ 👤 John Doe                 │
│ 📧 john@example.com         │
│                             │
│ 🏆 Score total: 120 points  │
│                             │
│ 📊 Statistiques             │
│  • Déchets déclarés: 5      │
│  • Déchets ramassés: 3      │
│  • Membre depuis: 01/2025   │
│                             │
│ [Fermer]                    │
│                             │
└─────────────────────────────┘
```

---

## 🎨 PALETTE DE COULEURS

### Couleurs principales
- **Vert primaire** : `#16a34a` (actions positives, logo)
- **Vert clair** : `#53fab5` (badge de points)
- **Rouge** : `#ef4444` (déchets non ramassés)
- **Bleu** : `#3b82f6` (position utilisateur)

### Couleurs secondaires
- **Gris clair** : `#f9fafb` (fond)
- **Gris moyen** : `#6b7280` (texte secondaire)
- **Gris foncé** : `#1f2937` (texte principal)
- **Blanc** : `#ffffff` (cartes, boutons)

---

## 🎯 SYSTÈME DE POINTS

```
┌──────────────────────────────────────┐
│  ACTION                │  POINTS     │
├──────────────────────────────────────┤
│  Déclarer un déchet    │    +10     │
│  Ramasser un déchet    │    +20     │
│  Déclarer + Ramasser   │    +40     │
└──────────────────────────────────────┘
```

---

## 🗺️ TYPES DE MARQUEURS

### Marqueur bleu (position utilisateur)
```
     ●
   / | \
```
Cercle bleu avec bordure blanche, toujours visible.

### Marqueur rouge (déchet non ramassé)
```
   /\
  /  \
 /____\
   ||
```
Pin rouge avec point blanc au centre.

### Marqueur vert (déchet ramassé)
```
   /\
  /  \
 /____\
   ||
```
Pin vert avec point blanc au centre.

---

## 📊 FLUX DE DONNÉES

### Frontend → Backend

```
┌─────────────┐
│  Frontend   │  React + Leaflet
│  (Vite)     │  
└──────┬──────┘
       │ HTTPS
       │ Authorization: Bearer <anon-key>
       ▼
┌─────────────┐
│  Supabase   │
│  Edge Func  │  Hono server
│  (Backend)  │  /make-server-07dde686/*
└──────┬──────┘
       │
       ├─► 🔐 Supabase Auth (Google OAuth)
       ├─► 📸 Supabase Storage (photos)
       └─► 🗄️ KV Store (utilisateurs, déchets)
```

### Routes API

```
POST   /signup                    # Créer un compte
GET    /user/:userId              # Profil utilisateur
POST   /waste                     # Déclarer un déchet
GET    /wastes/nearby             # Déchets à proximité
POST   /waste/:wasteId/collect    # Ramasser un déchet
GET    /health                    # Health check
```

---

## 🧩 COMPOSANTS CLÉS

### Hiérarchie des composants

```
App.tsx
├── SplashScreen
├── Login/Signup Form
└── Main App
    ├── Header
    │   ├── Logo
    │   ├── Demo Badge
    │   ├── Points Badge
    │   └── User Button
    ├── Map Container (Leaflet)
    │   ├── User Marker
    │   ├── Waste Markers
    │   └── Zoom Controls
    ├── CategoryFilter
    ├── Controls
    │   ├── Center Button
    │   └── Declare Button
    ├── WasteForm (Dialog)
    ├── CollectWasteDialog
    └── UserProfileDialog
```

---

## 📱 RESPONSIVE DESIGN

### Mobile (< 768px)
- Interface verticale complète
- Boutons adaptés au touch
- Texte lisible sans zoom
- Header compact

### Tablet (768px - 1024px)
- Idem mobile mais plus spacieux
- Textes légèrement plus grands

### Desktop (> 1024px)
- Interface similaire mobile
- Carte prend plus de place
- Textes et boutons plus grands

---

## 🔄 ÉTATS DE L'APPLICATION

### États utilisateur
```
Non authentifié
  → Login/Signup Screen
  → Mode Démo disponible

Authentifié
  → Main App
  → Toutes fonctionnalités disponibles

Mode Démo
  → Main App
  → Données locales seulement
  → Badge "DÉMO" visible
```

### États de la carte
```
Chargement
  → Initialisation Leaflet
  → Détection GPS
  → Chargement des déchets

Prête
  → Carte interactive
  → Marqueurs affichés
  → Filtres actifs

Erreur
  → Fallback sur Paris
  → Message d'information
```

---

## 🎭 ANIMATIONS

### Splash Screen
- Fade in du logo (0.5s)
- Slide up du texte (0.8s)
- Fade out de tout (0.5s)
- Durée totale : 2s

### Transitions
- Dialogs : Scale + fade (200ms)
- Boutons : Hover scale (150ms)
- Toast : Slide from top (300ms)

---

## 🔔 NOTIFICATIONS (Toast)

### Types de notifications
```
✅ Succès (vert)
   "Déchet déclaré avec succès ! +10 points"

ℹ️ Info (bleu)
   "Position par défaut : Paris"

⚠️ Avertissement (jaune)
   "Mode démo : les données ne sont pas sauvegardées"

❌ Erreur (rouge)
   "Erreur lors de l'upload de la photo"
```

---

## 🌐 COMPATIBILITÉ

### Navigateurs supportés
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 8+)

### Fonctionnalités requises
- ✅ JavaScript ES6+
- ✅ Fetch API
- ✅ Geolocation API
- ✅ Camera API (MediaDevices)
- ✅ LocalStorage
- ✅ Canvas (Leaflet)

---

## 🎯 OBJECTIFS UX

### Simplicité
- 3 actions principales maximum par écran
- Navigation intuitive
- Feedback immédiat

### Performance
- Chargement < 3s
- Interactions < 100ms
- Photos optimisées automatiquement

### Accessibilité
- Contrastes élevés
- Textes lisibles
- Boutons tactiles >= 44px

---

## 🚀 PROCHAINES AMÉLIORATIONS UX

### v1.1
- [ ] Tutoriel interactif au premier lancement
- [ ] Recherche d'adresse dans la carte
- [ ] Filtre par distance (1km, 5km, 10km)
- [ ] Historique des actions

### v2.0
- [ ] Mode sombre
- [ ] Notifications push
- [ ] Partage sur réseaux sociaux
- [ ] Badges et achievements visuels
- [ ] Mode offline (PWA)

---

**Fait avec 💚 pour notre planète**
