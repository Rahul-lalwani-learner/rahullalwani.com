import dotenv from 'dotenv';
dotenv.config();

async function clearEmbeddings() {
  try {
    console.log('🗑️  Starting to clear all embeddings...');
    
    // Import the collection function
    const { getEmbeddingsCollection } = await import('../lib/vectordb');
    const collection = await getEmbeddingsCollection();
    
    console.log('✅ Connected to collection');
    
    // Delete all documents in the collection
    const result = await collection.deleteMany({});
    
    console.log(`✅ Successfully cleared ${result.deletedCount} embeddings from the collection!`);
    console.log('🎉 Collection is now empty and ready for new embeddings.');
    
  } catch (error) {
    console.error('❌ Error clearing embeddings:', error);
    process.exit(1);
  }
}

clearEmbeddings();
