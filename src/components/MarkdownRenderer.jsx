import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Check, Copy } from 'lucide-react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="p-1.5 rounded text-ink-secondary/30 hover:text-ink-primary hover:bg-surface-hover transition-all shrink-0"
      aria-label="Copiar codigo"
    >
      {copied ? <Check size={12} className="text-accent-gold" /> : <Copy size={12} />}
    </button>
  )
}

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="wiki-heading text-display mb-6 mt-0 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="wiki-heading text-2xl mt-10 mb-4 pb-2 border-b border-line/40">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="wiki-heading text-lg mt-8 mb-3">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-base leading-7 text-ink-secondary mb-5">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a href={href} className="wiki-link" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener' : undefined}>
            {children}
          </a>
        ),
        code: ({ inline, children }) =>
          inline ? (
            <code className="wiki-code">{children}</code>
          ) : (
            <CodeBlock code={String(children)} />
          ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-5 space-y-1.5 text-ink-secondary leading-7">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-ink-secondary leading-7">
            {children}
          </ol>
        ),
        li: ({ children }) => <li>{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="wiki-blockquote mb-6">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="border-line/40 my-10" />
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-ink-primary">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-ink-primary/90">{children}</em>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="border-b border-line/60">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="text-left font-medium text-ink-primary py-2 px-3">{children}</th>
        ),
        td: ({ children }) => (
          <td className="text-ink-secondary py-2 px-3 border-t border-line/30">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

function CodeBlock({ code }) {
  return (
    <div className="group bg-[#0D0F14] rounded-xl border border-line/60 mb-6 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-line/40 bg-page-deep/50">
        <span className="text-[0.55rem] text-ink-secondary/30 font-mono uppercase tracking-wider">Codigo</span>
        <CopyButton text={code} />
      </div>
      <pre className="px-4 py-3.5 text-sm text-[#D4D0C8] font-mono leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
