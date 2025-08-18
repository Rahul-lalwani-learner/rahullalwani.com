'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  SiTypescript, SiJavascript, SiPython, SiNextdotjs, SiReact, 
  SiNodedotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiMysql,
  SiTensorflow, SiPytorch, SiOpencv, SiSolana, SiEthereum,
  SiGit, SiDocker, SiVercel, SiPrisma,
  SiExpress, SiStreamlit, SiJupyter, SiGithub, SiSocketdotio, SiRedis, SiNumpy, SiPandas,
  SiScikitlearn, SiKubernetes, SiPostman, SiTurborepo, SiLangchain, SiHuggingface
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { Calistoga } from 'next/font/google';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  primary?: boolean; // Mark primary skills (AI-related)
}

const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})

const skills: Skill[] = [
  // Programming Languages
  { name: 'TypeScript', icon: SiTypescript, category: 'languages' },
  { name: 'JavaScript', icon: SiJavascript, category: 'languages' },
  { name: 'Java', icon: FaJava, category: 'languages' },
  
  // Frontend Technologies
  { name: 'Next.js', icon: SiNextdotjs, category: 'frontend' },
  { name: 'React', icon: SiReact, category: 'frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'frontend' },
  
  // Backend Technologies
  { name: 'Node.js', icon: SiNodedotjs, category: 'backend' },
  { name: 'Express', icon: SiExpress, category: 'backend' },
  { name: 'Prisma', icon: SiPrisma, category: 'backend' },
  
  // Databases
  { name: 'MongoDB', icon: SiMongodb, category: 'database' },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'database' },
  { name: 'MySQL', icon: SiMysql, category: 'database' },
  { name: 'Redis', icon: SiRedis, category: 'database' },
  
  // AI/ML Technologies (Primary Skills)
  { name: 'Python', icon: SiPython, category: 'ai', primary: true },
  { name: 'TensorFlow', icon: SiTensorflow, category: 'ai', primary: true },
  { name: 'PyTorch', icon: SiPytorch, category: 'ai', primary: true },
  { name: 'OpenCV', icon: SiOpencv, category: 'ai', primary: true },
  { name: 'NumPy', icon: SiNumpy, category: 'ai', primary: true },
  { name: 'Pandas', icon: SiPandas, category: 'ai', primary: true },
  { name: 'Scikit-learn', icon: SiScikitlearn, category: 'ai', primary: true },
  { name: 'Streamlit', icon: SiStreamlit, category: 'ai', primary: true },
  { name: 'Jupyter', icon: SiJupyter, category: 'ai', primary: true },
  { name: 'LangChain', icon: SiLangchain, category: 'ai', primary: true },
  { name: 'Hugging Face', icon: SiHuggingface, category: 'ai', primary: true },
  // Web3/Blockchain
  { name: 'Solana', icon: SiSolana, category: 'web3' },
  { name: 'Ethereum', icon: SiEthereum, category: 'web3' },
  
  // DevOps & Tools
  { name: 'Git', icon: SiGit, category: 'tools' },
  { name: 'GitHub', icon: SiGithub, category: 'tools' },
  { name: 'Docker', icon: SiDocker, category: 'tools' },
  { name: 'Kubernetes', icon: SiKubernetes, category: 'tools' },
  { name: 'VS Code', icon: VscVscode, category: 'tools' },
  { name: 'Postman', icon: SiPostman, category: 'tools' },
  { name: 'Turborepo', icon: SiTurborepo, category: 'tools'},
  
  // Cloud & Deployment
  { name: 'AWS', icon: FaAws, category: 'cloud' },
  { name: 'Vercel', icon: SiVercel, category: 'cloud' },
  
  // Real-time Technologies
  { name: 'Socket.io', icon: SiSocketdotio, category: 'realtime' },
  // { name: 'WebRTC', icon: SiWebrtc, category: 'realtime' },
];

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hide tooltip on click outside (for mobile)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        setActiveSkill(null);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Auto-hide tooltip after 2 seconds on mobile
  useEffect(() => {
    if (activeSkill && typeof window !== 'undefined' && window.innerWidth < 768) {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout to hide after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setActiveSkill(null);
        timeoutRef.current = null;
      }, 2000);
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [activeSkill]);

  return (
    <section className="max-w-3xl m-auto p-4 md:py-16 py-8">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold text-black dark:text-white mb-4 ${giestCalistoga.className}`}>
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-2">
            Technologies and tools I work with to build innovative solutions
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              AI/ML Primary Skills
            </span>
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 md:gap-6 gap-2 place-items-center">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            // Show tooltip if hovered (desktop) or tapped (mobile)
            const showTooltip = activeSkill === skill.name;
            return (
              <div
                key={skill.name}
                className="group relative flex items-center justify-center"
                onClick={e => {
                  // Only handle on mobile
                  if (window.innerWidth < 768) {
                    e.stopPropagation();
                    setActiveSkill(activeSkill === skill.name ? null : skill.name);
                  }
                }}
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg 
                              transition-all duration-200 ease-in-out
                              hover:scale-110 hover:shadow-lg dark:hover:shadow-white/5
                              ${skill.primary 
                                ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800/40' 
                                : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}>
                  <IconComponent className={`w-6 h-6 transition-colors duration-200
                                         ${skill.primary 
                                           ? 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300' 
                                           : 'text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white'
                                         }`} />
                </div>

                {/* Primary Badge */}
                {skill.primary && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                )}

                {/* Tooltip: show on hover (desktop) or tap (mobile) */}
                <div
                  className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
                    bg-black dark:bg-white text-white dark:text-black
                    text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none z-10
                    ${showTooltip ? 'opacity-100' : 'opacity-0'}
                    group-hover:opacity-100 transition-opacity duration-200
                  `}
                  style={{ pointerEvents: 'auto' }}
                >
                  {skill.name}
                  {skill.primary && <span className="text-blue-300 dark:text-blue-600"> ★</span>}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2
                                border-l-4 border-r-4 border-t-4
                                border-transparent border-t-black dark:border-t-white"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional: Category Legend */}
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Languages</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Frontend</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Backend</span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-medium">AI/ML ★</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Web3</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">DevOps</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Cloud</span>
        </div>
      </div>
    </section>
  );
}
