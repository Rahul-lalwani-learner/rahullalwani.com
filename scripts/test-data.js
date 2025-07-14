// Test script to verify portfolio data structure
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function testPortfolioData() {
  const dataDir = path.join(__dirname, '../src');
  
  try {
    console.log('Testing portfolio data structure...\n');
    
    // Test experiences
    const experiencesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'experiences.json'), 'utf-8'));
    const experiences = experiencesData.experience || experiencesData.experiences || experiencesData;
    console.log('✅ Experiences:', Array.isArray(experiences) ? `${experiences.length} items` : 'Not an array');
    
    // Test projects
    const projectsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf-8'));
    const projects = projectsData.projects || projectsData;
    console.log('✅ Projects:', Array.isArray(projects) ? `${projects.length} items` : 'Not an array');
    
    // Test publications
    const publicationsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'publications.json'), 'utf-8'));
    const publications = publicationsData.publications || publicationsData;
    console.log('✅ Publications:', Array.isArray(publications) ? `${publications.length} items` : 'Not an array');
    
    // Test educations
    const educationsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'educations.json'), 'utf-8'));
    const educations = educationsData.education || educationsData.educations || educationsData;
    console.log('✅ Educations:', Array.isArray(educations) ? `${educations.length} items` : 'Not an array');
    
    console.log('\n🎉 All portfolio data loaded successfully!');
    
    // Show sample project structure
    if (projects.length > 0) {
      console.log('\nSample project structure:');
      console.log('- Name:', projects[0].name || projects[0].title);
      console.log('- Description:', projects[0].description.substring(0, 50) + '...');
      console.log('- Technologies:', projects[0].tags || projects[0].technologies);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPortfolioData();
