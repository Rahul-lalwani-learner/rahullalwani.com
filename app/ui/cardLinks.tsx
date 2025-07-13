import { iconComponents } from "./icons/iconsType"
import Link from "next/link"
interface CardLinkProps{
    name: string, 
    icon: 'linkedin' | 'github' | 'mail' | 'globe' | 'resume'  | 'document' | 'colab' | 'jupyter', 
    link: string
}


export function CardLink({name, icon, link}: CardLinkProps){
    const IconComponent = iconComponents[icon as keyof typeof iconComponents]
    return <Link target="_blank" href={link} className="inline-flex items-center p-1 bg-background-black text-white dark:bg-white dark:text-background-black rounded-md text-xs hover:bg-hover-black dark:hover:bg-stone-100">
        <div className="pr-1">{<IconComponent size="size-3" />}</div>
        <div>{name}</div>
    </Link>
}

