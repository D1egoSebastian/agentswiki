import { useState } from 'react'
import { Rocket, Globe, Package, Terminal, Shield, Check, Copy, ArrowLeft, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    title: 'Preparar el build',
    desc: 'Compila el proyecto para produccion. Vite genera la carpeta dist/ con todos los assets optimizados.',
    code: 'npm run build',
    note: 'El output se genera en dist/. Sirve localmente con npm run preview para verificar.',
    icon: Package,
  },
  {
    id: 2,
    title: 'Elegir plataforma',
    desc: 'Selecciona donde desplegar. Cada plataforma tiene sus ventajas segun el tipo de proyecto.',
    options: [
      { name: 'Vercel', detail: 'Ideal para proyectos Vite + React. Detecta automaticamente el framework. Comando: vercel --prod' },
      { name: 'Netlify', detail: 'Similar a Vercel. Requiere archivo netlify.toml con configuracion basica.' },
      { name: 'GitHub Pages', detail: 'Gratuito, requiere GitHub Actions. El workflow ya incluido en .github/workflows/deploy.yml' },
      { name: 'Docker', detail: 'Para entornos controlados. Incluye Dockerfile en el proyecto.' },
    ],
    icon: Globe,
  },
  {
    id: 3,
    title: 'Configurar dominio',
    desc: 'Cada plataforma asigna una URL automaticamente. Opcionalmente, configura un dominio personalizado.',
    code: '# Vercel asigna: proyecto.vercel.app\n# Netlify asigna: proyecto.netlify.app\n# GitHub Pages: usuario.github.io/repo',
    note: 'Para dominio personalizado, agrega un registro CNAME en tu proveedor DNS apuntando a la plataforma.',
    icon: Globe,
  },
  {
    id: 4,
    title: 'Variables de entorno',
    desc: 'Configura las variables necesarias en produccion: API keys, URLs, configuracion del entorno.',
    code: '# Ejemplo de variables para el proyecto\nVITE_API_URL=https://api.miservicio.com\nCONTEXT7_API_KEY=tu-api-key',
    note: 'Nunca incluyas variables sensibles en el codigo. Usa el panel de configuracion de la plataforma.',
    icon: Terminal,
  },
  {
    id: 5,
    title: 'Desplegar',
    desc: 'Ejecuta el deploy. La plataforma compila y publica automaticamente.',
    code: '# Vercel\nvercel --prod\n\n# Netlify\nnetlify deploy --build --prod\n\n# GitHub Actions\n# Hace push a main y el workflow deploy.yml se ejecuta solo',
    note: 'El deploy inicial puede tomar 1-2 minutos. Deploys subsecuentes son mas rapidos por cache.',
    icon: Rocket,
  },
  {
    id: 6,
    title: 'Verificar',
    desc: 'Confirma que el sitio funciona correctamente en produccion.',
    checklist: [
      'La pagina carga correctamente en HTTPS',
      'Las rutas de navegacion funcionan (sin errores 404)',
      'Los assets estaticos se cargan (CSS, JS, imagenes)',
      'Las fuentes personalizadas se renderizan',
      'El sitio es responsive en movil y escritorio',
    ],
    icon: Shield,
  },
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="p-1 rounded text-ink-secondary/50 hover:text-ink-primary hover:bg-surface-hover transition-all shrink-0"
      aria-label="Copiar"
    >
      {copied ? <Check size={14} className="text-accent-gold" /> : <Copy size={14} />}
    </button>
  )
}

export default function DeployWizard() {
  const [step, setStep] = useState(1)
  const [copiedIndex, setCopiedIndex] = useState(null)

  const current = STEPS.find(s => s.id === step)
  const total = STEPS.length

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <Rocket size={20} className="text-accent-blue" />
        <h1 className="wiki-heading text-display">Guia de <span className="text-accent-blue">despliegue</span></h1>
      </div>
      <p className="text-base leading-7 text-ink-secondary mb-8">
        Sigue estos pasos para llevar tu proyecto a produccion. Usa las flechas para navegar entre pasos.
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s) => (
          <div key={s.id} className="flex-1 flex items-center gap-2">
            <button
              onClick={() => setStep(s.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 shrink-0 ${
                s.id === step
                  ? 'bg-accent-gold text-page-deep shadow-glow'
                  : s.id < step
                    ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30'
                    : 'bg-page-card text-ink-secondary/40 border border-line/60'
              }`}
            >
              {s.id < step ? <Check size={14} /> : s.id}
            </button>
            {s.id < total && (
              <div className={`flex-1 h-px ${s.id < step ? 'bg-accent-gold/40' : 'bg-line/40'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {current && (
        <div className="rounded-xl border border-line/60 bg-page-card p-6 animate-in-slide">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-accent-blue-dim border border-accent-blue/30 flex items-center justify-center">
              <current.icon size={18} className="text-accent-blue" />
            </div>
            <div>
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-accent-blue">
                Paso {current.id} de {total}
              </span>
              <h2 className="font-display text-xl font-semibold text-ink-primary">{current.title}</h2>
            </div>
          </div>

          <p className="text-sm text-ink-secondary leading-relaxed mb-5">{current.desc}</p>

          {/* Code block */}
          {current.code && (
            <div className="bg-page-deep rounded-lg border border-line/60 mb-5 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-line/60">
                <span className="text-[0.6rem] text-ink-secondary/50 font-mono">Terminal</span>
                <CopyButton text={current.code} />
              </div>
              <pre className="px-4 py-3 text-sm text-[#D4D0C8] font-mono leading-relaxed overflow-x-auto">{current.code}</pre>
            </div>
          )}

          {/* Options (step 2) */}
          {current.options && (
            <div className="space-y-2 mb-5">
              {current.options.map((opt) => (
                <div key={opt.name} className="bg-page-bg rounded-lg px-4 py-3 border border-line/40">
                  <h4 className="text-sm font-medium text-ink-primary mb-1">{opt.name}</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">{opt.detail}</p>
                </div>
              ))}
            </div>
          )}

          {/* Checklist (step 6) */}
          {current.checklist && (
            <div className="space-y-2 mb-5">
              {current.checklist.map((item) => (
                <label key={item} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-line/60 bg-page-deep accent-accent-gold" />
                  <span className="text-sm text-ink-secondary">{item}</span>
                </label>
              ))}
            </div>
          )}

          {/* Note */}
          {current.note && (
            <div className="bg-accent-gold-dim border border-accent-gold/20 rounded-lg px-4 py-2.5">
              <p className="text-xs text-ink-secondary leading-relaxed">
                <span className="font-medium text-accent-gold">Nota:</span> {current.note}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={14} />
          Anterior
        </button>

        <span className="text-xs text-ink-secondary/50">{step} / {total}</span>

        {step < total ? (
          <button
            onClick={() => setStep(Math.min(total, step + 1))}
            className="flex items-center gap-1.5 text-sm text-accent-gold hover:text-accent-gold-hover transition-colors font-medium"
          >
            Siguiente
            <ArrowRight size={14} />
          </button>
        ) : (
          <span className="flex items-center gap-1.5 text-sm text-accent-gold font-medium">
            <Check size={14} />
            Completado
          </span>
        )}
      </div>

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
