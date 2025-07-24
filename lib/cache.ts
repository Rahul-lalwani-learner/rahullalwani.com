import { Redis } from '@upstash/redis';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Simple in-memory cache for development
const memoryCache = new Map<string, { value: string; expiry: number }>();

let redis: Redis | null = null;
let useMemoryCache = false;

// Memory cache helper functions
function getFromMemoryCache(key: string): string | null {
  const cached = memoryCache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.value;
  }
  if (cached) {
    memoryCache.delete(key); // Clean up expired entries
  }
  return null;
}

function setInMemoryCache(key: string, value: string, ttlSeconds: number): void {
  const expiry = Date.now() + (ttlSeconds * 1000);
  memoryCache.set(key, { value, expiry });
}

export function getRedisClient(): Redis | null {
  if (!redis && !useMemoryCache) {
    try {
      // Check if required environment variables are available
      const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
      const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
      
      if (!redisUrl || !redisToken) {
        console.warn('⚠️ Upstash Redis environment variables not found. Using memory cache for development.');
        useMemoryCache = true;
        return null;
      }

      // Initialize Upstash Redis
      redis = new Redis({
        url: redisUrl,
        token: redisToken,
      });
      console.log('✅ Upstash Redis initialized successfully');
    } catch (error) {
      console.warn('⚠️ Upstash Redis initialization failed, falling back to memory cache:', error);
      useMemoryCache = true;
      redis = null;
    }
  }
  return redis;
}

export async function getCachedResponse(key: string): Promise<string | null> {
  // Try memory cache first if enabled
  if (useMemoryCache) {
    const memoryResult = getFromMemoryCache(key);
    if (memoryResult) {
      console.log('🚀 Memory cache hit for key:', key.substring(0, 50) + '...');
      return memoryResult;
    }
    return null;
  }

  try {
    const redisClient = getRedisClient();
    if (!redisClient) return null;

    const cached = await redisClient.get(key);
    if (cached && typeof cached === 'string') {
      console.log('🚀 Redis cache hit for key:', key.substring(0, 50) + '...');
      return cached;
    }
    return null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = error instanceof Error && 'code' in error ? (error as Error & { code: string }).code : null;
    
    console.warn('⚠️ Redis cache read error, falling back to memory cache:', errorMessage);
    
    // Fall back to memory cache on Redis errors
    if (errorCode === 'ENOTFOUND' || errorMessage.includes('fetch failed')) {
      redis = null;
      useMemoryCache = true;
      return getFromMemoryCache(key);
    }
    return null;
  }
}

export async function setCachedResponse(key: string, response: string, ttlSeconds: number = 86400): Promise<void> {
  // Use memory cache if enabled
  if (useMemoryCache) {
    setInMemoryCache(key, response, ttlSeconds);
    console.log('💾 Cached in memory for key:', key.substring(0, 50) + '...');
    return;
  }

  try {
    const redisClient = getRedisClient();
    if (!redisClient) return;

    await redisClient.setex(key, ttlSeconds, response);
    console.log('💾 Cached in Redis for key:', key.substring(0, 50) + '...');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = error instanceof Error && 'code' in error ? (error as Error & { code: string }).code : null;
    
    console.warn('⚠️ Redis cache write error, falling back to memory cache:', errorMessage);
    
    // Fall back to memory cache on Redis errors
    if (errorCode === 'ENOTFOUND' || errorMessage.includes('fetch failed')) {
      redis = null;
      useMemoryCache = true;
      setInMemoryCache(key, response, ttlSeconds);
      console.log('💾 Cached in memory (fallback) for key:', key.substring(0, 50) + '...');
    }
  }
}

export function generateCacheKey(messages: Message[]): string {
  // Create a cache key based on the last few messages for context
  const lastMessages = messages.slice(-2); // Last 2 messages for context
  const content = lastMessages.map(msg => `${msg.role}:${msg.content}`).join('|');
  
  // Create a simple hash of the content
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return `chat:${Math.abs(hash)}`;
}

export async function clearCache(): Promise<void> {
  // Clear memory cache
  if (useMemoryCache) {
    memoryCache.clear();
    console.log('🗑️ Memory cache cleared');
    return;
  }

  try {
    const redisClient = getRedisClient();
    if (!redisClient) return;

    await redisClient.flushall();
    console.log('🗑️ Redis cache cleared');
  } catch (error) {
    console.warn('⚠️ Cache clear error:', error);
    // Fall back to clearing memory cache
    memoryCache.clear();
    console.log('🗑️ Memory cache cleared (fallback)');
  }
}
