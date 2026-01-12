# 🎨 GUIDE DE CRÉATION DES ICÔNES PWA - Trash Mapper

## 📍 **Votre logo actuel**

Le logo Trash Mapper se trouve dans votre projet :
- Fichier asset Figma : `04fede240e8e6c3e33fe73fc0fcc77802c25ee96.png`
- Utilisé dans `App.tsx` comme logo principal

---

## 🛠 **MÉTHODE 1 : Depuis Figma (RECOMMANDÉ)**

### **Étapes :**

1. **Ouvrir Figma** avec votre design Trash Mapper
2. **Sélectionner le logo** (celui avec le fond turquoise #53fab5)
3. **Exporter en PNG** aux tailles suivantes :

| Fichier | Taille | Usage |
|---------|--------|-------|
| `pwa-192x192.png` | 192×192 px | Icône Android petite |
| `pwa-512x512.png` | 512×512 px | Icône Android grande + Maskable |
| `apple-touch-icon.png` | 180×180 px | Icône iOS |
| `favicon.ico` | 32×32 px | Favicon navigateur |

### **Conseils d'export Figma :**

```
1. Clic droit sur le logo → Export
2. Paramètres :
   - Format: PNG
   - Taille: 1x (puis modifier manuellement)
   - Fond: Transparent OU turquoise #53fab5
3. Exporter pour chaque taille
4. Renommer selon tableau ci-dessus
```

---

## 🌐 **MÉTHODE 2 : Outil en ligne (FACILE)**

### **Option A - RealFaviconGenerator** ⭐ RECOMMANDÉ

1. **Aller sur** : https://realfavicongenerator.net/
2. **Upload** votre logo (minimum 260×260 px)
3. **Configurer** :
   - iOS : Background turquoise #53fab5
   - Android : Thème turquoise #53fab5
   - Nom app : "Trash Mapper"
4. **Générer** et télécharger le package
5. **Copier** les fichiers dans `/public/`

### **Option B - PWA Asset Generator (CLI)**

```bash
# Installer l'outil
npm install -g pwa-asset-generator

# Depuis votre logo source
pwa-asset-generator votre-logo.png ./public \
  --background "#53fab5" \
  --index ./index.html \
  --manifest ./public/manifest.webmanifest
```

---

## 🎨 **MÉTHODE 3 : Design manuel**

### **Si vous n'avez pas le logo en haute qualité :**

**Créer un logo simple avec :**

- **Fond** : Turquoise #53fab5
- **Texte** : "TM" ou "🗑️" (emoji poubelle)
- **Police** : Bold, blanc ou noir selon contraste
- **Forme** : Carré avec coins arrondis (optionnel)

**Outils gratuits :**
- Canva : https://www.canva.com/
- Photopea (Photoshop gratuit) : https://www.photopea.com/
- GIMP : https://www.gimp.org/

### **Template Canva :**

```
1. Créer un design 512×512 px
2. Fond turquoise #53fab5
3. Texte "TM" centré, blanc, gras
4. Exporter en PNG
5. Redimensionner pour les autres tailles
```

---

## 📦 **FICHIERS À CRÉER**

Placez ces **4 fichiers** dans `/public/` :

```
/public/
  ├── pwa-192x192.png       ← 192×192 px
  ├── pwa-512x512.png       ← 512×512 px  
  ├── apple-touch-icon.png  ← 180×180 px
  └── favicon.ico           ← 32×32 px
```

---

## ✅ **VÉRIFICATION**

Une fois les fichiers créés :

```bash
# Vérifier que les fichiers existent
ls -lh public/*.png public/*.ico
```

Tailles attendues :
- `pwa-192x192.png` : ~5-20 KB
- `pwa-512x512.png` : ~15-50 KB
- `apple-touch-icon.png` : ~10-30 KB
- `favicon.ico` : ~1-5 KB

---

## 🚀 **APRÈS CRÉATION**

```bash
# 1. Build de test
pnpm build

# 2. Vérifier dans dist/
ls -lh dist/*.png dist/*.ico

# 3. Preview
pnpm preview

# 4. Tester dans Chrome
# Ouvrir DevTools → Application → Manifest
```

---

## 🎯 **RÉSULTAT FINAL**

Vos utilisateurs verront l'icône Trash Mapper :

```
📱 iPhone                  📱 Android
┌────────────┐            ┌────────────┐
│ [Logo TM]  │            │ [Logo TM]  │
│ turquoise  │            │ turquoise  │
│            │            │            │
└────────────┘            └────────────┘
 Trash Mapper              Trash Mapper
```

---

## ❓ **BESOIN D'AIDE ?**

Si vous n'arrivez pas à exporter depuis Figma ou créer les icônes :

1. **Envoyez-moi** votre logo en haute résolution
2. **OU** utilisez un placeholder temporaire (je peux créer un SVG simple)
3. **OU** utilisez l'outil en ligne RealFaviconGenerator

---

## 🔄 **PLACEHOLDER TEMPORAIRE**

En attendant d'avoir les vraies icônes, vous pouvez utiliser un placeholder :

**Créer avec du texte "TM"** dans n'importe quel éditeur d'image :
- Fond #53fab5
- Texte "TM" blanc centré
- Export en PNG aux bonnes tailles

Cela permettra de tester la PWA en attendant les icônes finales ! ✨
