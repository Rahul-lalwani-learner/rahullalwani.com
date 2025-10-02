import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from 'dotenv';
dotenv.config();

interface Experience {
  name: string;
  title: string;
  start: string;
  end: string;
  description: string;
  technologies?: string[];
  location?: string;
}

interface Project {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
}

interface Publication {
  title: string;
  description: string;
  type: string;
  publisher?: string;
  book?: string;
  tags: string[];
  links?: { name: string; href: string; icon: string; }[];
}

interface Social {
  name: string;
  href: string;
  icon: string;
}

interface Education {
  name: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
}

async function buildEmbeddings() {
  try {
    console.log('Starting to build embeddings...');
    
    // Try to connect directly to existing collection instead of using vector store
    const { getEmbeddingsCollection } = await import('../lib/vectordb');
    const collection = await getEmbeddingsCollection();
    
    console.log('✅ Connected to existing collection');
    
    // Clear existing embeddings first
    console.log('🗑️  Clearing existing embeddings...');
    const deleteResult = await collection.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing embeddings`);
    
    // Continue with data processing...
    const dataDir = path.join(process.cwd(), 'src');
    
    const experiencesData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'experiences.json'), 'utf-8')
    );
    
    const projectsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf-8')
    );
    
    const publicationsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'publications.json'), 'utf-8')
    );
    
    const educationsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'educations.json'), 'utf-8')
    );

    // Load socials data
    const socialsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'socials.json'), 'utf-8')
    );

    // Extract arrays from the data structure
    const experiences = experiencesData.experience || experiencesData.experiences || experiencesData;
    const projects = projectsData.projects || projectsData;
    const publications = publicationsData.publications || publicationsData;
    const educations = educationsData.education || educationsData.educations || educationsData;
    const socials = socialsData.socials || socialsData;

    // Prepare documents for embedding
    const documents = [];

    // Add homepage/general information
    // Create a comprehensive skills summary from all projects
    const allTechnologies = new Set<string>();
    projects.forEach((project: Project) => {
      project.tags?.forEach(tag => allTechnologies.add(tag));
    });
    
    const skillsList = Array.from(allTechnologies).join(', ');
    
  const homepageContent = `
Rahul Lalwani - AI & ML Engineer at RavenRisk AI

Bio: Passionate about AI and web development, blending intelligence with seamless user experiences. Rahul has completed his B.Tech in Artificial Intelligence and Machine Learning from Madhav Institute of Technology and Science, and now works as an AI & ML Engineer at RavenRisk AI, New York, United States working remotly.

Current Role: AI & ML Engineer at RavenRisk AI (Sep 2025 - Present). Working on GenAI feature development, MLOps, and bridging AI with web development teams to deliver end-to-end solutions.

Key Achievements: AIR 418 and AIR 421 in GATE 2025-24 (DA) - All India Rank in Graduate Aptitude Test in Engineering for Data Science & Artificial Intelligence. Successfully transitioned from academia to industry, contributing to production-level AI solutions.

Technical Skills: ${skillsList}

Core Competencies: Full Stack Development, Data Analysis, AI/ML Engineering, MLOps, Web Development, React, Next.js, TypeScript, Machine Learning, Data Science, Cloud Computing.

Contact Information: 
- Email: itsrahullalwani@gmail.com
- LinkedIn: https://www.linkedin.com/in/itsrahullalwani/
- GitHub: https://github.com/Rahul-lalwani-learner

Social Media Profiles:
${socials.map((social: Social) => `- ${social.name}: ${social.href}`).join('\n')}

Professional Summary: AI & ML Engineer at RavenRisk AI, with a strong foundation in full-stack development and artificial intelligence. Experienced in building and deploying innovative web applications and AI solutions. Adept at integrating AI models into production and collaborating across teams.

Current Learning & Development: Exploring advanced MLOps practices, scalable AI deployment, and the intersection of Web3 with AI. Continuously learning to bridge the gap between traditional and decentralized web technologies.

Resume: Available at https://drive.google.com/file/d/1SlcxnKh9HRbkQ3sKdS8w9R4flozbaxyH/view?usp=sharing

About: AI & ML Engineer passionate about creating intelligent, production-ready web applications and solutions. Strong academic background with top GATE rankings, now applying expertise in industry. Experienced in full-stack development, machine learning, and data science projects, with a focus on real-world impact.

Rahul Lalwani is a dedicated problem solver with a strong grasp of Data Structures and Algorithms, as demonstrated by his LeetCode profile, where he has solved 593 problems across all difficulty levels—131 easy, 369 medium, and 93 hard—out of 3617 available. With a global rank of 102,486, he has made over 1,100 submissions in 2024 alone, maintaining a streak of 132 days and staying active for 303 days this year. Rahul has earned 16 badges, including the prestigious 365 Days Badge, reflecting his consistency and commitment. Now, as a professional engineer, he continues to sharpen his algorithmic thinking and problem-solving skills in real-world projects.
Leetcode profile link - https://leetcode.com/u/RahulLalwani/
`;

    documents.push({
      pageContent: homepageContent.trim(),
      metadata: {
        type: 'general',
        id: 0,
        source: 'homepage',
        category: 'personal_info'
      }
    });

    // Process experiences
    experiences.forEach((exp: Experience, index: number) => {
      const content = `Experience at ${exp.name} as ${exp.title} (${exp.start} - ${exp.end}): ${exp.description}. Location: ${exp.location || 'N/A'}.`;
      documents.push({
        pageContent: content,
        metadata: {
          type: 'experience',
          id: index,
          company: exp.name,
          position: exp.title,
          duration: `${exp.start} - ${exp.end}`,
          location: exp.location
        }
      });
    });

    // Process projects
    projects.forEach((project: Project, index: number) => {
      const content = `Project: ${project.name}. Description: ${project.description}. Technologies: ${project.tags.join(', ')}.`;
      documents.push({
        pageContent: content,
        metadata: {
          type: 'project',
          id: index,
          title: project.name,
          technologies: project.tags,
          image: project.image
        }
      });
    });

    // Process publications
    publications.forEach((pub: Publication, index: number) => {
      const content = `Publication: ${pub.title}. Type: ${pub.type}. Publisher: ${pub.publisher || 'N/A'}. Description: ${pub.description}. Tags: ${pub.tags?.join(', ') || 'N/A'}.`;
      documents.push({
        pageContent: content,
        metadata: {
          type: 'publication',
          id: index,
          title: pub.title,
          publicationType: pub.type,
          publisher: pub.publisher,
          tags: pub.tags || [],
          links: pub.links || []
        }
      });
    });

    // Process education
    educations.forEach((edu: Education, index: number) => {
      const content = `Education: ${edu.title} from ${edu.name} (${edu.start} - ${edu.end}). ${edu.description || ''} Location: ${edu.location || 'N/A'}.`;
      documents.push({
        pageContent: content,
        metadata: {
          type: 'education',
          id: index,
          institution: edu.name,
          degree: edu.title,
          duration: `${edu.start} - ${edu.end}`,
          location: edu.location
        }
      });
    });

    console.log(`Prepared ${documents.length} documents for embedding...`);

    // Initialize embeddings model
    const embeddings = new GoogleGenerativeAIEmbeddings({ 
      model: "text-embedding-004",
      apiKey: process.env.GEMINI_API_KEY 
    });

    console.log('Generating embeddings for documents...');
    
    // Process documents in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(documents.length/batchSize)}...`);
      
      for (const doc of batch) {
        try {
          // Generate embedding for this document
          const embedding = await embeddings.embedQuery(doc.pageContent);
          
          // Insert into collection
          await collection.insertOne({
            $vector: embedding,
            content: doc.pageContent,
            metadata: doc.metadata
          });
          
          console.log(`✅ Embedded and stored: ${doc.metadata.type} #${doc.metadata.id}`);
        } catch (error) {
          console.error(`❌ Error processing document:`, doc.metadata, error);
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('✅ Successfully built and stored embeddings!');
    console.log(`📊 Total documents embedded: ${documents.length}`);
    console.log('📝 Document types:');
    console.log(`   - Experiences: ${experiences.length}`);
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Publications: ${publications.length}`);
    console.log(`   - Education: ${educations.length}`);
    console.log(`   - General: 1`);
    
  } catch (error) {
    console.error('❌ Error building embeddings:', error);
    process.exit(1);
  }
}

buildEmbeddings();
