
import type { Metadata } from 'next';
import { MainSection } from './components/MainSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { FeaturedSection } from './components/FeaturedSection';

export const metadata: Metadata = {
  title: 'Rahul Lalwani - AI Developer & Web Enthusiast',
  description: 'Backend by trade, full-stack by passion. I build and self-host innovative web applications and AI solutions.',
  keywords: ['Rahul Lalwani', 'Full Stack Developer','Data Analyst','AI Enthusiast', 'Web Developer', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Rahul Lalwani' }],
  creator: 'Rahul Lalwani'
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-background-black transition-color duration-100">
      <MainSection />
      <ExperienceEducation />
      <SkillsSection />
      <FeaturedSection />
    </main>
  );
}
