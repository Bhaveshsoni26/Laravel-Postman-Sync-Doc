import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../lib/theme.jsx'
import { Logo } from './ui.jsx'
import { searchIndex } from '../data/docs.js'

const GITHUB = 'https://github.com/Bhaveshsoni26/Laravel-Postman-Sync'
const PACKAGIST = 'https://packagist.org/packages/bhaveshsoni26/laravel-postman-sync'
const ACCENTS = { emerald: '16 185 129', teal: '20 184 166', blue: '59 130 246', violet: '139 92 246', orange: '249 115 22' }

function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div ref={ref} className="h-full origin-left bg-gradient-to-r from-accent to-accent2" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

function Nav({ onSearch }) {
  const { mode, accent, toggle, setAccent } = useTheme()
  const [pick, setPick] = useState(false)
  const { pathname } = useLocation()
  const isChangelog = pathname === '/docs/changelog'
  const isDocs = pathname.startsWith('/docs') && !isChangelog
  const linkBase = 'rounded-lg px-3 py-2 text-sm font-500 transition'
  const cls = (active) => linkBase + (active ? ' text-accent' : ' text-muted hover:text-ink')
  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-canvas/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <span className="font-display text-[0.95rem] font-600 tracking-tight text-ink">Laravel Postman Sync</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/docs/introduction" className={cls(isDocs)}>Docs</Link>
          <Link to="/docs/changelog" className={cls(isChangelog)}>Changelog</Link>
          <a href={GITHUB} className={cls(false)}>GitHub</a>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onSearch} className="hidden items-center gap-2 rounded-lg border border-hairline bg-surface px-3 py-1.5 text-sm text-faint transition hover:border-accent/40 hover:text-muted sm:flex">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <span>Search</span>
            <kbd className="font-mono text-[0.7rem] rounded border border-hairline px-1.5 py-0.5">⌘K</kbd>
          </button>
          <div className="relative">
            <button onClick={() => setPick((v) => !v)} aria-label="Accent color" className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface transition hover:border-accent/40">
              <span className="h-4 w-4 rounded-full bg-gradient-to-br from-accent to-accent2" />
            </button>
            {pick && (
              <div onMouseLeave={() => setPick(false)} className="absolute right-0 mt-2 flex gap-1.5 rounded-xl border border-hairline bg-raised p-2 shadow-2xl">
                {Object.entries(ACCENTS).map(([name, rgb]) => (
                  <button key={name} onClick={() => { setAccent(name); setPick(false) }} aria-label={name}
                    className={'h-6 w-6 rounded-full ring-2 transition hover:scale-110 ' + (accent === name ? 'ring-white/70' : 'ring-transparent')}
                    style={{ background: `rgb(${rgb})` }} />
                ))}
              </div>
            )}
          </div>
          <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface text-muted transition hover:border-accent/40 hover:text-ink">
            {mode === 'dark'
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>}
          </button>
        </div>
      </div>
    </nav>
  )
}

function Palette({ open, setOpen }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { toggle } = useTheme()

  useEffect(() => { if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 30) } }, [open])

  const results = (() => {
    const s = q.trim().toLowerCase()
    const list = s ? searchIndex.filter((i) => (i.title + ' ' + i.section).toLowerCase().includes(s)) : searchIndex.slice(0, 8)
    return list.slice(0, 8)
  })()

  const go = (item) => {
    setOpen(false)
    if (item.path.includes('#')) { navigate('/'); setTimeout(() => document.querySelector(item.path.slice(item.path.indexOf('#')))?.scrollIntoView({ behavior: 'smooth' }), 60) }
    else navigate(item.path)
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="absolute left-1/2 top-24 w-[92%] max-w-xl -translate-x-1/2">
        <div className="overflow-hidden rounded-2xl border border-hairline bg-raised shadow-2xl">
          <div className="flex items-center gap-3 border-b border-hairline px-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-faint"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setActive(0) }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
                if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
                if (e.key === 'Enter') { e.preventDefault(); results[active] && go(results[active]) }
              }}
              type="text" placeholder="Search the docs…" autoComplete="off"
              className="no-ring w-full bg-transparent py-3.5 text-sm text-ink placeholder:text-faint" />
            <kbd className="font-mono text-[0.68rem] rounded border border-hairline px-1.5 py-0.5 text-faint">esc</kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((item, i) => (
              <button key={item.path} onMouseEnter={() => setActive(i)} onClick={() => go(item)}
                className={'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm ' + (active === i ? 'bg-accent/12 text-ink' : 'text-muted')}>
                <span className="flex items-center gap-2.5">
                  <span className="font-mono text-[0.68rem] text-faint">{item.type === 'doc' ? 'doc' : '#'}</span>
                  <span>{item.title}</span>
                </span>
                <span className="font-mono text-[0.68rem] text-faint">{item.section}</span>
              </button>
            ))}
            {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-faint">No results.</p>}
          </div>
          <div className="flex items-center gap-4 border-t border-hairline px-4 py-2.5 text-xs text-faint">
            <a href={GITHUB} className="hover:text-muted">Open GitHub ↗</a>
            <a href={PACKAGIST} className="hover:text-muted">Open Packagist ↗</a>
            <button onClick={toggle} className="hover:text-muted">Toggle theme</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  const link = 'transition hover:text-ink'
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5"><Logo className="h-8 w-8" /><span className="font-display text-[0.95rem] font-600 text-ink">Laravel Postman Sync</span></div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">Generate and sync Postman collections straight from your Laravel routes — no manual upkeep.</p>
            <p className="mt-5 font-mono text-xs text-faint">composer require bhaveshsoni26/laravel-postman-sync</p>
          </div>
          <div>
            <h4 className="eyebrow mb-3">documentation</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link to="/docs/introduction" className={link}>Introduction</Link></li>
              <li><Link to="/docs/installation" className={link}>Installation</Link></li>
              <li><Link to="/docs/configuration" className={link}>Configuration</Link></li>
              <li><Link to="/docs/commands" className={link}>Commands</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3">resources</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link to="/docs/examples" className={link}>Examples</Link></li>
              <li><Link to="/docs/ci-cd" className={link}>CI / CD</Link></li>
              <li><Link to="/docs/faq" className={link}>FAQ</Link></li>
              <li><Link to="/docs/changelog" className={link}>Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3">project</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a href={GITHUB} className={link}>GitHub</a></li>
              <li><a href={PACKAGIST} className={link}>Packagist</a></li>
              <li><a href={GITHUB + '/issues'} className={link}>Report an issue</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 text-sm text-faint sm:flex-row">
          <p>Built for the Laravel community. MIT licensed.</p>
          <p className="font-mono text-xs">Laravel 10 · 11 · 12 — PHP 8.2+</p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  useEffect(() => {
    const on = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPaletteOpen((v) => !v) }
      if (e.key === 'Escape') setPaletteOpen(false)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])
  return (
    <>
      <ScrollProgress />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:left-4 focus:top-4 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <Nav onSearch={() => setPaletteOpen(true)} />
      <main id="main">{children}</main>
      <Footer />
      <Palette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  )
}
