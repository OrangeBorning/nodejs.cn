const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'tmp/hello.js')
const rfile =  path.join(__dirname, 'tmp/world.js')

fs.rename(file, rfile, (err) => {
  if (err) throw err;
  fs.stat(rfile, (err, stats) => {
    if (err) throw err;
    console.log(`文件属性: ${JSON.stringify(stats)}`);
  });
});
