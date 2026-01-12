#!/bin/bash

# 🎨 Script de vérification des fichiers - Trash Mapper
# Ce script vérifie que tous les fichiers nécessaires sont présents

echo "🔍 Vérification des fichiers Trash Mapper..."
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
TOTAL=0
PRESENT=0
MISSING=0

# Fonction de vérification
check_file() {
    TOTAL=$((TOTAL + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        PRESENT=$((PRESENT + 1))
    else
        echo -e "${RED}✗${NC} $1 ${YELLOW}(MANQUANT)${NC}"
        MISSING=$((MISSING + 1))
    fi
}

check_dir() {
    TOTAL=$((TOTAL + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        PRESENT=$((PRESENT + 1))
    else
        echo -e "${RED}✗${NC} $1/ ${YELLOW}(MANQUANT)${NC}"
        MISSING=$((MISSING + 1))
    fi
}

# Fichiers racine
echo "📁 Fichiers racine:"
check_file "package.json"
check_file "vite.config.ts"
check_file "postcss.config.mjs"
check_file ".gitignore"
echo ""

# Application principale
echo "📱 Application principale:"
check_file "src/app/App.tsx"
echo ""

# Composants custom
echo "🧩 Composants custom:"
check_file "src/app/components/CategoryFilter.tsx"
check_file "src/app/components/CollectWasteDialog.tsx"
check_file "src/app/components/MapLegend.tsx"
check_file "src/app/components/MapStats.tsx"
check_file "src/app/components/SplashScreen.tsx"
check_file "src/app/components/UserProfileDialog.tsx"
check_file "src/app/components/WasteForm.tsx"
check_file "src/app/components/figma/ImageWithFallback.tsx"
echo ""

# Composants UI essentiels
echo "🎨 Composants UI (essentiels):"
check_file "src/app/components/ui/button.tsx"
check_file "src/app/components/ui/card.tsx"
check_file "src/app/components/ui/dialog.tsx"
check_file "src/app/components/ui/input.tsx"
check_file "src/app/components/ui/label.tsx"
check_file "src/app/components/ui/select.tsx"
check_file "src/app/components/ui/textarea.tsx"
check_file "src/app/components/ui/sonner.tsx"
check_file "src/app/components/ui/utils.ts"
echo ""

# Styles
echo "🎨 Styles:"
check_file "src/styles/fonts.css"
check_file "src/styles/index.css"
check_file "src/styles/tailwind.css"
check_file "src/styles/theme.css"
echo ""

# Backend
echo "⚙️ Backend (Supabase):"
check_file "supabase/functions/server/index.tsx"
check_file "supabase/functions/server/kv_store.tsx"
check_file "utils/supabase/info.tsx"
check_file "src/utils/supabase-client.ts"
echo ""

# Vérification des dossiers
echo "📂 Structure des dossiers:"
check_dir "src"
check_dir "src/app"
check_dir "src/app/components"
check_dir "src/app/components/ui"
check_dir "src/styles"
check_dir "supabase"
check_dir "supabase/functions"
check_dir "supabase/functions/server"
echo ""

# Résumé
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSUMÉ:"
echo ""
echo "Total de fichiers/dossiers vérifiés: $TOTAL"
echo -e "${GREEN}Présents: $PRESENT${NC}"
echo -e "${RED}Manquants: $MISSING${NC}"
echo ""

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les fichiers essentiels sont présents !${NC}"
    echo ""
    echo "Prochaines étapes:"
    echo "1. npm install"
    echo "2. Mettre à jour utils/supabase/info.tsx avec VOS clés"
    echo "3. npm run dev"
else
    echo -e "${YELLOW}⚠️  Il manque $MISSING fichier(s).${NC}"
    echo ""
    echo "Copiez les fichiers manquants depuis Figma Make"
    echo "ou consultez le fichier DEPLOYMENT_GUIDE.md"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
