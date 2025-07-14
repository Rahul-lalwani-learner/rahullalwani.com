import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { getEmbeddingsCollection } from "../../../lib/vectordb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { getCachedResponse, setCachedResponse, generateCacheKey } from "../../../lib/cache";
import fs from 'fs';
import path from 'path';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ai = new GoogleGenAI({});

// Fallback function to get portfolio data directly from JSON files
async function getPortfolioContext(query: string): Promise<string> {
  try {
    const dataDir = path.join(process.cwd(), 'src');
    
    // Read all portfolio data
    const experiencesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'experiences.json'), 'utf-8'));
    const projectsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf-8'));
    const publicationsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'publications.json'), 'utf-8'));
    const educationsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'educations.json'), 'utf-8'));

    // Extract arrays from the data structure
    const experiences = experiencesData.experience || experiencesData.experiences || experiencesData;
    const projects = projectsData.projects || projectsData;
    const publications = publicationsData.publications || publicationsData;
    const educations = educationsData.education || educationsData.educations || educationsData;

    // Simple keyword matching for relevant context
    const lowerQuery = query.toLowerCase();
    const relevantContext = [];

    // Check for experience-related queries
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('intern') || lowerQuery.includes('job')) {
      relevantContext.push(`EXPERIENCES:\n${experiences.map((exp: {
        title: string;
        name: string;
        start: string;
        end: string;
        description: string;
      }) => 
        `- ${exp.title} at ${exp.name} (${exp.start} - ${exp.end}): ${exp.description}`
      ).join('\n')}`);
    }

    // Check for project-related queries
    if (lowerQuery.includes('project') || lowerQuery.includes('build') || lowerQuery.includes('develop')) {
      relevantContext.push(`PROJECTS:\n${projects.map((proj: {
        name: string;
        description: string;
        tags: string[];
      }) => 
        `- ${proj.name}: ${proj.description}. Technologies: ${proj.tags.join(', ')}`
      ).join('\n')}`);
    }

    // Check for education-related queries
    if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('degree') || lowerQuery.includes('university')) {
      relevantContext.push(`EDUCATION:\n${educations.map((edu: {
        title: string;
        name: string;
        start: string;
        end: string;
        description?: string;
      }) => 
        `- ${edu.title} from ${edu.name} (${edu.start} - ${edu.end}). ${edu.description || ''}`
      ).join('\n')}`);
    }

    // Check for publication-related queries
    if (lowerQuery.includes('publication') || lowerQuery.includes('research') || lowerQuery.includes('paper')) {
      relevantContext.push(`PUBLICATIONS:\n${publications.map((pub: {
        title: string;
        authors: string[];
        journal: string;
        year: number;
        description: string;
      }) => 
        `- ${pub.title} by ${pub.authors.join(', ')} in ${pub.journal} (${pub.year}): ${pub.description}`
      ).join('\n')}`);
    }

    // If no specific context found, provide general overview
    if (relevantContext.length === 0) {
      relevantContext.push(`GENERAL INFO:
- Rahul Lalwani is an AI Developer and Web Enthusiast
- Education: B.Tech in AI & ML from MITS
- Experience: Research Intern at Linnaeus University, Hackathon Fellow at IHUB DivyaSampark IIT Roorkee, Data & AI Intern at Accenture India
- Specializes in Machine Learning, Data Science, and Full-Stack Development`);
    }

    return relevantContext.join('\n\n');
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return 'General portfolio information available upon request.';
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: Message[] = body.messages;
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Generate cache key for this conversation
    const cacheKey = generateCacheKey(messages);
    
    // Try to get cached response first
    const cachedResponse = await getCachedResponse(cacheKey);
    if (cachedResponse) {
      return NextResponse.json({ 
        message: cachedResponse,
        contextSource: 'cache',
        contextUsed: true,
        cached: true
      });
    }

    const latestMessage = messages[messages.length - 1].content;
    let context = '';
    let contextSource = 'fallback';

    try {
      // Use direct embedding search instead of LangChain vector store
      const collection = await getEmbeddingsCollection();
      const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: process.env.GEMINI_API_KEY,
      });
      
      // Generate embedding for the query
      const queryEmbedding = await embeddings.embedQuery(latestMessage);
      
      // Perform vector search
      const resultsCursor = await collection.find(
        {},
        {
          vector: queryEmbedding,
          limit: 5,
          includeSimilarity: true,
        }
      );
      
      // Convert cursor to array
      const results = await resultsCursor.toArray();
      
      if (results && results.length > 0) {
        context = results.map((doc, index) => 
          `[${index + 1}] ${doc.content || doc.pageContent || doc.text || JSON.stringify(doc)}`
        ).join('\n\n');
        contextSource = 'vector_search';
        console.log(`Found ${results.length} relevant documents via direct vector search`);
      } else {
        throw new Error('No relevant documents found');
      }
    } catch (vectorError) {
      console.warn('Vector search failed, falling back to file-based context:', vectorError);
      // Fallback to file-based context
      context = await getPortfolioContext(latestMessage);
      contextSource = 'file_based';
    }

    // Build conversation history for context (limit to recent messages)
    const conversationHistory = messages.slice(-3).map((msg: Message) => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    const prompt = `You are Rahul Support, a friendly and professional chatbot for Rahul Lalwani's developer portfolio website. 
Your goal is to help potential employers and visitors learn about Rahul's skills, experience, and projects.

RELEVANT CONTEXT ABOUT RAHUL:
${context}

RECENT CONVERSATION:
${conversationHistory}

USER QUESTION: ${latestMessage}

INSTRUCTIONS:
- Use the provided context to give specific, accurate answers about Rahul's experience
- If asked about projects, mention specific technologies and provide details
- If asked about experience, reference actual companies and roles
- Be enthusiastic about Rahul's capabilities and achievements
- Keep responses concise but informative
- Use markdown formatting when appropriate
- If you don't have specific information, provide helpful general guidance

Please respond to the user's question:`;

    // Generate content with thinking budget disabled
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking for faster responses
        },
      },
    });

    const responseText = response.text;

    // Only cache if we have a valid response
    if (responseText) {
      // Cache the response for 1 hour (3600 seconds)
      await setCachedResponse(cacheKey, responseText, 3600);
    }

    return NextResponse.json({ 
      message: responseText,
      // Include context source for debugging
      contextSource,
      contextUsed: context ? true : false,
      cached: false
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
