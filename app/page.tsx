
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rahul Lalwani - Full Stack Developer & AI Enthusiast',
  description: 'Welcome to my digital space! I\'m a passionate developer who loves crafting beautiful, functional web experiences that make a difference.',
  keywords: ['Rahul Lalwani', 'Full Stack Developer', 'Web Developer', 'AI Enthusiast', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Rahul Lalwani' }],
  creator: 'Rahul Lalwani',
  openGraph: {
    title: 'Rahul Lalwani - Full Stack Developer & AI Enthusiast',
    description: 'Welcome to my digital space! I\'m a passionate developer who loves crafting beautiful, functional web experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Lalwani - Full Stack Developer & AI Enthusiast',
    description: 'Welcome to my digital space! I\'m a passionate developer who loves crafting beautiful, functional web experiences.',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="py-16 max-w-3xl px-4 m-auto">
        <header className="text-black dark:text-white text-4xl font-bold mb-8">
          <h1>Hi, I&apos;m Rahul Lalwani</h1>
        </header>
        
        <section className="space-y-6 text-gray-600 dark:text-gray-300">
          <p className="text-lg">
            Welcome to my digital space! I&apos;m a passionate developer who loves crafting beautiful, 
            functional web experiences that make a difference.
          </p>
          
          <p>
            I specialize in full-stack development, bringing ideas to life through clean code, 
            thoughtful design, and seamless user interactions. Whether it&apos;s building responsive 
            web applications or solving complex technical challenges, I&apos;m always excited to dive in.
          </p>
          
          <article className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Code & Creativity</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Where technical expertise meets creative problem-solving. I believe great software 
                starts with understanding real user needs.
              </p>
            </div>
          </article>
          
          <article className="h-96 bg-gradient-to-br from-green-100 to-yellow-100 dark:from-green-900 dark:to-yellow-900 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Always Learning</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Technology evolves fast, and so do I. From modern frameworks to emerging trends, 
                I&apos;m constantly exploring new ways to build better solutions.
              </p>
            </div>
          </article>
          
          <article className="h-96 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Let&apos;s Connect</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Got an interesting project or just want to chat about tech? I&apos;d love to hear from you. 
                Drop me a line at <a href="mailto:itsrahullalwani@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">itsrahullalwani@gmail.com</a>
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
