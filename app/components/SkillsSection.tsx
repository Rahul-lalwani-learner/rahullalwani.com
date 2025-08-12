'use client';

import { 
  SiTypescript, SiJavascript, SiPython, SiNextdotjs, SiReact, 
  SiNodedotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiMysql,
  SiTensorflow, SiPytorch, SiOpencv, SiSolana, SiEthereum,
  SiGit, SiDocker, SiVercel, SiPrisma,
  SiExpress, SiStreamlit, SiJupyter, SiGithub,
  SiWebrtc, SiSocketdotio, SiRedis, SiNumpy, SiPandas,
  SiScikitlearn, SiKubernetes, SiPostman
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { Calistoga } from 'next/font/google';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
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
  { name: 'Python', icon: SiPython, category: 'languages' },
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
  
  // AI/ML Technologies
  { name: 'TensorFlow', icon: SiTensorflow, category: 'ai' },
  { name: 'PyTorch', icon: SiPytorch, category: 'ai' },
  { name: 'OpenCV', icon: SiOpencv, category: 'ai' },
  { name: 'NumPy', icon: SiNumpy, category: 'ai' },
  { name: 'Pandas', icon: SiPandas, category: 'ai' },
  { name: 'Scikit-learn', icon: SiScikitlearn, category: 'ai' },
  { name: 'Streamlit', icon: SiStreamlit, category: 'ai' },
  { name: 'Jupyter', icon: SiJupyter, category: 'ai' },
  
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
  
  // Cloud & Deployment
  { name: 'AWS', icon: FaAws, category: 'cloud' },
  { name: 'Vercel', icon: SiVercel, category: 'cloud' },
  
  // Real-time Technologies
  { name: 'Socket.io', icon: SiSocketdotio, category: 'realtime' },
  { name: 'WebRTC', icon: SiWebrtc, category: 'realtime' },
];

export function SkillsSection() {
  return (
    <section className="max-w-3xl m-auto p-4 py-16">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold text-black dark:text-white mb-4 ${giestCalistoga.className}`}>
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with to build innovative solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 md:gap-6 gap-2 place-items-center">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className="group relative flex items-center justify-center"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg 
                              bg-gray-50 dark:bg-gray-800/50 
                              border border-gray-200 dark:border-gray-700
                              hover:bg-gray-100 dark:hover:bg-gray-700
                              transition-all duration-200 ease-in-out
                              hover:scale-110 hover:shadow-lg dark:hover:shadow-white/5">
                  <IconComponent className="w-6 h-6 text-gray-700 dark:text-gray-300 
                                         group-hover:text-black dark:group-hover:text-white
                                         transition-colors duration-200" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200
                              bg-black dark:bg-white text-white dark:text-black
                              text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none
                              z-10">
                  {skill.name}
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
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">AI/ML</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Web3</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">DevOps</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Cloud</span>
        </div>
      </div>
    </section>
  );
}
