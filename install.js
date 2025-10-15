// /install.js - Copies framework files to the user's project root on install.

const fs = require('fs');
const path = require('path');

// The source is the package's own directory
const sourceDir = __dirname;
// The destination is the project installing the package
const destDir = process.cwd();

// A simple check to prevent the script from running on itself during development
if (sourceDir === destDir) {
    return;
}

console.log('\nSetting up ExtensionJS framework...');

const itemsToCopy = [
    'framework',
    'src',
    'build.js',
    'server.js'
];

itemsToCopy.forEach(item => {
    const sourcePath = path.join(sourceDir, item);
    const destPath = path.join(destDir, item);

    if (fs.existsSync(destPath)) {
        console.log(`- '${item}' already exists. Skipping.`);
    } else {
        try {
            fs.cpSync(sourcePath, destPath, { recursive: true });
            console.log(`+ Copied '${item}' to your project.`);
        } catch (error) {
            console.error(`! Error copying '${item}':`, error);
        }
    }
});

console.log('\n✅ ExtensionJS setup complete!');
console.log('   Run "node server.js" to start your development server.\n');
