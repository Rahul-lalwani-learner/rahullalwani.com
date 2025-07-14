import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectCard, cardProps } from './ProjectCard';
import { Tag } from '../ui/cardTags';
import projectsData from '../../src/projects.json';
import { Calistoga } from "next/font/google"

const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})
interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  slug: string;
  readTime: string;
}

async function getFeaturedProjects(): Promise<cardProps[]> {
  // Get top 2 projects - prioritize Web Apps and AI/ML projects
  const projects = projectsData.projects;
  return projects.slice(0, 2).map(project => ({
    name: project.name,
    description: project.description,
    image: project.image,
    tags: project.tags,
    links: project.links as cardProps['links']
  }));
}

async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
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

    return posts.slice(0, 2);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function FeaturedSection() {
  const featuredProjects = await getFeaturedProjects();
  const recentPosts = await getFeaturedBlogPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">
      {/* Featured Projects Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className={"text-2xl font-bold text-black dark:text-white " + giestCalistoga.className}>
            featured projects
          </h2>
          <Link 
            href="/projects" 
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            view more 
            <svg className="w-4 h-4 transform transition-transform duration-200 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              description={project.description}
              image={project.image}
              tags={project.tags}
              links={project.links}
            />
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className={"text-2xl font-bold text-black dark:text-white "+giestCalistoga.className}>
            recent posts
          </h2>
          <Link 
            href="/blog" 
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            view more 
            <svg className="w-4 h-4 transform transition-transform duration-200 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" />
            </svg>
          </Link>
        </div>

        <div className="space-y-6 ">
          {recentPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="group">
              <article className="p-6 bg-white dark:bg-background-black border border-light-border dark:border-hover-black rounded-lg transition-all duration-200 cursor-pointer mb-2">
                <div className="flex justify-between items-start gap-4 ">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {post.description}
                    </p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Tag 
                            key={tagIndex}
                            name={tag}
                          />
                        ))}
                        {post.tags.length > 3 && (
                          <Tag name={`+${post.tags.length - 3} more`} />
                        )}
                      </div>
                    )}

                    {/* Read time */}
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {post.readTime}
                    </p>
                  </div>
                  
                  {/* Date and Featured Badge */}
                  <div className="text-right flex-shrink-0">
                    <time className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {formatDate(post.date)}
                    </time>
                    {post.featured && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
