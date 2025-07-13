import { iconProps } from "./iconsType";

export function LinkedinIcon({size, extraClass, color}: iconProps){
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color === undefined? "currentColor": color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-linkedin-icon lucide-linkedin ${size === undefined? 'size-4': size} ${extraClass}`}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
}