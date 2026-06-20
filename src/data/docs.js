export const docsSections = [
  { title: 'Getting Started', items: [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'installation', title: 'Installation' },
    { slug: 'configuration', title: 'Configuration' },
  ] },
  { title: 'Usage', items: [
    { slug: 'commands', title: 'Commands' },
    { slug: 'authentication', title: 'Authentication & Tokens' },
    { slug: 'folder-structure', title: 'Folder Structure' },
  ] },
  { title: 'Syncing', items: [
    { slug: 'push-and-merge', title: 'Push & Incremental Merge' },
    { slug: 'docs-and-openapi', title: 'Docs & OpenAPI' },
    { slug: 'test-scripts', title: 'Test Scripts' },
  ] },
  { title: 'Reference', items: [
    { slug: 'examples', title: 'Examples' },
    { slug: 'ci-cd', title: 'CI / CD' },
    { slug: 'faq', title: 'FAQ' },
    { slug: 'changelog', title: 'Changelog' },
  ] },
]

export const docsFlat = docsSections.flatMap((s) => s.items.map((i) => ({ ...i, section: s.title })))

const files = import.meta.glob('../docs/*.md', { query: '?raw', import: 'default', eager: true })

function parse(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const fm = {}
  let body = raw
  if (m) {
    body = raw.slice(m[0].length)
    m[1].split('\n').forEach((line) => {
      const i = line.indexOf(':')
      if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    })
  }
  return { fm, body }
}

export function getDoc(slug) {
  const key = Object.keys(files).find((k) => k.endsWith('/' + slug + '.md'))
  if (!key) return null
  const { fm, body } = parse(files[key])
  const idx = docsFlat.findIndex((d) => d.slug === slug)
  return {
    slug,
    title: fm.title || slug,
    description: fm.description || '',
    body,
    section: docsFlat[idx]?.section || 'Docs',
    prev: idx > 0 ? docsFlat[idx - 1] : null,
    next: idx >= 0 && idx < docsFlat.length - 1 ? docsFlat[idx + 1] : null,
  }
}

export const searchIndex = [
  { type: 'page', title: 'Features', path: '/#features', section: 'Home' },
  { type: 'page', title: 'Installation', path: '/#install', section: 'Home' },
  { type: 'page', title: 'Quick start', path: '/#quick-start', section: 'Home' },
  { type: 'page', title: 'Configuration', path: '/#configuration', section: 'Home' },
  { type: 'page', title: 'Commands', path: '/#commands', section: 'Home' },
  { type: 'page', title: 'Examples', path: '/#examples', section: 'Home' },
  { type: 'page', title: 'FAQ', path: '/#faq', section: 'Home' },
  ...docsFlat.map((d) => ({ type: 'doc', title: d.title, path: '/docs/' + d.slug, section: d.section })),
]
