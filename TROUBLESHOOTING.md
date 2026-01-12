# 🔧 DÉPANNAGE - TRASH MAPPER

## 🚨 Problèmes fréquents et solutions

---

## 📱 PROBLÈMES DE GÉOLOCALISATION

### ❌ "Géolocalisation non disponible" sur iPhone

**Causes possibles :**
1. L'app tourne dans un iframe (Figma Make)
2. Pas de HTTPS
3. Permissions Safari désactivées
4. Mode navigation privée

**Solutions :**

✅ **Solution 1 : Déployer en production (RECOMMANDÉ)**
```
1. Déployez l'app sur Vercel (HTTPS automatique)
2. Accédez via https://votre-app.vercel.app
3. La géolocalisation fonctionnera parfaitement !
```

✅ **Solution 2 : Vérifier les permissions iOS**
```
iPhone → Réglages → Safari → Confidentialité
- Désactiver "Empêcher le suivi intersite"
- Activer "Services de localisation"
```

✅ **Solution 3 : Tester dans Safari normal (pas privé)**
```
Le mode navigation privée bloque souvent la géolocalisation
```

✅ **Solution 4 : Utiliser la position par défaut**
```
L'app utilise Paris par défaut si GPS non disponible
C'est normal en développement !
```

### ❌ "Position indisponible" sur Android

**Solutions :**
```
Android → Paramètres → Applications → Navigateur
- Autoriser "Localisation"
- Vérifier que le GPS est activé
```

---

## 🔐 PROBLÈMES D'AUTHENTIFICATION

### ❌ "Provider not enabled" (Google OAuth)

**Erreur :** "Google provider is not enabled"

**Cause :** Google OAuth n'est pas configuré dans Supabase

**Solution :**
```
1. Supabase Dashboard → Authentication → Providers
2. Activez "Google"
3. Suivez : https://supabase.com/docs/guides/auth/social-login/auth-google
4. Configurez Client ID et Client Secret
5. Ajoutez les Redirect URIs dans Google Cloud Console
```

### ❌ "Redirect URI mismatch"

**Erreur :** "Error 400: redirect_uri_mismatch"

**Cause :** L'URL de callback n'est pas autorisée dans Google Cloud

**Solution :**
```
Google Cloud Console → APIs & Services → Credentials
→ Edit OAuth Client ID
→ Authorized redirect URIs → Add:

https://VOTRE-PROJECT-ID.supabase.co/auth/v1/callback
https://votre-app.vercel.app
```

### ❌ "Invalid login credentials"

**Erreur :** Lors de la connexion email/password

**Solutions :**
```
1. Vérifiez que l'utilisateur existe (créez-le avec "Créer un compte")
2. Vérifiez le mot de passe (min 6 caractères requis par Supabase)
3. Vérifiez que l'email est confirmé (auto-confirmé dans signup)
```

### ❌ "Session expired" / "Unauthorized"

**Erreur :** L'utilisateur est déconnecté automatiquement

**Solutions :**
```
1. Vérifiez que les clés Supabase sont correctes dans utils/supabase/info.tsx
2. Vérifiez que SUPABASE_ANON_KEY n'a pas expiré
3. Reconnectez-vous
```

---

## 🗺️ PROBLÈMES DE CARTE

### ❌ La carte ne s'affiche pas (écran gris)

**Causes possibles :**
1. Leaflet CSS non chargé
2. Conteneur sans hauteur
3. Erreur d'initialisation

**Solutions :**

✅ **Solution 1 : Vérifier la console**
```
Appuyez sur F12 → Console
Cherchez des erreurs Leaflet
```

✅ **Solution 2 : Vérifier le CSS**
```
src/styles/index.css doit importer leaflet/dist/leaflet.css
OU le CSS Leaflet doit être inline (déjà fait dans l'app)
```

✅ **Solution 3 : Vérifier la hauteur du conteneur**
```css
/* Le conteneur doit avoir une hauteur définie */
.map-container {
  height: 100vh; /* ou une valeur fixe */
}
```

✅ **Solution 4 : Réinitialiser la carte**
```
1. Déconnectez-vous
2. Videz le cache du navigateur (Ctrl+Shift+Del)
3. Reconnectez-vous
```

### ❌ Marqueurs de déchets ne s'affichent pas

**Causes :**
1. Pas de déchets dans la base de données
2. Filtres trop restrictifs
3. Erreur backend

**Solutions :**

✅ **Solution 1 : Vérifier la base de données**
```bash
# Vérifier les déchets
supabase db query "SELECT * FROM kv_store_07dde686 WHERE key LIKE 'wastes:%'"
```

✅ **Solution 2 : Déclarer un déchet test**
```
1. Cliquez sur "Déclarer un déchet"
2. Prenez une photo
3. Remplissez le formulaire
4. Le marqueur devrait apparaître
```

✅ **Solution 3 : Désactiver les filtres**
```
Cliquez sur "Tous" dans le filtre de catégories
Activez "Afficher les déchets ramassés"
```

✅ **Solution 4 : Vérifier les logs backend**
```bash
supabase functions logs make-server-07dde686 --follow
```

### ❌ "Cannot read property 'lat' of undefined"

**Erreur :** Erreur JavaScript sur la carte

**Solution :**
```
Cela signifie que la position n'est pas encore disponible.
L'app gère normalement ce cas, mais si le problème persiste :

1. Attendez quelques secondes que la géolocalisation se charge
2. Rechargez la page
3. Utilisez le mode démo pour tester
```

---

## 📸 PROBLÈMES DE PHOTOS

### ❌ "Failed to upload photo"

**Erreur :** Lors de l'upload d'une photo

**Causes :**
1. Bucket Supabase non créé
2. Permissions insuffisantes
3. Photo trop volumineuse

**Solutions :**

✅ **Solution 1 : Vérifier le bucket**
```bash
# Lister les buckets
supabase storage list

# Si le bucket n'existe pas, il sera créé automatiquement
# par le serveur Edge Function au démarrage
```

✅ **Solution 2 : Vérifier les permissions**
```sql
-- Dans Supabase SQL Editor
SELECT * FROM storage.buckets WHERE name = 'make-07dde686-waste-photos';

-- Le bucket doit être privé (public = false)
```

✅ **Solution 3 : Réduire la taille de la photo**
```
La photo est automatiquement compressée en JPEG.
Si le problème persiste, vérifiez les logs :

supabase functions logs make-server-07dde686
```

✅ **Solution 4 : Vérifier SUPABASE_SERVICE_ROLE_KEY**
```
Dans Vercel → Settings → Environment Variables
Vérifiez que SUPABASE_SERVICE_ROLE_KEY est définie
```

### ❌ La caméra ne s'ouvre pas

**Causes :**
1. Permissions caméra refusées
2. Pas de HTTPS
3. Navigateur non compatible

**Solutions :**

✅ **Solution 1 : Autoriser la caméra**
```
Navigateur → Paramètres → Autorisations → Caméra
Autorisez votre site
```

✅ **Solution 2 : HTTPS requis**
```
La caméra ne fonctionne qu'en HTTPS en production
En local, http://localhost est autorisé
```

✅ **Solution 3 : Tester dans un autre navigateur**
```
Chrome, Safari et Firefox supportent l'API caméra
Les navigateurs anciens peuvent ne pas la supporter
```

---

## 🔄 PROBLÈMES BACKEND

### ❌ "Error loading wastes" / "Network error"

**Erreur :** Les déchets ne se chargent pas

**Solutions :**

✅ **Solution 1 : Vérifier que les Edge Functions sont déployées**
```bash
# Lister les functions
supabase functions list

# Si make-server-07dde686 n'est pas listée :
supabase functions deploy make-server-07dde686
```

✅ **Solution 2 : Tester le health check**
```bash
curl https://VOTRE-PROJECT-ID.supabase.co/functions/v1/make-server-07dde686/health

# Devrait retourner : {"status":"ok"}
```

✅ **Solution 3 : Vérifier les logs**
```bash
supabase functions logs make-server-07dde686 --limit 50

# Cherchez des erreurs
```

✅ **Solution 4 : Vérifier les variables d'environnement**
```
Dans Vercel Dashboard :
- VITE_SUPABASE_URL doit pointer vers votre projet
- VITE_SUPABASE_ANON_KEY doit être valide
```

### ❌ "CORS error" lors des appels API

**Erreur :** "Access to fetch blocked by CORS policy"

**Cause :** Le serveur backend ne retourne pas les headers CORS corrects

**Solution :**
```
Le serveur Hono a déjà les headers CORS configurés.
Si le problème persiste :

1. Vérifiez que le serveur est bien déployé
2. Vérifiez les logs : supabase functions logs make-server-07dde686
3. Redéployez : supabase functions deploy make-server-07dde686
```

### ❌ "Failed to create waste"

**Erreur :** Lors de la déclaration d'un déchet

**Solutions :**

✅ **Solution 1 : Vérifier la table KV**
```sql
-- Supabase SQL Editor
SELECT * FROM kv_store_07dde686 LIMIT 10;

-- Si la table n'existe pas :
-- Voir DEPLOYMENT_GUIDE.md section "Créer la table KV"
```

✅ **Solution 2 : Vérifier les permissions**
```sql
-- Vérifier les policies RLS
SELECT * FROM pg_policies WHERE tablename = 'kv_store_07dde686';
```

✅ **Solution 3 : Vérifier la photo**
```
La photo est obligatoire pour la déclaration.
Assurez-vous d'avoir pris une photo avant de soumettre.
```

---

## 🏗️ PROBLÈMES DE BUILD

### ❌ Build échoue sur Vercel

**Erreur :** "Build failed"

**Solutions :**

✅ **Solution 1 : Vérifier les logs Vercel**
```
Vercel Dashboard → Deployments → View Logs
Cherchez l'erreur exacte
```

✅ **Solution 2 : Vérifier package.json**
```json
{
  "scripts": {
    "build": "vite build"  // Doit être présent
  }
}
```

✅ **Solution 3 : Builder localement**
```bash
npm run build

# Si ça échoue localement, corrigez les erreurs
# Puis re-commitez et poussez
```

✅ **Solution 4 : Vérifier les variables d'environnement**
```
Vercel → Settings → Environment Variables
Vérifiez que toutes les variables VITE_* sont définies
```

### ❌ "Cannot find module '@/...'"

**Erreur :** Imports avec @ ne fonctionnent pas

**Solution :**
```typescript
// Vérifier vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### ❌ "Module not found: Can't resolve 'leaflet'"

**Erreur :** Leaflet non trouvé

**Solutions :**
```bash
# Réinstaller les dépendances
npm install leaflet react-leaflet @types/leaflet

# Vérifier package.json
grep "leaflet" package.json

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

---

## 🎮 MODE DÉMO

### ❌ Le mode démo ne fonctionne pas

**Problème :** Cliquer sur "Mode Démo" ne fait rien

**Solutions :**

✅ **Solution 1 : Vérifier la console**
```
F12 → Console
Cherchez des erreurs JavaScript
```

✅ **Solution 2 : Vider le cache**
```
Ctrl+Shift+Del → Vider le cache et les cookies
Rechargez la page
```

✅ **Solution 3 : Tester dans un autre navigateur**

### ❌ Les déchets démo ne s'affichent pas

**Problème :** La carte est vide en mode démo

**Solution :**
```
C'est normal ! Les déchets démo sont près de Paris (Tour Eiffel, Louvre).
Zoomez sur Paris pour les voir.

Ou centrez automatiquement :
1. Cliquez sur le bouton "📍 Ma position"
2. La carte se centrera sur Paris par défaut
```

---

## 🔧 OUTILS DE DIAGNOSTIC

### Vérifier la configuration complète

```bash
# 1. Vérifier Node.js
node --version  # Devrait être v18+

# 2. Vérifier npm
npm --version

# 3. Vérifier Supabase CLI
supabase --version

# 4. Vérifier Vercel CLI (optionnel)
vercel --version

# 5. Tester la connexion Supabase
curl https://VOTRE-PROJECT-ID.supabase.co/rest/v1/

# 6. Tester le backend
curl https://VOTRE-PROJECT-ID.supabase.co/functions/v1/make-server-07dde686/health

# 7. Voir les tables
supabase db query "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
```

### Logs à vérifier

```bash
# Console navigateur (F12)
# - Erreurs JavaScript rouges
# - Erreurs réseau (onglet Network)
# - Warnings jaunes

# Logs Supabase Edge Functions
supabase functions logs make-server-07dde686 --follow

# Logs Vercel
vercel logs VOTRE-DEPLOYMENT-URL

# Logs npm
npm run dev  # Regardez les erreurs
```

### Nettoyer complètement

```bash
# Si tout est cassé, repartir de zéro :

# 1. Nettoyer Node
rm -rf node_modules package-lock.json dist

# 2. Réinstaller
npm install

# 3. Vérifier les variables d'environnement
cat utils/supabase/info.tsx

# 4. Builder
npm run build

# 5. Tester localement
npm run dev

# 6. Si ça marche en local, redéployer
git add .
git commit -m "fix: clean reinstall"
git push
```

---

## 🆘 DERNIER RECOURS

### Rien ne fonctionne ?

1. **Vérifier DEPLOYMENT_GUIDE.md** - Vous avez peut-être sauté une étape
2. **Vérifier les logs** - Console + Supabase + Vercel
3. **Tester en local** - Si ça marche en local, le problème est le déploiement
4. **Comparer avec le code original** - Vérifiez que vous n'avez rien cassé
5. **Recréer le projet Supabase** - En dernier recours
6. **Demander de l'aide** - Ouvrez une issue sur GitHub

### Checklist finale

- [ ] Node.js 18+ installé
- [ ] npm install exécuté
- [ ] Clés Supabase correctes dans utils/supabase/info.tsx
- [ ] Table kv_store_07dde686 créée
- [ ] Google OAuth configuré (si utilisé)
- [ ] Edge Functions déployées
- [ ] Variables d'environnement Vercel configurées
- [ ] Site en HTTPS (Vercel)
- [ ] Pas d'erreurs dans la console

---

## 📞 Support

**Documentation officielle :**
- Supabase : https://supabase.com/docs
- Vercel : https://vercel.com/docs
- Leaflet : https://leafletjs.com/reference.html

**Communauté :**
- Supabase Discord : https://discord.supabase.com
- Stack Overflow : Tag [supabase] ou [leaflet]

**Ce projet :**
- Issues GitHub : https://github.com/VOTRE-USERNAME/trash-mapper/issues

---

**Bon courage ! 💪 Vous allez y arriver ! 🎉**
