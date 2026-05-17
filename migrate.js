import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsFilePath = path.join(__dirname, 'public', 'data', 'posts.json');
const postsDir = path.join(__dirname, 'public', 'data', 'posts');

// Ensure the posts directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

console.log('Iniciando migración de posts...');

try {
  // Read the current posts.json
  const rawData = fs.readFileSync(postsFilePath, 'utf8');
  const posts = JSON.parse(rawData);

  let migratedCount = 0;

  for (const post of posts) {
    if (post.content !== undefined) {
      // It's an old post with content, we need to save it individually
      const individualFilePath = path.join(postsDir, `${post.id}.json`);
      
      // Save the full post (including content) to its own file
      fs.writeFileSync(individualFilePath, JSON.stringify(post, null, 2), 'utf8');
      
      // Remove content from the post object for the index
      delete post.content;
      migratedCount++;
    }
  }

  // Save the lightweight index back to posts.json
  if (migratedCount > 0) {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
    console.log(`¡Migración completada! Se han migrado ${migratedCount} posts.`);
    console.log(`El archivo posts.json ahora es mucho más ligero.`);
    console.log(`Por favor, haz commit y push de estos cambios a tu repositorio.`);
  } else {
    console.log('No se encontraron posts antiguos para migrar. Todo está actualizado.');
  }

} catch (error) {
  console.error('Error durante la migración:', error);
}
