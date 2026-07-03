import { useState, useEffect } from 'react'
import { BookOpen, Network, Cpu, BookMarked, Rocket, ChevronRight, Zap, Link, ArrowUpRight } from 'lucide-react'
import MarkdownRenderer from './components/MarkdownRenderer'
import SearchBar from './components/SearchBar'
import GlossaryViewer from './components/GlossaryViewer'
import SDDFlow from './components/SDDFlow'
import DeployWizard from './components/DeployWizard'

const NAV = [
  {
    section: 'Conocimiento',
    items: [
      { label: 'Inicio', slug: 'index', icon: BookOpen },
    ],
    subs: [
      {
        category: 'Agentes de IA',
        icon: Cpu,
        items: [
          { label: 'Que es un agente', slug: 'agentes' },
          { label: 'Arquitectura', slug: 'arquitectura' },
          { label: 'Componentes', slug: 'componentes' },
        ],
      },
      {
        category: 'MCP',
        icon: Network,
        items: [
          { label: 'Introduccion', slug: 'mcp-intro' },
          { label: 'Implementacion', slug: 'mcp-implementacion' },
          { label: 'Uso practico', slug: 'mcp-practico' },
        ],
      },
      {
        category: 'Metodologia',
        icon: BookMarked,
        items: [
          { label: 'Flujo SDD', slug: 'sdd-guia' },
          { label: 'Buenas Practicas', slug: 'buenas-practicas' },
        ],
      },
      {
        category: 'Referencia',
        icon: BookMarked,
        items: [
          { label: 'Glosario', slug: 'glosario' },
        ],
      },
    ],
  },
  {
    section: 'Despliegue',
    items: [
      { label: 'Guia paso a paso', slug: 'deploy', icon: Rocket },
    ],
    subs: [],
  },
  {
    section: 'Recursos',
    items: [
      { label: 'Skills y MCPs', slug: 'mcp-practico', icon: Zap },
    ],
    subs: [],
  },
]

const pages = import.meta.glob('./content/*.md', { query: '?raw', import: 'default', eager: false })

export default function App() {
  const [currentSlug, setCurrentSlug] = useState('index')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const isDeploySection = currentSlug === 'deploy'
  const isHome = currentSlug === 'index'

  return (
    <div className="flex min-h-screen bg-page-deep">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-page-card border-r border-line/60
          transform transition-transform duration-200 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="px-5 py-5 border-b border-line/60">
            <h1 className="text-base font-display font-semibold tracking-tight text-ink-primary flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent-gold shadow-glow" />
              Agent Atlas
            </h1>
            <p className="text-[0.65rem] text-ink-secondary/60 mt-1 tracking-wider uppercase font-medium">
              Guia Operativa E2E
            </p>
          </div>

          <div className="px-3 py-3 border-b border-line/40">
            <SearchBar onNavigate={(slug) => { setCurrentSlug(slug); setSidebarOpen(false) }} />
          </div>

          <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-5">
            {NAV.map((group) => (
              <div key={group.section}>
                <div className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-ink-secondary/40 px-2 mb-1.5">
                  {group.section}
                </div>

                {/* Direct section items */}
                <ul className="space-y-0.5 mb-1">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <button
                        onClick={() => { setCurrentSlug(item.slug); setSidebarOpen(false) }}
                        className={
                          currentSlug === item.slug
                            ? 'sidebar-item-active flex items-center gap-2.5'
                            : 'sidebar-item-inactive flex items-center gap-2.5'
                        }
                      >
                        <item.icon size={14} className="shrink-0 opacity-60" />
                        <span className="flex items-center justify-between flex-1">
                          {item.label}
                          {currentSlug === item.slug && (
                            <ChevronRight size={14} className="text-accent-gold shrink-0" />
                          )}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Sub-categories */}
                {group.subs.length > 0 && (
                  <div className="space-y-3 ml-0">
                    {group.subs.map((sub) => (
                      <div key={sub.category}>
                        <div className="flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-widest text-ink-secondary/30 mb-1 px-2.5">
                          <sub.icon size={10} />
                          {sub.category}
                        </div>
                        <ul className="space-y-0.5">
                          {sub.items.map((item) => (
                            <li key={item.slug}>
                              <button
                                onClick={() => { setCurrentSlug(item.slug); setSidebarOpen(false) }}
                                className={
                                  currentSlug === item.slug
                                    ? 'sidebar-item-active'
                                    : 'sidebar-item-inactive'
                                }
                              >
                                <span className="flex items-center justify-between">
                                  {item.label}
                                  {currentSlug === item.slug && (
                                    <ChevronRight size={14} className="text-accent-gold shrink-0" />
                                  )}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-page-deep/80 backdrop-blur-sm border-b border-line/40 lg:hidden">
          <div className="flex items-center gap-3 px-4 h-12">
            <button
              onClick={() => setSidebarOpen(true)}
              className="topbar-btn"
              aria-label="Abrir menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="5" x2="17" y2="5" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="15" x2="17" y2="15" />
              </svg>
            </button>
            <span className="text-sm font-display font-semibold text-ink-primary">Agent Atlas</span>
          </div>
        </header>

        <main className="flex-1">
          {isHome ? (
            <HomePage onNavigate={(slug) => setCurrentSlug(slug)} />
          ) : (
            <div className="px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
              <ContentPage slug={currentSlug} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function HomePage({ onNavigate }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-nexus-glow pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-nexus-blue pointer-events-none" />

      <div className={`flex-1 flex flex-col items-center justify-center px-5 py-16 sm:px-8 relative z-10 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero */}
        <div className="text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold-dim border border-accent-gold/20 text-accent-gold text-[0.65rem] font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
            Guia Operativa E2E
          </div>
          <h1 className="font-display text-hero-mobile sm:text-hero text-ink-primary mb-4">
            Agent <span className="text-accent-gold">Atlas</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-secondary max-w-lg mx-auto leading-relaxed">
            Aprende a construir sistemas con agentes de IA desde cero.
            Del concepto al despliegue, pasando por MCP, SDD y herramientas practicas.
          </p>
        </div>

        {/* Nexus flow diagram */}
        <div className="w-full max-w-2xl mt-12 mb-10">
          <NexusFlow />
        </div>

        {/* Portal cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-2xl">
          <button onClick={() => onNavigate('agentes')} className="nexus-card group text-left">
            <div className="flex items-center gap-2 text-accent-gold mb-3">
              <BookOpen size={18} />
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest">Conocimiento</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-ink-primary mb-2">
              Aprende la teoria
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Agentes de IA, arquitectura, MCP, metodologia SDD con flujo visual y glosario interactivo.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-gold group-hover:gap-1.5 transition-all">
              Explorar <ArrowUpRight size={12} />
            </span>
          </button>

          <button onClick={() => onNavigate('deploy')} className="nexus-card group text-left">
            <div className="flex items-center gap-2 text-accent-blue mb-3">
              <Rocket size={18} />
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest">Despliegue</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-ink-primary mb-2">
              Ponlo en produccion
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Guia paso a paso para desplegar tu software con IA: Vercel, GitHub Pages, Docker y CI/CD.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue group-hover:gap-1.5 transition-all">
              Comenzar <ArrowUpRight size={12} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

function NexusFlow() {
  const nodes = [
    { label: 'Agentes', slug: 'agentes', color: 'text-accent-gold', border: 'border-accent-gold/40' },
    { label: 'MCP', slug: 'mcp-intro', color: 'text-accent-blue', border: 'border-accent-blue/40' },
    { label: 'SDD', slug: 'sdd-guia', color: 'text-accent-gold', border: 'border-accent-gold/40' },
    { label: 'Deploy', slug: 'deploy', color: 'text-accent-blue', border: 'border-accent-blue/40' },
  ]

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex items-center gap-1 sm:gap-2">
          <div className={`flow-node-inactive ${node.color} ${node.border} px-2 sm:px-3 py-2 sm:py-3`}>
            <span className="text-[0.55rem] sm:text-[0.6rem] font-semibold uppercase tracking-wider whitespace-nowrap">
              {node.label}
            </span>
          </div>
          {i < nodes.length - 1 && (
            <ChevronRight size={14} className="text-ink-secondary/30 shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}

function ContentPage({ slug }) {
  if (slug === 'glosario') {
    return (
      <div className="max-w-content mx-auto">
        <GlossaryViewer />
      </div>
    )
  }

  if (slug === 'sdd-guia') {
    return (
      <div className="max-w-content mx-auto">
        <SDDFlow />
      </div>
    )
  }

  if (slug === 'deploy') {
    return (
      <div className="max-w-content mx-auto">
        <DeployWizard />
      </div>
    )
  }

  return <MarkdownPage slug={slug} />
}

function MarkdownPage({ slug }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setContent(null)

    const path = `./content/${slug}.md`
    const loader = pages[path]

    if (loader) {
      loader().then((mod) => {
        if (!cancelled) { setContent(mod); setLoading(false) }
      })
    } else {
      setContent('# Pagina no encontrada\n\nEl contenido solicitado no esta disponible.')
      setLoading(false)
    }

    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return <div className="max-w-content mx-auto"><p className="text-ink-secondary">Cargando...</p></div>
  }

  return (
    <article className="max-w-content mx-auto">
      <MarkdownRenderer content={content} />
    </article>
  )
}
