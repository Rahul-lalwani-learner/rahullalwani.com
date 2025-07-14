import dotenv from 'dotenv';
dotenv.config();

console.log('Environment variables check:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing');
console.log('ASTRA_DB_API_ENDPOINT:', process.env.ASTRA_DB_API_ENDPOINT ? '✅ Set' : '❌ Missing');
console.log('ASTRA_DB_APPLICATION_TOKEN:', process.env.ASTRA_DB_APPLICATION_TOKEN ? '✅ Set' : '❌ Missing');
console.log('ASTRA_DB_COLLECTION:', process.env.ASTRA_DB_COLLECTION ? '✅ Set' : '❌ Missing');

if (process.env.ASTRA_DB_API_ENDPOINT) {
    console.log('Endpoint format:', process.env.ASTRA_DB_API_ENDPOINT);
    console.log('Endpoint contains https:', process.env.ASTRA_DB_API_ENDPOINT.includes('https'));
}

// Test DataAPIClient directly
import { DataAPIClient } from "@datastax/astra-db-ts";

try {
    console.log('\nTesting DataAPIClient...');
    const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN || "");
    console.log('✅ DataAPIClient created successfully');
    
    // Test db connection with different endpoint formats
    const endpoint = process.env.ASTRA_DB_API_ENDPOINT || "";
    console.log('Testing db connection...');
    client.db(endpoint);
    console.log('✅ Database connection created successfully');
    
} catch (error) {
    console.error('❌ Error testing DataAPIClient:', error);
}
