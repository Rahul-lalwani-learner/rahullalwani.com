import { iconProps } from "./iconsType";

export function BotOn({size, color, extraClass}: iconProps){
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color === undefined? "currentColor": color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-bot-icon lucide-bot ${size === undefined? 'size-4': size} ${extraClass}`} ><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
}