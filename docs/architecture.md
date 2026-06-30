# Documentacion del Proyecto — Agent Atlas

Guia Operativa E2E para construir sistemas con agentes de inteligencia artificial. Construida con Vite + React + Tailwind CSS.

---

## Stack tecnico

| Herramienta | Version | Uso |
|---|---|---|
| Vite | 6.x | Bundler y dev server |
| React | 18.x | Framework de UI |
| Tailwind CSS | 3.x | Estilos utilitarios |
| react-markdown | 9.x | Renderizado de Markdown |
| remark-gfm | 4.x | Tablas y GFM en Markdown |
| fuse.js | 7.x | Busqueda fuzzy local |
| lucide-react | 0.468.x | Iconos |

## Estructura del proyecto

```
/
├── index.html                  # Entry point HTML (Space Grotesk + DM Sans + JetBrains Mono)
├── atlas.html                  # Design exploration previa (conservada)
├── package.json
├── vite.config.js
├── tailwind.config.js          # Paleta oscura bicolor: carbon + ambar + azul nexo
├── postcss.config.js
├── .github/workflows/deploy.yml # CI/CD a GitHub Pages
├── public/
│   └── 404.html                # SPA fallback para GitHub Pages
│
├── spec/                       # Documentacion de producto
│   └── constitution/
│       ├── mission.md
│       ├── roadmap.md
│       ├── tech-stack.md
│       └── features/
│           └── 001-base-layout/
│               ├── spec.md
│               ├── 002-initial-content/
│               ├── 003-local-search/
│               ├── 004-interactive-glosary/
│               ├── 005-SSD-Metholody/
│               ├── 006-mcp-integration/
│               └── 007-deploy-guide/
│
├── docs/
│   └── architecture.md         ← Este archivo
│
└── src/
    ├── main.jsx                # Entry point React
    ├── App.jsx                 # Layout shell + homepage hero + sidebar 3 secciones + routing
    ├── index.css               # Tailwind + componentes custom (nexus-card, deploy-step, flow-node)
    │
    ├── content/                # Paginas de la wiki en Markdown
    │   ├── index.md            # Inicio
    │   ├── agentes.md          # Que es un agente de IA
    │   ├── arquitectura.md     # Arquitectura en capas
    │   ├── componentes.md      # Componentes clave
    │   ├── mcp-intro.md        # Introduccion a MCP
    │   ├── mcp-implementacion.md # Implementacion de servidores MCP
    │   ├── mcp-practico.md     # Uso practico + Context7 + Skills
    │   ├── sdd-guia.md         # Metodologia SDD (flujo E2E)
    │   └── deploy.md           # Guia de despliegue (alternativas al wizard)
    │
    ├── components/             # Componentes React
    │   ├── MarkdownRenderer.jsx # Render de Markdown con CodeBlock + copy button
    │   ├── SearchBar.jsx       # Buscador con modal (Ctrl+K)
    │   ├── GlossaryViewer.jsx  # Glosario interactivo
    │   ├── SDDFlow.jsx         # Diagrama visual del ciclo SDD
    │   └── DeployWizard.jsx    # Wizard paso a paso de despliegue
    │
    └── data/
        ├── pages.js            # Indice de paginas para busqueda (10 entradas)
        └── glossary.js         # 15 terminos del glosario
```

## Arquitectura de componentes

```
App
├── HomePage (cuando slug === 'index')
│   ├── Hero (titulo + badge + subtitulo)
│   ├── NexusFlow (4 nodos conectados: Agentes → MCP → SDD → Deploy)
│   └── Portal cards (Conocimiento ▸ / Despliegue ▸)
│
├── Sidebar (resto de paginas)
│   ├── Header (dot + Agent Atlas)
│   ├── SearchBar (Fuse.js, Ctrl+K)
│   └── Nav (3 secciones: Conocimiento / Despliegue / Recursos)
│       ├── Seccion "Conocimiento"
│       │   ├── Inicio
│       │   ├── Agentes de IA (sub: agente, arquitectura, componentes)
│       │   ├── MCP (sub: intro, implementacion, uso practico)
│       │   ├── Metodologia (sub: flujo SDD)
│       │   └── Referencia (sub: glosario)
│       ├── Seccion "Despliegue"
│       │   └── Guia paso a paso (slug: deploy)
│       └── Seccion "Recursos"
│           └── Skills y MCPs (slug: mcp-practico)
│
├── TopBar (solo mobile, con hamburguesa)
│
└── ContentPage (selecciona segun slug)
    ├── slug='glosario'    → GlossaryViewer
    ├── slug='sdd-guia'    → SDDFlow (diagrama visual interactivo)
    ├── slug='deploy'      → DeployWizard (paso a paso con progress bar)
    └── [default]          → MarkdownRenderer(content) con carga dinamica .md
```

### Flujo de datos

1. `App` mantiene `currentSlug` (pagina activa) y `sidebarOpen`.
2. Si `currentSlug === 'index'`, se renderiza `HomePage` con hero + portal cards + nexus flow.
3. Si no, `ContentPage` decide el componente segun el slug.
4. `NAV` es un array estatico con 3 secciones: items directos + subs (subcategorias).
5. Los archivos `.md` se cargan con `import.meta.glob` — cada pagina es su propio chunk.
6. `SearchBar` usa Fuse.js indexando `PAGE_INDEX` (10 paginas).

## Paginas y componentes

| Slug | Titulo | Tipo | Categoria |
|---|---|---|---|
| index | Inicio | Homepage (hero + portal cards) | — |
| agentes | Que es un agente | .md | Agentes de IA |
| arquitectura | Arquitectura | .md | Agentes de IA |
| componentes | Componentes | .md | Agentes de IA |
| mcp-intro | Introduccion a MCP | .md | MCP |
| mcp-implementacion | Implementacion MCP | .md | MCP |
| mcp-practico | Uso practico de MCPs | .md | Recursos |
| sdd-guia | Flujo SDD | Componente (SDDFlow) | Metodologia |
| glosario | Glosario | Componente (GlossaryViewer) | Referencia |
| deploy | Guia de despliegue | Componente (DeployWizard) | Despliegue |

## Paleta de color

Diseno intencional que evita los tres defaults genericos de IA (cream+terracota, dark+cyan, broadsheet).
Riesgo estetico asumido: paleta bicolor **ambar + azul** en modo oscuro. El ambar da calidez; el azul se usa solo en secundarios.

| Token | Hex | Uso |
|---|---|---|
| page-deep | #0A0C10 | Fondo mas profundo |
| page-bg | #12141A | Fondo principal |
| page-card | #181B23 | Cartas y superficies |
| page-elevated | #1E212A | Hover / estados elevados |
| ink-primary | #ECEBE4 | Texto principal (blanco calido) |
| ink-secondary | #8F929E | Texto secundario |
| line | #262933 | Bordes y separadores |
| accent-gold | #E8A839 | Acento principal (ambar rico) |
| accent-gold-dim | rgba(232,168,57,0.12) | Hover / fondos sutiles |
| accent-gold-hover | #F0C060 | Hover del acento |
| accent-blue | #5B7FFF | Acento secundario (azul nexo) |
| accent-blue-dim | rgba(91,127,255,0.1) | Fondos sutiles azules |

## Tipografia

| Rol | Fuente | Pesos |
|---|---|---|
| Display (titulos grandes) | Space Grotesk | 400, 500, 600, 700 |
| Body (cuerpo de texto) | DM Sans | 400, 500, 600 |
| Mono (codigo) | JetBrains Mono | 400, 500 |

### Escala tipografica

| Nivel | Tamaño | Line-Height | Letter-Spacing |
|---|---|---|---|
| hero (solo homepage) | 4rem / 2.5rem mobile | 1 | -0.03em |
| display (h1) | 2.5rem | 1.12 | -0.02em |
| h2 | 1.5rem | 1.3 | -0.01em |
| h3 | 1.125rem | 1.4 | 0 |
| body | 1rem | 1.7 | 0 |
| small | 0.875rem | 1.6 | 0 |

## Componentes principales

### HomePage

La landing page del proyecto. Incluye:

- **Badge animado** — "Guia Operativa E2E" con dot pulsante
- **Hero title** — "Agent Atlas" con "Atlas" en ambar
- **NexusFlow** — SVG de 4 nodos conectados: Agentes → MCP → SDD → Deploy
- **2 Portal cards** — "Conocimiento" (ambar) y "Despliegue" (azul) con gradiente hover

### SDDFlow

Diagrama visual interactivo del ciclo SDD (6 fases):

1. Constitution
2. Specify
3. Plan
4. Tasks
5. Implement
6. Verify

Cada fase es un nodo clickeable que expande su detalle (descripcion + explicacion practica).
Layout horizontal en desktop, vertical en mobile con acordeon.

### DeployWizard

Guia paso a paso con 6 pasos:

1. Preparar el build (codigo + nota)
2. Elegir plataforma (Vercel, Netlify, GitHub Pages, Docker)
3. Configurar dominio
4. Variables de entorno
5. Desplegar (comandos)
6. Verificar (checklist interactivo)

Incluye: progress bar numerado, navegacion anterior/siguiente, code blocks con copy button, checklist con checkboxes.

### SearchBar

- Fuse.js con umbral 0.4, indexa titulo + categoria + keywords
- Atajo Ctrl+K para abrir/cerrar
- ESC para cerrar
- Modal overlay con backdrop
- 6 resultados maximo

### GlossaryViewer

- 15 terminos de IA, MCP y desarrollo
- Expansion inline (sin modal)
- Filtro en vivo por texto
- Icono + borde hover

### MarkdownRenderer

- react-markdown + remark-gfm
- Componentes custom: h1-h3, code (inline + block con copy), blockquote, tablas
- CodeBlock con header "Codigo" + boton copiar con feedback check
- Callouts con clase `wiki-callout`

## Funcionalidades

### Buscador local (Ctrl+K)
- Fuse.js con 10 paginas indexadas
- Modal overlay con backdrop
- Atajo Ctrl+K, ESC para cerrar

### Glosario interactivo
- 15 terminos con expansion inline
- Filtro en vivo
- Sin modal, sin interrupcion

### SDD Flow visual
- 6 nodos interactivos del ciclo SDD
- Layout horizontal (desktop) / vertical acordeon (mobile)
- Detalle expandible al hacer clic

### Deploy Wizard
- 6 pasos con progress bar numerado
- Navegacion anterior/siguiente
- Code blocks con copy button
- Checklist verificable
- Opciones de plataforma detalladas

### Responsive
- Sidebar: fijo en desktop (>1024px), overlay en mobile
- Topbar con hamburguesa en mobile
- SDDFlow: horizontal en desktop, vertical en mobile
- NexusFlow: escala en mobile
- Max-width contenido: 760px

### Accesibilidad
- `:focus-visible` con borde ambar
- `prefers-reduced-motion` desactiva animaciones
- `::selection` con fondo ambar
- Alt text en iconos decorativos (aria-label)
- Scrollbar delgada custom

## Componentes CSS (@layer components)

| Clase | Uso |
|---|---|
| `.wiki-heading` | Titulos con font-display |
| `.wiki-link` | Enlaces con subrayado animado |
| `.wiki-code` | Codigo inline |
| `.wiki-blockquote` | Citas con borde izquierdo ambar |
| `.wiki-callout` | Notas destacadas con fondo ambar sutil |
| `.nexus-card` | Portal cards con gradiente borde hover |
| `.deploy-step` | Paso del wizard de deploy |
| `.deploy-step-line` | Linea vertical conectora |
| `.deploy-step-dot` | Indicador circular de paso |
| `.flow-node` | Nodo del diagrama SDD |
| `.flow-node-active` | Nodo activo con glow |
| `.flow-node-inactive` | Nodo inactivo con hover |
| `.sidebar-item` | Item base de navegacion |
| `.sidebar-item-active` | Item activo con glow ambar |
| `.sidebar-item-inactive` | Item inactivo con hover |
| `.topbar-btn` | Boton de la barra superior |

## Como agregar una pagina nueva

1. Crear `src/content/mi-pagina.md` con contenido Markdown.
2. Agregar entrada en `NAV` en `src/App.jsx` (seccion + subcategoria + items).
3. Agregar entrada en `PAGE_INDEX` en `src/data/pages.js` (para busqueda).
4. (Opcional) Si es un componente especial, agregar condicion en `ContentPage`.

## Comandos

```bash
npm run dev      # Desarrollo con HMR en localhost
npm run build    # Build de produccion a dist/
npm run preview  # Servir build localmente para verificar
```

## Despliegue

El proyecto incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que:

1. Configura Pages con `actions/configure-pages@v5` (antes del build).
2. Instala dependencias con `npm ci` (Node 22).
3. Hace build del proyecto con `vite build` (base: `/agentswiki/`).
4. Sube el output como artifact con `actions/upload-pages-artifact@v4` (`path: dist`).
5. Despliega a GitHub Pages con `actions/deploy-pages@v4`.

### Requisito para GitHub Pages

El **Source** en Settings > Pages debe estar en **"GitHub Actions"**, no "Deploy from a branch".
De lo contrario, GitHub ignora el artifact y sirve los archivos fuente de la rama, resultando
en una pagina en blanco (el `index.html` fuente referencia `/src/main.jsx` en vez del bundle).

### SPA Fallback (404.html)

GitHub Pages no tiene soporte nativo para SPAs. Al refrescar una sub-ruta (ej. `/agentswiki/agentes`),
GitHub busca un archivo que no existe y devuelve 404. El archivo `public/404.html` se copia
automaticamente a `dist/` por Vite y redirige al root preservando la ruta en `sessionStorage`.

### Debug de pagina en blanco

Si el deploy es exitoso pero la pagina se ve en blanco, verificar en orden:

1. **HTML servido**: el `index.html` debe tener `<script src="/agentswiki/assets/index-xxx.js">`
   (no `/src/main.jsx`). Si muestra `/src/main.jsx`, Pages esta sirviendo desde la rama, no del artifact.
2. **Assets 200**: los JS/CSS en `/agentswiki/assets/` deben devolver 200.
3. **Chunks dinamicos**: los chunks de contenido (`agentes-xxx.js`, etc.) deben existir.
4. **Consola del navegador**: errores de runtime de React (F12 > Console).
5. **Workflow log**: verificar que los steps build + deploy esten verdes.

Alternativas documentadas en `src/content/deploy.md`: Vercel, Netlify, Docker.
El wizard interactivo de deploy esta en `src/components/DeployWizard.jsx`.

### Workflow actual

```yaml
# .github/workflows/deploy.yml
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
          node-version: 22
          cache: npm
      - uses: actions/configure-pages@v5
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v4
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

## Roadmap completado

| Fase | Descripcion | Estado |
|---|---|---|
| 1 | Base Wiki Shell (layout, sidebar, markdown) | Completado |
| 2 | Contenido inicial (Agentes, MCP, SDD) | Completado |
| 3 | Buscador local + Dark mode | Completado |
| 4 | Glosario interactivo | Completado |
| 5 | Metodologia SDD con flujo visual | Completado |
| 6 | Integracion de MCPs + Skills de agents | Completado |
| 7 | Guia de despliegue automatizado + wizard | Completado |

## Diseno y filosofia visual

Siguiendo el skill `frontend-design`, el diseno rechaza las tres esteticas genericas de IA:

1. **No** cream + serif + terracota.
2. **No** near-black + bright green/cyan (el carbon es calido, no puro negro; el acento es ambar, no acido).
3. **No** broadsheet/newspaper.

En su lugar, se opto por:

- **Fondo carbon profundo** (#0A0C10) con glows radiales sutiles (ambar + azul).
- **Paleta bicolor** ambar (principal) + azul (secundario) — riesgo intencional.
- **Tipografia dual**: Space Grotesk para titulos (personalidad tecnica, letras unicas), DM Sans para cuerpo.
- **Homepage como experiencia**: hero full-viewport con badge animado, nexus flow diagram, portal cards con gradiente hover.
- **Componentes visuales** donde el contenido lo requiere: SDD Flow interactivo, Deploy Wizard paso a paso.
- **Code blocks** con boton de copia y feedback visual.
- Sin gradientes excesivos, sin animaciones superfluas, sin decoracion gratuita.
