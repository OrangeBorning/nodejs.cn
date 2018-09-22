# dns 域名服务器

```js
const dns = module.require('dns');
console.log(dns);
```
```bash
{ lookup: [Function: lookup],
  lookupService: [Function: lookupService],
  Resolver: [Function: Resolver],
  setServers: [Function: defaultResolverSetServers],
  ADDRCONFIG: 1024,
  V4MAPPED: 2048,
  NODATA: 'ENODATA',
  FORMERR: 'EFORMERR',
  SERVFAIL: 'ESERVFAIL',
  NOTFOUND: 'ENOTFOUND',
  NOTIMP: 'ENOTIMP',
  REFUSED: 'EREFUSED',
  BADQUERY: 'EBADQUERY',
  BADNAME: 'EBADNAME',
  BADFAMILY: 'EBADFAMILY',
  BADRESP: 'EBADRESP',
  CONNREFUSED: 'ECONNREFUSED',
  TIMEOUT: 'ETIMEOUT',
  EOF: 'EOF',
  FILE: 'EFILE',
  NOMEM: 'ENOMEM',
  DESTRUCTION: 'EDESTRUCTION',
  BADSTR: 'EBADSTR',
  BADFLAGS: 'EBADFLAGS',
  NONAME: 'ENONAME',
  BADHINTS: 'EBADHINTS',
  NOTINITIALIZED: 'ENOTINITIALIZED',
  LOADIPHLPAPI: 'ELOADIPHLPAPI',
  ADDRGETNETWORKPARAMS: 'EADDRGETNETWORKPARAMS',
  CANCELLED: 'ECANCELLED',
  getServers: [Function: bound getServers],
  resolve: [Function: bound resolve],
  resolveAny: [Function: bound queryAny],
  resolve4: [Function: bound queryA],
  resolve6: [Function: bound queryAaaa],
  resolveCname: [Function: bound queryCname],
  resolveMx: [Function: bound queryMx],
  resolveNs: [Function: bound queryNs],
  resolveTxt: [Function: bound queryTxt],
  resolveSrv: [Function: bound querySrv],
  resolvePtr: [Function: bound queryPtr],
  resolveNaptr: [Function: bound queryNaptr],
  resolveSoa: [Function: bound querySoa],
  reverse: [Function: bound getHostByAddr] }
```

## dns 模块两类函数：
1) 第一类函数，使用底层操作系统工具进行域名解析，且无需进行网络通信。 这类函数只有一个：dns.lookup()。
```js
const dns = require('dns');

dns.lookup('zbj.com', (err, address, family) => {
  console.log('IP 地址: %j 地址族: IPv%s', address, family);
});
// IP 地址: "192.0.43.8" 地址族: IPv4
```

2) 第二类函数，连接到一个真实的 DNS 服务器进行域名解析，且始终使用网络进行 DNS 查询。 这类函数包含了 dns 模块中除 dns.lookup() 以外的所有函数。 这些函数使用与 dns.lookup() 不同的配置文件（例如 /etc/hosts）。 这类函数适合于那些不想使用底层操作系统工具进行域名解析、而是想使用网络进行 DNS 查询的开发者。

```js
const dns = require('dns');

dns.resolve4('zbj.com', (err, addresses) => {
  if (err) throw err;

  console.log(`IP 地址: ${JSON.stringify(addresses)}`);
  // IP 地址: ["49.4.65.160"]
  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`IP 地址 ${a} 逆向解析到域名: ${JSON.stringify(hostnames)}`);
      // IP 地址 49.4.65.160 逆向解析到域名: ["ecs-49-4-65-160.compute.hwclouds-dns.com"]
    });
  });
});
```

### 两类函数的实现有什么区别？

尽管 `dns.lookup()` 和各种 `dns.resolve *()/ dns.reverse()` 函数有相同的目标将网络的名字与网络地址联系在一起(反之亦然)，他们的行为是完全不同的。 这些差异可以有微妙但重大影响着 Node.js 程序行为。

#### `dns.lookup()` 与 直接使用 `ping` 命令类似（异步 -> 同步）

在底层, `dns.lookup()` 使用操作系统设施与大多数其他程序相同。`dns.lookup()` 几乎总是解析给定的主机名与 `ping` 命令一样.

#### `dns.resolve()`, `dns.resolve*()` 和 `dns.reverse()` 通过网络执行DNS查询（异步）

这些功能实现与 `dns.lookup()` 截然不同。它们不仅没有使用 `getaddrinfo(3)` 并且通过网络执行DNS查询。使用异步网络通信，并且没有使用 `libuv` 线程池。因此,这些函数不会像使用 `libuv` 线程池的 `dns.lookup()` 函数一样会对其它进程有负面影响。

它们不像 `dns.lookup()` 一样使用相同的配置文件。例如，它们不会使用来自 `/etc/hosts` 配置。

## dns.Resolver DNS请求的独立解析程序

使用默认的设置创建一个新的解析程序。为一个解析程序设置 `servers` 使用 `resolver.setServers()`，它不会影响其他的解析程序：

```js
const { Resolver } = require('dns');
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// 这个请求将使用 ip: 4.4.4.4 上的服务，独立于全局设置
resolver.resolve4('zbj.com', (err, addresses) => {
  if (err) throw err;
  console.log(addresses);
});
```

## resolver.cancel()

取消解析程序未解决的 DNS 查询，相应的回调用一个 `ECANCELLED` 码调用。

## dns.getServers()

返回一个用于当前DNS解析的IP地址的数组的字符串，格式根据rfc5952。如果使用自定义端口，那么字符串将包括一个端口部分。

## dns.lookup(hostname[, options], callback)
## dns.lookupService(address, port, callback)
## dns.resolve(hostname[, rrtype], callback)
## dns.resolve4(hostname[, options], callback)
## dns.resolve6(hostname[, options], callback)
## dns.resolveAny(hostname, callback)
## dns.resolveCname(hostname, callback)
## dns.resolveMx(hostname, callback)
## dns.resolveNaptr(hostname, callback)
## dns.resolveNs(hostname, callback)
## dns.resolvePtr(hostname, callback)
## dns.resolveSoa(hostname, callback)
## dns.resolveSrv(hostname, callback)
## dns.resolveTxt(hostname, callback)
## dns.reverse(ip, callback)
## dns.setServers(servers)

## 错误码
每个DNS查询可以返回一个错误代码如下:

  - dns.NODATA: DNS服务返回没有数据.
  - dns.FORMERR: DNS服务器查询没有格式化.
  - dns.SERVFAIL: DNS服务器返回失败。
  - dns.NOTFOUND: 域名未找到。
  - dns.NOIMP: DNS服务器不执行请求的操作。
  - dns.REFUSED: 查询DNS服务器拒绝。
  - dns.BADQUERY: 未格式化DNS查询。
  - dns.BADNAME: 未格式化主机名
  - dns.BADFAMILY: 没有提供地址族
  - dns.BADRESP: 未格式化DNS回复
  - dns.CONNREFUSED: 无法连接DNS服务器
  - dns.TIMEOUT: 连接DNS服务器超时
  - dns.EOF: 文件末尾
  - dns.FILE: 读取文件错误
  - dns.NOMEM: 内存溢出
  - dns.DESTRUCTION: 通道以及销毁
  - dns.BADSTR: 未格式化字符串
  - dns.BADFLAGS: 指定非法标记
  - dns.NONAME: 给定的主机名不是数字。
  - dns.BADHINTS: 指定非法的提示标志。
  - dns.NOTINITIALIZED: c-ares异步DNS请求库初始化未完成。
  - dns.LOADIPHLPAPI: 加载iphlpapi.dll(Windows IP辅助API应用程序接口模块)错误
  - dns.ADDRGETNETWORKPARAMS: 找不到GetNetworkParams(读取本机DNS信息)函数
  - dns.CANCELLED: DNS查询取消
