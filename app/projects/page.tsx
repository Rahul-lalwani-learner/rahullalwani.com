import { Calistoga } from "next/font/google"
import ProjectsData from '../../src/projects.json'
import { ProjectCard } from "../components/ProjectCard"
const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})
export default function Projects(){
    return <div className="max-w-3xl m-auto p-4">
          <h1 className={`font-bold text-5xl dark:text-white ${giestCalistoga.className}`}>My Projects</h1>
          <div className="sm:grid w-full sm:grid-cols-2 gap-4 mt-8 flex justify-center flex-wrap">
                {ProjectsData.projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              name={project.name} 
              description={project.description} 
              image={project.image} 
              tags={project.tags} 
              links={project.links.map(link => ({
                ...link,
                icon: link.icon as "github" | "colab" | "jupyter" | "document" | "linkedin" | "mail" | "globe" | "resume"
              }))}
            />
          ))}
          </div>
        </div>
}