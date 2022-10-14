// self.addEventListener('install', e => {
//     e.waitUntil(
//       caches.open('web-app-offline').then(function(cache) {
//         return cache.addAll([
//             '/',
//             '/index.html',
//             '/index.js',
//             '/sw.js',
//             '/css/element.css',
//             '/css/font-awesome.min.css',
//             '/css/jura.css',
//             '/css/normalize.min.css',
//             '/css/skel-noscript.css',
//             '/css/slider.css',
//             '/css/style.css',
//             '/css/style-desktop.css',
//             '/css/style-lr.css',
//             '/fonts/fontawesome-webfont.eot',
//             '/fonts/fontawesome-webfont.svg',
//             '/fonts/fontawesome-webfont.ttf',
//             '/fonts/fontawesome-webfont.woff',
//             '/fonts/fontawesome-webfont.woff2',
//             '/fonts/segoeui.ttf',
//             '/fonts/segoeui.woff',
//             '/fonts/segoeui.woff2',
//             '/fonts/segoeuibold.ttf',
//             '/fonts/segoeuibold.woff',
//             '/fonts/segoeuibold.woff2',
//             '/fonts/segoeuisemibold.ttf',
//             '/fonts/segoeuisemibold.woff',
//             '/fonts/segoeuisemibold.woff2',
//             '/js/bootstrap.min.js',
//             '/js/chart.js',
//             '/js/ekko-lightbox.js',
//             '/js/jquery-2.1.1.min.js',
//             '/js/script-lr2.js',
//             '/js/slider.js',
//             '/img/pulsaricon-rgb64_2.png',
//             '/img/pulsarlogo.svg',
//             '/img/tank1.png'
//         ]);
//       })
//     );
//    });
   
//    self.addEventListener('fetch', e => {
//      console.log(e.request.url);
//      e.respondWith(
//        caches.match(e.request).then(response => response || fetch(e.request))
//      );
//    });

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  './',
  '/index.html',
  '/index.js',
  '/sw.js',
  '/css/element.css',
  '/css/font-awesome.min.css',
  '/css/jura.css',
  '/css/normalize.min.css',
  '/css/skel-noscript.css',
  '/css/slider.css',
  '/css/style.css',
  '/css/style-desktop.css',
  '/css/style-lr.css',
  '/fonts/fontawesome-webfont.eot',
  '/fonts/fontawesome-webfont.svg',
  '/fonts/fontawesome-webfont.ttf',
  '/fonts/fontawesome-webfont.woff',
  '/fonts/fontawesome-webfont.woff2',
  '/fonts/segoeui.ttf',
  '/fonts/segoeui.woff',
  '/fonts/segoeui.woff2',
  '/fonts/segoeuibold.ttf',
  '/fonts/segoeuibold.woff',
  '/fonts/segoeuibold.woff2',
  '/fonts/segoeuisemibold.ttf',
  '/fonts/segoeuisemibold.woff',
  '/fonts/segoeuisemibold.woff2',
  '/js/bootstrap.min.js',
  '/js/chart.js',
  '/js/ekko-lightbox.js',
  '/js/jquery-2.1.1.min.js',
  '/js/script-lr2.js',
  '/js/slider.js',
  '/img/pulsaricon-rgb64_2.png',
  '/img/pulsarlogo.svg',
  '/img/tank1.png'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
