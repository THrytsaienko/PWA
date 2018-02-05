var CACHE_NAME = 'dependencies-cache';

var REQUIRED_FILES = [
    '/',
    '/gallery/1.jpg',
    '/gallery/2.jpg',
    '/gallery/3.jpg',
    '/style.css',
    '/index.html',
    '/index.js',
    '/app.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('[install] Caches opened, adding all core components' +
                'to cache');
            return cache.addAll(REQUIRED_FILES);
        })
        .then(function () {
            console.log('[install] All required resources have been cached, ' +
                'we\'re good!');
            return self.skipWaiting();
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                console.log(
                    '[fetch] Returning from ServiceWorker cache: ',
                    event.request.url
                );
                return response;
            }
            console.log('[fetch] Returning from server: ', event.request.url);
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[activate] Activating ServiceWorker!');
    console.log('[activate] Claiming this ServiceWorker!');
    event.waitUntil(self.clients.claim());
});