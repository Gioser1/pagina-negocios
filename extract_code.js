import fs from 'node:fs';
fetch('https://olimpo-empresa.com/assets/index-Bfb0utqr.js')
  .then(r => r.text())
  .then(text => {
    const idx = text.indexOf('VER STACK DEVOPS');
    if (idx !== -1) {
      fs.writeFileSync('extracted_comp.txt', text.substring(Math.max(0, idx - 15000), idx + 15000));
      console.log('Found and extracted');
    } else {
      console.log('Not found');
    }
  });
