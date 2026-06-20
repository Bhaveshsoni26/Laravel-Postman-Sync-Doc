import { useEffect, useState } from 'react'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function fmt(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 10_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k'
  return n.toLocaleString()
}

export function useReveal(deps = []) {
  useEffect(() => {
    const items = [...document.querySelectorAll('.reveal:not(.is-visible)')]
    if (reduce) { items.forEach((e) => e.classList.add('is-visible')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (e.target.dataset.delay || 0) + 'ms'
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    items.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, deps) // eslint-disable-line
}

export function useCounters(deps = []) {
  useEffect(() => {
    const run = (el) => {
      const target = parseFloat(el.dataset.countTo) || 0
      const suffix = el.dataset.suffix || ''
      if (reduce || !target) { el.textContent = fmt(target) + suffix; return }
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / 1400, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = fmt(Math.round(target * eased)) + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target) } })
    }, { threshold: 0.4 })
    document.querySelectorAll('[data-count-to]').forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, deps) // eslint-disable-line
}

const DEFAULT = { downloads_total: 0, downloads_monthly: 0, downloads_daily: 0, version: 'v1.0.0', stars: 0, forks: 0, open_issues: 0, contributors: 0, latest_release: null }

export function useStats() {
  const [stats, setStats] = useState(DEFAULT)
  useEffect(() => {
    let on = true
    ;(async () => {
      const out = { ...DEFAULT }
      try {
        const j = await (await fetch('https://packagist.org/packages/bhaveshsoni26/laravel-postman-sync.json')).json()
        const d = j.package?.downloads || {}
        out.downloads_total = d.total || 0; out.downloads_monthly = d.monthly || 0; out.downloads_daily = d.daily || 0
        const vs = Object.keys(j.package?.versions || {})
        out.version = vs.find((v) => !v.startsWith('dev-')) || out.version
      } catch (e) {}
      try {
        const j = await (await fetch('https://api.github.com/repos/Bhaveshsoni26/Laravel-Postman-Sync')).json()
        out.stars = j.stargazers_count || 0; out.forks = j.forks_count || 0; out.open_issues = j.open_issues_count || 0
      } catch (e) {}
      if (on) setStats(out)
    })()
    return () => { on = false }
  }, [])
  return stats
}
