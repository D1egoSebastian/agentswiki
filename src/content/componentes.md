# Componentes Clave de un Agente

Cada componente de un agente tiene una funcion especifica. Entenderlos por separado ayuda a disenar sistemas mejores y a diagnosticar problemas cuando algo falla.

## 1. LLM — Modelo de Lenguaje

Es el "cerebro" del agente. Procesa instrucciones, razona sobre problemas y genera texto, codigo o datos estructurados.

### Factores a considerar al elegir un LLM

- **Capacidad de razonamiento** — Modelos como Claude 3.5 Sonnet, GPT-4o y Gemini Pro destacan en tareas complejas.
- **Ventana de contexto** — Determina cuanta informacion puede procesar el agente de una sola vez.
- **Costo y latencia** — Modelos mas pequeños (como GPT-4o-mini o Claude Haiku) son mas rapidos y economicos para tareas simples.
- **Soporte de tool calling** — No todos los modelos soportan llamadas a funciones de forma nativa.

## 2. Sistema de Tools

Las herramientas son el mecanismo por el cual el agente interactua con el mundo exterior.

### Tipos de herramientas

| Tipo | Ejemplo |
|---|---|
| Busqueda | Web search, busqueda interna |
| Archivos | Leer, escribir, listar archivos |
| APIs | REST, GraphQL, SDKs |
| Ejecucion | Python, bash, SQL |
| Datos | Bases de datos, vectores |

### Buenas practicas

- Cada herramienta debe tener una **descripcion clara** de lo que hace.
- Los parametros deben estar bien definidos con tipos y validacion.
- Las herramientas deben **fallar con gracia** — devolver mensajes de error utiles.

## 3. Memoria

La memoria permite al agente mantener contexto y aprender de interacciones pasadas.

### Tipos de memoria

- **Memoria de ventana** — Mantiene los ultimos N mensajes de la conversacion.
- **Memoria resumida** — Comprime conversaciones largas en resumenes.
- **Memoria vectorial** — Almacena embeddings de mensajes para busqueda semantica.
- **Memoria entidad** — Extrae y almacena informacion sobre entidades especificas (personas, lugares, conceptos).

## 4. Orquestador

Coordina como el agente utiliza el LLM, las herramientas y la memoria.

### Responsabilidades

- Recibir la solicitud del usuario.
- Inicializar el contexto del agente.
- Ejecutar el ciclo de razonamiento-accion.
- Manejar errores y reintentos.
- Gestionar el uso de herramientas (limites, tiempos de espera).
- Devolver la respuesta final.

### Frameworks populares

- **Vercel AI SDK** — Ideal para aplicaciones web con React/Next.js.
- **LangGraph** — Framework de LangChain para grafos de estados.
- **CrewAI** — Especializado en sistemas multi-agente.
- **AutoGen** — Framework de Microsoft para agentes conversacionales.

## 5. Sistema de Evaluacion

Mide la calidad y efectividad del agente.

### Metricas comunes

- **Tasa de exito** — Porcentaje de tareas completadas correctamente.
- **Precision** — Que tan correctas son las respuestas del agente.
- **Latencia** — Tiempo que tarda el agente en completar una tarea.
- **Costo** — Tokens consumidos por tarea.

### Evaluacion automatizada

Los evals (evaluaciones automatizadas) permiten medir el rendimiento del agente de forma sistematica. Pueden incluir:

- Tests con casos de uso reales.
- Comparacion contra respuestas esperadas.
- Evaluacion por LLM (usar un modelo para evaluar a otro).
