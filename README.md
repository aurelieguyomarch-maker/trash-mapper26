# 🌍 Trash Mapper

> **Application participative de nettoyage de la planète**  
> Déclarez et ramassez des déchets, gagnez des points, sauvez la planète ! 🌱

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-3ECF8E?logo=supabase)](https://supabase.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Trash Mapper Banner](https://via.placeholder.com/1200x400/16a34a/ffffff?text=Trash+Mapper+🌍)

---

## ✨ Fonctionnalités

### 🗺️ **Carte interactive**
- Visualisation en temps réel des déchets déclarés
- Géolocalisation automatique (GPS)
- Marqueurs colorés : 🔴 Rouge = non ramassé | 🟢 Vert = ramassé
- Clustering intelligent des déchets proches

### 🔐 **Authentification sécurisée**
- Connexion avec Google OAuth
- Inscription par email/mot de passe
- Mode démo pour tester sans inscription

### 📸 **Photos obligatoires**
- Photo requise lors de la déclaration
- Photo requise lors du ramassage
- Stockage sécurisé dans Supabase Storage

### 🏆 **Système de gamification**
- **+10 points** : Déclarer un déchet
- **+20 points** : Ramasser un déchet existant
- **+40 points** : Déclarer + Ramasser en une seule action
- Classement des meilleurs "serial cleaners"

### 🗂️ **Catégorisation des déchets**
- Plastique
- Métal
- Verre
- Papier/Carton
- Organique
- Autre

### 📱 **Optimisée mobile**
- Interface responsive (mobile-first)
- Splash screen élégant
- Compatible iOS et Android
- Mode PWA ready

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- Compte Supabase (gratuit)
- Compte Vercel (gratuit, pour le déploiement)

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/VOTRE-USERNAME/trash-mapper.git
cd trash-mapper

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créez un fichier .env.local avec :
VITE_SUPABASE_URL=https://VOTRE-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=VOTRE-ANON-KEY

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

---

## 📚 Documentation complète

**Pour un guide de déploiement complet (Supabase + Vercel + Google OAuth), consultez :**

📖 **[INDEX.md](./INDEX.md)** - Naviguez dans toute la documentation  
📖 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Guide détaillé étape par étape  
⚡ **[QUICK_START.md](./QUICK_START.md)** - Démarrage rapide pour les experts  
🔧 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Solutions aux problèmes courants

---

## 🏗️ Architecture

```
trash-mapper/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Composant principal
│   │   └── components/
│   │       ├── CategoryFilter.tsx     # Filtre par catégorie
│   │       ├── CollectWasteDialog.tsx # Dialog de ramassage
│   │       ├── MapLegend.tsx          # Légende de la carte
│   │       ├── MapStats.tsx           # Statistiques
│   │       ├── SplashScreen.tsx       # Écran de chargement
│   │       ├── UserProfileDialog.tsx  # Profil utilisateur
│   │       ├── WasteForm.tsx          # Formulaire de déclaration
│   │       └── ui/                    # Composants UI (shadcn)
│   ├── styles/                        # CSS (Tailwind v4)
│   └── utils/                         # Utilitaires
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx              # Serveur backend (Hono)
│           └── kv_store.tsx           # Base de données KV
└── utils/
    └── supabase/
        └── info.tsx                   # Configuration Supabase
```

---

## 🛠️ Stack technique

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS v4** - Framework CSS
- **Leaflet + React Leaflet** - Cartographie interactive
- **Lucide React** - Icônes
- **Sonner** - Notifications toast
- **shadcn/ui** - Composants UI

### Backend
- **Supabase** - BaaS (Backend as a Service)
  - Authentication (Google OAuth + Email)
  - Storage (photos des déchets)
  - Edge Functions (serveur backend)
- **Hono** - Framework web pour Edge Functions
- **Key-Value Store** - Base de données simple et rapide

### Déploiement
- **Vercel** - Hébergement frontend (CDN mondial)
- **Supabase Edge Functions** - Hébergement backend
- **GitHub** - Versioning

---

## 📊 Schéma de données

### Table `kv_store_07dde686`

```typescript
// Utilisateurs
users:{userId} = {
  id: string
  email: string
  name: string
  points: number
}

// Déchets
wastes:{wasteId} = {
  id: string
  userId: string
  lat: number
  lng: number
  address: string
  category: string
  declaredPhoto: string (URL)
  collected: boolean
  collectedPhoto?: string (URL)
  collectedBy?: string
  collectedAt?: string (ISO date)
  createdAt: string (ISO date)
}
```

---

## 🌟 Captures d'écran

### 📱 Mobile

<table>
  <tr>
    <td><img src="https://via.placeholder.com/300x600/16a34a/ffffff?text=Splash+Screen" alt="Splash" width="200"/></td>
    <td><img src="https://via.placeholder.com/300x600/3b82f6/ffffff?text=Login" alt="Login" width="200"/></td>
    <td><img src="https://via.placeholder.com/300x600/ef4444/ffffff?text=Map" alt="Map" width="200"/></td>
  </tr>
  <tr>
    <td align="center">Splash Screen</td>
    <td align="center">Authentification</td>
    <td align="center">Carte interactive</td>
  </tr>
</table>

### 💻 Desktop

![Desktop View](https://via.placeholder.com/1200x600/16a34a/ffffff?text=Desktop+View)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Forkez** le projet
2. Créez une **branche** pour votre feature (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

### Guidelines

- Suivez le style de code existant
- Testez votre code localement
- Documentez les nouvelles fonctionnalités
- Mettez à jour le README si nécessaire

---

## 🐛 Rapport de bugs

Si vous trouvez un bug, ouvrez une **Issue** avec :
- Une description claire du problème
- Les étapes pour le reproduire
- Le comportement attendu vs. actuel
- Des captures d'écran si pertinent
- Votre environnement (OS, navigateur, version)

---

## 📝 Roadmap

### v1.0 (Actuel) ✅
- [x] Carte interactive avec Leaflet
- [x] Authentification Google OAuth
- [x] Déclaration de déchets avec photo
- [x] Ramassage de déchets avec photo
- [x] Système de points
- [x] Mode démo

### v1.1 (À venir) 🚧
- [ ] Profil utilisateur détaillé
- [ ] Classement global des utilisateurs
- [ ] Historique des déchets déclarés/ramassés
- [ ] Filtres avancés (date, distance, catégorie)
- [ ] Recherche d'adresse manuelle

### v2.0 (Futur) 🔮
- [ ] Notifications push (déchets à proximité)
- [ ] Mode PWA offline
- [ ] Badges et achievements
- [ ] Challenges communautaires
- [ ] Export des statistiques
- [ ] API publique
- [ ] Application mobile native (React Native)

---

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2025 Trash Mapper

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Auteur

**Votre Nom**
- GitHub: [@VOTRE-USERNAME](https://github.com/VOTRE-USERNAME)
- Twitter: [@VOTRE-TWITTER](https://twitter.com/VOTRE-TWITTER)
- Email: votre@email.com

---

## 🙏 Remerciements

- [Supabase](https://supabase.com) pour le backend gratuit et génial
- [Vercel](https://vercel.com) pour l'hébergement ultra-rapide
- [Leaflet](https://leafletjs.com) pour la cartographie open-source
- [shadcn/ui](https://ui.shadcn.com) pour les magnifiques composants
- [OpenStreetMap](https://www.openstreetmap.org) pour les données cartographiques
- La communauté open-source ❤️

---

## 🌍 Faisons la différence ensemble !

**Trash Mapper** n'est pas juste une application, c'est un **mouvement**.  
Chaque déchet déclaré est un pas vers une planète plus propre.  
Chaque déchet ramassé est un acte concret pour l'environnement.

**Rejoignez-nous et devenez un serial cleaner ! 🌱♻️**

---

<p align="center">
  <strong>⭐ Si ce projet vous plaît, donnez-lui une étoile sur GitHub ! ⭐</strong>
</p>

<p align="center">
  Made with 💚 for our planet
</p>