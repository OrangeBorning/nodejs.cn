# module 模块

先来一个 index.js，因为 module 这个关键词是已经被声明过点，所以下面的代码运行会产生异常

```js
const module = require('module');
```

这里运行 index.js

```bash
node index.js
index.js:1
(function (exports, require, module, __filename, __dirname) { const module = require('module');
                                                                    ^

SyntaxError: Identifier 'module' has already been declared
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:139:10)
    at Module._compile (module.js:616:28)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3
```

通过上面的异常发现

```js
(function (exports, require, module, __filename, __dirname) {});
```

这里是一个知识点 [模块包装器](#wrapper 模块包装器)，你可以现在就去看看，或者继续阅读（在执行模块代码之前，Node.js 会使用一个如上的函数包装器将其包装）。

让我们修正 index.js, 然后再次运行

```js
const moduleObj = require('module');
```
```bash
node index.js
{ [Function: Module]
  builtinModules: 
   [ 'async_hooks',
     'assert',
     'buffer',
     'child_process',
     'console',
     'constants',
     'crypto',
     'cluster',
     'dgram',
     'dns',
     'domain',
     'events',
     'fs',
     'http',
     'http2',
     '_http_agent',
     '_http_client',
     '_http_common',
     '_http_incoming',
     '_http_outgoing',
     '_http_server',
     'https',
     'inspector',
     'module',
     'net',
     'os',
     'path',
     'perf_hooks',
     'process',
     'punycode',
     'querystring',
     'readline',
     'repl',
     'stream',
     '_stream_readable',
     '_stream_writable',
     '_stream_duplex',
     '_stream_transform',
     '_stream_passthrough',
     '_stream_wrap',
     'string_decoder',
     'sys',
     'timers',
     'tls',
     '_tls_common',
     '_tls_legacy',
     '_tls_wrap',
     'tty',
     'url',
     'util',
     'v8',
     'vm',
     'zlib',
     'v8/tools/splaytree',
     'v8/tools/codemap',
     'v8/tools/consarray',
     'v8/tools/csvparser',
     'v8/tools/profile',
     'v8/tools/profile_view',
     'v8/tools/logreader',
     'v8/tools/tickprocessor',
     'v8/tools/SourceMap',
     'v8/tools/tickprocessor-driver',
     'node-inspect/lib/_inspect',
     'node-inspect/lib/internal/inspect_client',
     'node-inspect/lib/internal/inspect_repl' ],
  _cache: 
   { '/Users/zhuxiaopeng/Desktop/github/nodejs.cn/index.js': 
      Module {
        id: '.',
        exports: {},
        parent: null,
        filename: '/Users/zhuxiaopeng/Desktop/github/nodejs.cn/index.js',
        loaded: false,
        children: [],
        paths: [Array] } },
  _pathCache: 
   { '/Users/zhuxiaopeng/Desktop/github/nodejs.cn/index.js\u0000': '/Users/zhuxiaopeng/Desktop/github/nodejs.cn/index.js' },
  _extensions: { '.js': [Function], '.json': [Function], '.node': [Function] },
  globalPaths: 
   [ '/Users/zhuxiaopeng/.node_modules',
     '/Users/zhuxiaopeng/.node_libraries',
     '/Users/zhuxiaopeng/.nvm/versions/node/v8.11.3/lib/node' ],
  wrapper: 
   [ '(function (exports, require, module, __filename, __dirname) { ',
     '\n});' ],
  wrap: [Function],
  _debug: [Function],
  _findPath: [Function],
  _nodeModulePaths: [Function],
  _resolveLookupPaths: [Function],
  _load: [Function],
  _resolveFilename: [Function],
  runMain: [Function],
  _initPaths: [Function],
  _preloadModules: [Function],
  Module: [Circular] }
```

在这些输出的结果中，可以看到这些字段

- builtinModules: nodejs 固有模块
- _cache: 缓存的模块，在这里可以注意到，刚刚运行的 index.js 已经进入了缓存
- _pathCache: 缓存的模块路径，同样是刚刚运行的 index.js
- _extensions: 扩展 `{ '.js': [Function], '.json': [Function], '.node': [Function] }`
- globalPaths: 模块的全局路径
- wrapper: 模块包装器
- _debug
- _findPath
- _nodeModulePaths
- _resolveLookupPaths
- _load
- _resolveFilename
- runMain
- _initPaths
- _preloadModules
- Module

## wrapper 模块包装器

在执行模块代码之前，Node.js 会使用一个如下的函数包装器将其包装：

```js
(function(exports, require, module, __filename, __dirname) {
  // 模块的代码实际上在这里
});
```

通过这样做，Node.js 实现了以下几点：

它保持了顶层的变量（用 `var`、`const` 或 `let` 定义）作用在模块范围内，而不是全局对象。
它有助于提供一些看似全局的但实际上是模块特定的变量，例如：  
- 实现者可以用于从模块中导出值的 `module` 和 `exports` 对象。
- 包含模块绝对文件名和目录路径的快捷变量 `__filename` 和 `__dirname`。

## exports

这是一个对于 **module.exports** 的更简短的引用形式。什么时候使用 `exports`、什么时候使用 `module.exports`？

### exports shortcut 快捷方式

`exports` 变量是在模块的文件级别作用域内有效的，它在模块被执行前被赋予 `module.exports` 的值。

它有一个快捷方式，以便 `module.exports.f = ...` 可以被更简洁地写成 `exports.f = ...`。 注意，就像任何变量，如果一个新的值被赋值给 `exports`，它就不再绑定到 `module.exports`：

```js
module.exports.hello = true; // 从对模块的引用中导出
exports = { hello: false };  // 不导出，只在模块内有效
```

当 `module.exports` 属性被一个新的对象完全替代时，也会重新赋值 `exports`，例如：

```js
module.exports = exports = function Constructor() {
  // ... 及其他
};
```

为了解释这个行为，想象对 `require()` 的假设实现，它跟 `require()` 的实际实现相当类似：

```js
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // 模块代码在这。在这个例子中，定义了一个函数。
    function someFunc() {}
    exports = someFunc;
    // 此时，exports 不再是一个 module.exports 的快捷方式，
    // 且这个模块依然导出一个空的默认对象。
    module.exports = someFunc;
    // 此时，该模块导出 someFunc，而不是默认对象。
  })(module, module.exports);
  return module.exports;
}
```

## require

引入模块

module.require(id) 返回已解析的模块的 module.exports
odule.require 方法提供了一种类似 require() 从原始模块被调用的加载模块的方式。
注意，为了做到这个，需要获得一个 module 对象的引用。 因为 require() 会返回 module.exports，且 module 只在一个特定的模块代码中有效，所以为了使用它，必须明确地导出。

require.cache 被引入的模块将被缓存在这个对象中。从此对象中删除键值对将会导致下一次 require 重新加载被删除的模块。注意不能删除 native addons（原生插件），因为它们的重载将会导致错误。
require.main Module对象，表示Node.js进程启动时加载的条目脚本。

  ```bash
  Module {
    id: '.',
    exports: {},
    parent: null,
    filename: '/absolute/path/to/entry.js',
    loaded: false,
    children: [],
    paths:
    [ '/absolute/path/to/node_modules',
      '/absolute/path/node_modules',
      '/absolute/node_modules',
      '/node_modules' ] }
  ```

require.resolve(request[, options]) 使用内部的 require() 机制查询模块的位置, 此操作只返回解析后的文件名，不会加载该模块。
- request 需要解析的模块路径。
- options 解析模块的起点路径。此参数存在时，将使用这些路径而非默认解析路径。    注意此数组中的每一个路径都被用作模块解析算法的起点，意味着 node_modules 层级将从这里开始查询。

require.resolve.paths(request) 返回一个数组，其中包含解析 request 过程中被查询的路径。 如果 request 字符串指向核心模块（例如 http 或 fs），则返回 null。

## module

对当前模块的引用, 查看关于 module object 的章节。 module.exports 用于指定一个模块所导出的内容，即可以通过 require() 访问的内容。

```shell
Module {
  id: '.', 
  exports: {},
  parent: null,
  filename: '/Users/zhuxiaopeng/Desktop/github/nodejs.cn/index.js',
  loaded: false,
  children: [],
  paths: [Array]
}
```
module.id 模块的标识符。 通常是完全解析后的文件名
module.exports 对象是由模块系统创建的
module.parent 最先引用该模块的模块
module.filename 模块的完全解析后的文件名
module.loaded 模块是否已经加载完成，或正在加载中
module.children 被该模块引用的模块对象
module.paths 模块的搜索路径。

## __dirname

当前模块的目录名，等同于 `__filename` 的 `path.dirname()` 的值。

## __filename

当前模块的文件名称---解析后的绝对路径。

## require import 傻傻分不清楚 todo

node 中可以开心的使用 import 方式吗
```js
import moudleObj from 'module';
```
```bash
node -v 
v8.11.3
node index.js
/Users/zhuxiaopeng/Desktop/github/nodejs.cn/index.js:2
import module from 'module';
^^^^^^

SyntaxError: Unexpected token import
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:139:10)
    at Module._compile (module.js:616:28)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3

node -v 
v10.11.0
node index.js
/Users/zhuxiaopeng/Desktop/github/nodejs.cn/index.js:2
import module from 'module';
^^^^^^

SyntaxError: Unexpected token import
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:139:10)
    at Module._compile (module.js:616:28)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3
```