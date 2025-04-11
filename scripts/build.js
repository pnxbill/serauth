const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the CRA production build.
console.log("Running npm run build...");
const buildResult = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
if (buildResult.error) {
  console.error("Build failed:", buildResult.error);
  process.exit(1);
}

// Define the build directory and manifest path.
const BUILD_DIR = path.join(__dirname, '..', 'build');
const MANIFEST_PATH = path.join(BUILD_DIR, 'manifest.json');

// Helper function to find a file matching a pattern in a directory.
function findFile(dir, pattern) {
  try {
    const files = fs.readdirSync(dir);
    return files.find(file => pattern.test(file));
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
    process.exit(1);
  }
}

// Look for the main JS file in build/static/js/
// This assumes the output file begins with "main" (e.g. main.abcdef12.js).
const jsDir = path.join(BUILD_DIR, 'static', 'js');
const mainJsFile = findFile(jsDir, /^main\..*\.js$/);
if (!mainJsFile) {
  console.error("Error: Could not find the main JS file in", jsDir);
  process.exit(1);
}
const mainJsRelative = path.join('static', 'js', mainJsFile);

// Look for the main CSS file in build/static/css/ (optional)
const cssDir = path.join(BUILD_DIR, 'static', 'css');
const mainCssFile = findFile(cssDir, /^main\..*\.css$/);
const mainCssRelative = mainCssFile ? path.join('static', 'css', mainCssFile) : null;

console.log("Found JS file:", mainJsRelative);
if (mainCssRelative) {
  console.log("Found CSS file:", mainCssRelative);
}

// Read the manifest.json file.
let manifest;
try {
  const manifestData = fs.readFileSync(MANIFEST_PATH, 'utf8');
  manifest = JSON.parse(manifestData);
} catch (err) {
  console.error("Error reading manifest.json:", err);
  process.exit(1);
}

// Update the content_scripts entry.
// This example updates the first element in the content_scripts array.
if (manifest.content_scripts && manifest.content_scripts.length > 0) {
  manifest.content_scripts[0].js = [mainJsRelative];
  if (mainCssRelative) {
    manifest.content_scripts[0].css = [mainCssRelative];
  } else {
    // Remove the CSS entry if no CSS file was found.
    delete manifest.content_scripts[0].css;
  }
} else {
  console.error("No content_scripts entry found in manifest.json");
  process.exit(1);
}

// Write the updated manifest back to disk.
try {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log("Manifest updated successfully.");
} catch (err) {
  console.error("Error writing updated manifest.json:", err);
  process.exit(1);
}
