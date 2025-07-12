'use client'
import { BotOff } from "../ui/icons/BotOff"
import { BotOn } from "../ui/icons/BotOn"
import { MoonIcon } from "../ui/icons/Moon"
import { SunIcon } from "../ui/icons/Sun"
import { useTheme } from "../context/ThemeContext"
import { useBot } from "../context/BotContext"

export interface NavBarProps{
    height: string
}

export function NavBar({ height }: NavBarProps){
    const { theme, toggleTheme } = useTheme()
    const { bot, toggleBot } = useBot()
    
    return <div className={`transition-all duration-100 items-center w-full ${height} justify-between bg-white/70 dark:bg-background-black/80 sticky top-0 backdrop-blur-xs`}>
        <div className="flex justify-between items-center h-full m-auto max-w-3xl px-4">
            <div>
                <button className="p-2 pl-0 hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer">home</button>
                <button className="p-2 hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer">projects</button>
                <button className="p-2 hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer">blog</button>
                <button className="p-2 hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer">contact</button>
            </div>
            <div className="flex w-24 justify-between">
                <div onClick={toggleBot} className="p-2 hover:bg-gray-100 dark:hover:bg-hover-black rounded-md transition-all duration-100 cursor-pointer dark:text-white text-black">
                    {bot ? <BotOn/> : <BotOff/>}
                </div>
                <div onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-hover-black rounded-md transition-all duration-100 cursor-pointer">
                    {theme === 'dark' ? <SunIcon extraClass="text-yellow-500"/> : <MoonIcon extraClass="text-purple-700"/>}
                </div>
            </div>
        </div>
    </div>
}