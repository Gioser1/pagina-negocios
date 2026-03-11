import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const baseDir = 'c:/Users/Sebas/Documents/pagina-empresarial/pagina-negocios/public/imagenes/micrositios';

async function processDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg') || file.name.toLowerCase().endsWith('.png')) {
      const outputName = file.name.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const outputPath = path.join(dir, outputName);
      
      console.log(`Converting ${fullPath} to ${outputName}...`);
      try {
        await sharp(fullPath).webp({ quality: 80 }).toFile(outputPath);
        console.log(`Successfully converted. Deleting original...`);
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error(`Error converting ${fullPath}:`, err);
      }
    }
  }
}

processDirectory(baseDir).catch(console.error);
