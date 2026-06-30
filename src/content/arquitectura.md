# Arquitectura de Agentes de IA

La arquitectura de un agente de IA sigue un patron de **capas** donde cada nivel abstrae complejidad y expone una interfaz clara al nivel superior.

## Diagrama de capas

```
+-------------------------------+
|  Capa 5: Aplicacion           |
|  Interfaz de usuario, CLI     |
+-------------------------------+
|  Capa 4: Orquestacion         |
|  Flujos, loops, coordinacion  |
+-------------------------------+
|  Capa 3: Agente (LLM Core)    |
|  Razonamiento, planificacion  |
+-------------------------------+
|  Capa 2: Herramientas         |
|  MCP, APIs, memoria externa   |
+-------------------------------+
|  Capa 1: Infraestructura      |
|  Modelos, vectores, storage   |
+-------------------------------+
```

## Capa 1 — Infraestructura

Es la base del sistema. Incluye:

- **Modelos de lenguaje** — Proveedores de inferencia (OpenAI, Anthropic, Google, modelos locales con Ollama/vLLM).
- **Bases vectoriales** — Almacenamiento y busqueda de embeddings (Chroma, Pinecone, Qdrant).
- **Almacenamiento** — Archivos, bases de datos relacionales, caches.

## Capa 2 — Herramientas y Memoria

El agente necesita interactuar con el mundo exterior y recordar informacion.

### Herramientas (Tools)

Cada herramienta es una funcion que el agente puede invocar. Ejemplos:

- Busqueda web
- Lectura/escritura de archivos
- Consultas a APIs REST
- Ejecucion de codigo
- Acceso a bases de datos

### Memoria

La memoria se divide en dos tipos:

- **Memoria a corto plazo** — La ventana de contexto del LLM. Contiene la conversacion actual y el estado inmediato.
- **Memoria a largo plazo** — Almacenamiento persistente usando embeddings y busqueda semantica. Permite al agente "recordar" informacion de sesiones anteriores.

## Capa 3 — Agente (Core)

Es el nucleo del sistema. Aqui vive la logica de:

- **Razonamiento** — El agente analiza el problema, descompone objetivos y decide que acciones tomar.
- **Planificacion** — Genera un plan de varios pasos para alcanzar un objetivo.
- **Ejecucion** — Invoca herramientas en el orden correcto, procesa resultados y decide si continuar o detenerse.

### Patrones de razonamiento

**Chain of Thought (CoT)** — El agente "piensa en voz alta", descomponiendo el problema paso a paso antes de responder.

**ReAct** — Ciclo de Razonamiento + Accion: el agente piensa, actua, observa el resultado y vuelve a pensar.

**Reflexion** — El agente evalua sus propias respuestas, identifica errores y los corrige.

## Capa 4 — Orquestacion

Coordina el flujo completo del agente:

- Gestiona el ciclo de razonamiento-accion-evaluacion.
- Maneja errores y reintentos.
- Controla el uso de herramientas y la memoria.
- Frameworks como LangGraph, Vercel AI SDK y CrewAI proporcionan orquestadores listos para usar.

## Capa 5 — Aplicacion

La interfaz con el usuario final. Puede ser:

- Un chat conversacional
- Una API REST
- Una CLI (interfaz de linea de comandos)
- Un dashboard automatizado

## Flujo tipico de ejecucion

```
1. Usuario envia una solicitud
2. Orquestador recibe la solicitud y la pasa al agente
3. Agente razona sobre el problema y genera un plan
4. Para cada paso del plan:
   a. Selecciona la herramienta adecuada
   b. Ejecuta la herramienta
   c. Procesa el resultado
   d. Decide si continuar o ajustar el plan
5. Agente genera la respuesta final
6. Orquestador devuelve la respuesta al usuario
7. (Opcional) La interaccion se guarda en memoria a largo plazo
```
