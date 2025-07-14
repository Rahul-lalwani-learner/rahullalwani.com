#!/usr/bin/env node
/**
 * Cache Management Utility for Portfolio Chat API
 * Usage: npm run cache:clear
 */

import { clearCache } from '../lib/cache.js';

async function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'clear':
      console.log('🗑️ Clearing cache...');
      await clearCache();
      console.log('✅ Cache cleared successfully!');
      break;
      
    default:
      console.log('Available commands:');
      console.log('  clear  - Clear all cached responses');
      console.log('');
      console.log('Usage: npm run cache:clear');
  }
}

main().catch(console.error);
