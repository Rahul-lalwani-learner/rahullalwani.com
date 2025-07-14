'use client'
import { BotOff } from "../ui/icons/BotOff"
import { BotOn } from "../ui/icons/BotOn"
import { MoonIcon } from "../ui/icons/Moon"
import { SunIcon } from "../ui/icons/Sun"
import { useTheme } from "../context/ThemeContext"
import { useBot } from "../context/BotContext"
import { useRouter } from "next/navigation"

export interface NavBarProps{
    height: string
}

export function NavBar({ height }: NavBarProps){
    const router = useRouter();
    const { theme, toggleTheme } = useTheme()
    const { bot, toggleBot } = useBot()
    
    return <div className={`transition-all duration-100 items-center w-full ${height} justify-between bg-white/70 dark:bg-background-black/80 sticky top-0 backdrop-blur-xs z-10`}>
        <div className="flex justify-between items-center h-full m-auto max-w-3xl px-4 sm:text-base text-sm">
            <div>
                <button onClick= {()=>{router.push('/')}} className="p-2 pl-0 hover:text-black focus:text-black dark:focus:text-white dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer">home</button>
                <button onClick = {()=>{router.push('/projects')}} className="p-2 hover:text-black focus:text-black dark:focus:text-white dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer">projects</button>
                <button onClick = {()=>{router.push('/blog')}} className="p-2 hover:text-black focus:text-black dark:focus:text-white dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer">blog</button>
                <button onClick = {()=>{router.push('/contact')}} className="p-2 hover:text-black focus:text-black dark:focus:text-white dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer">contact</button>
            </div>
            <div className="flex sm:w-20 w-18 justify-between">
                <div onClick={toggleBot} className="p-2 hover:bg-gray-100 dark:hover:bg-hover-black rounded-md transition-all duration-100 cursor-pointer dark:text-white text-black">
                    {bot ? <BotOn extraClass="sm:size-5 size-4"/> : <BotOff extraClass="sm:size-5 size-4"/>}
                </div>
                <div onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-hover-black rounded-md transition-all duration-100 cursor-pointer">
                    {theme === 'dark' ? <SunIcon extraClass="text-yellow-500 sm:size-5 size-4"/> : <MoonIcon extraClass="text-purple-700 sm:size-5 size-4"/>}
                </div>
            </div>
        </div>
    </div>
}