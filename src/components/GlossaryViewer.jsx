import { useState, useMemo } from 'react'
import { Search, ChevronDown, BookMarked } from 'lucide-react'
import { GLOSSARY } from '../data/glossary'

export default function GlossaryViewer() {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return GLOSSARY
    const q = query.toLowerCase()
    return GLOSSARY.filter(
      (g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <BookMarked size={20} className="text-accent-gold" />
        <h1 className="wiki-heading text-display">Glosario de <span className="text-accent-gold">terminos</span></h1>
      </div>
      <p className="text-base leading-7 text-ink-secondary mb-6">
        Terminos clave de agentes de IA, MCP y desarrollo con modelos de lenguaje.
        Haz clic en un termino para ver su definicion completa.
      </p>

      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrar terminos..."
          className="w-full bg-page-card border border-line/60 rounded-xl pl-9 pr-3 py-2.5 text-sm text-ink-primary placeholder:text-ink-secondary/25 outline-none focus:border-accent-gold/50 transition-colors"
        />
      </div>

      <div className="space-y-0.5">
        {filtered.map((entry) => (
          <div key={entry.term} className="rounded-xl overflow-hidden border border-transparent hover:border-line/40 transition-colors">
            <button
              onClick={() => setExpanded(expanded === entry.term ? null : entry.term)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-surface-hover transition-colors text-left"
            >
              <span className="text-sm font-medium text-ink-primary">{entry.term}</span>
              <ChevronDown
                size={14}
                className={`shrink-0 text-ink-secondary/30 transition-transform duration-200 ${
                  expanded === entry.term ? 'rotate-180 text-accent-gold' : ''
                }`}
              />
            </button>
            {expanded === entry.term && (
              <div className="px-4 pb-4 text-sm text-ink-secondary leading-6 pl-5 border-l-2 border-accent-gold/30 ml-4 mr-4">
                {entry.definition}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-ink-secondary/40 text-center py-8">
          Ningun termino coincide con <span className="text-ink-secondary">&ldquo;{query}&rdquo;</span>
        </p>
      )}
    </div>
  )
}
