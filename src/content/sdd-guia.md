# Metodologia SDD — Guia Operativa E2E

**SDD** (System-Driven Development) es una metodologia para construir software con agentes de IA de forma sistematica, repetible y medible. Esta guia describe el flujo completo de desarrollo, desde la concepcion hasta el despliegue.

## Principios fundamentales

1. **El sistema como primer ciudadano** — El agente no es un asistente, es el nucleo del sistema.
2. **Iteracion medida** — Cada ciclo produce artefactos medibles (tests, evals, documentacion).
3. **Herramientas sobre codigo duro** — Preferir configuracion y herramientas a logica programada manualmente.
4. **Documentacion como codigo** — La documentacion se mantiene junto al codigo y se prueba como el codigo.

## Flujo E2E (7 pasos)

<div align="center">

```ascii
    ┌─────────────┐
    │  DEFINICION │
    └──────┬──────┘
           v
    ┌─────────────┐
    │   DISENO    │
    └──────┬──────┘
           v
    ┌─────────────┐
    │ IMPLEMENT.  │
    └──────┬──────┘
           v
    ┌─────────────┐
    │ EVALUACION  │
    └──────┬──────┘
           v
    ┌─────────────┐
    │  DOCUMENT.  │
    └──────┬──────┘
           v
    ┌─────────────┐
    │ INTEGRACION │
    └──────┬──────┘
           v
    ┌─────────────┐
    │ DESPLIEGUE  │
    └─────────────┘
```

</div>

## Fase 1: Definicion

El primer paso es entender que problema resuelve el agente y como mediremos el exito.

### Estructura del spec

```markdown
# Feature: [Nombre]

## Descripcion
[Problema que resuelve]

## Criterios de exito
- [Criterio medible 1]
- [Criterio medible 2]

## User Flow
[Como interactua el usuario con el agente]

## Acceptance Criteria
- [ ] [Criterio 1]
- [ ] [Criterio 2]
```

## Fase 2: Diseno del Agente

### Decisiones de diseno

| Decision | Opciones | Criterio |
|---|---|---|
| Modelo | Claude, GPT-4o, Gemini | Razonamiento + tool calling |
| Framework | Vercel AI SDK, LangGraph | Stack del proyecto |
| Memoria | Ventana + vectorial | Tipo de tarea |
| Tools | MCP, APIs, archivos | Necesidades del dominio |

### Template de prompts

```markdown
## System Prompt

Eres un agente especializado en [dominio].

### Capacidades
- [Herramienta 1]: [Descripcion]
- [Herramienta 2]: [Descripcion]

### Reglas
- [Regla de comportamiento 1]
- [Regla de comportamiento 2]

### Formato de respuesta
[Formato esperado]
```

## Fase 3: Implementacion

### Estructura recomendada

```
proyecto/
  src/
    agent/         -- Logica del agente
    tools/         -- Implementacion de herramientas
    memory/        -- Gestion de memoria
    orchestration/ -- Flujo y coordinacion
    evals/         -- Tests y evaluaciones
  spec/            -- Documentacion
  mcp-servers/     -- Servidores MCP (si aplica)
```

## Fase 4: Evaluacion

### Tipos de eval

- **Unitarios** — Prueban una herramienta o funcion especifica.
- **Integracion** — Prueban el flujo completo del agente.
- **Regression** — Verifican que cambios no rompan funcionalidad existente.

### Ejemplo de eval

```typescript
import { describe, it, expect } from 'vitest'

describe('Agente de busqueda', () => {
  it('debe encontrar informacion relevante', async () => {
    const resultado = await agente.ejecutar(
      'Busca el precio actual de las acciones de AAPL'
    )
    expect(resultado.exito).toBe(true)
    expect(resultado.respuesta).toContain('AAPL')
  })
})
```

## Fase 5: Documentacion

La documentacion debe vivir junto al codigo y actualizarse con cada cambio.

### Que documentar

- **README** — Que hace el agente y como empezar.
- **Tools** — Cada herramienta con su descripcion y parametros.
- **Evals** — Como ejecutar y entender los tests.
- **Deploy** — Pasos para desplegar el agente.

## Fase 6: Integracion

Conexion con el ecosistema externo:

- Servidores MCP de terceros.
- APIs externas (Slack, GitHub, Notion, etc.).
- Sistemas internos (bases de datos, microservicios).

## Fase 7: Despliegue

### Opciones de deploy

- **Vercel** — Para agentes con interfaz web (AI SDK).
- **Railway / Fly.io** — Para agentes como servicio.
- **Servidor propio** — Con Docker y monitoreo.

### Monitoreo

- Logs de cada ejecucion del agente.
- Metricas de uso (tokens, latencia, errores).
- Alertas cuando el agente falla repetidamente.
