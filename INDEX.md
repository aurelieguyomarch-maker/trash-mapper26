# 📚 INDEX DE LA DOCUMENTATION - TRASH MAPPER

## 🌟 Bienvenue dans Trash Mapper !

Voici un guide complet pour naviguer dans la documentation et déployer votre application.

---

## 🚀 PAR OÙ COMMENCER ?

### 🎯 Vous êtes pressé ?
👉 **[QUICK_START.md](./QUICK_START.md)** - Démarrage en 15 minutes

### 📖 Vous voulez un guide détaillé ?
👉 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Guide complet étape par étape (1-2h)

### 📥 Vous devez copier les fichiers de Figma Make ?
👉 **[FILES_TO_COPY.md](./FILES_TO_COPY.md)** - Liste exhaustive des fichiers à copier

---

## 📂 STRUCTURE DE LA DOCUMENTATION

### 🎓 Guides principaux

| Fichier | Description | Temps estimé | Pour qui ? |
|---------|-------------|--------------|------------|
| [README.md](./README.md) | Présentation du projet | 5 min | Tout le monde |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Guide de déploiement complet | 1-2h | Débutants |
| [QUICK_START.md](./QUICK_START.md) | Démarrage rapide | 15 min | Experts |
| [FILES_TO_COPY.md](./FILES_TO_COPY.md) | Liste des fichiers à copier | - | Tout le monde |

### 🔧 Références techniques

| Fichier | Description | Quand l'utiliser ? |
|---------|-------------|-------------------|
| [COMMANDS.md](./COMMANDS.md) | Toutes les commandes utiles | Quotidiennement |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Solutions aux problèmes | En cas de bug |
| [.env.example](./.env.example) | Variables d'environnement | Configuration |

### 📜 Fichiers légaux

| Fichier | Description |
|---------|-------------|
| [LICENSE](./LICENSE) | Licence MIT |

### 🛠️ Scripts utiles

| Fichier | Description | Comment l'utiliser |
|---------|-------------|-------------------|
| [check-files.sh](./check-files.sh) | Vérifier les fichiers | `bash check-files.sh` |

---

## 🗺️ PARCOURS DE DÉPLOIEMENT

### Étape 1 : Préparer l'environnement
- [ ] Installer Node.js, Git
- [ ] Créer un compte Supabase
- [ ] Créer un compte Vercel (optionnel mais recommandé)
- [ ] Créer un compte GitHub

**📖 Voir :** [DEPLOYMENT_GUIDE.md - Prérequis](./DEPLOYMENT_GUIDE.md#prérequis)

---

### Étape 2 : Copier les fichiers
- [ ] Créer un dossier local
- [ ] Copier tous les fichiers de Figma Make
- [ ] Vérifier avec le script check-files.sh

**📖 Voir :** [FILES_TO_COPY.md](./FILES_TO_COPY.md)

---

### Étape 3 : Configurer Supabase
- [ ] Créer un projet Supabase
- [ ] Créer la table KV avec SQL
- [ ] Configurer Google OAuth
- [ ] Récupérer les clés API

**📖 Voir :** [DEPLOYMENT_GUIDE.md - Configurer Supabase](./DEPLOYMENT_GUIDE.md#étape-2--configurer-supabase)

---

### Étape 4 : Mettre à jour les clés
- [ ] Modifier `utils/supabase/info.tsx`
- [ ] Créer `.env.local` (optionnel)

**📖 Voir :** [.env.example](./.env.example)

---

### Étape 5 : Tester localement
- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Tester l'application en mode démo

**📖 Voir :** [COMMANDS.md - Développement](./COMMANDS.md#développement)

---

### Étape 6 : Déployer sur GitHub
- [ ] Créer un repository
- [ ] Pousser le code

**📖 Voir :** [COMMANDS.md - Git & GitHub](./COMMANDS.md#git--github)

---

### Étape 7 : Déployer sur Vercel
- [ ] Importer depuis GitHub
- [ ] Configurer les variables d'environnement
- [ ] Déployer !

**📖 Voir :** [DEPLOYMENT_GUIDE.md - Déployer sur Vercel](./DEPLOYMENT_GUIDE.md#étape-4--déployer-sur-vercel)

---

### Étape 8 : Déployer le backend
- [ ] Installer Supabase CLI
- [ ] Lier le projet
- [ ] Déployer les Edge Functions

**📖 Voir :** [COMMANDS.md - Supabase CLI](./COMMANDS.md#supabase-cli)

---

### Étape 9 : Tester en production
- [ ] Ouvrir l'URL Vercel
- [ ] Tester sur iPhone
- [ ] Vérifier la géolocalisation

**📖 Voir :** [DEPLOYMENT_GUIDE.md - Tester sur iPhone](./DEPLOYMENT_GUIDE.md#étape-5--tester-sur-iphone)

---

## 🐛 EN CAS DE PROBLÈME

### Problème rencontré ?

1. **Consultez d'abord :** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. **Vérifiez les logs :**
   - Console navigateur (F12)
   - Logs Supabase : `supabase functions logs make-server-07dde686`
   - Logs Vercel : Dashboard → Deployments
3. **Commandes utiles :** [COMMANDS.md](./COMMANDS.md)

### Problèmes courants

| Problème | Solution rapide | Voir |
|----------|-----------------|------|
| Géolocalisation ne marche pas | Déployer en HTTPS (Vercel) | [TROUBLESHOOTING - Géolocalisation](./TROUBLESHOOTING.md#problèmes-de-géolocalisation) |
| "Provider not enabled" | Configurer Google OAuth | [TROUBLESHOOTING - Auth](./TROUBLESHOOTING.md#problèmes-dauthentification) |
| Carte grise | Vérifier Leaflet CSS | [TROUBLESHOOTING - Carte](./TROUBLESHOOTING.md#problèmes-de-carte) |
| Photos ne s'uploadent pas | Vérifier bucket Supabase | [TROUBLESHOOTING - Photos](./TROUBLESHOOTING.md#problèmes-de-photos) |
| Build échoue | Vérifier package.json | [TROUBLESHOOTING - Build](./TROUBLESHOOTING.md#problèmes-de-build) |

---

## 📋 RÉFÉRENCE RAPIDE

### Commandes essentielles

```bash
# Développement
npm install          # Installer les dépendances
npm run dev          # Lancer en local
npm run build        # Builder pour production

# Supabase
supabase login       # Se connecter
supabase link --project-ref VOTRE-ID
supabase functions deploy make-server-07dde686
supabase functions logs make-server-07dde686 --follow

# Git
git add .
git commit -m "message"
git push

# Vercel
vercel               # Déployer en preview
vercel --prod        # Déployer en production
```

**📖 Voir :** [COMMANDS.md](./COMMANDS.md) pour toutes les commandes

---

### Variables d'environnement

```bash
# Frontend (public)
VITE_SUPABASE_URL=https://VOTRE-ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Backend (secret)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

**📖 Voir :** [.env.example](./.env.example) pour le détail

---

### Structure du projet

```
trash-mapper/
├── src/app/App.tsx              # Composant principal
├── src/app/components/          # Composants React
├── src/styles/                  # CSS (Tailwind v4)
├── supabase/functions/server/   # Backend (Hono)
├── utils/supabase/info.tsx      # Config Supabase
└── package.json                 # Dépendances
```

**📖 Voir :** [FILES_TO_COPY.md](./FILES_TO_COPY.md) pour la liste complète

---

## 🎓 TUTORIELS PAR THÈME

### 🔐 Authentification
- [Configurer Google OAuth](./DEPLOYMENT_GUIDE.md#d-configurer-lauthentification-google-important-pour-oauth)
- [Problèmes d'auth](./TROUBLESHOOTING.md#problèmes-dauthentification)

### 🗺️ Cartographie
- [Leaflet dans l'app](./README.md#-architecture)
- [Problèmes de carte](./TROUBLESHOOTING.md#problèmes-de-carte)

### 📸 Upload de photos
- [Configurer Storage](./DEPLOYMENT_GUIDE.md#e-mettre-à-jour-les-clés-dans-votre-code)
- [Problèmes de photos](./TROUBLESHOOTING.md#problèmes-de-photos)

### 🏗️ Backend
- [Architecture backend](./README.md#-architecture)
- [Déployer les Edge Functions](./DEPLOYMENT_GUIDE.md#d-déployer-les-supabase-edge-functions-backend)
- [Problèmes backend](./TROUBLESHOOTING.md#problèmes-backend)

### 🚀 Déploiement
- [Vercel](./DEPLOYMENT_GUIDE.md#c-déployer-sur-vercel)
- [Alternatives](./DEPLOYMENT_GUIDE.md#alternatives-à-vercel)

---

## 🔎 RECHERCHE PAR MOT-CLÉ

| Recherchez | Trouvez dans |
|------------|--------------|
| npm, install, dépendances | [COMMANDS.md](./COMMANDS.md) |
| Supabase, backend, API | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| Vercel, déploiement, production | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| Erreur, bug, problème | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Git, GitHub, commit, push | [COMMANDS.md](./COMMANDS.md) |
| Géolocalisation, GPS, carte | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Photo, upload, storage | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Google OAuth, login | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| Variables environnement, .env | [.env.example](./.env.example) |
| Fichiers à copier | [FILES_TO_COPY.md](./FILES_TO_COPY.md) |

---

## 💡 ASTUCES

### Pour gagner du temps
- ⚡ Utilisez [QUICK_START.md](./QUICK_START.md) si vous êtes à l'aise
- 🔍 Cherchez dans [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) avant de débugger
- 📋 Utilisez les checklists dans [QUICK_START.md](./QUICK_START.md)
- 🛠️ Testez d'abord en mode démo

### Pour ne rien oublier
- ✅ Suivez les étapes de [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) dans l'ordre
- ✅ Utilisez [check-files.sh](./check-files.sh) après la copie
- ✅ Commitez régulièrement votre progression

### Pour débugger efficacement
- 🔍 Console navigateur (F12) en premier
- 📝 Logs Supabase : `supabase functions logs --follow`
- 🌐 Logs Vercel : Dashboard → Deployments
- 📚 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) pour les solutions

---

## 🏆 OBJECTIFS

### Court terme (Aujourd'hui)
- [ ] Copier tous les fichiers
- [ ] Configurer Supabase
- [ ] Tester en local

### Moyen terme (Cette semaine)
- [ ] Déployer sur Vercel
- [ ] Configurer Google OAuth
- [ ] Tester sur iPhone

### Long terme (Ce mois)
- [ ] Personnaliser l'app
- [ ] Ajouter des fonctionnalités
- [ ] Partager avec des amis !

---

## 📞 SUPPORT

### Documentation officielle
- **Supabase** : https://supabase.com/docs
- **Vercel** : https://vercel.com/docs
- **Leaflet** : https://leafletjs.com
- **React** : https://react.dev

### Communauté
- **Supabase Discord** : https://discord.supabase.com
- **Stack Overflow** : Tags [supabase], [leaflet], [react]

### Ce projet
- **Issues GitHub** : Ouvrez une issue si vous bloquez
- **Contributeurs** : Consultez [README.md](./README.md#contribution)

---

## 🎉 FÉLICITATIONS !

Si vous lisez ceci, c'est que vous êtes motivé ! 💪

**Trash Mapper** n'est pas juste une application, c'est un mouvement pour rendre notre planète plus propre. Chaque ligne de code que vous écrivez contribue à cet objectif.

**Prêt à commencer ?**

👉 **Suivant :** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)  
ou  
👉 **Mode rapide :** [QUICK_START.md](./QUICK_START.md)

**Let's clean the planet together ! 🌍♻️✨**

---

<p align="center">
  <strong>Made with 💚 for our planet</strong>
</p>
