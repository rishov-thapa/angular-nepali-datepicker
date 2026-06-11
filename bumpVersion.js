const fs = require('fs');
const path = require('path');

const oldVersion = "888.1.1"
const newVersion = "2.1.0"

if (!newVersion) {
  console.error('❌ Please provide a version number, e.g., node postinstall.js 1.0.2');
  process.exit(1);
}

console.log(`🔄 Updating version to ${newVersion}...`);

const filesToUpdate = [
  'package.json',
  'projects/angular-nepali-datepicker/package.json',
  'projects/angular-nepali-datepicker-ve/package.json',
  'publishPackage/package.json',
  "package-lock.json",
];

filesToUpdate.forEach((filePath) => {
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  let parsed;

  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error(`❌ Failed to parse JSON in ${filePath}`);
    return;
  }

  if (parsed.version) {
    parsed.version = newVersion;
    fs.writeFileSync(fullPath, JSON.stringify(parsed, null, 2) + '\n');
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.warn(`ℹ️ No "version" key found in ${filePath}`);
  }
});

// Update version badge in README.md
const readmePath = path.resolve(__dirname, 'README.md');
if (fs.existsSync(readmePath)) {
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  const badgeRegex = /(<img\s+alt="Release"\s+src="https:\/\/img\.shields\.io\/badge\/Release-)(v?[\d.]+)(-blueviolet\.svg")/;

  if (badgeRegex.test(readmeContent)) {
    const versionWithV = newVersion.startsWith('v') ? newVersion : 'v' + newVersion;
    readmeContent = readmeContent.replace(badgeRegex, `$1${versionWithV}$3`);
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`✅ Updated version badge in README.md`);
  } else {
    console.warn('⚠️ Version badge not found in README.md');
  }
}

const assetsPath = path.resolve(__dirname, '../angular-nepali-datepicker/projects/scripts/assets');
function renameAssetsIn(dir) {
  const cssOld = path.join(dir, `nepali.datepicker.v${oldVersion}.min.css`);
  const cssNew = path.join(dir, `nepali.datepicker.v${newVersion}.min.css`);
  const jsOld = path.join(dir, `nepali.datepicker.v${oldVersion}.min.js`);
  const jsNew = path.join(dir, `nepali.datepicker.v${newVersion}.min.js`);

  if (fs.existsSync(cssOld)) fs.renameSync(cssOld, cssNew);
  if (fs.existsSync(jsOld)) fs.renameSync(jsOld, jsNew);
}

renameAssetsIn(assetsPath);


const bundleGenerationPath = path.resolve(__dirname, '../angular-nepali-datepicker/projects/scripts/generate-bundle.js');


function updateBundleFileVersion(filePath, oldVersion, newVersion) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  const regex = new RegExp(`nepali\\.datepicker\\.v${oldVersion}\\.min\\.(css|js)`, 'g');
  const updatedContent = content.replace(regex, `nepali.datepicker.v${newVersion}.min.$1`);

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`✅ Updated version references in ${filePath}`);
  } else {
    console.log(`⚠️  No version references found to replace in ${filePath}`);
  }
}

updateBundleFileVersion(bundleGenerationPath, oldVersion, newVersion);