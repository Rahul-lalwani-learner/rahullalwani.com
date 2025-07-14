'use client'
import { Calistoga } from "next/font/google"
import { useState, useEffect } from "react"
import Link from "next/link"
import { SearchIcon } from "../ui/icons/SearchIcon"
import { ClearIcon } from "../ui/icons/ClearIcon"
import { Tag } from "../ui/cardTags"

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

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState('')
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])

    useEffect(() => {
        // Fetch blog posts from API route
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog-posts')
                const posts = await response.json()
                setBlogPosts(posts)
                setFilteredPosts(posts)
            } catch (error) {
                console.error('Error fetching blog posts:', error)
            }
        }

        fetchPosts()
    }, [])

    useEffect(() => {
        // Filter posts based on search term
        if (searchTerm.trim() === '') {
            setFilteredPosts(blogPosts)
        } else {
            const filtered = blogPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            setFilteredPosts(filtered)
        }
    }, [searchTerm, blogPosts])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    }

    const clearSearch = () => {
        setSearchTerm('')
    }

    return (
        <div className="max-w-3xl m-auto p-4 pb-8">
            {/* Header */}
            <h1 className={`font-bold text-5xl dark:text-white text-black mb-8 ${calistoga.className}`}>
                my blog.
            </h1>

            {/* Search Bar */}
            <div className="relative mb-12">
                <div className="relative">
                    <SearchIcon extraClass="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search something..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200"
                    />
                    {searchTerm && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <ClearIcon extraClass="" />
                        </button>
                    )}
                </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {searchTerm ? 'No posts found matching your search.' : 'No blog posts available yet.'}
                        </p>
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <Link 
                            key={post.slug} 
                            href={`/blog/${post.slug}`}
                            className="group"
                        >
                            <article className="p-6 bg-white dark:bg-background-black border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer mb-2">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                            {post.description}
                                        </p>
                                        
                                        {/* Tags */}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.slice(0, 3).map((tag, index) => (
                                                    <Tag 
                                                        key={index}
                                                        name={tag}
                                                    >
                                                    </Tag>
                                                ))}
                                                {post.tags.length > 3 && (
                                                    <Tag name={`+${post.tags.length - 3} more`}>
                                                    </Tag>
                                                )}
                                            </div>
                                        )}

                                        {/* Read time */}
                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                            {post.readTime}
                                        </p>
                                    </div>
                                    
                                    {/* Date */}
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
                    ))
                )}
            </div>

            {/* Search Results Info */}
            {searchTerm && filteredPosts.length > 0 && (
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching &ldquo;{searchTerm}&rdquo;
                    </p>
                </div>
            )}
        </div>
    )
}
