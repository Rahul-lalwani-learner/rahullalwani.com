'use client';

import { useState } from 'react';
import { Calistoga } from "next/font/google"
import ProjectsData from '../../src/projects.json'
import { ProjectCard } from "../components/ProjectCard"

const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})

type ProjectCategory = 'ALL' | 'AI/ML/DL' | 'WebDev' | 'Web3';

export default function Projects(){
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');
    
    // Filter projects based on active category
    const filteredProjects = activeCategory === 'ALL' 
        ? ProjectsData.projects 
        : ProjectsData.projects.filter(project => project.type === activeCategory);

    return (
        <div className="max-w-3xl m-auto p-4 pt-8">
            <h1 className={`font-bold text-5xl dark:text-white ${giestCalistoga.className} mb-8`}>My Projects</h1>
            
            {/* Category Tabs */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 sm:flex sm:justify-start bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mb-8 w-full sm:max-w-fit sm:mx-0">
                <button
                    onClick={() => setActiveCategory('ALL')}
                    className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer w-full sm:w-auto text-center ${
                        activeCategory === 'ALL'
                            ? 'bg-white dark:bg-background-black text-black dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                    ALL
                </button>
                <button
                    onClick={() => setActiveCategory('AI/ML/DL')}
                    className={`px-1 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer w-full sm:w-auto text-center ${
                        activeCategory === 'AI/ML/DL'
                            ? 'bg-white dark:bg-background-black text-black dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                    AI/ML/DL
                </button>
                <button
                    onClick={() => setActiveCategory('WebDev')}
                    className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer w-full sm:w-auto text-center ${
                        activeCategory === 'WebDev'
                            ? 'bg-white dark:bg-background-black text-black dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                    WebDev
                </button>
                <button
                    onClick={() => setActiveCategory('Web3')}
                    className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer w-full sm:w-auto text-center ${
                        activeCategory === 'Web3'
                            ? 'bg-white dark:bg-background-black text-black dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                    Web3
                </button>
            </div>
            
            {/* Projects Grid */}
            <div className="sm:grid w-full sm:grid-cols-2 gap-4 mt-8 flex justify-center flex-wrap">
                {filteredProjects.map((project, index) => (
                    <ProjectCard 
                        key={index} 
                        name={project.name} 
                        description={project.description} 
                        image={project.image} 
                        tags={project.tags} 
                        priority={index < 2} // Priority for first 2 projects (above the fold)
                        links={project.links.map(link => ({
                            ...link,
                            icon: link.icon as "github" | "colab" | "jupyter" | "document" | "linkedin" | "mail" | "globe" | "resume"
                        }))}
                    />
                ))}
            </div>
            
            {/* Show message if no projects in category */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        No projects found in {activeCategory} category yet.
                    </p>
                </div>
            )}
        </div>
    )
}