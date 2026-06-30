# MCP — Model Context Protocol

**MCP** (Model Context Protocol) es un protocolo abierto estandarizado por Anthropic que define como los agentes de IA descubren e interactuan con herramientas y recursos externos.

## Por que MCP

Antes de MCP, cada agente implementaba su propia forma de conectar herramientas. No habia un estandar:

- Cada framework tenia su propio formato de tool definition.
- Las herramientas no eran portables entre agentes.
- No habia descubrimiento automatico de capacidades.

MCP resuelve esto definiendo una interfaz comun.

## Como funciona

MCP sigue una arquitectura **cliente-servidor**:

```
Agente (Cliente MCP)
       |
       |---> Servidor MCP (Herramienta A)
       |---> Servidor MCP (Herramienta B)
       |---> Servidor MCP (Herramienta C)
```

- El **cliente MCP** (el agente) se conecta a uno o mas servidores.
- Cada **servidor MCP** expone herramientas, recursos y capacidades.
- El cliente descubre que herramientas estan disponibles y las invoca segun necesita.

## Conceptos clave

### Herramientas (Tools)

Funciones que el agente puede ejecutar. Cada herramienta tiene un nombre, una descripcion y un esquema de parametros (JSON Schema).

### Recursos (Resources)

Datos a los que el agente puede acceder: archivos, documentos, bases de conocimiento.

### Prompts

Plantillas de instrucciones que los servidores pueden proporcionar al agente para guiar su comportamiento.

## Ejemplo de servidor MCP

```python
# Ejemplo conceptual de un servidor MCP
@mcp.tool()
def buscar_clima(ciudad: str) -> str:
    """Obtiene el clima actual de una ciudad."""
    datos = llamar_api_clima(ciudad)
    return formatear_clima(datos)
```

## Ventajas

- **Interoperabilidad** — Las herramientas funcionan con cualquier agente compatible con MCP.
- **Descubrimiento** — El agente sabe que herramientas estan disponibles sin configuracion manual.
- **Seguridad** — Cada servidor controla su propio acceso y permisos.
- **Estandar abierto** — Cualquiera puede implementar un servidor MCP.
