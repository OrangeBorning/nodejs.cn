const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'tmp/hello.js')
fs.unlink(file, (err) => {
  if (err) throw err;
  console.log('成功删除 /tmp/hello');
});
