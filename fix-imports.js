const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/features/pride');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  let newLines = [];
  let importsToMove = [];
  let inImportsRegion = true;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line is an import that needs to be moved
    if (line.match(/^\s*import \{ (?:save|get|delete).+ from "(?:@\/app\/actions\/[^"]+)";/) && i > 15) {
      importsToMove.push(line.trim());
      continue; // Skip this line from the new content
    }
    
    newLines.push(line);
  }
  
  if (importsToMove.length > 0) {
    console.log(`Fixing imports in ${file}`);
    
    // Find where to insert
    let insertIndex = 0;
    if (newLines[0] && newLines[0].includes('use client')) {
      insertIndex = 1;
    }
    
    // Insert the moved imports
    newLines.splice(insertIndex, 0, ...importsToMove);
    
    fs.writeFileSync(file, newLines.join('\n'));
  }
});
