# 📥 LISTE DES FICHIERS À COPIER DEPUIS FIGMA MAKE

## 🎯 Instructions

Pour chaque fichier listé ci-dessous :
1. Ouvrez le fichier dans l'éditeur Figma Make
2. Sélectionnez tout le contenu (Ctrl+A)
3. Copiez (Ctrl+C)
4. Créez le même fichier localement avec la même structure
5. Collez le contenu (Ctrl+V)
6. Sauvegardez

---

## 📁 FICHIERS RACINE (4 fichiers)

### ✅ package.json
```
Chemin : /package.json
Importance : 🔴 CRITIQUE
Description : Liste toutes les dépendances du projet
```

### ✅ vite.config.ts
```
Chemin : /vite.config.ts
Importance : 🔴 CRITIQUE
Description : Configuration de Vite (build tool)
```

### ✅ postcss.config.mjs
```
Chemin : /postcss.config.mjs
Importance : 🟡 IMPORTANT
Description : Configuration PostCSS (peut être vide)
```

### ⚠️ .gitignore (À CRÉER)
```
Chemin : /.gitignore
Importance : 🔴 CRITIQUE
Description : Fichiers à ignorer par Git
Contenu fourni dans : QUICK_START.md
```

---

## 📱 APPLICATION PRINCIPALE (1 fichier)

### ✅ App.tsx
```
Chemin : /src/app/App.tsx
Importance : 🔴 CRITIQUE
Description : Composant principal de l'application
Taille : ~800 lignes
```

---

## 🧩 COMPOSANTS CUSTOM (7 fichiers)

### ✅ CategoryFilter.tsx
```
Chemin : /src/app/components/CategoryFilter.tsx
Importance : 🟢 MOYEN
Description : Filtre de catégories de déchets
```

### ✅ CollectWasteDialog.tsx
```
Chemin : /src/app/components/CollectWasteDialog.tsx
Importance : 🟡 IMPORTANT
Description : Dialog pour ramasser un déchet
```

### ✅ MapLegend.tsx
```
Chemin : /src/app/components/MapLegend.tsx
Importance : 🟢 MOYEN
Description : Légende de la carte
```

### ✅ MapStats.tsx
```
Chemin : /src/app/components/MapStats.tsx
Importance : 🟢 MOYEN
Description : Statistiques de la carte
```

### ✅ SplashScreen.tsx
```
Chemin : /src/app/components/SplashScreen.tsx
Importance : 🟢 MOYEN
Description : Écran de chargement "Deviens un serial cleaner"
```

### ✅ UserProfileDialog.tsx
```
Chemin : /src/app/components/UserProfileDialog.tsx
Importance : 🟢 MOYEN
Description : Dialog du profil utilisateur
```

### ✅ WasteForm.tsx
```
Chemin : /src/app/components/WasteForm.tsx
Importance : 🟡 IMPORTANT
Description : Formulaire de déclaration de déchet
```

---

## 🖼️ COMPOSANTS FIGMA (1 fichier)

### ✅ ImageWithFallback.tsx
```
Chemin : /src/app/components/figma/ImageWithFallback.tsx
Importance : 🔵 PROTÉGÉ
Description : Composant d'image avec fallback
⚠️ NE PAS MODIFIER CE FICHIER
```

---

## 🎨 COMPOSANTS UI - ESSENTIELS (10 fichiers)

Ces composants sont utilisés fréquemment dans l'app.

### ✅ button.tsx
```
Chemin : /src/app/components/ui/button.tsx
Importance : 🔴 CRITIQUE
```

### ✅ card.tsx
```
Chemin : /src/app/components/ui/card.tsx
Importance : 🔴 CRITIQUE
```

### ✅ dialog.tsx
```
Chemin : /src/app/components/ui/dialog.tsx
Importance : 🔴 CRITIQUE
```

### ✅ input.tsx
```
Chemin : /src/app/components/ui/input.tsx
Importance : 🔴 CRITIQUE
```

### ✅ label.tsx
```
Chemin : /src/app/components/ui/label.tsx
Importance : 🔴 CRITIQUE
```

### ✅ select.tsx
```
Chemin : /src/app/components/ui/select.tsx
Importance : 🔴 CRITIQUE
```

### ✅ textarea.tsx
```
Chemin : /src/app/components/ui/textarea.tsx
Importance : 🔴 CRITIQUE
```

### ✅ sonner.tsx
```
Chemin : /src/app/components/ui/sonner.tsx
Importance : 🟡 IMPORTANT
Description : Composant de notifications toast
```

### ✅ utils.ts
```
Chemin : /src/app/components/ui/utils.ts
Importance : 🟡 IMPORTANT
Description : Utilitaires pour les composants UI (cn, etc.)
```

### ✅ use-mobile.ts
```
Chemin : /src/app/components/ui/use-mobile.ts
Importance : 🟢 MOYEN
Description : Hook pour détecter si mobile
```

---

## 🎨 COMPOSANTS UI - AUTRES (40+ fichiers)

Ces composants sont importés par shadcn/ui mais peuvent ne pas être tous utilisés.
**Copiez-les tous pour éviter les erreurs d'import.**

```
/src/app/components/ui/accordion.tsx
/src/app/components/ui/alert-dialog.tsx
/src/app/components/ui/alert.tsx
/src/app/components/ui/aspect-ratio.tsx
/src/app/components/ui/avatar.tsx
/src/app/components/ui/badge.tsx
/src/app/components/ui/breadcrumb.tsx
/src/app/components/ui/calendar.tsx
/src/app/components/ui/carousel.tsx
/src/app/components/ui/chart.tsx
/src/app/components/ui/checkbox.tsx
/src/app/components/ui/collapsible.tsx
/src/app/components/ui/command.tsx
/src/app/components/ui/context-menu.tsx
/src/app/components/ui/drawer.tsx
/src/app/components/ui/dropdown-menu.tsx
/src/app/components/ui/form.tsx
/src/app/components/ui/hover-card.tsx
/src/app/components/ui/input-otp.tsx
/src/app/components/ui/menubar.tsx
/src/app/components/ui/navigation-menu.tsx
/src/app/components/ui/pagination.tsx
/src/app/components/ui/popover.tsx
/src/app/components/ui/progress.tsx
/src/app/components/ui/radio-group.tsx
/src/app/components/ui/resizable.tsx
/src/app/components/ui/scroll-area.tsx
/src/app/components/ui/separator.tsx
/src/app/components/ui/sheet.tsx
/src/app/components/ui/sidebar.tsx
/src/app/components/ui/skeleton.tsx
/src/app/components/ui/slider.tsx
/src/app/components/ui/switch.tsx
/src/app/components/ui/table.tsx
/src/app/components/ui/tabs.tsx
/src/app/components/ui/toggle-group.tsx
/src/app/components/ui/toggle.tsx
/src/app/components/ui/tooltip.tsx
```

**Astuce :** Copiez tout le dossier `ui/` en une seule fois si possible.

---

## 🎨 STYLES (4 fichiers)

### ✅ fonts.css
```
Chemin : /src/styles/fonts.css
Importance : 🟢 MOYEN
Description : Imports de polices Google Fonts
```

### ✅ index.css
```
Chemin : /src/styles/index.css
Importance : 🔴 CRITIQUE
Description : CSS principal + CSS Leaflet inline
```

### ✅ tailwind.css
```
Chemin : /src/styles/tailwind.css
Importance : 🔴 CRITIQUE
Description : Configuration Tailwind CSS v4
```

### ✅ theme.css
```
Chemin : /src/styles/theme.css
Importance : 🟡 IMPORTANT
Description : Tokens de design (couleurs, etc.)
```

---

## ⚙️ BACKEND SUPABASE (3 fichiers)

### ✅ index.tsx
```
Chemin : /supabase/functions/server/index.tsx
Importance : 🔴 CRITIQUE
Description : Serveur backend Hono avec toutes les routes
Taille : ~320 lignes
```

### ✅ kv_store.tsx
```
Chemin : /supabase/functions/server/kv_store.tsx
Importance : 🔵 PROTÉGÉ
Description : Utilitaires pour la base de données KV
⚠️ NE PAS MODIFIER CE FICHIER
```

### ✅ info.tsx
```
Chemin : /utils/supabase/info.tsx
Importance : 🔴 CRITIQUE
Description : Configuration Supabase (Project ID + Keys)
⚠️ VOUS DEVEZ MODIFIER CE FICHIER avec VOS clés
```

---

## 🔧 UTILITAIRES (1 fichier)

### ✅ supabase-client.ts
```
Chemin : /src/utils/supabase-client.ts
Importance : 🟡 IMPORTANT
Description : Client Supabase pour le frontend (si utilisé)
```

---

## 📊 RÉCAPITULATIF

| Catégorie | Nombre de fichiers | Importance |
|-----------|-------------------|------------|
| Fichiers racine | 4 | 🔴 CRITIQUE |
| App principale | 1 | 🔴 CRITIQUE |
| Composants custom | 7 | 🟡 IMPORTANT |
| Composants Figma | 1 | 🔵 PROTÉGÉ |
| Composants UI essentiels | 10 | 🔴 CRITIQUE |
| Composants UI autres | 40+ | 🟢 MOYEN |
| Styles | 4 | 🔴 CRITIQUE |
| Backend | 3 | 🔴 CRITIQUE |
| Utilitaires | 1 | 🟡 IMPORTANT |
| **TOTAL** | **70+** | |

---

## 🎯 ORDRE DE PRIORITÉ

### Phase 1 : Fichiers critiques (30 min)
1. package.json
2. vite.config.ts
3. .gitignore (créer)
4. src/app/App.tsx
5. supabase/functions/server/index.tsx
6. utils/supabase/info.tsx ⚠️ (À MODIFIER)
7. src/styles/*.css (tous)
8. Composants UI essentiels (10 fichiers)

### Phase 2 : Composants (20 min)
9. Composants custom (7 fichiers)
10. Composants Figma (1 fichier)

### Phase 3 : Composants UI restants (30 min)
11. Tous les fichiers dans /src/app/components/ui/

### Phase 4 : Finitions (10 min)
12. supabase/functions/server/kv_store.tsx
13. src/utils/supabase-client.ts
14. Vérification finale

**Temps total estimé : 1h30**

---

## ✅ CHECKLIST DE VÉRIFICATION

Après avoir copié tous les fichiers :

```bash
# 1. Exécutez le script de vérification
bash check-files.sh

# 2. Vérifiez manuellement
ls -la package.json
ls -la src/app/App.tsx
ls -la src/app/components/
ls -la src/app/components/ui/
ls -la src/styles/
ls -la supabase/functions/server/
ls -la utils/supabase/

# 3. Testez l'installation
npm install

# 4. Si aucune erreur, vous êtes prêt !
npm run dev
```

---

## 🆘 PROBLÈMES COURANTS

### ❌ "Cannot find module '...'"
**Solution :** Vous avez oublié de copier un fichier. Vérifiez les imports.

### ❌ "Module not found: Can't resolve '@/...'"
**Solution :** Vérifiez que vite.config.ts contient l'alias `@`.

### ❌ npm install échoue
**Solution :** Vérifiez que package.json est complet et valide (JSON syntaxiquement correct).

### ❌ "Unexpected token" ou erreur de syntaxe
**Solution :** Le fichier a été mal copié. Re-copiez-le en faisant attention aux caractères spéciaux.

---

## 💡 ASTUCES

### Copier plus rapidement
1. **VSCode** : Utilisez l'extension "Paste and Indent"
2. **Terminal** : Si vous avez accès au filesystem de Figma Make, utilisez `rsync` ou `cp -r`
3. **Script** : Créez un script Python/Node pour automatiser la copie

### Vérifier l'intégrité
```bash
# Compter les lignes de code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Devrait donner environ 3000-5000 lignes total
```

### Sauvegarder votre progression
```bash
# À chaque étape, committez
git add .
git commit -m "Copy files: phase 1 complete"
```

---

## 📞 Besoin d'aide ?

Si vous bloquez sur la copie des fichiers :
1. Consultez DEPLOYMENT_GUIDE.md
2. Utilisez le script check-files.sh
3. Vérifiez TROUBLESHOOTING.md

**Bon courage ! 💪 La copie des fichiers est la partie la plus longue, mais après ça roule ! 🚀**
