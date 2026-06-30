import { useState } from 'react'
import { FileText, ListChecks, ClipboardList, GitBranch, Wrench, CheckCircle2, ChevronRight } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    title: 'Constitution',
    desc: 'Define las reglas generales del proyecto. Establece el proposito, los principios y las guias que gobernaran el desarrollo.',
    icon: FileText,
    detail: 'Crea un AGENTS.md o CONSTITUTION.md con las reglas que el agente debe seguir. Incluye objetivos, restricciones y criterios de calidad.',
    color: 'text-accent-gold',
    border: 'border-accent-gold/30',
    bg: 'bg-accent-gold-dim',
  },
  {
    id: 2,
    title: 'Specify',
    desc: 'Define requerimientos y criterios de aceptacion. Cada feature debe tener una especificacion clara y medible.',
    icon: ListChecks,
    detail: 'Usa archivos spec/ para documentar cada feature: descripcion, user requirements, acceptance criteria y notas tecnicas.',
    color: 'text-accent-blue',
    border: 'border-accent-blue/30',
    bg: 'bg-accent-blue-dim',
  },
  {
    id: 3,
    title: 'Plan',
    desc: 'Disena la estrategia tecnica. Define el stack, la arquitectura, los componentes y el orden de implementacion.',
    icon: ClipboardList,
    detail: 'Antes de escribir codigo, planifica. Que herramientas usaras? Cual es la estructura de datos? Que componentes necesitas?',
    color: 'text-accent-gold',
    border: 'border-accent-gold/30',
    bg: 'bg-accent-gold-dim',
  },
  {
    id: 4,
    title: 'Tasks',
    desc: 'Divide el trabajo en pasos pequenos y verificables. Cada tarea debe ser completable en una sesion de trabajo.',
    icon: GitBranch,
    detail: 'Usa un todo list o issue tracker. Cada tarea tiene un objetivo claro, criterios de exito y una estimacion de esfuerzo.',
    color: 'text-accent-blue',
    border: 'border-accent-blue/30',
    bg: 'bg-accent-blue-dim',
  },
  {
    id: 5,
    title: 'Implement',
    desc: 'Ejecuta en modo Build o Plan. El agente escribe codigo siguiendo el plan definido, o propone soluciones en modo plan.',
    icon: Wrench,
    detail: 'El agente implementa siguiendo las tareas. Usa herramientas para escribir archivos, ejecutar tests y verificar resultados.',
    color: 'text-accent-gold',
    border: 'border-accent-gold/30',
    bg: 'bg-accent-gold-dim',
  },
  {
    id: 6,
    title: 'Verify',
    desc: 'Bucle de escribir, testear y corregir. Cada cambio se verifica automaticamente antes de continuar.',
    icon: CheckCircle2,
    detail: 'Ejecuta tests, lint, typecheck. Si algo falla, el agente debe corregirlo antes de pasar al siguiente paso.',
    color: 'text-accent-blue',
    border: 'border-accent-blue/30',
    bg: 'bg-accent-blue-dim',
  },
]

export default function SDDFlow() {
  const [active, setActive] = useState(null)

  return (
    <div>
      <h1 className="wiki-heading text-display mb-3">Metodologia <span className="text-accent-gold">SDD</span></h1>
      <p className="text-base leading-7 text-ink-secondary mb-8">
        System-Driven Development — el ciclo completo para construir sistemas con agentes de IA.
        Cada fase alimenta a la siguiente en un flujo continuo y medible.
      </p>

      {/* Flow pipeline */}
      <div className="hidden sm:flex items-stretch gap-3 mb-10 overflow-x-auto pb-2">
        {STEPS.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setActive(active === step.id ? null : step.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border min-w-[110px] flex-1 transition-all duration-200 ${
              active === step.id ? step.border + ' ' + step.bg + ' shadow-glow' : 'border-line/40 bg-page-card hover:border-accent-gold/20'
            }`}
          >
            <step.icon size={20} className={step.color} />
            <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-ink-secondary text-center leading-tight">
              {step.title}
            </span>
            {i < STEPS.length - 1 && (
              <ChevronRight size={12} className="text-ink-secondary/20 absolute -right-4 top-1/2 -translate-y-1/2 hidden sm:block" />
            )}
          </button>
        ))}
      </div>

      {/* Mobile: vertical list */}
      <div className="sm:hidden space-y-1 mb-8">
        {STEPS.map((step) => (
          <button
            key={step.id}
            onClick={() => setActive(active === step.id ? null : step.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
              active === step.id ? step.bg + ' ' + step.border : 'hover:bg-surface-hover'
            }`}
          >
            <step.icon size={16} className={`shrink-0 ${step.color}`} />
            <span className="text-sm font-medium text-ink-primary">{step.title}</span>
            <ChevronRight size={14} className={`ml-auto text-ink-secondary/30 transition-transform ${active === step.id ? 'rotate-90' : ''}`} />
          </button>
        ))}
      </div>

      {/* Active step detail */}
      {active && (
        <div className="rounded-xl border border-line/60 bg-page-card p-5 sm:p-6 animate-in-slide">
          {(() => {
            const step = STEPS.find(s => s.id === active)
            if (!step) return null
            return (
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-lg ${step.bg} border ${step.border} flex items-center justify-center shrink-0`}>
                  <step.icon size={18} className={step.color} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[0.6rem] font-semibold uppercase tracking-widest ${step.color}`}>
                      Paso {step.id} de {STEPS.length}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed mb-3">{step.desc}</p>
                  <div className="bg-page-bg rounded-lg px-3 py-2.5 border border-line/40">
                    <p className="text-xs text-ink-secondary leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {!active && (
        <div className="text-center py-8">
          <p className="text-sm text-ink-secondary/50">Haz clic en cualquier fase del ciclo SDD para ver los detalles</p>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in-slide {
          animation: slide-in 0.25s ease-out;
        }
      `}</style>
    </div>
  )
}
