# Que es un agente de IA

Un **agente de IA** es un sistema autonomo que combina un modelo de lenguaje (LLM) con herramientas, memoria y capacidad de razonamiento para lograr objetivos complejos.

A diferencia de una API tradicional o un chatbot, un agente puede:

- **Planificar** — Descomponer un objetivo en pasos ejecutables.
- **Ejecutar acciones** — Llamar herramientas, consultar APIs, leer archivos.
- **Evaluar resultados** — Decidir si un resultado es suficiente o si necesita iterar.
- **Adaptarse** — Cambiar su estrategia cuando encuentra errores o resultados inesperados.

## Componentes fundamentales

### LLM (Modelo de Lenguaje)

El nucleo del agente. Procesa instrucciones, razona y genera texto o codigo. La eleccion del modelo define las capacidades base.

### Herramientas (Tools)

Interfaces con el mundo exterior: APIs, navegadores, bases de datos, sistemas de archivos. Cada herramienta es una funcion que el agente puede invocar.

### Memoria

Mantiene contexto a lo largo de las interacciones. Incluye memoria a corto plazo (ventana de contexto del LLM) y memoria a largo plazo (bases vectoriales, resumenes).

### Orquestacion

Coordina el flujo entre el LLM, las herramientas y la memoria. Maneja loops, errores y la secuencia de operaciones.

## Ejemplo simple

```
1. Usuario pide: "Busca el clima en Madrid y guardalo en un archivo"
2. Agente planifica: (a) buscar clima via API, (b) escribir archivo
3. Ejecuta tool de clima → obtiene datos
4. Ejecuta tool de archivos → guarda resultado
5. Responde al usuario con el resultado
```

## Diferencias clave

| Caracteristica | Chatbot tradicional | Agente de IA |
|---|---|---|
| Autonomia | Baja (responde solo lo que se le pide) | Alta (toma iniciativas) |
| Uso de herramientas | Limitado o nulo | Multiples herramientas |
| Memoria | Ventana de contexto | Corto y largo plazo |
| Razonamiento | Lineal | Multi-paso, reflexivo |
