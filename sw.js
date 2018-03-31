self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-v1').then(function(cache) {
      return cache.addAll([
        '/',
        'restaurant.html',
        'css/styles.css',
        'data/restaurants.json',
        'js/dbhelper.js',
        'js/index.js',
        'js/main.js',
        'js/restaurant_info.js',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
