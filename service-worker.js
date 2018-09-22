/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4a37d5af4fb4ee90363674cd6b4f8b48"
  },
  {
    "url": "API/assert/index.html",
    "revision": "24058360dfe1d283dd766627007039d4"
  },
  {
    "url": "API/Buffer/index.html",
    "revision": "1cc5d41643a8afe018dcf0f7d4d74fa5"
  },
  {
    "url": "API/child_process/index.html",
    "revision": "686d5be4f6ac7dda26e8d390e754b87b"
  },
  {
    "url": "API/dns/index.html",
    "revision": "74b9e88e2ec59ed27137a1a14cc88664"
  },
  {
    "url": "API/fs/demo01/index.html",
    "revision": "3a005966fa43eb09fc351bee5f48a8cd"
  },
  {
    "url": "API/fs/index.html",
    "revision": "ff454396662d3098660edb723e7b440c"
  },
  {
    "url": "API/index.html",
    "revision": "1b8dc7899e29449971a4e3176955beed"
  },
  {
    "url": "API/module/index.html",
    "revision": "a6bd97eec78f5207d0e3019aae9d407a"
  },
  {
    "url": "assets/css/0.styles.7aacd3cd.css",
    "revision": "2f2390a11631f3bad8f8322ce0201c25"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.1dff0aef.js",
    "revision": "c9242671faab9a10421a37f99e9cd917"
  },
  {
    "url": "assets/js/11.5d7bf7d3.js",
    "revision": "d9b2ecc04d279e796c419ee8e23ad43f"
  },
  {
    "url": "assets/js/12.7a78fff3.js",
    "revision": "815629e0defb35c9bf6e09d26877f034"
  },
  {
    "url": "assets/js/13.78de7c79.js",
    "revision": "68095180dbb5f682eeead067a9fe3285"
  },
  {
    "url": "assets/js/2.2eacc74f.js",
    "revision": "93b008680a27e9c605ab21eb314d9066"
  },
  {
    "url": "assets/js/3.e62c53c4.js",
    "revision": "aada17183a1a351b19d71d81bb0223f1"
  },
  {
    "url": "assets/js/4.b044af06.js",
    "revision": "be80a8e7410c7d2ac9c9397524ed334d"
  },
  {
    "url": "assets/js/5.3dc49e27.js",
    "revision": "6e51d5619b03c69c3975644dad2a056a"
  },
  {
    "url": "assets/js/6.9ba52d28.js",
    "revision": "12668af895d01e58f88fba20d3cda687"
  },
  {
    "url": "assets/js/7.2c534a64.js",
    "revision": "2c6feb81c39a0df184880dd74aaa12db"
  },
  {
    "url": "assets/js/8.e8398e58.js",
    "revision": "a10d764f152d17457cad9d0229d41c7c"
  },
  {
    "url": "assets/js/9.877b85a1.js",
    "revision": "142355991741ba206fa88ebb341fda00"
  },
  {
    "url": "assets/js/app.5c390938.js",
    "revision": "89337b3a9d8cc8b54282ff9035bfa9a3"
  },
  {
    "url": "guide/index.html",
    "revision": "c6e3417563e5fd54aa9a3943a8924e10"
  },
  {
    "url": "index.html",
    "revision": "f3c3061e4b8bb8398190534198c4fe20"
  },
  {
    "url": "logo.png",
    "revision": "8ede7a9c574f428955c67d810e274755"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
