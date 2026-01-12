# 🚀 GUIDE D'INSTALLATION PWA - Trash Mapper

## 📱 **Votre app est maintenant une PWA !**

### ✅ **Configuration terminée :**

1. ✅ Plugin Vite PWA installé
2. ✅ Manifest.json créé avec métadonnées
3. ✅ Service Worker configuré (cache intelligent)
4. ✅ Meta tags iOS ajoutés
5. ✅ Mode offline activé

---

## 🎨 **ÉTAPE IMPORTANTE : Créer les icônes PWA**

Vous devez créer 2 icônes à partir de votre logo Trash Mapper :

### **📏 Tailles requises :**

1. **`pwa-192x192.png`** (192x192 pixels)
2. **`pwa-512x512.png`** (512x512 pixels)

### **🛠 Outils recommandés :**

- **En ligne :** https://realfavicongenerator.net/
- **Photoshop / Figma :** Exporter votre logo aux bonnes dimensions
- **Outil CLI :** `pwa-asset-generator` 

```bash
npx pwa-asset-generator votre-logo.png ./public -i ./index.html -m ./public/manifest.webmanifest
```

### **📂 Où placer les fichiers :**

```
/public/
  ├── pwa-192x192.png       ← Icône 192x192
  ├── pwa-512x512.png       ← Icône 512x512
  ├── apple-touch-icon.png  ← Icône iOS (180x180)
  ├── favicon.ico           ← Favicon navigateur
  └── manifest.webmanifest  ← Déjà créé ✅
```

---

## 📱 **INSTALLATION SUR MOBILE**

### **iOS (iPhone/iPad) :**

1. Ouvrir Safari
2. Aller sur votre site
3. Appuyer sur **Partager** (icône carré avec flèche)
4. Descendre et choisir **"Sur l'écran d'accueil"**
5. Nommer l'app **"Trash Mapper"**
6. Appuyer sur **"Ajouter"**

### **Android :**

1. Ouvrir Chrome
2. Aller sur votre site
3. Une bannière apparaît : **"Ajouter Trash Mapper à l'écran d'accueil"**
4. Appuyer sur **"Installer"**

**OU manuellement :**

1. Menu ⋮ (3 points)
2. **"Installer l'application"** ou **"Ajouter à l'écran d'accueil"**

---

## 🔧 **FONCTIONNALITÉS PWA ACTIVÉES**

### **✨ Mode Offline intelligent :**

- ✅ **Carte OpenStreetMap** : Cache de 30 jours (500 tuiles max)
- ✅ **API Supabase** : Stratégie NetworkFirst (online prioritaire)
- ✅ **Assets statiques** : JS, CSS, images en cache
- ✅ **Mise à jour automatique** : Service Worker auto-update

### **📲 Comportements natifs :**

- ✅ Icône sur l'écran d'accueil
- ✅ Splash screen au démarrage
- ✅ Plein écran (pas de barre navigateur)
- ✅ Orientation portrait verrouillée
- ✅ Couleur de thème turquoise (#53fab5)

---

## 🧪 **TESTER LA PWA**

### **En développement :**

```bash
npm run build
npm run preview
```

Puis ouvrir Chrome DevTools :
- **Application > Manifest** : Vérifier le manifest
- **Application > Service Workers** : Vérifier l'activation
- **Lighthouse > Progressive Web App** : Score PWA

### **Score Lighthouse attendu :**

- ✅ **Installable** : Oui
- ✅ **Fast and reliable** : Oui
- ✅ **Optimized** : À venir (après icônes)

---

## 📦 **DÉPLOIEMENT**

Une fois déployé sur un domaine HTTPS (requis pour PWA) :

1. Visitez votre site sur mobile
2. La bannière d'installation apparaît automatiquement
3. Les utilisateurs peuvent installer en 1 clic

### **⚠️ Prérequis obligatoire :**

- **HTTPS requis** (sauf localhost)
- Vercel, Netlify, GitHub Pages supportent HTTPS automatiquement

---

## 🚀 **PROCHAINE ÉTAPE : Capacitor (optionnel)**

Quand vous serez prêt pour les App Stores :

```bash
# Installation Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android

# Init
npx cap init "Trash Mapper" "com.trashmapper.app" --web-dir=dist

# Build
npm run build

# Ajouter plateformes
npx cap add ios
npx cap add android

# Sync
npx cap sync

# Ouvrir IDE natifs
npx cap open ios      # Nécessite un Mac
npx cap open android  # Nécessite Android Studio
```

---

## ✅ **CHECKLIST FINALE**

- [ ] Créer les icônes PWA (192x192 et 512x512)
- [ ] Placer les icônes dans `/public/`
- [ ] Tester `npm run build && npm run preview`
- [ ] Vérifier dans Chrome DevTools
- [ ] Déployer sur un domaine HTTPS
- [ ] Tester l'installation sur mobile

---

## 🎯 **RÉSULTAT FINAL**

Votre app **Trash Mapper** sera installable comme une vraie app native :

```
📱 Écran d'accueil iPhone/Android
   ┌──────────────────────┐
   │                      │
   │   [Logo Turquoise]   │
   │    Trash Mapper      │
   │                      │
   └──────────────────────┘
        (Tap pour ouvrir)
```

**Pas besoin d'App Store !** 🎉

Les utilisateurs pourront l'installer directement depuis le navigateur.

---

**Des questions ? Besoin d'aide pour créer les icônes ?** 😊
