import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    
    // Check if content directory exists
    if (!fs.existsSync(contentDir)) {
      return NextResponse.json([]);
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

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json([]);
  }
}
