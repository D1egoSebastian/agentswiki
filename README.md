# Agent Atlas — Guia Operativa E2E

Wiki visual e interactiva sobre construccion de sistemas con agentes de inteligencia artificial. Cubre agentes de IA, el protocolo MCP, la metodologia SDD (Specification-Driven Development) y una guia paso a paso para desplegar software.

## Stack

- **Vite 6** + **React 18** + **Tailwind CSS 3**
- react-markdown, fuse.js, lucide-react
- GitHub Pages + GitHub Actions CI/CD

## Estructura

| Ruta | Contenido |
|------|-----------|
| `src/content/*.md` | Paginas de la wiki en Markdown |
| `src/components/` | Componentes React: SDDFlow, DeployWizard, SearchBar, GlossaryViewer, MarkdownRenderer |
| `src/data/` | Indice de busqueda (fuse.js) y terminos del glosario |
| `public/404.html` | SPA fallback para GitHub Pages |
| `.github/workflows/deploy.yml` | CI/CD automatizado |

## Desarrollo

```bash
npm install       # Instalar dependencias
npm run dev       # Servidor local con HMR
npm run build     # Build de produccion a dist/
npm run preview   # Vista previa del build
```

## Despliegue

Cada push a `main` ejecuta el workflow de GitHub Actions que buildear y despliega automaticamente a:

```
https://d1egosebastian.github.io/agentswiki/
```

Requiere que en Settings > Pages el Source este en **"GitHub Actions"**.

## Diseno

Paleta oscura bicolor: carbon profundo (#0A0C10) + ambar (#E8A839) + azul nexo (#5B7FFF).
Tipografia: Space Grotesk (display), DM Sans (body), JetBrains Mono (codigo).
