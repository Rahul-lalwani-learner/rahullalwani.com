'use client'

import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export function ThemeScript() {
  const { theme, mounted } = useTheme()

  useEffect(() => {
    if (mounted) {
      const body = document.body
      const html = document.documentElement
      
      // Remove existing theme classes
      body.classList.remove('light', 'dark')
      html.classList.remove('light', 'dark')
      
      // Add current theme
      body.classList.add(theme)
      html.classList.add(theme)
      
      // Apply theme-specific styles
      if (theme === 'dark') {
        body.classList.add('bg-background-black')
        body.classList.remove('bg-white')
      } else {
        body.classList.add('bg-white')
        body.classList.remove('bg-background-black')
      }
      
      body.classList.add('transition-all', 'duration-100')
    }
  }, [theme, mounted])

  return null
}
