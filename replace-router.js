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

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Fix imports
  if (content.includes('react-router-dom')) {
    content = content.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
      let parts = imports.split(',').map(s => s.trim());
      let nextNav = [];
      let nextLink = false;
      let removed = [];

      parts.forEach(p => {
        if (p === 'useNavigate') nextNav.push('useRouter');
        else if (p === 'useLocation') nextNav.push('usePathname');
        else if (p === 'useParams') nextNav.push('useParams');
        else if (p === 'Link' || p.includes('NavLink')) nextLink = true;
        else removed.push(p); // BrowserRouter, Routes, Route
      });

      let res = '';
      if (nextNav.length > 0) {
        res += `import { ${nextNav.join(', ')} } from "next/navigation";\n`;
      }
      if (nextLink) {
        res += `import Link from "next/link";\n`;
      }
      return res.trim();
    });
  }

  // Replace hook calls
  content = content.replace(/const\s+(\w+)\s*=\s*useNavigate\(\)/g, 'const router = useRouter()');
  content = content.replace(/const\s+(\w+)\s*=\s*useLocation\(\)/g, 'const $1 = usePathname()');

  // Replace navigate function calls
  // The hook replaced `const navigate = useRouter()` to `const router = useRouter()`
  // So we replace `navigate(` with `router.push(`
  content = content.replace(/\bnavigate\(/g, 'router.push(');

  // Replace <Link to="..."> with <Link href="...">
  content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');
  
  // Replace <NavLink to="..."> with <Link href="...">
  content = content.replace(/<NavLink([^>]+)to=/g, '<Link$1href=');
  content = content.replace(/<\/NavLink>/g, '</Link>');

  // Also RouterNavLink
  content = content.replace(/<RouterNavLink([^>]+)to=/g, '<Link$1href=');
  content = content.replace(/<\/RouterNavLink>/g, '</Link>');

  if (content !== originalContent) {
    console.log('Updated', file);
    fs.writeFileSync(file, content, 'utf8');
  }
});
