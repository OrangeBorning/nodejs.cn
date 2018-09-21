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

dns 模块包含两类函数：
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

dns.resolve4('archive.org', (err, addresses) => {
  if (err) throw err;

  console.log(`IP 地址: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`IP 地址 ${a} 逆向解析到域名: ${JSON.stringify(hostnames)}`);
    });
  });
});
```