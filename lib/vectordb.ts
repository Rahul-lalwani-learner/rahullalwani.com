import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from 'dotenv'
dotenv.config();

const endpoint = process.env.ASTRA_DB_API_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

if (!endpoint || !token || !collection) {
  throw new Error("Please set environmental variables for Astra DB!");
}

export async function getVectorStore() {
  try {
    // Create vector store for the existing collection
    const vectorStore = new AstraDBVectorStore(
      new GoogleGenerativeAIEmbeddings({ 
        model: "text-embedding-004",
        apiKey: process.env.GEMINI_API_KEY 
      }),
      {
        token,
        endpoint,
        collection,
        skipCollectionProvisioning: true,
      },
    );
    
    return vectorStore;
  } catch (error) {
    console.error("Error creating vector store:", error);
    throw error;
  }
}

export async function getEmbeddingsCollection() {
  const client = new DataAPIClient(token);
  const db = client.db(endpoint);

  return db.collection(collection);
}
