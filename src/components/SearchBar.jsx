import { useState, useRef, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'
import { Search, ChevronRight } from 'lucide-react'
import { PAGE_INDEX } from '../data/pages'

const fuse = new Fuse(PAGE_INDEX, {
  keys: ['title', 'category', 'keywords'],
  threshold: 0.4,
  includeScore: true,
})

export default function SearchBar({ onNavigate }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const wrapRef = useRef(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query.trim()).slice(0, 6).map(r => r.item)
  }, [query])

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus() }, [open])

  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    function handleClick(e) { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(slug) { onNavigate(slug); setOpen(false); setQuery('') }

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen(true)}
        className="topbar-btn flex items-center gap-2 w-full text-xs"
        aria-label="Buscar (Ctrl+K)"
      >
        <Search size={14} />
        <span className="text-ink-secondary/50">Buscar...</span>
        <span className="ml-auto text-[0.55rem] text-ink-secondary/25 border border-line/50 rounded px-1.5 py-0.5 leading-none">
          Ctrl+K
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg bg-page-card border border-line/80 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-line/60">
              <Search size={16} className="text-ink-secondary/40 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar paginas..."
                className="flex-1 bg-transparent text-sm text-ink-primary placeholder:text-ink-secondary/25 outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-[0.55rem] text-ink-secondary/30 border border-line/50 rounded px-1.5 py-0.5 leading-none hover:text-ink-secondary"
              >
                ESC
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {results.length > 0 ? (
                <ul>
                  {results.map((page) => (
                    <li key={page.slug}>
                      <button
                        onClick={() => handleSelect(page.slug)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-surface-hover transition-colors"
                      >
                        <div>
                          <div className="text-sm text-ink-primary">{page.title}</div>
                          <div className="text-[0.6rem] text-ink-secondary/40">{page.category}</div>
                        </div>
                        <ChevronRight size={14} className="text-ink-secondary/20" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : query.trim() ? (
                <div className="px-4 py-6 text-center text-sm text-ink-secondary/40">
                  Sin resultados para <span className="text-ink-secondary">&ldquo;{query}&rdquo;</span>
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-sm text-ink-secondary/30">
                  Escribe para buscar paginas
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
