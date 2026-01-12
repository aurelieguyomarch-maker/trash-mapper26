# 🛠️ COMMANDES UTILES - TRASH MAPPER

## 📦 NPM Scripts

### Développement
```bash
# Lancer le serveur de développement (http://localhost:5173)
npm run dev

# Lancer avec un port spécifique
npm run dev -- --port 3000

# Lancer avec le host exposé (pour tester sur mobile en local)
npm run dev -- --host
```

### Build
```bash
# Builder pour la production
npm run build

# Prévisualiser le build de production localement
npm run preview

# Builder avec analyse du bundle
npm run build -- --mode production
```

### Qualité du code
```bash
# Vérifier la syntaxe TypeScript (si configuré)
npx tsc --noEmit

# Formater le code avec Prettier (si configuré)
npx prettier --write .

# Linter avec ESLint (si configuré)
npx eslint . --ext .ts,.tsx
```

---

## 🔧 Supabase CLI

### Installation
```bash
# Installer Supabase CLI globalement
npm install -g supabase

# Vérifier l'installation
supabase --version
```

### Authentification
```bash
# Se connecter à Supabase
supabase login

# Se déconnecter
supabase logout
```

### Gestion du projet
```bash
# Lier le projet local à un projet Supabase
supabase link --project-ref VOTRE-PROJECT-ID

# Voir les détails du projet lié
supabase projects list

# Délier le projet
supabase unlink
```

### Edge Functions
```bash
# Lister toutes les functions
supabase functions list

# Déployer une function
supabase functions deploy make-server-07dde686

# Déployer avec vérification
supabase functions deploy make-server-07dde686 --verify-jwt false

# Voir les logs en temps réel
supabase functions logs make-server-07dde686 --follow

# Voir les derniers logs
supabase functions logs make-server-07dde686 --limit 100

# Supprimer une function
supabase functions delete make-server-07dde686

# Tester une function localement
supabase functions serve make-server-07dde686
```

### Base de données
```bash
# Voir les tables
supabase db remote --project-ref VOTRE-PROJECT-ID list

# Exécuter une requête SQL
supabase db query "SELECT * FROM kv_store_07dde686 LIMIT 10"

# Générer des migrations
supabase db diff

# Appliquer les migrations
supabase db push
```

### Storage
```bash
# Lister les buckets
supabase storage list

# Créer un bucket
supabase storage create make-07dde686-waste-photos

# Voir les fichiers d'un bucket
supabase storage list make-07dde686-waste-photos
```

---

## 📡 Git & GitHub

### Configuration initiale
```bash
# Initialiser Git
git init

# Configurer l'utilisateur
git config user.name "Votre Nom"
git config user.email "votre@email.com"

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE-USERNAME/trash-mapper.git

# Vérifier le remote
git remote -v
```

### Workflow quotidien
```bash
# Voir l'état des fichiers
git status

# Ajouter tous les fichiers modifiés
git add .

# Ajouter un fichier spécifique
git add src/app/App.tsx

# Committer avec un message
git commit -m "feat: ajout de la fonctionnalité X"

# Pousser vers GitHub
git push

# Pousser la première fois
git push -u origin main

# Récupérer les dernières modifications
git pull

# Voir l'historique
git log --oneline --graph
```

### Branches
```bash
# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Changer de branche
git checkout main

# Voir toutes les branches
git branch -a

# Fusionner une branche dans main
git checkout main
git merge feature/nouvelle-fonctionnalite

# Supprimer une branche
git branch -d feature/nouvelle-fonctionnalite
```

### Annuler des changements
```bash
# Annuler les modifications d'un fichier
git checkout -- src/app/App.tsx

# Annuler tous les changements non commités
git reset --hard

# Annuler le dernier commit (garder les changements)
git reset --soft HEAD~1

# Annuler le dernier commit (supprimer les changements)
git reset --hard HEAD~1

# Revenir à un commit spécifique
git reset --hard COMMIT-HASH
```

---

## 🚀 Vercel CLI

### Installation
```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Vérifier l'installation
vercel --version
```

### Déploiement
```bash
# Se connecter à Vercel
vercel login

# Déployer en preview
vercel

# Déployer en production
vercel --prod

# Voir les détails du déploiement
vercel inspect

# Lister tous les déploiements
vercel list

# Voir les logs
vercel logs YOUR-DEPLOYMENT-URL

# Supprimer un déploiement
vercel remove YOUR-DEPLOYMENT-NAME
```

### Variables d'environnement
```bash
# Ajouter une variable d'environnement
vercel env add VITE_SUPABASE_URL

# Lister les variables
vercel env ls

# Supprimer une variable
vercel env rm VITE_SUPABASE_URL

# Récupérer les variables localement
vercel env pull
```

### Domaines
```bash
# Ajouter un domaine
vercel domains add votredomaine.com

# Lister les domaines
vercel domains ls

# Supprimer un domaine
vercel domains rm votredomaine.com
```

---

## 🧪 Tests & Debugging

### Tester localement
```bash
# Tester sur mobile en local (même réseau WiFi)
# 1. Lancer avec --host
npm run dev -- --host

# 2. Récupérer l'IP locale
# Linux/Mac:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows:
ipconfig

# 3. Ouvrir sur mobile: http://VOTRE-IP:5173
```

### Debugging
```bash
# Console navigateur (F12)
# - Console: erreurs JavaScript
# - Network: requêtes API
# - Application: localStorage, cookies

# Voir les variables d'environnement en dev
echo $VITE_SUPABASE_URL

# Vérifier que le serveur Supabase répond
curl https://VOTRE-PROJECT-ID.supabase.co/functions/v1/make-server-07dde686/health

# Tester une requête POST
curl -X POST https://VOTRE-PROJECT-ID.supabase.co/functions/v1/make-server-07dde686/wastes/nearby \
  -H "Authorization: Bearer VOTRE-ANON-KEY" \
  -H "Content-Type: application/json" \
  -d '{"lat": 48.8566, "lng": 2.3522, "radius": 5}'
```

---

## 📦 Gestion des dépendances

### Installer
```bash
# Installer toutes les dépendances
npm install

# Installer une nouvelle dépendance
npm install nom-du-package

# Installer une dépendance de dev
npm install --save-dev nom-du-package

# Installer une version spécifique
npm install nom-du-package@1.2.3
```

### Mettre à jour
```bash
# Voir les packages obsolètes
npm outdated

# Mettre à jour tous les packages (minor/patch)
npm update

# Mettre à jour un package spécifique
npm update nom-du-package

# Mettre à jour vers la dernière version majeure
npm install nom-du-package@latest
```

### Nettoyer
```bash
# Supprimer node_modules
rm -rf node_modules

# Nettoyer le cache npm
npm cache clean --force

# Réinstaller proprement
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Diagnostic rapide

### Problème : Build échoue
```bash
# 1. Nettoyer et réinstaller
rm -rf node_modules package-lock.json dist
npm install

# 2. Vérifier les erreurs TypeScript
npx tsc --noEmit

# 3. Builder en mode verbose
npm run build -- --debug
```

### Problème : Supabase ne répond pas
```bash
# 1. Tester la connexion
curl https://VOTRE-PROJECT-ID.supabase.co/rest/v1/

# 2. Vérifier les logs
supabase functions logs make-server-07dde686 --limit 50

# 3. Redéployer la function
supabase functions deploy make-server-07dde686
```

### Problème : Vercel ne déploie pas
```bash
# 1. Vérifier les logs
vercel logs

# 2. Redéployer manuellement
vercel --prod --force

# 3. Vérifier les variables d'environnement
vercel env ls
```

---

## 💡 Astuces

### Alias utiles (ajoutez à ~/.bashrc ou ~/.zshrc)
```bash
# Développement
alias dev="npm run dev"
alias build="npm run build"
alias preview="npm run preview"

# Git
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline --graph"

# Supabase
alias sbl="supabase functions logs make-server-07dde686 --follow"
alias sbd="supabase functions deploy make-server-07dde686"

# Vercel
alias vd="vercel --prod"
alias vl="vercel logs"
```

### Scripts package.json utiles à ajouter
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && vercel --prod",
    "deploy:functions": "supabase functions deploy make-server-07dde686",
    "logs": "supabase functions logs make-server-07dde686 --follow",
    "test:health": "curl https://VOTRE-ID.supabase.co/functions/v1/make-server-07dde686/health"
  }
}
```

---

## 📞 Support

Si une commande ne fonctionne pas :
1. Vérifiez que vous êtes dans le bon dossier
2. Vérifiez que les packages sont installés (`npm install`)
3. Vérifiez que vous êtes connecté (Supabase/Vercel)
4. Consultez les logs d'erreur
5. Cherchez l'erreur sur Google/Stack Overflow

**Bon développement ! 💻✨**
