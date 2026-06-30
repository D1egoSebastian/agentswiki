# AGENTS.md

Empty repository — no source code, config files, or dependencies yet.

## Current state

- Working directory: `C:\Users\diego\Desktop\test opencode`
- Not a git repository
- No `package.json`, manifests, or any other files present

## MCP

- **Context7** (remote MCP at `https://mcp.context7.com/mcp`) is configured in `opencode.json` for up-to-date library docs.
- Set the env var `CONTEXT7_API_KEY` (get one at https://context7.com/dashboard). Without it, the free rate-limited tier applies.
- To use Context7, include in your prompt: `use context7 to show me how to use <library>` or `use context7 with /<org>/<repo> for <topic>`.

## Guidance

- **Spec-Anchored Development:** Antes de escribir código, el agente DEBE leer la carpeta `spec/` para entender la misión y el stack [8].
- **Design Lead:** Para cualquier cambio visual, invocar el skill en `.agents/skills/frontend-design` [11].
- **Higiene de Contexto:** Si la tarea es larga, usar `/compact` para no perder el razonamiento agéntico [12].
- **Verification:** Después de implementar, el agente debe verificar que cumple los 'Acceptance Criteria' de la feature [2].