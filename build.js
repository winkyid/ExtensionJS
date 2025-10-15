// build.js
const fs = require('fs/promises');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const FRAMEWORK_DIR = path.join(__dirname, 'framework');

const HTML_TEMPLATE = (jsFileName) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExtensionJS App</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 20px; background-color: #f6f6f6; color: #333; }
        h1, h3 { font-weight: 600; }
        .controls { margin-top: 20px; padding: 20px; border-top: 1px solid #e5e5e5; background-color: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .controls h3 { margin-top: 0; margin-bottom: 15px; }
        .controls button {
            margin: 5px;
            padding: 10px 15px;
            border: 1px solid transparent;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        }
        .controls button.primary {
             background-color: #007aff;
             color: white;
             border-color: #007aff;
        }
        .controls button.secondary {
            background-color: #e5e5e7;
            color: #333;
        }
        .controls button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div id="app"></div>

    <!-- ExtensionJS Framework -->
    <script src="framework/core/engine.js"></script>

    <!-- App Entry Point -->
    <script src="${jsFileName}"></script>
</body>
</html>
`;

async function build() {
    console.log('Starting ExtensionJS build...');

    try {
        // 1. Clean and recreate dist directory
        await fs.rm(DIST_DIR, { recursive: true, force: true });
        await fs.mkdir(DIST_DIR, { recursive: true });
        console.log('  - Cleaned dist directory.');

        // 2. Copy framework files
        await fs.cp(FRAMEWORK_DIR, path.join(DIST_DIR, 'framework'), { recursive: true });
        console.log('  - Copied framework files.');

        // 3. Find and process .xtn files
        const srcFiles = await fs.readdir(SRC_DIR);
        const xtnFiles = srcFiles.filter(file => file.endsWith('.xtn'));

        if (xtnFiles.length === 0) {
            console.warn('  - No .xtn files found in src/.');
            return;
        }

        for (const xtnFile of xtnFiles) {
            const baseName = path.basename(xtnFile, '.xtn');
            const jsFileName = `${baseName}.js`;
            const htmlFileName = `${baseName}.html`;

            const srcPath = path.join(SRC_DIR, xtnFile);
            const destJsPath = path.join(DIST_DIR, jsFileName);
            const destHtmlPath = path.join(DIST_DIR, htmlFileName);

            // 3a. Copy .xtn as .js
            await fs.copyFile(srcPath, destJsPath);

            // 3b. Generate and write HTML file
            const htmlContent = HTML_TEMPLATE(jsFileName);
            await fs.writeFile(destHtmlPath, htmlContent);
            
            console.log(`  - Built ${xtnFile} -> ${htmlFileName} and ${jsFileName}`);
        }

        console.log('\nBuild completed successfully! ✨');

    } catch (error) {
        console.error('\nBuild failed:', error);
        process.exit(1); // Exit with error code
    }
}

// Run the build
build();
