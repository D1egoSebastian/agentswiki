# Buenas Practicas IA — Anti-Vibe Coding

**Vibe coding** es delegar una tarea a un agente de IA sin especificacion, sin verificacion y sin revision, aceptando el resultado porque "se ve bien". Es el anti-patron mas comun del desarrollo con IA y la causa #1 de bugs, deuda tecnica y proyectos que nadie puede mantener.

Esta guia enseña a aplicar IA correctamente en **cualquier proyecto**, siguiendo buenas practicas que mantienen el control del producto.

---

## Que es el vibe coding (y por que evitarlo)

| Sintoma del vibe coding | Consecuencia |
|---|---|
| "Hazme un login" sin spec | El agente inventa requisitos (OAuth? 2FA?) |
| Aceptar el diff sin leerlo | Se introducen dependencias y patrones no deseados |
| No correr tests ni lint | Bugs silenciosos llegan a produccion |
| Reescribir desde cero ante cada error | Se pierde contexto y se repiten errores |
| Commits generados sin revisar | Historial inmantenible, secrets en el repo |

El vibe coding no es "usar IA mal", es **usar IA sin disciplina**. La IA acelera la ejecucion, pero no reemplaza el juicio del ingeniero.

---

## Principios fundamentales

### 1. Spec-anchored development

Toda feature nace de una especificacion antes de escribir codigo. El spec define **que** se construye, **por que** y **como se mide el exito**.

```markdown
# Feature: [Nombre]

## Descripcion
[Problema que resuelve]

## Acceptance Criteria
- [ ] [Criterio medible 1]
- [ ] [Criterio medible 2]

## Out of scope
- [Lo que NO se hace en esta iteracion]
```

Sin spec, el agente improvisa. Con spec, el agente ejecuta.

### 2. Verificacion obligatoria

El output del agente **no es verdad por defecto**. Todo codigo generado pasa por gates automaticos antes de considerarse terminado:

- `npm run lint` (o equivalente)
- `npm run typecheck` (o `tsc --noEmit`)
- `npm test` (si hay tests)
- Build de produccion (`npm run build`)

Si un gate falla, el agente corrige **antes** de avanzar. Nunca se hace commit sobre rojo.

### 3. Higiene de contexto

El contexto del agente es finito y se degrada. Buenas practicas:

- Anclar el contexto al spec y a los archivos relevantes, no a "todo el repo".
- Usar `/compact` o equivalente en sesiones largas para no perder el razonamiento.
- Un error = una correccion enfocada. No pegar 500 lineas de log sin contexto.
- Mantener el `AGENTS.md` actualizado con comandos de verificacion del proyecto.

### 4. El humano es el reviewer

El agente es un ejecutor rapido, no un decision-maker autónomo. Decisiones que requieren juicio humano:

- Arquitectura irreversible (eleccion de framework, esquema de base de datos).
- Seguridad (manejo de secrets, permisos, auth).
- Trade-offs de producto (que entra en scope, que no).
- Aprobacion final de cualquier cambio que toque produccion.

---

## El arnes correcto (agent harness)

Antes de pedirle codigo a un agente, configura el arnes del proyecto. Un buen arnes hace que el agente sea predecible:

### AGENTS.md

Archivo en la raiz del proyecto que el agente lee primero. Debe contener:

- **Mision y stack** del proyecto.
- **Estructura de carpetas** esperada.
- **Comandos de verificacion** exactos (lint, typecheck, test, build).
- **Convenciones** (naming, estilo, librerias permitidas).
- **Reglas de seguridad** (no commitear secrets, no instalar deps sin aprobacion).

### Estructura spec/

```
spec/
  constitution/
    mission.md      # proposito y principios
    roadmap.md      # fases del proyecto
    tech-stack.md   # stack elegido
  features/
    001-login/
      spec.md       # spec de la feature
```

Cada feature tiene su spec. El agente referencia el spec al implementar.

### Comandos de verificacion documentados

El `AGENTS.md` debe listar los comandos exactos para que el agente los ejecute despues de cada cambio. Si el agente no sabe como verificar, no puede ser auto-correctivo.

---

## Disciplina de prompts

La calidad del output depende de la calidad del input. Reglas para instruir sin vibe:

| Buen prompt | Mal prompt (vibe) |
|---|---|
| "Implementa el spec de login en `spec/features/001-login/spec.md`. Usa la libreria X ya instalada. Corre `npm run lint` despues." | "Hazme un login" |
| "El test `auth.test.ts` falla con TypeError en linea 42. Lee el archivo, entiende el error y corrigelo." | "No funciona, arreglalo" |
| "Refactoriza `getUser()` para usar async/await. No cambies la firma. Verifica con `npm test`." | "Mejora el codigo" |

Patron comun: **anclar a un archivo, ser especifico, pedir verificacion**.

---

## Cuándo usar IA y cuándo NO

### Apropiado para IA

- Implementacion de un spec claro.
- Boilerplate y codigo repetitivo.
- Refactors mecanicos con tests de respaldo.
- Debugging con un error concreto y reproducible.
- Documentacion de codigo existente.

### Requiere juicio humano

- Diseno de arquitectura (decidir el stack, la capa de datos).
- Cualquier cosa que toque secrets, credenciales o auth.
- Cambios que no se pueden revertir facilmente (migraciones de DB destructivas).
- Decisiones de producto y scope.
- Revision final antes de produccion.

---

## Gates de verificacion por fase

Checklist de que revisar **antes de avanzar** a la siguiente fase del ciclo SDD:

| Fase SDD | Gate (no avanzar sin...) |
|---|---|
| Specify | Spec escrito con acceptance criteria medibles |
| Plan | Stack y componentes definidos, sin dependencias no instaladas |
| Tasks | Cada tarea tiene criterio de exito |
| Implement | Lint + typecheck + build en verde |
| Verify | Tests pasando, sin errores de runtime |
| Deploy | Workflow CI verde, artifact desplegado y verificado en vivo |

---

## Bucle de correccion

Cuando el agente falla (y va a fallar), el bucle correcto es:

1. **Leer el error completo** — no truncar, no asumir.
2. **Corregir la causa** — no el sintoma. Si un import falla, no es "quita el import", es "por que falta ese modulo?".
3. **Re-verificar** — correr el gate que fallo de nuevo.
4. **Iterar, no reescribir** — si se reescribe desde cero, se pierde contexto y se repiten errores. Corregir lo minimo necesario.

Anti-patron: pegar el error, pedir "arreglalo", aceptar el resultado. Eso es vibe debugging.

---

## Anti-patrones comunes del vibe coding

| Anti-patron | Que hacer en su lugar |
|---|---|
| No habia spec | Escribir spec antes de codificar |
| No corri tests | Gates automaticos en cada cambio |
| Acepte el diff sin leer | Revisar siempre el diff antes de aceptar |
| Commits sin revisar | El humano decide que se commitea |
| Instale deps sin permiso | El agente propone, el humano aprueba installs |
| "Funciona en mi maquina" | Verificar con build de produccion, no solo dev |
| Contexto de 50 archivos | Anclar al spec y archivos relevantes solo |

---

## Checklist final anti-vibe

Antes de considerar una feature **"hecha"**:

- [ ] Spec escrito y referenciado durante la implementacion.
- [ ] Lint pasa sin errores.
- [ ] Typecheck pasa sin errores (si aplica).
- [ ] Tests pasan (o se agregaron tests nuevos).
- [ ] Build de produccion compila.
- [ ] Dife revisado por el humano linea por linea.
- [ ] No se introdujeron secrets ni dependencias no aprobadas.
- [ ] Documentacion actualizada (AGENTS.md, docs/ o README si aplica).
- [ ] Commit hecho por el humano, con mensaje claro.

Si cualquier item esta sin marcar, la feature **no esta terminada**. Esa es la linea que separa ingenieria asistida por IA de vibe coding.
