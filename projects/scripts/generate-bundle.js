const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const cssPath = path.join(projectRoot, 'scripts/assets/nepali.datepicker.v2.1.0.min.css');
const jsPath  = path.join(projectRoot, 'scripts/assets/nepali.datepicker.v2.1.0.min.js');
const outputPath1 = path.join(projectRoot, 'angular-nepali-datepicker/src/lib/generated-assets.ts');
const outputPath2 = path.join(projectRoot, 'angular-nepali-datepicker-ve/src/lib/generated-assets.ts');

try {
  const css = fs.readFileSync(cssPath, 'utf8');
  const js = fs.readFileSync(jsPath, 'utf8');

  const content = `// ================================================
// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Generated on: ${new Date().toISOString()}
// ================================================

export const nepaliDatepickerCSS = ${JSON.stringify(css)};

export const nepaliDatepickerJS = ${JSON.stringify(js)};
`;

  fs.writeFileSync(outputPath1, content, 'utf8');
  fs.writeFileSync(outputPath2, content, 'utf8');
  console.log('✅ Bundle generated successfully at:');
  console.log('   projects/angular-nepali-datepicker/src/lib/generated-assets.ts');
} catch (error) {
  console.error('❌ Failed to generate bundle:', error.message);
}