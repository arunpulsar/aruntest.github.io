self.addEventListener('install', e => {
    e.waitUntil(
      caches.open('video-store').then(function(cache) {
        return cache.addAll([
            '/index.html',
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
        ]);
      })
    );
   });
   
   self.addEventListener('fetch', e => {
     console.log(e.request.url);
     e.respondWith(
       caches.match(e.request).then(response => response || fetch(e.request))
     );
   });