const fs = require('fs');
const filePath = 'c:\\Users\\ajay\\Desktop\\Job Listing Portal\\frontend\\src\\App.jsx';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Remove the malformed route
  const fixedData = data.replace(/  {\n    path\n  },/g, '');

  fs.writeFile(filePath, fixedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('File fixed successfully!');
  });
});
