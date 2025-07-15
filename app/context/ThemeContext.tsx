'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light') // Default to light for SSR
  const [mounted, setMounted] = useState(false)

  // Get user's default theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
    
    setMounted(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Always render content, but apply theme classes after mount to prevent FOUC
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      <div className={mounted ? theme : 'light'} style={{ transition: 'none' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
