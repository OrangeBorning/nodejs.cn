# fs - 文件系统（核心模块）

```js
const fs = require('fs');
```

文件系统操作都有**异步**和**同步**两种形式。

##### 异步

```js
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'tmp/hello.js')
fs.unlink(file, (err) => {
  if (err) throw err;
  console.log('成功删除 /tmp/hello');
});

```

异步形式的最后一个参数都是完成时回调函数。 传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常。

示例, 当前目录无 `/tmp/hello`

```zsh
$ node fs
/fs/fs.js:5
if (err) throw err;
         ^

Error: ENOENT: no such file or directory, unlink '*a/tmp/hello'
  at Error (native)
```

如果操作成功完成，则第一个参数会是 null 或 undefined。

示例, 当前目录有 `/tmp/hello`

```zsh
$ node fs
成功删除 /tmp/hello
```

demo测试请进入demo01

---

```js
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'tmp/hello.js')
const rfile =  path.join(__dirname, 'tmp/world.js')

fs.rename(file, rfile, (err) => {
  if (err) throw err;
  console.log('重命名完成');
});
fs.stat(rfile, (err, stats) => {
  if (err) throw err;
  console.log(`文件属性: ${JSON.stringify(stats)}`);
});
```

示例, 当前目录有 `/tmp/hello` 无 `/tmp/world`

```zsh
$ node fs1
/fs/fs1.js:11
if (err) throw err;
         ^

Error: ENOENT: no such file or directory, unlink '*a/tmp/world'
  at Error (native)
```

异步的方法不能保证执行顺序。 所以下面的例子可能会出错，因为 fs.stat() 操作可能在 fs.rename() 操作之前完成：

```js
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
```

示例, 当前目录有 `/tmp/hello` 无 `/tmp/world`

```zsh
$ node fs2
文件属性: {*}
```

若想按正确的顺序执行操作，则需要把 fs.stat() 放到 fs.rename() 操作的回调函数中：

异步的方法不能保证执行顺序。 所以下面的例子可能会出错，因为 fs.stat() 操作可能在 fs.rename() 操作之前完成：

##### 同步

```js
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'tmp/hello.js')

try {
  fs.unlinkSync(file);
  console.log('成功删除 /tmp/hello');
} catch (err) {
  throw err
}
```

当使用同步操作时，任何异常都会被立即抛出，可以使用 try/catch 来处理异常，或让异常向上冒泡。同步情况异常抛出后不会再继续执行。

示例, 当前目录无 `/tmp/hello`

```zsh
$ node fs
/fs/fs.js:9
throw err;
^

Error: ENOENT: no such file or directory, unlink '*a/tmp/hello'
  at Error (native)
  at Object.fs.unlinkSync (fs.js:1112:18)
  ...
  at run (bootstrap_node.js:394:7)
```

示例, 当前目录有 `/tmp/hello`

```zsh
$ node fs
成功删除 /tmp/hello
```

demo测试请进入demo02
