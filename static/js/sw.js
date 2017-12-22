var cacheFiles = [
  '/static/js/web.js',
  '/static/css/web.css'
];
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('cahce').then(function (cache) {
      return cache.addAll(cacheFiles);
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate', function (event) {
  self.skipWaiting();
});
self.addEventListener('push', function (event) {
  console.log('Received a push message', event);
  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = 'http://77flfx.com5.z0.glb.clouddn.com/favicon.ico';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var url = 'http://www.hifs.tk/#cping';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
      .then(function (windowClients) {
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
self.addEventListener('fetch', function (evt) {
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        return response;
      }
      var request = evt.request.clone();
      return fetch(request).then(function (response) {/*
          if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)) {
              return response;
          }*/
        var responseClone = response.clone();
        caches.open('cache').then(function (cache) {
          cache.put(evt.request, responseClone);
        });
        return response;
      });
    })
  )
});