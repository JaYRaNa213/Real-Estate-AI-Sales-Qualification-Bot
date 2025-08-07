// tree.js
import fs from 'fs';
import path from 'path';

const outputFile = path.join(process.cwd(), 'tree.txt');
let output = '📁 real-estate-bot\n';

// Folders to skip
const ignoreFolders = ['node_modules', '.git', 'dist', 'build'];

const printTree = (dirPath, indent = '') => {
  const files = fs.readdirSync(dirPath).filter(f => !ignoreFolders.includes(f));

  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    const prefix = isLast ? '└── ' : '├── ';

    output += `${indent}${prefix}${file}\n`;

    if (stat.isDirectory()) {
      const newIndent = indent + (isLast ? '    ' : '│   ');
      printTree(fullPath, newIndent);
    }
  });
};

// Generate the tree structure
printTree(process.cwd());

// Write to tree.txt
fs.writeFileSync(outputFile, output);

console.log('✅ Project structure saved to tree.txt (excluding node_modules)');
