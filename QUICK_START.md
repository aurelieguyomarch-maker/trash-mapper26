# ⚡ DÉMARRAGE RAPIDE - TRASH MAPPER

## 🎯 Pour les pressés : Les 5 commandes essentielles

Si vous avez déjà copié tous les fichiers de Figma Make dans un dossier local :

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en local pour tester
npm run dev

# 3. Builder pour la production
npm run build

# 4. Pousser sur GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/trash-mapper.git
git push -u origin main

# 5. Déployer les Edge Functions Supabase
supabase functions deploy make-server-07dde686
```

Ensuite, allez sur **Vercel.com** → Import GitHub → Configurez les variables d'environnement → Deploy !

---

## 📝 Checklist avant le déploiement

### ✅ Configuration Supabase

- [ ] Projet Supabase créé
- [ ] Table `kv_store_07dde686` créée (voir SQL dans DEPLOYMENT_GUIDE.md)
- [ ] Google OAuth configuré (Client ID + Secret)
- [ ] Les 3 clés récupérées :
  - [ ] `Project URL` : `https://________.supabase.co`
  - [ ] `anon key` : `eyJhbGciOiJI...`
  - [ ] `service_role key` : `eyJhbGciOiJI...` (SECRET!)

### ✅ Fichiers locaux

- [ ] `utils/supabase/info.tsx` mis à jour avec VOS clés
- [ ] Tous les fichiers de Figma Make copiés
- [ ] `package.json` complet avec toutes les dépendances
- [ ] `.gitignore` créé (voir ci-dessous)

### ✅ Google Cloud Platform

- [ ] Projet Google Cloud créé
- [ ] Google+ API activée
- [ ] OAuth Client ID créé
- [ ] Redirect URI ajoutée : `https://VOTRE-PROJECT-ID.supabase.co/auth/v1/callback`

### ✅ GitHub

- [ ] Repository créé
- [ ] Code poussé sur `main`

### ✅ Vercel

- [ ] Compte créé
- [ ] Projet importé depuis GitHub
- [ ] Variables d'environnement configurées :
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Déployé avec succès

### ✅ Supabase Functions

- [ ] Supabase CLI installé : `npm install -g supabase`
- [ ] Projet lié : `supabase link --project-ref VOTRE-ID`
- [ ] Function déployée : `supabase functions deploy make-server-07dde686`
- [ ] Health check OK : `curl https://VOTRE-ID.supabase.co/functions/v1/make-server-07dde686/health`

---

## 📋 Fichier `.gitignore` à créer

Créez un fichier `.gitignore` à la racine avec ce contenu :

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build
dist/
build/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.production
.env.development

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Supabase
.supabase/
supabase/config.toml

# Vercel
.vercel/
```

---

## 🔧 Variables d'environnement (Vercel)

Quand vous déployez sur Vercel, ajoutez ces variables :

### Production :
```bash
VITE_SUPABASE_URL=https://VOTRE-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (SECRET!)
```

**⚠️ IMPORTANT :**
- Les variables `VITE_*` sont **publiques** (frontend)
- `SUPABASE_SERVICE_ROLE_KEY` est **privée** (backend seulement)

---

## 🗂️ Liste complète des fichiers à copier

### Fichiers racine :
```
✅ package.json
✅ vite.config.ts
✅ postcss.config.mjs
✅ .gitignore (à créer)
```

### Dossier `src/` :
```
src/
├── app/
│   ├── App.tsx ⭐ (PRINCIPAL)
│   └── components/
│       ├── CategoryFilter.tsx
│       ├── CollectWasteDialog.tsx
│       ├── MapLegend.tsx
│       ├── MapStats.tsx
│       ├── SplashScreen.tsx
│       ├── UserProfileDialog.tsx
│       ├── WasteForm.tsx
│       ├── figma/
│       │   └── ImageWithFallback.tsx
│       └── ui/
│           ├── accordion.tsx
│           ├── alert-dialog.tsx
│           ├── alert.tsx
│           ├── aspect-ratio.tsx
│           ├── avatar.tsx
│           ├── badge.tsx
│           ├── breadcrumb.tsx
│           ├── button.tsx ⭐
│           ├── calendar.tsx
│           ├── card.tsx ⭐
│           ├── carousel.tsx
│           ├── chart.tsx
│           ├── checkbox.tsx
│           ├── collapsible.tsx
│           ├── command.tsx
│           ├── context-menu.tsx
│           ├── dialog.tsx ⭐
│           ├── drawer.tsx
│           ├── dropdown-menu.tsx
│           ├── form.tsx
│           ├── hover-card.tsx
│           ├── input-otp.tsx
│           ├── input.tsx ⭐
│           ├── label.tsx ⭐
│           ├── menubar.tsx
│           ├── navigation-menu.tsx
│           ├── pagination.tsx
│           ├── popover.tsx
│           ├── progress.tsx
│           ├── radio-group.tsx
│           ├── resizable.tsx
│           ├── scroll-area.tsx
│           ├── select.tsx ⭐
│           ├── separator.tsx
│           ├── sheet.tsx
│           ├── sidebar.tsx
│           ├── skeleton.tsx
│           ├── slider.tsx
│           ├── sonner.tsx
│           ├── switch.tsx
│           ├── table.tsx
│           ├── tabs.tsx
│           ├── textarea.tsx ⭐
│           ├── toggle-group.tsx
│           ├── toggle.tsx
│           ├── tooltip.tsx
│           ├── use-mobile.ts
│           └── utils.ts
├── styles/
│   ├── fonts.css
│   ├── index.css ⭐
│   ├── tailwind.css
│   └── theme.css
└── utils/
    └── supabase-client.ts
```

### Dossier `supabase/` :
```
supabase/
└── functions/
    └── server/
        ├── index.tsx ⭐ (SERVEUR BACKEND)
        └── kv_store.tsx ⭐ (PROTECTED - copier tel quel)
```

### Dossier `utils/` :
```
utils/
└── supabase/
    └── info.tsx ⭐ (À MODIFIER avec VOS clés)
```

**⭐ = Fichiers essentiels**

---

## 🚨 Erreurs fréquentes

### 1. "Cannot find module 'leaflet'"
**Solution :** `npm install leaflet react-leaflet @types/leaflet`

### 2. "Provider not enabled" (Google OAuth)
**Solution :** Vérifiez la configuration Google OAuth dans Supabase

### 3. "Unauthorized" lors d'appels API
**Solution :** Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est défini dans Vercel

### 4. "Function not found" 
**Solution :** Déployez les Edge Functions : `supabase functions deploy make-server-07dde686`

### 5. Build échoue sur Vercel avec "Cannot resolve @/..."
**Solution :** Vérifiez que `vite.config.ts` contient l'alias `@`

### 6. Photos ne s'uploadent pas
**Solution :** Vérifiez que le bucket Supabase est créé (voir logs Edge Functions)

### 7. Géolocalisation ne fonctionne pas en production
**Solution :** Vérifiez que votre site est en HTTPS (Vercel le fait automatiquement)

---

## 🎬 Vidéo de démarrage (TODO si vous voulez créer une vidéo)

1. **0:00 - 1:00** : Créer le projet Supabase
2. **1:00 - 2:00** : Configurer Google OAuth
3. **2:00 - 3:00** : Copier les fichiers depuis Figma Make
4. **3:00 - 4:00** : Installer et tester localement
5. **4:00 - 5:00** : Déployer sur Vercel
6. **5:00 - 6:00** : Déployer les Edge Functions
7. **6:00 - 7:00** : Tester sur iPhone

---

## 📞 Besoin d'aide ?

### Documentation officielle :
- **Supabase** : https://supabase.com/docs
- **Vercel** : https://vercel.com/docs
- **Leaflet** : https://leafletjs.com/reference.html
- **React Leaflet** : https://react-leaflet.js.org

### Commandes utiles :

```bash
# Voir les logs du serveur de dev
npm run dev

# Builder en production localement
npm run build

# Prévisualiser le build de production
npm run preview

# Voir les logs des Edge Functions
supabase functions logs make-server-07dde686

# Lister toutes les functions déployées
supabase functions list

# Supprimer une function
supabase functions delete make-server-07dde686

# Redéployer après modifications
supabase functions deploy make-server-07dde686
```

### Debugging :

```bash
# Console navigateur (F12)
- Onglet "Console" : erreurs JavaScript
- Onglet "Network" : requêtes API qui échouent
- Onglet "Application" : cookies, localStorage

# Vercel logs
vercel logs YOUR-DEPLOYMENT-URL

# Supabase logs
supabase functions logs make-server-07dde686 --follow
```

---

## 🎉 C'est parti !

Suivez le **DEPLOYMENT_GUIDE.md** pour les instructions détaillées, ou utilisez ce Quick Start si vous savez déjà ce que vous faites.

**Temps estimé :**
- ⚡ Mode rapide (si tout est prêt) : **15 minutes**
- 📚 Mode complet (première fois) : **1-2 heures**

**Bon déploiement ! 🚀**
