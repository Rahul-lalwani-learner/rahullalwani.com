'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Calistoga } from "next/font/google"
import ProjectsData from '../../src/projects.json'
import { ProjectCard } from "../components/ProjectCard"

const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})

type ProjectCategory = 'ALL' | 'AI/ML/DL' | 'WebDev' | 'Web3';
const categories: ProjectCategory[] = ['ALL', 'AI/ML/DL', 'WebDev', 'Web3'];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

    // Calculate indicator position/width on tab/category change
    useLayoutEffect(() => {
        const idx = categories.indexOf(activeCategory);
        const node = tabRefs.current[idx];
        const containerNode = containerRef.current;
        if (node && containerNode) {
            const nodeRect = node.getBoundingClientRect();
            const containerRect = containerNode.getBoundingClientRect();
            setIndicatorStyle({
                left: nodeRect.left - containerRect.left,
                width: nodeRect.width,
            });
        }
    }, [activeCategory]);

    // Filter projects based on active category
    const filteredProjects = activeCategory === 'ALL'
        ? ProjectsData.projects
        : ProjectsData.projects.filter(project => project.type === activeCategory);

    return (
        <div className="max-w-3xl m-auto p-4 pt-8">
            <h1 className={`font-bold text-5xl dark:text-white ${giestCalistoga.className} mb-8`}>My Projects</h1>

            {/* Category Tabs with Animated Indicator */}
            <div
                ref={containerRef}
                className="relative grid grid-cols-4 gap-1 sm:gap-2 sm:flex sm:justify-start bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mb-8 w-full sm:max-w-fit sm:mx-0"
            >
                {categories.map((cat, idx) => (
                    <button
                        key={cat}
                        ref={el => { tabRefs.current[idx] = el; }}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative z-10 px-2 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer w-full sm:w-auto text-center ${
                            activeCategory === cat
                                ? 'text-black dark:text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
                {/* Animated Active Tab Indicator */}
                <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="pointer-events-none absolute top-2 bottom-2 rounded-md bg-white dark:bg-background-black shadow-sm z-0"
                    style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                />
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
                        priority={index < 2}
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
    );
}