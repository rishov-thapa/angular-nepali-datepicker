const fs = require('fs');
fs.copyFileSync('./postinstall.js', 'dist/angular-nepali-datepicker/postinstall.js');
fs.copyFileSync('./publishPackage/package.json', 'dist/angular-nepali-datepicker/package.json');
fs.copyFileSync('./LICENSE', 'dist/angular-nepali-datepicker/LICENSE');
fs.copyFileSync('./CHANGELOG.md', 'dist/angular-nepali-datepicker/CHANGELOG.md');
fs.copyFileSync('./README.md', 'dist/angular-nepali-datepicker/README.md');