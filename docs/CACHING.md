# Redis Caching Implementation

## Overview
The portfolio chatbot now includes **Upstash Redis caching** to dramatically improve response times for repetitive questions.

## Performance Benefits
- **94% speed improvement** for cached responses
- First request: ~7 seconds (includes AI processing)
- Cached request: ~0.4 seconds (instant cache retrieval)

## How It Works

1. **Cache Key Generation**: Creates unique keys based on conversation context
2. **Cache Check**: First checks if response exists in Redis
3. **AI Processing**: If not cached, processes with vector search + AI
4. **Cache Storage**: Stores response in Redis for 1 hour
5. **Fast Retrieval**: Subsequent identical questions return instantly

## Setup Instructions

### 1. Create Upstash Account
- Go to [console.upstash.com](https://console.upstash.com/)
- Create a free Redis database
- Get your REST URL and Token

### 2. Environment Variables
Add to your `.env.local` file:
```bash
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token_here
```

### 3. Cache Management
Clear cache when needed:
```bash
npm run cache:clear
```

## Response Format
Cached responses include additional metadata:
```json
{
  "message": "AI response text",
  "contextSource": "cache", // or "vector_search", "file_based"
  "contextUsed": true,
  "cached": true // indicates if response came from cache
}
```

## Fallback Behavior
- If Redis is unavailable, system continues without caching
- No impact on functionality, only performance
- Graceful degradation ensures reliability

## Cache TTL
- Responses cached for **1 hour** (3600 seconds)
- Automatic expiration prevents stale responses
- Can be adjusted in `app/api/chat/route.ts`

## Benefits
- ⚡ **Ultra-fast responses** for common questions
- 💰 **Reduced AI API costs** for repeated queries
- 🚀 **Better user experience** with instant answers
- 🔧 **Easy management** with built-in cache utilities
