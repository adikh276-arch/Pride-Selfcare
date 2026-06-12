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
    } else if (file.endsWith('page.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const pages = walk('./src/app/pride');

pages.forEach(pagePath => {
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Find the import statement: import Component from '@/features/...';
  const importMatch = content.match(/import Component from '(@\/[^']+)';/);
  if (!importMatch) return;
  
  const componentImportPath = importMatch[1]; // e.g. @/features/pride/hub/ProcessGriefLoss
  
  // Resolve the actual file
  const relativePath = componentImportPath.replace('@/', './src/');
  let targetFile = relativePath;
  if (!targetFile.endsWith('.tsx') && !targetFile.endsWith('.ts')) {
    if (fs.existsSync(targetFile + '.tsx')) targetFile += '.tsx';
    else if (fs.existsSync(targetFile + '.ts')) targetFile += '.ts';
    else if (fs.existsSync(targetFile + '/index.tsx')) targetFile += '/index.tsx';
    else if (fs.existsSync(targetFile + '/Index.tsx')) targetFile += '/Index.tsx';
  }
  
  if (fs.existsSync(targetFile)) {
    const targetContent = fs.readFileSync(targetFile, 'utf8');
    const hasDefaultExport = targetContent.includes('export default ') || targetContent.match(/export\s+default\s+function/);
    
    if (!hasDefaultExport) {
      // Find the named export
      const exportMatch = targetContent.match(/export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/);
      if (exportMatch) {
        const componentName = exportMatch[1];
        
        // Update page.tsx
        let newContent = content.replace(
          `import Component from '${componentImportPath}';`, 
          `import { ${componentName} } from '${componentImportPath}';`
        );
        newContent = newContent.replace(/<Component \/>/g, `<${componentName} />`);
        fs.writeFileSync(pagePath, newContent);
        console.log(`Fixed ${pagePath} to use named export ${componentName}`);
      }
    } else {
        // Some default exports might be in index.ts but we need to check if there is a named export
        // Let's do nothing if it has a default export
    }
  } else {
    console.log("Could not find target file for", componentImportPath, "->", targetFile);
  }
});
