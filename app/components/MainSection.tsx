'use client';

import Image from 'next/image';
import Link from 'next/link';
import socialsData from "../../src/socials.json";
import { iconComponents } from "../ui/icons/iconsType";
import { Calistoga } from 'next/font/google';
import { useBot } from '../context/BotContext';
import { BottomRightArrowIcon } from '../ui/icons/BottomRightArrow';

const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})

export function MainSection() {
  const { openChat } = useBot();

  return (
    <div className="max-w-3xl m-auto p-4 pt-8">
      <div className="flex flex-col-reverse lg:flex-row items-start gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          {/* Greeting */}
          <div>
            <h1 className={`text-4xl lg:text-5xl font-bold text-black dark:text-white ${giestCalistoga.className}`}>
              hi rahul here.
              <span className="inline-block ml-2 text-4xl">👋</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              AI Developer & Web Enthusiast
            </p>
          </div>

          {/* Description */}
          <div className="space-y-8">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Passionate about AI and web development, blending intelligence with seamless user experiences. With a strong academic foundation, I secured <b>AIR 418 and AIR 421 in GATE 2025-24 (DA)</b>, showcasing my dedication and expertise in the field.
            </p>
            
            <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                Have questions? Chat with{' '}
                <span className="inline-flex items-center gap-1">
                    <button 
                    onClick={openChat} 
                    className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit"
                    >
                    Rahul Support
                    </button>
                  <BottomRightArrowIcon />
                </span>
                </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                For escalations, please find my{' '}
                <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Projects
                </Link>{' '}
                instead.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Resume Button */}
            <Link
              href="https://drive.google.com/file/d/11o8Jb7_n45t4V9yYen1i_QaxN7IURQsb/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-background-black dark:text-white bg-white font-bold text-sm dark:bg-background-black
              rounded-lg transition-colors border border-light-border dark:border-hover-black shadow-lg dark:shadow-white/4 relative overflow-hidden group"
            >
              {iconComponents.resume && <iconComponents.resume extraClass='animate-bounce'/>}
              Resume
            </Link>
            

            {/* Social Links - Icon Only Format like Footer */}
            {socialsData.socials.map((social) => {
              const IconComponent = iconComponents[social.icon as keyof typeof iconComponents];
              const href =
                social.name === "GitHub"
                  ? "https://github.com/Rahul-lalwani-learner/rahullalwani.com"
                  : social.href;
              return (
                <a
                  key={social.name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 hover:text-black dark:text-gray-700 dark:hover:text-white text-gray-200 bg-gray-background dark:bg-[#1a2230] rounded-lg transition-colors border border-light-border dark:border-hover-black"
                  aria-label={social.name}
                >
                  {IconComponent && <IconComponent />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-80 w-full flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-64 h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 shadow-lg">
              <Image
                src="/photo.png"
                alt="Rahul Lalwani - Full Stack Developer"
                width={300}
                height={400}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


