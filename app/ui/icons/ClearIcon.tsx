import { iconProps } from "./iconsType"

export function ClearIcon({ extraClass }: iconProps) {
    return (
        <svg 
            className={`w-5 h-5 ${extraClass || ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
            />
        </svg>
    )
}
