# Implementacion de un Servidor MCP

MCP (Model Context Protocol) usa una arquitectura cliente-servidor. Esta guia explica como implementar un servidor MCP desde cero.

## Estructura basica

Un servidor MCP expone tres tipos de capacidades:

- **Herramientas (Tools)** — Funciones que el agente puede invocar.
- **Recursos (Resources)** — Datos a los que el agente puede acceder.
- **Prompts** — Plantillas de instrucciones para el agente.

## Implementacion con TypeScript

### 1. Instalacion

```bash
npm install @modelcontextprotocol/sdk
```

### 2. Servidor minimo

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const server = new Server(
  {
    name: 'mi-servidor-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
)

// Iniciar el servidor
const transport = new StdioServerTransport()
await server.connect(transport)
```

### 3. Definir una herramienta

```typescript
import { z } from 'zod'

server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'buscar_clima',
      description: 'Obtiene el clima actual de una ciudad',
      inputSchema: {
        type: 'object',
        properties: {
          ciudad: {
            type: 'string',
            description: 'Nombre de la ciudad',
          },
        },
        required: ['ciudad'],
      },
    },
  ],
}))

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'buscar_clima') {
    const ciudad = request.params.arguments?.ciudad
    // Logica para buscar el clima
    const resultado = await buscarClima(ciudad)
    return {
      content: [{ type: 'text', text: JSON.stringify(resultado) }],
    }
  }
  throw new Error('Herramienta no encontrada')
})
```

### 4. Exponer un recurso

```typescript
server.setRequestHandler('resources/list', async () => ({
  resources: [
    {
      uri: 'docs://manual',
      name: 'Manual de usuario',
      mimeType: 'text/markdown',
    },
  ],
}))

server.setRequestHandler('resources/read', async (request) => {
  if (request.params.uri === 'docs://manual') {
    return {
      contents: [
        {
          uri: 'docs://manual',
          mimeType: 'text/markdown',
          text: '# Manual de usuario\n\nBienvenido al sistema...',
        },
      ],
    }
  }
  throw new Error('Recurso no encontrado')
})
```

## Implementacion con Python

```python
from mcp import Server, Tool

server = Server("mi-servidor")

@server.tool()
def buscar_clima(ciudad: str) -> str:
    """Obtiene el clima actual de una ciudad."""
    import requests
    respuesta = requests.get(f"https://api.clima/{ciudad}")
    return respuesta.text
```

## Conexion desde un agente

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js'

const client = new Client(
  { name: 'mi-agente', version: '1.0.0' },
  { capabilities: {} }
)

// Conectar al servidor
await client.connect(transport)

// Listar herramientas disponibles
const herramientas = await client.listTools()

// Invocar una herramienta
const resultado = await client.callTool({
  name: 'buscar_clima',
  arguments: { ciudad: 'Madrid' },
})
```

## Buenas practicas

- **Validacion de entrada** — Usa esquemas (Zod, Pydantic) para validar parametros.
- **Manejo de errores** — Devuelve errores descriptivos cuando algo falla.
- **Documentacion** — Cada herramienta debe tener descripcion clara en lenguaje natural.
- **Timeout** — Implementa tiempos de espera para evitar que el agente se cuelgue.
- **Logging** — Registra las llamadas a herramientas para depuracion.
