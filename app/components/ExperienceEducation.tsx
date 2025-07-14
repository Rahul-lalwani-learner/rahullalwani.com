'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CardLink } from '../ui/cardLinks';
import experienceData from '../../src/experiences.json';
import educationData from '../../src/educations.json';

interface ExperienceItem {
  name: string;
  href: string;
  title: string;
  logo: string;
  start: string;
  end: string;
  location: string;
  description: string[];
  links?: {
    name: string;
    href: string;
    icon: string;
  }[];
}

interface EducationItem {
  name: string;
  href: string;
  title: string;
  logo: string;
  start: string;
  end: string;
  location: string;
  description: string[];
  links?: {
    name: string;
    href: string;
    icon: string;
  }[];
}

export function ExperienceEducation() {
  const [activeTab, setActiveTab] = useState<'Experience' | 'education'>('Experience');
  
  // Sort experiences by start date (most recent first)
  const experiences: ExperienceItem[] = experienceData.experience.sort((a, b) => {
    const dateA = new Date(a.start);
    const dateB = new Date(b.start);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Sort education by start date (most recent first)
  const education: EducationItem[] = educationData.education.sort((a, b) => {
    const dateA = new Date(a.start);
    const dateB = new Date(b.start);
    return dateB.getTime() - dateA.getTime();
  });

  const formatDate = (dateString: string) => {
    return dateString;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-8 pt-16">
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8 max-w-md">
        <button
          onClick={() => setActiveTab('Experience')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'Experience'
              ? 'bg-white dark:bg-background-black text-black dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
          }`}
        >
          Experience
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'education'
              ? 'bg-white dark:bg-background-black text-black dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
          }`}
        >
          Education
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'Experience' && (
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-background-black border border-light-border dark:border-hover-black rounded-lg p-6 transition-all duration-200 hover:shadow-lg dark:hover:shadow-white/10"
              >
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-background-black rounded-lg p-2 border border-light-border dark:border-hover-black ">
                    <Image
                      src={exp.logo}
                      alt={exp.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {exp.name}
                        </h3>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                          {exp.title}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 sm:text-right">
                        <p>{formatDate(exp.start)} - {formatDate(exp.end)}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <ul className="text-gray-600 dark:text-gray-400 mb-4 space-y-1">
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Links */}
                    {exp.links && exp.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.links.map((link, linkIndex) => {
                          // Map 'file' icon to 'document' since CardLink doesn't support 'file'
                          const iconType = link.icon === 'file' ? 'document' : link.icon;
                          return (
                            <CardLink
                              key={linkIndex}
                              name={link.name}
                              icon={iconType as 'linkedin' | 'github' | 'mail' | 'globe' | 'resume' | 'document' | 'colab' | 'jupyter'}
                              link={link.href}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-background-black border border-light-border dark:border-hover-black rounded-lg p-6 transition-all duration-200 hover:shadow-lg dark:hover:shadow-white/10"
              >
                <div className="flex items-start gap-4">
                  {/* Institution Logo */}
                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-background-black rounded-lg p-2 border border-light-border dark:border-hover-black">
                    <Image
                      src={edu.logo}
                      alt={edu.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {edu.name}
                        </h3>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                          {edu.title}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 sm:text-right">
                        <p>{formatDate(edu.start)} - {formatDate(edu.end)}</p>
                        <p>{edu.location}</p>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <ul className="text-gray-600 dark:text-gray-400 mb-4 space-y-1">
                      {edu.description.map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Links */}
                    {edu.links && edu.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {edu.links.map((link, linkIndex) => {
                          // Map 'file' icon to 'document' since CardLink doesn't support 'file'
                          const iconType = link.icon === 'file' ? 'document' : link.icon;
                          return (
                            <CardLink
                              key={linkIndex}
                              name={link.name}
                              icon={iconType as 'linkedin' | 'github' | 'mail' | 'globe' | 'resume' | 'document' | 'colab' | 'jupyter'}
                              link={link.href}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
