import { createContext, useContext, useState, useCallback } from 'react'

const ThemeCtx = createContext(null)

const apply = (mode, accent) => {
  const el = document.documentElement
  el.classList.toggle('light', mode === 'light')
  el.classList.toggle('dark', mode === 'dark')
  el.dataset.accent = accent
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark')
  const [accent, setAccentState] = useState(() => localStorage.getItem('accent') || 'emerald')

  const toggle = useCallback(() => {
    setMode((m) => {
      const next = m === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      apply(next, accent)
      return next
    })
  }, [accent])

  const setAccent = useCallback((a) => {
    setAccentState(a)
    localStorage.setItem('accent', a)
    apply(mode, a)
  }, [mode])

  return <ThemeCtx.Provider value={{ mode, accent, toggle, setAccent }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)
