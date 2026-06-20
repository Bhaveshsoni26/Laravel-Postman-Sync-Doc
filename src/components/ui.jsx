import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import hljs from 'highlight.js/lib/core'
import php from 'highlight.js/lib/languages/php'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('php', php)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)

export function Logo({ className = 'h-8 w-8' }) {
  return (
    <span className={'grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-[#04140f] shadow-lg shadow-accent/30 ' + className}>
      <svg viewBox="0 0 24 24" width="62%" height="62%" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.5 5C8 5 8 6.5 8 8c0 1.5-.6 3-2 4 1.4 1 2 2.5 2 4 0 1.5 0 3 1.5 3" />
        <path d="M14.5 5C16 5 16 6.5 16 8c0 1.5.6 3 2 4-1.4 1-2 2.5-2 4 0 1.5 0 3-1.5 3" />
        <path d="M12 8.6v6.8" /><path d="M10.4 10 12 8.3 13.6 10" /><path d="M10.4 14 12 15.7 13.6 14" />
      </svg>
    </span>
  )
}

export function Button({ href, variant = 'primary', children, className = '', ...rest }) {
  const cls = 'btn ' + (variant === 'primary' ? 'btn-primary' : 'btn-ghost') + ' ' + className
  if (!href) return <button className={cls} {...rest}>{children}</button>
  // Internal routes (e.g. /docs/introduction) use the router; external links use <a>.
  const internal = href.startsWith('/') && !href.startsWith('//')
  return internal
    ? <Link to={href} className={cls} {...rest}>{children}</Link>
    : <a href={href} className={cls} {...rest}>{children}</a>
}

export function Badge({ children, className = '' }) {
  return <span className={'inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-500 text-muted ' + className}>{children}</span>
}

export function StatCard({ label, value = 0, suffix = '', display = null }) {
  return (
    <div className="surface-card surface-card-hover p-5">
      <div className="font-display text-[1.7rem] font-700 leading-none text-ink">
        {display !== null ? display : <span data-count-to={value} data-suffix={suffix}>0</span>}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  )
}

export function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      {eyebrow && <span className="eyebrow">// {eyebrow}</span>}
      <h2 className="mt-3 font-display text-[2rem] font-700 tracking-tight text-ink sm:text-[2.4rem]">{title}</h2>
      {sub && <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{sub}</p>}
    </div>
  )
}

export function CodeBlock({ language = 'bash', filename = null, code = '', className = '' }) {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)
  useEffect(() => { if (ref.current) hljs.highlightElement(ref.current) }, [code])
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  return (
    <div className={'surface-card overflow-hidden ' + className}>
      {filename && (
        <div className="flex items-center justify-between border-b border-hairline px-4 py-2">
          <span className="font-mono text-xs text-faint">{filename}</span>
          <span className="font-mono text-[0.66rem] uppercase tracking-wider text-faint">{language}</span>
        </div>
      )}
      <div className="relative">
        <button onClick={copy} aria-label="Copy code" className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-lg border border-hairline bg-raised text-faint transition hover:border-accent/40 hover:text-ink">
          {copied
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.4"><path d="m20 6-11 11-5-5" /></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>}
        </button>
        <pre className="!m-0 !rounded-none !border-0 overflow-x-auto p-4 pr-14 text-[0.82rem] leading-relaxed"><code ref={ref} className={'language-' + language}>{code}</code></pre>
      </div>
    </div>
  )
}
