const cacheName = "v1";

const cacheAssets=[
  'index.html',
  'script.js',
  'menu.png',
  'send.png',
  'send2.png',
  'Glowing Loader.gif'
];

// Call install event
self.addEventListener('install', function(e) {
  console.log('Service worker: Installed');

  e.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Service worker: Caching Files');
        return cache.addAll(cacheAssets);
      })
      .then(function() {
        self.skipWaiting();
      })
  );
});

// Call activate event
self.addEventListener('activate', function(e) {
  console.log('Service worker: Activated');

  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if(cache !== cacheName) {
            console.log('Service worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call fetch event
self.addEventListener('fetch', function(event) {
	if (!event.request.url.includes('/firestore.googleapis.com/')) {
	  console.log('Service worker: Fetching');
	  event.respondWith(
	    fetch(event.request)
	      .then(function(res) {
	        // Make clone of response
	        const resClone = res.clone();
	        // Open cache
	        caches.open(cacheName)
	          .then(function(cache) {
	            // Add response to cache
	            cache.put(event.request, resClone);
	          });
	        return res;
	      })
	      .catch(function(err) {
	        // If can't fetch, get from cache
	        return caches.match(event.request)
	          .then(function(res) {
	            return res;
	          });
	      })
	  );
	}
});
