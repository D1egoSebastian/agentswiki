export const GLOSSARY = [
  {
    term: 'Agente de IA',
    definition: 'Sistema autonomo que combina un LLM con herramientas, memoria y capacidad de razonamiento para lograr objetivos complejos sin intervencion humana constante.',
  },
  {
    term: 'LLM',
    definition: 'Large Language Model. Modelo de lenguaje entrenado con grandes volumenes de texto que puede generar, resumir y transformar contenido, y servir como nucleo de razonamiento de un agente.',
  },
  {
    term: 'MCP',
    definition: 'Model Context Protocol. Protocolo abierto estandarizado por Anthropic que define como los agentes de IA descubren e interactuan con herramientas y recursos externos.',
  },
  {
    term: 'Tool Calling',
    definition: 'Capacidad de un LLM para invocar funciones externas. El modelo genera una llamada estructurada (nombre + parametros) que el sistema ejecuta y cuyo resultado devuelve al modelo.',
  },
  {
    term: 'Embedding',
    definition: 'Representacion numerica (vector) de un texto en un espacio multidimensional. Textos con significado similar tienen vectores cercanos, permitiendo busqueda semantica.',
  },
  {
    term: 'RAG',
    definition: 'Retrieval-Augmented Generation. Tecnica que combina busqueda en una base de conocimiento con generacion de texto, permitiendo al agente acceder a informacion actualizada o especifica del dominio.',
  },
  {
    term: 'Chain of Thought',
    definition: 'Tecnica de prompting donde el modelo descompone un problema complejo en pasos intermedios, razonando en voz alta antes de dar la respuesta final.',
  },
  {
    term: 'ReAct',
    definition: 'Patron de Razonamiento + Accion. Ciclo donde el agente piensa (reasoning), actua (tool call), observa el resultado y vuelve a pensar, formando un loop hasta completar la tarea.',
  },
  {
    term: 'Ventana de Contexto',
    definition: 'Cantidad maxima de tokens que un modelo de lenguaje puede procesar en una sola solicitud. Determina cuanta informacion historica o documentacion puede incluirse.',
  },
  {
    term: 'Orquestador',
    definition: 'Componente que coordina el flujo entre el LLM, las herramientas y la memoria. Gestiona ciclos, errores, reintentos y la secuencia de operaciones del agente.',
  },
  {
    term: 'SDD',
    definition: 'System-Driven Development. Metodologia para construir software con agentes de IA de forma sistematica, donde el sistema de IA es el nucleo del desarrollo, no un asistente.',
  },
  {
    term: 'Prompt Engineering',
    definition: 'Diseno y optimizacion de instrucciones (prompts) para guiar el comportamiento de un modelo de lenguaje. Incluye tecnicas como few-shot, system prompts y formato estructurado.',
  },
  {
    term: 'Fine Tuning',
    definition: 'Proceso de entrenar adicionalmente un modelo pre-entrenado con datos especificos de un dominio para mejorar su rendimiento en tareas concretas.',
  },
  {
    term: 'Tool Definition',
    definition: 'Especificacion estructurada de una herramienta que el agente puede usar. Incluye nombre, descripcion en lenguaje natural y esquema JSON de los parametros.',
  },
  {
    term: 'Memoria Vectorial',
    definition: 'Sistema de almacenamiento que guarda embeddings de textos y permite recuperar los mas similares a una consulta dada, usando indices de similitud coseno o distancia euclidiana.',
  },
]
