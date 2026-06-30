# Feature: Base Wiki Layout

## Description
Crear la estructura visual base de la wiki siguiendo una estética minimalista.

## User Requirements
- Menú lateral persistente con categorías.
- Área central de lectura con tipografía optimizada.
- Diseño totalmente responsive (móvil y escritorio).

## Acceptance Criteria
- El diseño debe rechazar estéticas genéricas de IA (evitar gradientes excesivos) [9].
- Usa el skill .agents/skills/frontend-design para implementar un modo oscuro que no sea el típico gris genérico de IA, sino algo con una paleta intencional y buen contraste tipográfico.
- Debe cargar archivos Markdown dinámicamente.
- El tiempo de carga debe ser casi instantáneo (Vite)