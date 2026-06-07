import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(__dirname, '../content');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

let modifiedCount = 0;

walkDir(contentDir, filePath => {
  if (filePath.endsWith('.md')) {
    const original = fs.readFileSync(filePath, 'utf8');
    let updated = original.replace(/name:\s*"?Jacob\s+Bengula"?/g, 'name: Bengula Jacob');
    
    // Also replace other potential occurrences of Jacob Bengula with Bengula Jacob in markdown files if any
    updated = updated.replace(/Jacob\s+Bengula/g, 'Bengula Jacob');

    if (original !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      modifiedCount++;
      console.log(`Updated: ${path.relative(contentDir, filePath)}`);
    }
  }
});

console.log(`Successfully updated ${modifiedCount} files.`);
