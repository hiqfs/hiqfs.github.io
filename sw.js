importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js',
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-core.prod.js'
);
let cacheSuffixVersion = 'v1'; // 缓存版本号
const maxEntries = 100; // 最大条目数
workbox.core.setCacheNameDetails({
  prefix: '+bing', // 前缀
  suffix: cacheSuffixVersion, // 后缀
});
workbox.routing.registerRoute(
  new RegExp('^//wx1\\.sinaimg\\.cn'),
  new workbox.strategies.CacheFirst({
    cacheName: 'img-cache' + cacheSuffixVersion,
    fetchOptions: {
      mode: 'cors',
      credentials: 'omit',
    },
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
