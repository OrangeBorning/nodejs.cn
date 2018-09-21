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