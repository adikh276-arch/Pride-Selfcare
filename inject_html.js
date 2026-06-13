const fs = require('fs');
const path = require('path');

const folders = [
  'coming-out-practice',
  'confidence-mirror',
  'dealing-with-homophobia',
  'gay-and-proud',
  'gay-coming-out',
  'lesbian-power-booster',
  'masculinity-on-your-own-terms',
  'when-they-react'
];

let injectedCount = 0;

for (const folder of folders) {
  const filePath = path.join(__dirname, 'public/static/pride', folder, 'index.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has the postMessage
    if (content.includes('finish_activity')) {
      console.log(`Already injected in ${folder}`);
      continue;
    }
    
    // Inject right inside `function showFinish() {`
    // Note: Some might be `function showFinish(){`
    content = content.replace(/function showFinish\s*\(\)\s*\{/, 'function showFinish() {\n  window.parent.postMessage("finish_activity", "*");');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected into ${folder}`);
    injectedCount++;
  } else {
    console.warn(`Not found: ${filePath}`);
  }
}

console.log(`Finished injecting into ${injectedCount} HTML files.`);
