# Guia de Despliegue

Esta guia cubre como desplegar la wiki (o cualquier proyecto Vite + React) en diferentes plataformas, con opciones de automatizacion.

## Opciones de despliegue

### 1. Vercel (recomendado)

Vercel es la opcion mas simple para proyectos Vite. Ofrece despliegue automatico desde GitHub.

```bash
# Instalar CLI de Vercel
npm install -g vercel

# Desplegar
vercel

# Desplegar a produccion
vercel --prod
```

**Configuracion automatica:** Vercel detecta Vite automaticamente y configura el build command (`vite build`) y el output directory (`dist`).

### 2. Netlify

Netlify ofrece despliegue similar con soporte para SPA.

```bash
# Instalar CLI
npm install -g netlify-cli

# Desplegar
netlify deploy --build --prod
```

**Configuracion:** Crear `netlify.toml` en la raiz:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

Para desplegar en GitHub Pages, se necesita un workflow de GitHub Actions.

## Automatizacion con GitHub Actions

El siguiente workflow despliega automaticamente a GitHub Pages cuando se hace push a la rama principal:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Configuracion de GitHub Pages

1. Ir a Settings > Pages del repositorio.
2. En "Source", seleccionar "GitHub Actions".
3. El workflow anterior se ejecutara automaticamente en cada push.

### Configurar el base path

Si desplegas en `https://usuario.github.io/repo/`, necesitas configurar el base en `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nombre-del-repo/',
})
```

## Despliegue manual

```bash
# Build
npm run build

# El output esta en dist/
# Puedes servir localmente para probar
npx vite preview
```

### Docker

Opcionalmente, puedes contenerizar la aplicacion:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Verificacion post-deploy

- [ ] La pagina carga correctamente en HTTPS
- [ ] Las rutas funcionan (sin errores 404 en SPA)
- [ ] Los assets se sirven con cache headers adecuados
- [ ] El rendimiento es aceptable (Lighthouse)
- [ ] Los enlaces externos abren en nueva pestana
