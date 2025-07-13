import Link from "next/link";
import { LinkedinIcon } from "../ui/icons/LinkedinIcon";
import { GithubIcon } from "../ui/icons/GithubIcon";
import { MailIcon } from "../ui/icons/MailIcon";

export function Footer({height}:{height: 'h-56' | 'h-42'}){
    return <div className={`transition-all duration-100 items-center w-full justify-between bg-white dark:bg-background-black backdrop-blur-xs ${height} items-start`}>
        <div className="max-w-3xl px-4 m-auto flex justify-between">
            <div className=" dark:text-gray-700  text-gray-200 transition-colors">
                &copy; {new Date().getFullYear()} <Link className="hover:underline dark:hover:text-white hover:text-black cursor-pointer" href={"/"}>rahullalwani.com</Link> | <Link className="hover:underline dark:hover:text-white hover:text-black cursor-pointer" href={"/privacy"}>privacy?</Link>
            </div>
            <div>
                <div className="flex space-x-4">
                    <Link className="hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer" href="https://www.linkedin.com/in/itsrahullalwani/" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon/>
                    </Link>
                    <Link className="hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer" href="https://github.com/Rahul-lalwani-learner" target="_blank" rel="noopener noreferrer">
                        <GithubIcon/>
                    </Link>
                    <Link className="hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 transition-colors cursor-pointer" href="mailto:itsrahullalwani@gmail.com" target="_blank" rel="noopener noreferrer">
                        <MailIcon/>
                    </Link>
                </div>
            </div>
        </div>
    </div>
}