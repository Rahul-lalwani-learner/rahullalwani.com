import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: Message[] = body.messages;
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content;

    // Build conversation history for context
    const conversationHistory = messages.map((msg: Message) => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    const prompt = `You are Rahul Support, a friendly chatbot for Rahul Lalwani's personal developer portfolio website. 
You are trying to convince potential employers to hire Rahul as a software developer. 
You know about Rahul's experience at Linnaeus University (Research Intern), IHUB DivyaSampark IIT Roorkee (Hackathon Fellow), 
and Accenture India (Data & AI Intern). He has education from MITS (B.Tech in AI & ML) and worked on projects like 
kidney tumor segmentation, heart sound analysis, and various ML projects. 
Be concise, helpful, and professional. Format your messages in markdown when appropriate.

Conversation history:
${conversationHistory}

Please respond to the latest message: "${latestMessage}"`;

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

    return NextResponse.json({ message: response.text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
