import Image from 'next/image';
import { Tag } from '../ui/cardTags';
import { CardLink } from '../ui/cardLinks';

export interface cardProps{
    name: string, 
    description: string, 
    image: string, 
    tags: string[], 
    links: {
        name: string, 
        href: string, 
        icon: 'linkedin' | 'github' | 'mail' | 'globe' | 'resume'  | 'document' | 'colab' | 'jupyter'
    }[]
}
export function ProjectCard({name, description, image, tags , links}: cardProps){
    return <div className="max-w-[360px] w-full px-8 py-8 flex flex-col gap-2 border dark:border-hover-black border-light-border rounded-lg shadow-lg">
        <div className='max-w-2xs h-42 flex overflow-hidden m-auto rounded-sm'>
            <Image 
            src={image} 
            alt={name} 
            width={300} 
            height={500} 
            className="object-cover h-full w-full  object-bottom" 
            />
        </div>
        <div className='pt-2 text-xl font-bold text-background-black dark:text-white tracking-tight'>
            {name}
        </div>
        <div className='text-xs  dark:text-gray-700  text-gray-200 transition-colors pb-4'>
            {description}
        </div>
        <div className='flex flex-wrap gap-1 text'>
            {tags.map((x, i) => <Tag key={i} name={x}/>)}
        </div>
        <div className='flex flex-wrap justify-start gap-2'>
            {links.map((x, i)=> <CardLink key={i} name={x.name} icon={x.icon} link={x.href}/>)}
        </div>
    </div>
}