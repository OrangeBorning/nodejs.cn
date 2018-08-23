const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'tmp/hello.js')

try {
  fs.unlinkSync(file);
  console.log('成功删除 /tmp/hello');
} catch (err) {
  throw err
}
