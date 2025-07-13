import Link from "next/link";
import socialsData from "../../src/socials.json";
import { iconComponents } from "../ui/icons/iconsType";

export function Footer({height}:{height: 'h-56' | 'h-42'}){
    return <div className={`transition-all duration-100 items-center w-full justify-between bg-white dark:bg-background-black backdrop-blur-xs ${height} items-start mt-4`}>
        <div className="max-w-3xl px-4 m-auto flex justify-between">
            <div className=" dark:text-gray-700  text-gray-200 transition-colors">
                &copy; {new Date().getFullYear()} <Link className="hover:underline dark:hover:text-white hover:text-black cursor-pointer" href={"/"}>rahullalwani.com</Link> | <Link className="hover:underline dark:hover:text-white hover:text-black cursor-pointer" href={"/privacy"}>privacy?</Link>
            </div>
            <div>
                <div className="flex space-x-4">
                    {socialsData.socials.map((social) => {
                        const IconComponent = iconComponents[social.icon as keyof typeof iconComponents];
                        return (
                            <Link 
                                key={social.name}
                                className="hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer" 
                                href={social.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                <IconComponent/>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
}