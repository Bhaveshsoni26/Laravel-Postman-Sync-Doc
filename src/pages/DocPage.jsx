import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { docsSections, getDoc } from '../data/docs.js'

function Sidebar({ current }) {
  return (
    <nav className="space-y-7 text-sm" aria-label="Documentation">
      {docsSections.map((section) => (
        <div key={section.title}>
          <p className="mb-2.5 font-mono text-[0.68rem] uppercase tracking-wider text-faint">{section.title}</p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = item.slug === current
              return (
                <li key={item.slug}>
                  <Link to={'/docs/' + item.slug} aria-current={active ? 'page' : undefined}
                    className={'block rounded-lg px-3 py-1.5 transition ' + (active ? 'bg-accent/12 font-500 text-accent' : 'text-muted hover:bg-surface hover:text-ink')}>
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function Toc({ headings, active }) {
  if (!headings.length) return null
  return (
    <div className="sticky top-24 py-10">
      <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-faint">On this page</p>
      <ul className="space-y-1.5 border-l border-hairline text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={'#' + h.id} className={'-ml-px block border-l py-0.5 transition ' + (h.level === 3 ? 'pl-6' : 'pl-4') + ' ' + (active === h.id ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink')}>{h.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DocPage() {
  const { slug } = useParams()
  const doc = useMemo(() => getDoc(slug), [slug])
  const [headings, setHeadings] = useState([])
  const [active, setActive] = useState('')
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    if (!doc) return
    document.title = doc.title + ' — Laravel Postman Sync'
    window.scrollTo(0, 0)
    // collect headings after markdown render
    const id = setTimeout(() => {
      const els = [...document.querySelectorAll('.prose h2[id], .prose h3[id]')]
      setHeadings(els.map((el) => ({ id: el.id, text: el.textContent, level: el.tagName === 'H3' ? 3 : 2 })))
      const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }), { rootMargin: '-10% 0px -75% 0px' })
      els.forEach((el) => io.observe(el))
    }, 50)
    return () => clearTimeout(id)
  }, [doc, slug])

  if (!doc) return <Navigate to="/docs/introduction" replace />

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="flex items-center justify-between border-b border-hairline py-3 lg:hidden">
        <nav className="flex items-center gap-2 font-mono text-xs text-faint"><Link to="/docs/introduction" className="hover:text-muted">Docs</Link><span>/</span><span className="text-accent">{doc.title}</span></nav>
        <button onClick={() => setMenu((v) => !v)} className="rounded-lg border border-hairline bg-surface px-3 py-1.5 text-sm text-muted">Menu</button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[15rem_minmax(0,1fr)_13rem]">
        <aside className={'lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:py-10 ' + (menu ? 'block' : 'hidden lg:block')}>
          <Sidebar current={slug} />
        </aside>

        <article className="min-w-0 py-10">
          <nav className="hidden items-center gap-2 font-mono text-xs text-faint lg:flex"><Link to="/docs/introduction" className="hover:text-muted">Docs</Link><span>/</span><span className="text-muted">{doc.section}</span><span>/</span><span className="text-accent">{doc.title}</span></nav>
          <div className="prose mt-5 max-w-none">
            <h1>{doc.title}</h1>
            {doc.description && <p className="!text-[1.05rem] !text-muted">{doc.description}</p>}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, [rehypeHighlight, { ignoreMissing: true }]]}
              components={{ table: ({ node, ...props }) => <div className="overflow-x-auto"><table {...props} /></div> }}
            >{doc.body}</ReactMarkdown>
          </div>

          {(doc.prev || doc.next) && (
            <div className="mt-16 grid gap-4 border-t border-hairline pt-8 sm:grid-cols-2">
              {doc.prev ? <Link to={'/docs/' + doc.prev.slug} className="surface-card surface-card-hover group p-4"><span className="font-mono text-xs text-faint">← Previous</span><div className="mt-1 font-display font-600 text-ink transition group-hover:text-accent">{doc.prev.title}</div></Link> : <span />}
              {doc.next && <Link to={'/docs/' + doc.next.slug} className="surface-card surface-card-hover group p-4 text-right"><span className="font-mono text-xs text-faint">Next →</span><div className="mt-1 font-display font-600 text-ink transition group-hover:text-accent">{doc.next.title}</div></Link>}
            </div>
          )}
        </article>

        <aside className="hidden lg:block"><Toc headings={headings} active={active} /></aside>
      </div>
    </div>
  )
}
