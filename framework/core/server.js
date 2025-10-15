const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');

const app = express();
const port = 3000;
const projectRoot = path.join(__dirname, '..'); // Move up one level from /core

// --- Routes ---
// Serve static files from the project root
app.use(express.static(projectRoot)); 

app.get('/api/modules', (req, res) => {
    const extensionsDir = path.join(projectRoot, 'extensions');
    fs.readdir(extensionsDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            return res.status(500).send('Internal Server Error');
        }
        const modules = files
            .filter(file => file.isDirectory())
            .map(dir => path.join(dir.name, 'main.js'));
        res.json({ modules });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(projectRoot, 'index.html'));
});

// --- Server Startup ---
const extensionsDir = path.join(projectRoot, 'extensions');
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

// 1. Generate ASCII Art
figlet('ExtensionJS', (err, data) => {
    if (err) {
        console.log('Something went wrong... Figlet failed:');
        console.dir(err);
        return;
    }

    // 2. Display Banner
    console.log(chalk.cyan.bold(data));
    console.log(chalk.green(`  A modular semi-framework for the web. v${packageJson.version}` ));
    console.log('\n');

    // 3. Find Modules and Start Server
    fs.readdir(extensionsDir, { withFileTypes: true }, (err, files) => {
        const detectedModules = files
            .filter(file => file.isDirectory())
            .map(dir => dir.name);

        app.listen(port, () => {
            console.log(chalk.yellow(`\u{1F680} Server running at http://localhost:${port}`));
            console.log(chalk.blue(`\u{1F4E6} Detected ${detectedModules.length} modules:`));
            detectedModules.forEach(module => {
                console.log(chalk.blue(`     - ${module}`));
            });
            console.log('\n');
        });
    });
});
