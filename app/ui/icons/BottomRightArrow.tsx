import { iconProps } from "./iconsType";

export function BottomRightArrowIcon({size, color, extraClass}: iconProps){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color === undefined? "currentColor": color} className={`${size === undefined? 'size-4': size} ${extraClass}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
</svg>

}