'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface BotContextType {
  bot: boolean
  toggleBot: () => void
}

const BotContext = createContext<BotContextType | undefined>(undefined)

export function useBot() {
  const context = useContext(BotContext)
  if (context === undefined) {
    throw new Error('useBot must be used within a BotProvider')
  }
  return context
}

interface BotProviderProps {
  children: ReactNode
}

export function BotProvider({ children }: BotProviderProps) {
  const [bot, setBot] = useState<boolean>(true) // Default bot is true
  const [mounted, setMounted] = useState(false)

  // Get user's bot preference from localStorage
  useEffect(() => {
    const savedBotState = localStorage.getItem('botEnabled')
    
    if (savedBotState !== null) {
      setBot(savedBotState === 'true')
    }
    // If no saved state, keep default value (true)
    
    setMounted(true)
  }, [])

  // Save bot state to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('botEnabled', bot.toString())
    }
  }, [bot, mounted])

  const toggleBot = () => {
    setBot(prev => !prev)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <BotContext.Provider value={{ bot: true, toggleBot: () => {} }}>
        {children}
      </BotContext.Provider>
    )
  }

  return (
    <BotContext.Provider value={{ bot, toggleBot }}>
      {children}
    </BotContext.Provider>
  )
}
