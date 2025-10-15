// server.js
const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const chokidar = require('chokidar');
const { exec } = require('child_process');

const app = express();
const port = 3000;

const DIST_DIR = path.join(__dirname, 'dist');
const FRAMEWORK_EXTENSIONS_DIR = path.join(DIST_DIR, 'framework', 'extensions');

let isBuilding = false;
let buildQueued = false;

// --- Build Script Runner ---
function runBuild() {
    if (isBuilding) {
        buildQueued = true;
        return;
    }

    isBuilding = true;
    console.log('\n🚀 Change detected. Starting build...');
    
    const buildProcess = exec('node build.js');

    buildProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    buildProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
    });

    buildProcess.on('close', (code) => {
        isBuilding = false;
        if (code === 0) {
            console.log('✅ Build finished. Watching for changes...');
        } else {
            console.error(`❌ Build failed with code ${code}.`);
        }
        if (buildQueued) {
            buildQueued = false;
            runBuild();
        }
    });
}

// --- API Routes ---
app.get('/api/modules', async (req, res) => {
    try {
        const extensionDirs = await fs.readdir(FRAMEWORK_EXTENSIONS_DIR, { withFileTypes: true });
        const modules = extensionDirs
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path.join(dirent.name, 'main.js'));
        res.json({ modules });
    } catch (error) {
        console.error("Could not list modules. Did the build run correctly?", error);
        return res.status(500).json({ error: 'Could not list modules.' });
    }
});

// --- Static Server ---
app.use(express.static(DIST_DIR));

// --- Initial Build and Server Start ---
// Use a self-invoking async function to await the first build
(async () => {
    await new Promise(resolve => {
        const initialBuild = exec('node build.js');
        initialBuild.stdout.on('data', data => process.stdout.write(data));
        initialBuild.stderr.on('data', data => process.stderr.write(data));
        initialBuild.on('close', resolve);
    });

    app.listen(port, () => {
        console.log(`\n🌐 Server running at http://localhost:${port}`);
        console.log('📦 Serving files from ./dist');
        
        // --- File Watcher ---
        const watcher = chokidar.watch([
            path.join(__dirname, 'src'),
            path.join(__dirname, 'framework')
        ], {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            persistent: true,
            ignoreInitial: true // Don't trigger on initial scan
        });

        console.log('👀 Watching for changes in ./src and ./framework...');
        watcher.on('all', (event, filePath) => {
            console.log(`\n  - Detected ${event} in ${path.relative(__dirname, filePath)}`);
            runBuild();
        });
    });
})();
