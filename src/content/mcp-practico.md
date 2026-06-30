# Uso Practico de MCPs

Esta guia cubre el uso real de servidores MCP en proyectos de desarrollo con IA, incluyendo la integracion con Context7 y otros proveedores.

## Context7 como Servidor MCP

**Context7** es un servicio que proporciona documentacion actualizada de librerias y frameworks a traves de MCP. Permite a un agente de IA consultar documentacion oficial en tiempo real sin depender de datos de entrenamiento.

### Configuracion

Para usar Context7 como servidor MCP, se configura en el archivo de configuracion del agente:

```json
{
  "mcpServers": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "env": {
        "CONTEXT7_API_KEY": "tu-api-key"
      }
    }
  }
}
```

Sin API key, Context7 funciona en modo gratuito con rate limiting.

### Uso tipico

Un agente usa Context7 para:

1. **Consultar documentacion de APIs** — "Como se usa `useEffect` en React 19?"
2. **Resolver dudas de configuracion** — "Cual es la sintaxis de Tailwind para un grid responsive?"
3. **Obtener ejemplos actualizados** — "Muestrame un ejemplo de server actions en Next.js"

### Flujo de trabajo

```
1. Desarrollador pregunta al agente
2. Agente identifica que necesita documentacion actualizada
3. Agente llama a la herramienta context7_query-docs
4. Context7 devuelve la documentacion relevante
5. Agente sintetiza la respuesta con la documentacion obtenida
```

## Integracion con herramientas de desarrollo

### MCP en OpenCode

OpenCode soporta servidores MCP configurados en `opencode.json`. Cada servidor expone herramientas que el agente de OpenCode puede usar durante el desarrollo.

```json
{
  "mcpServers": {
    "mi-servidor": {
      "type": "stdio",
      "command": "node",
      "args": ["mi-servidor-mcp/index.js"]
    }
  }
}
```

### MCP en IDEs

Editores como VS Code y JetBrains estan adoptando MCP como estandar para plugins de IA. Un servidor MCP puede exponer herramientas como:

- Leer y escribir archivos del proyecto
- Ejecutar comandos de build/test
- Buscar en la base de codigo
- Consultar documentacion interna

## Construyendo tu propio ecosistema MCP

### Arquitectura recomendada

```
Agente Principal (OpenCode / Claude Desktop)
       |
       |--- Servidor MCP: Documentacion (Context7)
       |--- Servidor MCP: Base de datos interna
       |--- Servidor MCP: APIs de terceros
       |--- Servidor MCP: Herramientas de desarrollo
```

### Pasos para integrar

1. **Identifica las capacidades** que necesita tu agente (busqueda, archivos, APIs).
2. **Implementa o encuentra servidores MCP** que expongan esas capacidades.
3. **Configura los servidores** en tu agente.
4. **Prueba el flujo** completo con casos de uso reales.
5. **Monitorea el uso** de cada servidor para optimizar.

## Ejemplo: Asistente de desarrollo con MCPs

```typescript
// Configuracion de un agente que usa multiples MCPs
const agente = new Agente({
  mcpServers: [
    {
      name: 'docs',
      transport: new UrlTransport('https://mcp.context7.com/mcp'),
    },
    {
      name: 'proyecto',
      transport: new StdioTransport('node', ['servidor-proyecto/index.js']),
    },
  ],
  tools: [
    'docs.buscar_documentacion',
    'proyecto.leer_archivo',
    'proyecto.ejecutar_test',
  ],
})
```

## Recursos adicionales

- [Model Context Protocol Spec](https://modelcontextprotocol.io)
- [Context7 Documentation](https://context7.com)
- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
