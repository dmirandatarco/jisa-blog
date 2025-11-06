#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/jisa-next"
RUNTIME_DIR="$APP_DIR/runtime"
PM2_NAME="jisa-next"

cd "$APP_DIR"

echo "==> (A) Guardar cambios locales (solo lo trackeado)"
# Detecta si se creó un nuevo stash (sin incluir untracked)
PRE_TOP="$(git rev-parse -q --verify refs/stash || echo "")"
git stash push -m "deploy temp" || true
POST_TOP="$(git rev-parse -q --verify refs/stash || echo "")"
STASHED=0
if [ "$PRE_TOP" != "$POST_TOP" ] && [ -n "$POST_TOP" ]; then
  STASHED=1
fi

echo "==> (B) Traer cambios"
git fetch --all --prune
git pull --rebase

echo "==> (C) Verificar .env.production"
if [[ ! -f ".env.production" ]]; then
  echo "ERROR: Falta .env.production"; exit 1
fi

echo "==> (D) Instalar dependencias exactas"
npm ci --include=dev

echo "==> (E) Build de producción con .env.production"
NODE_ENV=production npm run build

echo "==> (F) Empaquetado standalone"
rm -rf "$RUNTIME_DIR"
mkdir -p "$RUNTIME_DIR/.next"
rsync -a .next/standalone/ "$RUNTIME_DIR"/
rsync -a .next/static/ "$RUNTIME_DIR/.next/static/"
rsync -a public/ "$RUNTIME_DIR/public/"

echo "==> (F.2) Escribir versión del deploy"
GIT_REV=$(git rev-parse --short HEAD)
date +"%Y-%m-%d %H:%M:%S %z" > "$RUNTIME_DIR/DEPLOY_TIME"
echo "$GIT_REV" > "$RUNTIME_DIR/DEPLOY_GIT_REV"

echo "==> (G) Reiniciar PM2 con env actualizado"
pm2 restart "$PM2_NAME" --update-env
pm2 save

echo "==> (H) Pruebas rápidas"
pm2 logs "$PM2_NAME" --lines 5 --nostream || true
echo "==> Health check /"
curl -Is https://jisaadventure.com/ | head -n 1 || true
echo "==> Health check /sitemap.xml"
curl -Is https://jisaadventure.com/sitemap.xml | head -n 1 || true

# (I) Reaplica el stash si se creó (restaura tus cambios locales trackeados)
if [ "$STASHED" -eq 1 ]; then
  echo "==> (I) Restaurando cambios locales (git stash pop)"
  git stash pop || true
fi

echo "==> Listo. Versión: $GIT_REV"
