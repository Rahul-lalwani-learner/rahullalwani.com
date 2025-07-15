'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface BotContextType {
  bot: boolean
  toggleBot: () => void
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
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
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false) // Chat overlay state
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

  const openChat = () => {
    setIsChatOpen(true)
  }

  const closeChat = () => {
    setIsChatOpen(false)
  }

  const toggleChat = () => {
    setIsChatOpen(prev => !prev)
  }

  // Always render with consistent state for SSR
  return (
    <BotContext.Provider value={{ bot, toggleBot, isChatOpen, openChat, closeChat, toggleChat }}>
      {children}
    </BotContext.Provider>
  )
}
