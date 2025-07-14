import { Calistoga } from "next/font/google"
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SearchClient from "../components/SearchClient"

const calistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})

interface BlogPost {
    title: string
    description: string
    date: string
    author: string
    tags: string[]
    featured: boolean
    slug: string
    readTime: string
}

async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const contentDir = path.join(process.cwd(), 'content');
        
        if (!fs.existsSync(contentDir)) {
            return [];
        }

        const files = fs.readdirSync(contentDir);
        const mdxFiles = files.filter(file => file.endsWith('.mdx'));

        const posts = mdxFiles.map(filename => {
            const filePath = path.join(contentDir, filename);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(fileContent);

            return {
                title: data.title || 'Untitled',
                description: data.description || '',
                date: data.date || new Date().toISOString().split('T')[0],
                author: data.author || 'Rahul Lalwani',
                tags: data.tags || [],
                featured: data.featured || false,
                slug: data.slug || filename.replace('.mdx', ''),
                readTime: data.readTime || '5 min read',
            };
        });

        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export default async function Blog() {
    const blogPosts = await getBlogPosts();

    return (
        <div className="max-w-3xl m-auto p-4 pb-8">
            {/* Header */}
            <h1 className={`font-bold text-5xl dark:text-white text-black mb-8 ${calistoga.className}`}>
                my blog
            </h1>

            {/* Search and Posts */}
            <SearchClient initialPosts={blogPosts} />
        </div>
    )
}
